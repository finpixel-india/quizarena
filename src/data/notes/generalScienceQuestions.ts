import type { GenScienceQuestion } from "./questions/types";
import { CH1_QUESTIONS } from "./questions/ch1_nutrition";
import { CH2_QUESTIONS } from "./questions/ch2_diseases";
import { CH3_QUESTIONS } from "./questions/ch3_chemistry";
import { CH4_QUESTIONS } from "./questions/ch4_physics";
import { CH5_QUESTIONS } from "./questions/ch5_human_body";
import { CH6_QUESTIONS } from "./questions/ch6_everyday_science";
import { CH7_QUESTIONS } from "./questions/ch7_space";
import { CH8_QUESTIONS } from "./questions/ch8_metals";

export type { GenScienceQuestion } from "./questions/types";

export const GENERAL_SCIENCE_QUESTIONS: GenScienceQuestion[] = [
  ...CH1_QUESTIONS,
  ...CH2_QUESTIONS,
  ...CH3_QUESTIONS,
  ...CH4_QUESTIONS,
  ...CH5_QUESTIONS,
  ...CH6_QUESTIONS,
  ...CH7_QUESTIONS,
  ...CH8_QUESTIONS,
];

export const GENERAL_SCIENCE_QUESTIONS_BY_CHAPTER: Record<string, GenScienceQuestion[]> = {
  "note-gen-1": CH1_QUESTIONS,
  "note-gen-2": CH2_QUESTIONS,
  "note-gen-3": CH3_QUESTIONS,
  "note-gen-4": CH4_QUESTIONS,
  "note-gen-5": CH5_QUESTIONS,
  "note-gen-6": CH6_QUESTIONS,
  "note-gen-7": CH7_QUESTIONS,
  "note-gen-8": CH8_QUESTIONS,
};
