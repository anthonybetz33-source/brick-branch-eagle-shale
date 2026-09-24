import type { ConceptId, QuizModeId } from "./types";

export const CONCEPT_META: Record<
  ConceptId,
  { title: string; short: string; blurb: string; color: string }
> = {
  "basic-probability": {
    title: "Basic Probability",
    short: "Favorable / total",
    blurb: "Fractions, decimals, percents, complements, and missing probabilities.",
    color: "accent",
  },
  "prime-composite": {
    title: "Primes & Composites",
    short: "Factors first",
    blurb: "Identify primes, skip 1, then compute probability.",
    color: "accent",
  },
  "or-probability": {
    title: "OR Probability",
    short: "Add, subtract overlap",
    blurb: "Unions, Venn overlap, mutually exclusive events.",
    color: "accent",
  },
  "and-probability": {
    title: "AND / THEN",
    short: "Multiply",
    blurb: "Independent products and the general multiplication rule.",
    color: "accent",
  },
  "without-replacement": {
    title: "Without Replacement",
    short: "The bag changes",
    blurb: "Dependent draws: totals drop, and sometimes the favorable count too.",
    color: "accent",
  },
  conditional: {
    title: "Conditional Probability",
    short: "GIVEN = denominator",
    blurb: "Restrict the sample space to the given group.",
    color: "accent",
  },
  "two-way-tables": {
    title: "Two-Way Tables",
    short: "Read the margins",
    blurb: "Joints, marginals, and 'of this group' percents.",
    color: "accent",
  },
  "independent-dependent": {
    title: "Independent vs Dependent",
    short: "Did P change?",
    blurb: "Compare P(B) with P(B|A). Equal means independent.",
    color: "accent",
  },
  "empirical-rule": {
    title: "Empirical Rule",
    short: "68-95-99.7",
    blurb: "Normal curves, SD windows, and simple z-scores.",
    color: "accent",
  },
  correlation: {
    title: "Scatterplots & r",
    short: "Sign then strength",
    blurb: "Estimate r from the cloud. r lives in [−1, 1].",
    color: "accent",
  },
  regression: {
    title: "Least-Squares Regression",
    short: "ŷ = a + bx",
    blurb: "Plug in x. Slope vs intercept. Ignore extra r.",
    color: "accent",
  },
  "number-systems": {
    title: "Number Systems",
    short: "ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ",
    blurb: "Naturals through reals, plus irrationals like √2 and π.",
    color: "accent",
  },
  inequalities: {
    title: "Inequalities",
    short: "Open vs closed",
    blurb: "Number lines, filled dots, and interval notation.",
    color: "accent",
  },
  "multiplication-rule": {
    title: "Multiplication Rule",
    short: "Repeated trials",
    blurb: "Independent sequences like (1/2)^n, and when not to.",
    color: "accent",
  },
};

export const QUIZ_MODES: Record<
  QuizModeId,
  {
    title: string;
    blurb: string;
    count: number;
    timed: boolean;
    seconds?: number;
    immediate: boolean;
    concepts?: ConceptId[];
    difficulties?: Array<"EASY" | "MEDIUM" | "HARD" | "BOSS">;
    exam?: boolean;
  }
> = {
  "quick-10": {
    title: "Quick 10",
    blurb: "A short mixed set. Immediate explanations.",
    count: 10,
    timed: false,
    immediate: true,
  },
  "quick-20": {
    title: "Quick 20",
    blurb: "Twenty mixed items. Immediate explanations.",
    count: 20,
    timed: false,
    immediate: true,
  },
  probability: {
    title: "Probability Drill",
    blurb: "Basic, OR, AND, and without replacement.",
    count: 15,
    timed: false,
    immediate: true,
    concepts: ["basic-probability", "or-probability", "and-probability", "without-replacement", "prime-composite"],
  },
  conditional: {
    title: "Conditional Drill",
    blurb: "Given that, among those who, two-way tables.",
    count: 12,
    timed: false,
    immediate: true,
    concepts: ["conditional", "two-way-tables"],
  },
  independent: {
    title: "Independent vs Dependent",
    blurb: "Did the probability change? That's the whole game.",
    count: 12,
    timed: false,
    immediate: true,
    concepts: ["independent-dependent"],
  },
  normal: {
    title: "Normal Distribution Drill",
    blurb: "68-95-99.7, ranges, and z-scores.",
    count: 12,
    timed: false,
    immediate: true,
    concepts: ["empirical-rule"],
  },
  scatter: {
    title: "Scatterplot Drill",
    blurb: "Read the cloud. Estimate r. Sign then strength.",
    count: 10,
    timed: false,
    immediate: true,
    concepts: ["correlation"],
  },
  regression: {
    title: "Regression Drill",
    blurb: "Plug into ŷ = a + bx. Ignore extra numbers.",
    count: 10,
    timed: false,
    immediate: true,
    concepts: ["regression"],
  },
  mixed: {
    title: "Mixed C955",
    blurb: "Everything, shuffled. Forces you to recognize the type.",
    count: 25,
    timed: false,
    immediate: true,
  },
  weak: {
    title: "Weak Areas",
    blurb: "Pulled from the concepts you miss most.",
    count: 12,
    timed: false,
    immediate: true,
  },
  boss: {
    title: "Boss Battle",
    blurb: "HARD and BOSS items only. Immediate teaching after each.",
    count: 12,
    timed: false,
    immediate: true,
    difficulties: ["HARD", "BOSS"],
  },
  exam: {
    title: "Exam Simulation",
    blurb: "C955 Practice Simulation — Not an Official WGU Exam. No hints until the end.",
    count: 40,
    timed: true,
    seconds: 60 * 60,
    immediate: false,
    exam: true,
  },
};
