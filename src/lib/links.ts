import type { Difficulty, SourceId, TimerMode } from "./types";

export function quizHref(args: {
  topicId: string;
  amount: number;
  time: number;
  timerMode?: TimerMode | string;
  totalTime?: number;
  difficulty?: Difficulty | string;
  source?: SourceId | string;
  hints?: number;
  fullscreen?: boolean;
  customTopic?: string;
}): string {
  const timerMode = args.timerMode === "total" ? "total" : "per-question";
  const p = new URLSearchParams({
    topic: args.topicId,
    n: String(args.amount),
    t: String(args.time),
    tm: timerMode,
    d: args.difficulty ?? "any",
    src: args.source ?? "triviaapi",
  });
  if (timerMode === "total") p.set("tt", String(args.totalTime ?? 0));
  if (args.hints !== undefined) p.set("h", String(args.hints));
  if (args.fullscreen !== undefined) p.set("fs", args.fullscreen ? "1" : "0");
  if (args.customTopic) p.set("q", args.customTopic);
  return `/quiz?${p.toString()}`;
}

/** Open the one-step quiz builder on Home with a topic pre-selected. */
export function setupHref(topicId: string): string {
  return `/?topic=${encodeURIComponent(topicId)}#builder`;
}

export function localDateString(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
