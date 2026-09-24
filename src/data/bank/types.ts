/**
 * Compact question format: [question, correctAnswer, wrongAnswers, hint, explanation?, difficulty?]
 * The correct answer is always written first; options are shuffled at runtime.
 * difficulty is optional and is one of: easy, medium, hard.
 */
export type Difficulty = "easy" | "medium" | "hard";
export type RawQ = [string, string, string[], string, string?, Difficulty?];

export interface ChapterData {
  id: string;
  no: number;
  title: string;
  section?: string;
  q: RawQ[];
}

export interface TopicData {
  id: string;
  title: string;
  description: string;
  q: RawQ[];
}
