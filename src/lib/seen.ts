import { hashText } from "./hash";
import type { QuizQuestion } from "./types";

/**
 * Client-side memory of questions already shown for each topic,
 * so new quizzes prefer questions the learner hasn't seen yet.
 */
const KEY = "ql-seen";
const CAP_PER_TOPIC = 400;
const SEND_LIMIT = 150;

type SeenMap = Record<string, string[]>;

function read(): SeenMap {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as SeenMap) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(map: SeenMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore quota errors */
  }
}

/** Recently seen question hashes for a topic (newest first, capped). */
export function seenHashes(topicId: string, limit = SEND_LIMIT): string[] {
  return (read()[topicId] ?? []).slice(0, limit);
}

/** Remember questions once a quiz has actually been played. */
export function rememberQuestions(topicId: string, questions: QuizQuestion[]) {
  const map = read();
  const existing = map[topicId] ?? [];
  const set = new Set(existing);
  for (const q of questions) {
    const h = hashText(q.question);
    if (!set.has(h)) {
      set.add(h);
      existing.unshift(h);
    }
  }
  map[topicId] = existing.slice(0, CAP_PER_TOPIC);
  write(map);
}

/** Prefer questions not yet seen (for sources we can't exclude server-side). */
export function unseenFirst(topicId: string, questions: QuizQuestion[]): QuizQuestion[] {
  const seen = new Set(read()[topicId] ?? []);
  const fresh: QuizQuestion[] = [];
  const stale: QuizQuestion[] = [];
  for (const q of questions) (seen.has(hashText(q.question)) ? stale : fresh).push(q);
  return [...fresh, ...stale];
}
