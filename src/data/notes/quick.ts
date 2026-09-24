import type { ChapterNote, ClassLevel, NotesSubjectId } from "./types";

export interface QuickNoteInput {
  id: string;
  subject: NotesSubjectId;
  classLevel: ClassLevel;
  chapterNo: number;
  title: string;
  unit: string;
  overview: string;
  ideas: string[];
  focus?: string[];
  formulas?: string[];
  examples?: string[];
  terms: Array<[string, string]>;
  tips: string[];
}

/** Shared chapter template for revision notes and language grammar guides. */
export function quickNote(input: QuickNoteInput): ChapterNote {
  return {
    id: input.id,
    subject: input.subject,
    classLevel: input.classLevel,
    chapterNo: input.chapterNo,
    title: input.title,
    unit: input.unit,
    overview: input.overview,
    sections: [
      { title: "Core ideas", points: input.ideas },
      ...(input.focus?.length ? [{ title: "What to remember", points: input.focus }] : []),
      ...(input.examples?.length ? [{ title: "Worked examples", points: input.examples }] : []),
      ...(input.formulas?.length ? [{ title: "Formulas & facts", formula: input.formulas }] : []),
    ],
    keyTerms: input.terms.map(([term, meaning]) => ({ term, meaning })),
    examTips: input.tips,
  };
}
