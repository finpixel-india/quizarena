"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenText,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  ExternalLink,
  Filter,
  Flame,
  FlaskConical,
  HelpCircle,
  ImageIcon,
  Landmark,
  Languages,
  Layers,
  LayoutGrid,
  Lightbulb,
  ListChecks,
  Monitor,
  PenLine,
  RotateCcw,
  Search,
  Sigma,
  Sparkles,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { DiagramFrame } from "@/components/notes/DiagramKit";
import { getDiagram } from "@/components/notes";
import { GeneralScienceViewer } from "@/components/notes/GeneralScienceViewer";
import { Badge, Card, Container, Label, btn } from "@/components/ui";
import { haptic } from "@/lib/haptics";
import {
  NOTES_COUNTS,
  NOTES_SUBJECTS,
  notesByClass,
  searchChapters,
  type ClassLevel,
  type NoteChapter,
  type NotesSubjectId,
} from "@/data/notes";
import { HINDI_ANSWERS } from "@/data/notes/hindiAnswers";
import { IT_ANSWERS } from "@/data/notes/itAnswers";
import { ENGLISH_ANSWERS } from "@/data/notes/englishAnswers";
import { SST_ANSWERS } from "@/data/notes/sstAnswers";
import { MATH_ANSWERS } from "@/data/notes/mathAnswers";
import { SCIENCE_ANSWERS } from "@/data/notes/scienceAnswers";
import { GENERAL_SCIENCE_ANSWERS } from "@/data/notes/scienceGeneralAnswers";
import { cn, pad2 } from "@/lib/format";

/* -------------------------------------------------------------------------- */
/*                               KEY NORMALIZER                               */
/* -------------------------------------------------------------------------- */

function normalizeKey(k?: string): string {
  if (!k) return "";
  const trimmed = k.trim().toUpperCase();
  const map: Record<string, string> = {
    "क": "A",
    "ख": "B",
    "ग": "C",
    "घ": "D",
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "D",
    "TRUE": "A",
    "FALSE": "B",
    "T": "A",
    "F": "B",
  };
  return map[k.trim()] || map[trimmed] || trimmed;
}

/* -------------------------------------------------------------------------- */
/*                            RICH TEXT FORMATTER                             */
/* -------------------------------------------------------------------------- */

function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-fg">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                            PARSED QUESTION TYPES                           */
/* -------------------------------------------------------------------------- */

interface ParsedQuestion {
  id: string;
  num?: string;
  text: string;
  type: "mcq" | "text" | "prompt";
  options?: Array<{ key: string; text: string }>;
}

function extractOptions(str: string): Array<{ key: string; text: string }> {
  if (!str) return [];
  if (/\([क-घA-Da-d1-4]\)/.test(str)) {
    const matches = [...str.matchAll(/\(([क-घA-Da-d1-4])\)\s*([^()]+)/g)];
    if (matches.length >= 2) {
      return matches.map((m) => ({ key: m[1], text: m[2].trim() }));
    }
  }
  if (/(?:^|\s{2,}|\s+[·•]\s+|\n)\s*[A-D]\.\s+/.test(str)) {
    const matches = [
      ...str.matchAll(
        /(?:^|\s{2,}|\s+[·•]\s+|\n)\s*([A-D])\.\s+([\s\S]+?)(?=(?:\s{2,}|\s+[·•]\s+|\n)\s*[A-D]\.|$)/g
      ),
    ];
    if (matches.length >= 2) {
      return matches.map((m) => ({ key: m[1], text: m[2].trim() }));
    }
  }
  return [];
}

function parseAbhyasPoints(
  points: string[] = [],
  secTitle = ""
): { instructions: string[]; questions: ParsedQuestion[] } {
  const instructions: string[] = [];
  const questions: ParsedQuestion[] = [];
  const isTrueFalseSec = /true\s*(?:or|\/)\s*false/i.test(secTitle);

  for (let i = 0; i < points.length; i++) {
    const raw = points[i].trim();
    if (!raw) continue;

    if (
      raw.includes("उत्तरमाला") ||
      raw.includes("उत्तर देखें") ||
      raw.includes("<a id=") ||
      raw.toLowerCase().includes("answer key") ||
      raw.toLowerCase().includes("consult the answer")
    ) {
      continue;
    }

    if (
      raw.startsWith("*निर्देश") ||
      raw.startsWith("निर्देश:") ||
      raw.startsWith("**निर्देश") ||
      raw.startsWith("*समय-सुझाव")
    ) {
      instructions.push(raw.replace(/^[*_]+/, "").replace(/[*_]+$/, ""));
      continue;
    }

    const lines = raw.split("\n");
    const firstLine = lines[0].trim();
    const rest = lines.slice(1).join("\n").trim();

    const qNumMatch = firstLine.match(/^(?:\*{1,2})?(?:Q\.?|प्रश्न\s*|Q\s*)?(\d+)[.):]\s*(.*)$/);
    const num = qNumMatch ? qNumMatch[1] : undefined;
    const bodyText = qNumMatch ? qNumMatch[2].replace(/\*\*$/, "").trim() : firstLine.replace(/^\*\*|\*\*$/g, "").trim();

    const opts = extractOptions(rest || bodyText);

    if (opts.length >= 2) {
      questions.push({
        id: `q-${i}`,
        num,
        text: rest ? bodyText : bodyText.replace(/\([क-घA-Da-d1-4]\)[\s\S]*$/, "").trim(),
        type: "mcq",
        options: opts,
      });
      continue;
    }

    if (isTrueFalseSec && num) {
      questions.push({
        id: `q-tf-${i}`,
        num,
        text: bodyText,
        type: "mcq",
        options: [
          { key: "A", text: "True (सत्य)" },
          { key: "B", text: "False (असत्य)" },
        ],
      });
      continue;
    }

    questions.push({
      id: `q-p-${i}`,
      text: raw,
      type: "prompt",
    });
  }

  return { instructions, questions };
}

/* -------------------------------------------------------------------------- */
/*                            QUESTION CARD (ABHYAS)                          */
/* -------------------------------------------------------------------------- */

function QuestionCard({
  chapterId,
  q,
  selectedOpt,
  onSelectOpt,
  scratch,
  onChangeScratch,
}: {
  chapterId: string;
  q: ParsedQuestion;
  selectedOpt?: string;
  onSelectOpt: (key: string) => void;
  scratch?: string;
  onChangeScratch: (text: string) => void;
}) {
  const [showScratch, setShowScratch] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const isHindi = chapterId.startsWith("note-hi");
  const ans = q.num
    ? HINDI_ANSWERS[`${chapterId}-${q.num}`] ||
      IT_ANSWERS[`${chapterId}-${q.num}`] ||
      ENGLISH_ANSWERS[`${chapterId}-${q.num}`] ||
      SST_ANSWERS[`${chapterId}-${q.num}`] ||
      MATH_ANSWERS[`${chapterId}-${q.num}`] ||
      SCIENCE_ANSWERS[`${chapterId}-${q.num}`] ||
      GENERAL_SCIENCE_ANSWERS[`${chapterId}-${q.num}`]
    : undefined;
  const hasValidation = Boolean(ans?.correctKey);
  const isSelected = Boolean(selectedOpt);
  const isCorrect =
    hasValidation && isSelected ? normalizeKey(selectedOpt) === normalizeKey(ans?.correctKey) : false;

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 sm:p-5 transition-all duration-200 card-shadow",
        isSelected
          ? hasValidation
            ? isCorrect
              ? "border-emerald-500/40 bg-emerald-500/[0.03]"
              : "border-rose-500/40 bg-rose-500/[0.03]"
            : "border-brand/50 bg-brand/[0.04]"
          : "border-line bg-card hover:border-line-2"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {q.num ? (
            <span className="inline-flex items-center rounded-lg border border-brand/40 bg-brand/10 px-2.5 py-0.5 font-mono text-xs font-bold text-brand-ink">
              {isHindi ? `प्रश्न ${pad2(Number(q.num) || 0) || q.num}` : `Q${pad2(Number(q.num) || 0) || q.num}`}
            </span>
          ) : null}
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-subtle font-semibold">
            {q.type === "mcq" ? (isHindi ? "बहुविकल्पी" : "Multiple Choice") : isHindi ? "लघु-उत्तर / अभ्यास" : "Practice Question"}
          </span>
        </div>

        {isSelected ? (
          hasValidation ? (
            isCorrect ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> {isHindi ? "सही उत्तर!" : "Correct!"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                <XCircle className="h-4 w-4" /> {isHindi ? `गलत उत्तर (सही: ${ans?.correctKey})` : `Incorrect (Correct: ${ans?.correctKey})`}
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-brand-ink">
              <CheckCircle2 className="h-4 w-4" /> {isHindi ? `विकल्प (${selectedOpt}) चुना गया` : `Option (${selectedOpt}) selected`}
            </span>
          )
        ) : null}
      </div>

      <p className="mt-3 text-sm sm:text-base font-semibold leading-relaxed text-fg">
        <Rich text={q.text} />
      </p>

      {q.type === "mcq" && q.options?.length ? (
        <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt) => {
            const isChosen = selectedOpt === opt.key;
            const isOptionCorrect = hasValidation && normalizeKey(opt.key) === normalizeKey(ans?.correctKey);

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  haptic("light");
                  onSelectOpt(opt.key);
                }}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl border p-3 text-left transition active:scale-98",
                  isSelected
                    ? hasValidation
                      ? isOptionCorrect
                        ? "border-emerald-500 bg-emerald-500/[0.12] ring-1 ring-emerald-500/50 text-fg"
                        : isChosen
                        ? "border-rose-500 bg-rose-500/[0.12] ring-1 ring-rose-500/50 text-fg"
                        : "border-line/60 bg-fg/[0.01] text-subtle opacity-60"
                      : isChosen
                      ? "border-brand bg-brand/[0.12] ring-1 ring-brand/60 text-fg"
                      : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg"
                    : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:text-fg"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold transition mt-0.5",
                    isSelected && hasValidation
                      ? isOptionCorrect
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isChosen
                        ? "border-rose-500 bg-rose-500 text-white"
                        : "border-line bg-bg text-subtle"
                      : isChosen
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-bg text-subtle"
                  )}
                >
                  {opt.key}
                </span>
                <span className="text-xs sm:text-sm leading-snug flex-1">
                  <Rich text={opt.text} />
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {isSelected && ans?.explanation ? (
        <div className="mt-3.5 rounded-xl border border-line-2 bg-fg/[0.03] p-3.5 text-xs sm:text-sm animate-fade-in space-y-1">
          <p className="font-semibold text-fg flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
            <span>{isHindi ? "व्याख्या व नियम:" : "Explanation & Rationale:"}</span>
          </p>
          <div className="leading-relaxed text-muted pl-5">
            <Rich text={ans.explanation} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            ABHYAS ARENA COMPONENT                          */
/* -------------------------------------------------------------------------- */

function AbhyasArena({ chapter }: { chapter: NoteChapter }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [scratchNotes, setScratchNotes] = useState<Record<string, string>>({});
  const [activeSectionIdx, setActiveSectionIdx] = useState<number | "all">("all");

  const isHindi = chapter.id.startsWith("note-hi");

  useEffect(() => {
    setActiveSectionIdx("all");
    setSelectedAnswers({});
    setScratchNotes({});
  }, [chapter.id]);

  const parsedSections = useMemo(() => {
    return chapter.sections.map((sec, idx) => {
      const parsed = parseAbhyasPoints(sec.points || [], sec.title);
      const mcqs = parsed.questions.filter((q) => q.type === "mcq");
      return {
        index: idx,
        title: sec.title,
        instructions: parsed.instructions,
        questions: mcqs,
        table: sec.table,
        tip: sec.tip,
      };
    });
  }, [chapter.sections]);

  const visibleSections = useMemo(() => {
    if (activeSectionIdx === "all") return parsedSections;
    return parsedSections.filter((s) => s.index === activeSectionIdx);
  }, [parsedSections, activeSectionIdx]);

  return (
    <div className="space-y-6 animate-fade-in">
      {parsedSections.length > 1 ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
          <button
            type="button"
            onClick={() => {
              haptic("light");
              setActiveSectionIdx("all");
            }}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
              activeSectionIdx === "all"
                ? "border-brand bg-brand/[0.12] text-brand-ink"
                : "border-line text-muted hover:border-line-2 hover:text-fg"
            )}
          >
            {isHindi ? "सभी खंड" : "All Sections"}
          </button>
          {parsedSections.map((s) => (
            <button
              key={s.index}
              type="button"
              onClick={() => {
                haptic("light");
                setActiveSectionIdx(s.index);
              }}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
                activeSectionIdx === s.index
                  ? "border-brand bg-brand/[0.12] text-brand-ink"
                  : "border-line text-muted hover:border-line-2 hover:text-fg"
              )}
            >
              {s.title} ({s.questions.length})
            </button>
          ))}
        </div>
      ) : null}

      <div className="space-y-6">
        {visibleSections.map((sec) => (
          <section key={sec.title} className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-fg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand shrink-0" /> {sec.title}
            </h3>

            {sec.instructions.length ? (
              <div className="rounded-xl border border-brand/30 bg-brand/[0.04] p-3 text-xs sm:text-sm text-fg">
                {sec.instructions.map((inst, ii) => (
                  <p key={ii} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="font-mono font-bold text-xs text-brand-ink">
                      {isHindi ? "निर्देश:" : "Instructions:"}
                    </span>
                    <span>
                      <Rich text={inst} />
                    </span>
                  </p>
                ))}
              </div>
            ) : null}

            <div className="space-y-3 pt-1">
              {sec.questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  chapterId={chapter.id}
                  q={q}
                  selectedOpt={selectedAnswers[q.id]}
                  onSelectOpt={(key) =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [q.id]: prev[q.id] === key ? "" : key,
                    }))
                  }
                  scratch={scratchNotes[q.id]}
                  onChangeScratch={(text) =>
                    setScratchNotes((prev) => ({ ...prev, [q.id]: text }))
                  }
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SUBJECT GLYPH ICON                              */
/* -------------------------------------------------------------------------- */

function SubjectGlyph({ id, active = false }: { id: NotesSubjectId; active?: boolean }) {
  const Icon =
    id === "science"
      ? FlaskConical
      : id === "sst"
      ? Landmark
      : id === "math"
      ? Calculator
      : id === "english"
      ? BookOpenText
      : id === "it"
      ? Monitor
      : Languages;
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border transition",
        active
          ? "border-transparent bg-brand text-white shadow-sm"
          : "border-line bg-fg/[0.03] text-brand-ink"
      )}
    >
      <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                  COLLAPSIBLE INTERACTIVE SECTION BLOCK                     */
/* -------------------------------------------------------------------------- */

function InteractiveSectionBlock({
  index,
  section,
  chapterId,
  isExpanded,
  onToggle,
  fontSizeClass,
}: {
  index: number;
  section: NoteChapter["sections"][number];
  chapterId: string;
  isExpanded: boolean;
  onToggle: () => void;
  fontSizeClass: string;
}) {
  const isSectionAbhyas =
    section.title.includes("अभ्यास") ||
    section.title.includes("स्व-जाँच") ||
    section.title.toLowerCase().includes("practice questions") ||
    section.title.toLowerCase().includes("practice arena") ||
    section.title.toLowerCase().includes("self-assessment");

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [scratchNotes, setScratchNotes] = useState<Record<string, string>>({});
  const [copiedFormula, setCopiedFormula] = useState(false);

  const parsed = useMemo(() => {
    if (!isSectionAbhyas) return null;
    return parseAbhyasPoints(section.points || [], section.title);
  }, [isSectionAbhyas, section.points, section.title]);

  const hasMcqs = parsed ? parsed.questions.some((q) => q.type === "mcq") : false;

  const pointsCount = section.points?.length || 0;
  const hasFormula = Boolean(section.formula?.length);
  const hasTable = Boolean(section.table);

  const handleCopyFormula = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!section.formula) return;
    navigator.clipboard.writeText(section.formula.join("\n"));
    haptic("success");
    setCopiedFormula(true);
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  return (
    <div
      id={`section-${index}`}
      className={cn(
        "rounded-2xl border transition-all duration-200 card-shadow overflow-hidden scroll-mt-24",
        isExpanded ? "border-line bg-card" : "border-line/70 bg-card/60 hover:border-line hover:bg-card"
      )}
    >
      {/* ─── Header: Always Clickable & Accordion-Ready ─── */}
      <button
        type="button"
        onClick={() => {
          haptic("light");
          onToggle();
        }}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition select-none hover:bg-fg/[0.015]"
      >
        <div className="flex items-center gap-3 min-w-0 pr-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-brand/10 text-brand-ink shrink-0 border border-brand/20">
            {pad2(index)}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-fg text-sm sm:text-base leading-snug truncate">
              {section.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-subtle">
              {pointsCount > 0 && <span>{pointsCount} key points</span>}
              {hasFormula && (
                <>
                  <span>·</span>
                  <span className="text-brand-ink">Formula included</span>
                </>
              )}
              {hasTable && (
                <>
                  <span>·</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Reference table</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center border border-line/60 bg-fg/[0.02] text-subtle transition-transform duration-200",
              isExpanded && "rotate-180 bg-brand/10 text-brand-ink border-brand/30"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </button>

      {/* ─── Body Content: Collapsible with Smooth Reveal ─── */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-0 border-t border-line/50 space-y-4 animate-fade-in">
          {isSectionAbhyas && parsed && hasMcqs ? (
            <div className="space-y-3 pt-3">
              {parsed.instructions.length ? (
                <div className="rounded-xl border border-brand/30 bg-brand/[0.04] p-3 text-xs text-fg">
                  {parsed.instructions.map((inst, ii) => (
                    <p key={ii} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="font-mono font-bold text-brand-ink">Instructions:</span>
                      <span>
                        <Rich text={inst} />
                      </span>
                    </p>
                  ))}
                </div>
              ) : null}

              <div className="space-y-3">
                {parsed.questions
                  .filter((q) => q.type === "mcq")
                  .map((q) => (
                    <QuestionCard
                      key={q.id}
                      chapterId={chapterId}
                      q={q}
                      selectedOpt={selectedAnswers[q.id]}
                      onSelectOpt={(key) =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [q.id]: prev[q.id] === key ? "" : key,
                        }))
                      }
                      scratch={scratchNotes[q.id]}
                      onChangeScratch={(text) =>
                        setScratchNotes((prev) => ({ ...prev, [q.id]: text }))
                      }
                    />
                  ))}
              </div>
            </div>
          ) : (
            <>
              {/* Bullet Points */}
              {section.points?.length ? (
                <ul className={cn("space-y-2.5 pt-3", fontSizeClass)}>
                  {section.points.map((p, i) => (
                    <li key={i} className="flex gap-2.5 leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span className="flex-1">
                        <Rich text={p} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Formula Block */}
              {section.formula?.length ? (
                <div className="rounded-xl border border-brand/30 bg-brand/[0.03] p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-ink">
                    <span className="flex items-center gap-1.5">
                      <Sigma className="h-3.5 w-3.5" /> Formula / Derivation
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyFormula}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-brand/10 transition"
                      title="Copy formula text"
                    >
                      {copiedFormula ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span className="text-[10px] font-normal">{copiedFormula ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm text-fg leading-relaxed overflow-x-auto p-1">
                    {section.formula.join("\n")}
                  </pre>
                </div>
              ) : null}

              {/* Reference Table */}
              {section.table ? (
                <div className="space-y-1.5">
                  <div className="overflow-x-auto rounded-xl border border-line bg-card shadow-xs">
                    <table className="w-full min-w-[32rem] border-collapse text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-fg/[0.04] border-b border-line">
                          {section.table.head.map((h) => (
                            <th key={h} className="px-3.5 py-3 font-mono text-xs uppercase tracking-wider text-subtle">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line/60">
                        {section.table.rows.map((row, ri) => (
                          <tr key={ri} className="hover:bg-fg/[0.02] transition">
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className={cn(
                                  "px-3.5 py-3 align-top leading-relaxed",
                                  ci === 0 ? "font-semibold text-fg" : "text-muted"
                                )}
                              >
                                <Rich text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* Key Tip Callout */}
              {section.tip ? (
                <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-3 text-xs sm:text-sm text-fg">
                  <Lightbulb className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-amber-600 dark:text-amber-400 font-mono text-xs uppercase">
                      Exam Memory Key:{" "}
                    </strong>
                    <Rich text={section.tip} />
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MAIN NOTES BROWSER                              */
/* -------------------------------------------------------------------------- */

export default function NotesBrowser() {
  const router = useRouter();
  const sp = useSearchParams();

  const subjectFromUrl = sp.get("subject");
  const subject: NotesSubjectId =
    subjectFromUrl === "sst" ||
    subjectFromUrl === "math" ||
    subjectFromUrl === "english" ||
    subjectFromUrl === "hindi" ||
    subjectFromUrl === "it"
      ? subjectFromUrl
      : "science";

  const rawClass = sp.get("class");
  const parsedClass: ClassLevel =
    rawClass === "10"
      ? 10
      : rawClass === "competitive"
      ? "competitive"
      : rawClass === "ai"
      ? "ai"
      : rawClass === "general"
      ? "general"
      : 9;

  const validClasses = (NOTES_SUBJECTS.find((s) => s.id === subject)?.classes ?? [9, 10]) as ClassLevel[];
  const classLevel: ClassLevel = validClasses.includes(parsedClass) ? parsedClass : 9;
  const chapterId = sp.get("chapter") ?? "";

  const [query, setQuery] = useState("");
  const [jumpOpen, setJumpOpen] = useState(false);

  // Reader view state:
  // studyMode: "full" | "quick" | "practice"
  const [studyMode, setStudyMode] = useState<"full" | "quick" | "practice">("full");
  // activeSectionFilter: "all" or section index (1-based)
  const [activeSectionFilter, setActiveSectionFilter] = useState<number | "all">("all");
  // collapsed sections map (sectionIndex -> boolean)
  const [collapsedMap, setCollapsedMap] = useState<Record<number, boolean>>({});
  // font size scaling in reader
  const [fontScale, setFontScale] = useState<"normal" | "compact" | "large">("normal");

  const chapters = useMemo(() => notesByClass(classLevel, subject), [classLevel, subject]);
  const selected = chapters.find((c) => c.id === chapterId);
  const filtered = useMemo(() => searchChapters(classLevel, subject, query), [classLevel, subject, query]);
  const selectedIndex = selected ? chapters.findIndex((c) => c.id === selected.id) : -1;
  const diagram = getDiagram(selected?.diagram);

  useEffect(() => {
    setQuery("");
    setJumpOpen(false);
  }, [subject, classLevel]);

  useEffect(() => {
    // Reset section filter and study mode when chapter changes
    setActiveSectionFilter("all");
    setStudyMode("full");
    setCollapsedMap({});
  }, [chapterId]);

  function libraryUrl(nextSubject: NotesSubjectId, nextClass: ClassLevel) {
    return `/notes?subject=${nextSubject}&class=${nextClass}`;
  }
  function chooseSubject(next: NotesSubjectId) {
    haptic("light");
    const nextSub = NOTES_SUBJECTS.find((s) => s.id === next);
    const targetClass = nextSub?.classes.includes(classLevel) ? classLevel : 9;
    router.replace(libraryUrl(next, targetClass), { scroll: false });
  }
  function chooseClass(next: ClassLevel) {
    haptic("light");
    router.replace(libraryUrl(subject, next), { scroll: false });
  }
  function openChapter(id: string) {
    haptic("light");
    router.push(`/notes?subject=${subject}&class=${classLevel}&chapter=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function backToLibrary() {
    haptic("light");
    router.push(libraryUrl(subject, classLevel));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Toggle all sections expand/collapse
  const allExpanded = useMemo(() => {
    if (!selected) return true;
    return selected.sections.every((_, idx) => !collapsedMap[idx + 1]);
  }, [selected, collapsedMap]);

  const toggleAllSections = () => {
    haptic("medium");
    if (!selected) return;
    if (allExpanded) {
      // collapse all
      const map: Record<number, boolean> = {};
      selected.sections.forEach((_, idx) => {
        map[idx + 1] = true;
      });
      setCollapsedMap(map);
    } else {
      // expand all
      setCollapsedMap({});
    }
  };

  const toggleSection = (idx: number) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Font size classes
  const fontClass =
    fontScale === "compact"
      ? "text-xs sm:text-[13px]"
      : fontScale === "large"
      ? "text-base sm:text-[17px]"
      : "text-sm sm:text-base";

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* 1. LIBRARY VIEW: STREAMLINED, COMPACT & INTUITIVE                         */
  /* ═════════════════════════════════════════════════════════════════════════ */
  if (!selected) {
    const subjectName = NOTES_SUBJECTS.find((s) => s.id === subject)?.name ?? subject;
    const currentClassObj = NOTES_SUBJECTS.find((s) => s.id === subject);

    return (
      <Container>
        <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
          {/* Header Title & Subtitle */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-ink px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/20">
                Study & Revision Hub
              </span>
              <span className="font-mono text-xs text-subtle">
                {NOTES_COUNTS.chapters} Chapters · {NOTES_COUNTS.sections} Concepts
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-fg">
              Notes made <span className="grad-text">simple & bite-sized.</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Clean structured chapter notes, formulas, reference tables, and interactive assessment arenas designed for rapid exam revision.
            </p>
          </div>

          {/* ─── Modern Horizontal Subject Bar (1-Tap Switching) ─── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-subtle uppercase">
              <span>Select Subject:</span>
              <span className="font-bold text-fg">{subjectName}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {NOTES_SUBJECTS.map((s) => {
                const active = s.id === subject;
                const count = NOTES_COUNTS[s.id];
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => chooseSubject(s.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border p-2.5 sm:p-3 text-left transition active:scale-95",
                      active
                        ? "border-brand bg-brand/[0.09] ring-1 ring-brand/60 shadow-xs"
                        : "border-line bg-card hover:border-line-2 hover:bg-fg/[0.02]"
                    )}
                  >
                    <SubjectGlyph id={s.id} active={active} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs sm:text-sm text-fg truncate">{s.short}</p>
                      <p className="font-mono text-[10px] text-muted truncate">{count} chapters</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Class / Level Selector & Search ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line/60 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {(currentClassObj?.classes ?? [9, 10]).map((c) => {
                const active = c === classLevel;
                const label =
                  c === "competitive"
                    ? subject === "it"
                      ? "Competitive (CS & IT)"
                      : subject === "english"
                      ? "Competitive English"
                      : "Competitive Hindi"
                    : c === "ai"
                    ? "Artificial Intelligence (AI)"
                    : c === "general"
                    ? "Everyday General Science"
                    : `Class ${c}`;
                return (
                  <button
                    key={String(c)}
                    type="button"
                    onClick={() => chooseClass(c as ClassLevel)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition active:scale-95",
                      active
                        ? "border-brand bg-brand text-white shadow-xs"
                        : "border-line bg-card text-muted hover:border-line-2 hover:text-fg"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter chapters by title or topic..."
                className="w-full rounded-xl border border-line bg-fg/[0.02] pl-10 pr-8 py-2 text-xs sm:text-sm text-fg outline-none placeholder:text-subtle focus:border-brand/70"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle hover:text-fg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ─── Chapter Cards Grid ─── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                Showing <strong className="text-fg">{filtered.length}</strong> of {chapters.length} chapters in{" "}
                <strong className="text-brand-ink">{subjectName}</strong>
              </span>
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-brand-ink font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-line bg-card p-8 text-center space-y-2 card-shadow">
                <p className="font-bold text-fg text-sm">No chapters found</p>
                <p className="text-xs text-muted">Try a different search keyword or switch class level.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => openChapter(ch.id)}
                    className="group rounded-2xl border border-line bg-card p-4 sm:p-5 text-left card-shadow hover:border-brand/60 hover:bg-brand/[0.02] transition-all flex flex-col justify-between active:scale-[0.99]"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-brand-ink px-2 py-0.5 rounded-md bg-brand/10 border border-brand/20 truncate">
                          {ch.unit.split("·")[0].trim()}
                        </span>
                        <span className="font-mono text-[10px] text-subtle font-semibold">
                          {ch.sections.length} concepts
                        </span>
                      </div>

                      <h3 className="font-bold text-fg text-base sm:text-lg group-hover:text-brand-ink transition leading-snug">
                        {ch.title}
                      </h3>

                      <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                        {ch.overview}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-brand-ink mt-3">
                      <span>Start Reading</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    );
  }

  /* ═════════════════════════════════════════════════════════════════════════ */
  /* 2. READER VIEW: CLEAN, STRUCTURED & BITE-SIZED (NOT LENGTHY)              */
  /* ═════════════════════════════════════════════════════════════════════════ */

  const isAbhyasChapter =
    selected.title.includes("अभ्यास") ||
    selected.title.toLowerCase().includes("practice arena") ||
    selected.title.toLowerCase().includes("practice question") ||
    selected.title.toLowerCase().includes("practice questions") ||
    selected.title.toLowerCase().includes("question bank") ||
    selected.title.toLowerCase().includes("assessment (mcq)") ||
    selected.title.toLowerCase().includes("practice arena (mcq)") ||
    selected.title.toLowerCase().includes("objective questions");

  const levelLabel =
    selected.classLevel === "competitive"
      ? selected.subject === "it"
        ? "Competitive CS & IT"
        : selected.subject === "english"
        ? "Competitive English"
        : "Competitive Hindi"
      : selected.classLevel === "ai"
      ? "Artificial Intelligence"
      : selected.classLevel === "general"
      ? "General Science"
      : `Class ${selected.classLevel}`;

  const subjectName = NOTES_SUBJECTS.find((s) => s.id === subject)?.name ?? subject;

  // Reading time calculation: ~150 words per minute
  const totalWords = useMemo(() => {
    let words = selected.overview.split(/\s+/).length;
    for (const s of selected.sections) {
      words += s.title.split(/\s+/).length;
      for (const p of s.points || []) words += p.split(/\s+/).length;
      for (const r of s.table?.rows || []) {
        for (const c of r) words += c.split(/\s+/).length;
      }
    }
    return words;
  }, [selected]);
  const estimatedMins = Math.max(2, Math.round(totalWords / 160));

  // Collect all formulas for quick cheat sheet
  const allFormulas = useMemo(() => {
    return selected.sections.filter((s) => s.formula && s.formula.length > 0);
  }, [selected.sections]);

  // Visible sections based on activeSectionFilter
  const visibleSections = useMemo(() => {
    if (activeSectionFilter === "all") {
      return selected.sections.map((s, idx) => ({ section: s, index: idx + 1 }));
    }
    const idx = Number(activeSectionFilter) - 1;
    const sec = selected.sections[idx];
    return sec ? [{ section: sec, index: idx + 1 }] : [];
  }, [selected.sections, activeSectionFilter]);

  return (
    <Container>
      <article className="mx-auto max-w-4xl space-y-6 sm:space-y-8 animate-fade-in pb-16">
        {/* ─── Top Nav Bar: Back to Library, Chapter Selector & Font Size ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-3">
          <button
            type="button"
            onClick={backToLibrary}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted hover:text-fg transition active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" /> All {levelLabel} {subjectName}
          </button>

          <div className="flex items-center gap-2">
            {/* Font Scaler */}
            <div className="flex items-center gap-0.5 rounded-lg border border-line bg-card p-0.5">
              <button
                type="button"
                onClick={() => {
                  haptic("light");
                  setFontScale("compact");
                }}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-bold rounded-md transition",
                  fontScale === "compact" ? "bg-brand text-white" : "text-muted hover:text-fg"
                )}
                title="Compact text size"
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => {
                  haptic("light");
                  setFontScale("normal");
                }}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-bold rounded-md transition",
                  fontScale === "normal" ? "bg-brand text-white" : "text-muted hover:text-fg"
                )}
                title="Default text size"
              >
                100%
              </button>
              <button
                type="button"
                onClick={() => {
                  haptic("light");
                  setFontScale("large");
                }}
                className={cn(
                  "px-2 py-0.5 text-[11px] font-bold rounded-md transition",
                  fontScale === "large" ? "bg-brand text-white" : "text-muted hover:text-fg"
                )}
                title="Large text size"
              >
                A+
              </button>
            </div>

            {/* Quick Chapter Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  haptic("light");
                  setJumpOpen((v) => !v);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-1.5 text-xs font-semibold text-fg hover:border-line-2 transition active:scale-95"
              >
                <span className="max-w-36 truncate">{selected.title}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-subtle transition", jumpOpen && "rotate-180")} />
              </button>

              {jumpOpen && (
                <div className="absolute right-0 top-full z-30 mt-1 max-h-80 w-80 overflow-y-auto rounded-2xl border border-line bg-surface p-2 card-shadow space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase text-subtle">
                    Switch Chapter ({chapters.length}):
                  </div>
                  {chapters.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        openChapter(ch.id);
                        setJumpOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium transition",
                        ch.id === selected.id ? "bg-brand/10 text-brand-ink font-bold" : "text-muted hover:bg-fg/[0.04] hover:text-fg"
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                      <span className="truncate">{ch.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Chapter Header ─── */}
        <header className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">
              <BookOpen className="h-3 w-3" /> {subjectName} · {levelLabel}
            </Badge>
            <Badge tone="neutral">{selected.unit.split("·")[0].trim()}</Badge>
            <span className="font-mono text-xs text-subtle flex items-center gap-1">
              <Clock className="h-3 w-3" /> ~{estimatedMins} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-fg leading-tight">
            {selected.title}
          </h1>

          <p className="text-xs sm:text-sm leading-relaxed text-muted max-w-3xl">
            {selected.overview}
          </p>
        </header>

        {/* Diagram (if available) */}
        {diagram ? (
          <div className="pt-2">
            <DiagramFrame entry={diagram} index={selected.chapterNo} />
          </div>
        ) : null}

        {/* ─── Special Renderers: Abhyas vs General Science vs Regular Notes ─── */}
        {isAbhyasChapter ? (
          <AbhyasArena chapter={selected} />
        ) : selected.classLevel === "general" ? (
          <GeneralScienceViewer chapter={selected} onSelectChapter={openChapter} />
        ) : (
          /* Regular Chapter: Comprehensive Notes vs Quick Revision vs Practice */
          <div className="space-y-6">
            {/* ─── Study Mode Toggle Bar (Full Notes vs Quick Revision vs Practice) ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-line bg-card p-2 sm:p-2.5 card-shadow">
              <div className="flex items-center gap-1.5 rounded-xl bg-fg/[0.04] p-1 border border-line/60">
                <button
                  type="button"
                  onClick={() => {
                    haptic("light");
                    setStudyMode("full");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
                    studyMode === "full" ? "bg-brand text-white shadow-xs" : "text-muted hover:text-fg"
                  )}
                >
                  <BookOpen className="h-4 w-4" /> Comprehensive Notes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    haptic("light");
                    setStudyMode("quick");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
                    studyMode === "quick" ? "bg-brand text-white shadow-xs" : "text-muted hover:text-fg"
                  )}
                >
                  <Zap className="h-4 w-4 text-amber-300" /> Quick Revision Sheet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    haptic("light");
                    setStudyMode("practice");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition active:scale-95",
                    studyMode === "practice" ? "bg-brand text-white shadow-xs" : "text-muted hover:text-fg"
                  )}
                >
                  <ListChecks className="h-4 w-4" /> Self-Practice
                </button>
              </div>

              {/* Expand / Collapse All Controls (when in full notes) */}
              {studyMode === "full" && activeSectionFilter === "all" && (
                <button
                  type="button"
                  onClick={toggleAllSections}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:underline transition self-start sm:self-auto px-2 py-1"
                >
                  {allExpanded ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5" /> Collapse All Sections
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5" /> Expand All Sections
                    </>
                  )}
                </button>
              )}
            </div>

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* MODE 1: COMPREHENSIVE NOTES (Bite-Sized & Interactive)             */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {studyMode === "full" && (
              <div className="space-y-6 animate-fade-in">
                {/* Horizontal Section Selector Pill Bar (Bite-Sized Navigation) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span className="font-mono uppercase text-subtle">
                      Browse by Concept ({selected.sections.length} Sections):
                    </span>
                    {activeSectionFilter !== "all" && (
                      <button
                        type="button"
                        onClick={() => {
                          haptic("light");
                          setActiveSectionFilter("all");
                        }}
                        className="text-brand-ink font-semibold hover:underline"
                      >
                        Show All Sections
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
                    <button
                      type="button"
                      onClick={() => {
                        haptic("light");
                        setActiveSectionFilter("all");
                      }}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap border transition active:scale-95",
                        activeSectionFilter === "all"
                          ? "bg-brand text-white border-brand shadow-xs"
                          : "bg-card border-line text-muted hover:text-fg hover:border-line-2"
                      )}
                    >
                      All Sections ({selected.sections.length})
                    </button>
                    {selected.sections.map((s, idx) => {
                      const isActive = activeSectionFilter === idx + 1;
                      return (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => {
                            haptic("light");
                            setActiveSectionFilter(idx + 1);
                          }}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap border transition active:scale-95 max-w-56 truncate",
                            isActive
                              ? "bg-brand text-white border-brand shadow-xs font-bold"
                              : "bg-card border-line text-muted hover:text-fg hover:border-line-2"
                          )}
                        >
                          {pad2(idx + 1)}. {s.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section Cards */}
                <div className="space-y-4">
                  {visibleSections.map(({ section: s, index: secIndex }) => (
                    <InteractiveSectionBlock
                      key={s.title}
                      index={secIndex}
                      section={s}
                      chapterId={selected.id}
                      isExpanded={!collapsedMap[secIndex]}
                      onToggle={() => toggleSection(secIndex)}
                      fontSizeClass={fontClass}
                    />
                  ))}
                </div>

                {/* Bite-Sized Section Navigation (When viewing 1 section) */}
                {activeSectionFilter !== "all" && (
                  <div className="flex items-center justify-between pt-2 border-t border-line/60">
                    {Number(activeSectionFilter) > 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          haptic("light");
                          setActiveSectionFilter(Number(activeSectionFilter) - 1);
                          window.scrollTo({ top: 250, behavior: "smooth" });
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:underline"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Previous Section
                      </button>
                    ) : (
                      <span />
                    )}

                    {Number(activeSectionFilter) < selected.sections.length ? (
                      <button
                        type="button"
                        onClick={() => {
                          haptic("light");
                          setActiveSectionFilter(Number(activeSectionFilter) + 1);
                          window.scrollTo({ top: 250, behavior: "smooth" });
                        }}
                        className="flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:underline"
                      >
                        Next Section <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          haptic("light");
                          setStudyMode("quick");
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        Open Quick Revision Sheet <Zap className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* MODE 2: QUICK REVISION / CHEAT SHEET (Rapid Pre-Exam Review)       */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {studyMode === "quick" && (
              <div className="space-y-6 animate-fade-in">
                {/* Executive Summary Points */}
                {selected.summaryPoints?.length ? (
                  <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/[0.08] via-card to-card p-5 card-shadow space-y-3">
                    <h3 className="font-bold text-fg text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" /> Executive High-Yield Summary
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-fg/90">
                      {selected.summaryPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                          <span>
                            <Rich text={pt} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Key Formulas & Equations */}
                {allFormulas.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-fg text-base flex items-center gap-2">
                      <Sigma className="h-4 w-4 text-brand-ink" /> Key Formulas & Equations Cheat Sheet
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {allFormulas.map((fSec) => (
                        <div
                          key={fSec.title}
                          className="rounded-2xl border border-line bg-card p-4 card-shadow space-y-2"
                        >
                          <span className="font-mono text-[10px] uppercase font-bold text-subtle">
                            {fSec.title}
                          </span>
                          <pre className="font-mono text-xs sm:text-sm font-bold text-brand-ink leading-relaxed overflow-x-auto">
                            {fSec.formula?.join("\n")}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Terms & Core Definitions */}
                {selected.keyTerms?.length ? (
                  <div className="space-y-3">
                    <h3 className="font-bold text-fg text-base flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" /> Essential Terms & Definitions
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selected.keyTerms.map((t) => (
                        <div
                          key={t.term}
                          className="rounded-2xl border border-line bg-card p-4 card-shadow space-y-1.5"
                        >
                          <h4 className="font-bold text-fg text-sm">{t.term}</h4>
                          <p className="text-xs text-muted leading-relaxed">{t.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Exam Tips */}
                {selected.examTips?.length ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 card-shadow space-y-3">
                    <h3 className="font-bold text-fg text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-emerald-500" /> High-Scoring Board Exam Tips
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-fg/90">
                      {selected.examTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="h-5 w-5 rounded-md font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                            {i + 1}
                          </span>
                          <span>
                            <Rich text={tip} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════════ */}
            {/* MODE 3: SELF-PRACTICE & QUIZ ARENA                                 */}
            {/* ═══════════════════════════════════════════════════════════════════ */}
            {studyMode === "practice" && (
              <div className="rounded-2xl border border-brand/30 bg-card p-6 card-shadow text-center space-y-4 animate-fade-in">
                <div className="h-12 w-12 rounded-2xl bg-brand/15 text-brand flex items-center justify-center mx-auto">
                  <ListChecks className="h-6 w-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-fg">Ready to Test Your Knowledge?</h3>
                  <p className="text-xs sm:text-sm text-muted">
                    Take an interactive 10-question practice quiz generated from this chapter with instant scoring and explanations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/quiz?topic=${quizTopicFor(selected)}&n=10&t=30&tm=per-question&d=any&src=bank&h=3`
                    )
                  }
                  className="rounded-xl bg-brand px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:opacity-90 transition active:scale-95 inline-flex items-center gap-2"
                >
                  Start Chapter Quiz <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── Chapter Bottom Navigation: Previous / Next Chapter ─── */}
        <nav className="flex items-center justify-between pt-6 border-t border-line/60">
          {selectedIndex > 0 ? (
            <button
              type="button"
              onClick={() => openChapter(chapters[selectedIndex - 1].id)}
              className="flex items-center gap-2 text-left rounded-xl border border-line bg-card p-3 hover:border-line-2 transition active:scale-95"
            >
              <ArrowLeft className="h-4 w-4 text-brand-ink shrink-0" />
              <div className="min-w-0">
                <span className="block font-mono text-[10px] uppercase text-subtle">Previous Chapter</span>
                <span className="block text-xs sm:text-sm font-bold text-fg truncate max-w-44">
                  {chapters[selectedIndex - 1].title}
                </span>
              </div>
            </button>
          ) : (
            <span />
          )}

          {selectedIndex < chapters.length - 1 ? (
            <button
              type="button"
              onClick={() => openChapter(chapters[selectedIndex + 1].id)}
              className="flex items-center gap-2 text-right rounded-xl border border-line bg-card p-3 hover:border-line-2 transition active:scale-95"
            >
              <div className="min-w-0">
                <span className="block font-mono text-[10px] uppercase text-subtle">Next Chapter</span>
                <span className="block text-xs sm:text-sm font-bold text-fg truncate max-w-44">
                  {chapters[selectedIndex + 1].title}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-brand-ink shrink-0" />
            </button>
          ) : null}
        </nav>
      </article>
    </Container>
  );
}

function quizTopicFor(chapter: NoteChapter): string {
  if (chapter.id.startsWith("note-gen")) return "sci-all-10";
  if (chapter.subject === "sst") return chapter.id.replace("note-", "");
  if (chapter.subject === "science") return `sci${chapter.id.replace("note", "")}`;
  return "math-mixed";
}
