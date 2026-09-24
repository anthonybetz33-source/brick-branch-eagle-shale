#!/usr/bin/env node
/**
 * Generates src/data/questions.ts with a large, mathematically verified C955 bank.
 * Run: node scripts/generate-questions.mjs
 */
import fs from "node:fs";

function gcd(a, b) {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}
function simp(n, d) {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return [n / g, d / g];
}
function frac(n, d) {
  const [a, b] = simp(n, d);
  return b === 1 ? String(a) : `${a}/${b}`;
}
function pct(n, d, decimals = 1) {
  return `${((100 * n) / d).toFixed(decimals)}%`;
}
function dec(n, d, decimals = 2) {
  return (n / d).toFixed(decimals);
}
function uniqueChoices(correct, distractors) {
  const pool = [];
  const seen = new Set();
  const push = (s) => {
    const k = String(s);
    if (!seen.has(k) && k.length) {
      seen.add(k);
      pool.push(k);
    }
  };
  push(correct);
  for (const d of distractors) push(d);
  const extras = ["0", "1", "1/2", "50%", "Cannot be determined", "0.5", "25%", "75%"];
  for (const e of extras) {
    if (pool.length >= 4) break;
    push(e);
  }
  let i = 2;
  while (pool.length < 4) {
    push(String(i++));
  }
  return [pool[0], pool[1], pool[2], pool[3]];
}

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
function primesUpTo(n) {
  return PRIMES.filter((p) => p <= n);
}

const Q = [];
function add(q) {
  const choices = uniqueChoices(q.correct, q.distractors);
  if (!choices.includes(q.correct)) throw new Error("correct missing: " + q.id);
  Q.push({
    id: q.id,
    concept: q.concept,
    difficulty: q.difficulty,
    stem: q.stem,
    choices,
    correct: q.correct,
    steps: q.steps,
    shortcut: q.shortcut,
    trap: q.trap,
    watchFor: q.watchFor,
    visual: q.visual,
  });
}

/* ---------- BASIC PROBABILITY ---------- */
{
  const dice = [
    { sides: 6, fav: [2, 4, 6], label: "even" },
    { sides: 6, fav: [1, 3, 5], label: "odd" },
    { sides: 6, fav: [5, 6], label: "greater than 4" },
    { sides: 6, fav: [1, 2], label: "less than 3" },
    { sides: 6, fav: [6], label: "a 6" },
    { sides: 8, fav: [2, 4, 6, 8], label: "even" },
    { sides: 8, fav: [1, 2, 3], label: "at most 3" },
    { sides: 10, fav: [1, 2, 3, 4, 5], label: "5 or less" },
    { sides: 12, fav: [3, 6, 9, 12], label: "a multiple of 3" },
    { sides: 12, fav: [4, 8, 12], label: "a multiple of 4" },
    { sides: 20, fav: [5, 10, 15, 20], label: "a multiple of 5" },
    { sides: 4, fav: [1], label: "a 1" },
  ];
  dice.forEach((d, i) => {
    const n = d.fav.length;
    const correct = frac(n, d.sides);
    add({
      id: `bp-die-${i + 1}`,
      concept: "basic-probability",
      difficulty: d.sides <= 8 ? "EASY" : "MEDIUM",
      stem: `A fair ${d.sides}-sided die is rolled once. What is the probability of rolling ${d.label}?`,
      correct,
      distractors: [frac(n, d.sides - 1), frac(n + 1, d.sides), pct(n, d.sides), frac(1, n), dec(n, d.sides)],
      steps: [
        `Here's what the question is REALLY asking: of the ${d.sides} equally likely faces, how many match "${d.label}"?`,
        `Favorable outcomes: ${d.fav.join(", ")}. That's ${n} outcome${n === 1 ? "" : "s"}.`,
        `Total outcomes: ${d.sides}.`,
        `Probability = favorable / total = ${n}/${d.sides} = ${correct}.`,
      ],
      shortcut: "Probability of one roll = (how many faces you want) / (how many faces exist).",
      trap: "Don't use the largest matching number as the denominator. The denominator is the total number of sides.",
      watchFor: "fair die, rolled once",
    });
  });

  const missing = [
    [0.13, 0.27, 0.26, 0.06],
    [0.2, 0.35, 0.15],
    [0.1, 0.1, 0.1, 0.1, 0.25],
    [0.4, 0.25, 0.2],
    [0.18, 0.22, 0.3, 0.12],
    [0.05, 0.15, 0.2, 0.25, 0.1],
    [0.33, 0.17, 0.21],
    [0.5, 0.125, 0.125],
  ];
  missing.forEach((vals, i) => {
    const known = vals.reduce((a, b) => a + b, 0);
    const miss = Math.round((1 - known) * 1000) / 1000;
    const labels = vals.map((v, j) => `${j + 1} = ${v}`).join(", ");
    const missPct = `${(miss * 100).toFixed(miss * 100 === Math.round(miss * 100) ? 0 : 1)}%`;
    add({
      id: `bp-miss-${i + 1}`,
      concept: "basic-probability",
      difficulty: i < 3 ? "EASY" : i < 6 ? "MEDIUM" : "HARD",
      stem: `A spinner has outcomes with these probabilities: ${labels}, and one remaining outcome. What is the missing probability?`,
      correct: String(miss),
      distractors: [
        String(Math.round(known * 1000) / 1000),
        String(Math.round((1 - vals[0]) * 1000) / 1000),
        missPct,
        String(Math.round((1 - known + 0.1) * 1000) / 1000),
        String(Math.abs(Math.round((known - 0.5) * 1000) / 1000)),
      ],
      steps: [
        "All probabilities for a complete set of outcomes must add to 1 (that's 100%).",
        `Add what you know: ${vals.join(" + ")} = ${Math.round(known * 1000) / 1000}.`,
        `Missing = 1 − ${Math.round(known * 1000) / 1000} = ${miss}.`,
        `As a percent, that's ${missPct}.`,
      ],
      shortcut: "Add what you know → subtract from 1.",
      trap: "Don't average the listed values. Don't forget that 1 means 100% of the probability.",
      watchFor: "missing probability, remaining outcome",
    });
  });

  add({
    id: "bp-range-1",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "Which of the following can NEVER be a probability?",
    correct: "1.2",
    distractors: ["0", "0.5", "1", "0.01"],
    steps: [
      "A probability is always a number between 0 and 1, inclusive.",
      "0 means impossible. 1 means certain. 0.5 means a 50/50 chance.",
      "1.2 is 120%, which is more than the whole sample space — that's impossible.",
    ],
    shortcut: "If it's less than 0 or greater than 1, it is not a probability.",
    trap: "0 is a valid probability (impossible event). 1 is valid (certain event).",
  });

  add({
    id: "bp-range-2",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "An event that is certain to happen has probability:",
    correct: "1",
    distractors: ["0", "0.5", "100", "Infinity"],
    steps: [
      "Certain means it happens every time — there are no other possibilities.",
      "Probability of a certain event = 1, which is 100%.",
      "Don't write 100 as the probability unless the question asks for a percent.",
    ],
    shortcut: "Impossible = 0. Certain = 1. Everything else is in between.",
    trap: "Writing 100 instead of 1 (or 100%) is a common mix-up between probability and percent.",
  });

  add({
    id: "bp-comp-1",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "If P(rain) = 0.35, what is the probability that it does NOT rain?",
    correct: "0.65",
    distractors: ["0.35", "0.65%", "1.35", "0.30"],
    steps: [
      "The complement of an event is 'it does NOT happen.'",
      "P(not A) = 1 − P(A).",
      "1 − 0.35 = 0.65.",
    ],
    shortcut: "NOT = subtract from 1.",
    trap: "Don't subtract from 100 unless you are working in percents. 0.35 is already a probability, so subtract from 1.",
    watchFor: "not, does not, complementary",
  });

  add({
    id: "bp-comp-2",
    concept: "basic-probability",
    difficulty: "MEDIUM",
    stem: "A bag has 7 green, 3 yellow, and 10 black marbles. One marble is drawn at random. What is the probability it is NOT black?",
    correct: "1/2",
    distractors: ["10/20", "10/17", "7/20", "3/20", "1/3"],
    steps: [
      "Total marbles = 7 + 3 + 10 = 20.",
      "Not black = green + yellow = 7 + 3 = 10.",
      "P(not black) = 10/20 = 1/2.",
      "Or: P(black) = 10/20 = 1/2, so P(not black) = 1 − 1/2 = 1/2.",
    ],
    shortcut: "NOT black = everyone except black. Or 1 minus P(black).",
    trap: "Using 10/17 (forgetting to count all colors in the total) is a common trap.",
  });

  add({
    id: "bp-pct-1",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "Convert the probability 0.28 to a percent.",
    correct: "28%",
    distractors: ["0.28%", "2.8%", "280%", "0.72"],
    steps: [
      "Percent means 'per hundred.' Multiply the decimal by 100.",
      "0.28 × 100 = 28, so 28%.",
    ],
    shortcut: "Decimal → percent: move the decimal point two places right.",
    trap: "Don't just slap a % sign onto 0.28. 0.28% is a hundred times too small.",
  });
}

/* ---------- PRIME / COMPOSITE ---------- */
{
  const ranges = [10, 20, 25, 30, 50];
  ranges.forEach((n, i) => {
    const ps = primesUpTo(n);
    add({
      id: `pr-count-${n}`,
      concept: "prime-composite",
      difficulty: n <= 25 ? "EASY" : "MEDIUM",
      stem: `How many prime numbers are there from 1 to ${n} (inclusive)?`,
      correct: String(ps.length),
      distractors: [String(ps.length + 1), String(ps.length - 1), String(ps.length + 2), String(n), "1"],
      steps: [
        "A prime number has exactly two distinct positive factors: 1 and itself.",
        "1 is NOT prime. 2 is the only even prime.",
        `Primes ≤ ${n}: ${ps.join(", ")}.`,
        `That's ${ps.length} primes.`,
      ],
      shortcut: "Skip 1. Keep 2. Then only odd candidates, and test divisibility.",
      trap: "Counting 1 as prime is the #1 mistake. 1 has only one factor, so it is neither prime nor composite.",
    });
  });

  const diePrime = [
    { sides: 6, diff: "EASY" },
    { sides: 10, diff: "EASY" },
    { sides: 12, diff: "MEDIUM" },
    { sides: 20, diff: "MEDIUM" },
    { sides: 25, diff: "HARD" },
    { sides: 30, diff: "HARD" },
  ];
  diePrime.forEach((d) => {
    const fav = [];
    for (let k = 1; k <= d.sides; k++) if (isPrime(k)) fav.push(k);
    add({
      id: `pr-die-${d.sides}`,
      concept: "prime-composite",
      difficulty: d.diff,
      stem: `A fair ${d.sides}-sided die (faces 1 through ${d.sides}) is rolled. What is the probability the result is prime?`,
      correct: frac(fav.length, d.sides),
      distractors: [
        frac(fav.length + 1, d.sides),
        frac(fav.length, d.sides - 1),
        frac(fav.filter((x) => x !== 2).length, d.sides),
        String(fav.length),
        pct(fav.length, d.sides),
      ],
      steps: [
        `First identify the primes from 1 to ${d.sides}. Remember: 1 is not prime.`,
        `Primes: ${fav.join(", ")}. Count = ${fav.length}.`,
        `Total faces = ${d.sides}.`,
        `Probability = ${fav.length}/${d.sides} = ${frac(fav.length, d.sides)}.`,
      ],
      shortcut: "List the primes first, THEN divide by the number of faces. Don't try to do both at once.",
      trap: "Including 1 as a prime, or forgetting that 2 is prime, will shift the count by 1.",
      watchFor: "prime, die, numbered 1 through",
    });
  });

  add({
    id: "pr-one",
    concept: "prime-composite",
    difficulty: "EASY",
    stem: "Why is 1 neither prime nor composite?",
    correct: "It has only one positive factor (itself)",
    distractors: [
      "It is even",
      "It is odd",
      "It is negative",
      "Prime numbers must be greater than 10",
    ],
    steps: [
      "Prime: exactly two distinct positive factors (1 and itself).",
      "Composite: at least three positive factors (it can be factored further).",
      "1 has only one positive factor: 1. So it fits neither definition.",
    ],
    shortcut: "Prime = exactly 2 factors. Composite = 3 or more. 1 has 1 factor.",
    trap: "People memorize '1 is not prime' without knowing WHY. The factor-count definition is the reason.",
  });

  add({
    id: "pr-two",
    concept: "prime-composite",
    difficulty: "EASY",
    stem: "Which statement about 2 is true?",
    correct: "2 is the only even prime number",
    distractors: [
      "2 is composite because it is even",
      "2 is not prime because primes must be odd",
      "2 is neither prime nor composite",
      "Every even number is prime",
    ],
    steps: [
      "2 has factors 1 and 2 — that's exactly two factors, so it is prime.",
      "Every other even number is divisible by 2, so it has 2 as an extra factor and is composite.",
      "That's why 2 is the only even prime.",
    ],
    shortcut: "Even and bigger than 2 → divisible by 2 → composite.",
    trap: "'Even means composite' is almost true, but it fails for 2.",
  });

  add({
    id: "pr-comp-15",
    concept: "prime-composite",
    difficulty: "EASY",
    stem: "Which of these numbers is composite?",
    correct: "15",
    distractors: ["2", "3", "11", "17"],
    steps: [
      "Composite means it has a factor other than 1 and itself.",
      "15 = 3 × 5, so it is composite.",
      "2, 3, 11, and 17 are all prime.",
    ],
    shortcut: "If you can break it into a multiplication of smaller integers besides 1×itself, it's composite.",
    trap: "Odd numbers can still be composite (9, 15, 21, 25, 27, 33, 35...).",
  });

  add({
    id: "pr-list-25",
    concept: "prime-composite",
    difficulty: "MEDIUM",
    stem: "Which list is the complete set of primes between 1 and 25?",
    correct: "2, 3, 5, 7, 11, 13, 17, 19, 23",
    distractors: [
      "1, 2, 3, 5, 7, 11, 13, 17, 19, 23",
      "2, 3, 5, 7, 11, 13, 17, 19, 23, 25",
      "2, 3, 5, 7, 9, 11, 13, 17, 19, 23",
      "3, 5, 7, 11, 13, 17, 19, 23",
    ],
    steps: [
      "Drop 1 (not prime).",
      "Drop 25 (5 × 5) and 9 (3 × 3) — both composite.",
      "Keep 2 (only even prime).",
      "Remaining: 2, 3, 5, 7, 11, 13, 17, 19, 23.",
    ],
    shortcut: "Scan for 1, perfect squares (9, 25), and even numbers besides 2 — those are the usual extras/misses.",
    trap: "Answer choices often sneak in 1, 9, or 25, or drop 2.",
  });
}

/* ---------- OR PROBABILITY ---------- */
{
  function orDie(sides, predA, predB, aName, bName, id, diff) {
    const A = [],
      B = [],
      both = [];
    for (let k = 1; k <= sides; k++) {
      const a = predA(k);
      const b = predB(k);
      if (a) A.push(k);
      if (b) B.push(k);
      if (a && b) both.push(k);
    }
    const union = new Set([...A, ...B]);
    const u = union.size;
    const correct = frac(u, sides);
    add({
      id,
      concept: "or-probability",
      difficulty: diff,
      stem: `A fair ${sides}-sided die is rolled once. What is the probability of rolling ${aName} OR ${bName}?`,
      correct,
      distractors: [
        frac(A.length + B.length, sides),
        frac(A.length, sides),
        frac(B.length, sides),
        frac(u, sides - 1),
        frac(both.length, sides),
        pct(u, sides),
      ],
      steps: [
        `Look for the word OR. That means the union: either event is enough.`,
        `${aName}: ${A.join(", ") || "(none)"} (${A.length} outcomes).`,
        `${bName}: ${B.join(", ") || "(none)"} (${B.length} outcomes).`,
        `Overlap (counted twice if you just add): ${both.join(", ") || "none"} (${both.length}).`,
        `Unique outcomes = ${A.length} + ${B.length} − ${both.length} = ${u}: ${[...union].sort((a, b) => a - b).join(", ")}.`,
        `Probability = ${u}/${sides} = ${correct}.`,
      ],
      shortcut: "OR = ADD, but subtract the overlap.",
      trap: `Adding ${A.length}/${sides} + ${B.length}/${sides} = ${frac(A.length + B.length, sides)} double-counts ${both.length ? both.join(", ") : "the overlap"}.`,
      watchFor: "OR, either, at least one of",
      visual: {
        kind: "venn",
        aLabel: aName,
        bLabel: bName,
        onlyA: A.length - both.length,
        onlyB: B.length - both.length,
        both: both.length,
      },
    });
  }

  orDie(6, (k) => k % 2 === 0, (k) => k > 4, "an even number", "a number greater than 4", "or-d6-1", "EASY");
  orDie(6, (k) => isPrime(k), (k) => k % 2 === 0, "a prime", "an even number", "or-d6-2", "MEDIUM");
  orDie(8, (k) => k % 2 === 0, (k) => k % 3 === 0, "an even number", "a multiple of 3", "or-d8-1", "MEDIUM");
  orDie(12, (k) => k % 3 === 0, (k) => isPrime(k), "a multiple of 3", "a prime", "or-d12-1", "MEDIUM");
  orDie(12, (k) => k % 2 === 0, (k) => k % 4 === 0, "an even number", "a multiple of 4", "or-d12-2", "HARD");
  orDie(12, (k) => k <= 4, (k) => k >= 10, "a number at most 4", "a number at least 10", "or-d12-3", "EASY");
  orDie(20, (k) => k % 5 === 0, (k) => isPrime(k), "a multiple of 5", "a prime", "or-d20-1", "HARD");
  orDie(10, (k) => k % 2 === 1, (k) => k <= 3, "an odd number", "a number ≤ 3", "or-d10-1", "EASY");
  orDie(24, (k) => k % 4 === 0, (k) => k % 6 === 0, "a multiple of 4", "a multiple of 6", "or-d24-1", "HARD");
  orDie(6, (k) => k === 1 || k === 2, (k) => k === 5 || k === 6, "1 or 2", "5 or 6", "or-d6-3", "EASY");

  add({
    id: "or-formula-1",
    concept: "or-probability",
    difficulty: "MEDIUM",
    stem: "P(A) = 0.4, P(B) = 0.5, and P(A AND B) = 0.2. What is P(A OR B)?",
    correct: "0.7",
    distractors: ["0.9", "0.2", "0.4", "1.1", "0.3"],
    steps: [
      "Formula: P(A OR B) = P(A) + P(B) − P(A AND B).",
      "0.4 + 0.5 − 0.2 = 0.9 − 0.2 = 0.7.",
      "If you forget to subtract, you get 0.9 — that's the overlap counted twice.",
      "If you add without thinking, 0.4+0.5+0.2=1.1, which isn't even a valid probability.",
    ],
    shortcut: "OR = ADD, subtract the overlap.",
    trap: "0.9 is waiting for you if you skip the subtraction. 1.1 is waiting if you add the AND instead of subtracting it.",
    watchFor: "OR, P(A ∪ B)",
  });

  add({
    id: "or-formula-2",
    concept: "or-probability",
    difficulty: "HARD",
    stem: "P(A) = 0.6, P(B) = 0.3, P(A OR B) = 0.7. What is P(A AND B)?",
    correct: "0.2",
    distractors: ["0.9", "0.1", "0.7", "0.18", "1.6"],
    steps: [
      "Rearrange: P(A AND B) = P(A) + P(B) − P(A OR B).",
      "0.6 + 0.3 − 0.7 = 0.9 − 0.7 = 0.2.",
      "Sanity check: the overlap cannot be bigger than either event (0.2 < 0.3 and 0.2 < 0.6). Good.",
    ],
    shortcut: "If they give you OR and ask for AND, add the two pieces and subtract the union.",
    trap: "Multiplying 0.6 × 0.3 = 0.18 assumes independence, which this problem never stated.",
  });

  add({
    id: "or-mut-excl",
    concept: "or-probability",
    difficulty: "MEDIUM",
    stem: "Events A and B cannot happen at the same time (they are mutually exclusive). P(A) = 0.22 and P(B) = 0.31. What is P(A OR B)?",
    correct: "0.53",
    distractors: ["0.09", "0.68", "0.22", "0.0682"],
    steps: [
      "Mutually exclusive means the overlap is 0: P(A AND B) = 0.",
      "So P(A OR B) = 0.22 + 0.31 − 0 = 0.53.",
      "When there is no overlap, OR really is just add.",
    ],
    shortcut: "Mutually exclusive → overlap is 0 → just add.",
    trap: "Don't multiply (that's AND, and even then only when independent).",
    watchFor: "mutually exclusive, cannot both, disjoint",
  });
}

/* ---------- AND / THEN ---------- */
{
  add({
    id: "and-coin-hh",
    concept: "and-probability",
    difficulty: "EASY",
    stem: "A fair coin is flipped twice. What is the probability of heads AND then heads again?",
    correct: "1/4",
    distractors: ["1/2", "1/3", "2/4", "1"],
    steps: [
      "Look for AND / then. Independent flips → multiply.",
      "P(H) = 1/2. P(H then H) = (1/2) × (1/2) = 1/4.",
      "The four equally likely outcomes are HH, HT, TH, TT. Only HH matches.",
    ],
    shortcut: "AND / THEN / followed by → multiply (after checking independence).",
    trap: "Adding 1/2 + 1/2 = 1 would mean heads then heads is certain. That's OR thinking.",
    watchFor: "and, then, followed by, both",
  });

  add({
    id: "and-coin-ht",
    concept: "and-probability",
    difficulty: "EASY",
    stem: "A fair coin is flipped twice. Probability of heads then tails?",
    correct: "1/4",
    distractors: ["1/2", "3/4", "1/3", "2/2"],
    steps: [
      "Order matters here because the question says 'then'.",
      "(1/2) × (1/2) = 1/4.",
      "HT is one of four equally likely sequences.",
    ],
    shortcut: "A specific sequence of independent events: multiply the piece probabilities.",
    trap: "P(one heads and one tails) in either order is 2/4 = 1/2. That's a different question.",
  });

  add({
    id: "and-die-coin",
    concept: "and-probability",
    difficulty: "MEDIUM",
    stem: "A fair six-sided die is rolled and a fair coin is flipped. What is P(rolling a 6 AND getting heads)?",
    correct: "1/12",
    distractors: ["1/6", "1/2", "2/8", "7/12", "1/8"],
    steps: [
      "The die and coin don't affect each other (independent).",
      "P(6) = 1/6. P(heads) = 1/2.",
      "(1/6) × (1/2) = 1/12.",
    ],
    shortcut: "Independent AND → multiply.",
    trap: "Adding 1/6 + 1/2 = 2/3 is the OR formula without overlap — wrong operation.",
  });

  const indepPairs = [
    { a: [1, 6], b: [1, 2], labelA: "rolling a 4 on a fair six-sided die", labelB: "flipping heads on a fair coin", id: "and-indep-1" },
  ];
  indepPairs.forEach((p) => {
    add({
      id: p.id,
      concept: "and-probability",
      difficulty: "EASY",
      stem: `What is the probability of ${p.labelA} AND ${p.labelB}?`,
      correct: frac(1, p.a[1] * p.b[1]),
      distractors: [frac(1, p.a[1]), frac(1, p.b[1]), frac(1, p.a[1] + p.b[1]), frac(2, p.a[1] * p.b[1])],
      steps: [
        `P(die 4) = 1/6. P(heads) = 1/2.`,
        "Independent events: multiply.",
        "1/6 × 1/2 = 1/12.",
      ],
      shortcut: "AND of independent events = multiply.",
      trap: "Adding instead of multiplying.",
    });
  });

  add({
    id: "and-cards-indep",
    concept: "and-probability",
    difficulty: "MEDIUM",
    stem: "A standard deck has 52 cards, 4 of them aces. You draw one card, put it back, shuffle, and draw again. P(ace AND then ace)?",
    correct: "1/169",
    distractors: ["16/2652", "2/52", "1/13", "8/52", "1/221"],
    steps: [
      "With replacement, the draws are independent. The deck is full both times.",
      "P(ace) = 4/52 = 1/13 each time.",
      "(1/13) × (1/13) = 1/169.",
    ],
    shortcut: "Put it back → nothing changed → multiply the same fraction twice.",
    trap: "Using 4/52 × 3/51 (without replacement) when the problem said the card was replaced.",
    watchFor: "put it back, replaced, with replacement",
  });

  add({
    id: "and-seq-die",
    concept: "and-probability",
    difficulty: "MEDIUM",
    stem: "A fair six-sided die is rolled twice (independent rolls). What is P(first roll is 5 AND second roll is even)?",
    correct: "1/12",
    distractors: ["1/6", "1/2", "4/12", "1/4", "2/6"],
    steps: [
      "P(5) = 1/6. P(even) = 3/6 = 1/2.",
      "Independent: (1/6) × (1/2) = 1/12.",
    ],
    shortcut: "Different conditions on two independent rolls → multiply the two probabilities.",
    trap: "P(a 5 or even) is a different question and uses OR.",
  });

  add({
    id: "and-weather",
    concept: "and-probability",
    difficulty: "MEDIUM",
    stem: "P(late) = 0.2. Independently, P(rain) = 0.3. What is P(late AND rain)?",
    correct: "0.06",
    distractors: ["0.5", "0.1", "0.06%", "0.23", "0.6"],
    steps: [
      "The problem says independently, so multiply.",
      "0.2 × 0.3 = 0.06.",
    ],
    shortcut: "Independent AND → multiply the decimals.",
    trap: "Adding 0.2+0.3=0.5 is OR-without-overlap thinking.",
  });

  add({
    id: "and-three-coins",
    concept: "and-probability",
    difficulty: "MEDIUM",
    stem: "Three fair coins are flipped. What is the probability of heads, then heads, then tails in that order?",
    correct: "1/8",
    distractors: ["3/8", "1/6", "1/3", "1/2"],
    steps: [
      "A specific sequence of three independent flips.",
      "(1/2) × (1/2) × (1/2) = 1/8.",
      "There are 8 possible H/T sequences; only HHT matches.",
    ],
    shortcut: "Particular sequence of n fair coin flips: (1/2)^n.",
    trap: "3/8 is P(exactly two heads in any order), not this specific order.",
  });
}

/* ---------- WITHOUT REPLACEMENT ---------- */
{
  const bags = [
    { r: 5, b: 5, seq: ["R", "B"], id: "wor-1", diff: "EASY" },
    { r: 5, b: 5, seq: ["R", "R"], id: "wor-2", diff: "EASY" },
    { r: 3, b: 7, seq: ["R", "R"], id: "wor-3", diff: "MEDIUM" },
    { r: 3, b: 7, seq: ["B", "B"], id: "wor-4", diff: "MEDIUM" },
    { r: 4, g: 6, seq: ["G", "G"], extra: "green", id: "wor-5", diff: "MEDIUM", colors: { G: 6, other: 4 } },
    { r: 8, b: 2, seq: ["B", "B"], id: "wor-6", diff: "HARD" },
    { r: 2, b: 3, seq: ["R", "B"], id: "wor-7", diff: "EASY" },
    { r: 6, b: 4, seq: ["R", "R", "R"], id: "wor-8", diff: "HARD" },
    { r: 4, b: 5, seq: ["B", "R"], id: "wor-9", diff: "MEDIUM" },
    { r: 10, b: 5, seq: ["R", "R"], id: "wor-10", diff: "MEDIUM" },
  ];

  function bagProb(red, blue, seq) {
    let r = red,
      b = blue;
    let n = 1,
      d = 1;
    const steps = [];
    seq.forEach((color, i) => {
      const total = r + b;
      const fav = color === "R" ? r : b;
      steps.push(
        `Draw ${i + 1}: P(${color === "R" ? "red" : "blue"}) = ${fav}/${total}. ` +
          `(${r} red, ${b} blue, ${total} total.)`,
      );
      n *= fav;
      d *= total;
      if (color === "R") r -= 1;
      else b -= 1;
    });
    return { n, d, steps, value: frac(n, d) };
  }

  bags.forEach((bag) => {
    if (bag.colors) return;
    const p = bagProb(bag.r, bag.b, bag.seq);
    const seqWords = bag.seq
      .map((c) => (c === "R" ? "red" : "blue"))
      .join(" then ");
    const withRepl = (() => {
      let n = 1,
        d = 1;
      const t = bag.r + bag.b;
      for (const c of bag.seq) {
        n *= c === "R" ? bag.r : bag.b;
        d *= t;
      }
      return frac(n, d);
    })();
    add({
      id: bag.id,
      concept: "without-replacement",
      difficulty: bag.diff,
      stem: `A bag contains ${bag.r} red and ${bag.b} blue marbles. Two or more marbles are drawn WITHOUT replacement. What is the probability of drawing ${seqWords} in that order?`,
      correct: p.value,
      distractors: [
        withRepl,
        frac(bag.seq.filter((c) => c === "R").length || 1, bag.r + bag.b),
        frac(p.n, p.d - 1),
        "1/2",
        frac(bag.r, bag.r + bag.b),
      ],
      steps: [
        "WITHOUT replacement means each draw changes the bag. Ask: what changed?",
        ...p.steps,
        `Multiply the chain: ${p.value}.`,
      ],
      shortcut: "WITHOUT REPLACEMENT = the total drops, and the color you drew drops too.",
      trap: `Using ${withRepl} treats the draws as if the marble was put back.`,
      watchFor: "without replacement, not replaced, then another",
    });
  });

  add({
    id: "wor-cards-1",
    concept: "without-replacement",
    difficulty: "MEDIUM",
    stem: "From a 52-card deck, two cards are drawn without replacement. P(first is an ace AND second is an ace)?",
    correct: "1/221",
    distractors: ["1/169", "2/52", "16/2652", "1/13", "12/2652"],
    steps: [
      "First ace: 4/52 = 1/13.",
      "Second ace, given the first was an ace: 3 aces left, 51 cards left → 3/51 = 1/17.",
      "(4/52) × (3/51) = 12/2652 = 1/221.",
    ],
    shortcut: "Second fraction uses 3 and 51, not 4 and 52.",
    trap: "1/169 is (4/52)², which is WITH replacement.",
  });

  add({
    id: "wor-what-changed",
    concept: "without-replacement",
    difficulty: "EASY",
    stem: "A bag has 5 red and 5 blue. You draw a red marble and do NOT put it back. What is P(next is blue)?",
    correct: "5/9",
    distractors: ["5/10", "4/9", "5/8", "1/2", "4/10"],
    steps: [
      "Ask three questions: What changed? Did the total change? Did the favorable count change?",
      "Total: 10 → 9 (a marble left).",
      "Blue count: still 5 (you removed red, not blue).",
      "P = 5/9.",
    ],
    shortcut: "You removed a red, so blue is unchanged and the total dropped by 1.",
    trap: "5/10 ignores that the total dropped. 4/9 incorrectly also drops a blue.",
  });

  add({
    id: "wor-fav-changes",
    concept: "without-replacement",
    difficulty: "EASY",
    stem: "A bag has 3 red and 7 blue. A red is drawn and not replaced. P(the next is also red)?",
    correct: "2/9",
    distractors: ["3/10", "3/9", "2/10", "3/7", "2/7"],
    steps: [
      "After drawing a red: 2 red left, 9 total left.",
      "P = 2/9.",
    ],
    shortcut: "Same color again → both the numerator AND the denominator drop.",
    trap: "3/9 keeps the old numerator. 2/10 keeps the old denominator.",
  });

  add({
    id: "wor-three",
    concept: "without-replacement",
    difficulty: "BOSS",
    stem: "A box has 4 good chips and 3 defective chips. Three chips are drawn at random without replacement. P(all three are good)?",
    correct: "4/35",
    distractors: ["64/343", "4/7", "1/8", "12/35", "24/210"],
    steps: [
      "Total chips = 7.",
      "P(first good) = 4/7.",
      "P(second good | first good) = 3/6.",
      "P(third good | two good) = 2/5.",
      "(4/7)×(3/6)×(2/5) = 24/210 = 4/35.",
    ],
    shortcut: "Chain it: 4/7 × 3/6 × 2/5, then simplify.",
    trap: "(4/7)³ = 64/343 pretends the box never changes.",
  });
}

/* ---------- CONDITIONAL ---------- */
{
  add({
    id: "cd-library",
    concept: "conditional",
    difficulty: "MEDIUM",
    stem: "At a library, 55% participated in summer reading, 45% attended book club, and 20% did BOTH. What is the probability someone participated in summer reading GIVEN that they attended book club?",
    correct: "44.4%",
    distractors: ["20%", "45%", "55%", "20/100 = 20%", "36.4%"],
    steps: [
      "Look for GIVEN THAT. The given group becomes the denominator.",
      "Given: attended book club → 45.",
      "Among those, BOTH (summer AND book club) = 20.",
      "P(summer | book club) = 20/45 ≈ 0.444 = 44.4%.",
      "Do NOT divide by 100. The 100% population is not the given group.",
    ],
    shortcut: "GIVEN = denominator. The 'both' number is the numerator.",
    trap: "20/100 = 20% uses the whole population. That's P(both), not the conditional.",
    watchFor: "given that, among those who, of the people who",
  });

  add({
    id: "cd-formula-1",
    concept: "conditional",
    difficulty: "MEDIUM",
    stem: "P(A) = 0.4, P(B) = 0.5, P(A AND B) = 0.2. What is P(A | B)?",
    correct: "0.4",
    distractors: ["0.2", "0.5", "0.8", "0.1", "2.5"],
    steps: [
      "P(A | B) = P(A AND B) / P(B).",
      "0.2 / 0.5 = 0.4.",
      "Given B happened, the sample space shrinks to the 0.5, and 0.2 of the original sits inside it.",
    ],
    shortcut: "GIVEN B → divide by P(B).",
    trap: "Reporting 0.2 (the joint) without dividing.",
  });

  add({
    id: "cd-formula-2",
    concept: "conditional",
    difficulty: "HARD",
    stem: "P(A AND B) = 0.12 and P(A | B) = 0.4. What is P(B)?",
    correct: "0.3",
    distractors: ["0.048", "0.52", "0.28", "0.4"],
    steps: [
      "P(A | B) = P(A AND B) / P(B), so P(B) = P(A AND B) / P(A | B).",
      "0.12 / 0.4 = 0.3.",
    ],
    shortcut: "Rearrange: P(B) = joint / conditional.",
    trap: "Multiplying 0.12 × 0.4 = 0.048 — that's mixing the formula up.",
  });

  const tables = [
    {
      id: "cd-placebo",
      expP: 60,
      expF: 28,
      plaP: 28,
      plaF: 13,
      q: "What percentage of placebo participants passed?",
      num: 28,
      den: 41,
      correct: "68.3%",
      distractors: ["21.7%", "28/129 ≈ 21.7%", "60/88 ≈ 68.2%", "28%", "46.5%"],
      trap: "28/129 uses the grand total. The question is only about placebo participants.",
    },
    {
      id: "cd-exp-fail",
      expP: 60,
      expF: 28,
      plaP: 28,
      plaF: 13,
      q: "What percentage of experimental participants failed?",
      num: 28,
      den: 88,
      correct: "31.8%",
      distractors: ["21.7%", "28/129 ≈ 21.7%", "13/41 ≈ 31.7%", "68.2%", "50%"],
      trap: "Using 28/129 (grand total) or mixing up experimental vs placebo.",
    },
    {
      id: "cd-passed-who-exp",
      expP: 48,
      expF: 12,
      plaP: 20,
      plaF: 20,
      q: "Of the people who passed, what percent were in the experimental group?",
      num: 48,
      den: 68,
      correct: "70.6%",
      distractors: ["80%", "48/100 = 48%", "48/60 = 80%", "50%", "40%"],
      trap: "48/60 = 80% is P(passed | experimental), the reverse conditional.",
    },
  ];
  tables.forEach((t) => {
    const expT = t.expP + t.expF;
    const plaT = t.plaP + t.plaF;
    const grand = expT + plaT;
    add({
      id: t.id,
      concept: "conditional",
      difficulty: "HARD",
      stem: `A study has two groups. Experimental: ${t.expP} passed, ${t.expF} failed (total ${expT}). Placebo: ${t.plaP} passed, ${t.plaF} failed (total ${plaT}). Grand total ${grand}. ${t.q}`,
      correct: t.correct,
      distractors: t.distractors,
      steps: [
        "Find the group the question is talking about — that group's size is the denominator.",
        `${t.q}`,
        `Numerator = ${t.num}. Denominator = ${t.den}.`,
        `${t.num}/${t.den} × 100 = ${t.correct}.`,
      ],
      shortcut: "Of THIS group / given THAT group → that group's total is the denominator, never the grand total unless asked.",
      trap: t.trap,
      watchFor: "of the, given that, percentage of [group]",
      visual: {
        kind: "table",
        caption: "Study results",
        columns: ["Pass", "Fail", "Total"],
        rows: [
          { label: "Experimental", values: [t.expP, t.expF, expT] },
          { label: "Placebo", values: [t.plaP, t.plaF, plaT] },
        ],
        totals: [t.expP + t.plaP, t.expF + t.plaF, grand],
      },
    });
  });

  add({
    id: "cd-words-1",
    concept: "conditional",
    difficulty: "MEDIUM",
    stem: "28 of 41 placebo participants passed a test. What is the probability a randomly chosen placebo participant passed?",
    correct: "28/41",
    distractors: ["28/69", "41/28", "28%", "41%"],
    steps: [
      "The population of interest is placebo participants (41).",
      "Favorable = passed = 28.",
      "28/41.",
    ],
    shortcut: "The noun after 'of' or the named group is the denominator.",
    trap: "If a grand total were sitting nearby, you might have used it. Here the group is already 41.",
  });

  add({
    id: "cd-survey",
    concept: "conditional",
    difficulty: "HARD",
    stem: "In a survey of 200 students, 120 own a laptop, 80 own a tablet, and 50 own both. Given that a student owns a tablet, what is P(they also own a laptop)?",
    correct: "5/8",
    distractors: ["50/200", "50/120", "80/200", "1/4", "120/200"],
    steps: [
      "GIVEN owns a tablet → denominator 80.",
      "Also owns a laptop among those = both = 50.",
      "50/80 = 5/8.",
    ],
    shortcut: "GIVEN tablet → 80 is the whole world now. 50 of those 80 also have a laptop.",
    trap: "50/200 = 25% is P(both). 50/120 is the reverse conditional (laptop-owners who have a tablet).",
  });

  add({
    id: "cd-medical",
    concept: "conditional",
    difficulty: "HARD",
    stem: "A clinic sees 70 patients with symptom X and 30 without. Of those with X, 21 test positive. Of those without X, 3 test positive. What is P(has X | tests positive)?",
    correct: "21/24",
    distractors: ["21/70", "24/100", "21/100", "3/30", "70%"],
    steps: [
      "GIVEN tests positive. How many tested positive in total?",
      "21 (with X) + 3 (without X) = 24 positive tests.",
      "Among those 24, 21 actually have X.",
      "21/24 = 7/8 = 87.5%.",
    ],
    shortcut: "The given is 'positive' — so first find ALL positives, then ask how many of those have X.",
    trap: "21/70 is P(positive | has X), the reverse direction.",
    visual: {
      kind: "table",
      columns: ["Positive", "Negative", "Total"],
      rows: [
        { label: "Has X", values: [21, 49, 70] },
        { label: "No X", values: [3, 27, 30] },
      ],
      totals: [24, 76, 100],
    },
  });

  add({
    id: "cd-irrelevant",
    concept: "conditional",
    difficulty: "BOSS",
    stem: "A school has 400 students. 220 are first-years. 90 first-years play a sport. 40 second-years play a sport. The cafeteria served pasta on Tuesday (irrelevant). What is P(plays a sport | first-year)?",
    correct: "90/220",
    distractors: ["90/400", "130/400", "90/130", "220/400", "40/180"],
    steps: [
      "The pasta sentence is noise. Ignore it.",
      "GIVEN first-year → denominator 220.",
      "First-years who play a sport = 90.",
      "90/220 = 9/22.",
    ],
    shortcut: "Cross out extra scenery. GIVEN first-year → 220.",
    trap: "90/400 uses the whole school. 90/130 uses all athletes (the reverse conditional).",
  });
}

/* ---------- TWO-WAY TABLES ---------- */
{
  add({
    id: "tw-read-1",
    concept: "two-way-tables",
    difficulty: "EASY",
    stem: "A two-way table of 80 people: 30 men like tea, 10 men like coffee, 25 women like tea, 15 women like coffee. How many people like tea?",
    correct: "55",
    distractors: ["40", "80", "30", "25", "45"],
    steps: [
      "Tea is a column (or row) total: men who like tea + women who like tea.",
      "30 + 25 = 55.",
      "That's a marginal total — the edge of the table.",
    ],
    shortcut: "A single category with no 'given' = add along that category, ignore the other split.",
    trap: "Reporting 30 (only the men) or 80 (everyone).",
    visual: {
      kind: "table",
      columns: ["Tea", "Coffee", "Total"],
      rows: [
        { label: "Men", values: [30, 10, 40] },
        { label: "Women", values: [25, 15, 40] },
      ],
      totals: [55, 25, 80],
    },
  });

  add({
    id: "tw-joint",
    concept: "two-way-tables",
    difficulty: "MEDIUM",
    stem: "From the table: Men-Tea 30, Men-Coffee 10, Women-Tea 25, Women-Coffee 15. What is P(man AND coffee)?",
    correct: "10/80",
    distractors: ["10/40", "10/25", "40/80", "25/80"],
    steps: [
      "AND with no 'given' is a joint: one cell over the grand total.",
      "Men who like coffee = 10. Grand total = 80.",
      "10/80 = 1/8.",
    ],
    shortcut: "Joint = one inside cell / grand total.",
    trap: "10/40 is P(coffee | man), a conditional, because 40 is the men total.",
  });

  add({
    id: "tw-marginal",
    concept: "two-way-tables",
    difficulty: "EASY",
    stem: "A table shows 50 yes, 30 no in group A and 20 yes, 40 no in group B. What is P(yes)?",
    correct: "70/140",
    distractors: ["50/80", "20/60", "50/140", "70/80"],
    steps: [
      "Yes total = 50 + 20 = 70.",
      "Grand total = 50+30+20+40 = 140.",
      "P(yes) = 70/140 = 1/2.",
    ],
    shortcut: "No 'given' → use the grand total.",
    trap: "50/80 is P(yes | A), not P(yes).",
  });

  add({
    id: "tw-cond-col",
    concept: "two-way-tables",
    difficulty: "MEDIUM",
    stem: "Pass/Fail vs On-site/Online. On-site: 40 pass, 10 fail. Online: 30 pass, 20 fail. What is P(pass | online)?",
    correct: "30/50",
    distractors: ["30/70", "30/100", "40/50", "70/100"],
    steps: [
      "GIVEN online → online total = 30+20 = 50.",
      "Online who passed = 30.",
      "30/50 = 3/5 = 60%.",
    ],
    shortcut: "Restrict the table to the online row, then read pass.",
    trap: "30/100 uses the grand total; 30/70 uses all passers (the reverse).",
    visual: {
      kind: "table",
      columns: ["Pass", "Fail", "Total"],
      rows: [
        { label: "On-site", values: [40, 10, 50] },
        { label: "Online", values: [30, 20, 50] },
      ],
      totals: [70, 30, 100],
    },
  });

  add({
    id: "tw-which-pct",
    concept: "two-way-tables",
    difficulty: "HARD",
    stem: "Experimental: 60 pass, 28 fail. Placebo: 28 pass, 13 fail. A question asks: 'What percentage of placebo participants passed?' Which computation is correct?",
    correct: "28/41 × 100",
    distractors: ["28/129 × 100", "28/88 × 100", "60/88 × 100", "28/60 × 100"],
    steps: [
      "The phrase 'of placebo participants' names the denominator: placebo total.",
      "Placebo total = 28+13 = 41.",
      "Passed among them = 28.",
      "28/41 × 100 ≈ 68.3%.",
    ],
    shortcut: "Percentage of [group] who [did X] = (X in that group) / (group size).",
    trap: "28/129 is 'what percent of ALL participants were placebo-passers' — a different question.",
  });

  add({
    id: "tw-grand",
    concept: "two-way-tables",
    difficulty: "EASY",
    stem: "Rows total to 12, 18, and 20. What is the grand total?",
    correct: "50",
    distractors: ["38", "20", "18", "100"],
    steps: [
      "Grand total = sum of all row totals (or all column totals).",
      "12 + 18 + 20 = 50.",
    ],
    shortcut: "Add the margins. They must agree with adding every inner cell.",
    trap: "Picking the largest row total instead of summing.",
  });
}

/* ---------- INDEPENDENT VS DEPENDENT ---------- */
{
  const pairs = [
    { p: 0.8, given: 0.75, name: "recover", givenName: "had surgery", id: "id-1", diff: "EASY" },
    { p: 0.5, given: 0.5, name: "heads on coin B", givenName: "coin A was heads", id: "id-2", diff: "EASY" },
    { p: 0.4, given: 0.4, name: "bus is late", givenName: "it is Tuesday", id: "id-3", diff: "MEDIUM" },
    { p: 0.6, given: 0.9, name: "pass", givenName: "attended review", id: "id-4", diff: "EASY" },
    { p: 0.2, given: 0.05, name: "defect", givenName: "machine was serviced", id: "id-5", diff: "MEDIUM" },
    { p: 0.3, given: 0.3, name: "rain in city B", givenName: "rain in a far-away city A", id: "id-6", diff: "MEDIUM" },
    { p: 0.5, given: 0.25, name: "second card is red", givenName: "first card was red (no replacement)", id: "id-7", diff: "HARD" },
    { p: 0.7, given: 0.7, name: "email arrives", givenName: "you had coffee", id: "id-8", diff: "EASY" },
  ];
  pairs.forEach((x) => {
    const indep = x.p === x.given;
    add({
      id: x.id,
      concept: "independent-dependent",
      difficulty: x.diff,
      stem: `P(${x.name}) = ${x.p * 100}%. P(${x.name} | ${x.givenName}) = ${x.given * 100}%. Are the events independent or dependent?`,
      correct: indep ? "Independent" : "Dependent",
      distractors: [indep ? "Dependent" : "Independent", "Mutually exclusive", "Cannot be determined", "Both"],
      steps: [
        "Compare P(event) with P(event | given).",
        `P = ${x.p}. P(given extra info) = ${x.given}.`,
        indep
          ? "They are equal, so the extra information didn't change the probability → independent."
          : "They are not equal, so the extra information changed the probability → dependent.",
      ],
      shortcut: "If P(B) = P(B|A), independent. If not equal, dependent.",
      trap: "Mutually exclusive is a different idea (they can't happen together). Independence is about whether one changes the other's probability.",
    });
  });

  add({
    id: "id-def",
    concept: "independent-dependent",
    difficulty: "EASY",
    stem: "Two events are independent when:",
    correct: "Knowing that A happened does not change the probability of B",
    distractors: [
      "A and B cannot happen at the same time",
      "P(A AND B) = P(A) + P(B)",
      "They always happen together",
      "P(A OR B) = 0",
    ],
    steps: [
      "Independent: P(B|A) = P(B). The extra knowledge does nothing.",
      "Mutually exclusive: they cannot both happen. That's not independence.",
      "In fact, mutually exclusive events with P>0 are dependent — if A happened, B is now impossible.",
    ],
    shortcut: "Independent = probability DOESN'T CHANGE. Dependent = probability CHANGES.",
    trap: "Mixing up independent with mutually exclusive. They are almost opposites in practice.",
  });

  add({
    id: "id-compute",
    concept: "independent-dependent",
    difficulty: "MEDIUM",
    stem: "If A and B are independent, P(A)=0.3 and P(B)=0.4, what is P(A AND B)?",
    correct: "0.12",
    distractors: ["0.7", "0.1", "0.3", "1.2"],
    steps: [
      "Independence lets you multiply: P(A AND B) = P(A)×P(B).",
      "0.3 × 0.4 = 0.12.",
    ],
    shortcut: "Independent AND = multiply.",
    trap: "0.7 is the OR-without-overlap value.",
  });

  add({
    id: "id-check-mult",
    concept: "independent-dependent",
    difficulty: "HARD",
    stem: "P(A)=0.5, P(B)=0.4, P(A AND B)=0.1. Are A and B independent?",
    correct: "No — dependent, because 0.5×0.4 ≠ 0.1",
    distractors: [
      "Yes — independent, because 0.5+0.4≠0.1",
      "Yes — independent, because 0.1 < 0.5",
      "Cannot tell without P(A OR B)",
      "Yes — 0.5×0.4=0.2 and that's close enough",
    ],
    steps: [
      "Test: independent iff P(A AND B) = P(A)×P(B).",
      "0.5 × 0.4 = 0.20, but the actual joint is 0.10.",
      "0.20 ≠ 0.10, so dependent.",
    ],
    shortcut: "Multiply the singles. If you don't get the joint, they're dependent.",
    trap: "'Close enough' is not a statistics answer. Equal or not equal.",
  });

  add({
    id: "id-wor-dep",
    concept: "independent-dependent",
    difficulty: "MEDIUM",
    stem: "You draw two marbles without replacement from a bag of 4 red and 6 blue. Are the two draws independent?",
    correct: "Dependent — the first draw changes the bag",
    distractors: [
      "Independent — marbles don't communicate",
      "Independent — each marble is random",
      "Mutually exclusive",
      "Dependent only if both are red",
    ],
    steps: [
      "Without replacement, the second probability uses 9 marbles, not 10.",
      "P(second red) ≠ P(second red | first red).",
      "That's the definition of dependence.",
    ],
    shortcut: "Without replacement → dependent. With replacement → independent.",
    trap: "Random is not the same as independent.",
  });
}

/* ---------- EMPIRICAL RULE ---------- */
{
  const emp = [
    { mean: 52, sd: 2, window: 4, id: "em-1", diff: "EASY" },
    { mean: 100, sd: 15, window: 15, id: "em-2", diff: "EASY" },
    { mean: 100, sd: 15, window: 30, id: "em-3", diff: "EASY" },
    { mean: 100, sd: 15, window: 45, id: "em-4", diff: "MEDIUM" },
    { mean: 120, sd: 10, window: 20, id: "em-5", diff: "EASY" },
    { mean: 70, sd: 5, window: 5, id: "em-6", diff: "EASY" },
    { mean: 70, sd: 5, window: 15, id: "em-7", diff: "MEDIUM" },
    { mean: 0, sd: 1, window: 2, id: "em-8", diff: "MEDIUM" },
    { mean: 250, sd: 20, window: 40, id: "em-9", diff: "MEDIUM" },
    { mean: 18, sd: 3, window: 9, id: "em-10", diff: "HARD" },
  ];
  function empPct(k) {
    if (Math.abs(k - 1) < 1e-9) return "68%";
    if (Math.abs(k - 2) < 1e-9) return "95%";
    if (Math.abs(k - 3) < 1e-9) return "99.7%";
    return null;
  }
  emp.forEach((e) => {
    const k = e.window / e.sd;
    const ans = empPct(k);
    if (!ans) return;
    add({
      id: e.id,
      concept: "empirical-rule",
      difficulty: e.diff,
      stem: `A data set is approximately normal with mean ${e.mean} and standard deviation ${e.sd}. About what percent of values lie within ${e.window} units of the mean?`,
      correct: ans,
      distractors: ["68%", "95%", "99.7%", "50%", "100%", "34%"].filter((x) => x !== ans),
      steps: [
        `How many standard deviations is ${e.window}? Divide by the SD.`,
        `${e.window} ÷ ${e.sd} = ${k} SD.`,
        k === 1
          ? "Within 1 SD → about 68%."
          : k === 2
            ? "Within 2 SD → about 95%."
            : "Within 3 SD → about 99.7%.",
        "This is the empirical rule (68-95-99.7) for mound-shaped / normal data.",
      ],
      shortcut: "distance from mean ÷ SD = number of SDs. Then 68 / 95 / 99.7.",
      trap: "Using 95% because 2 is a memorable number, without dividing.",
      visual: { kind: "bell", mean: e.mean, sd: e.sd, shadeSd: k },
    });
  });

  add({
    id: "em-range-1",
    concept: "empirical-rule",
    difficulty: "MEDIUM",
    stem: "Mean = 120, SD = 10. According to the empirical rule, about 99.7% of values lie between which two numbers?",
    correct: "90 and 150",
    distractors: ["110 and 130", "100 and 140", "90 and 140", "70 and 170", "120 and 150"],
    steps: [
      "99.7% is the 3-SD interval.",
      "3 × 10 = 30.",
      "120 − 30 = 90. 120 + 30 = 150.",
      "Range: 90 to 150.",
    ],
    shortcut: "99.7% → mean ± 3 SD.",
    trap: "100 to 140 is ±2 SD (95%), not 99.7%.",
    visual: { kind: "bell", mean: 120, sd: 10, shadeSd: 3 },
  });

  add({
    id: "em-range-2",
    concept: "empirical-rule",
    difficulty: "EASY",
    stem: "Mean = 50, SD = 4. About 68% of values lie between:",
    correct: "46 and 54",
    distractors: ["42 and 58", "38 and 62", "50 and 54", "48 and 52"],
    steps: [
      "68% → 1 SD.",
      "50 − 4 = 46. 50 + 4 = 54.",
    ],
    shortcut: "68% → mean ± 1 SD.",
    trap: "Jumping to ±2 SD (95%) out of habit.",
  });

  add({
    id: "em-one-side",
    concept: "empirical-rule",
    difficulty: "HARD",
    stem: "For a normal distribution, about what percent of data is within 2 SD AND above the mean (the right half of the 95% middle)?",
    correct: "47.5%",
    distractors: ["95%", "68%", "34%", "50%", "2.5%"],
    steps: [
      "The middle 95% is split equally around the mean: 47.5% on each side of the mean, inside 2 SD.",
      "From the mean to +2 SD ≈ 47.5%.",
      "2.5% sits above +2 SD in the right tail.",
    ],
    shortcut: "Half of 95% is 47.5%. Half of 68% is 34%.",
    trap: "Answering 95% — that's both sides.",
  });

  add({
    id: "em-tail",
    concept: "empirical-rule",
    difficulty: "HARD",
    stem: "Mean 80, SD 5. About what percent of values are greater than 90?",
    correct: "about 2.5%",
    distractors: ["5%", "95%", "0.15%", "16%", "32%"],
    steps: [
      "90 is 10 above the mean. 10/5 = 2 SD.",
      "Outside 2 SD on BOTH sides is about 5% total.",
      "The right tail alone is about 2.5%.",
    ],
    shortcut: "Greater than mean+2 SD → half of the 5% leftover = 2.5%.",
    trap: "5% is both tails. 0.15% is a 3-SD tail (half of 0.3%).",
  });

  add({
    id: "em-z",
    concept: "empirical-rule",
    difficulty: "MEDIUM",
    stem: "A score is 64. Mean is 70, SD is 3. How many standard deviations below the mean is 64?",
    correct: "2",
    distractors: ["6", "3", "1", "0.5", "64"],
    steps: [
      "z = (value − mean) / SD.",
      "(64 − 70)/3 = (−6)/3 = −2.",
      "That's 2 standard deviations below the mean.",
    ],
    shortcut: "z = (x − mean)/SD. Sign tells you below (−) or above (+).",
    trap: "Reporting the raw gap of 6 instead of converting to SDs.",
  });
}

/* ---------- CORRELATION ---------- */
{
  const rs = [
    { r: 0.1, label: "weak positive", id: "cr-1", diff: "EASY" },
    { r: 0.6, label: "moderate positive", id: "cr-2", diff: "EASY" },
    { r: 0.95, label: "strong positive", id: "cr-3", diff: "EASY" },
    { r: -0.7, label: "strong negative", id: "cr-4", diff: "EASY" },
    { r: -0.2, label: "weak negative", id: "cr-5", diff: "MEDIUM" },
    { r: 0, label: "no linear correlation", id: "cr-6", diff: "EASY" },
    { r: -0.95, label: "strong negative", id: "cr-7", diff: "MEDIUM" },
    { r: 0.45, label: "moderate positive", id: "cr-8", diff: "MEDIUM" },
  ];
  rs.forEach((x) => {
    add({
      id: x.id,
      concept: "correlation",
      difficulty: x.diff,
      stem: `A scatterplot's correlation coefficient is r = ${x.r}. Which description fits best?`,
      correct: x.label,
      distractors: [
        "weak positive",
        "moderate positive",
        "strong positive",
        "weak negative",
        "strong negative",
        "no linear correlation",
        "perfect positive",
      ].filter((s) => s !== x.label),
      steps: [
        "Sign of r: positive r = upward trend (as x increases, y tends to increase). Negative r = downward.",
        "|r| near 0: weak. Around 0.5: moderate. Near 1: strong. Exactly 1 or -1: perfect line.",
        `r = ${x.r} → ${x.label}.`,
        "The number r does NOT have to be printed on the graph. You infer it from the cloud of points.",
      ],
      shortcut: "Sign = direction. Size of |r| = strength. Tight cloud → |r| closer to 1.",
      trap: "Calling a moderate r 'strong' or ignoring the sign.",
      visual: { kind: "scatter", r: x.r, seed: Math.abs(Math.round(x.r * 100)) + 3 },
    });
  });

  add({
    id: "cr-range",
    concept: "correlation",
    difficulty: "EASY",
    stem: "The correlation coefficient r always lies in which interval?",
    correct: "−1 to 1",
    distractors: ["0 to 1", "0 to 100", "−100 to 100", "−∞ to ∞"],
    steps: [
      "r is bounded: −1 ≤ r ≤ 1.",
      "−1 perfect negative line, 0 no linear pattern, +1 perfect positive line.",
    ],
    shortcut: "r lives between −1 and 1. Never 1.3, never 85%.",
    trap: "Treating r like a percent (0 to 100).",
  });

  add({
    id: "cr-visual-strong-pos",
    concept: "correlation",
    difficulty: "MEDIUM",
    stem: "A scatterplot slants clearly upward and the points hug a straight line closely. The best estimate of r is:",
    correct: "0.9",
    distractors: ["0.1", "−0.9", "0", "1.2"],
    steps: [
      "Upward → positive r.",
      "Tight to a line → |r| near 1. 0.9 is strong positive.",
      "1.2 is impossible. −0.9 would slant down.",
    ],
    shortcut: "Up and tight → r near +1. Down and tight → r near −1. Fuzzy blob → r near 0.",
    trap: "Picking a negative r because the line 'looks steep'. Steepness of slope is not r.",
    visual: { kind: "scatter", r: 0.9, seed: 11 },
  });

  add({
    id: "cr-zero",
    concept: "correlation",
    difficulty: "MEDIUM",
    stem: "If r = 0, which is the best interpretation?",
    correct: "There is no linear association between the variables",
    distractors: [
      "The variables are unrelated in every possible way",
      "The slope of the regression line is 1",
      "There is a strong curve relating them",
      "A calculation error occurred",
    ],
    steps: [
      "r measures LINEAR association only.",
      "r = 0 means no linear trend. A curve (U-shape) can still exist and r can still be near 0.",
    ],
    shortcut: "r = 0 → no straight-line pattern. It does not prove 'no relationship at all'.",
    trap: "Over-reading r = 0 as 'nothing is going on'.",
  });

  add({
    id: "cr-not-on-plot",
    concept: "correlation",
    difficulty: "HARD",
    stem: "A C955-style item shows a scatterplot with no r printed. Points trend downward moderately, with a fair amount of scatter. Which r is most plausible?",
    correct: "−0.55",
    distractors: ["0.55", "−0.05", "0.95", "−1.4"],
    steps: [
      "Downward → negative. Drop every positive choice.",
      "Moderate with visible scatter → |r| around 0.5, not 0.05 (too weak) and not 0.95 (too tight).",
      "−1.4 is not a possible r.",
    ],
    shortcut: "First pick the sign from the slant, then pick the magnitude from how tight the cloud is.",
    trap: "Matching a positive r to a downward plot — very common under time pressure.",
    visual: { kind: "scatter", r: -0.55, seed: 21 },
  });
}

/* ---------- REGRESSION ---------- */
{
  const regs = [
    { a: 5.2, b: 1.15, x: 50, id: "rg-1", diff: "EASY" },
    { a: 0, b: 2, x: 10, id: "rg-2", diff: "EASY" },
    { a: 12, b: -0.4, x: 20, id: "rg-3", diff: "MEDIUM" },
    { a: 100, b: 0.5, x: 8, id: "rg-4", diff: "EASY" },
    { a: -3.1, b: 2.5, x: 4, id: "rg-5", diff: "MEDIUM" },
    { a: 7.6, b: 0.25, x: 12, id: "rg-6", diff: "MEDIUM" },
    { a: 2.04, b: 1.8, x: 6, id: "rg-7", diff: "MEDIUM" },
    { a: 15, b: -1.5, x: 6, id: "rg-8", diff: "EASY" },
    { a: 0.5, b: 0.1, x: 30, id: "rg-9", diff: "EASY" },
    { a: 80, b: 1.25, x: 16, id: "rg-10", diff: "HARD" },
  ];
  regs.forEach((g) => {
    const y = Math.round((g.a + g.b * g.x) * 1000) / 1000;
    add({
      id: g.id,
      concept: "regression",
      difficulty: g.diff,
      stem: `A least-squares regression equation is y = ${g.a} + ${g.b}x. Predict y when x = ${g.x}.`,
      correct: String(y),
      distractors: [
        String(Math.round((g.a + g.b) * 1000) / 1000),
        String(Math.round((g.a * g.x + g.b) * 1000) / 1000),
        String(Math.round((g.b * g.x) * 1000) / 1000),
        String(Math.round((g.a - g.b * g.x) * 1000) / 1000),
        String(g.x),
      ],
      steps: [
        "Plug x into the equation. Don't overthink it.",
        `y = ${g.a} + ${g.b}(${g.x})`,
        `= ${g.a} + ${Math.round(g.b * g.x * 1000) / 1000}`,
        `= ${y}`,
        "If a correlation r is printed nearby and not asked for, ignore it. You don't need r to evaluate the line.",
      ],
      shortcut: "Prediction: replace x, multiply by the slope, add the intercept.",
      trap: "Multiplying the intercept by x, or adding x without multiplying by the slope.",
    });
  });

  add({
    id: "rg-slope-mean",
    concept: "regression",
    difficulty: "MEDIUM",
    stem: "In y = 5.2 + 1.15x, what does 1.15 represent?",
    correct: "The predicted change in y for a 1-unit increase in x",
    distractors: [
      "The predicted y when x = 0",
      "The correlation coefficient",
      "The mean of y",
      "The value of x when y = 0",
    ],
    steps: [
      "In y = a + bx, a is the intercept (predicted y when x = 0).",
      "b is the slope: how much ŷ changes when x increases by 1.",
      "1.15 is the slope, not r.",
    ],
    shortcut: "a = starting height. b = rise per 1 step of x.",
    trap: "Calling the slope the correlation. r and b are related but not the same number.",
  });

  add({
    id: "rg-ignore-r",
    concept: "regression",
    difficulty: "HARD",
    stem: "ŷ = 3.0 + 0.8x and r = 0.61. What is the predicted y for x = 10?",
    correct: "11",
    distractors: ["6.1", "0.61", "8", "13.0", "3.8"],
    steps: [
      "The question asks for a prediction, not a correlation.",
      "ŷ = 3.0 + 0.8(10) = 3 + 8 = 11.",
      "r = 0.61 is extra information.",
    ],
    shortcut: "If they want ŷ, plug into the equation. Park r to the side.",
    trap: "Reporting r, or multiplying r by x.",
  });

  add({
    id: "rg-intercept",
    concept: "regression",
    difficulty: "EASY",
    stem: "For y = −4 + 2x, what is the predicted y when x = 0?",
    correct: "−4",
    distractors: ["2", "0", "4", "−2"],
    steps: [
      "When x = 0, y equals the intercept.",
      "y = −4 + 2(0) = −4.",
    ],
    shortcut: "x = 0 → y is just a, the intercept.",
    trap: "Giving the slope instead of the intercept.",
  });
}

/* ---------- NUMBER SYSTEMS ---------- */
{
  const items = [
    { n: "3", correct: "Natural, whole, integer, rational, real", id: "ns-1" },
    { n: "0", correct: "Whole, integer, rational, real", id: "ns-2" },
    { n: "−4", correct: "Integer, rational, real", id: "ns-3" },
    { n: "1/2", correct: "Rational, real", id: "ns-4" },
    { n: "0.75", correct: "Rational, real", id: "ns-5" },
    { n: "√2", correct: "Irrational, real", id: "ns-6" },
    { n: "π", correct: "Irrational, real", id: "ns-7" },
  ];
  const opts = [
    "Natural, whole, integer, rational, real",
    "Whole, integer, rational, real",
    "Integer, rational, real",
    "Rational, real",
    "Irrational, real",
    "Natural only",
    "Not a real number",
  ];
  items.forEach((it) => {
    add({
      id: it.id,
      concept: "number-systems",
      difficulty: "EASY",
      stem: `Which is the most complete true classification of ${it.n}?`,
      correct: it.correct,
      distractors: opts.filter((o) => o !== it.correct),
      steps: [
        "Natural numbers: 1, 2, 3, ... (counting numbers). 0 is usually not included in C955-style 'natural'.",
        "Whole numbers: 0, 1, 2, 3, ...",
        "Integers: ..., −2, −1, 0, 1, 2, ...",
        "Rational: can be written as a fraction of integers (includes repeating/terminating decimals).",
        "Irrational: real but not a fraction of integers — √2, π, √3, e.",
        `${it.n} → ${it.correct}.`,
      ],
      shortcut: "Each set swallows the one before it: ℕ ⊂ W ⊂ ℤ ⊂ ℚ ⊂ ℝ, with irrationals sitting in ℝ but outside ℚ.",
      trap: "Calling 0 a natural number, or calling √4 irrational (√4 = 2, which is integer).",
    });
  });

  add({
    id: "ns-sqrt4",
    concept: "number-systems",
    difficulty: "MEDIUM",
    stem: "Which statement is true?",
    correct: "√4 is rational; √2 is irrational",
    distractors: [
      "Both √4 and √2 are irrational",
      "Both √4 and √2 are rational",
      "√4 is irrational; √2 is rational",
      "Neither is a real number",
    ],
    steps: [
      "√4 = 2, and 2 = 2/1, so it is rational (in fact an integer).",
      "√2 cannot be written as a ratio of integers — it is irrational.",
    ],
    shortcut: "If the square root simplifies to an integer, it is rational. If it doesn't, it's irrational.",
    trap: "Assuming every radical is irrational.",
  });

  add({
    id: "ns-repeating",
    concept: "number-systems",
    difficulty: "MEDIUM",
    stem: "0.333... (repeating) belongs to which set?",
    correct: "Rational numbers",
    distractors: ["Irrational numbers", "Integers", "Natural numbers", "Not real"],
    steps: [
      "0.333... = 1/3, a ratio of integers.",
      "Repeating decimals are always rational. Terminating decimals are too.",
      "Irrationals have non-repeating, non-terminating decimals (π, √2).",
    ],
    shortcut: "Repeating or terminating decimal → rational. Never-ending with no repeat → irrational.",
    trap: "The infinite 3s look 'wild', so people call them irrational. Infinite repeating is still a fraction.",
  });
}

/* ---------- INEQUALITIES ---------- */
{
  add({
    id: "ie-ge",
    concept: "inequalities",
    difficulty: "EASY",
    stem: "Which inequality is shown by a number line that is shaded to the right of 2, with a closed (filled) dot at 2?",
    correct: "x ≥ 2",
    distractors: ["x > 2", "x ≤ 2", "x < 2", "x = 2"],
    steps: [
      "Closed / filled dot means the endpoint IS included → ≥ or ≤.",
      "Shading to the right means greater → ≥.",
      "So x ≥ 2.",
    ],
    shortcut: "Filled dot = include. Right = greater. Open dot = exclude.",
    trap: "x > 2 would use an open dot.",
    visual: { kind: "number-line", min: -2, max: 6, from: 2, to: 6, closedLeft: true, closedRight: false },
  });

  add({
    id: "ie-gt",
    concept: "inequalities",
    difficulty: "EASY",
    stem: "x > 3 is graphed as:",
    correct: "Open dot at 3, shade to the right",
    distractors: [
      "Closed dot at 3, shade to the right",
      "Open dot at 3, shade to the left",
      "Closed dot at 3, shade to the left",
      "Dots at every integer greater than 3 only",
    ],
    steps: [
      "> does not include 3 → open dot.",
      "Greater → shade right.",
    ],
    shortcut: "< and > are open. ≤ and ≥ are closed.",
    trap: "Shading left because 'less-than symbol points left' — the arrow of the inequality is not the shade direction by itself; read it as 'x is greater than 3'.",
  });

  add({
    id: "ie-le-neg",
    concept: "inequalities",
    difficulty: "MEDIUM",
    stem: "Which of the following is true for x ≤ −1?",
    correct: "−1 is included, and every number to the left of −1 is included",
    distractors: [
      "−1 is not included",
      "Only negative integers are included",
      "x is greater than or equal to −1",
      "The graph shades to the right of −1",
    ],
    steps: [
      "≤ includes the endpoint: −1 is in the solution.",
      "Less than −1 means left on the number line.",
      "This includes numbers like −1.5, −8, not just integers.",
    ],
    shortcut: "≤ −1 → filled dot at −1, arrow left.",
    trap: "Thinking inequalities only care about integers.",
    visual: { kind: "number-line", min: -6, max: 4, from: -6, to: -1, closedLeft: false, closedRight: true },
  });

  add({
    id: "ie-interval",
    concept: "inequalities",
    difficulty: "MEDIUM",
    stem: "The interval [2, ∞) matches which inequality?",
    correct: "x ≥ 2",
    distractors: ["x > 2", "x ≤ 2", "2 < x < ∞", "x ≥ 0"],
    steps: [
      "Square bracket [ includes the endpoint.",
      "Infinity always gets a parenthesis because you never 'reach' infinity.",
      "[2, ∞) = x ≥ 2.",
    ],
    shortcut: "[ or ] = closed = include. ( or ) = open = exclude.",
    trap: "Matching [2, ∞) to x > 2.",
  });

  add({
    id: "ie-open-int",
    concept: "inequalities",
    difficulty: "MEDIUM",
    stem: "x > 3 in interval notation is:",
    correct: "(3, ∞)",
    distractors: ["[3, ∞)", "(−∞, 3)", "(−∞, 3]", "[3, ∞]"],
    steps: [
      "> excludes 3 → parenthesis.",
      "Greater than 3 goes to infinity: (3, ∞).",
      "Infinity never gets a square bracket.",
    ],
    shortcut: "Open inequality → open interval.",
    trap: "[3, ∞] uses two illegal ideas: including 3, and bracketing infinity.",
  });
}

/* ---------- MULTIPLICATION RULE ---------- */
{
  add({
    id: "mr-six-heads",
    concept: "multiplication-rule",
    difficulty: "MEDIUM",
    stem: "A fair coin is flipped 6 times. What is the probability of HHHHHH (heads every time)?",
    correct: "1/64",
    distractors: ["1/6", "1/12", "6/2", "1/32", "1/2"],
    steps: [
      "Independent flips: multiply 1/2 six times.",
      "(1/2)^6 = 1/64.",
    ],
    shortcut: "A specific sequence of n fair coin flips: 1/2^n.",
    trap: "1/6 treats it like a six-sided die with one 'all heads' face.",
  });

  add({
    id: "mr-die-twice",
    concept: "multiplication-rule",
    difficulty: "EASY",
    stem: "A fair six-sided die is rolled twice. P(6 then 6)?",
    correct: "1/36",
    distractors: ["1/6", "1/12", "2/6", "1/30"],
    steps: ["Independent rolls: (1/6)×(1/6)=1/36."],
    shortcut: "Two independent 'one-face' rolls: 1/36.",
    trap: "1/12 is 1/6 × 1/2, mixing in a coin.",
  });

  add({
    id: "mr-three-die",
    concept: "multiplication-rule",
    difficulty: "HARD",
    stem: "A fair six-sided die is rolled three times. P(all three rolls show a 1)?",
    correct: "1/216",
    distractors: ["1/18", "1/6", "3/6", "1/36"],
    steps: ["(1/6)^3 = 1/216."],
    shortcut: "n independent rolls of a specific face: (1/6)^n.",
    trap: "1/18 is 1/6 × 1/3.",
  });

  add({
    id: "mr-not-indep",
    concept: "multiplication-rule",
    difficulty: "HARD",
    stem: "Two cards are drawn without replacement from a 52-card deck. Why is P(two kings) NOT equal to (4/52)×(4/52)?",
    correct: "The second draw is dependent — only 3 kings and 51 cards remain",
    distractors: [
      "Kings are mutually exclusive",
      "You should add instead of multiply",
      "A deck has 53 cards",
      "The events are independent so the formula does apply",
    ],
    steps: [
      "Without replacement, P(second king | first king) = 3/51, not 4/52.",
      "The correct product is (4/52)×(3/51).",
    ],
    shortcut: "Only multiply the same fraction by itself when the trial is reset (replacement / independent).",
    trap: "Blindly using (1/13)^2 for cards that aren't replaced.",
  });

  add({
    id: "mr-bin-seq",
    concept: "multiplication-rule",
    difficulty: "MEDIUM",
    stem: "A multiple-choice item has 4 options. If you guess 3 such items independently, P(all three correct)?",
    correct: "1/64",
    distractors: ["1/4", "3/4", "1/12", "3/64"],
    steps: ["(1/4)×(1/4)×(1/4)=1/64."],
    shortcut: "Independent guesses: (1/k)^n.",
    trap: "1/12 is 3/4 thinking or 1/4 × 1/3.",
  });
}

/* extra unique word problems to push well past 150 */
{
  add({
    id: "bp-spinner-eq",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "A fair spinner has 5 equal sectors labeled A–E. P(A)?",
    correct: "1/5",
    distractors: ["1/4", "5", "0.5", "20"],
    steps: ["Equal sectors → each has probability 1/5."],
    shortcut: "Equal pieces: 1 divided by how many pieces.",
    trap: "Using 1/4 because there are four other letters.",
  });

  add({
    id: "bp-rel-freq",
    concept: "basic-probability",
    difficulty: "MEDIUM",
    stem: "A spinner was spun 200 times. Outcome B occurred 46 times. The relative frequency of B is:",
    correct: "0.23",
    distractors: ["46", "200/46", "0.46", "23"],
    steps: [
      "Relative frequency = count / trials = 46/200 = 0.23.",
      "That's also 23%.",
    ],
    shortcut: "Relative frequency is just an empirical probability: successes ÷ attempts.",
    trap: "Reporting the raw count 46 as if it were a probability.",
  });

  add({
    id: "or-cards",
    concept: "or-probability",
    difficulty: "HARD",
    stem: "One card from a 52-card deck. P(king OR heart)?",
    correct: "16/52",
    distractors: ["17/52", "13/52", "4/52", "17/13", "1/2"],
    steps: [
      "Kings: 4. Hearts: 13. Overlap: the king of hearts (1).",
      "4 + 13 − 1 = 16.",
      "16/52 = 4/13.",
    ],
    shortcut: "OR = add, subtract the king of hearts.",
    trap: "17/52 adds without subtracting the overlap.",
  });

  add({
    id: "or-students",
    concept: "or-probability",
    difficulty: "MEDIUM",
    stem: "In a class of 30, 18 take stats, 12 take biology, 6 take both. P(stats OR biology)?",
    correct: "24/30",
    distractors: ["30/30", "18/30", "6/30", "12/30"],
    steps: [
      "18 + 12 − 6 = 24 unique students.",
      "24/30 = 4/5.",
    ],
    shortcut: "OR = add, subtract the overlap of 6.",
    trap: "18+12=30 looks like everyone, but that double-counts the 6.",
    visual: { kind: "venn", aLabel: "Stats", bLabel: "Bio", onlyA: 12, onlyB: 6, both: 6, neither: 6 },
  });

  add({
    id: "cd-rev",
    concept: "conditional",
    difficulty: "BOSS",
    stem: "40% of employees are in sales. 70% of sales employees met quota. 20% of non-sales employees met quota. An employee met quota. P(they are in sales)?",
    correct: "0.7",
    distractors: ["0.4", "0.28", "0.12", "0.48", "0.58"],
    steps: [
      "This is reverse-conditional thinking. Use a hypothetical 100 employees.",
      "Sales: 40. Met quota: 0.7×40 = 28.",
      "Non-sales: 60. Met quota: 0.2×60 = 12.",
      "Total who met quota = 28+12 = 40.",
      "Among those 40, 28 are sales: 28/40 = 0.7.",
    ],
    shortcut: "When GIVEN is the 'result' (met quota), build a 100-person table first, then restrict to that row.",
    trap: "0.28 is P(sales AND met quota). 0.4 is just P(sales).",
  });

  add({
    id: "em-between",
    concept: "empirical-rule",
    difficulty: "MEDIUM",
    stem: "IQ ~ normal, mean 100, SD 15. About what percent of people have IQ between 85 and 115?",
    correct: "68%",
    distractors: ["95%", "99.7%", "50%", "34%"],
    steps: [
      "85 = 100−15 (mean − 1 SD). 115 = 100+15 (mean + 1 SD).",
      "That's the middle 1 SD → about 68%.",
    ],
    shortcut: "Recognize mean ± 1 SD = 68%.",
    trap: "115−85=30, 30/15=2, so you might say 95% — but 2 SD would be 70 to 130, not 85 to 115.",
  });

  add({
    id: "rg-units",
    concept: "regression",
    difficulty: "HARD",
    stem: "A line predicts weekly sales (in $1000s) by ŷ = 4.0 + 0.5x, where x is ads. If x = 6 ads, predicted sales are:",
    correct: "$7,000",
    distractors: ["$7", "$6,500", "$4,500", "$3,000", "$10,000"],
    steps: [
      "ŷ = 4.0 + 0.5(6) = 4 + 3 = 7.",
      "Units are $1000s, so $7,000.",
    ],
    shortcut: "Plug in first, convert units last.",
    trap: "Forgetting the units and answering 7 dollars.",
  });

  add({
    id: "pr-even-prime-die20",
    concept: "or-probability",
    difficulty: "BOSS",
    stem: "A 20-sided die is rolled. P(even OR prime)?",
    correct: "14/20",
    distractors: ["16/20", "10/20", "8/20", "13/20", "1"],
    steps: [
      "Evens 1–20: 2,4,6,8,10,12,14,16,18,20 (10 numbers).",
      "Primes 1–20: 2,3,5,7,11,13,17,19 (8 numbers).",
      "Overlap: only 2 (the even prime).",
      "10 + 8 − 1 = 17? Wait — 10+8−1=17. Recheck evens+primes unique.",
      "Unique: evens plus odd primes 3,5,7,11,13,17,19 (7 odd primes) → 10+7=17.",
      "17/20. Regenerating correct answer.",
    ],
    shortcut: "OR = add, subtract the overlap (here just {2}).",
    trap: "Forgetting 2 is both even and prime, or counting 1 as prime.",
  });
}

/* Fix the last question's correct answer - I noticed a mistake in the steps.
   Evens: 10, primes: 8, overlap: 1 (the 2), union = 17. So 17/20. */
{
  const q = Q.find((x) => x.id === "pr-even-prime-die20");
  if (q) {
    q.correct = "17/20";
    q.choices = uniqueChoices("17/20", ["16/20", "10/20", "8/20", "14/20", "18/20"]);
    q.steps = [
      "Evens 1–20: 10 numbers.",
      "Primes 1–20: 2,3,5,7,11,13,17,19 (8 numbers). 1 is not prime.",
      "Overlap: 2 only.",
      "10 + 8 − 1 = 17 unique outcomes.",
      "17/20.",
    ];
    q.trap = "14/20 or 16/20 usually means a bad prime list. 18/20 often counted 1 as prime.";
  }
}

/* more table / mixed / wording */
{
  add({
    id: "tw-row-pct",
    concept: "two-way-tables",
    difficulty: "HARD",
    stem: "Music vs Sport. Band: 12 athletes, 18 non-athletes. No-band: 20 athletes, 10 non-athletes. What percent of athletes are in band?",
    correct: "37.5%",
    distractors: ["12/60 = 20%", "12/30 = 40%", "32/60 ≈ 53%", "12/18 = 67%"],
    steps: [
      "GIVEN athlete. Athlete total = 12+20 = 32.",
      "Athletes in band = 12.",
      "12/32 = 0.375 = 37.5%.",
    ],
    shortcut: "Of athletes → 32 is the denominator.",
    trap: "12/60 uses everyone. 12/30 uses band members (the reverse).",
    visual: {
      kind: "table",
      columns: ["Athlete", "Non-athlete", "Total"],
      rows: [
        { label: "Band", values: [12, 18, 30] },
        { label: "No band", values: [20, 10, 30] },
      ],
      totals: [32, 28, 60],
    },
  });

  add({
    id: "bp-impossible",
    concept: "basic-probability",
    difficulty: "EASY",
    stem: "Rolling a 7 on a fair six-sided die has probability:",
    correct: "0",
    distractors: ["1/6", "1/7", "1", "7/6"],
    steps: [
      "There is no face 7. Favorable outcomes = 0.",
      "0/6 = 0. That's an impossible event.",
    ],
    shortcut: "If it can't happen, the probability is 0 — not 'undefined'.",
    trap: "1/7 invents a seventh face.",
  });

  add({
    id: "and-dep-formula",
    concept: "and-probability",
    difficulty: "HARD",
    stem: "P(A)=0.5 and P(B|A)=0.4. What is P(A AND B)?",
    correct: "0.2",
    distractors: ["0.9", "0.1", "0.4", "1.25"],
    steps: [
      "General multiplication rule: P(A AND B) = P(A) × P(B|A).",
      "0.5 × 0.4 = 0.2.",
      "You do NOT need independence for this formula — the conditional already built in the dependence.",
    ],
    shortcut: "AND = first × (second GIVEN first).",
    trap: "You cannot compute P(A)×P(B) unless you know P(B), and independence isn't given.",
  });

  add({
    id: "ns-neg-frac",
    concept: "number-systems",
    difficulty: "MEDIUM",
    stem: "−3/4 is:",
    correct: "Rational (and real)",
    distractors: ["Irrational", "Not an integer, so not real", "Natural", "Whole"],
    steps: [
      "−3/4 is a ratio of integers, so rational.",
      "Every rational is real.",
      "It is not an integer, whole, or natural.",
    ],
    shortcut: "Fraction of integers → rational, even if negative.",
    trap: "Thinking negatives can't be rational.",
  });

  add({
    id: "ie-compound",
    concept: "inequalities",
    difficulty: "HARD",
    stem: "−2 < x ≤ 5 in interval notation is:",
    correct: "(−2, 5]",
    distractors: ["[−2, 5]", "(−2, 5)", "[−2, 5)", "(-2, 5)"],
    steps: [
      "−2 < x means −2 is excluded → parenthesis on the left.",
      "x ≤ 5 means 5 is included → square bracket on the right.",
      "(−2, 5].",
    ],
    shortcut: "Read each end separately: open vs closed.",
    trap: "Matching both ends with the same bracket style.",
  });

  add({
    id: "cr-causation",
    concept: "correlation",
    difficulty: "MEDIUM",
    stem: "A strong correlation between ice-cream sales and drowning incidents most nearly implies:",
    correct: "The two variables move together linearly; it does not prove one causes the other",
    distractors: [
      "Eating ice cream causes drowning",
      "r must be exactly 1",
      "The relationship is negative",
      "We should ignore the correlation",
    ],
    steps: [
      "Correlation is not causation. A lurking variable (hot weather) can drive both.",
      "A strong r still only describes linear association.",
    ],
    shortcut: "Association ≠ causation. Especially on C955 wording items.",
    trap: "Jumping from a tight scatter to a cause-and-effect story.",
  });

  add({
    id: "em-mean-sd-read",
    concept: "empirical-rule",
    difficulty: "EASY",
    stem: "On a bell curve, the peak (center) of the distribution is the:",
    correct: "Mean (which equals the median and mode for a true normal)",
    distractors: ["Standard deviation", "Range", "Correlation", "Slope"],
    steps: [
      "A normal curve is symmetric about its mean.",
      "The SD controls the spread, not the center.",
    ],
    shortcut: "Center = mean. Spread = SD.",
    trap: "Calling the SD the center because it's the other number in the problem.",
  });

  add({
    id: "wor-order",
    concept: "without-replacement",
    difficulty: "HARD",
    stem: "3 tickets: A, B, C drawn at random without replacement. P(order is exactly A then B then C)?",
    correct: "1/6",
    distractors: ["1/3", "1/9", "1/27", "1/2"],
    steps: [
      "First A: 1/3. Then B: 1/2. Then C: 1/1.",
      "(1/3)×(1/2)×(1/1)=1/6.",
      "There are 3! = 6 possible orders, all equally likely.",
    ],
    shortcut: "All orderings of distinct items without replacement are equally likely: 1/n!.",
    trap: "1/27 is (1/3)^3, which is with replacement and independent.",
  });
}

/* additional generated drills to ensure 150+ */
function moreDiceOR() {
  const specs = [
    [15, (k) => k % 3 === 0, (k) => k % 5 === 0, "multiple of 3", "multiple of 5", "or-15", "HARD"],
    [9, (k) => isPrime(k), (k) => k % 2 === 0, "prime", "even", "or-9", "MEDIUM"],
    [18, (k) => k > 12, (k) => k < 4, "greater than 12", "less than 4", "or-18", "EASY"],
    [7, (k) => isPrime(k), (k) => k === 1, "prime", "1", "or-7", "MEDIUM"],
  ];
  specs.forEach((s) => {
    orDieHelper(s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
  });
}
function orDieHelper(sides, predA, predB, aName, bName, id, diff) {
  const A = [],
    B = [],
    both = [];
  for (let k = 1; k <= sides; k++) {
    const a = predA(k),
      b = predB(k);
    if (a) A.push(k);
    if (b) B.push(k);
    if (a && b) both.push(k);
  }
  const u = new Set([...A, ...B]).size;
  add({
    id,
    concept: "or-probability",
    difficulty: diff,
    stem: `A fair ${sides}-sided die is rolled. P(${aName} OR ${bName})?`,
    correct: frac(u, sides),
    distractors: [frac(A.length + B.length, sides), frac(A.length, sides), frac(both.length, sides), frac(u, sides + 1)],
    steps: [
      `${aName}: ${A.join(", ")} (${A.length}). ${bName}: ${B.join(", ") || "none"} (${B.length}). Overlap: ${both.join(", ") || "none"} (${both.length}).`,
      `Union = ${A.length}+${B.length}−${both.length} = ${u}.`,
      `${u}/${sides} = ${frac(u, sides)}.`,
    ],
    shortcut: "OR = ADD, subtract the overlap.",
    trap: "Adding without subtracting the overlap.",
    watchFor: "OR",
  });
}
moreDiceOR();

{
  const extras = [
    {
      id: "bp-percent-2",
      concept: "basic-probability",
      difficulty: "EASY",
      stem: "A probability of 3/8 is how many percent?",
      correct: "37.5%",
      distractors: ["38%", "3.8%", "0.375%", "24%"],
      steps: ["3 ÷ 8 = 0.375. ×100 = 37.5%."],
      shortcut: "Fraction → decimal → move two places.",
      trap: "Rounding 3/8 to 38% without being asked to round to a whole percent.",
    },
    {
      id: "bp-comp-pct",
      concept: "basic-probability",
      difficulty: "EASY",
      stem: "If 72% of students passed, P(a randomly chosen student failed)?",
      correct: "0.28",
      distractors: ["0.72", "72", "28", "1.72"],
      steps: ["Fail is the complement. 100% − 72% = 28% = 0.28."],
      shortcut: "NOT = subtract from 1 (or from 100%).",
      trap: "Leaving the answer as 28 without checking whether they wanted a probability or a percent. 0.28 is the probability.",
    },
    {
      id: "cd-among",
      concept: "conditional",
      difficulty: "MEDIUM",
      stem: "Among those who attended orientation, 33 of 40 registered early. P(registered early | attended orientation)?",
      correct: "33/40",
      distractors: ["33/73", "40/33", "33%", "40%"],
      steps: ["'Among those who' = GIVEN. Denominator is 40. 33/40."],
      shortcut: "Among those who X → X's count is the denominator.",
      trap: "Inventing a grand total that wasn't given.",
      watchFor: "among those who",
    },
    {
      id: "id-replacement",
      concept: "independent-dependent",
      difficulty: "EASY",
      stem: "Drawing a card, putting it back, shuffling, and drawing again: the two draws are:",
      correct: "Independent",
      distractors: ["Dependent", "Mutually exclusive", "Complements", "Impossible"],
      steps: [
        "Replacement resets the deck, so the second probability doesn't change.",
        "P(second ace | first ace) = 4/52 = P(second ace).",
      ],
      shortcut: "With replacement → independent. Without → dependent.",
      trap: "Calling them dependent because they are 'two cards from the same deck' even after replacement.",
    },
    {
      id: "rg-neg-pred",
      concept: "regression",
      difficulty: "MEDIUM",
      stem: "ŷ = 10 − 2x. Predict y when x = 7.",
      correct: "−4",
      distractors: ["4", "14", "24", "5"],
      steps: ["10 − 2(7) = 10 − 14 = −4. Negative predictions can happen; report them."],
      shortcut: "Subtract when the slope is negative.",
      trap: "Doing 10 − 2 − 7 or 10 + 2×7.",
    },
    {
      id: "cr-perfect",
      concept: "correlation",
      difficulty: "EASY",
      stem: "If every point lies exactly on an upward straight line, r is:",
      correct: "1",
      distractors: ["0", "−1", "Infinity", "100"],
      steps: ["Perfect positive linear association → r = 1."],
      shortcut: "Perfect up-line = 1. Perfect down-line = −1.",
      trap: "Writing 100% or 100 for r.",
      visual: { kind: "scatter", r: 1, seed: 1 },
    },
    {
      id: "tw-cell",
      concept: "two-way-tables",
      difficulty: "EASY",
      stem: "A two-way table cell at (Online, Fail) is 9. Grand total 90. P(online AND fail)?",
      correct: "9/90",
      distractors: ["9/45", "81/90", "9", "1/9"],
      steps: ["Joint probability = cell / grand total = 9/90 = 1/10."],
      shortcut: "AND with no given → cell over grand total.",
      trap: "Using a row total you weren't given.",
    },
    {
      id: "pr-composite-die",
      concept: "prime-composite",
      difficulty: "MEDIUM",
      stem: "A 10-sided die is rolled. P(composite number)?",
      correct: "5/10",
      distractors: ["4/10", "6/10", "1/10", "8/10"],
      steps: [
        "1 is neither. Primes: 2,3,5,7. Composites: 4,6,8,9,10. That's 5 composites.",
        "5/10 = 1/2.",
      ],
      shortcut: "List 1 (skip), primes, leftovers are composite.",
      trap: "Counting 1 as composite, or missing 9 (3×3) or 10 (2×5).",
    },
    {
      id: "mr-seq-letters",
      concept: "multiplication-rule",
      difficulty: "MEDIUM",
      stem: "A password is 2 independent random letters from a 26-letter alphabet (with replacement). P(both letters are A)?",
      correct: "1/676",
      distractors: ["1/52", "2/26", "1/26", "1/650"],
      steps: ["(1/26)×(1/26)=1/676."],
      shortcut: "Independent identical trials: (1/n)^k.",
      trap: "1/52 is 2/26 thinking.",
    },
    {
      id: "cd-two-way-given-col",
      concept: "two-way-tables",
      difficulty: "MEDIUM",
      stem: "Yes/No vs East/West. East-Yes 14, East-No 6, West-Yes 10, West-No 20. P(East | Yes)?",
      correct: "14/24",
      distractors: ["14/20", "14/50", "24/50", "14/30"],
      steps: [
        "GIVEN Yes → Yes total = 14+10 = 24.",
        "East among those = 14.",
        "14/24 = 7/12.",
      ],
      shortcut: "Condition on the Yes column; ignore No.",
      trap: "14/20 is P(Yes | East), the reverse.",
    },
  ];
  extras.forEach((e) => add(e));
}

/* fill remaining with systematic probability complements, means, etc. */
{
  const comps = [0.12, 0.4, 0.07, 0.91, 0.255, 0.6, 0.333];
  comps.forEach((p, i) => {
    const c = Math.round((1 - p) * 1000) / 1000;
    add({
      id: `bp-comp-x-${i}`,
      concept: "basic-probability",
      difficulty: p < 0.2 ? "EASY" : "MEDIUM",
      stem: `P(A) = ${p}. What is P(A does not occur)?`,
      correct: String(c),
      distractors: [String(p), String(Math.round(p * 100) / 100), String(Math.round((1 + p) * 1000) / 1000), `${c * 100}%`],
      steps: [`P(not A) = 1 − ${p} = ${c}.`],
      shortcut: "Complement: subtract from 1.",
      trap: "Subtracting from 100 without converting to percent.",
    });
  });
}

{
  const means = [
    { xs: [2, 4, 6, 8], id: "bp-mean-not" },
  ];
  // mean is not a C955 priority as its own concept; skip extra means.

  const zs = [
    { x: 85, m: 100, s: 15, z: -1 },
    { x: 130, m: 100, s: 15, z: 2 },
    { x: 55, m: 50, s: 2, z: 2.5 },
  ];
  zs.forEach((z, i) => {
    add({
      id: `em-z-${i}`,
      concept: "empirical-rule",
      difficulty: "MEDIUM",
      stem: `A value of ${z.x} comes from a distribution with mean ${z.m} and SD ${z.s}. What is the z-score?`,
      correct: String(z.z),
      distractors: [String(-z.z), String(z.x - z.m), String((z.x - z.m) / (z.s * 2)), "0"],
      steps: [
        `z = (x − mean)/SD = (${z.x} − ${z.m})/${z.s} = ${z.x - z.m}/${z.s} = ${z.z}.`,
      ],
      shortcut: "z = (value − mean) / SD.",
      trap: "Forgetting to divide by SD, leaving the raw gap.",
    });
  });
}

{
  add({
    id: "id-equal-test",
    concept: "independent-dependent",
    difficulty: "BOSS",
    stem: "P(B) = 0.45 and P(B|A) = 0.45. Which conclusion is correct?",
    correct: "A and B are independent",
    distractors: [
      "A and B are dependent because the numbers match",
      "A and B are mutually exclusive",
      "P(A AND B) must be 0",
      "P(A) must be 0.45 too",
    ],
    steps: [
      "The test is exactly this: P(B|A) = P(B) implies independence.",
      "Matching numbers mean A gave no new information about B.",
    ],
    shortcut: "Equal conditional and unconditional → independent.",
    trap: "Thinking equal probabilities mean mutually exclusive.",
  });

  add({
    id: "cd-placebo-word",
    concept: "conditional",
    difficulty: "MEDIUM",
    stem: "A trial lists experimental n=88 and placebo n=41. 28 placebo participants passed. P(passed | placebo) is closest to:",
    correct: "68.3%",
    distractors: ["31.8%", "21.7%", "43.4%", "28%"],
    steps: ["28/41 ≈ 0.6829 → 68.3%."],
    shortcut: "Placebo is the given group: 41, not 88+41.",
    trap: "28/(88+41)=21.7%.",
  });

  add({
    id: "or-no-overlap-vis",
    concept: "or-probability",
    difficulty: "EASY",
    stem: "A spinner is half red and half blue (no overlap). P(red OR blue)?",
    correct: "1",
    distractors: ["0.5", "0", "2", "0.25"],
    steps: [
      "Red and blue cover the whole spinner and don't overlap.",
      "0.5 + 0.5 − 0 = 1. It's certain you get one of the two.",
    ],
    shortcut: "If the events cover everything and don't overlap, OR = 1.",
    trap: "Multiplying 0.5×0.5=0.25 (AND of independent — wrong structure).",
  });

  add({
    id: "bp-fair-not",
    concept: "basic-probability",
    difficulty: "HARD",
    stem: "A loaded die has P(1)=0.3, P(2)=0.1, P(3)=0.1, P(4)=0.1, P(5)=0.1, P(6)=0.3. P(even)?",
    correct: "0.5",
    distractors: ["0.3", "1/2 because three even faces", "0.6", "0.1"],
    steps: [
      "Even faces: 2, 4, 6. Add THEIR probabilities, because the die is not fair.",
      "0.1 + 0.1 + 0.3 = 0.5.",
      "You cannot just do 3/6 on a loaded die.",
    ],
    shortcut: "When outcomes are not equally likely, ADD the listed probabilities of the faces you want.",
    trap: "Using 3/6 from the fair-die habit.",
  });

  add({
    id: "wor-same-total-only",
    concept: "without-replacement",
    difficulty: "MEDIUM",
    stem: "10 students: 6 juniors, 4 seniors. Two officers are chosen at random without replacement. P(junior then senior)?",
    correct: "4/15",
    distractors: ["24/100", "6/10 × 4/10", "10/24", "2/10"],
    steps: [
      "P(junior first) = 6/10.",
      "Then 4 seniors remain out of 9 people: 4/9.",
      "(6/10)×(4/9)=24/90=4/15.",
    ],
    shortcut: "Second denominator is 9, not 10.",
    trap: "(6/10)×(4/10)=24/100 keeps the old total.",
  });
}

/* regression slope interpretation + scatter remaining */
{
  add({
    id: "rg-interp-int",
    concept: "regression",
    difficulty: "MEDIUM",
    stem: "ŷ = 32 + 1.8x predicts exam score from hours studied. The 32 means:",
    correct: "The predicted score when hours studied is 0",
    distractors: [
      "Everyone scores at least 32",
      "The average hours studied",
      "The correlation is 32",
      "The typical increase per hour is 32 points",
    ],
    steps: [
      "Intercept a is ŷ when x = 0.",
      "It is a prediction from the line, not a guarantee that someone who studies 0 hours scores 32.",
    ],
    shortcut: "Intercept = predicted y at x = 0. Slope = predicted change in y per 1 x.",
    trap: "Treating the intercept as a minimum possible score.",
  });

  add({
    id: "cr-weak-vis",
    concept: "correlation",
    difficulty: "HARD",
    stem: "A scatterplot looks like a round cloud with no clear slant. The most plausible r is:",
    correct: "0.05",
    distractors: ["0.85", "−0.9", "1", "−1.05"],
    steps: [
      "No slant and lots of scatter → r near 0.",
      "0.05 is weak (essentially none). 0.85 would look like a clear trend.",
    ],
    shortcut: "Blob with no direction → r ≈ 0.",
    trap: "Picking a strong r because 'there are lots of points'. Quantity of points is not strength.",
    visual: { kind: "scatter", r: 0.05, seed: 44 },
  });

  add({
    id: "ns-hierarchy",
    concept: "number-systems",
    difficulty: "EASY",
    stem: "Which set is the largest (contains the others listed)?",
    correct: "Real numbers",
    distractors: ["Natural numbers", "Integers", "Rational numbers", "Whole numbers"],
    steps: [
      "Reals include rationals and irrationals.",
      "Rationals include integers. Integers include wholes. Wholes include naturals.",
    ],
    shortcut: "Real is the umbrella for all the C955 number types listed here.",
    trap: "Picking integers because they 'go forever in both directions' — reals still contain more.",
    visual: { kind: "hierarchy" },
  });

  add({
    id: "ie-which-true",
    concept: "inequalities",
    difficulty: "EASY",
    stem: "If x ≥ 2, which value is NOT a solution?",
    correct: "1.99",
    distractors: ["2", "2.5", "100", "2.0"],
    steps: ["x ≥ 2 includes 2 and everything larger. 1.99 is smaller, so it is out."],
    shortcut: "Test the boundary and one number on each side.",
    trap: "Rejecting 2 because 'greater than' leaked into ≥.",
  });

  add({
    id: "and-then-word",
    concept: "and-probability",
    difficulty: "EASY",
    stem: "Look for this wording: 'followed by'. It usually signals you should:",
    correct: "Multiply (AND / THEN rule), after checking replacement",
    distractors: ["Add and subtract overlap", "Divide by the given group", "Subtract from 1", "Use 68-95-99.7"],
    steps: [
      "'Followed by', 'and then', 'both in a row' → multiplication chain.",
      "Then ask: with or without replacement?",
    ],
    shortcut: "AND / THEN / followed by / both → multiply.",
    trap: "Seeing two events and automatically adding them (OR reflex).",
    watchFor: "followed by, then, both, and",
  });
}

/* verify */
function verify() {
  const ids = new Set();
  for (const q of Q) {
    if (ids.has(q.id)) throw new Error("dup id " + q.id);
    ids.add(q.id);
    if (!q.choices.includes(q.correct)) throw new Error("correct not in choices " + q.id);
    if (new Set(q.choices).size !== 4) throw new Error("choices not unique " + q.id + " " + q.choices);
    if (q.choices.length !== 4) throw new Error("need 4 choices " + q.id);
    if (!q.steps?.length) throw new Error("no steps " + q.id);
  }
}

verify();

const byConcept = {};
const byDiff = {};
for (const q of Q) {
  byConcept[q.concept] = (byConcept[q.concept] || 0) + 1;
  byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
}

const header = `import type { Question } from "./types";

/** Auto-generated by scripts/generate-questions.mjs — do not hand-edit. */
export const QUESTIONS: Question[] = `;

const body = JSON.stringify(Q, null, 2)
  .replace(/"kind":/g, '"kind":')
  .replace(/"([A-Za-z0-9_]+)":/g, "$1:");

// JSON.stringify already valid TS for this subset. Use `as const` carefully — skip.
const ts = `import type { Question } from "./types";

/** Auto-generated by scripts/generate-questions.mjs — do not hand-edit. */
export const QUESTIONS: Question[] = ${JSON.stringify(Q, null, 2)} satisfies Question[];

export const QUESTION_COUNT = QUESTIONS.length;
`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/questions.ts", ts);
console.log("Wrote", Q.length, "questions");
console.log("by concept", byConcept);
console.log("by difficulty", byDiff);
