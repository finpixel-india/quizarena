import { hashText } from "./hash";
import { SOURCE_META } from "./settings";
import { fetchOpenTdb, fetchTriviaApi } from "./sources/online";
import { getBankQuestions, getTopic, toInfo } from "./topics";
import type { Difficulty, GenerateResponse, QuizQuestion, SourceId } from "./types";

export class QuizError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

function dedupe(list: QuizQuestion[]): QuizQuestion[] {
  const seen = new Set<string>();
  return list.filter((q) => {
    const key = q.question.trim().toLowerCase();
    if (seen.has(key) || q.correctIndex < 0 || q.options.length < 2) return false;
    seen.add(key);
    return true;
  });
}

export async function generateQuiz(cfg: {
  topicId: string;
  source: SourceId;
  amount: number;
  difficulty: Difficulty;
  exclude?: string[];
  customTopic?: string;
}): Promise<GenerateResponse> {
  const def = getTopic(cfg.topicId);
  if (!def) throw new QuizError("That topic could not be found.", 404);
  const topic = toInfo(def);
  if (cfg.customTopic) {
    topic.title = cfg.customTopic;
    topic.label = `Custom · ${cfg.customTopic}`;
  }
  const amount = Math.min(50, Math.max(1, Math.round(cfg.amount)));
  const source: SourceId = def.sources.includes(cfg.source) ? cfg.source : def.sources[0];
  const exclude = new Set((cfg.exclude ?? []).filter((h) => typeof h === "string" && h.length <= 32).slice(0, 300));

  if (source === "bank") {
    const questions = dedupe(getBankQuestions(def, amount, cfg.difficulty, exclude));
    const notice =
      questions.length < amount
        ? def.bankCount !== null
          ? `This topic has ${def.bankCount} curated questions, so your quiz has ${questions.length}.`
          : `Only ${questions.length} unique questions exist for this difficulty, so your quiz has ${questions.length}.`
        : undefined;
    return { topic, questions, sourceUsed: "bank", notice };
  }

  let online: QuizQuestion[] = [];
  let failure: string | undefined;
  try {
    if (source === "opentdb" && def.online?.opentdb) {
      online = await fetchOpenTdb(def.online.opentdb, amount, cfg.difficulty);
    } else if (source === "triviaapi") {
      const ref = cfg.customTopic
        ? { customTopic: cfg.customTopic }
        : def.online?.triviaapi ?? { categories: "general_knowledge" };
      online = await fetchTriviaApi(ref, amount, cfg.difficulty);
    } else {
      failure = "not available for this topic";
    }
  } catch (err) {
    failure = err instanceof Error ? err.message : "unknown error";
  }

  online = dedupe(online).slice(0, amount);
  const name = SOURCE_META[source].name;

  if (online.length >= amount) {
    return { topic, questions: online, sourceUsed: source };
  }

  const seen = new Set(online.map((q) => q.question.trim().toLowerCase()));
  const filler = getBankQuestions(def, amount * 2, cfg.difficulty)
    .filter((q) => !seen.has(q.question.trim().toLowerCase()))
    .slice(0, amount - online.length);

  if (online.length === 0) {
    return {
      topic,
      questions: filler,
      sourceUsed: "bank",
      notice: `${name} couldn't be reached (${failure ?? "no questions returned"}). We loaded questions from the curated bank instead.`,
    };
  }

  return {
    topic,
    questions: [...online, ...filler],
    sourceUsed: source,
    notice: `${name} had only ${online.length} matching question${online.length === 1 ? "" : "s"}, so ${filler.length} were added from the curated bank.`,
  };
}
