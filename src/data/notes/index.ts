import { expandedMath } from "./expandedMath";
import { expandedScience } from "./expandedScience";
import { expandedSst } from "./expandedSst";
import { englishNotes9 } from "./english9";
import { englishNotes10 } from "./english10";
import { hindiNotes9 } from "./hindi9";
import { hindiNotes10 } from "./hindi10";
import { mathNotes9 } from "./math9";
import { mathNotes10 } from "./math10";
import { notes9 } from "./science9";
import { notes10 } from "./science10";
import { sstNotes9 } from "./sst9";
import { sstNotes10 } from "./sst10";
import { itNotes } from "./it";
import type { ChapterNote, ClassLevel, NoteSection, NotesSubjectId } from "./types";

export interface NoteChapter extends ChapterNote {
  subject: NotesSubjectId;
}

function deepen(notes: ChapterNote[], subject: NotesSubjectId, extra: Record<string, NoteSection[]> = {}): NoteChapter[] {
  return notes.map((note) => ({ ...note, subject, sections: [...note.sections, ...(extra[note.id] ?? [])] }));
}

const scienceNotes = deepen([...notes9, ...notes10], "science", expandedScience);
const sstNotes = deepen([...sstNotes9, ...sstNotes10], "sst", expandedSst);
const mathsNotes = deepen([...mathNotes9, ...mathNotes10], "math", expandedMath);
const englishNotes = deepen([...englishNotes9, ...englishNotes10], "english");
const hindiNotes = deepen([...hindiNotes9, ...hindiNotes10], "hindi");
const itNotesList = deepen(itNotes, "it");

export const ALL_NOTES: NoteChapter[] = [...scienceNotes, ...sstNotes, ...mathsNotes, ...englishNotes, ...hindiNotes, ...itNotesList];
export const SCIENCE_NOTES = scienceNotes;

export const NOTES_SUBJECTS: Array<{ id: NotesSubjectId; name: string; short: string; tagline: string; classes: number[] }> = [
  { id: "science", name: "Science", short: "Science", tagline: "Physics · Chemistry · Biology", classes: [9, 10] },
  { id: "sst", name: "Social Science", short: "SST", tagline: "History · Geography · Civics · Economics", classes: [9, 10] },
  { id: "math", name: "Mathematics", short: "Math", tagline: "Concepts · Theorems · Formulas", classes: [9, 10] },
  { id: "english", name: "English Grammar", short: "English", tagline: "Tenses · Clauses · Reported Speech", classes: [9, 10] },
  { id: "hindi", name: "Hindi Grammar", short: "Hindi", tagline: "व्याकरण · भाषा · वाक्य रचना", classes: [9, 10] },
  { id: "it", name: "Information Technology", short: "IT", tagline: "Computers · Networks · Coding · AI", classes: [9, 10] },
];

export function notesByClass(classLevel: ClassLevel, subject: NotesSubjectId = "science"): NoteChapter[] {
  return ALL_NOTES.filter((n) => n.classLevel === classLevel && n.subject === subject).sort((a, b) => a.chapterNo - b.chapterNo);
}

export function getChapterNote(id: string): NoteChapter | undefined {
  return ALL_NOTES.find((n) => n.id === id);
}

export function unitsFor(classLevel: ClassLevel, subject: NotesSubjectId = "science"): { unit: string; chapters: NoteChapter[] }[] {
  const out: { unit: string; chapters: NoteChapter[] }[] = [];
  for (const ch of notesByClass(classLevel, subject)) {
    const last = out[out.length - 1];
    if (last && last.unit === ch.unit) last.chapters.push(ch);
    else out.push({ unit: ch.unit, chapters: [ch] });
  }
  return out;
}

export function searchChapters(classLevel: ClassLevel, subject: NotesSubjectId, query: string): NoteChapter[] {
  const q = query.trim().toLowerCase();
  if (!q) return notesByClass(classLevel, subject);
  return notesByClass(classLevel, subject).filter((ch) => {
    const haystack = [
      ch.title,
      ch.overview,
      ch.unit,
      String(ch.chapterNo),
      ...ch.sections.map((s) => s.title),
      ...ch.sections.flatMap((s) => [...(s.points ?? []), ...(s.formula ?? [])]),
      ...ch.keyTerms.map((t) => `${t.term} ${t.meaning}`),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const NOTES_COUNTS = {
  science: scienceNotes.length,
  sst: sstNotes.length,
  math: mathsNotes.length,
  english: englishNotes.length,
  hindi: hindiNotes.length,
  it: itNotesList.length,
  class9: ALL_NOTES.filter((n) => n.classLevel === 9).length,
  class10: ALL_NOTES.filter((n) => n.classLevel === 10).length,
  sections: ALL_NOTES.reduce((s, c) => s + c.sections.length, 0),
  diagrams: scienceNotes.filter((c) => c.diagram).length,
  chapters: ALL_NOTES.length,
};

export type { ChapterNote, ClassLevel, NotesSubjectId };
