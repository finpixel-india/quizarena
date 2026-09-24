import { science9 } from "@/data/bank/science9";
import { science10 } from "@/data/bank/science10";
import { sst9 } from "@/data/bank/sst9";
import { sst10 } from "@/data/bank/sst10";
import { itTopics, mathConcepts } from "@/data/bank/it";
import type { ChapterData, RawQ } from "@/data/bank/types";
import { generateMath, LEVEL_NAME, MATH_GEN_KEYS, type MathGenKey } from "./math-gen";
import { hashText } from "./hash";
import { buildQuestion, shuffle } from "./random";
import type { Difficulty, QuizQuestion, SubjectId, TopicInfo } from "./types";

interface KeyedQ {
  key: string;
  q: RawQ;
}

type BankRef = { kind: "raw"; items: KeyedQ[] } | { kind: "gen"; keys: MathGenKey[]; concepts?: KeyedQ[] };

export interface OnlineRef {
  opentdb?: number;
  triviaapi?: { categories?: string; tags?: string };
}

export interface TopicDef extends TopicInfo {
  bank: BankRef;
  online?: OnlineRef;
}

const keyed = (prefix: string, qs: RawQ[]): KeyedQ[] => qs.map((q, i) => ({ key: `${prefix}:${i}`, q }));
const fromChapters = (chs: ChapterData[]): KeyedQ[] => chs.flatMap((c) => keyed(c.id, c.q));

const SECTION_CODE: Record<string, string> = {
  History: "h",
  Geography: "g",
  "Political Science": "p",
  Economics: "e",
};

export const SST_SECTIONS = ["History", "Geography", "Political Science", "Economics"] as const;

const defs: TopicDef[] = [];

function addClassTopics(subject: SubjectId, classLevel: 9 | 10, chapters: ChapterData[]) {
  const subjName = subject === "science" ? "Science" : "SST";
  for (const ch of chapters) {
    defs.push({
      id: ch.id,
      subject,
      classLevel,
      section: ch.section,
      chapterNo: ch.no,
      title: ch.title,
      label: `Class ${classLevel} ${subjName} · ${ch.title}`,
      kind: "chapter",
      sources: ["bank"],
      bankCount: ch.q.length,
      bank: { kind: "raw", items: keyed(ch.id, ch.q) },
    });
  }
  if (subject === "sst") {
    for (const section of SST_SECTIONS) {
      const secChapters = chapters.filter((c) => c.section === section);
      if (!secChapters.length) continue;
      const items = fromChapters(secChapters);
      defs.push({
        id: `sst${classLevel}-${SECTION_CODE[section]}-all`,
        subject,
        classLevel,
        section,
        title: `All ${section} chapters`,
        label: `Class ${classLevel} SST · ${section} (all chapters)`,
        kind: "class-all",
        sources: ["bank"],
        bankCount: items.length,
        bank: { kind: "raw", items },
      });
    }
  }
  const all = fromChapters(chapters);
  defs.push({
    id: `${subject === "science" ? "sci" : "sst"}${classLevel}-all`,
    subject,
    classLevel,
    title: `All Class ${classLevel} chapters`,
    label: `Class ${classLevel} ${subjName} · All chapters`,
    kind: "class-all",
    sources: ["bank"],
    bankCount: all.length,
    bank: { kind: "raw", items: all },
    description: "A mixed quiz across every chapter",
  });
}

addClassTopics("science", 9, science9);
addClassTopics("science", 10, science10);
addClassTopics("sst", 9, sst9);
addClassTopics("sst", 10, sst10);

const scienceAll = fromChapters([...science9, ...science10]);
defs.push({
  id: "sci-general",
  subject: "science",
  title: "General Science",
  label: "Science · General Science",
  kind: "general",
  sources: ["bank", "opentdb", "triviaapi"],
  bankCount: scienceAll.length,
  bank: { kind: "raw", items: scienceAll },
  online: { opentdb: 17, triviaapi: { categories: "science" } },
  description: "Physics, chemistry, biology & nature — from any source",
});

const sstAll = fromChapters([...sst9, ...sst10]);
defs.push({
  id: "sst-general",
  subject: "sst",
  title: "History & Geography",
  label: "SST · History & Geography",
  kind: "general",
  sources: ["bank", "opentdb", "triviaapi"],
  bankCount: sstAll.length,
  bank: { kind: "raw", items: sstAll },
  online: { opentdb: 23, triviaapi: { categories: "history,geography" } },
  description: "World history, geography and civics — from any source",
});

const MATH_META: Record<MathGenKey, { title: string; description: string }> = {
  arithmetic: { title: "Arithmetic", description: "Addition, subtraction, multiplication, division & BODMAS" },
  fractions: { title: "Fractions & Decimals", description: "Operations, simplification and conversions" },
  percent: { title: "Percentages & Ratios", description: "Percent, discount, profit, ratio & simple interest" },
  powers: { title: "Squares, Cubes & Roots", description: "Squares, cubes, roots and laws of exponents" },
  algebra: { title: "Simple Equations", description: "Linear equations and evaluating expressions" },
};

for (const key of MATH_GEN_KEYS) {
  defs.push({
    id: `math-${key}`,
    subject: "math",
    title: MATH_META[key].title,
    label: `Basic Math · ${MATH_META[key].title}`,
    kind: "topic",
    sources: ["bank"],
    bankCount: null,
    bank: { kind: "gen", keys: [key] },
    description: MATH_META[key].description,
  });
}

const conceptItems = keyed(mathConcepts.id, mathConcepts.q);
defs.push({
  id: "math-concepts",
  subject: "math",
  title: mathConcepts.title,
  label: `Basic Math · ${mathConcepts.title}`,
  kind: "topic",
  sources: ["bank"],
  bankCount: conceptItems.length,
  bank: { kind: "raw", items: conceptItems },
  description: mathConcepts.description,
});

defs.push({
  id: "math-mixed",
  subject: "math",
  title: "Mixed Math Challenge",
  label: "Basic Math · Mixed Challenge",
  kind: "mixed",
  sources: ["bank", "opentdb", "triviaapi"],
  bankCount: null,
  bank: { kind: "gen", keys: MATH_GEN_KEYS, concepts: conceptItems },
  online: { opentdb: 19, triviaapi: { tags: "mathematics,math,numbers,geometry" } },
  description: "Everything mixed — or pull math trivia from an online source",
});

for (const t of itTopics) {
  defs.push({
    id: t.id,
    subject: "it",
    title: t.title,
    label: `IT · ${t.title}`,
    kind: "topic",
    sources: ["bank"],
    bankCount: t.q.length,
    bank: { kind: "raw", items: keyed(t.id, t.q) },
    description: t.description,
  });
}

const itAll = itTopics.flatMap((t) => keyed(t.id, t.q));
defs.push({
  id: "it-mixed",
  subject: "it",
  title: "Mixed IT Quiz",
  label: "IT · Mixed Quiz",
  kind: "mixed",
  sources: ["bank", "opentdb", "triviaapi"],
  bankCount: itAll.length,
  bank: { kind: "raw", items: itAll },
  online: { opentdb: 18, triviaapi: { tags: "computing,technology,programming" } },
  description: "All IT topics — or computer trivia from an online source",
});

const byId = new Map(defs.map((d) => [d.id, d]));

export function getTopic(id: string): TopicDef | undefined {
  return byId.get(id);
}

export function toInfo(def: TopicDef): TopicInfo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { bank, online, ...info } = def;
  return info;
}

export function getTopicInfo(id: string): TopicInfo | undefined {
  const d = byId.get(id);
  return d ? toInfo(d) : undefined;
}

/** Every topic (client-safe) — used by the one-step quiz builder. */
export function listAllTopics(): TopicInfo[] {
  return defs.map(toInfo);
}

export function listTopics(subject: SubjectId, classLevel?: 9 | 10): TopicInfo[] {
  return defs.filter((d) => d.subject === subject && (classLevel ? d.classLevel === classLevel : d.classLevel === undefined)).map(toInfo);
}

export function subjectQuestionCount(subject: SubjectId): number | null {
  const list = defs.filter((d) => d.subject === subject && d.kind === "chapter");
  if (!list.length) return null;
  return list.reduce((s, d) => s + (d.bankCount ?? 0), 0);
}

function rawToQuestion(item: KeyedQ): QuizQuestion {
  const [question, correct, wrong, hint, explanation] = item.q;
  return buildQuestion({ id: item.key, question, correct, wrong, hint, explanation, origin: "bank" });
}

/**
 * Draw questions for a topic from the curated bank / generator.
 * Questions whose hash is in `exclude` are skipped when possible, so
 * repeat plays prefer questions the learner hasn't seen yet.
 */
export function getBankQuestions(def: TopicDef, count: number, difficulty: Difficulty, exclude: ReadonlySet<string> = new Set()): QuizQuestion[] {
  if (def.bank.kind === "raw") {
    const shuffled = shuffle(def.bank.items);
    const fresh = shuffled.filter((it) => !exclude.has(hashText(it.q[0])));
    const stale = shuffled.filter((it) => exclude.has(hashText(it.q[0])));
    const picked = fresh.slice(0, count);
    if (picked.length < count) picked.push(...stale.slice(0, count - picked.length));
    return shuffle(picked).map(rawToQuestion);
  }
  const { keys, concepts } = def.bank;
  const out: QuizQuestion[] = [];
  const conceptsFresh = concepts ? concepts.filter((it) => !exclude.has(hashText(it.q[0]))) : [];
  const conceptsStale = concepts ? concepts.filter((it) => exclude.has(hashText(it.q[0]))) : [];
  const conceptCount = concepts ? Math.min(conceptsFresh.length, Math.round(count * 0.25)) : 0;
  if (conceptCount) out.push(...shuffle(conceptsFresh).slice(0, conceptCount).map(rawToQuestion));
  if (concepts && out.length < Math.round(count * 0.25) && conceptsStale.length) {
    out.push(...shuffle(conceptsStale).slice(0, Math.round(count * 0.25) - out.length).map(rawToQuestion));
  }
  const remaining = count - out.length;
  const perKey: Record<string, number> = {};
  for (let i = 0; i < remaining; i++) {
    const k = keys[i % keys.length];
    perKey[k] = (perKey[k] ?? 0) + 1;
  }
  for (const k of keys) {
    const n = perKey[k] ?? 0;
    if (!n) continue;
    const seenGen = new Set<string>();
    const pool = generateMath(k, n * 4, difficulty);
    const freshGen = pool.filter((g) => !exclude.has(hashText(g.question)) && !seenGen.has(g.question));
    freshGen.forEach((g) => seenGen.add(g.question));
    const staleGen = pool.filter((g) => exclude.has(hashText(g.question)));
    const chosen = freshGen.slice(0, n);
    if (chosen.length < n) chosen.push(...staleGen.slice(0, n - chosen.length));
    for (const g of chosen) {
      out.push(
        buildQuestion({
          question: g.question,
          correct: g.answer,
          wrong: g.distractors,
          hint: g.hint,
          explanation: g.explanation,
          difficulty: LEVEL_NAME[g.level],
          origin: "bank",
        }),
      );
    }
  }
  return shuffle(out).slice(0, count);
}
