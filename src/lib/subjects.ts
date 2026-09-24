import type { SubjectId } from "./types";

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  short: string;
  tagline: string;
  hasClasses: boolean;
}

export const SUBJECTS: SubjectMeta[] = [
  { id: "science", name: "Science", short: "Science", tagline: "Physics, Chemistry & Biology", hasClasses: true },
  { id: "sst", name: "Social Studies", short: "SST", tagline: "History, Geography, Civics & Economics", hasClasses: true },
  { id: "math", name: "Basic Math", short: "Math", tagline: "Arithmetic, fractions, percentages & equations", hasClasses: false },
  { id: "it", name: "Information Technology", short: "IT", tagline: "Computers, networks & programming", hasClasses: false },
  { id: "custom", name: "Custom Topic", short: "Custom", tagline: "Trivia API · Any custom topic", hasClasses: false },
];

export function getSubject(id: string): SubjectMeta | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function subjectName(id: string): string {
  return getSubject(id)?.short ?? id;
}
