"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChevronLeft, Crown, Plus, RotateCcw, Star } from "lucide-react";
import LocalTime from "@/components/LocalTime";
import ReviewList, { PractiseMistakesButton } from "@/components/ReviewList";
import { Badge, Card, Container, Label, ProgressRing, btn } from "@/components/ui";
import { cn, formatDuration, splitLabel } from "@/lib/format";
import { quizHref } from "@/lib/links";
import { gradeFor } from "@/lib/scoring";
import { SOURCE_META, isSource } from "@/lib/settings";
import { getAttempt } from "@/lib/storage";
import { toDetail } from "@/lib/stats";
import { useAttempts } from "@/lib/use-local-data";

export default function ResultsClient({ id }: { id: string }) {
  const { ready, attempts } = useAttempts();
  const stored = useMemo(() => attempts.find((a) => a.id === id) ?? getAttempt(id), [attempts, id]);
  const a = stored ? toDetail(stored) : null;

  if (!ready) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading results…</div>
      </Container>
    );
  }

  if (!a) {
    return (
      <Container>
        <div className="mx-auto max-w-sm py-20 text-center animate-fade-up">
          <p className="grad-text font-mono text-5xl font-bold tracking-tight">404</p>
          <h1 className="mt-4 text-xl font-bold tracking-tight text-fg">Quiz not found</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">This result isn’t on this device — it may have been cleared, or you’re on a different browser.</p>
          <Link href="/history" className={cn(btn.primary, "mt-8")}>
            Back to history
          </Link>
        </div>
      </Container>
    );
  }

  const older = attempts.filter((r) => r.id !== a.id && Date.parse(r.createdAt) < a.createdAt.getTime());
  const prevTopicBest = older.filter((r) => r.topicId === a.topicId).reduce((m, r) => Math.max(m, r.score), -1);
  const prevOverallBest = older.reduce((m, r) => Math.max(m, r.score), -1);
  const isOverallBest = older.length > 0 && a.score > prevOverallBest;
  const isTopicBest = !isOverallBest && prevTopicBest >= 0 && a.score > prevTopicBest;
  const grade = gradeFor(a.accuracy);
  const avg = a.totalQuestions ? Math.round((a.durationSeconds / a.totalQuestions) * 10) / 10 : 0;
  const sourceName = isSource(a.source) ? SOURCE_META[a.source].name : a.source;
  const { context, title } = splitLabel(a.topicLabel);

  const cells = [
    { label: "Correct", value: a.correctCount, dot: "bg-success" },
    { label: "Wrong", value: a.wrongCount, dot: "bg-danger" },
    { label: "Skipped", value: a.skippedCount, dot: "bg-subtle" },
    { label: `Time · ${avg}s avg`, value: formatDuration(a.durationSeconds), dot: "bg-brand" },
  ];

  return (
    <Container>
      <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
        <Link href="/history" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle transition hover:text-fg">
          <ChevronLeft className="h-3.5 w-3.5" /> History
        </Link>

        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full [background:radial-gradient(closest-side,var(--aurora-1),transparent)]" />
          <div className="relative flex flex-col items-center gap-8 p-7 text-center sm:flex-row sm:gap-10 sm:p-10 sm:text-left">
            <ProgressRing value={a.accuracy} size={148} stroke={9} variant="brand">
              <div className="text-center">
                <p className="font-mono text-4xl font-semibold tracking-tight text-fg tabular-nums">
                  {a.accuracy}
                  <span className="text-xl text-muted">%</span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">Accuracy</p>
              </div>
            </ProgressRing>
            <div className="min-w-0 flex-1">
              <Label className="justify-center sm:justify-start">{a.mode === "mistakes" ? "Mistakes review" : "Quiz result"}</Label>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">{grade.label}</h1>
              <p className="mt-2 truncate text-sm text-muted">
                {title}
                {context ? <span className="text-subtle"> · {context}</span> : null}
              </p>
              <p className="mt-5 flex items-baseline justify-center gap-2 sm:justify-start">
                <span className="grad-text font-mono text-4xl font-bold tabular-nums">{a.score}</span>
                <span className="font-mono text-sm text-subtle">/ {a.maxScore} pts</span>
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {isOverallBest ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full grad-hero px-3 py-1 text-xs font-bold text-white shadow-[0_0_24px_-6px_rgba(249,115,22,0.9)] animate-pop">
                    <Crown className="h-3.5 w-3.5" /> New high score
                  </span>
                ) : null}
                {isTopicBest ? (
                  <Badge tone="brand" className="animate-pop">
                    <Star className="h-3.5 w-3.5" /> Personal best for this topic
                  </Badge>
                ) : null}
                <Badge>
                  <LocalTime value={a.createdAt} />
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {cells.map((s, i) => (
              <div key={s.label} className={cn("p-5 sm:p-6", i % 2 === 1 && "border-l border-line", i > 1 && "border-t border-line sm:border-t-0", i === 2 && "sm:border-l")}>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                  {s.label}
                </p>
                <p className="mt-2 font-mono text-2xl font-semibold text-fg tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <p className="-mt-4 flex flex-wrap gap-x-4 gap-y-1 px-1 font-mono text-[11px] text-subtle">
          <span>{sourceName}</span>
          <span>
            {a.timerMode === "total"
              ? `${formatDuration(a.totalTime)} for the whole quiz`
              : a.timePerQuestion
                ? `${a.timePerQuestion}s / question`
                : "No time limit"}
          </span>
          <span>
            {a.hintsUsed} hint{a.hintsUsed === 1 ? "" : "s"} used
          </span>
          {a.difficulty !== "any" ? <span className="capitalize">{a.difficulty}</span> : null}
        </p>

        <div className="grid gap-2 sm:flex sm:flex-wrap">
          <Link
            href={quizHref({
              topicId: a.topicId,
              amount: a.mode === "mistakes" ? 10 : a.totalQuestions,
              time: a.timePerQuestion,
              timerMode: a.timerMode,
              totalTime: a.totalTime,
              difficulty: a.difficulty,
              source: a.source,
            })}
            className={btn.primary}
          >
            <RotateCcw className="h-4 w-4" /> Retry quiz
          </Link>
          <PractiseMistakesButton questions={a.questions} topicId={a.topicId} timePerQuestion={a.timePerQuestion} source={a.source} />
          <Link href="/#builder" className={btn.subtle}>
            <Plus className="h-4 w-4" /> New quiz
          </Link>
        </div>

        <section className="pt-4">
          <Label className="mb-5">Answer review</Label>
          <ReviewList questions={a.questions} />
        </section>
      </div>
    </Container>
  );
}
