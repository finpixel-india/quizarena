"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Lightbulb, Minus, Target, X } from "lucide-react";
import { Card, btn } from "@/components/ui";
import { cn, pad2 } from "@/lib/format";
import type { AttemptQuestion, QuizQuestion } from "@/lib/types";

type Filter = "all" | "correct" | "wrong" | "skipped";

export function PractiseMistakesButton({
  questions,
  topicId,
  timePerQuestion,
  source,
  className,
}: {
  questions: AttemptQuestion[];
  topicId: string;
  timePerQuestion: number;
  source: string;
  className?: string;
}) {
  const router = useRouter();
  const mistakes = questions.filter((q) => q.status !== "correct");
  if (!mistakes.length) return null;
  function go() {
    const qs: QuizQuestion[] = mistakes.map((q, i) => ({
      id: `m-${i}`,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      hint: q.hint,
      explanation: q.explanation,
      type: q.type,
      origin: q.origin,
    }));
    try {
      sessionStorage.setItem("ql-mistakes", JSON.stringify({ topicId, questions: qs }));
    } catch {
      /* ignore quota errors */
    }
    const p = new URLSearchParams({ topic: topicId, mode: "mistakes", t: String(timePerQuestion), src: source, n: String(qs.length) });
    router.push(`/quiz?${p.toString()}`);
  }
  return (
    <button type="button" onClick={go} className={cn(btn.secondary, className)}>
      <Target className="h-4 w-4 text-brand-ink" /> Practise mistakes ({mistakes.length})
    </button>
  );
}

const STATUS_META = {
  correct: { label: "Correct", cls: "border-success/30 bg-success/10 text-success", icon: Check },
  wrong: { label: "Wrong", cls: "border-danger/30 bg-danger/10 text-danger", icon: X },
  skipped: { label: "Skipped", cls: "border-line bg-fg/[0.04] text-muted", icon: Minus },
  timeout: { label: "Time up", cls: "border-warning/30 bg-warning/10 text-warning", icon: Clock },
} as const;

export default function ReviewList({ questions }: { questions: AttemptQuestion[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = useMemo(
    () => ({
      all: questions.length,
      correct: questions.filter((q) => q.status === "correct").length,
      wrong: questions.filter((q) => q.status === "wrong").length,
      skipped: questions.filter((q) => q.status === "skipped" || q.status === "timeout").length,
    }),
    [questions],
  );
  const list = questions
    .map((q, i) => ({ q, n: i + 1 }))
    .filter(({ q }) => filter === "all" || (filter === "skipped" ? q.status === "skipped" || q.status === "timeout" : q.status === filter));

  const tabs: Array<{ id: Filter; label: string }> = [
    { id: "all", label: "All" },
    { id: "correct", label: "Correct" },
    { id: "wrong", label: "Wrong" },
    { id: "skipped", label: "Skipped" },
  ];

  return (
    <div>
      <div className="scrollbar-none -mx-5 mb-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist">
        {tabs.map((t) => {
          const active = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(t.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition",
                active ? "border-brand bg-brand/10 text-fg glow" : "border-line text-muted hover:border-line-2 hover:text-fg",
              )}
            >
              {t.label} <span className="ml-1 font-mono text-xs opacity-70">{counts[t.id]}</span>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <Card className="p-10 text-center text-sm text-subtle">No questions in this category.</Card>
      ) : (
        <div className="space-y-3">
          {list.map(({ q, n }) => {
            const meta = STATUS_META[q.status];
            const Icon = meta.icon;
            return (
              <Card key={n} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="font-mono font-semibold text-brand-ink">Q{pad2(n)}</span>
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
                  <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium", meta.cls)}>
                    <Icon className="h-3 w-3" /> {meta.label}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-subtle">
                    <Clock className="h-3 w-3" /> {q.timeTaken}s
                  </span>
                  {q.hintUsed ? (
                    <span className="inline-flex items-center gap-1 text-warning">
                      <Lightbulb className="h-3 w-3" /> Hint
                    </span>
                  ) : null}
                  {q.points ? <span className="ml-auto font-mono font-semibold text-fg">+{q.points}</span> : null}
                </div>
                <p className="mt-3 font-semibold leading-snug text-fg">{q.question}</p>
                <ul className="mt-4 space-y-2">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isSelected = i === q.selectedIndex;
                    return (
                      <li
                        key={i}
                        className={cn(
                          "flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm",
                          isCorrect ? "border-success/40 bg-success/[0.08] text-fg" : isSelected ? "border-danger/40 bg-danger/[0.08] text-fg" : "border-line text-muted",
                        )}
                      >
                        <span className="mt-0.5 shrink-0">
                          {isCorrect ? <Check className="h-4 w-4 text-success" /> : isSelected ? <X className="h-4 w-4 text-danger" /> : <span className="inline-block h-4 w-4" />}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isSelected ? (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-subtle">Your answer</span>
                        ) : isCorrect ? (
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-subtle">Correct</span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
                {q.explanation || (q.hintUsed && q.hint) ? (
                  <div className="mt-4 space-y-1.5 rounded-r-xl border-l-2 border-brand/60 bg-fg/[0.03] py-3 pl-4 pr-3 text-sm leading-relaxed text-muted">
                    {q.explanation ? (
                      <p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ink">Why · </span>
                        {q.explanation}
                      </p>
                    ) : null}
                    {q.hintUsed && q.hint ? (
                      <p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warning">Hint · </span>
                        {q.hint}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
