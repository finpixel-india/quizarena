"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import QuizBuilder from "@/components/QuizBuilder";
import { Card, Container, Label, SubjectIcon } from "@/components/ui";
import { accuracyTone, cn, relativeTime, splitLabel } from "@/lib/format";
import { quizHref, setupHref } from "@/lib/links";
import { type AttemptSummary, computeStats } from "@/lib/stats";
import { listAllTopics } from "@/lib/topics";
import type { TopicInfo } from "@/lib/types";
import { useAttempts, useLocalSettings } from "@/lib/use-local-data";

function resolveInitialTopic(sp: Record<string, string | string[] | undefined>, rows: AttemptSummary[], topics: TopicInfo[]): string {
  const ids = new Set(topics.map((t) => t.id));
  if (typeof sp.topic === "string" && ids.has(sp.topic)) return sp.topic;

  const subject = typeof sp.subject === "string" ? sp.subject : undefined;
  if (subject) {
    const cls = sp.class === "9" ? 9 : sp.class === "10" ? 10 : undefined;
    const pick = cls
      ? topics.find((t) => t.subject === subject && t.classLevel === cls && t.kind === "class-all" && !t.section)
      : topics.find((t) => t.subject === subject && (t.kind === "mixed" || (t.kind === "class-all" && !t.section)));
    if (pick) return pick.id;
  }

  const last = rows.find((r) => r.mode === "standard" && ids.has(r.topicId));
  return last?.topicId ?? "sci10-all";
}

const HOW = [
  { n: "01", t: "Set it up in one step", d: "Subject, class, chapter, question count and timer — all on a single screen. No wizards." },
  { n: "02", t: "Play focused", d: "Timed questions, up to 3 hints, full-screen mode and keyboard shortcuts for speed." },
  { n: "03", t: "Review & improve", d: "Every quiz saved with a full answer review, high scores and your best scoring niche." },
];

export default function HomeClient() {
  const sp = useSearchParams();
  const spObj = Object.fromEntries(sp.entries()) as Record<string, string | string[] | undefined>;
  const { ready, summaries: rows } = useAttempts();
  const { settings } = useLocalSettings();
  const stats = useMemo(() => computeStats(rows), [rows]);
  const topics = listAllTopics();
  const initialTopicId = resolveInitialTopic(spObj, rows, topics);
  const last = rows.find((r) => r.mode === "standard");

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        Loading QuizLab…
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Container className="pb-0 sm:pb-0 w-full max-w-full overflow-hidden">
      {/* ------------------------------- Hero (dark) ------------------------------ */}
      <section className="flex flex-col gap-6 pb-8 sm:gap-10 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
        <div className="max-w-2xl animate-fade-up">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle sm:text-[11px] sm:tracking-[0.18em]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(249,115,22,0.75)]" />
              NCERT-aligned practice
            </span>
            <span className="hidden text-line-2 sm:inline">/</span>
            <span className="hidden sm:inline">Class 9 &amp; 10 — Science · SST · Math · IT · Board PYQs</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-fg sm:mt-7 sm:text-6xl lg:text-7xl">
            Practice
            <br />
            <span className="grad-text">with precision,</span>
            <br />
            not guesswork.
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:mt-7 sm:text-lg">
            Chapter-wise quizzes with timers, hints and instant answer reviews. Set everything up on one screen and start in a single tap.
          </p>

          {last ? (
            <Link
              href={quizHref({ topicId: last.topicId, amount: last.totalQuestions, time: last.timePerQuestion, timerMode: last.timerMode, totalTime: last.totalTime, difficulty: last.difficulty, source: last.source })}
              className="group mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-line-2 px-4 py-2 text-xs text-muted transition hover:border-brand hover:text-fg sm:mt-8 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0 text-brand-ink sm:h-4 sm:w-4" />
              <span className="truncate">
                Replay last quiz · <span className="font-medium text-fg">{splitLabel(last.topicLabel).title}</span>
              </span>
            </Link>
          ) : null}
        </div>

        {rows.length ? (
          <div className="grid shrink-0 grid-cols-3 overflow-hidden rounded-2xl border border-line bg-card card-shadow animate-fade-up md:backdrop-blur-xl">
            {[
              { k: "Streak", v: `${stats.currentStreak}d` },
              { k: "Accuracy", v: `${stats.accuracy}%` },
              { k: "High score", v: stats.highestScore?.score ?? 0 },
            ].map((s, i) => (
              <div key={s.k} className={cn("px-3 py-3 text-center sm:px-7 sm:py-5 sm:text-left", i > 0 && "border-l border-line")}>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-subtle sm:text-[10px] sm:tracking-[0.18em]">{s.k}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-fg tabular-nums sm:mt-1.5 sm:text-2xl">{s.v}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* ------------------------------ Builder (dark) ----------------------------- */}
      <section id="builder" className="scroll-mt-20 pb-12 sm:pb-20 w-full max-w-full min-w-0 overflow-hidden">
        <Label n="01" className="mb-4 sm:mb-6">
          Build your quiz
        </Label>
        <QuizBuilder key={initialTopicId} topics={topics} settings={settings} initialTopicId={initialTopicId} />
      </section>
      </Container>

      {/* --------------------------- Cream band (light) --------------------------- */}
      <section className="band-light relative overflow-hidden border-t border-line w-full max-w-full">
        <div className="grid-lines absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,#000,transparent)] md:block" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-20">
          {rows.length ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Label n="02">Your progress</Label>
                  <h2 className="mt-5 max-w-lg text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-fg sm:text-4xl">
                    Every quiz, <span className="grad-text">reviewed.</span>
                  </h2>
                </div>
                <Link
                  href="/history"
                  className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-brand hover:bg-brand/10"
                >
                  See all history <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">
                <Card className="lg:col-span-2">
                  <Label className="px-6 pt-6 sm:px-7">Recent activity</Label>
                  <div className="mt-3 divide-y divide-line pb-2">
                    {rows.slice(0, 5).map((r) => {
                      const { context, title } = splitLabel(r.topicLabel);
                      return (
                        <Link key={r.id} href={`/results?id=${r.id}`} className="flex items-center gap-4 px-6 py-4 transition hover:bg-fg/[0.04] sm:px-7">
                          <SubjectIcon subject={r.subject} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-fg">
                              {title}
                              {r.mode === "mistakes" ? <span className="text-subtle"> · mistakes</span> : null}
                            </p>
                            <p className="mt-0.5 truncate font-mono text-[11px] text-subtle">
                              {context ? `${context} · ` : ""}
                              {relativeTime(r.createdAt)} · {r.correctCount}/{r.totalQuestions} · {r.score} pts
                            </p>
                          </div>
                          <span className={cn("font-mono text-sm font-semibold tabular-nums", accuracyTone(r.accuracy))}>{r.accuracy}%</span>
                        </Link>
                      );
                    })}
                  </div>
                </Card>

                <div className="grid gap-4 lg:gap-6">
                  <Card className="p-6 sm:p-7">
                    <Label>Best scoring niche</Label>
                    {stats.bestNiche ? (
                      <>
                        <p className="mt-4 truncate text-lg font-bold tracking-tight text-fg">{splitLabel(stats.bestNiche.label).title}</p>
                        <p className="truncate text-xs text-subtle">{splitLabel(stats.bestNiche.label).context}</p>
                        <p className="mt-4 font-mono text-3xl font-semibold text-success tabular-nums">{stats.bestNiche.accuracy}%</p>
                      </>
                    ) : (
                      <p className="mt-4 text-sm text-muted">Play a few quizzes to discover it.</p>
                    )}
                  </Card>
                  <Card className="p-6 sm:p-7">
                    <Label>Needs practice</Label>
                    {stats.weakest ? (
                      <>
                        <p className="mt-4 truncate text-lg font-bold tracking-tight text-fg">{splitLabel(stats.weakest.label).title}</p>
                        <p className="truncate text-xs text-subtle">{splitLabel(stats.weakest.label).context}</p>
                        <div className="mt-4 flex items-end justify-between gap-3">
                          <p className="font-mono text-3xl font-semibold text-danger tabular-nums">{stats.weakest.accuracy}%</p>
                          <Link href={setupHref(stats.weakest.topicId)} className="text-sm font-semibold text-brand-ink hover:underline">
                            Practise →
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="mt-4 text-sm text-muted">Nothing yet — try different chapters to compare.</p>
                    )}
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <>
              <Label n="02">How it works</Label>
              <h2 className="mt-5 max-w-xl text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-fg sm:text-4xl">
                Built for revision, <span className="grad-text">down to the last chapter.</span>
              </h2>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {HOW.map((f) => (
                  <div key={f.n} className="bg-bg p-7 sm:p-8">
                    <p className="font-mono text-xs font-semibold text-brand-ink">{f.n}</p>
                    <p className="mt-5 text-lg font-bold tracking-tight text-fg">{f.t}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.d}</p>
                  </div>
                ))}
              </div>
              <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { v: "748", k: "Curated questions" },
                  { v: "67", k: "NCERT chapters" },
                  { v: "∞", k: "Generated math" },
                  { v: "3", k: "Question sources" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="grad-text font-mono text-3xl font-bold tabular-nums sm:text-4xl">{s.v}</dt>
                    <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">{s.k}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
