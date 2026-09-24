import type { SubjectId } from "./types";
import type { StoredAttempt } from "./storage";

export interface AttemptSummary {
  id: string;
  topicId: string;
  topicLabel: string;
  subject: string;
  classLevel: number | null;
  source: string;
  difficulty: string;
  mode: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  score: number;
  maxScore: number;
  accuracy: number;
  timePerQuestion: number;
  timerMode: string;
  totalTime: number;
  hintsUsed: number;
  durationSeconds: number;
  localDate: string | null;
  createdAt: Date;
}

export type AttemptDetail = AttemptSummary & {
  questions: StoredAttempt["questions"];
};

export function toSummary(a: StoredAttempt): AttemptSummary {
  return {
    id: a.id,
    topicId: a.topicId,
    topicLabel: a.topicLabel,
    subject: a.subject,
    classLevel: a.classLevel,
    source: a.source,
    difficulty: a.difficulty,
    mode: a.mode,
    totalQuestions: a.totalQuestions,
    correctCount: a.correctCount,
    wrongCount: a.wrongCount,
    skippedCount: a.skippedCount,
    score: a.score,
    maxScore: a.maxScore,
    accuracy: a.accuracy,
    timePerQuestion: a.timePerQuestion,
    timerMode: a.timerMode,
    totalTime: a.totalTime,
    hintsUsed: a.hintsUsed,
    durationSeconds: a.durationSeconds,
    localDate: a.localDate,
    createdAt: new Date(a.createdAt),
  };
}

export function toDetail(a: StoredAttempt): AttemptDetail {
  return { ...toSummary(a), questions: a.questions };
}

export interface TopicStat {
  topicId: string;
  label: string;
  subject: string;
  quizzes: number;
  questions: number;
  correct: number;
  accuracy: number;
  bestScore: number;
  bestAttemptId: string;
  lastPlayed: Date;
}

export interface SubjectStat {
  subject: SubjectId;
  quizzes: number;
  questions: number;
  correct: number;
  accuracy: number;
  bestScore: number;
}

export interface UserStats {
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrect: number;
  accuracy: number;
  totalTime: number;
  hintsUsed: number;
  highestScore: AttemptSummary | null;
  bestAccuracy: AttemptSummary | null;
  currentStreak: number;
  bestStreak: number;
  subjects: SubjectStat[];
  topics: TopicStat[];
  bestNiche: TopicStat | null;
  weakest: TopicStat | null;
  trend: AttemptSummary[];
  topScores: AttemptSummary[];
}

const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

function dayNumber(dateStr: string): number {
  return Math.floor(Date.parse(`${dateStr}T00:00:00Z`) / 86400000);
}

function computeStreaks(rows: AttemptSummary[]): { current: number; best: number } {
  const days = Array.from(
    new Set(rows.map((r) => dayNumber(r.localDate && /^\d{4}-\d{2}-\d{2}$/.test(r.localDate) ? r.localDate : r.createdAt.toISOString().slice(0, 10)))),
  ).sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of days) {
    run = prev !== null && d - prev === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  const today = Math.floor(Date.now() / 86400000);
  const current = prev !== null && today - prev <= 1 ? run : 0;
  return { current, best };
}

export function computeStats(rows: AttemptSummary[]): UserStats {
  const totalQuestions = rows.reduce((s, r) => s + r.totalQuestions, 0);
  const totalCorrect = rows.reduce((s, r) => s + r.correctCount, 0);

  const topicMap = new Map<string, TopicStat>();
  const subjectMap = new Map<string, SubjectStat>();
  for (const r of rows) {
    const t = topicMap.get(r.topicId);
    if (!t) {
      topicMap.set(r.topicId, {
        topicId: r.topicId,
        label: r.topicLabel,
        subject: r.subject,
        quizzes: 1,
        questions: r.totalQuestions,
        correct: r.correctCount,
        accuracy: 0,
        bestScore: r.score,
        bestAttemptId: r.id,
        lastPlayed: r.createdAt,
      });
    } else {
      t.quizzes++;
      t.questions += r.totalQuestions;
      t.correct += r.correctCount;
      if (r.score > t.bestScore) {
        t.bestScore = r.score;
        t.bestAttemptId = r.id;
      }
      if (r.createdAt > t.lastPlayed) t.lastPlayed = r.createdAt;
    }
    const s = subjectMap.get(r.subject);
    if (!s) {
      subjectMap.set(r.subject, {
        subject: r.subject as SubjectId,
        quizzes: 1,
        questions: r.totalQuestions,
        correct: r.correctCount,
        accuracy: 0,
        bestScore: r.score,
      });
    } else {
      s.quizzes++;
      s.questions += r.totalQuestions;
      s.correct += r.correctCount;
      s.bestScore = Math.max(s.bestScore, r.score);
    }
  }

  const topics = Array.from(topicMap.values()).map((t) => ({ ...t, accuracy: pct(t.correct, t.questions) }));
  topics.sort((a, b) => b.accuracy - a.accuracy || b.questions - a.questions);
  const subjects = Array.from(subjectMap.values()).map((s) => ({ ...s, accuracy: pct(s.correct, s.questions) }));
  subjects.sort((a, b) => b.accuracy - a.accuracy);

  const qualified = topics.filter((t) => t.questions >= 5);
  const pool = qualified.length ? qualified : topics;
  const bestNiche = pool[0] ?? null;
  const weakCandidates = pool.filter((t) => t.topicId !== bestNiche?.topicId);
  const weakest = weakCandidates.length ? weakCandidates.reduce((w, t) => (t.accuracy < w.accuracy ? t : w)) : null;

  const highestScore = rows.reduce<AttemptSummary | null>((best, r) => (!best || r.score > best.score ? r : best), null);
  const bestAccuracy = rows
    .filter((r) => r.totalQuestions >= 5)
    .reduce<AttemptSummary | null>(
      (best, r) => (!best || r.accuracy > best.accuracy || (r.accuracy === best.accuracy && r.totalQuestions > best.totalQuestions) ? r : best),
      null,
    );

  const { current, best } = computeStreaks(rows);

  return {
    totalQuizzes: rows.length,
    totalQuestions,
    totalCorrect,
    accuracy: pct(totalCorrect, totalQuestions),
    totalTime: rows.reduce((s, r) => s + r.durationSeconds, 0),
    hintsUsed: rows.reduce((s, r) => s + r.hintsUsed, 0),
    highestScore,
    bestAccuracy,
    currentStreak: current,
    bestStreak: best,
    subjects,
    topics,
    bestNiche,
    weakest: weakest && bestNiche && weakest.accuracy < bestNiche.accuracy ? weakest : null,
    trend: rows.slice(0, 12).reverse(),
    topScores: [...rows].sort((a, b) => b.score - a.score || b.accuracy - a.accuracy).slice(0, 10),
  };
}
