export type SubjectId = "math" | "it" | "science" | "sst" | "custom";
export type SourceId = "bank" | "opentdb" | "triviaapi";
export type Difficulty = "any" | "easy" | "medium" | "hard";
export type ThemePref = "system" | "light" | "dark";
export type AnswerStatus = "correct" | "wrong" | "skipped" | "timeout";
export type QuizMode = "standard" | "mistakes";
export type TimerMode = "per-question" | "total";

/** A question as delivered to the quiz runner. */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint?: string;
  explanation?: string;
  type: "multiple" | "boolean";
  difficulty?: string;
  origin: SourceId;
}

/** A question as stored in an attempt for later review. */
export interface AttemptQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  status: AnswerStatus;
  hintUsed: boolean;
  timeTaken: number;
  points: number;
  hint?: string;
  explanation?: string;
  type: "multiple" | "boolean";
  origin: SourceId;
}

export interface UserSettings {
  source: SourceId;
  hintsPerQuiz: number;
  defaultQuestions: number;
  /** Seconds per question (timerMode "per-question"). 0 = no limit. */
  defaultTime: number;
  /** Seconds for the whole quiz (timerMode "total"). */
  defaultTotalTime: number;
  timerMode: TimerMode;
  defaultDifficulty: Difficulty;
  autoFullscreen: boolean;
}

/** Client-safe description of a quiz topic. */
export interface TopicInfo {
  id: string;
  subject: SubjectId;
  classLevel?: 9 | 10;
  section?: string;
  chapterNo?: number;
  title: string;
  label: string;
  kind: "chapter" | "class-all" | "topic" | "mixed" | "general";
  sources: SourceId[];
  /** Number of curated questions available, or null when generated on the fly. */
  bankCount: number | null;
  description?: string;
}

export interface QuizConfig {
  topicId: string;
  source: SourceId;
  amount: number;
  /** Seconds per question; 0 = no per-question limit (ignored in "total" mode). */
  timePerQuestion: number;
  /** Seconds for the entire quiz; 0 unless timerMode is "total". */
  totalTime: number;
  timerMode: TimerMode;
  difficulty: Difficulty;
  /** Hints available for this quiz (0–3). */
  hints: number;
  /** Try to enter full screen when the quiz starts. */
  fullscreen: boolean;
  /** Optional custom topic query/tag for online trivia. */
  customTopic?: string;
}

export interface GenerateResponse {
  topic: TopicInfo;
  questions: QuizQuestion[];
  sourceUsed: SourceId;
  notice?: string;
}
