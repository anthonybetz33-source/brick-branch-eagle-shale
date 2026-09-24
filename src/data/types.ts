export const CONCEPT_IDS = [
  "basic-probability",
  "prime-composite",
  "or-probability",
  "and-probability",
  "without-replacement",
  "conditional",
  "two-way-tables",
  "independent-dependent",
  "empirical-rule",
  "correlation",
  "regression",
  "number-systems",
  "inequalities",
  "multiplication-rule",
] as const;

export type ConceptId = (typeof CONCEPT_IDS)[number];
export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "BOSS";

export type VisualSpec =
  | { kind: "scatter"; r: number; seed: number }
  | { kind: "bell"; mean: number; sd: number; shadeSd?: number }
  | {
      kind: "table";
      caption?: string;
      columns: string[];
      rows: { label: string; values: (string | number)[] }[];
      totals?: (string | number)[];
    }
  | { kind: "venn"; aLabel: string; bLabel: string; onlyA: number; onlyB: number; both: number; neither?: number }
  | {
      kind: "number-line";
      min: number;
      max: number;
      from: number;
      to: number;
      closedLeft: boolean;
      closedRight: boolean;
    }
  | { kind: "hierarchy" };

export type Question = {
  id: string;
  concept: ConceptId;
  difficulty: Difficulty;
  stem: string;
  choices: [string, string, string, string];
  correct: string;
  steps: string[];
  shortcut: string;
  trap: string;
  watchFor?: string;
  visual?: VisualSpec;
};

export type LessonSection =
  | { type: "intro"; body: string }
  | { type: "bullets"; title: string; items: string[] }
  | { type: "formula"; title: string; formula: string; note?: string }
  | {
      type: "example";
      title: string;
      setup: string;
      steps: string[];
      answer: string;
    }
  | { type: "shortcut"; title?: string; body: string }
  | { type: "trap"; title?: string; body: string }
  | { type: "watch"; words: string[]; body: string }
  | { type: "visual"; visual: VisualSpec; caption?: string }
  | { type: "callout"; tone: "info" | "tip" | "warn"; body: string };

export type Lesson = {
  id: string;
  slug: string;
  concept: ConceptId;
  title: string;
  subtitle: string;
  minutes: number;
  order: number;
  sections: LessonSection[];
};

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  hint?: string;
  concept?: ConceptId;
};

export type QuizModeId =
  | "quick-10"
  | "quick-20"
  | "probability"
  | "conditional"
  | "independent"
  | "normal"
  | "scatter"
  | "regression"
  | "mixed"
  | "weak"
  | "boss"
  | "exam";

export type ConceptStats = {
  attempted: number;
  correct: number;
  byDifficulty: Record<Difficulty, { attempted: number; correct: number }>;
};

export type MissedItem = {
  questionId: string;
  at: number;
  chosen: string;
};

export type QuizResult = {
  mode: QuizModeId;
  at: number;
  total: number;
  correct: number;
  seconds: number;
  missedIds: string[];
};

export type ProgressState = {
  version: 1;
  attempted: number;
  correct: number;
  streak: number;
  bestStreak: number;
  studySeconds: number;
  sessions: number;
  lastSessionAt: number | null;
  byConcept: Record<ConceptId, ConceptStats>;
  missed: MissedItem[];
  seenIds: string[];
  quizHistory: QuizResult[];
  bestExamPct: number | null;
  badges: string[];
};
