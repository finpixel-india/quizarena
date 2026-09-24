/**
 * Compact question format: [question, correctAnswer, wrongAnswers, hint, explanation?]
 * The correct answer is always written first; options are shuffled at runtime.
 */
export type RawQ = [string, string, string[], string, string?];

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
