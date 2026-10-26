"use client";

import { useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
  HelpCircle,
  Lightbulb,
  ListChecks,
  RefreshCw,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { GENERAL_SCIENCE_QUESTIONS_BY_CHAPTER, type GenScienceQuestion } from "@/data/notes/generalScienceQuestions";
import { cn } from "@/lib/format";
import { haptic } from "@/lib/haptics";

interface Props {
  chapterId: string;
  chapterTitle: string;
}

export function GeneralSciencePracticeArena({ chapterId, chapterTitle }: Props) {
  const questions: GenScienceQuestion[] = useMemo(() => {
    return GENERAL_SCIENCE_QUESTIONS_BY_CHAPTER[chapterId] || [];
  }, [chapterId]);

  // User answers map: questionId -> option key ("A" | "B" | "C" | "D")
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  // Filter: all | unanswered | wrong | correct
  const [activeFilter, setActiveFilter] = useState<"all" | "unanswered" | "wrong" | "correct">("all");
  // Show/hide jump drawer on mobile
  const [showJumpGrid, setShowJumpGrid] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const { correctCount, wrongCount } = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    for (const q of questions) {
      const picked = answers[q.id];
      if (picked) {
        if (picked === q.correctKey) {
          correct++;
        } else {
          wrong++;
        }
      }
    }
    return { correctCount: correct, wrongCount: wrong };
  }, [questions, answers]);

  const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const progressPct = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Filter questions list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const picked = answers[q.id];
      if (activeFilter === "unanswered") return !picked;
      if (activeFilter === "correct") return picked === q.correctKey;
      if (activeFilter === "wrong") return picked && picked !== q.correctKey;
      return true; // all
    });
  }, [questions, answers, activeFilter]);

  const handlePickOption = (q: GenScienceQuestion, key: "A" | "B" | "C" | "D") => {
    if (answers[q.id]) return; // already answered
    const isCorrect = key === q.correctKey;
    if (isCorrect) {
      haptic("success");
    } else {
      haptic("error");
    }
    setAnswers((prev) => ({ ...prev, [q.id]: key }));
  };

  const handleReset = () => {
    haptic("medium");
    if (window.confirm("Do you want to reset your quiz answers and start over?")) {
      setAnswers({});
      setActiveFilter("all");
    }
  };

  const scrollToQuestion = (qId: string) => {
    haptic("light");
    const el = document.getElementById(`practice-q-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── STICKY / HERO SCORE DASHBOARD ─── */}
      <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/[0.08] via-card to-card p-4 sm:p-5 card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center shrink-0">
              <ListChecks className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-fg text-base sm:text-lg">Interactive Practice Arena</h3>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand/15 text-brand-ink">
                  {totalQuestions} Questions
                </span>
              </div>
              <p className="text-xs text-muted">
                Tap an option for instant answer feedback and clear plain-English explanations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-1.5 text-xs font-semibold text-muted hover:text-fg hover:border-line-2 transition active:scale-95"
                title="Reset answers"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                haptic("light");
                setShowJumpGrid((v) => !v);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand-ink hover:bg-brand/20 transition active:scale-95"
            >
              Jump to Q {showJumpGrid ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted">
              Answered: <strong className="text-fg">{answeredCount}</strong> / {totalQuestions} ({progressPct}%)
            </span>
            <span className="font-semibold text-brand-ink">
              Score: <strong className="text-emerald-500">{correctCount}</strong> Correct ·{" "}
              <strong className="text-rose-500">{wrongCount}</strong> Wrong ({accuracyPct}% accuracy)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-fg/[0.06] overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question Jump Palette (1 to 50) */}
        {showJumpGrid && (
          <div className="pt-2 border-t border-line/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Quick Navigation Grid (tap to scroll):</span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Correct
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Wrong
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-fg/20" /> Open
                </span>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1 rounded-xl bg-fg/[0.02] border border-line/40">
              {questions.map((q, idx) => {
                const picked = answers[q.id];
                const isCorrect = picked === q.correctKey;
                const isWrong = picked && !isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => scrollToQuestion(q.id)}
                    className={cn(
                      "h-8 rounded-lg font-mono text-xs font-semibold transition active:scale-95 flex items-center justify-center border",
                      isCorrect
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-bold"
                        : isWrong
                        ? "bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 font-bold"
                        : "bg-card border-line text-muted hover:border-brand/50 hover:text-fg"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            { id: "all", label: `All (${totalQuestions})` },
            { id: "unanswered", label: `Unanswered (${totalQuestions - answeredCount})` },
            { id: "wrong", label: `Incorrect (${wrongCount})` },
            { id: "correct", label: `Correct (${correctCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                haptic("light");
                setActiveFilter(tab.id as any);
              }}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition active:scale-95 border",
                activeFilter === tab.id
                  ? "bg-brand text-white border-brand shadow-xs"
                  : "bg-card border-line text-muted hover:text-fg hover:border-line-2"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── QUESTIONS LIST ─── */}
      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-line bg-card p-8 text-center space-y-3 card-shadow">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
          <p className="font-bold text-fg text-base">No questions match this filter!</p>
          <p className="text-xs text-muted max-w-sm mx-auto">
            {activeFilter === "unanswered"
              ? "Awesome work! You have answered all 50 questions in this chapter."
              : activeFilter === "wrong"
              ? "Clean record! You haven't got any questions wrong under this filter."
              : "Switch back to 'All' to review all questions."}
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="rounded-xl border border-brand bg-brand/10 px-4 py-2 text-xs font-bold text-brand-ink"
          >
            Show All 50 Questions
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const originalIndex = questions.findIndex((x) => x.id === q.id);
            const userPick = answers[q.id];
            const hasAnswered = !!userPick;
            const isUserCorrect = userPick === q.correctKey;

            return (
              <div
                key={q.id}
                id={`practice-q-${q.id}`}
                className={cn(
                  "rounded-2xl border bg-card p-4 sm:p-5 card-shadow space-y-4 transition-all scroll-mt-24",
                  hasAnswered
                    ? isUserCorrect
                      ? "border-emerald-500/30 bg-emerald-500/[0.015]"
                      : "border-rose-500/30 bg-rose-500/[0.015]"
                    : "border-line"
                )}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-fg/[0.06] text-fg border border-line">
                      Q{originalIndex + 1}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-subtle uppercase tracking-wider">
                      {q.topic}
                    </span>
                  </div>

                  {hasAnswered && (
                    <span
                      className={cn(
                        "flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border shrink-0",
                        isUserCorrect
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      )}
                    >
                      {isUserCorrect ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Correct (+1)
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" /> Incorrect
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-bold text-fg leading-relaxed">
                  {q.question}
                </p>

                {/* 4 Options Grid */}
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt) => {
                    const isSelected = userPick === opt.key;
                    const isActualCorrect = opt.key === q.correctKey;

                    let btnStyle = "border-line bg-fg/[0.02] text-fg hover:border-line-2 hover:bg-fg/[0.04]";
                    if (hasAnswered) {
                      if (isSelected) {
                        btnStyle = isUserCorrect
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500/40"
                          : "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-semibold ring-1 ring-rose-500/40";
                      } else if (isActualCorrect) {
                        btnStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold";
                      } else {
                        btnStyle = "border-line/40 bg-fg/[0.01] text-subtle opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={hasAnswered}
                        onClick={() => handlePickOption(q, opt.key)}
                        className={cn(
                          "w-full text-left rounded-xl border p-3 text-xs sm:text-sm transition flex items-start gap-2.5 active:scale-[0.99] disabled:cursor-default",
                          btnStyle
                        )}
                      >
                        <span
                          className={cn(
                            "h-5 w-5 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 border mt-0.5",
                            hasAnswered && isActualCorrect
                              ? "bg-emerald-500 text-white border-emerald-500"
                              : hasAnswered && isSelected && !isUserCorrect
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-fg/[0.06] text-muted border-line"
                          )}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 leading-snug">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation Box */}
                {hasAnswered && (
                  <div
                    className={cn(
                      "rounded-xl border p-3.5 text-xs sm:text-sm space-y-1.5 animate-fade-in",
                      isUserCorrect
                        ? "border-emerald-500/20 bg-emerald-500/[0.06] text-fg"
                        : "border-brand/20 bg-brand/[0.04] text-fg"
                    )}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                      <span>Plain-English Explanation:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed pl-5">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ─── BOTTOM SUMMARY BAR ─── */}
      {answeredCount === totalQuestions && totalQuestions > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] p-5 sm:p-6 card-shadow text-center space-y-3">
          <Award className="h-12 w-12 text-emerald-500 mx-auto" />
          <h4 className="text-lg font-bold text-fg">Chapter Assessment Complete!</h4>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto">
            You completed all {totalQuestions} questions with an accuracy score of{" "}
            <strong className="text-emerald-500 font-bold">{accuracyPct}%</strong> ({correctCount} correct,{" "}
            {wrongCount} incorrect).
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-brand px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:opacity-90 transition active:scale-95 inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Retake Practice Quiz
          </button>
        </div>
      )}
    </div>
  );
}
