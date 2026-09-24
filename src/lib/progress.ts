import { create } from "zustand";
import { CONCEPT_IDS, type ConceptId, type ConceptStats, type Difficulty, type ProgressState, type QuizModeId } from "@/data/types";

const KEY = "c955-mastery-v1";

const emptyConcept = (): ConceptStats => ({
  attempted: 0,
  correct: 0,
  byDifficulty: {
    EASY: { attempted: 0, correct: 0 },
    MEDIUM: { attempted: 0, correct: 0 },
    HARD: { attempted: 0, correct: 0 },
    BOSS: { attempted: 0, correct: 0 },
  },
});

export function defaultProgress(): ProgressState {
  const byConcept = {} as Record<ConceptId, ConceptStats>;
  for (const id of CONCEPT_IDS) byConcept[id] = emptyConcept();
  return {
    version: 1,
    attempted: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
    studySeconds: 0,
    sessions: 0,
    lastSessionAt: null,
    byConcept,
    missed: [],
    seenIds: [],
    quizHistory: [],
    bestExamPct: null,
    badges: [],
  };
}

function load(): ProgressState {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return defaultProgress();
    const base = defaultProgress();
    return {
      ...base,
      ...parsed,
      byConcept: { ...base.byConcept, ...parsed.byConcept },
      missed: parsed.missed ?? [],
      seenIds: parsed.seenIds ?? [],
      quizHistory: parsed.quizHistory ?? [],
      badges: parsed.badges ?? [],
    };
  } catch {
    return defaultProgress();
  }
}

function awardBadges(p: ProgressState): string[] {
  const badges = new Set(p.badges);
  if (p.attempted >= 1) badges.add("first-step");
  if (p.attempted >= 25) badges.add("warmed-up");
  if (p.attempted >= 100) badges.add("century");
  if (p.bestStreak >= 5) badges.add("streak-5");
  if (p.bestStreak >= 10) badges.add("streak-10");
  if (p.bestExamPct != null && p.bestExamPct >= 80) badges.add("exam-80");
  if (p.correct >= 50) badges.add("fifty-correct");
  const weak = CONCEPT_IDS.filter((c) => (p.byConcept[c]?.attempted ?? 0) >= 5);
  if (weak.length >= 8) badges.add("coverage");
  return [...badges];
}

type Store = ProgressState & {
  hydrated: boolean;
  hydrate: () => void;
  persist: () => void;
  recordAnswer: (opts: {
    questionId: string;
    concept: ConceptId;
    difficulty: Difficulty;
    correct: boolean;
    chosen: string;
  }) => void;
  finishQuiz: (opts: {
    mode: QuizModeId;
    total: number;
    correct: number;
    seconds: number;
    missedIds: string[];
  }) => void;
  addStudySeconds: (n: number) => void;
  startSession: () => void;
  reset: () => void;
};

export const useProgress = create<Store>((set, get) => ({
  ...defaultProgress(),
  hydrated: false,
  hydrate: () => {
    const data = load();
    set({ ...data, hydrated: true });
  },
  persist: () => {
    if (typeof window === "undefined") return;
    const s = get();
    const { hydrated: _h, hydrate: _hy, persist: _p, recordAnswer: _r, finishQuiz: _f, addStudySeconds: _a, startSession: _st, reset: _re, ...data } = s;
    localStorage.setItem(KEY, JSON.stringify(data));
  },
  recordAnswer: ({ questionId, concept, difficulty, correct, chosen }) => {
    const s = get();
    const byConcept = { ...s.byConcept };
    const cs = { ...emptyConcept(), ...byConcept[concept] };
    cs.attempted += 1;
    if (correct) cs.correct += 1;
    cs.byDifficulty = {
      ...cs.byDifficulty,
      [difficulty]: {
        attempted: cs.byDifficulty[difficulty].attempted + 1,
        correct: cs.byDifficulty[difficulty].correct + (correct ? 1 : 0),
      },
    };
    byConcept[concept] = cs;
    const streak = correct ? s.streak + 1 : 0;
    const missed = correct
      ? s.missed.filter((m) => m.questionId !== questionId)
      : [{ questionId, at: Date.now(), chosen }, ...s.missed.filter((m) => m.questionId !== questionId)].slice(0, 80);
    const seenIds = s.seenIds.includes(questionId) ? s.seenIds : [...s.seenIds, questionId].slice(-500);
    const next: Partial<ProgressState> = {
      attempted: s.attempted + 1,
      correct: s.correct + (correct ? 1 : 0),
      streak,
      bestStreak: Math.max(s.bestStreak, streak),
      byConcept,
      missed,
      seenIds,
    };
    next.badges = awardBadges({ ...s, ...next } as ProgressState);
    set(next);
    get().persist();
  },
  finishQuiz: ({ mode, total, correct, seconds, missedIds }) => {
    const s = get();
    const pct = total ? (100 * correct) / total : 0;
    const quizHistory = [{ mode, at: Date.now(), total, correct, seconds, missedIds }, ...s.quizHistory].slice(0, 30);
    const bestExamPct = mode === "exam" ? Math.max(s.bestExamPct ?? 0, pct) : s.bestExamPct;
    const next = { quizHistory, bestExamPct, badges: awardBadges({ ...s, quizHistory, bestExamPct } as ProgressState) };
    set(next);
    get().persist();
  },
  addStudySeconds: (n) => {
    set({ studySeconds: get().studySeconds + n });
    get().persist();
  },
  startSession: () => {
    const s = get();
    const now = Date.now();
    const gap = s.lastSessionAt ? now - s.lastSessionAt : Infinity;
    if (gap > 30 * 60 * 1000) {
      set({ sessions: s.sessions + 1, lastSessionAt: now });
      get().persist();
    } else {
      set({ lastSessionAt: now });
      get().persist();
    }
  },
  reset: () => {
    const fresh = defaultProgress();
    set({ ...fresh, hydrated: true });
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
  },
}));

export function accuracy(correct: number, attempted: number) {
  if (!attempted) return null;
  return Math.round((1000 * correct) / attempted) / 10;
}

export function weakConcepts(p: ProgressState, minAttempts = 3) {
  return CONCEPT_IDS.map((id) => {
    const c = p.byConcept[id];
    const acc = accuracy(c.correct, c.attempted);
    return { id, attempted: c.attempted, correct: c.correct, acc };
  })
    .filter((c) => c.attempted >= minAttempts && c.acc != null)
    .sort((a, b) => (a.acc ?? 100) - (b.acc ?? 100));
}

export function strongestConcept(p: ProgressState) {
  const ranked = CONCEPT_IDS.map((id) => {
    const c = p.byConcept[id];
    return { id, attempted: c.attempted, acc: accuracy(c.correct, c.attempted) };
  }).filter((c) => c.attempted >= 3 && c.acc != null);
  ranked.sort((a, b) => (b.acc ?? 0) - (a.acc ?? 0));
  return ranked[0] ?? null;
}

export const BADGE_LABELS: Record<string, { title: string; blurb: string }> = {
  "first-step": { title: "First step", blurb: "Answered your first question." },
  "warmed-up": { title: "Warmed up", blurb: "25 questions attempted." },
  century: { title: "Century", blurb: "100 questions attempted." },
  "streak-5": { title: "On a roll", blurb: "5 correct in a row." },
  "streak-10": { title: "Locked in", blurb: "10 correct in a row." },
  "exam-80": { title: "Simulation 80+", blurb: "Scored 80% or higher on an exam simulation." },
  "fifty-correct": { title: "Fifty correct", blurb: "50 answers correct." },
  coverage: { title: "Broad coverage", blurb: "Practiced 8+ concepts with at least 5 attempts each." },
};

export function formatDuration(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m`;
  return `${s}s`;
}
