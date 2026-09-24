"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, CircleAlert, Clock, Lightbulb, Loader2, Maximize, Minimize, Play, RotateCcw, SkipForward, Sparkles, Timer, X } from "lucide-react";
import { Card, btn } from "@/components/ui";
import { useFullscreen } from "@/lib/client-hooks";
import { cn, pad2 } from "@/lib/format";
import { localDateString, setupHref } from "@/lib/links";
import { rememberQuestions, seenHashes, unseenFirst } from "@/lib/seen";
import { shuffle } from "@/lib/random";
import { pointsFor } from "@/lib/scoring";
import { SOURCE_META } from "@/lib/settings";
import { generateQuiz } from "@/lib/generate";
import { saveAttempt } from "@/lib/storage";
import { getTopicInfo } from "@/lib/topics";
import type { AnswerStatus, QuizConfig, QuizMode, QuizQuestion, SourceId, TopicInfo } from "@/lib/types";

type Phase = "loading" | "error" | "playing" | "saving" | "save-error";

interface AnswerRec {
  selectedIndex: number | null;
  status: AnswerStatus;
  hintUsed: boolean;
  timeTaken: number;
  points: number;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const ADVANCE_MS = 280;
const errMsg = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong.");
const mmss = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
};

export default function QuizRunner({ topic, config, mode }: { topic: TopicInfo; config: QuizConfig; mode: QuizMode }) {
  const router = useRouter();
  const { isFullscreen, supported: fsSupported, enter: enterFs, toggle: toggleFs } = useFullscreen();
  const perQuestion = config.timerMode === "per-question";
  const limit = perQuestion ? config.timePerQuestion : 0;
  const totalLimit = perQuestion ? 0 : config.totalTime;
  const hintBudget = config.hints;
  const exitHref = setupHref(topic.id);

  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [notice, setNotice] = useState<string>();
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [sourceUsed, setSourceUsed] = useState<SourceId>(config.source);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<AnswerRec | null>>([]);
  const [hintsLeft, setHintsLeft] = useState(hintBudget);
  const [hintShown, setHintShown] = useState(false);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [quizStartAt, setQuizStartAt] = useState(0);
  const [qStartAt, setQStartAt] = useState(0);
  const [pausedQuizMs, setPausedQuizMs] = useState(0);
  const [pausedQMs, setPausedQMs] = useState(0);
  const [pauseAt, setPauseAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [quitOpen, setQuitOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const pendingPayload = useRef<unknown>(null);
  const fsTried = useRef(false);

  /* ---------------- load questions (excluding seen ones), start immediately --------------- */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        let qs: QuizQuestion[];
        let used: SourceId = config.source;
        let note: string | undefined;
        if (mode === "mistakes") {
          const raw = sessionStorage.getItem("ql-mistakes");
          const data = raw ? (JSON.parse(raw) as { topicId?: string; questions?: QuizQuestion[] }) : null;
          if (!data || data.topicId !== config.topicId || !data.questions?.length) {
            throw new Error("No mistakes found to practise. Open a quiz review and tap “Practise mistakes”.");
          }
          qs = shuffle(data.questions);
        } else {
          const data = await generateQuiz({
            topicId: config.topicId,
            source: config.source,
            amount: config.amount,
            difficulty: config.difficulty,
            exclude: seenHashes(config.topicId),
            customTopic: config.customTopic,
          });
          if (!data.questions?.length) throw new Error("Could not load questions. Please try again.");
          qs = unseenFirst(config.topicId, data.questions);
          used = data.sourceUsed ?? config.source;
          note = data.notice;
        }
        if (cancelled) return;
        const t = Date.now();
        setQuestions(qs);
        setAnswers(Array(qs.length).fill(null));
        setSourceUsed(used);
        setNotice(note);
        setIndex(0);
        setPicked(null);
        setHintShown(false);
        setEliminated([]);
        setHintsLeft(hintBudget);
        setQuizStartAt(t);
        setQStartAt(t);
        setPausedQuizMs(0);
        setPausedQMs(0);
        setPauseAt(null);
        setNow(t);
        setPhase("playing");
      } catch (e) {
        if (cancelled) return;
        setError(errMsg(e));
        setPhase("error");
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [config.topicId, config.source, config.amount, config.difficulty, mode, reloadKey, hintBudget]);

  // Fallback: the builder enters full screen on click; retry once here if needed.
  useEffect(() => {
    if (phase !== "playing" || fsTried.current) return;
    fsTried.current = true;
    if (config.fullscreen && fsSupported && !isFullscreen) void enterFs();
  }, [phase, config.fullscreen, fsSupported, isFullscreen, enterFs]);

  /* ---------------------------------- timers ---------------------------------- */
  const q = questions[index];
  const current = answers[index] ?? null;
  const answeredCount = answers.filter(Boolean).length;
  const paused = pauseAt !== null;
  const running = phase === "playing" && !current && !paused;
  const canHint = running && !hintShown && hintsLeft > 0 && !!q && q.type !== "boolean" && q.options.length > 2;

  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [phase, paused]);

  const elapsedQ = phase === "playing" ? Math.max(0, (pauseAt ?? now) - qStartAt - pausedQMs) : 0;
  const elapsedQuiz = phase === "playing" ? Math.max(0, (pauseAt ?? now) - quizStartAt - pausedQuizMs) : 0;
  const remainingQ = perQuestion && limit > 0 ? Math.max(0, limit * 1000 - elapsedQ) : null;
  const remainingTotal = !perQuestion && totalLimit > 0 ? Math.max(0, totalLimit * 1000 - elapsedQuiz) : null;

  /* --------------------------------- actions ---------------------------------- */
  function saveLocal(payload: Parameters<typeof saveAttempt>[0]) {
    setPhase("saving");
    try {
      const attempt = saveAttempt(payload);
      router.replace(`/results?id=${attempt.id}`);
    } catch (e) {
      setError(errMsg(e));
      setPhase("save-error");
    }
  }

  function buildPayload(list: Array<{ qq: QuizQuestion; a: AnswerRec }>) {
    rememberQuestions(config.topicId, list.map((l) => l.qq));
    const topicMeta = getTopicInfo(config.topicId) ?? topic;
    const payload = {
      topicId: config.topicId,
      topicLabel: topicMeta.label,
      subject: topicMeta.subject,
      classLevel: topicMeta.classLevel ?? null,
      source: sourceUsed,
      difficulty: config.difficulty,
      timePerQuestion: perQuestion ? limit : 0,
      timerMode: config.timerMode,
      totalTime: perQuestion ? 0 : totalLimit,
      mode,
      localDate: localDateString(),
      durationSeconds: Math.round(list.reduce((s, l) => s + l.a.timeTaken, 0)),
      questions: list.map(({ qq, a }) => ({
        question: qq.question,
        options: qq.options,
        correctIndex: qq.correctIndex,
        selectedIndex: a.selectedIndex,
        status: a.status,
        hintUsed: a.hintUsed,
        timeTaken: a.timeTaken,
        hint: qq.hint,
        explanation: qq.explanation,
        difficulty: qq.difficulty,
        type: qq.type,
        origin: qq.origin,
      })),
    };
    pendingPayload.current = payload;
    saveLocal(payload);
  }

  function pairs(finalAnswers: Array<AnswerRec | null>): Array<{ qq: QuizQuestion; a: AnswerRec }> {
    const out: Array<{ qq: QuizQuestion; a: AnswerRec }> = [];
    questions.forEach((qq, i) => {
      const a = finalAnswers[i];
      if (a) out.push({ qq, a });
    });
    return out;
  }

  /** End now: only the questions answered so far are saved. */
  function finishEarly(finalAnswers: Array<AnswerRec | null>) {
    setQuitOpen(false);
    const list = pairs(finalAnswers);
    if (!list.length) {
      router.push(exitHref);
      return;
    }
    buildPayload(list);
  }

  /** Whole-quiz timer expired: every question counts, unanswered ones as skipped. */
  function finishOnTimeout(finalAnswers: Array<AnswerRec | null>) {
    const list: Array<{ qq: QuizQuestion; a: AnswerRec }> = [];
    questions.forEach((qq, i) => {
      const a = finalAnswers[i];
      if (a) list.push({ qq, a });
      else list.push({ qq, a: { selectedIndex: null, status: "skipped", hintUsed: false, timeTaken: 0, points: 0 } });
    });
    buildPayload(list);
  }

  function advance() {
    if (index + 1 >= questions.length) {
      finishEarly(answers);
      return;
    }
    setIndex(index + 1);
    setPicked(null);
    setHintShown(false);
    setEliminated([]);
    setQStartAt(Date.now());
    setPausedQMs(0);
  }

  function commitAnswer(selected: number | null, forced?: "skipped" | "timeout") {
    if (phase !== "playing" || !q || answers[index]) return;
    const t = Date.now();
    const elapsed = Math.max(0, (t - qStartAt - pausedQMs) / 1000);
    const timeTaken = Math.round((limit > 0 ? Math.min(limit, elapsed) : elapsed) * 10) / 10;
    const correct = selected !== null && selected === q.correctIndex;
    const status: AnswerStatus = selected === null ? (forced ?? "skipped") : correct ? "correct" : "wrong";
    const rec: AnswerRec = { selectedIndex: selected, status, hintUsed: hintShown, timeTaken, points: pointsFor(correct, hintShown, timeTaken, limit) };
    const next = answers.slice();
    next[index] = rec;
    setAnswers(next);
    setNow(t);
    setPicked(selected);
  }

  function takeHint() {
    if (!canHint || !q) return;
    const wrong = q.options.map((_, i) => i).filter((i) => i !== q.correctIndex);
    const removeCount = q.hint ? 1 : Math.min(2, wrong.length - 1);
    setEliminated(shuffle(wrong).slice(0, removeCount));
    setHintShown(true);
    setHintsLeft((h) => h - 1);
  }

  function openQuit() {
    if (phase === "playing" && !answers[index] && pauseAt === null) setPauseAt(Date.now());
    setQuitOpen(true);
  }

  function closeQuit() {
    if (pauseAt !== null) {
      const t = Date.now();
      const delta = t - pauseAt;
      setPausedQuizMs((p) => p + delta);
      setPausedQMs((p) => p + delta);
      setPauseAt(null);
      setNow(t);
    }
    setQuitOpen(false);
  }

  function handleKey(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    const target = e.target as HTMLElement | null;
    if (target?.tagName === "BUTTON" && (k === "enter" || k === " ")) return;
    if (phase !== "playing") return;
    if (quitOpen) {
      if (k === "escape") closeQuit();
      return;
    }
    if (k === "escape") {
      openQuit();
      return;
    }
    if (k === "f") {
      toggleFs();
      return;
    }
    if (running && q) {
      const n = ["1", "2", "3", "4"].indexOf(k);
      const l = ["a", "b", "c", "d"].indexOf(k);
      const idx = n >= 0 ? n : l;
      if (idx >= 0 && idx < q.options.length && !eliminated.includes(idx)) {
        e.preventDefault();
        commitAnswer(idx);
      } else if (k === "h") takeHint();
      else if (k === "s") commitAnswer(null, "skipped");
    }
  }

  // Latest handlers for timers and global listeners.
  const actions = useRef({ commitAnswer, advance, handleKey });
  useEffect(() => {
    actions.current = { commitAnswer, advance, handleKey };
  });

  // Gentle auto-advance once an answer has been recorded — no feedback, no button.
  useEffect(() => {
    if (phase !== "playing" || !current) return;
    const id = window.setTimeout(() => actions.current.advance(), ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [phase, current, index]);

  // Per-question timer ran out for the current question.
  useEffect(() => {
    if (running && remainingQ !== null && remainingQ <= 0) actions.current.commitAnswer(null, "timeout");
  }, [running, remainingQ]);

  // Whole-quiz timer ran out.
  useEffect(() => {
    if (phase === "playing" && !quitOpen && remainingTotal !== null && remainingTotal <= 0) finishOnTimeout(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTotal, phase, quitOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      actions.current.handleKey(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [phase]);

  /* ---------------------------------- views ---------------------------------- */
  const FsButton = fsSupported ? (
    <button type="button" onClick={toggleFs} className={btn.icon} aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"} title={isFullscreen ? "Exit full screen (F)" : "Full screen (F)"}>
      {isFullscreen ? <Minimize className="h-[18px] w-[18px]" /> : <Maximize className="h-[18px] w-[18px]" />}
    </button>
  ) : null;

  if (phase === "loading" || phase === "saving") {
    return (
      <div className="flex min-h-dvh items-center justify-center px-6">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl grad-hero text-white shadow-[0_0_48px_-6px_rgba(249,115,22,0.85)]">
            <Loader2 className="h-6 w-6 animate-spin" />
          </span>
          <p className="mt-7 text-lg font-bold tracking-tight text-fg">{phase === "saving" ? "Saving your results" : "Preparing your quiz"}</p>
          <p className="mt-1.5 max-w-xs font-mono text-xs text-subtle">
            {phase === "saving" ? "Calculating score & review" : config.source === "bank" || mode === "mistakes" ? topic.label : `Fetching from ${SOURCE_META[config.source].name}`}
          </p>
          <div className="mt-7 h-0.5 w-44 overflow-hidden rounded-full bg-fg/10">
            <div className="h-full w-1/3 rounded-full grad-hero animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (phase === "error" || phase === "save-error") {
    return (
      <div className="flex min-h-dvh items-center justify-center px-5">
        <Card className="w-full max-w-md p-7 text-center animate-pop sm:p-8">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-danger/30 bg-danger/10 text-danger">
            <CircleAlert className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-lg font-bold tracking-tight text-fg">{phase === "save-error" ? "Couldn't save your quiz" : "Couldn't start the quiz"}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">{error}</p>
          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {phase === "save-error" ? (
              <button type="button" className={btn.primary} onClick={() => pendingPayload.current && saveLocal(pendingPayload.current as Parameters<typeof saveAttempt>[0])}>
                <RotateCcw className="h-4 w-4" /> Retry saving
              </button>
            ) : mode === "standard" ? (
              <button type="button" className={btn.primary} onClick={() => { setPhase("loading"); setReloadKey((k) => k + 1); }}>
                <RotateCcw className="h-4 w-4" /> Try again
              </button>
            ) : null}
            <Link href={exitHref} className={btn.subtle}>
              Change settings
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!q) return null;
  const total = questions.length;
  const progress = ((index + (current ? 1 : 0)) / total) * 100;
  const shortOptions = q.options.every((o) => o.length <= 28);
  const frac = remainingQ !== null && limit ? Math.max(0, remainingQ / (limit * 1000)) : 1;
  const timerTone = frac > 0.5 ? "text-brand-ink" : frac > 0.2 ? "text-warning" : "text-danger";
  const totalFrac = remainingTotal !== null && totalLimit ? Math.max(0, remainingTotal / (totalLimit * 1000)) : 1;
  const totalTone = totalFrac > 0.3 ? "text-fg" : totalFrac > 0.1 ? "text-warning" : "text-danger";
  const R = 19;
  const C = 2 * Math.PI * R;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="glass sticky top-0 z-20 border-b border-line pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={openQuit} className={btn.icon} aria-label="Pause or quit quiz" title="Pause (Esc)">
            <X className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold text-fg">{topic.title}</p>
              <p className="shrink-0 font-mono text-xs text-subtle">
                <span className="text-fg">{pad2(index + 1)}</span> / {pad2(total)}
              </p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-fg/10">
              <div className="h-full rounded-full grad-hero transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
          {FsButton}
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-8 pt-6 sm:px-6 sm:pt-10">
        {notice && noticeOpen ? (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-3.5 text-sm animate-fade-in">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <p className="flex-1 text-muted">{notice}</p>
            <button type="button" onClick={() => setNoticeOpen(false)} className="text-subtle transition hover:text-fg" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          {remainingTotal !== null ? (
            <div className="flex items-center gap-2.5" title="Time left for the whole quiz">
              <span className={cn("font-mono text-2xl font-semibold tabular-nums transition-colors", totalTone, paused && "opacity-50")}>{mmss(remainingTotal)}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">{paused ? "Paused" : "total left"}</span>
            </div>
          ) : remainingQ !== null ? (
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <svg viewBox="0 0 44 44" className="h-12 w-12 -rotate-90" aria-hidden="true">
                  <circle cx="22" cy="22" r={R} fill="none" strokeWidth="3.5" className="stroke-fg/10" />
                  <circle
                    cx="22"
                    cy="22"
                    r={R}
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    strokeDasharray={C}
                    strokeDashoffset={C * (1 - frac)}
                    className={cn(timerTone, "transition-[stroke-dashoffset] duration-200 ease-linear")}
                  />
                </svg>
                <span className={cn("absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold tabular-nums", timerTone)}>
                  {Math.ceil(remainingQ / 1000)}
                </span>
              </div>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:inline">{paused ? "Paused" : "sec left"}</span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              <Timer className="h-3.5 w-3.5" /> No time limit
            </span>
          )}
          {hintBudget ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning/10 px-3 py-1 font-mono text-xs text-fg" title="Hints left">
              <Lightbulb className="h-3.5 w-3.5 text-warning" /> <span className="tabular-nums">{hintsLeft}</span>
            </span>
          ) : null}
        </div>

        <div key={index} className="mt-6 animate-fade-up sm:mt-12">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-subtle sm:text-[11px] sm:tracking-[0.2em]">
              <span className="font-semibold text-brand-ink">Q{pad2(index + 1)}</span>
            </span>
            {q.difficulty ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border",
                  q.difficulty === "easy"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : q.difficulty === "hard"
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-400",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    q.difficulty === "easy" ? "bg-emerald-400" : q.difficulty === "hard" ? "bg-rose-400" : "bg-amber-400",
                  )}
                />
                {q.difficulty}
              </span>
            ) : null}
          </div>
          <h2 className="mt-2.5 text-xl font-bold leading-snug tracking-tight text-fg sm:mt-3 sm:text-[28px]">{q.question}</h2>

          {hintShown ? (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs sm:mt-5 sm:gap-3 sm:p-3.5 sm:text-sm animate-pop">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <p className="text-fg">
                {q.hint ? <span className="font-medium">{q.hint} </span> : null}
                <span className="text-muted">{eliminated.length === 1 ? "One wrong option removed." : `${eliminated.length} wrong options removed.`}</span>
              </p>
            </div>
          ) : null}

          <div className={cn("mt-5 sm:mt-7 grid gap-2.5 sm:gap-3", shortOptions && q.options.length > 2 && "sm:grid-cols-2")}>
            {q.options.map((opt, i) => {
              const isElim = eliminated.includes(i);
              const isSelected = picked === i;
              const locked = !!current;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={locked || isElim}
                  onClick={() => commitAnswer(i)}
                  className={cn(
                    "group flex min-h-[3.25rem] sm:min-h-[3.75rem] w-full items-center gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 text-left text-sm font-medium text-fg transition duration-200 sm:text-base",
                    isElim
                      ? "cursor-not-allowed border-dashed border-line bg-transparent text-subtle line-through opacity-50"
                      : isSelected
                        ? "border-brand bg-brand/[0.08] glow"
                        : "border-line bg-card hover:border-line-2 hover:bg-fg/[0.04] active:scale-[0.99]",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] sm:text-xs font-semibold transition",
                      isElim ? "border-line text-subtle" : isSelected ? "border-brand text-brand-ink" : "border-line-2 text-muted group-hover:border-brand group-hover:text-brand-ink",
                    )}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : LETTERS[i]}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 hidden font-mono text-[11px] uppercase tracking-[0.14em] text-subtle md:block">
            1–4 answer · H hint · S skip · F full screen · Esc pause
          </p>
        </div>
      </main>

      <footer className="glass sticky bottom-0 z-20 border-t border-line pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 sm:py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 sm:px-6">
          {hintBudget ? (
            <button type="button" onClick={takeHint} disabled={!canHint} className={cn(btn.secondary, "flex-1 sm:flex-none")} title={q.type === "boolean" ? "Hints aren't available for True/False questions" : "Use a hint (H)"}>
              <Lightbulb className="h-4 w-4 text-warning" />
              {hintShown ? "Hint used" : hintsLeft > 0 ? `Hint · ${hintsLeft} left` : "No hints left"}
            </button>
          ) : null}
          <button type="button" onClick={() => commitAnswer(null, "skipped")} disabled={!running} className={cn(btn.subtle, "flex-1 sm:ml-auto sm:flex-none")} title="Skip (S)">
            <SkipForward className="h-4 w-4" /> Skip
          </button>
        </div>
      </footer>

      {quitOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="quit-title">
          <button type="button" aria-label="Resume" onClick={closeQuit} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-fade-in" />
          <div className="glass relative w-full max-w-sm rounded-3xl border border-line p-7 card-shadow animate-sheet">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Paused</p>
            <h2 id="quit-title" className="mt-2 text-xl font-bold tracking-tight text-fg">
              Take a breather
            </h2>
            <p className="mt-2 text-sm text-muted">
              {answeredCount} of {total} answered. The timer is paused.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button type="button" className={btn.primary} onClick={closeQuit} autoFocus>
                <Play className="h-4 w-4" /> Resume quiz
              </button>
              <button type="button" className={btn.subtle} disabled={answeredCount === 0} onClick={() => finishEarly(answers)}>
                End now &amp; save{answeredCount ? ` (${answeredCount} answered)` : ""}
              </button>
              <button type="button" className={cn(btn.ghost, "text-danger hover:bg-danger/10 hover:text-danger")} onClick={() => router.push(exitHref)}>
                Discard quiz
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
