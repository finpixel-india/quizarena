"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Globe2, Layers, Loader2, Search, X } from "lucide-react";
import { Card, Label, Segmented, SubjectIcon, Switch, btn, chip, inputCls } from "@/components/ui";
import { useFullscreen } from "@/lib/client-hooks";
import { cn, pad2 } from "@/lib/format";
import { quizHref } from "@/lib/links";
import { MAX_QUESTIONS, MAX_TIME, MAX_TOTAL_TIME, MIN_TIME, MIN_TOTAL_TIME, QUESTION_PRESETS, SOURCE_META, TIME_PRESETS, TOTAL_TIME_PRESETS } from "@/lib/settings";
import { SUBJECTS } from "@/lib/subjects";
import type { Difficulty, SourceId, SubjectId, TimerMode, TopicInfo, UserSettings } from "@/lib/types";

type ClassSel = 9 | 10 | "general";
interface Group {
  label?: string;
  items: TopicInfo[];
}

const SST_SECTIONS = ["History", "Geography", "Political Science", "Economics"];
const SOURCE_SHORT: Record<SourceId, string> = { bank: "Curated", opentdb: "OpenTDB", triviaapi: "Trivia API" };
const timeLabel = (t: number) => (t === 0 ? "No limit" : t >= 60 && t % 60 === 0 ? `${t / 60} min` : `${t}s`);
const totalLabel = (t: number) => (t >= 3600 && t % 3600 === 0 ? `${t / 3600} hr` : `${Math.round(t / 60)} min`);
const hasClassesFor = (s: SubjectId) => SUBJECTS.find((x) => x.id === s)?.hasClasses ?? false;
const memKey = (s: SubjectId, c: ClassSel) => (hasClassesFor(s) ? `${s}:${c}` : s);


function OptionRow({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">{label}</p>
        {hint ? <p className="mt-0.5 truncate text-xs text-subtle">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

export default function QuizBuilder({ topics, settings, initialTopicId }: { topics: TopicInfo[]; settings: UserSettings; initialTopicId: string }) {
  const router = useRouter();
  const fs = useFullscreen();
  const byId = useMemo(() => new Map(topics.map((t) => [t.id, t])), [topics]);
  const init = byId.get(initialTopicId) ?? topics[0];
  const initCls: ClassSel = init.classLevel ?? (init.kind === "general" ? "general" : 10);

  const [subject, setSubject] = useState<SubjectId>(init.subject);
  const [cls, setCls] = useState<ClassSel>(initCls);
  const [topicId, setTopicId] = useState(init.id);
  const [memory, setMemory] = useState<Record<string, string>>(() => ({ [memKey(init.subject, initCls)]: init.id }));
  const [sheetOpen, setSheetOpen] = useState(false);

  const [userSource, setUserSource] = useState<SourceId | null>(null);
  const [amount, setAmount] = useState(settings.defaultQuestions);
  const [amountText, setAmountText] = useState(QUESTION_PRESETS.includes(settings.defaultQuestions) ? "" : String(settings.defaultQuestions));
  const [timerMode, setTimerMode] = useState<TimerMode>(settings.timerMode);
  const [time, setTime] = useState(settings.defaultTime);
  const [timeText, setTimeText] = useState(TIME_PRESETS.includes(settings.defaultTime) ? "" : String(settings.defaultTime));
  const [totalTime, setTotalTime] = useState(settings.defaultTotalTime);
  const [totalText, setTotalText] = useState(TOTAL_TIME_PRESETS.includes(settings.defaultTotalTime) ? "" : String(settings.defaultTotalTime / 60));
  const [difficulty, setDifficulty] = useState<Difficulty>(settings.defaultDifficulty);
  const [hints, setHints] = useState(settings.hintsPerQuiz);
  const [fullscreen, setFullscreen] = useState(settings.autoFullscreen);
  const [customTopic, setCustomTopic] = useState("");
  const [starting, setStarting] = useState(false);

  const subjectMeta = useMemo(() => {
    const out = {} as Record<SubjectId, string>;
    for (const s of SUBJECTS) {
      const list = topics.filter((t) => t.subject === s.id);
      const chapters = list.filter((t) => t.kind === "chapter").length;
      out[s.id] = chapters ? `${chapters} chapters` : list.some((t) => t.bankCount === null) ? `${list.length} topics · ∞` : `${list.length} topics`;
    }
    return out;
  }, [topics]);

  const topic = byId.get(topicId) ?? init;
  const hasClasses = hasClassesFor(subject);
  const isChapter = topic.kind === "chapter" || topic.kind === "class-all";

  function defaultTopicId(s: SubjectId, c: ClassSel): string {
    const remembered = memory[memKey(s, c)];
    if (remembered && byId.has(remembered)) return remembered;
    const list = topics.filter((t) => t.subject === s);
    const found = hasClassesFor(s)
      ? c === "general"
        ? list.find((t) => t.kind === "general")
        : list.find((t) => t.classLevel === c && t.kind === "class-all" && !t.section)
      : (list.find((t) => t.kind === "mixed") ?? list[0]);
    return (found ?? list[0]).id;
  }

  function selectTopic(id: string) {
    setTopicId(id);
    setMemory((m) => ({ ...m, [memKey(subject, cls)]: id }));
  }

  function selectSubject(s: SubjectId) {
    if (s === subject) return;
    setSubject(s);
    setTopicId(defaultTopicId(s, cls));
    setUserSource(null); // allow smart default to match new subject
  }

  function selectClass(c: ClassSel) {
    if (c === cls) return;
    setCls(c);
    setTopicId(defaultTopicId(subject, c));
  }

  /* ------------------------------ topic lists ------------------------------ */
  const classTopics = hasClasses && cls !== "general" ? topics.filter((t) => t.subject === subject && t.classLevel === cls) : [];
  const allChapters = classTopics.find((t) => t.kind === "class-all" && !t.section);
  const chapterList = classTopics.filter((t) => t.kind === "chapter");
  const groups: Group[] =
    subject === "sst"
      ? [
          { items: allChapters ? [allChapters] : [] },
          ...SST_SECTIONS.map((sec) => ({
            label: sec,
            items: [...chapterList.filter((t) => t.section === sec), ...classTopics.filter((t) => t.kind === "class-all" && t.section === sec)],
          })),
        ]
      : [{ items: [...(allChapters ? [allChapters] : []), ...chapterList] }];
  const generalTopic = hasClasses ? topics.find((t) => t.subject === subject && t.kind === "general") : undefined;
  const flatTopics = hasClasses ? [] : topics.filter((t) => t.subject === subject);

  /* ------------------------------- derived -------------------------------- */
  const defaultSource: SourceId = isChapter ? "bank" : "triviaapi";
  const source: SourceId = userSource && topic.sources.includes(userSource)
    ? userSource
    : topic.sources.includes(defaultSource)
    ? defaultSource
    : topic.sources[0];
  const cap = source === "bank" && topic.bankCount !== null ? Math.min(MAX_QUESTIONS, topic.bankCount) : MAX_QUESTIONS;
  const count = Math.max(1, Math.min(amount, cap));
  const showDifficulty = source !== "bank" || topic.bankCount === null;
  const summary =
    timerMode === "total"
      ? `${count} Q · ${totalTime ? totalLabel(totalTime) + " total" : "no limit"} · ${hints ? `${hints} hint${hints > 1 ? "s" : ""}` : "no hints"}`
      : `${count} Q · ${time ? `${time}s each` : "no limit"} · ${hints ? `${hints} hint${hints > 1 ? "s" : ""}` : "no hints"} · ~${Math.max(1, Math.round((count * (time || 20)) / 60))} min`;

  function start() {
    if (starting) return;
    setStarting(true);
    const wantFs = fullscreen && fs.supported;
    if (wantFs && !fs.isFullscreen) void fs.enter(); // must run inside the click (user gesture)
    router.push(
      quizHref({
        topicId: topic.id,
        amount: count,
        time: timerMode === "per-question" ? time : 0,
        timerMode,
        totalTime,
        difficulty: showDifficulty ? difficulty : "any",
        source,
        hints,
        fullscreen: wantFs,
        customTopic: customTopic.trim() || undefined,
      }),
    );
  }

  let stepNo = 0;
  const step = () => pad2(++stepNo);

  const startButton = (className?: string) => (
    <button type="button" onClick={start} disabled={starting} className={cn(btn.primary, className)}>
      {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Start quiz
      {starting ? null : <ArrowRight className="h-4 w-4" />}
    </button>
  );

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-6">
        {/* ------------------------------ What ------------------------------ */}
        <Card className="p-4 sm:p-7">
          <Label n={step()}>Subject</Label>
          {/* Horizontal scrollable tab strip — smooth momentum scrolling on mobile */}
          <div className="mt-3 -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            {SUBJECTS.map((s) => {
              const active = s.id === subject;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectSubject(s.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs sm:px-3.5 sm:py-2.5 sm:text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
                    "ring-1 ring-inset",
                    active
                      ? "border-brand/50 bg-brand/10 text-fg ring-brand/60 shadow-[0_0_16px_-4px_rgba(249,115,22,0.3)]"
                      : "border-line bg-fg/[0.02] text-muted ring-transparent hover:border-line-2 hover:bg-fg/[0.04] hover:text-fg",
                  )}
                >
                  <SubjectIcon subject={s.id} size="sm" active={active} className="h-5 w-5 sm:h-6 sm:w-6 rounded-lg" />
                  <span>{s.short}</span>
                </button>
              );
            })}
          </div>

          {hasClasses ? (
            <>
              <Label n={step()} className="mt-5 sm:mt-6">
                Class
              </Label>
              <div className="mt-2.5 sm:mt-3 grid grid-cols-3 gap-1 rounded-xl border border-line bg-fg/[0.02] p-1">
                {([9, 10, "general"] as ClassSel[]).map((c) => {
                  const active = cls === c;
                  return (
                    <button
                      key={String(c)}
                      type="button"
                      onClick={() => selectClass(c)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold transition ring-1 ring-inset",
                        active ? "bg-brand/15 text-fg ring-brand/70" : "text-muted ring-transparent hover:bg-fg/[0.04] hover:text-fg",
                      )}
                    >
                      {c === "general" ? "General" : `Class ${c}`}
                    </button>
                  );
                })}
              </div>
            </>
          ) : null}

          <Label n={step()} className="mt-6">
            {hasClasses && cls !== "general" ? "Chapter" : "Topic"}
          </Label>
          <div className="mt-3">
            {hasClasses && cls !== "general" ? (
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="group flex w-full items-center gap-3 rounded-xl border border-line bg-fg/[0.02] p-3.5 text-left transition hover:border-line-2 hover:bg-fg/[0.04]"
                aria-haspopup="dialog"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line font-mono text-sm text-brand-ink">
                  {topic.chapterNo ? pad2(topic.chapterNo) : <Layers className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-fg">{topic.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-subtle">
                    {topic.section ? `${topic.section} · ` : ""}
                    {topic.bankCount} questions · NCERT-aligned
                  </span>
                </span>
                <span className="hidden text-xs font-medium text-muted transition group-hover:text-fg sm:inline">Change</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-subtle transition group-hover:text-fg" />
              </button>
            ) : hasClasses ? (
              generalTopic ? (
                <div className="flex items-start gap-3 rounded-xl border border-brand bg-brand/[0.06] p-3.5 glow">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-brand-ink">
                    <Globe2 className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-fg">{generalTopic.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{generalTopic.description}</p>
                  </div>
                </div>
              ) : null
            ) : (
              <div className="space-y-3">
                {subject === "custom" ? (
                  <div className="space-y-3 rounded-xl border border-brand/35 bg-brand/[0.04] p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-fg">Enter your custom quiz topic</p>
                      <p className="mt-0.5 text-xs text-muted">Type any topic — Trivia API will fetch questions for it!</p>
                      <div className="mt-2.5 flex items-center gap-2">
                        <input
                          type="text"
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          placeholder="e.g. Cricket, AI, Space, World History..."
                          className="w-full rounded-lg border border-line bg-fg/[0.03] px-3 py-2 text-sm font-medium text-fg outline-none transition focus:border-brand"
                        />
                        {customTopic ? (
                          <button
                            type="button"
                            onClick={() => setCustomTopic("")}
                            className="rounded-lg border border-line p-2 text-subtle hover:text-fg"
                            title="Clear"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Space & Astronomy", "Artificial Intelligence", "World War II", "Cricket",
                        "World Geography", "Inventions", "Human Body", "Animals & Nature",
                      ].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setCustomTopic(tag);
                            const match = flatTopics.find((t) => t.title.toLowerCase().includes(tag.toLowerCase().split(" ")[0]));
                            if (match) selectTopic(match.id);
                          }}
                          className={cn(
                            "rounded-md border px-2 py-0.5 text-xs font-medium transition",
                            customTopic.toLowerCase() === tag.toLowerCase()
                              ? "border-brand bg-brand/15 text-brand-ink"
                              : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg",
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-1.5 sm:grid-cols-2">
                  {flatTopics.map((t) => {
                    const active = t.id === topicId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          selectTopic(t.id);
                          if (subject === "custom" && t.id !== "custom-any") {
                            setCustomTopic(t.title);
                          }
                        }}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition active:scale-[0.99]",
                          "shadow-[0_0_0_1px_transparent]",
                          active
                            ? "border-brand bg-brand/[0.07] shadow-[0_0_0_1px_rgba(249,115,22,0.55),0_0_20px_-6px_rgba(249,115,22,0.35)]"
                            : "border-line bg-fg/[0.02] hover:border-line-2 hover:bg-fg/[0.04]",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-fg">{t.title}</span>
                          <span className="mt-0.5 block truncate text-xs text-subtle">{t.description}</span>
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-subtle">{t.bankCount === null ? "∞" : t.bankCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Difficulty (compact segmented row) ── */}
          <div className="mt-5 border-t border-line pt-5">
            <div className="flex items-center justify-between mb-2">
              <Label n={step()}>Difficulty</Label>
              <span className="font-mono text-[10.5px] text-subtle capitalize">
                {difficulty === "any" ? "Mixed" : difficulty}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 rounded-xl border border-line bg-fg/[0.02] p-1">
              {([
                { v: "any" as Difficulty, label: "Mixed", dot: "bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400" },
                { v: "easy" as Difficulty, label: "Easy", dot: "bg-emerald-400" },
                { v: "medium" as Difficulty, label: "Med", dot: "bg-amber-400" },
                { v: "hard" as Difficulty, label: "Hard", dot: "bg-rose-400" },
              ] as { v: Difficulty; label: string; dot: string }[]).map((d) => {
                const active = difficulty === d.v;
                return (
                  <button
                    key={d.v}
                    type="button"
                    onClick={() => setDifficulty(d.v)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center justify-center gap-1 rounded-lg py-1.5 px-0.5 sm:py-2 sm:px-1 text-[11px] sm:text-xs font-semibold transition-all duration-200 ring-1 ring-inset truncate",
                      active
                        ? "bg-brand/15 text-fg ring-brand/60 shadow-[0_0_10px_-3px_rgba(249,115,22,0.35)]"
                        : "ring-transparent text-muted hover:bg-fg/[0.04] hover:text-fg",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", d.dot)} />
                    <span className="truncate">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Quiz Source (compact segmented row) ── */}
          <div className="mt-4 border-t border-line pt-4 sm:pt-5">
            <div className="flex items-center justify-between mb-2">
              <Label n={step()}>Source</Label>
              <span className="font-mono text-[10.5px] text-subtle">
                {source === "bank" && isChapter ? "NCERT Bank" : SOURCE_SHORT[source]}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-fg/[0.02] p-1">
              {([
                {
                  id: "bank" as SourceId,
                  label: isChapter ? "NCERT Bank" : "Curated",
                  badge: isChapter ? "⭐" : "📚",
                  hint: isChapter ? "NCERT syllabus-aligned chapter questions" : "Curated offline bank",
                },
                {
                  id: "triviaapi" as SourceId,
                  label: "Trivia API",
                  badge: isChapter ? "🌐" : "⭐",
                  hint: isChapter ? "Online trivia for this discipline" : "Online trivia API — recommended for custom topics",
                },
                {
                  id: "opentdb" as SourceId,
                  label: "OpenTDB",
                  badge: "🌐",
                  hint: "Open Trivia DB",
                },
              ]).map((sItem) => {
                const active = source === sItem.id;
                const isAllowed = topic.sources.includes(sItem.id);
                return (
                  <button
                    key={sItem.id}
                    type="button"
                    onClick={() => setUserSource(sItem.id)}
                    aria-pressed={active}
                    title={sItem.hint}
                    className={cn(
                      "flex items-center justify-center gap-1 rounded-lg py-1.5 px-0.5 sm:py-2 sm:px-1 text-[11px] sm:text-xs font-semibold transition-all duration-200 ring-1 ring-inset truncate",
                      active
                        ? "bg-brand/15 text-fg ring-brand/60 shadow-[0_0_10px_-3px_rgba(249,115,22,0.35)]"
                        : "ring-transparent text-muted hover:bg-fg/[0.04] hover:text-fg",
                      !isAllowed && !active ? "opacity-40" : "",
                    )}
                  >
                    <span className="text-[10px] sm:text-[11px] shrink-0">{sItem.badge}</span>
                    <span className="truncate">{sItem.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[10.5px] sm:text-[11px] text-subtle leading-relaxed">
              {source === "bank"
                ? "📚 NCERT Curated Bank: Textbook questions with hints & explanations (Best for school & exams)."
                : source === "triviaapi"
                ? isChapter
                  ? "🌐 Trivia API: Online questions filtered by this discipline (e.g. chemistry/physics)."
                  : "⭐ Trivia API: Broad questions from the online trivia database (Best for custom topics)."
                : "🌐 Open Trivia DB: Community-submitted trivia."}
            </p>
          </div>
        </Card>

        {/* ------------------------------ How ------------------------------ */}
        <Card className="flex flex-col">
          <div className="flex-1 space-y-5 p-4 sm:space-y-6 sm:p-6">
            <div>
              <Label n={step()}>Questions</Label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {QUESTION_PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    disabled={n > cap}
                    aria-pressed={!amountText && count === n}
                    onClick={() => {
                      setAmount(n);
                      setAmountText("");
                    }}
                    className={chip(!amountText && count === n)}
                  >
                    {n}
                  </button>
                ))}
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={cap}
                  placeholder="Custom"
                  aria-label="Custom number of questions"
                  value={amountText}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setAmountText(v);
                    const n = parseInt(v, 10);
                    if (n >= 1) setAmount(Math.min(cap, n));
                  }}
                  onBlur={() => {
                    if (amountText) setAmountText(String(count));
                  }}
                  className={cn(inputCls(!!amountText), "w-24")}
                />
              </div>
              <p className="mt-2 text-xs text-subtle">
                1–{cap}{cap < MAX_QUESTIONS ? " (available questions)" : ""}.
              </p>
            </div>

            <div>
              <Label n={step()}>Timer</Label>
              <div className="mt-3">
                <Segmented<TimerMode>
                  value={timerMode}
                  onChange={setTimerMode}
                  options={[
                    { v: "per-question", label: "Per question" },
                    { v: "total", label: "Whole quiz" },
                  ]}
                />
              </div>
              {timerMode === "per-question" ? (
                <>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {TIME_PRESETS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={!timeText && time === t}
                        onClick={() => {
                          setTime(t);
                          setTimeText("");
                        }}
                        className={chip(!timeText && time === t)}
                      >
                        {timeLabel(t)}
                      </button>
                    ))}
                    <label className="relative">
                      <span className="sr-only">Custom seconds per question</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={MIN_TIME}
                        max={MAX_TIME}
                        placeholder="Custom"
                        value={timeText}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                          setTimeText(v);
                          const n = parseInt(v, 10);
                          if (n >= MIN_TIME) setTime(Math.min(MAX_TIME, n));
                        }}
                        onBlur={() => {
                          if (!timeText) return;
                          const n = Math.min(MAX_TIME, Math.max(MIN_TIME, parseInt(timeText, 10) || MIN_TIME));
                          setTime(n);
                          setTimeText(String(n));
                        }}
                        className={cn(inputCls(!!timeText), "w-28 pr-9")}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-subtle">sec</span>
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-subtle">
                    {MIN_TIME}–{MAX_TIME}s each. Faster answers earn a speed bonus.
                  </p>
                </>
              ) : (
                <>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {TOTAL_TIME_PRESETS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={!totalText && totalTime === t}
                        onClick={() => {
                          setTotalTime(t);
                          setTotalText("");
                        }}
                        className={chip(!totalText && totalTime === t)}
                      >
                        {totalLabel(t)}
                      </button>
                    ))}
                    <label className="relative">
                      <span className="sr-only">Custom total minutes</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={Math.round(MIN_TOTAL_TIME / 60)}
                        max={Math.round(MAX_TOTAL_TIME / 60)}
                        placeholder="Custom"
                        value={totalText}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                          setTotalText(v);
                          const n = parseInt(v, 10);
                          if (n >= 1) setTotalTime(Math.min(MAX_TOTAL_TIME, n * 60));
                        }}
                        onBlur={() => {
                          if (!totalText) return;
                          const m = Math.min(Math.round(MAX_TOTAL_TIME / 60), Math.max(Math.round(MIN_TOTAL_TIME / 60), parseInt(totalText, 10) || 5));
                          setTotalTime(m * 60);
                          setTotalText(String(m));
                        }}
                        className={cn(inputCls(!!totalText), "w-28 pr-9")}
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-subtle">min</span>
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-subtle">
                    {MIN_TOTAL_TIME / 60}–{Math.round(MAX_TOTAL_TIME / 60)} min total. Unanswered questions count as skipped.
                  </p>
                </>
              )}
            </div>

            <div>
              <Label n={step()}>Preferences</Label>
              <div className="mt-4 space-y-4">
                {source === "triviaapi" && subject !== "custom" ? (
                  <OptionRow label="Topic tag (optional)" hint="Refine trivia with a keyword (e.g. space, coding, nature)">
                    <input
                      type="text"
                      placeholder="Optional tag…"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className={cn(inputCls(!!customTopic), "w-44")}
                      maxLength={60}
                    />
                  </OptionRow>
                ) : null}
                <OptionRow label="Hints" hint="Clue + wrong options removed (−30 pts each)">
                  <Segmented
                    value={hints}
                    onChange={setHints}
                    options={[
                      { v: 0, label: "Off" },
                      { v: 1, label: "1" },
                      { v: 2, label: "2" },
                      { v: 3, label: "3" },
                    ]}
                  />
                </OptionRow>
                <Switch
                  checked={fullscreen && fs.supported}
                  onChange={setFullscreen}
                  disabled={!fs.supported}
                  label="Full screen"
                  description={fs.supported ? "Distraction-free mode when the quiz starts" : "Not supported in this browser"}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-line p-4 sm:p-5">
            <p className="truncate text-sm font-semibold text-fg">{customTopic ? `Custom · ${customTopic}` : topic.label}</p>
            <p className="mt-1 font-mono text-xs text-subtle">{summary}</p>
            {startButton("mt-3.5 sm:mt-4 w-full py-3 text-base")}
          </div>
        </Card>
      </div>

      {sheetOpen ? (
        <TopicSheet
          title={`Class ${cls} ${subject === "sst" ? "SST" : "Science"}`}
          groups={groups}
          selectedId={topicId}
          onSelect={selectTopic}
          onClose={() => setSheetOpen(false)}
        />
      ) : null}
    </div>
  );
}

/* ------------------------------- Chapter sheet ------------------------------ */

function TopicSheet({
  title,
  groups,
  selectedId,
  onSelect,
  onClose,
}: {
  title: string;
  groups: Group[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((t) => !q || t.title.toLowerCase().includes(q) || (t.section ?? "").toLowerCase().includes(q) || String(t.chapterNo ?? "") === q),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Select chapter — ${title}`}>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-fade-in" />
      <div className="glass relative flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-line card-shadow animate-sheet sm:max-w-xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div>
            <Label>Select chapter</Label>
            <p className="mt-2 text-lg font-bold tracking-tight text-fg">{title}</p>
          </div>
          <button type="button" onClick={onClose} className={btn.icon} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 pb-4 sm:px-6">
          <label className="flex items-center gap-2.5 rounded-xl border border-line bg-fg/[0.03] px-3.5 transition focus-within:border-brand/70">
            <Search className="h-4 w-4 shrink-0 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters or type a number"
              className="w-full bg-transparent py-2.5 text-sm text-fg outline-none placeholder:text-subtle"
              aria-label="Search chapters"
            />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain border-t border-line px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4">
          {filtered.length === 0 ? (
            <p className="px-3 py-12 text-center text-sm text-subtle">No chapters match “{query}”.</p>
          ) : (
            filtered.map((g, gi) => (
              <div key={g.label ?? `group-${gi}`} className={cn(gi > 0 && "mt-4")}>
                {g.label ? <p className="px-3 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">{g.label}</p> : null}
                {g.items.map((t) => {
                  const active = t.id === selectedId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelect(t.id);
                        onClose();
                      }}
                      className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition", active ? "bg-brand/10" : "hover:bg-fg/[0.05]")}
                    >
                      <span className={cn("w-7 shrink-0 font-mono text-xs", active ? "text-brand-ink" : "text-subtle")}>
                        {t.chapterNo ? pad2(t.chapterNo) : <Layers className="h-3.5 w-3.5" />}
                      </span>
                      <span className={cn("min-w-0 flex-1 text-sm", active ? "font-semibold text-fg" : "text-fg/85")}>{t.title}</span>
                      <span className="shrink-0 font-mono text-[11px] text-subtle">{t.bankCount} Q</span>
                      {active ? <Check className="h-4 w-4 shrink-0 text-brand-ink" /> : <span className="w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
