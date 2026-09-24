"use client";

import Link from "next/link";
import { BarChart3, Clock, Flame, Target, Trophy, Zap } from "lucide-react";
import LocalTime from "@/components/LocalTime";
import { Card, Container, EmptyState, Label, PageHeader, StatCard, SubjectIcon, btn } from "@/components/ui";
import { accuracyBar, accuracyTone, cn, formatDuration, pad2, splitLabel } from "@/lib/format";
import { setupHref } from "@/lib/links";
import { getSubject } from "@/lib/subjects";
import { useLocalStats } from "@/lib/use-local-data";

export default function StatsClient() {
  const { ready, stats: s, summaries: rows } = useLocalStats();

  if (!ready) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading stats…</div>
      </Container>
    );
  }

  if (!rows.length) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl">
        <PageHeader eyebrow="Analytics" title="Stats & high scores" description="Track your progress, best topics and personal records." />
        <EmptyState
          icon={BarChart3}
          title="No stats yet"
          description="Finish your first quiz to unlock high scores, your best scoring niche, streaks and accuracy trends."
          action={
            <Link href="/#builder" className={btn.primary}>
              <Zap className="h-4 w-4" /> Start a quiz
            </Link>
          }
        />
        </div>
      </Container>
    );
  }

  return (
    <Container>
    <div className="space-y-6 animate-fade-in sm:space-y-8">
      <PageHeader eyebrow="Analytics" title="Stats & high scores" description="Your progress across every subject and chapter." />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="High score" value={s.highestScore?.score ?? 0} sub={s.highestScore ? splitLabel(s.highestScore.topicLabel).title : undefined} icon={Trophy} tone="warning" />
        <StatCard label="Accuracy" value={`${s.accuracy}%`} sub={`${s.totalCorrect} of ${s.totalQuestions} correct`} icon={Target} tone="success" />
        <StatCard label="Streak" value={`${s.currentStreak}d`} sub={`Best: ${s.bestStreak} day${s.bestStreak === 1 ? "" : "s"}`} icon={Flame} tone="danger" />
        <StatCard label="Practised" value={formatDuration(s.totalTime)} sub={`${s.totalQuizzes} quizzes · ${s.hintsUsed} hints`} icon={Clock} tone="brand" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 sm:gap-6">
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full [background:radial-gradient(closest-side,rgba(52,211,153,0.14),transparent)]" />
          <Label>Best scoring niche</Label>
          {s.bestNiche ? (
            <>
              <p className="mt-5 text-xl font-bold tracking-tight text-fg">{splitLabel(s.bestNiche.label).title}</p>
              <p className="mt-1 text-sm text-subtle">{splitLabel(s.bestNiche.label).context}</p>
              <div className="mt-6 flex items-end justify-between gap-3">
                <p className="font-mono text-4xl font-semibold text-success tabular-nums">{s.bestNiche.accuracy}%</p>
                <p className="text-right font-mono text-[11px] text-subtle">
                  {s.bestNiche.questions} Q · {s.bestNiche.quizzes} quiz{s.bestNiche.quizzes === 1 ? "" : "zes"}
                  <br />
                  best {s.bestNiche.bestScore} pts
                </p>
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm text-muted">Play more quizzes to find your niche.</p>
          )}
        </Card>
        <Card className="relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full [background:radial-gradient(closest-side,rgba(248,113,113,0.12),transparent)]" />
          <Label>Needs practice</Label>
          {s.weakest ? (
            <>
              <p className="mt-5 text-xl font-bold tracking-tight text-fg">{splitLabel(s.weakest.label).title}</p>
              <p className="mt-1 text-sm text-subtle">{splitLabel(s.weakest.label).context}</p>
              <div className="mt-6 flex items-end justify-between gap-3">
                <p className="font-mono text-4xl font-semibold text-danger tabular-nums">{s.weakest.accuracy}%</p>
                <Link href={setupHref(s.weakest.topicId)} className={cn(btn.secondary, "px-4 py-2")}>
                  Practise
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm text-muted">Nothing yet — try quizzes on different topics to compare.</p>
          )}
        </Card>
      </section>

      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <Label>Accuracy trend</Label>
          <span className="font-mono text-[11px] text-subtle">last {s.trend.length}</span>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between" aria-hidden="true">
            {[100, 75, 50, 25, 0].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <span className="w-7 text-right font-mono text-[10px] text-subtle">{v}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
            ))}
          </div>
          <div className="relative ml-10 flex h-44 items-end gap-2 sm:gap-3">
            {s.trend.map((t) => (
              <Link key={t.id} href={`/results?id=${t.id}`} className="group relative flex h-full flex-1 items-end justify-center" title={`${t.topicLabel} — ${t.accuracy}%`}>
                <span
                  className="w-full max-w-9 rounded-t-md grad-hero opacity-80 transition group-hover:opacity-100 group-hover:shadow-[0_0_24px_-4px_rgba(249,115,22,0.85)]"
                  style={{ height: `${Math.max(2, t.accuracy)}%` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <Label className="mb-5">High scores</Label>
          <ol className="-mx-2 space-y-0.5">
            {s.topScores.map((r, i) => (
              <li key={r.id}>
                <Link href={`/results?id=${r.id}`} className="flex items-center gap-4 rounded-xl px-2 py-2.5 transition hover:bg-fg/[0.04]">
                  <span className={cn("w-6 font-mono text-xs", i === 0 ? "text-brand-ink" : "text-subtle")}>{pad2(i + 1)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-fg">{splitLabel(r.topicLabel).title}</p>
                    <p className="font-mono text-[11px] text-subtle">
                      <LocalTime value={r.createdAt} withTime={false} /> · {r.correctCount}/{r.totalQuestions} · {r.accuracy}%
                    </p>
                  </div>
                  <span className={cn("font-mono text-sm font-semibold tabular-nums", i === 0 ? "grad-text" : "text-fg")}>{r.score}</span>
                </Link>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-6 sm:p-8">
          <Label className="mb-6">By subject</Label>
          <div className="space-y-6">
            {s.subjects.map((sub) => (
              <div key={sub.subject} className="flex items-center gap-4">
                <SubjectIcon subject={sub.subject} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-fg">{getSubject(sub.subject)?.name ?? sub.subject}</span>
                    <span className={cn("font-mono font-semibold tabular-nums", accuracyTone(sub.accuracy))}>{sub.accuracy}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10">
                    <div className="h-full rounded-full grad-hero" style={{ width: `${sub.accuracy}%` }} />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-subtle">
                    {sub.quizzes} quiz{sub.quizzes === 1 ? "" : "zes"} · {sub.questions} Q · best {sub.bestScore}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <Label className="px-6 pb-3 pt-6 sm:px-8 sm:pt-8">Topic performance</Label>
        <div className="divide-y divide-line">
          {s.topics.map((t) => {
            const { context, title } = splitLabel(t.label);
            return (
              <div key={t.topicId} className="flex items-center gap-4 px-6 py-4 sm:px-8">
                <SubjectIcon subject={t.subject} size="sm" className="hidden sm:inline-flex" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fg">{title}</p>
                  <p className="truncate font-mono text-[11px] text-subtle">
                    {context ? `${context} · ` : ""}
                    {t.quizzes} quiz{t.quizzes === 1 ? "" : "zes"} · {t.questions} Q · best {t.bestScore}
                  </p>
                  <div className="mt-2 h-1 max-w-56 overflow-hidden rounded-full bg-fg/10">
                    <div className={cn("h-full rounded-full", accuracyBar(t.accuracy))} style={{ width: `${t.accuracy}%` }} />
                  </div>
                </div>
                <span className={cn("font-mono text-sm font-semibold tabular-nums", accuracyTone(t.accuracy))}>{t.accuracy}%</span>
                <Link href={setupHref(t.topicId)} className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand/60 hover:text-fg">
                  Practise
                </Link>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
    </Container>
  );

}
