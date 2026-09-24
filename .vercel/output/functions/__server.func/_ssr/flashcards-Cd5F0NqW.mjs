import { i as __toESM } from "../_runtime.mjs";
import { i as shuffle } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as ChevronLeft, g as ChevronRight, s as RefreshCw } from "../_libs/lucide-react.mjs";
import { f as Button } from "./router-DJ0Y2-ZD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flashcards-Cd5F0NqW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FLASHCARDS = [
	{
		id: "fc-given",
		front: "GIVEN THAT",
		back: "Conditional probability. The given group becomes the denominator. P(A | B) = P(A AND B) / P(B).",
		hint: "Look for: given, among those who, of the people who",
		concept: "conditional"
	},
	{
		id: "fc-or",
		front: "OR",
		back: "Add the probabilities, then subtract the overlap. P(A OR B) = P(A) + P(B) − P(A AND B).",
		hint: "If you skip the subtraction you double-count.",
		concept: "or-probability"
	},
	{
		id: "fc-and",
		front: "AND / THEN / followed by / both",
		back: "Multiply. Independent: P(A)×P(B). Dependent: P(A)×P(B|A).",
		concept: "and-probability"
	},
	{
		id: "fc-wor",
		front: "WITHOUT REPLACEMENT",
		back: "The total drops. Ask: did the favorable count drop too? Then multiply the chain.",
		concept: "without-replacement"
	},
	{
		id: "fc-indep",
		front: "INDEPENDENT",
		back: "Knowing A happened does NOT change P(B). Test: P(B) = P(B|A).",
		concept: "independent-dependent"
	},
	{
		id: "fc-dep",
		front: "DEPENDENT",
		back: "Knowing A happened DOES change P(B). P(B) ≠ P(B|A). Without replacement is dependent.",
		concept: "independent-dependent"
	},
	{
		id: "fc-prime",
		front: "PRIME NUMBER",
		back: "Exactly two distinct positive factors: 1 and itself. 2 is the only even prime. 1 is not prime.",
		concept: "prime-composite"
	},
	{
		id: "fc-comp",
		front: "COMPOSITE NUMBER",
		back: "Has at least one extra factor besides 1 and itself (3+ factors). 1 is not composite.",
		concept: "prime-composite"
	},
	{
		id: "fc-one",
		front: "WHY 1 IS NEITHER",
		back: "Prime needs exactly two factors. Composite needs three or more. 1 has only one factor: itself.",
		concept: "prime-composite"
	},
	{
		id: "fc-complement",
		front: "COMPLEMENT",
		back: "P(not A) = 1 − P(A). Add what you know, subtract from 1.",
		concept: "basic-probability"
	},
	{
		id: "fc-relfreq",
		front: "RELATIVE FREQUENCY",
		back: "Count of times it happened ÷ number of trials. An empirical probability.",
		concept: "basic-probability"
	},
	{
		id: "fc-mean",
		front: "MEAN",
		back: "The arithmetic average. On a normal curve it sits at the center peak."
	},
	{
		id: "fc-median",
		front: "MEDIAN",
		back: "The middle value when data are ordered. For a true normal, mean = median = mode."
	},
	{
		id: "fc-mode",
		front: "MODE",
		back: "The most frequent value. On a normal curve, the peak."
	},
	{
		id: "fc-sd",
		front: "STANDARD DEVIATION",
		back: "Typical distance from the mean. The empirical rule counts in units of SD: 1 → 68%, 2 → 95%, 3 → 99.7%.",
		concept: "empirical-rule"
	},
	{
		id: "fc-emp",
		front: "68-95-99.7",
		back: "Normal data: ~68% within 1 SD, ~95% within 2 SD, ~99.7% within 3 SD of the mean.",
		concept: "empirical-rule"
	},
	{
		id: "fc-r",
		front: "CORRELATION r",
		back: "−1 ≤ r ≤ 1. Sign = direction. |r| = strength. 0 = no linear pattern. r is often NOT printed on the scatterplot.",
		concept: "correlation"
	},
	{
		id: "fc-reg",
		front: "REGRESSION ŷ = a + bx",
		back: "a = intercept (predicted y when x = 0). b = slope (change in ŷ when x increases by 1). Plug x in to predict.",
		concept: "regression"
	},
	{
		id: "fc-rational",
		front: "RATIONAL",
		back: "Can be written as a fraction of integers. Includes terminating and repeating decimals. 1/2, −4, 0.75, 0.333…",
		concept: "number-systems"
	},
	{
		id: "fc-irrational",
		front: "IRRATIONAL",
		back: "Real but not a ratio of integers. Non-repeating, non-terminating decimals. √2, π, e, √3. √4 = 2 is rational.",
		concept: "number-systems"
	},
	{
		id: "fc-integer",
		front: "INTEGER",
		back: "… −2, −1, 0, 1, 2 … No fractional part. Negatives are allowed.",
		concept: "number-systems"
	},
	{
		id: "fc-mut-excl",
		front: "MUTUALLY EXCLUSIVE",
		back: "Cannot happen at the same time. Overlap = 0, so P(A OR B) = P(A)+P(B). Not the same as independent.",
		concept: "or-probability"
	},
	{
		id: "fc-joint",
		front: "JOINT vs MARGINAL vs CONDITIONAL",
		back: "Joint = one cell / grand total. Marginal = a row or column total / grand total. Conditional = cell / that group's total.",
		concept: "two-way-tables"
	},
	{
		id: "fc-z",
		front: "Z-SCORE",
		back: "z = (x − mean) / SD. How many SDs above (+) or below (−) the mean.",
		concept: "empirical-rule"
	},
	{
		id: "fc-p-range",
		front: "VALID PROBABILITY",
		back: "Always between 0 and 1 inclusive. 0 = impossible. 1 = certain. 1.2 cannot be a probability.",
		concept: "basic-probability"
	},
	{
		id: "fc-interval",
		front: "INTERVAL NOTATION",
		back: "[ ] includes the end. ( ) excludes it. Infinity always gets a parenthesis: [2, ∞) means x ≥ 2.",
		concept: "inequalities"
	},
	{
		id: "fc-natural",
		front: "NATURAL vs WHOLE",
		back: "Naturals: 1, 2, 3, … (counting). Wholes: 0, 1, 2, 3, … Zero is whole, not natural, in this course's hierarchy.",
		concept: "number-systems"
	},
	{
		id: "fc-placebo-word",
		front: "PERCENTAGE OF PLACEBO WHO PASSED",
		back: "Denominator is the placebo group, not the grand total. If 28 of 41 placebo passed → 28/41.",
		concept: "conditional"
	},
	{
		id: "fc-causation",
		front: "CORRELATION vs CAUSATION",
		back: "A strong r means they move together linearly. It does not prove that one causes the other.",
		concept: "correlation"
	},
	{
		id: "fc-sample-space",
		front: "SAMPLE SPACE",
		back: "The complete list of possible outcomes. Probabilities over the whole sample space add to 1.",
		concept: "basic-probability"
	}
];
function FlashcardsPage() {
	const [order, setOrder] = (0, import_react.useState)(() => FLASHCARDS.map((_, i) => i));
	const [i, setI] = (0, import_react.useState)(0);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const card = FLASHCARDS[order[i] ?? 0];
	const n = FLASHCARDS.length;
	const label = (0, import_react.useMemo)(() => `${i + 1} / ${n}`, [i, n]);
	function prev() {
		setI((x) => (x - 1 + n) % n);
		setFlipped(false);
	}
	function next() {
		setI((x) => (x + 1) % n);
		setFlipped(false);
	}
	function mix() {
		setOrder(shuffle(FLASHCARDS.map((_, idx) => idx)));
		setI(0);
		setFlipped(false);
	}
	if (!card) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Flashcards"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Tap the card to flip. These are the phrases C955 leans on."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs tabular-nums text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFlipped((f) => !f),
				className: "mt-4 flex min-h-[240px] w-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-8 text-center transition-colors hover:border-accent/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] uppercase tracking-[0.2em] text-muted",
						children: [flipped ? "Back" : "Front", " · tap to flip"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl",
						children: flipped ? card.back : card.front
					}),
					flipped && card.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 text-sm text-muted",
						children: card.hint
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: prev,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Previous"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: mix,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), " Shuffle"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: next,
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})
				]
			})
		]
	});
}
//#endregion
export { FlashcardsPage as component };
