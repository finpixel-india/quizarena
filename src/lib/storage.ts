"use client";

import { pointsFor, maxScoreFor } from "./scoring";
import { DEFAULT_SETTINGS, normalizeSettings, clampInt, isDifficulty, isSource, normalizeTime } from "./settings";
import type { AttemptQuestion, Difficulty, QuizMode, SourceId, TimerMode, UserSettings } from "./types";

export const ATTEMPTS_KEY = "ql-attempts-v1";
export const SETTINGS_KEY = "ql-settings-v1";
export const STORAGE_EVENT = "ql-storage";

export interface StoredAttempt {
  id: string;
  topicId: string;
  topicLabel: string;
  subject: string;
  classLevel: number | null;
  source: SourceId | string;
  difficulty: Difficulty | string;
  mode: QuizMode | string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  score: number;
  maxScore: number;
  accuracy: number;
  timePerQuestion: number;
  timerMode: TimerMode | string;
  totalTime: number;
  hintsUsed: number;
  durationSeconds: number;
  localDate: string | null;
  createdAt: string; // ISO
  questions: AttemptQuestion[];
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function notify() {
  try {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    /* ignore */
  }
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notify();
  } catch {
    /* quota / private mode — ignore */
  }
}

export function loadSettings(): UserSettings {
  return normalizeSettings(readJson<Partial<UserSettings>>(SETTINGS_KEY, {}));
}

export function saveSettings(settings: UserSettings): UserSettings {
  const next = normalizeSettings(settings);
  writeJson(SETTINGS_KEY, next);
  return next;
}

export function loadAttempts(): StoredAttempt[] {
  const rows = readJson<StoredAttempt[]>(ATTEMPTS_KEY, []);
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r) => r && typeof r.id === "string" && Array.isArray(r.questions))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getAttempt(id: string): StoredAttempt | null {
  return loadAttempts().find((a) => a.id === id) ?? null;
}

export function deleteAttempt(id: string): boolean {
  const next = loadAttempts().filter((a) => a.id !== id);
  if (next.length === loadAttempts().length) return false;
  writeJson(ATTEMPTS_KEY, next);
  return true;
}

export function clearAttempts(): void {
  writeJson(ATTEMPTS_KEY, []);
}

export interface SaveAttemptInput {
  topicId: string;
  topicLabel: string;
  subject: string;
  classLevel?: number | null;
  source: string;
  difficulty: string;
  mode?: string;
  timePerQuestion?: number;
  timerMode?: string;
  totalTime?: number;
  localDate?: string | null;
  durationSeconds?: number;
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    status?: string;
    hintUsed?: boolean;
    timeTaken?: number;
    hint?: string;
    explanation?: string;
    type?: "multiple" | "boolean";
    origin?: string;
  }>;
}

function sanitizeQuestion(raw: SaveAttemptInput["questions"][number], timeLimit: number): AttemptQuestion | null {
  if (!raw || typeof raw.question !== "string" || !Array.isArray(raw.options)) return null;
  const options = raw.options.slice(0, 6).map((o) => (typeof o === "string" ? o.slice(0, 400) : String(o)));
  if (options.length < 2) return null;
  const correctIndex = clampInt(raw.correctIndex, 0, options.length - 1, 0);
  const sel =
    typeof raw.selectedIndex === "number" && Number.isInteger(raw.selectedIndex) && raw.selectedIndex >= 0 && raw.selectedIndex < options.length
      ? raw.selectedIndex
      : null;
  const hintUsed = raw.hintUsed === true;
  const timeTaken = Math.min(3600, Math.max(0, typeof raw.timeTaken === "number" && Number.isFinite(raw.timeTaken) ? Math.round(raw.timeTaken * 10) / 10 : 0));
  let status: AttemptQuestion["status"];
  if (sel === null) status = raw.status === "timeout" ? "timeout" : "skipped";
  else status = sel === correctIndex ? "correct" : "wrong";
  return {
    question: raw.question.slice(0, 1200),
    options,
    correctIndex,
    selectedIndex: sel,
    status,
    hintUsed,
    timeTaken,
    points: pointsFor(status === "correct", hintUsed, timeTaken, timeLimit),
    hint: typeof raw.hint === "string" ? raw.hint.slice(0, 1000) : undefined,
    explanation: typeof raw.explanation === "string" ? raw.explanation.slice(0, 1500) : undefined,
    type: raw.type === "boolean" ? "boolean" : "multiple",
    origin: isSource(raw.origin) ? raw.origin : "bank",
  };
}

export function saveAttempt(input: SaveAttemptInput): StoredAttempt {
  const timerMode: TimerMode = input.timerMode === "total" ? "total" : "per-question";
  const timePerQuestion = timerMode === "total" ? 0 : normalizeTime(input.timePerQuestion ?? 0, 0);
  const totalTime = timerMode === "total" ? clampInt(input.totalTime ?? 0, 0, 7200, 0) : 0;
  const questions = (input.questions ?? []).slice(0, 50).map((q) => sanitizeQuestion(q, timePerQuestion)).filter((q): q is AttemptQuestion => q !== null);
  if (!questions.length) throw new Error("No answers to save.");

  const correctCount = questions.filter((q) => q.status === "correct").length;
  const wrongCount = questions.filter((q) => q.status === "wrong").length;
  const skippedCount = questions.length - correctCount - wrongCount;
  const score = questions.reduce((s, q) => s + q.points, 0);
  const attempt: StoredAttempt = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    topicId: String(input.topicId).slice(0, 80),
    topicLabel: String(input.topicLabel || input.topicId).slice(0, 200),
    subject: String(input.subject || "science").slice(0, 40),
    classLevel: typeof input.classLevel === "number" ? input.classLevel : null,
    source: isSource(input.source) ? input.source : "bank",
    difficulty: isDifficulty(input.difficulty) ? input.difficulty : "any",
    mode: input.mode === "mistakes" ? "mistakes" : "standard",
    totalQuestions: questions.length,
    correctCount,
    wrongCount,
    skippedCount,
    score,
    maxScore: maxScoreFor(questions.length, timePerQuestion),
    accuracy: Math.round((correctCount / questions.length) * 100),
    timePerQuestion,
    timerMode,
    totalTime,
    hintsUsed: questions.filter((q) => q.hintUsed).length,
    durationSeconds: clampInt(input.durationSeconds ?? 0, 0, 24 * 3600, 0),
    localDate: typeof input.localDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.localDate) ? input.localDate : null,
    createdAt: new Date().toISOString(),
    questions,
  };

  const rows = loadAttempts();
  rows.unshift(attempt);
  writeJson(ATTEMPTS_KEY, rows.slice(0, 500));
  return attempt;
}

export { DEFAULT_SETTINGS };
