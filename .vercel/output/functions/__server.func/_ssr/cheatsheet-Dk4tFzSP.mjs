import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as ShortcutBox, t as FormulaBox } from "./Callouts-jDkcxPuu.mjs";
import { t as VisualBlock } from "./VisualBlock-1_Vftn0d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cheatsheet-Dk4tFzSP.js
var import_jsx_runtime = require_jsx_runtime();
function CheatSheet() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Cheat sheet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Quick-reference formulas, lists, and wording cues. Not an official WGU sheet."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Probability rules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Basic",
						formula: "P = favorable / total",
						note: "Always between 0 and 1. 0 = impossible, 1 = certain."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Complement / missing",
						formula: "P(not A) = 1 − P(A)",
						note: "Add listed probabilities, subtract from 1."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "OR",
						formula: "P(A OR B) = P(A) + P(B) − P(A AND B)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "AND (general)",
						formula: "P(A AND B) = P(A) × P(B|A)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "AND (independent)",
						formula: "P(A AND B) = P(A) × P(B)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Conditional",
						formula: "P(A | B) = P(A AND B) / P(B)",
						note: "GIVEN = denominator."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutBox, { children: "OR = add, subtract overlap. AND = multiply. GIVEN = denominator. Without replacement = total drops." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Two-way tables"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-1 pl-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Joint: one cell / grand total" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Marginal: row or column total / grand total" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Conditional: cell / that group’s total (“of placebo”, “given experimental”)" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, { visual: {
						kind: "table",
						caption: "Example study",
						columns: [
							"Pass",
							"Fail",
							"Total"
						],
						rows: [{
							label: "Experimental",
							values: [
								60,
								28,
								88
							]
						}, {
							label: "Placebo",
							values: [
								28,
								13,
								41
							]
						}],
						totals: [
							88,
							41,
							129
						]
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Percentage of placebo who passed = 28/41, not 28/129."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Independent vs dependent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Test",
						formula: "Independent  ⇔  P(B) = P(B | A)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "With replacement → independent. Without replacement → dependent. Mutually exclusive is a different idea."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Empirical rule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Normal data",
						formula: "68% within 1 SD · 95% within 2 SD · 99.7% within 3 SD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "z-score",
						formula: "z = (x − mean) / SD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, {
						visual: {
							kind: "bell",
							mean: 100,
							sd: 15,
							shadeSd: 2
						},
						caption: "Mean 100, SD 15, shaded ±2 SD ≈ 95%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Correlation & regression"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "r",
						formula: "−1 ≤ r ≤ 1",
						note: "Sign = direction. |r| = strength. 0 = no linear association. r is often not printed on the scatterplot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "r ≈ 0.1 weak + · 0.6 moderate + · 0.9 strong + · −0.7 strong −"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
						title: "Least squares",
						formula: "ŷ = a + b x",
						note: "a intercept, b slope. Predict by plugging in x. You do not need r for the plug-in."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Number systems"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, { visual: { kind: "hierarchy" } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "list-disc space-y-1 pl-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3 — natural, whole, integer, rational, real" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "0 — whole, integer, rational, real" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "−4 — integer, rational, real" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1/2 and 0.75 — rational, real" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "√2 and π — irrational, real" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Inequalities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Filled dot / [ ] includes. Open dot / ( ) excludes. Infinity always uses a parenthesis."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, {
						visual: {
							kind: "number-line",
							min: -2,
							max: 6,
							from: 2,
							to: 6,
							closedLeft: true,
							closedRight: false
						},
						caption: "x ≥ 2"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Primes (useful ranges)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "1–10:"
						}), " 2, 3, 5, 7"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "1–20:"
						}), " 2, 3, 5, 7, 11, 13, 17, 19"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "1–25:"
						}), " 2, 3, 5, 7, 11, 13, 17, 19, 23"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "1–50:"
						}), " + 29, 31, 37, 41, 43, 47"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "1–100:"
						}), " + 53, 59, 61, 67, 71, 73, 79, 83, 89, 97"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "1 is neither prime nor composite. 2 is the only even prime."
					})
				]
			})
		]
	});
}
//#endregion
export { CheatSheet as component };
