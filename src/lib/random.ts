import type { QuizQuestion, SourceId } from "./types";

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let counter = 0;
export function uid(prefix = "q"): string {
  counter = (counter + 1) % 1_000_000;
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Build a quiz question with shuffled options from a correct answer + distractors. */
export function buildQuestion(args: {
  id?: string;
  question: string;
  correct: string;
  wrong: string[];
  hint?: string;
  explanation?: string;
  difficulty?: string;
  origin: SourceId;
  type?: "multiple" | "boolean";
  keepOrder?: boolean;
}): QuizQuestion {
  const uniqueWrong = Array.from(new Set(args.wrong.filter((w) => w.trim() && w.trim() !== args.correct.trim())));
  const all = [args.correct, ...uniqueWrong];
  const options = args.keepOrder ? all : shuffle(all);
  return {
    id: args.id ?? uid(),
    question: args.question,
    options,
    correctIndex: options.indexOf(args.correct),
    hint: args.hint,
    explanation: args.explanation,
    difficulty: args.difficulty,
    type: args.type ?? (options.length === 2 ? "boolean" : "multiple"),
    origin: args.origin,
  };
}
