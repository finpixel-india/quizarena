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

const CATEGORY_MAP: Record<string, string> = {
  science: "science",
  physics: "science",
  chemistry: "science",
  biology: "science",
  nature: "science",
  astronomy: "science",
  space: "science",
  history: "history",
  war: "history",
  geography: "geography",
  countries: "geography",
  capitals: "geography",
  music: "music",
  songs: "music",
  film: "film_and_tv",
  movie: "film_and_tv",
  movies: "film_and_tv",
  cinema: "film_and_tv",
  tv: "film_and_tv",
  art: "arts_and_literature",
  arts: "arts_and_literature",
  literature: "arts_and_literature",
  books: "arts_and_literature",
  sport: "sport_and_leisure",
  sports: "sport_and_leisure",
  games: "sport_and_leisure",
  cricket: "sport_and_leisure",
  football: "sport_and_leisure",
  soccer: "sport_and_leisure",
  olympics: "sport_and_leisure",
  food: "food_and_drink",
  drink: "food_and_drink",
  cooking: "food_and_drink",
  society: "society_and_culture",
  culture: "society_and_culture",
  politics: "society_and_culture",
  gk: "general_knowledge",
  general: "general_knowledge",
};

export async function fetchTriviaApi(
  ref: { categories?: string; tags?: string; customTopic?: string },
  amount: number,
  difficulty: Difficulty,
): Promise<QuizQuestion[]> {
  const limit = Math.min(50, Math.max(1, amount));
  let tags = ref.tags;
  let categories = ref.categories;

  if (ref.customTopic) {
    const raw = ref.customTopic.trim().toLowerCase();
    const cleanTag = raw.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

    const words = raw.split(/[\s,]+/);
    for (const w of words) {
      if (CATEGORY_MAP[w]) {
        categories = CATEGORY_MAP[w];
        break;
      }
    }
    tags = cleanTag || tags;
  }

  const parseItems = (data: unknown): QuizQuestion[] => {
    if (!Array.isArray(data)) return [];
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
  };

  const attempt = async (t?: string, c?: string) => {
    const params = new URLSearchParams({ limit: String(limit), types: "text_choice" });
    if (c) params.set("categories", c);
    if (t) params.set("tags", t);
    if (difficulty !== "any") params.set("difficulties", difficulty);
    try {
      const data = await fetchJson(`https://the-trivia-api.com/v2/questions?${params.toString()}`);
      return parseItems(data);
    } catch {
      return [];
    }
  };

  let results = await attempt(tags, categories);

  if (results.length === 0 && tags) {
    if (categories) {
      results = await attempt(undefined, categories);
    }
  }

  if (results.length === 0) {
    results = await attempt(undefined, "general_knowledge");
  }

  return results;
}
