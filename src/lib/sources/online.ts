import { buildQuestion } from "../random";
import type { Difficulty, QuizQuestion } from "../types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url: string, timeoutMs = 8000): Promise<unknown> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      cache: "no-store",
      headers: { accept: "application/json", "user-agent": "QuizLab/1.0 (educational quiz app)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error("request timed out");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------ Open Trivia DB ------------------------------ */

interface OtdbCounts {
  any: number;
  easy: number;
  medium: number;
  hard: number;
}

const countCache = new Map<number, { at: number; counts: OtdbCounts }>();
let lastOtdbCall = 0;

async function getOtdbCounts(category: number): Promise<OtdbCounts | null> {
  const hit = countCache.get(category);
  if (hit && Date.now() - hit.at < 6 * 3600 * 1000) return hit.counts;
  try {
    const data = (await fetchJson(`https://opentdb.com/api_count.php?category=${category}`, 5000)) as {
      category_question_count?: Record<string, number>;
    };
    const c = data.category_question_count;
    if (!c) return null;
    const counts: OtdbCounts = {
      any: c.total_question_count ?? 0,
      easy: c.total_easy_question_count ?? 0,
      medium: c.total_medium_question_count ?? 0,
      hard: c.total_hard_question_count ?? 0,
    };
    countCache.set(category, { at: Date.now(), counts });
    return counts;
  } catch {
    return null;
  }
}

interface OtdbResult {
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function dec(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export async function fetchOpenTdb(category: number, amount: number, difficulty: Difficulty): Promise<QuizQuestion[]> {
  const counts = await getOtdbCounts(category);
  const available = counts ? counts[difficulty] : amount;
  const n = Math.max(1, Math.min(50, amount, available || amount));

  const params = new URLSearchParams({ amount: String(n), category: String(category), encode: "url3986" });
  if (difficulty !== "any") params.set("difficulty", difficulty);
  const url = `https://opentdb.com/api.php?${params.toString()}`;

  // Open Trivia DB allows one request per IP every 5 seconds.
  const wait = lastOtdbCall + 5100 - Date.now();
  if (wait > 0) await sleep(wait);
  lastOtdbCall = Date.now();

  let data = (await fetchJson(url)) as { response_code?: number; results?: OtdbResult[] };
  if (data.response_code === 5) {
    await sleep(5100);
    lastOtdbCall = Date.now();
    data = (await fetchJson(url)) as { response_code?: number; results?: OtdbResult[] };
  }
  if (data.response_code !== 0 || !Array.isArray(data.results)) {
    const reason =
      data.response_code === 1 ? "not enough questions for this selection" : data.response_code === 5 ? "rate limited" : `response code ${data.response_code}`;
    throw new Error(reason);
  }

  return data.results.map((r, i) => {
    const boolean = r.type === "boolean";
    const correct = dec(r.correct_answer);
    const wrong = r.incorrect_answers.map(dec);
    return buildQuestion({
      id: `otdb-${category}-${Date.now().toString(36)}-${i}`,
      question: dec(r.question),
      correct,
      wrong,
      difficulty: r.difficulty,
      origin: "opentdb",
      type: boolean ? "boolean" : "multiple",
      ...(boolean ? { keepOrder: false } : {}),
    });
  }).map((q) => (q.type === "boolean" ? orderTrueFalse(q) : q));
}

function orderTrueFalse(q: QuizQuestion): QuizQuestion {
  const correct = q.options[q.correctIndex];
  const options = ["True", "False"].filter((o) => q.options.includes(o));
  if (options.length !== 2) return q;
  return { ...q, options, correctIndex: options.indexOf(correct) };
}

/* ------------------------------- The Trivia API ------------------------------ */

interface TtaItem {
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: { text: string };
  difficulty?: string;
}

export async function fetchTriviaApi(
  ref: { categories?: string; tags?: string },
  amount: number,
  difficulty: Difficulty,
): Promise<QuizQuestion[]> {
  const params = new URLSearchParams({ limit: String(Math.min(50, Math.max(1, amount))), types: "text_choice" });
  if (ref.categories) params.set("categories", ref.categories);
  if (ref.tags) params.set("tags", ref.tags);
  if (difficulty !== "any") params.set("difficulties", difficulty);

  const data = await fetchJson(`https://the-trivia-api.com/v2/questions?${params.toString()}`);
  if (!Array.isArray(data)) throw new Error("unexpected response");

  return (data as TtaItem[])
    .filter((item) => item?.question?.text && item.correctAnswer && Array.isArray(item.incorrectAnswers))
    .map((item) =>
      buildQuestion({
        id: `tta-${item.id}`,
        question: item.question.text.trim(),
        correct: item.correctAnswer.trim(),
        wrong: item.incorrectAnswers.map((s) => s.trim()),
        difficulty: item.difficulty,
        origin: "triviaapi",
      }),
    );
}
