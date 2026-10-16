"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, BookOpenText, Calculator, Check, CheckCircle2, ChevronDown, FlaskConical, HelpCircle, ImageIcon, Landmark, Languages, Lightbulb, ListChecks, Monitor, PenLine, RotateCcw, Search, Sigma, X, XCircle } from "lucide-react";
import { DiagramFrame } from "@/components/notes/DiagramKit";
import { getDiagram } from "@/components/notes";
import { Badge, Card, Container, Label, btn } from "@/components/ui";
import { NOTES_COUNTS, NOTES_SUBJECTS, notesByClass, searchChapters, type ClassLevel, type NoteChapter, type NotesSubjectId } from "@/data/notes";
import { HINDI_ANSWERS } from "@/data/notes/hindiAnswers";
import { IT_ANSWERS } from "@/data/notes/itAnswers";
import { ENGLISH_ANSWERS } from "@/data/notes/englishAnswers";
import { SST_ANSWERS } from "@/data/notes/sstAnswers";
import { MATH_ANSWERS } from "@/data/notes/mathAnswers";
import { SCIENCE_ANSWERS } from "@/data/notes/scienceAnswers";
import { cn, pad2 } from "@/lib/format";

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

/* ------------------------------ text with **bold** ------------------------------ */

function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-fg">{part}</strong> : <span key={i}>{part}</span>))}</>;
}

interface ParsedQuestion {
  id: string;
  num?: string;
  text: string;
  type: "mcq" | "text" | "prompt";
  options?: Array<{ key: string; text: string }>;
}

function extractOptions(str: string): Array<{ key: string; text: string }> {
  if (!str) return [];
  // Pattern 1: (क) ... (ख) ... or (A) ... (B) ...
  if (/\([क-घA-Da-d1-4]\)/.test(str)) {
    const matches = [...str.matchAll(/\(([क-घA-Da-d1-4])\)\s*([^()]+)/g)];
    if (matches.length >= 2) {
      return matches.map((m) => ({ key: m[1], text: m[2].trim() }));
    }
  }
  // Pattern 2: A. ... B. ... or A. ... · B. ...
  if (/(?:^|\s{2,}|\s+[·•]\s+|\n)\s*[A-D]\.\s+/.test(str)) {
    const matches = [...str.matchAll(/(?:^|\s{2,}|\s+[·•]\s+|\n)\s*([A-D])\.\s+([\s\S]+?)(?=(?:\s{2,}|\s+[·•]\s+|\n)\s*[A-D]\.|$)/g)];
    if (matches.length >= 2) {
      return matches.map((m) => ({ key: m[1], text: m[2].trim() }));
    }
  }
  return [];
}

function parseAbhyasPoints(points: string[] = [], secTitle = ""): { instructions: string[]; questions: ParsedQuestion[] } {
  const instructions: string[] = [];
  const questions: ParsedQuestion[] = [];
  const isTrueFalseSec = /true\s*(?:or|\/)\s*false/i.test(secTitle);

  for (let i = 0; i < points.length; i++) {
    const raw = points[i].trim();
    if (!raw) continue;

    // Filter out any answer mentions or links
    if (
      raw.includes("उत्तरमाला") ||
      raw.includes("उत्तर देखें") ||
      raw.includes("<a id=") ||
      raw.toLowerCase().includes("answer key") ||
      raw.toLowerCase().includes("consult the answer")
    ) {
      continue;
    }

    // Instructions
    if (
      raw.startsWith("*निर्देश") ||
      raw.startsWith("निर्देश:") ||
      raw.startsWith("**निर्देश") ||
      raw.startsWith("*समय-सुझाव") ||
      raw.startsWith("समय-सुझाव:") ||
      raw.startsWith("**समय-सुझाव") ||
      raw.toLowerCase().startsWith("instructions:") ||
      raw.toLowerCase().startsWith("choose the best answer") ||
      raw.toLowerCase().startsWith("write **true** or **false**")
    ) {
      let inst = raw.replace(/^\*+|\*+$/g, "");
      inst = inst.replace(/^(?:निर्देश|समय-सुझाव|Instructions)[:\s*]*/i, "").trim();
      instructions.push(inst || raw);
      continue;
    }

    // Match question: e.g. "**1. Question text?**", "**1.** Question text", or "1. Question text"
    const qMatch = raw.match(/^(?:\*\*)?(\d+)\.(?:\*\*)?\s*(.+)$/);
    if (qMatch) {
      const qNum = qMatch[1];
      let qText = qMatch[2].replace(/\*\*$/, "").trim();

      // Case 1: options embedded inside the same line
      const inlineOpts = extractOptions(qText);
      if (inlineOpts.length >= 2) {
        const optStart = qText.search(/\([क-घA-Da-d1-4]\)|(?:\s{2,}|\s+[·•]\s+)[A-D]\.\s+/);
        if (optStart > 0) qText = qText.slice(0, optStart).trim();
        questions.push({
          id: `q-${qNum}-${i}`,
          num: qNum,
          text: qText,
          options: inlineOpts,
          type: "mcq",
        });
        continue;
      }

      // Case 2: options in next point (e.g. "A. ... B. ..." or "(क) ...")
      const nextPoint = (points[i + 1] || "").trim();
      const nextOpts = extractOptions(nextPoint);
      if (nextOpts.length >= 2) {
        questions.push({
          id: `q-${qNum}-${i}`,
          num: qNum,
          text: qText,
          options: nextOpts,
          type: "mcq",
        });
        i++; // skip options line
        continue;
      }

      // Case 3: options spread across subsequent points (points[i+1] is A., points[i+2] is B., etc.)
      if (
        points[i + 1] && /^A\.\s+/.test(points[i + 1].trim()) &&
        points[i + 2] && /^B\.\s+/.test(points[i + 2].trim())
      ) {
        const spreadOpts: Array<{ key: string; text: string }> = [];
        let j = i + 1;
        while (j < points.length && spreadOpts.length < 4) {
          const optMatch = points[j].trim().match(/^([A-D])\.\s+(.+)$/);
          if (optMatch) {
            spreadOpts.push({ key: optMatch[1], text: optMatch[2].trim() });
            j++;
          } else {
            break;
          }
        }
        if (spreadOpts.length >= 2) {
          questions.push({
            id: `q-${qNum}-${i}`,
            num: qNum,
            text: qText,
            options: spreadOpts,
            type: "mcq",
          });
          i = j - 1;
          continue;
        }
      }

      // Case 4: True / False section
      if (isTrueFalseSec) {
        questions.push({
          id: `q-${qNum}-${i}`,
          num: qNum,
          text: qText,
          options: [
            { key: "A", text: "True" },
            { key: "B", text: "False" },
          ],
          type: "mcq",
        });
        continue;
      }

      // Case 5: Text / Short answer
      questions.push({
        id: `q-${qNum}-${i}`,
        num: qNum,
        text: qText,
        type: "text",
      });
      continue;
    }

    // Case 6: Free-form question or prompt
    questions.push({
      id: `q-p-${i}`,
      text: raw,
      type: "prompt",
    });
  }

  return { instructions, questions };
}

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
  const ans = q.num ? (HINDI_ANSWERS[`${chapterId}-${q.num}`] || IT_ANSWERS[`${chapterId}-${q.num}`] || ENGLISH_ANSWERS[`${chapterId}-${q.num}`] || SST_ANSWERS[`${chapterId}-${q.num}`] || MATH_ANSWERS[`${chapterId}-${q.num}`] || SCIENCE_ANSWERS[`${chapterId}-${q.num}`]) : undefined;
  const hasValidation = Boolean(ans?.correctKey);
  const isSelected = Boolean(selectedOpt);
  const isCorrect = hasValidation && isSelected ? normalizeKey(selectedOpt) === normalizeKey(ans?.correctKey) : false;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6 transition-all duration-200",
        isSelected
          ? hasValidation
            ? isCorrect
              ? "border-emerald-500/40 bg-emerald-500/[0.03] shadow-[0_4px_24px_-8px_rgba(16,185,129,0.18)]"
              : "border-rose-500/40 bg-rose-500/[0.03] shadow-[0_4px_24px_-8px_rgba(244,63,94,0.18)]"
            : "border-brand/50 bg-brand/[0.04] shadow-[0_4px_24px_-8px_rgba(249,115,22,0.18)]"
          : "border-line bg-card hover:border-line-2 hover:bg-fg/[0.01]"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {q.num ? (
            <span className="inline-flex items-center rounded-lg border border-brand/40 bg-brand/10 px-2.5 py-0.5 font-mono text-xs font-bold text-brand-ink">
              {isHindi ? `प्रश्न ${pad2(Number(q.num) || 0) || q.num}` : `Q${pad2(Number(q.num) || 0) || q.num}`}
            </span>
          ) : null}
          <span className="font-mono text-xs sm:text-[10.5px] uppercase tracking-wider text-subtle">
            {q.type === "mcq"
              ? (isHindi ? "बहुविकल्पी" : "Multiple Choice")
              : (isHindi ? "लघु-उत्तर / अभ्यास" : "Practice Question")}
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

      <p className="mt-3.5 text-base sm:text-[17px] font-semibold leading-relaxed text-fg">
        <Rich text={q.text} />
      </p>

      {q.type === "mcq" && q.options?.length ? (
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {q.options.map((opt) => {
            const isChosen = selectedOpt === opt.key;
            const isOptionCorrect = hasValidation && normalizeKey(opt.key) === normalizeKey(ans?.correctKey);

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectOpt(opt.key)}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-3.5 sm:p-4 text-left transition-all duration-150",
                  isSelected
                    ? hasValidation
                      ? isOptionCorrect
                        ? "border-emerald-500 bg-emerald-500/[0.12] ring-1 ring-emerald-500/50 text-fg shadow-sm"
                        : isChosen
                        ? "border-rose-500 bg-rose-500/[0.12] ring-1 ring-rose-500/50 text-fg shadow-sm"
                        : "border-line/60 bg-fg/[0.01] text-subtle opacity-70"
                      : isChosen
                      ? "border-brand bg-brand/[0.12] ring-1 ring-brand/60 text-fg shadow-sm"
                      : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:bg-fg/[0.05] hover:text-fg"
                    : "border-line bg-fg/[0.02] text-muted hover:border-line-2 hover:bg-fg/[0.05] hover:text-fg"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-6.5 w-6.5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[13px] sm:text-xs font-bold transition mt-0.5",
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
                <span className="text-[14.5px] sm:text-[15px] leading-relaxed sm:leading-snug flex-1">
                  <Rich text={opt.text} />
                </span>
                {isSelected && hasValidation ? (
                  isOptionCorrect ? (
                    <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" /> {isHindi ? "सही" : "Correct"}
                    </span>
                  ) : isChosen ? (
                    <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs font-bold text-rose-600 dark:text-rose-400 shrink-0">
                      <X className="h-3.5 w-3.5 stroke-[3]" /> {isHindi ? "गलत" : "Incorrect"}
                    </span>
                  ) : null
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Explanation for MCQ after selection */}
      {isSelected && ans?.explanation ? (
        <div className="mt-4 rounded-xl border border-line-2 bg-fg/[0.03] p-4 text-sm sm:text-sm animate-fade-in">
          <p className="font-semibold text-fg flex items-center gap-2 mb-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{isHindi ? "व्याख्या व व्याकरणिक नियम:" : "Verified Explanation & Rationale:"}</span>
          </p>
          <div className="leading-relaxed text-muted pl-6">
            <Rich text={ans.explanation} />
          </div>
        </div>
      ) : null}

      {/* Non-MCQ Practice & Solution Area */}
      {q.type !== "mcq" ? (
        <div className="mt-4 border-t border-line/60 pt-3 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowScratch((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm sm:text-xs font-medium text-subtle hover:text-brand-ink transition"
            >
              <PenLine className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
              {showScratch
                ? (isHindi ? "रफ़ नोट छिपाएँ" : "Hide scratchpad")
                : scratch
                ? (isHindi ? "रफ़ नोट देखें / बदलें" : "View / edit scratchpad")
                : (isHindi ? "स्व-प्रयास रफ़ नोट (यहाँ लिखकर अभ्यास करें)" : "Self-practice scratchpad (type notes / code)")}
            </button>

            {ans?.solution || ans?.explanation ? (
              <button
                type="button"
                onClick={() => setShowSolution((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm sm:text-xs font-semibold text-brand-ink hover:underline transition"
              >
                <HelpCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                {showSolution
                  ? (isHindi ? "समाधान व व्याख्या छिपाएँ" : "Hide solution")
                  : (isHindi ? "समाधान व व्याख्या देखें" : "View verified solution")}
              </button>
            ) : null}
          </div>

          {showScratch ? (
            <div className="animate-fade-in">
              <textarea
                value={scratch || ""}
                onChange={(e) => onChangeScratch(e.target.value)}
                placeholder={isHindi ? "यहाँ अपना उत्तर, विग्रह, या नियम लिखकर स्वयं जाँचें..." : "Type your answer, code, or reasoning here to practice..."}
                rows={2}
                className="w-full resize-y rounded-xl border border-line bg-fg/[0.02] p-3.5 sm:p-3 text-sm sm:text-sm text-fg outline-none placeholder:text-subtle focus:border-brand/70"
              />
            </div>
          ) : scratch ? (
            <p className="text-xs text-muted italic line-clamp-1">{isHindi ? "आपका नोट:" : "Your note:"} {scratch}</p>
          ) : null}

          {showSolution && (ans?.solution || ans?.explanation) ? (
            <div className="rounded-xl border border-line-2 bg-fg/[0.03] p-4 text-sm sm:text-sm animate-fade-in">
              <p className="font-semibold text-fg flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{isHindi ? "मानक उत्तर / समाधान संकेत:" : "Verified Solution / Answer Key:"}</span>
              </p>
              <div className="leading-relaxed text-muted pl-6">
                <Rich text={ans.solution || ans.explanation || ""} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

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
    return chapter.sections
      .map((sec, idx) => {
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
      })
      .filter((s) => s.questions.length > 0);
  }, [chapter]);

  const allQuestions = useMemo(() => {
    return parsedSections.flatMap((s) => s.questions);
  }, [parsedSections]);

  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).filter((k) => selectedAnswers[k]).length;

  const stats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    for (const [qId, optKey] of Object.entries(selectedAnswers)) {
      if (!optKey) continue;
      const q = allQuestions.find((item) => item.id === qId);
      if (!q || !q.num) continue;
      const ans = HINDI_ANSWERS[`${chapter.id}-${q.num}`] || IT_ANSWERS[`${chapter.id}-${q.num}`] || ENGLISH_ANSWERS[`${chapter.id}-${q.num}`] || SST_ANSWERS[`${chapter.id}-${q.num}`] || MATH_ANSWERS[`${chapter.id}-${q.num}`] || SCIENCE_ANSWERS[`${chapter.id}-${q.num}`];
      if (ans?.correctKey) {
        if (normalizeKey(optKey) === normalizeKey(ans.correctKey)) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }
    return { correct, incorrect };
  }, [selectedAnswers, allQuestions, chapter.id]);

  const visibleSections =
    activeSectionIdx === "all"
      ? parsedSections
      : parsedSections.filter((s) => s.index === activeSectionIdx);

  return (
    <div className="mt-8 space-y-8">
      {/* Exercise Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-fg/[0.02] p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1 font-mono text-xs font-semibold text-brand-ink">
            <ListChecks className="h-3.5 w-3.5" /> {isHindi ? "अभ्यास मोड" : "Practice Arena"}
          </span>
          <span className="font-mono text-xs text-muted">
            {isHindi ? "कुल प्रश्न:" : "Total Questions:"} <strong className="text-fg">{totalQuestions}</strong>
          </span>
          {answeredCount > 0 ? (
            <span className="font-mono text-xs text-muted">
              {isHindi ? "हल किए गए:" : "Attempted:"} <strong className="text-fg">{answeredCount}</strong> / {totalQuestions}
            </span>
          ) : null}
          {stats.correct > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ {isHindi ? "सही:" : "Correct:"} {stats.correct}
            </span>
          ) : null}
          {stats.incorrect > 0 ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
              ✗ {isHindi ? "गलत:" : "Incorrect:"} {stats.incorrect}
            </span>
          ) : null}
        </div>

        {answeredCount > 0 || Object.keys(scratchNotes).length > 0 ? (
          <button
            type="button"
            onClick={() => {
              setSelectedAnswers({});
              setScratchNotes({});
            }}
            className="inline-flex items-center gap-1.5 text-sm sm:text-xs font-semibold text-subtle hover:text-brand-ink transition"
          >
            <RotateCcw className="h-3.5 w-3.5" /> {isHindi ? "सारे उत्तर रीसेट करें" : "Reset answers"}
          </button>
        ) : null}
      </div>

      {/* Section Filter Pills (if more than 1 section with questions) */}
      {parsedSections.length > 1 ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
          <button
            type="button"
            onClick={() => setActiveSectionIdx("all")}
            className={cn(
              "rounded-full border px-4 py-2 sm:px-3.5 sm:py-1.5 text-sm sm:text-xs font-semibold transition",
              activeSectionIdx === "all"
                ? "border-brand bg-brand/[0.1] text-fg glow"
                : "border-line text-muted hover:border-line-2 hover:text-fg"
            )}
          >
            {isHindi ? "सभी खंड" : "All Sections"} ({totalQuestions})
          </button>
          {parsedSections.map((s) => (
            <button
              key={s.index}
              type="button"
              onClick={() => setActiveSectionIdx(s.index)}
              className={cn(
                "rounded-full border px-4 py-2 sm:px-3.5 sm:py-1.5 text-sm sm:text-xs font-semibold transition",
                activeSectionIdx === s.index
                  ? "border-brand bg-brand/[0.1] text-fg glow"
                  : "border-line text-muted hover:border-line-2 hover:text-fg"
              )}
            >
              {s.title} ({s.questions.length})
            </button>
          ))}
        </div>
      ) : null}

      {/* Sections and Questions */}
      <div className="space-y-10">
        {visibleSections.map((sec) => (
          <section key={sec.title} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden="true" />
              <h3 className="text-lg font-bold tracking-tight text-fg sm:text-2xl">{sec.title}</h3>
            </div>

            {/* Instruction Callout */}
            {sec.instructions.length ? (
              <div className="rounded-xl border border-brand/30 bg-brand/[0.05] p-4 text-sm sm:text-sm text-fg">
                {sec.instructions.map((inst, ii) => (
                  <p key={ii} className="flex items-start gap-2 leading-relaxed">
                    <span className="font-mono font-bold text-sm sm:text-xs text-brand-ink">{isHindi ? "निर्देश:" : "Instructions:"}</span>
                    <span><Rich text={inst} /></span>
                  </p>
                ))}
              </div>
            ) : null}

            {/* Questions Grid/Stack */}
            <div className="space-y-4 pt-2">
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

function SubjectGlyph({ id, active = false }: { id: NotesSubjectId; active?: boolean }) {
  const Icon = id === "science" ? FlaskConical : id === "sst" ? Landmark : id === "math" ? Calculator : id === "english" ? BookOpenText : id === "it" ? Monitor : Languages;
  return (
    <span className={cn("inline-flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border", active ? "border-transparent grad-hero text-white" : "border-line bg-fg/[0.03] text-brand-ink")}>
      <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.8} />
    </span>
  );
}

function SectionBlock({ index, section, chapterId }: { index: number; section: NoteChapter["sections"][number]; chapterId: string }) {
  const isSectionAbhyas =
    section.title.includes("अभ्यास") ||
    section.title.includes("स्व-जाँच") ||
    section.title.toLowerCase().includes("practice questions") ||
    section.title.toLowerCase().includes("practice arena") ||
    section.title.toLowerCase().includes("self-assessment");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [scratchNotes, setScratchNotes] = useState<Record<string, string>>({});

  const parsed = useMemo(() => {
    if (!isSectionAbhyas) return null;
    return parseAbhyasPoints(section.points || [], section.title);
  }, [isSectionAbhyas, section.points, section.title]);

  const hasMcqs = parsed ? parsed.questions.some((q) => q.type === "mcq") : false;
  const isHindi = chapterId.startsWith("note-hi");

  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0 sm:pt-12">
      <div className="flex items-center gap-3 sm:gap-3.5">
        <span className="h-2 w-2 rounded-full bg-brand shrink-0" aria-hidden="true" />
        <h3 className="text-lg font-bold tracking-tight text-fg sm:text-2xl">{section.title}</h3>
      </div>

      {isSectionAbhyas && parsed && hasMcqs ? (
        <div className="mt-5 space-y-4">
          {parsed.instructions.length ? (
            <div className="rounded-xl border border-brand/30 bg-brand/[0.05] p-4 text-sm sm:text-sm text-fg">
              {parsed.instructions.map((inst, ii) => (
                <p key={ii} className="flex items-start gap-2 leading-relaxed">
                  <span className="font-mono font-bold text-sm sm:text-xs text-brand-ink">{isHindi ? "निर्देश:" : "Instructions:"}</span>
                  <span><Rich text={inst} /></span>
                </p>
              ))}
            </div>
          ) : null}

          <div className="space-y-4">
            {parsed.questions.filter((q) => q.type === "mcq").map((q) => (
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
          {section.points?.length ? (
            <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3.5">
              {section.points.map((p, i) => (
                <li key={i} className="flex gap-2.5 sm:gap-3.5 text-[15px] leading-relaxed text-muted sm:text-[17px] sm:leading-8">
                  <span className="mt-2 sm:mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/80" aria-hidden="true" />
                  <span><Rich text={p} /></span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.formula?.length ? (
            <div className="mt-5 overflow-x-auto rounded-xl sm:rounded-2xl border border-line bg-fg/[0.03] p-4 sm:p-6">
              <p className="mb-2 sm:mb-3 flex items-center gap-2 font-mono text-xs sm:text-[10.5px] uppercase tracking-[0.16em] text-subtle"><Sigma className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-brand-ink" /> Formula / derivation</p>
              <pre className="font-mono text-sm leading-relaxed text-fg sm:text-[15px] sm:leading-7">{section.formula.join("\n")}</pre>
            </div>
          ) : null}

          {section.table ? (
            <div className="mt-5 overflow-x-auto rounded-xl sm:rounded-2xl border border-line">
              <table className="w-full min-w-[32rem] sm:min-w-[38rem] border-collapse text-left text-[13.5px] sm:text-sm">
                <thead><tr className="bg-fg/[0.04]">{section.table.head.map((h) => <th key={h} className="border-b border-line px-3.5 py-3 sm:px-5 sm:py-4 font-mono text-xs sm:text-[10.5px] uppercase tracking-[0.14em] text-subtle">{h}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, ri) => (
                  <tr key={ri} className="align-top even:bg-fg/[0.02]">
                    {row.map((cell, ci) => <td key={ci} className={cn("border-b border-line px-3.5 py-3 sm:px-5 sm:py-4 leading-relaxed sm:leading-6", ci === 0 ? "font-medium text-fg" : "text-muted")}><Rich text={cell} /></td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          ) : null}

          {section.tip ? (
            <div className="mt-5 flex gap-3 rounded-xl sm:rounded-2xl border border-brand/35 bg-brand/[0.07] p-4 sm:p-5">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
              <p className="text-[15px] sm:text-[15px] leading-relaxed sm:leading-7 text-fg"><span className="font-mono text-xs sm:text-[10.5px] uppercase tracking-[0.16em] text-brand-ink">Remember · </span><Rich text={section.tip} /></p>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function SubjectPicker({ subject, onSubject }: { subject: NotesSubjectId; onSubject: (id: NotesSubjectId) => void }) {
  return (
    <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {NOTES_SUBJECTS.map((s) => {
        const active = s.id === subject;
        const count = NOTES_COUNTS[s.id];
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSubject(s.id)}
            aria-pressed={active}
            className={cn(
              "flex items-center gap-3.5 rounded-xl sm:rounded-2xl border p-3.5 sm:p-6 text-left transition-all duration-200",
              "ring-1 ring-inset",
              active
                ? "border-brand bg-brand/[0.08] ring-brand/60 shadow-[0_0_24px_-6px_rgba(249,115,22,0.4)]"
                : "border-line bg-card ring-transparent hover:border-line-2 hover:bg-fg/[0.04]",
            )}
          >
            <SubjectGlyph id={s.id} active={active} />
            <span className="min-w-0 flex-1">
              <span className="block text-base sm:text-lg font-bold tracking-tight text-fg">{s.name}</span>
              <span className="mt-0.5 sm:mt-1 block text-sm sm:text-sm text-muted truncate">{s.tagline}</span>
              <span className="mt-1 sm:mt-2 block font-mono text-xs sm:text-[11px] uppercase tracking-[0.14em] text-subtle">{count} chapters</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ChapterGrid({ chapters, onSelect }: { chapters: NoteChapter[]; onSelect: (id: string) => void }) {
  if (!chapters.length) return <Card className="p-10 text-center text-muted">No chapter matched this search.</Card>;
  const groups = chapters.reduce<Array<{ unit: string; chapters: NoteChapter[] }>>((all, chapter) => {
    const existing = all.find((g) => g.unit === chapter.unit);
    if (existing) existing.chapters.push(chapter);
    else all.push({ unit: chapter.unit, chapters: [chapter] });
    return all;
  }, []);
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.unit}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <h3 className="font-mono text-xs sm:text-[11px] uppercase tracking-[0.16em] text-subtle">{group.unit}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.chapters.map((ch) => (
              <button key={ch.id} type="button" onClick={() => onSelect(ch.id)} className="group flex min-h-44 flex-col items-start rounded-2xl border border-line bg-card p-6 text-left transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-brand/[0.04] hover:shadow-[0_18px_40px_-26px_rgba(249,115,22,0.75)] sm:p-7">
                <span className="font-mono text-xs sm:text-[11px] font-semibold uppercase tracking-wider text-brand-ink">{ch.unit.split('·')[0].trim()}</span>
                <span className="mt-4 text-xl font-bold leading-tight tracking-tight text-fg">{ch.title}</span>
                <span className="mt-3 line-clamp-2 text-[14.5px] sm:text-sm leading-relaxed text-muted">{ch.overview}</span>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-brand-ink">Open notes <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function NotesBrowser() {
  const router = useRouter();
  const sp = useSearchParams();
  const subjectFromUrl = sp.get("subject");
  const subject: NotesSubjectId =
    subjectFromUrl === "sst" || subjectFromUrl === "math" || subjectFromUrl === "english" || subjectFromUrl === "hindi" || subjectFromUrl === "it" ? subjectFromUrl : "science";
  const rawClass = sp.get("class");
  const parsedClass: ClassLevel =
    rawClass === "10"
      ? 10
      : rawClass === "competitive"
      ? "competitive"
      : rawClass === "ai"
      ? "ai"
      : 9;
  const validClasses = (NOTES_SUBJECTS.find((s) => s.id === subject)?.classes ?? [9, 10]) as ClassLevel[];
  const classLevel: ClassLevel = validClasses.includes(parsedClass) ? parsedClass : 9;
  const chapterId = sp.get("chapter") ?? "";
  const [query, setQuery] = useState("");
  const [jumpOpen, setJumpOpen] = useState(false);

  const chapters = useMemo(() => notesByClass(classLevel, subject), [classLevel, subject]);
  const selected = chapters.find((c) => c.id === chapterId);
  const filtered = useMemo(() => searchChapters(classLevel, subject, query), [classLevel, subject, query]);
  const selectedIndex = selected ? chapters.findIndex((c) => c.id === selected.id) : -1;
  const diagram = getDiagram(selected?.diagram);

  useEffect(() => {
    setQuery("");
    setJumpOpen(false);
  }, [subject, classLevel]);

  function libraryUrl(nextSubject: NotesSubjectId, nextClass: ClassLevel) {
    return `/notes?subject=${nextSubject}&class=${nextClass}`;
  }
  function chooseSubject(next: NotesSubjectId) {
    const nextSub = NOTES_SUBJECTS.find((s) => s.id === next);
    const targetClass = nextSub?.classes.includes(classLevel) ? classLevel : 9;
    router.replace(libraryUrl(next, targetClass), { scroll: false });
  }
  function chooseClass(next: ClassLevel) {
    router.replace(libraryUrl(subject, next), { scroll: false });
  }
  function openChapter(id: string) {
    router.push(`/notes?subject=${subject}&class=${classLevel}&chapter=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function backToLibrary() {
    router.push(libraryUrl(subject, classLevel));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------ Library view ----------------------------- */
  if (!selected) {
    return (
      <Container>
        <div className="animate-fade-in">
          <div className="max-w-3xl">
            <Label>Study library</Label>
            <h1 className="mt-4 sm:mt-5 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">Notes that make<br /><span className="grad-text">revision simpler.</span></h1>
            <p className="mt-4 sm:mt-6 max-w-2xl text-sm leading-relaxed text-muted sm:text-lg">Comprehensive chapter notes with key concepts, practical tables, verified problem solutions, and exam tips. Choose a subject and class level to start learning.</p>
          </div>

          <div className="mt-8 sm:mt-12">
            <Label n="01">Choose a subject</Label>
            <div className="mt-3.5 sm:mt-5"><SubjectPicker subject={subject} onSubject={chooseSubject} /></div>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label n="02">Choose your class / level</Label>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                {((NOTES_SUBJECTS.find((s) => s.id === subject)?.classes ?? [9, 10]) as ClassLevel[]).map((c) => {
                  const active = c === classLevel;
                  const label =
                    c === "competitive"
                      ? (subject === "it" ? "Competitive (CS & IT)" : subject === "english" ? "Competitive English" : "Competitive (प्रतियोगी परीक्षा)")
                      : c === "ai"
                      ? "Artificial Intelligence (AI)"
                      : `Class ${c}`;
                  return (
                    <button
                      key={String(c)}
                      type="button"
                      onClick={() => chooseClass(c)}
                      className={cn(
                        "rounded-full border px-4.5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-sm font-semibold transition",
                        active ? "border-brand bg-brand/[0.1] text-fg glow" : "border-line text-muted hover:border-line-2 hover:text-fg"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full sm:w-72">
              <label className="flex items-center gap-2.5 rounded-xl border border-line bg-fg/[0.03] px-4 py-3 sm:px-4 sm:py-3 focus-within:border-brand/70"><Search className="h-4 w-4 text-subtle shrink-0" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a chapter" className="w-full bg-transparent text-sm sm:text-sm text-fg outline-none placeholder:text-subtle" /></label>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                {classLevel === "competitive"
                  ? (subject === "it" ? "Competitive CS & IT" : subject === "english" ? "Competitive English" : "Competitive Hindi")
                  : classLevel === "ai"
                  ? "Artificial Intelligence (AI)"
                  : `Class ${classLevel}`}{" "}
                {NOTES_SUBJECTS.find((s) => s.id === subject)?.name}
              </h2>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{filtered.length} chapters</span>
            </div>
            <ChapterGrid chapters={filtered} onSelect={openChapter} />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {[
              { v: NOTES_COUNTS.chapters, k: "Chapters" },
              { v: NOTES_COUNTS.sections, k: "Concept sections" },
              { v: NOTES_COUNTS.diagrams, k: "Science diagrams" },
              { v: "9, 10, Comp & AI", k: "Levels covered" },
            ].map((m) => <div key={m.k} className="bg-bg px-6 py-6"><p className="grad-text font-mono text-3xl font-bold tabular-nums">{m.v}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{m.k}</p></div>)}
          </div>
        </div>
      </Container>
    );
  }

  /* ------------------------------ Reader view ------------------------------ */
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
      ? (selected.subject === "it" ? "Competitive (CS & IT)" : selected.subject === "english" ? "Competitive English" : "Competitive")
      : selected.classLevel === "ai"
      ? "Artificial Intelligence"
      : `Class ${selected.classLevel}`;

  const meta = isAbhyasChapter
    ? [
        { k: "Level", v: levelLabel },
        { k: "Unit", v: selected.unit.split("·")[0].trim() },
        { k: "Sections", v: String(selected.sections.length) },
        { k: "Mode", v: "Self-Practice" },
      ]
    : [
        { k: "Level", v: levelLabel },
        { k: "Unit", v: selected.unit.split("·")[0].trim() },
        { k: "Sections", v: String(selected.sections.length) },
        { k: "Key terms", v: String(selected.keyTerms.length) },
      ];
  const subjectName = NOTES_SUBJECTS.find((s) => s.id === subject)?.name ?? subject;

  return (
    <Container>
      <article className="mx-auto max-w-4xl animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={backToLibrary} className={cn(btn.ghost, "-ml-3")}><ArrowLeft className="h-4 w-4" /> All {levelLabel} {subjectName} notes</button>
          <div className="relative">
            <button type="button" onClick={() => setJumpOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 sm:py-2 text-sm font-medium text-fg hover:border-line-2"><span className="h-2 w-2 rounded-full bg-brand shrink-0" /><span className="max-w-48 truncate">{selected.title}</span><ChevronDown className={cn("h-4 w-4 text-subtle transition", jumpOpen && "rotate-180")} /></button>
            {jumpOpen ? (
              <div className="absolute right-0 top-full z-20 mt-2 max-h-80 w-80 overflow-y-auto rounded-2xl border border-line bg-surface p-2 card-shadow">
                {chapters.map((ch) => <button key={ch.id} type="button" onClick={() => { openChapter(ch.id); setJumpOpen(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3.5 py-3 sm:px-3 sm:py-2.5 text-left text-sm transition", ch.id === selected.id ? "bg-brand/[0.1] text-fg" : "text-muted hover:bg-fg/[0.05] hover:text-fg")}><span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" /><span className="truncate">{ch.title}</span></button>)}
              </div>
            ) : null}
          </div>
        </div>

        <header className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">
              {isAbhyasChapter ? <ListChecks className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
              {subjectName} · {isAbhyasChapter ? (selected.subject === "hindi" ? "स्व-मूल्यांकन एवं अभ्यास" : "Practice & Self-Assessment") : levelLabel}
            </Badge>
            <Badge tone="neutral">{selected.unit.split('·')[0].trim()}</Badge>
            {isAbhyasChapter ? <Badge tone="neutral">{selected.subject === "hindi" ? "इंटरैक्टिव अभ्यास मोड" : "Interactive Practice Mode"}</Badge> : null}
            {diagram ? <Badge><ImageIcon className="h-3.5 w-3.5 text-brand-ink" /> Labelled diagram</Badge> : null}
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl lg:text-6xl">{selected.title}</h1>
          <p className="mt-4 font-mono text-xs sm:text-[11px] uppercase tracking-[0.16em] text-subtle">{selected.unit}</p>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">{selected.overview}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">{meta.map((m) => <div key={m.k} className="bg-bg px-5 py-4"><dt className="font-mono text-xs sm:text-[10px] uppercase tracking-[0.16em] text-subtle">{m.k}</dt><dd className="mt-1 font-mono text-xl font-semibold text-fg tabular-nums">{m.v}</dd></div>)}</dl>
        </header>

        {diagram ? <div className="mt-10"><DiagramFrame entry={diagram} index={selected.chapterNo} /></div> : null}

        {isAbhyasChapter ? (
          <AbhyasArena chapter={selected} />
        ) : (
          <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-12">{selected.sections.map((s, i) => <SectionBlock key={s.title} index={i + 1} section={s} chapterId={selected.id} />)}</div>
        )}

        {!isAbhyasChapter && selected.keyTerms?.length ? (
          <Card className="mt-14 p-6 sm:p-8"><Label className="mb-6">Key terms</Label><dl className="grid gap-3 sm:grid-cols-2">{selected.keyTerms.map((t) => <div key={t.term} className="rounded-xl border border-line bg-fg/[0.02] p-4"><dt className="text-base font-semibold text-fg">{t.term}</dt><dd className="mt-1.5 text-sm leading-relaxed text-muted">{t.meaning}</dd></div>)}</dl></Card>
        ) : null}

        {!isAbhyasChapter && selected.examTips?.length ? (
          <Card className="mt-6 p-6 sm:p-8"><Label className="mb-6">Exam tips</Label><ul className="space-y-4">{selected.examTips.map((tip, i) => <li key={i} className="flex gap-3.5 text-base leading-7 text-muted"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand/40 bg-brand/10 font-mono text-[11px] font-semibold text-brand-ink">{i + 1}</span><Rich text={tip} /></li>)}</ul></Card>
        ) : null}

        <nav className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {selectedIndex > 0 ? <button type="button" onClick={() => openChapter(chapters[selectedIndex - 1].id)} className={cn(btn.subtle, "justify-start text-left")}><ArrowLeft className="h-4 w-4 shrink-0" /><span><span className="block font-mono text-xs sm:text-[10px] uppercase tracking-[0.16em] text-subtle">Previous</span><span className="block max-w-52 truncate">{chapters[selectedIndex - 1].title}</span></span></button> : <span />}
          {selectedIndex < chapters.length - 1 ? <button type="button" onClick={() => openChapter(chapters[selectedIndex + 1].id)} className={cn(btn.subtle, "justify-end text-right")}><span><span className="block font-mono text-xs sm:text-[10px] uppercase tracking-[0.16em] text-subtle">Next</span><span className="block max-w-52 truncate">{chapters[selectedIndex + 1].title}</span></span><ArrowRight className="h-4 w-4 shrink-0" /></button> : null}
        </nav>

        {subject === "science" || subject === "sst" ? <Card className="mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 font-semibold text-fg"><ListChecks className="h-4 w-4 text-brand-ink" /> Finished revising?</p><p className="mt-1 text-sm text-muted">Test this chapter with a short practice quiz.</p></div><button type="button" onClick={() => router.push(`/quiz?topic=${quizTopicFor(selected)}&n=10&t=30&tm=per-question&d=any&src=bank&h=3`)} className={btn.primary}>Practise this chapter <ArrowRight className="h-4 w-4" /></button></Card> : null}
      </article>
    </Container>
  );
}

function quizTopicFor(chapter: NoteChapter): string {
  if (chapter.subject === "sst") return chapter.id.replace("note-", "");
  if (chapter.subject === "science") return `sci${chapter.id.replace("note", "")}`;
  return "math-mixed";
}
