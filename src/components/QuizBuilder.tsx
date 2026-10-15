"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ChevronDown, Globe2, Layers, Loader2, Search, X } from "lucide-react";
import { Card, Label, Segmented, SubjectIcon, Switch, btn, chip, inputCls } from "@/components/ui";
import { useFullscreen } from "@/lib/client-hooks";
import { cn, pad2 } from "@/lib/format";
import { quizHref } from "@/lib/links";
import { MAX_QUESTIONS, MAX_TIME, MAX_TOTAL_TIME, MIN_TIME, MIN_TOTAL_TIME, QUESTION_PRESETS, SOURCE_META, TIME_PRESETS, TOTAL_TIME_PRESETS } from "@/lib/settings";
import { loadBuilderPrefs, saveBuilderPrefs, type BuilderPreferences } from "@/lib/storage";
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

const DIFFICULTY_OPTIONS: { v: Difficulty; label: string; hint: string; dot: string }[] = [
  { v: "any", label: "Mixed", hint: "All levels combined", dot: "bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400" },
  { v: "easy", label: "Easy", hint: "Foundational & recall", dot: "bg-emerald-400" },
  { v: "medium", label: "Medium", hint: "Standard problem-solving", dot: "bg-amber-400" },
  { v: "hard", label: "Hard", hint: "Challenging & deep concepts", dot: "bg-rose-400" },
];

function CollapsibleSection({
  stepNumber,
  title,
  preview,
  isOpen,
  onToggle,
  children,
  className,
}: {
  stepNumber?: string;
  title: string;
  preview: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isOpen
          ? "border-brand/50 bg-card shadow-[0_4px_24px_-8px_rgba(249,115,22,0.18)] ring-1 ring-brand/30"
          : "border-line bg-fg/[0.02] hover:border-line-2 hover:bg-fg/[0.035]",
        className,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 p-3.5 sm:p-4 text-left transition select-none cursor-pointer group"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          {stepNumber ? (
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-brand-ink shrink-0">
              {stepNumber}
            </span>
          ) : null}
          <span className="text-xs sm:text-sm font-bold text-fg shrink-0 group-hover:text-brand-ink transition-colors">
            {title}
          </span>
          <span className="text-line-2 text-xs">·</span>
          <div className="min-w-0 truncate">{preview}</div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] sm:text-xs font-semibold text-brand-ink hidden xs:inline">
            {isOpen ? "Close" : "Change"}
          </span>
          <span
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200",
              isOpen
                ? "border-brand/40 bg-brand/10 text-brand-ink"
                : "border-line bg-card text-subtle group-hover:text-fg group-hover:border-line-2",
            )}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300 ease-out", isOpen && "rotate-180")}
            />
          </span>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out border-line/40",
          isOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="p-3.5 sm:p-4 bg-fg/[0.015]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function QuizBuilder({
  topics,
  settings,
  initialTopicId,
}: {
  topics: TopicInfo[];
  settings: UserSettings;
  initialTopicId?: string;
}) {
  const router = useRouter();
  const fs = useFullscreen();
  const byId = useMemo(() => new Map(topics.map((t) => [t.id, t])), [topics]);

  // Load saved builder preferences synchronously once on mount
  const [prefs] = useState<BuilderPreferences>(() => {
    try {
      return loadBuilderPrefs();
    } catch {
      return {};
    }
  });

  const explicitTopic = initialTopicId ? byId.get(initialTopicId) : undefined;
  const savedTopic = prefs.topicId ? byId.get(prefs.topicId) : undefined;
  const savedSubjectMeta = prefs.subject ? SUBJECTS.find((s) => s.id === prefs.subject) : undefined;

  const initTopic =
    explicitTopic ??
    savedTopic ??
    (savedSubjectMeta
      ? topics.find((t) => t.subject === prefs.subject && (prefs.cls ? t.classLevel === prefs.cls : true))
      : undefined) ??
    byId.get("sci10-all") ??
    topics[0];

  const initSubject = initTopic.subject;
  const initCls: ClassSel =
    (explicitTopic ? explicitTopic.classLevel : undefined) ??
    (prefs.classMemory?.[initSubject]) ??
    (prefs.cls && hasClassesFor(initSubject) ? prefs.cls : undefined) ??
    (initTopic.classLevel ?? (initTopic.kind === "general" ? "general" : 10));

  const [subject, setSubject] = useState<SubjectId>(initSubject);
  const [cls, setCls] = useState<ClassSel>(initCls);
  const [topicId, setTopicId] = useState(initTopic.id);
  const [memory, setMemory] = useState<Record<string, string>>(() => ({
    ...(prefs.topicMemory ?? {}),
    [memKey(initSubject, initCls)]: initTopic.id,
  }));
  const [classMemory, setClassMemory] = useState<Partial<Record<SubjectId, ClassSel>>>(() => ({
    ...(prefs.classMemory ?? {}),
    [initSubject]: initCls,
  }));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);
  const [openClass, setOpenClass] = useState(false);
  const [openDifficulty, setOpenDifficulty] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);

  // Independent options loaded from saved preferences (with settings as fallback)
  const initialAmount = typeof prefs.amount === "number" && prefs.amount >= 1 ? prefs.amount : settings.defaultQuestions;
  const [amount, setAmount] = useState<number>(initialAmount);
  const [amountText, setAmountText] = useState(QUESTION_PRESETS.includes(initialAmount) ? "" : String(initialAmount));

  const initialTimerMode: TimerMode =
    prefs.timerMode === "total" || prefs.timerMode === "per-question" ? prefs.timerMode : settings.timerMode;
  const [timerMode, setTimerMode] = useState<TimerMode>(initialTimerMode);

  const initialTime = typeof prefs.time === "number" ? prefs.time : settings.defaultTime;
  const [time, setTime] = useState<number>(initialTime);
  const [timeText, setTimeText] = useState(TIME_PRESETS.includes(initialTime) ? "" : String(initialTime));

  const initialTotalTime =
    typeof prefs.totalTime === "number" && prefs.totalTime >= MIN_TOTAL_TIME ? prefs.totalTime : settings.defaultTotalTime;
  const [totalTime, setTotalTime] = useState<number>(initialTotalTime);
  const [totalText, setTotalText] = useState(TOTAL_TIME_PRESETS.includes(initialTotalTime) ? "" : String(initialTotalTime / 60));

  const initialDifficulty: Difficulty = prefs.difficulty ?? settings.defaultDifficulty;
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);

  const initialHints = typeof prefs.hints === "number" ? prefs.hints : settings.hintsPerQuiz;
  const [hints, setHints] = useState<number>(initialHints);

  const initialFullscreen = typeof prefs.fullscreen === "boolean" ? prefs.fullscreen : settings.autoFullscreen;
  const [fullscreen, setFullscreen] = useState<boolean>(initialFullscreen);

  const [userSource, setUserSource] = useState<SourceId | null>(prefs.userSource ?? null);
  const [customTopic, setCustomTopic] = useState<string>(prefs.customTopic ?? "");
  const [starting, setStarting] = useState(false);

  // Sync when initialTopicId is explicitly provided or updated via external navigation
  useEffect(() => {
    if (!initialTopicId) return;
    const target = byId.get(initialTopicId);
    if (!target || target.id === topicId) return;
    setSubject(target.subject);
    const targetCls: ClassSel = target.classLevel ?? (target.kind === "general" ? "general" : 10);
    setCls(targetCls);
    setTopicId(target.id);
    setMemory((m) => {
      const next = { ...m, [memKey(target.subject, targetCls)]: target.id };
      saveBuilderPrefs({
        subject: target.subject,
        cls: targetCls,
        topicId: target.id,
        topicMemory: next,
      });
      return next;
    });
  }, [initialTopicId, byId, topicId]);

  const topic = byId.get(topicId) ?? initTopic;
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
    const updatedMemory = { ...memory, [memKey(subject, cls)]: id };
    setMemory(updatedMemory);
    saveBuilderPrefs({
      topicId: id,
      topicMemory: updatedMemory,
    });
  }

  function selectSubject(s: SubjectId) {
    if (s === subject) return;
    setSubject(s);
    const targetCls = classMemory[s] ?? (hasClassesFor(s) ? 10 : "general");
    setCls(targetCls);
    const nextTopicId = defaultTopicId(s, targetCls);
    setTopicId(nextTopicId);
    saveBuilderPrefs({
      subject: s,
      cls: targetCls,
      topicId: nextTopicId,
    });
  }

  function selectClass(c: ClassSel) {
    if (c === cls) return;
    setCls(c);
    const nextTopicId = defaultTopicId(subject, c);
    setTopicId(nextTopicId);
    const updatedClassMemory = { ...classMemory, [subject]: c };
    setClassMemory(updatedClassMemory);
    saveBuilderPrefs({
      cls: c,
      topicId: nextTopicId,
      classMemory: updatedClassMemory,
    });
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
  const defaultSource: SourceId = isChapter || subject === "pyq" ? "bank" : "triviaapi";
  const source: SourceId = userSource && topic.sources.includes(userSource)
    ? userSource
    : topic.sources.includes(defaultSource)
    ? defaultSource
    : topic.sources[0];
  const cap = source === "bank" && topic.bankCount !== null ? Math.min(MAX_QUESTIONS, topic.bankCount) : MAX_QUESTIONS;
  const count = Math.max(1, Math.min(amount, cap));
  const summary =
    timerMode === "total"
      ? `${count} Q · ${totalTime ? totalLabel(totalTime) + " total" : "no limit"} · ${hints ? `${hints} hint${hints > 1 ? "s" : ""}` : "no hints"}`
      : `${count} Q · ${time ? `${time}s each` : "no limit"} · ${hints ? `${hints} hint${hints > 1 ? "s" : ""}` : "no hints"} · ~${Math.max(1, Math.round((count * (time || 20)) / 60))} min`;

  function start() {
    if (starting) return;
    setStarting(true);
    const wantFs = fullscreen && fs.supported;
    if (wantFs && !fs.isFullscreen) void fs.enter(); // must run inside user gesture click
    router.push(
      quizHref({
        topicId: topic.id,
        amount: count,
        time: timerMode === "per-question" ? time : 0,
        timerMode,
        totalTime,
        difficulty,
        source,
        hints,
        fullscreen: wantFs,
        customTopic: customTopic.trim() || undefined,
      }),
    );
  }

  const startButton = (className?: string) => (
    <button type="button" onClick={start} disabled={starting} className={cn(btn.primary, className)}>
      {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Start quiz
      {starting ? null : <ArrowRight className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="w-full max-w-full min-w-0">
      <div className="grid w-full max-w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* ------------------------------ Left Column: Topic & Content ------------------------------ */}
        <Card className="w-full max-w-full min-w-0 overflow-hidden p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Section: Subject (Collapsible) */}
          <CollapsibleSection
            stepNumber="01"
            title="Subject"
            isOpen={openSubject}
            onToggle={() => setOpenSubject((prev) => !prev)}
            preview={
              <div className="inline-flex items-center gap-1.5 min-w-0">
                <SubjectIcon subject={subject} size="sm" className="h-5 w-5 rounded-md text-brand-ink" />
                <span className="text-xs sm:text-sm font-semibold text-fg truncate">
                  {SUBJECTS.find((s) => s.id === subject)?.short ?? subject}
                </span>
              </div>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUBJECTS.map((s) => {
                const active = s.id === subject;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      selectSubject(s.id);
                      setOpenSubject(false);
                    }}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border p-2.5 sm:p-3 text-left transition-all duration-200 active:scale-[0.98]",
                      active
                        ? "border-brand bg-brand/15 text-brand-ink shadow-[0_0_12px_rgba(249,115,22,0.25)] font-semibold"
                        : "border-line bg-card text-muted hover:border-line-2 hover:bg-fg/[0.03] hover:text-fg",
                    )}
                  >
                    <SubjectIcon subject={s.id} size="sm" active={active} className="h-7 w-7 rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold truncate text-fg">{s.short}</p>
                      <p className="text-[10px] sm:text-[11px] text-subtle truncate">{s.tagline}</p>
                    </div>
                    {active && <Check className="h-4 w-4 text-brand-ink shrink-0" />}
                  </button>
                );
              })}
            </div>
          </CollapsibleSection>

          {/* Section: Class (Collapsible, if hasClasses) */}
          {hasClasses ? (
            <CollapsibleSection
              stepNumber="02"
              title="Class"
              isOpen={openClass}
              onToggle={() => setOpenClass((prev) => !prev)}
              preview={
                <span className="rounded-md bg-brand/10 border border-brand/20 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-brand-ink">
                  {cls === "general" ? "General / Mixed" : `Class ${cls}`}
                </span>
              }
            >
              <div className="grid grid-cols-3 gap-2">
                {([
                  { c: 10 as ClassSel, label: "Class 10", hint: "Board Syllabus" },
                  { c: 9 as ClassSel, label: "Class 9", hint: "Foundations" },
                  { c: "general" as ClassSel, label: "General", hint: "Mixed levels" },
                ]).map(({ c, label, hint }) => {
                  const active = cls === c;
                  return (
                    <button
                      key={String(c)}
                      type="button"
                      onClick={() => {
                        selectClass(c);
                        setOpenClass(false);
                      }}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border p-2.5 sm:p-3 text-center transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "border-brand bg-brand/15 text-fg ring-1 ring-brand shadow-[0_0_12px_rgba(249,115,22,0.25)] font-semibold"
                          : "border-line bg-card text-muted hover:border-line-2 hover:bg-fg/[0.03] hover:text-fg",
                      )}
                    >
                      <span className="text-xs sm:text-sm font-bold text-fg">{label}</span>
                      <span className="text-[10px] sm:text-[11px] text-subtle mt-0.5">{hint}</span>
                    </button>
                  );
                })}
              </div>
            </CollapsibleSection>
          ) : null}

          {/* Section: Chapter / Topic */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label n={hasClasses ? "03" : "02"}>
                {hasClasses && cls !== "general" ? "Chapter" : "Topic"}
              </Label>
              <span className="font-mono text-[10.5px] text-subtle">
                {hasClasses && cls !== "general" ? "NCERT aligned" : "Syllabus topic"}
              </span>
            </div>

            <div>
              {hasClasses && cls !== "general" ? (
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-card p-3.5 text-left transition hover:border-line-2 hover:bg-fg/[0.02]"
                  aria-haspopup="dialog"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line font-mono text-sm text-brand-ink bg-fg/[0.02]">
                    {topic.chapterNo ? pad2(topic.chapterNo) : <Layers className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-fg">{topic.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-subtle">
                      {topic.section ? `${topic.section} · ` : ""}
                      {topic.bankCount} questions · NCERT-aligned
                    </span>
                  </span>
                  <span className="hidden text-xs font-semibold text-brand-ink transition group-hover:underline sm:inline">
                    Change Chapter
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-subtle transition group-hover:text-fg" />
                </button>
              ) : hasClasses ? (
                generalTopic ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-brand/40 bg-brand/[0.05] p-3.5 glow-soft">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-brand-ink bg-card">
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
                    <div className="space-y-3 rounded-2xl border border-brand/35 bg-brand/[0.04] p-3.5">
                      <div>
                        <p className="text-sm font-semibold text-fg">Enter your custom quiz topic</p>
                        <p className="mt-0.5 text-xs text-muted">Type any topic — Trivia API will fetch questions for it!</p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <input
                            type="text"
                            value={customTopic}
                            onChange={(e) => {
                              setCustomTopic(e.target.value);
                              saveBuilderPrefs({ customTopic: e.target.value });
                            }}
                            placeholder="e.g. Cricket, AI, Space, World History..."
                            className="w-full rounded-xl border border-line bg-card px-3 py-2 text-sm font-medium text-fg outline-none transition focus:border-brand"
                          />
                          {customTopic ? (
                            <button
                              type="button"
                              onClick={() => {
                                setCustomTopic("");
                                saveBuilderPrefs({ customTopic: "" });
                              }}
                              className="rounded-xl border border-line p-2 text-subtle hover:text-fg"
                              title="Clear"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          "Space & Astronomy",
                          "Artificial Intelligence",
                          "World War II",
                          "Cricket",
                          "World Geography",
                          "Inventions",
                          "Human Body",
                          "Animals & Nature",
                        ].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              setCustomTopic(tag);
                              saveBuilderPrefs({ customTopic: tag });
                              const match = flatTopics.find((t) => t.title.toLowerCase().includes(tag.toLowerCase().split(" ")[0]));
                              if (match) selectTopic(match.id);
                            }}
                            className={cn(
                              "rounded-lg border px-2.5 py-1 text-xs font-medium transition",
                              customTopic.toLowerCase() === tag.toLowerCase()
                                ? "border-brand bg-brand/15 text-brand-ink"
                                : "border-line bg-card text-muted hover:border-line-2 hover:text-fg",
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
                              saveBuilderPrefs({ customTopic: t.title });
                            }
                          }}
                          aria-pressed={active}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition active:scale-[0.99]",
                            active
                              ? "border-brand bg-brand/[0.07] ring-1 ring-brand/60 shadow-[0_0_16px_-4px_rgba(249,115,22,0.3)] font-semibold"
                              : "border-line bg-card hover:border-line-2 hover:bg-fg/[0.02]",
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
          </div>

          {/* Section: Question Source */}
          <div className="border-t border-line/60 pt-4 sm:pt-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <Label n={hasClasses ? "04" : "03"}>Source</Label>
              <span className="font-mono text-[10.5px] text-subtle">
                {source === "bank" && isChapter ? "NCERT Bank" : SOURCE_SHORT[source]}
              </span>
            </div>

            <div className="grid w-full max-w-full min-w-0 grid-cols-3 gap-1 rounded-xl border border-line bg-fg/[0.02] p-1">
              {([
                {
                  id: "bank" as SourceId,
                  label: isChapter ? "NCERT Bank" : "Curated",
                  badge: isChapter ? "📖" : "📚",
                  hint: isChapter ? "NCERT syllabus-aligned chapter questions" : "Curated offline bank",
                },
                {
                  id: "triviaapi" as SourceId,
                  label: "Trivia API",
                  badge: "🌐",
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
                    onClick={() => {
                      setUserSource(sItem.id);
                      saveBuilderPrefs({ userSource: sItem.id });
                    }}
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
            <p className="text-[10.5px] sm:text-[11px] text-subtle leading-relaxed">
              {source === "bank"
                ? "📚 NCERT Curated Bank: Textbook questions with hints & explanations (Best for school & exams)."
                : source === "triviaapi"
                ? isChapter
                  ? "🌐 Trivia API: Online questions filtered by this discipline (e.g. chemistry/physics)."
                  : "🌐 Trivia API: Broad questions from the online trivia database (Best for custom topics)."
                : "🌐 Open Trivia DB: Community-submitted trivia."}
            </p>
          </div>
        </Card>

        {/* ------------------------------ Right Column: Quiz Rules & Format ------------------------------ */}
        <Card className="flex w-full max-w-full min-w-0 flex-col overflow-hidden">
          <div className="w-full max-w-full min-w-0 flex-1 space-y-4 sm:space-y-5 p-4 sm:p-6">
            {/* Section: Questions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label n="01">Questions</Label>
                <span className="font-mono text-[10.5px] text-subtle">
                  1–{cap}{cap < MAX_QUESTIONS ? " available" : ""}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {QUESTION_PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    disabled={n > cap}
                    aria-pressed={!amountText && count === n}
                    onClick={() => {
                      setAmount(n);
                      setAmountText("");
                      saveBuilderPrefs({ amount: n });
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
                    if (n >= 1) {
                      const clamped = Math.min(cap, n);
                      setAmount(clamped);
                      saveBuilderPrefs({ amount: clamped });
                    }
                  }}
                  onBlur={() => {
                    if (amountText) {
                      setAmountText(String(count));
                      saveBuilderPrefs({ amount: count });
                    }
                  }}
                  className={cn(inputCls(!!amountText), "w-20 sm:w-24 text-xs sm:text-sm py-1.5 sm:py-2")}
                />
              </div>
            </div>

            {/* Section: Difficulty (Collapsible) */}
            <CollapsibleSection
              stepNumber="02"
              title="Difficulty"
              isOpen={openDifficulty}
              onToggle={() => setOpenDifficulty((prev) => !prev)}
              preview={
                <div className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-fg">
                  <span className={cn("h-2 w-2 rounded-full shrink-0", (DIFFICULTY_OPTIONS.find((d) => d.v === difficulty) ?? DIFFICULTY_OPTIONS[0]).dot)} />
                  <span className="capitalize">{difficulty === "any" ? "Mixed / Any" : difficulty}</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DIFFICULTY_OPTIONS.map((d) => {
                  const active = difficulty === d.v;
                  return (
                    <button
                      key={d.v}
                      type="button"
                      onClick={() => {
                        setDifficulty(d.v);
                        saveBuilderPrefs({ difficulty: d.v });
                        setOpenDifficulty(false);
                      }}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-xl border p-2.5 sm:p-3 text-center transition-all duration-200 active:scale-[0.98]",
                        active
                          ? "border-brand bg-brand/15 text-fg ring-1 ring-brand shadow-[0_0_12px_rgba(249,115,22,0.25)] font-semibold"
                          : "border-line bg-card text-muted hover:border-line-2 hover:bg-fg/[0.03] hover:text-fg",
                      )}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-full shrink-0", d.dot)} />
                        <span className="text-xs sm:text-sm font-bold text-fg">{d.label}</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-subtle mt-0.5">{d.hint}</span>
                    </button>
                  );
                })}
              </div>
            </CollapsibleSection>

            {/* Section: Timer (Collapsible) */}
            <CollapsibleSection
              stepNumber="03"
              title="Timer"
              isOpen={openTimer}
              onToggle={() => setOpenTimer((prev) => !prev)}
              preview={
                <div className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-fg">
                  <span className="text-brand-ink">⏱️</span>
                  <span>
                    {timerMode === "per-question"
                      ? time === 0
                        ? "No limit"
                        : `${time}s / Q`
                      : totalTime
                      ? `${totalLabel(totalTime)} total`
                      : "No limit"}
                  </span>
                </div>
              }
            >
              <div className="space-y-3.5">
                <Segmented<TimerMode>
                  value={timerMode}
                  onChange={(m) => {
                    setTimerMode(m);
                    saveBuilderPrefs({ timerMode: m });
                  }}
                  options={[
                    { v: "per-question", label: "Per question" },
                    { v: "total", label: "Whole quiz" },
                  ]}
                />

                {timerMode === "per-question" ? (
                  <>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {TIME_PRESETS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={!timeText && time === t}
                          onClick={() => {
                            setTime(t);
                            setTimeText("");
                            saveBuilderPrefs({ time: t });
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
                            if (n >= MIN_TIME) {
                              const clamped = Math.min(MAX_TIME, n);
                              setTime(clamped);
                              saveBuilderPrefs({ time: clamped });
                            }
                          }}
                          onBlur={() => {
                            if (!timeText) return;
                            const n = Math.min(MAX_TIME, Math.max(MIN_TIME, parseInt(timeText, 10) || MIN_TIME));
                            setTime(n);
                            setTimeText(String(n));
                            saveBuilderPrefs({ time: n });
                          }}
                          className={cn(inputCls(!!timeText), "w-24 sm:w-28 pr-8 sm:pr-9 text-xs sm:text-sm py-1.5 sm:py-2")}
                        />
                        <span className="pointer-events-none absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] sm:text-[11px] text-subtle">sec</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-subtle">
                      {MIN_TIME}–{MAX_TIME}s each. Faster answers earn a speed bonus.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {TOTAL_TIME_PRESETS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={!totalText && totalTime === t}
                          onClick={() => {
                            setTotalTime(t);
                            setTotalText("");
                            saveBuilderPrefs({ totalTime: t });
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
                            if (n >= 1) {
                              const clamped = Math.min(MAX_TOTAL_TIME, n * 60);
                              setTotalTime(clamped);
                              saveBuilderPrefs({ totalTime: clamped });
                            }
                          }}
                          onBlur={() => {
                            if (!totalText) return;
                            const m = Math.min(Math.round(MAX_TOTAL_TIME / 60), Math.max(Math.round(MIN_TOTAL_TIME / 60), parseInt(totalText, 10) || 5));
                            setTotalTime(m * 60);
                            setTotalText(String(m));
                            saveBuilderPrefs({ totalTime: m * 60 });
                          }}
                          className={cn(inputCls(!!totalText), "w-24 sm:w-28 pr-8 sm:pr-9 text-xs sm:text-sm py-1.5 sm:py-2")}
                        />
                        <span className="pointer-events-none absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] sm:text-[11px] text-subtle">min</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-subtle">
                      {MIN_TOTAL_TIME / 60}–{Math.round(MAX_TOTAL_TIME / 60)} min total. Unanswered questions count as skipped.
                    </p>
                  </>
                )}
              </div>
            </CollapsibleSection>

            {/* Section: Preferences */}
            <div className="border-t border-line/60 pt-4 sm:pt-5 space-y-3.5">
              <Label n="04">Preferences</Label>
              <div className="space-y-3 sm:space-y-4">
                {source === "triviaapi" && subject !== "custom" ? (
                  <OptionRow label="Topic tag (optional)" hint="Refine trivia with a keyword (e.g. space, coding, nature)">
                    <input
                      type="text"
                      placeholder="Optional tag…"
                      value={customTopic}
                      onChange={(e) => {
                        setCustomTopic(e.target.value);
                        saveBuilderPrefs({ customTopic: e.target.value });
                      }}
                      className={cn(inputCls(!!customTopic), "w-full sm:w-44 text-xs sm:text-sm py-1.5 sm:py-2")}
                      maxLength={60}
                    />
                  </OptionRow>
                ) : null}
                <OptionRow label="Hints" hint="Clue + wrong options removed (−30 pts each)">
                  <Segmented
                    value={hints}
                    onChange={(h) => {
                      setHints(h);
                      saveBuilderPrefs({ hints: h });
                    }}
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
                  onChange={(f) => {
                    setFullscreen(f);
                    saveBuilderPrefs({ fullscreen: f });
                  }}
                  disabled={!fs.supported}
                  label="Full screen"
                  description={fs.supported ? "Distraction-free mode when the quiz starts" : "Not supported in this browser"}
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-full min-w-0 border-t border-line p-4 sm:p-5 bg-fg/[0.01]">
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
