export interface GenScienceQuestion {
  id: string;
  chapterId: string;
  topic: string;
  question: string;
  options: { key: "A" | "B" | "C" | "D"; label: string }[];
  correctKey: "A" | "B" | "C" | "D";
  explanation: string;
}
