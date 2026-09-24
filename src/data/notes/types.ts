import type { ReactNode } from "react";

export type ClassLevel = 9 | 10;
export type NotesSubjectId = "science" | "sst" | "math" | "english" | "hindi";

export interface NoteTable {
  head: string[];
  rows: string[][];
}

export interface NoteSection {
  title: string;
  /** Bullet points. Wrap words in **double asterisks** for emphasis. */
  points?: string[];
  table?: NoteTable;
  /** Monospace formulas / equations, one per line. */
  formula?: string[];
  /** Highlighted "remember this" line. */
  tip?: string;
}

export interface KeyTerm {
  term: string;
  meaning: string;
}

export interface ChapterNote {
  id: string;
  /** Subject is optional for backwards compatibility with the original Science notes. */
  subject?: NotesSubjectId;
  classLevel: ClassLevel;
  chapterNo: number;
  title: string;
  unit: string;
  overview: string;
  diagram?: string;
  sections: NoteSection[];
  keyTerms: KeyTerm[];
  examTips: string[];
}

export interface DiagramEntry {
  id: string;
  title: string;
  caption: string;
  /** Parts shown in the figure, displayed as labeled callouts under the diagram. */
  labels: string[];
  Svg: () => ReactNode;
}
