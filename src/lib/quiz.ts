import { QUESTIONS } from "@/data/questions";
import { QUIZ_MODES } from "@/data/concepts";
import type { ConceptId, Question, QuizModeId } from "@/data/types";
import { shuffle } from "@/lib/utils";
import type { ProgressState } from "@/data/types";
import { weakConcepts } from "@/lib/progress";

export function questionsForMode(mode: QuizModeId, progress: ProgressState): Question[] {
  const spec = QUIZ_MODES[mode];
  let pool = QUESTIONS.slice();
  if (spec.concepts?.length) {
    const set = new Set(spec.concepts);
    pool = pool.filter((q) => set.has(q.concept));
  }
  if (spec.difficulties?.length) {
    const set = new Set(spec.difficulties);
    pool = pool.filter((q) => set.has(q.difficulty));
  }
  if (mode === "weak") {
    const weak = weakConcepts(progress, 2).slice(0, 4);
    if (weak.length) {
      const ids = new Set(weak.map((w) => w.id));
      const focused = QUESTIONS.filter((q) => ids.has(q.concept));
      if (focused.length >= 6) pool = focused;
    }
  }
  const picked = takeSpread(pool, spec.count, progress);
  return picked.map((q) => ({
    ...q,
    choices: shuffle(q.choices) as Question["choices"],
  }));
}

function takeSpread(pool: Question[], count: number, progress: ProgressState): Question[] {
  const unseen = pool.filter((q) => !progress.seenIds.includes(q.id));
  const missed = new Set(progress.missed.map((m) => m.questionId));
  const retry = pool.filter((q) => missed.has(q.id));
  const rest = shuffle(pool);
  const out: Question[] = [];
  const used = new Set<string>();
  const push = (q: Question) => {
    if (used.has(q.id)) return;
    used.add(q.id);
    out.push(q);
  };
  for (const q of shuffle(retry)) {
    if (out.length >= Math.min(count, Math.ceil(count * 0.35))) break;
    push(q);
  }
  for (const q of shuffle(unseen.length ? unseen : rest)) {
    if (out.length >= count) break;
    push(q);
  }
  for (const q of rest) {
    if (out.length >= count) break;
    push(q);
  }
  return shuffle(out).slice(0, count);
}

export function conceptCounts() {
  const m = new Map<ConceptId, number>();
  for (const q of QUESTIONS) m.set(q.concept, (m.get(q.concept) ?? 0) + 1);
  return m;
}
