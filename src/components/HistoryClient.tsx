"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, History, Zap } from "lucide-react";
import DeleteAttemptButton from "@/components/DeleteAttemptButton";
import LocalTime from "@/components/LocalTime";
import { Card, Container, EmptyState, PageHeader, ProgressRing, SubjectIcon, btn } from "@/components/ui";
import { cn, formatDuration, splitLabel } from "@/lib/format";
import { SOURCE_META, isSource } from "@/lib/settings";
import { SUBJECTS, getSubject } from "@/lib/subjects";
import { useAttempts } from "@/lib/use-local-data";

const PAGE_SIZE = 20;

export default function HistoryClient() {
  const sp = useSearchParams();
  const subjectParam = sp.get("subject");
  const subject = subjectParam && getSubject(subjectParam) ? subjectParam : undefined;
  const page = Math.max(1, parseInt(sp.get("page") || "1", 10) || 1);
  const { ready, summaries } = useAttempts();

  const overall = summaries.length;
  const filtered = useMemo(() => (subject ? summaries.filter((r) => r.subject === subject) : summaries), [summaries, subject]);
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const href = (p: number, s = subject) => {
    const params = new URLSearchParams();
    if (s) params.set("subject", s);
    if (p > 1) params.set("page", String(p));
    const q = params.toString();
    return q ? `/history?${q}` : "/history";
  };

  if (!ready) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl py-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">Loading history…</div>
      </Container>
    );
  }

  if (!overall) {
    return (
      <Container>
        <div className="mx-auto max-w-3xl">
          <PageHeader eyebrow="Archive" title="Quiz history" description="Every quiz you take is saved here with a full review." />
          <EmptyState
            icon={History}
            title="No quizzes yet"
            description="Take a quiz and it will show up here — with your score, time taken and a question-by-question review. Everything is stored on this device."
            action={
              <Link href="/#builder" className={btn.primary}>
                <Zap className="h-4 w-4" /> Start practising
              </Link>
            }
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-3xl animate-fade-in">
        <PageHeader eyebrow="Archive" title="Quiz history" description={`${overall} quiz${overall === 1 ? "" : "zes"} saved on this device · tap any quiz to review every answer.`} />

        <div className="scrollbar-none -mx-5 mb-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {[{ id: undefined as string | undefined, short: "All" }, ...SUBJECTS.map((s) => ({ id: s.id, short: s.short }))].map((s) => {
            const active = subject === s.id;
            return (
              <Link
                key={s.short}
                href={href(1, s.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition",
                  active ? "border-brand bg-brand/10 text-fg glow" : "border-line text-muted hover:border-line-2 hover:text-fg",
                )}
              >
                {s.short}
              </Link>
            );
          })}
        </div>

        {rows.length === 0 ? (
          <Card className="p-10 text-center text-sm text-subtle">No quizzes for this subject yet.</Card>
        ) : (
          <Card className="divide-y divide-line overflow-hidden">
            {rows.map((r) => {
              const { context, title } = splitLabel(r.topicLabel);
              return (
                <div key={r.id} className="flex items-center gap-1 pr-2 transition hover:bg-fg/[0.03]">
                  <Link href={`/results?id=${r.id}`} className="flex min-w-0 flex-1 items-center gap-4 p-4 sm:p-5">
                    <SubjectIcon subject={r.subject} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-fg">
                        {title}
                        {r.mode === "mistakes" ? <span className="text-subtle"> · mistakes</span> : null}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-subtle">
                        {context ? `${context} · ` : ""}
                        <LocalTime value={r.createdAt} />
                      </p>
                      <p className="mt-1.5 flex flex-wrap gap-x-3 font-mono text-[11px] text-muted">
                        <span>
                          <span className="text-fg">{r.correctCount}</span>/{r.totalQuestions}
                        </span>
                        <span>
                          <span className="text-fg">{r.score}</span> pts
                        </span>
                        <span>{formatDuration(r.durationSeconds)}</span>
                        <span>{r.timerMode === "total" ? `${formatDuration(r.totalTime)} quiz` : r.timePerQuestion ? `${r.timePerQuestion}s/q` : "untimed"}</span>
                        {r.hintsUsed ? (
                          <span>
                            {r.hintsUsed} hint{r.hintsUsed === 1 ? "" : "s"}
                          </span>
                        ) : null}
                        <span className="hidden sm:inline">{isSource(r.source) ? SOURCE_META[r.source].short : r.source}</span>
                      </p>
                    </div>
                    <ProgressRing value={r.accuracy} size={46} stroke={3.5}>
                      <span className="font-mono text-[11px] font-semibold text-fg tabular-nums">{r.accuracy}</span>
                    </ProgressRing>
                  </Link>
                  <DeleteAttemptButton id={r.id} />
                </div>
              );
            })}
          </Card>
        )}

        {pages > 1 ? (
          <div className="mt-6 flex items-center justify-between">
            {page > 1 ? (
              <Link href={href(page - 1)} className={btn.subtle}>
                <ChevronLeft className="h-4 w-4" /> Newer
              </Link>
            ) : (
              <span />
            )}
            <span className="font-mono text-xs text-subtle">
              {page} / {pages}
            </span>
            {page < pages ? (
              <Link href={href(page + 1)} className={btn.subtle}>
                Older <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
