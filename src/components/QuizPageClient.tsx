"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import { MAX_TOTAL_TIME, MIN_TOTAL_TIME, clampInt, isDifficulty, isSource, normalizeTime } from "@/lib/settings";
import { getTopicInfo } from "@/lib/topics";
import type { QuizConfig, QuizMode, SourceId } from "@/lib/types";
import { useEffect } from "react";

export default function QuizPageClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const topicId = sp.get("topic") || "";
  const topic = useMemo(() => (topicId ? getTopicInfo(topicId) : undefined), [topicId]);

  useEffect(() => {
    if (!topic) router.replace("/");
  }, [topic, router]);

  if (!topic) {
    return (
      <div className="flex min-h-dvh items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        Loading…
      </div>
    );
  }

  const mode: QuizMode = sp.get("mode") === "mistakes" ? "mistakes" : "standard";
  const requested = isSource(sp.get("src")) ? (sp.get("src") as SourceId) : "bank";
  const source: SourceId = topic.sources.includes(requested) || mode === "mistakes" ? requested : topic.sources[0];
  const timerMode = sp.get("tm") === "total" ? "total" : "per-question";
  const config: QuizConfig = {
    topicId: topic.id,
    source,
    amount: clampInt(sp.get("n"), 1, 50, 10),
    timePerQuestion: timerMode === "total" ? 0 : sp.get("t") != null ? normalizeTime(sp.get("t"), 30) : 30,
    totalTime: timerMode === "total" ? clampInt(sp.get("tt"), MIN_TOTAL_TIME, MAX_TOTAL_TIME, 300) : 0,
    timerMode,
    difficulty: isDifficulty(sp.get("d")) ? (sp.get("d") as QuizConfig["difficulty"]) : "any",
    hints: clampInt(sp.get("h"), 0, 3, 3),
    fullscreen: sp.get("fs") === "1" ? true : sp.get("fs") === "0" ? false : false,
  };

  return <QuizRunner key={`${topic.id}-${mode}-${config.amount}-${config.timerMode}`} topic={topic} config={config} mode={mode} />;
}
