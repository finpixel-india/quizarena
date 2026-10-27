import type { AppFontFamily, AppFontSize, Difficulty, SourceId, TimerMode, TTSVoiceId, UserSettings } from "./types";

export const DEFAULT_SETTINGS: UserSettings = {
  source: "bank",
  hintsPerQuiz: 3,
  defaultQuestions: 10,
  defaultTime: 30,
  defaultTotalTime: 300,
  timerMode: "per-question",
  defaultDifficulty: "any",
  autoFullscreen: false,
  notificationsEnabled: true,
  notificationHour: 19,
  notificationMinute: 30,
  appFont: "geist",
  appFontSize: "default",
  ttsVoice: "cute",
};

export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 50;
export const MIN_TIME = 5;
export const MAX_TIME = 300;

export const QUESTION_PRESETS = [5, 10, 15, 20, 25, 30];
export const TIME_PRESETS = [0, 15, 30, 45, 60, 90];
/** Whole-quiz time presets, in seconds. */
export const TOTAL_TIME_PRESETS = [180, 300, 600, 900, 1200, 1800];
export const MIN_TOTAL_TIME = 60;
export const MAX_TOTAL_TIME = 7200;

export const SOURCE_META: Record<SourceId, { name: string; short: string; description: string; url?: string }> = {
  bank: {
    name: "QuizLab Curated Bank",
    short: "Curated Bank",
    description:
      "Hand-checked, NCERT-aligned questions for Class 9 & 10 plus IT and a smart math generator. Works instantly, even offline.",
  },
  opentdb: {
    name: "Open Trivia DB",
    short: "Open Trivia DB",
    description: "Community-verified trivia database (opentdb.com, CC BY-SA 4.0). Great for general science, computers, math and history.",
    url: "https://opentdb.com",
  },
  triviaapi: {
    name: "The Trivia API",
    short: "The Trivia API",
    description: "Large, reviewed trivia collection (the-trivia-api.com) with thousands of science, history and technology questions.",
    url: "https://the-trivia-api.com",
  },
};

const SOURCES: SourceId[] = ["bank", "opentdb", "triviaapi"];
const DIFFICULTIES: Difficulty[] = ["any", "easy", "medium", "hard"];
const TIMER_MODES: TimerMode[] = ["per-question", "total"];

export function isTimerMode(v: unknown): v is TimerMode {
  return typeof v === "string" && (TIMER_MODES as string[]).includes(v);
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function isSource(v: unknown): v is SourceId {
  return typeof v === "string" && (SOURCES as string[]).includes(v);
}

export function isDifficulty(v: unknown): v is Difficulty {
  return typeof v === "string" && (DIFFICULTIES as string[]).includes(v);
}

/** Time per question: 0 means "no limit", otherwise clamp to MIN_TIME..MAX_TIME */
export function normalizeTime(value: unknown, fallback = DEFAULT_SETTINGS.defaultTime): number {
  const n = clampInt(value, 0, MAX_TIME, fallback);
  if (n === 0) return 0;
  return Math.max(MIN_TIME, n);
}

export const APP_FONTS: Array<{
  id: AppFontFamily;
  name: string;
  tag: string;
  subtitle: string;
  sample: string;
}> = [
  {
    id: "geist",
    name: "Geist Sans",
    tag: "Modern",
    subtitle: "Clean, high-precision contemporary digital sans",
    sample: "Quantum physics & atomic structures · 120/80 mmHg",
  },
  {
    id: "system",
    name: "System UI",
    tag: "Native",
    subtitle: "Native smartphone & operating system typeface",
    sample: "Quantum physics & atomic structures · 120/80 mmHg",
  },
  {
    id: "serif",
    name: "Newsreader",
    tag: "Editorial",
    subtitle: "Elegant, bookish literary serif for study notes",
    sample: "Quantum physics & atomic structures · 120/80 mmHg",
  },
  {
    id: "mono",
    name: "Geist Mono",
    tag: "Code / Math",
    subtitle: "Fixed-width terminal style for STEM & formulas",
    sample: "Quantum physics & atomic structures · 120/80 mmHg",
  },
  {
    id: "rounded",
    name: "Soft Rounded",
    tag: "Friendly",
    subtitle: "Gentle curved sans that is easy on the eyes",
    sample: "Quantum physics & atomic structures · 120/80 mmHg",
  },
];

export const APP_FONT_SIZES: Array<{
  id: AppFontSize;
  label: string;
  pct: string;
  subtitle: string;
}> = [
  { id: "small", label: "Compact", pct: "90%", subtitle: "Fits more questions & notes per screen" },
  { id: "default", label: "Default", pct: "100%", subtitle: "Standard balanced size across devices" },
  { id: "large", label: "Large", pct: "112%", subtitle: "Comfortable reading with relaxed spacing" },
  { id: "xlarge", label: "Extra Large", pct: "125%", subtitle: "Maximum visibility & high legibility" },
];

export function isAppFont(v: unknown): v is AppFontFamily {
  return typeof v === "string" && ["geist", "system", "serif", "mono", "rounded"].includes(v);
}

export function isAppFontSize(v: unknown): v is AppFontSize {
  return typeof v === "string" && ["small", "default", "large", "xlarge"].includes(v);
}

export const TTS_VOICE_IDS: TTSVoiceId[] = [
  "cute",
  "storyteller",
  "professor",
  "mentor",
  "mystic",
  "radio",
];

export interface TTSVoiceProfile {
  id: TTSVoiceId;
  name: string;
  tag: string;
  gender: "female" | "male" | "narrator";
  genderBadge: string;
  avatar: string;
  subtitle: string;
  description: string;
  sample: string;
  pitch: number;
  rate: number;
}

export const TTS_VOICE_PROFILES: TTSVoiceProfile[] = [
  {
    id: "cute",
    name: "Sweet & Natural",
    tag: "Default",
    gender: "female",
    genderBadge: "♀ Female",
    avatar: "🌸",
    subtitle: "Sweet, friendly, and natural companion tone without distortion",
    description: "The classic voice of Quiz Arena. Natural, sweet, and soothing for comfortable study.",
    sample: "Welcome to Quiz Arena! Let's explore science, history, and the wonders of the universe together.",
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: "storyteller",
    name: "Epic Storyteller",
    tag: "Storyteller",
    gender: "narrator",
    genderBadge: "🎙️ Storyteller",
    avatar: "📜",
    subtitle: "Deep, rich, cinematic cadence like an audiobook narrator",
    description: "A captivating, dramatic narrator that brings historical chronicles and science discoveries to life.",
    sample: "Deep beneath the crushed trenches of the ocean, strange bioluminescent leviathans drift through the perpetual dark.",
    pitch: 0.90,
    rate: 0.90,
  },
  {
    id: "professor",
    name: "Scholarly Professor",
    tag: "Academic",
    gender: "male",
    genderBadge: "♂ Male",
    avatar: "🎓",
    subtitle: "Authoritative baritone with razor-sharp STEM clarity",
    description: "Steady, confident academic cadence suited for formulas, physics principles, and complex questions.",
    sample: "Notice that according to Faraday's law, a changing magnetic flux induces an electromotive force within the closed conductor.",
    pitch: 0.98,
    rate: 0.98,
  },
  {
    id: "mentor",
    name: "Warm Mentor",
    tag: "Encouraging",
    gender: "female",
    genderBadge: "♀ Female",
    avatar: "✨",
    subtitle: "Calm, patient, reassuring guidance for deep focus",
    description: "Gentle and supportive tone that keeps you relaxed, composed, and confident during difficult study sessions.",
    sample: "Take a deep breath. Break the problem into smaller parts, and you will find the correct solution.",
    pitch: 1.0,
    rate: 0.95,
  },
  {
    id: "mystic",
    name: "Mystic Lore Master",
    tag: "Enigmatic",
    gender: "narrator",
    genderBadge: "🔮 Storyteller",
    avatar: "🌌",
    subtitle: "Intriguing, mysterious wonder with atmospheric pauses",
    description: "An enigmatic narrator that makes encyclopedic facts, cosmic anomalies, and unsolved mysteries sound thrilling.",
    sample: "In the quiet desert of New Mexico, a phantom hum echoes from nowhere, defying all modern scientific instruments.",
    pitch: 0.92,
    rate: 0.88,
  },
  {
    id: "radio",
    name: "Energetic Quizmaster",
    tag: "Lively",
    gender: "male",
    genderBadge: "⚡ Male",
    avatar: "🎯",
    subtitle: "Upbeat, punchy broadcast style with high energy",
    description: "Dynamic game show host persona that boosts momentum and competitive adrenaline in timed quizzes.",
    sample: "Ready for your next round? Think fast, trust your instincts, and climb to the top of the leaderboard!",
    pitch: 1.0,
    rate: 1.05,
  },
];

export function isTTSVoice(v: unknown): v is TTSVoiceId {
  return typeof v === "string" && (TTS_VOICE_IDS as string[]).includes(v);
}

export function normalizeSettings(input: unknown): UserSettings {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const total = clampInt(raw.defaultTotalTime, MIN_TOTAL_TIME, MAX_TOTAL_TIME, DEFAULT_SETTINGS.defaultTotalTime);
  return {
    source: isSource(raw.source) ? raw.source : DEFAULT_SETTINGS.source,
    hintsPerQuiz: clampInt(raw.hintsPerQuiz, 0, 3, DEFAULT_SETTINGS.hintsPerQuiz),
    defaultQuestions: clampInt(raw.defaultQuestions, MIN_QUESTIONS, MAX_QUESTIONS, DEFAULT_SETTINGS.defaultQuestions),
    defaultTime: normalizeTime(raw.defaultTime),
    defaultTotalTime: total,
    timerMode: isTimerMode(raw.timerMode) ? raw.timerMode : DEFAULT_SETTINGS.timerMode,
    defaultDifficulty: isDifficulty(raw.defaultDifficulty) ? raw.defaultDifficulty : DEFAULT_SETTINGS.defaultDifficulty,
    autoFullscreen: typeof raw.autoFullscreen === "boolean" ? raw.autoFullscreen : DEFAULT_SETTINGS.autoFullscreen,
    notificationsEnabled: typeof raw.notificationsEnabled === "boolean" ? raw.notificationsEnabled : DEFAULT_SETTINGS.notificationsEnabled,
    notificationHour: clampInt(raw.notificationHour, 0, 23, DEFAULT_SETTINGS.notificationHour),
    notificationMinute: clampInt(raw.notificationMinute, 0, 59, DEFAULT_SETTINGS.notificationMinute),
    appFont: isAppFont(raw.appFont) ? raw.appFont : DEFAULT_SETTINGS.appFont,
    appFontSize: isAppFontSize(raw.appFontSize) ? raw.appFontSize : DEFAULT_SETTINGS.appFontSize,
    ttsVoice: isTTSVoice(raw.ttsVoice) ? raw.ttsVoice : DEFAULT_SETTINGS.ttsVoice,
  };
}

export { clampInt };
