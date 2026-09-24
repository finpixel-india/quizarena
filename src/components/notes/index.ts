import type { DiagramEntry } from "@/data/notes/types";
import { science9Diagrams } from "./science9Diagrams";
import { science10Diagrams } from "./science10Diagrams";

const ALL: DiagramEntry[] = [...science9Diagrams, ...science10Diagrams];

export const DIAGRAMS: Record<string, DiagramEntry> = Object.fromEntries(ALL.map((d) => [d.id, d]));

export function getDiagram(id?: string): DiagramEntry | undefined {
  return id ? DIAGRAMS[id] : undefined;
}
