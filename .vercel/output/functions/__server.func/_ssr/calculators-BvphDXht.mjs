import { i as __toESM } from "../_runtime.mjs";
import { n as fmtFrac, t as cn } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as Button } from "./router-DJ0Y2-ZD.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calculators-BvphDXht.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-muted", className),
		...props
	});
}
function CalculatorsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: "Calculators"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Tiny helpers that also show the arithmetic, so you still learn the move."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasicProb, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentCalc, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionalCalc, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeanCalc, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SdCalc, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZCalc, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegCalc, {})
				]
			})
		]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function BasicProb() {
	const [fav, setFav] = (0, import_react.useState)("8");
	const [tot, setTot] = (0, import_react.useState)("12");
	const f = Number(fav);
	const t = Number(tot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Basic probability",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Favorable",
					value: fav,
					onChange: setFav
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Total",
					value: tot,
					onChange: setTot
				})]
			}),
			t > 0 && Number.isFinite(f) && Number.isFinite(t) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: [
					f,
					"/",
					t,
					" = ",
					fmtFrac(f, t),
					" = ",
					(f / t).toFixed(4),
					" = ",
					(100 * f / t).toFixed(1),
					"%"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-bad",
				children: "Total must be positive."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "Probability = favorable ÷ total. Simplify the fraction last."
			})
		]
	});
}
function PercentCalc() {
	const [part, setPart] = (0, import_react.useState)("28");
	const [whole, setWhole] = (0, import_react.useState)("41");
	const p = Number(part);
	const w = Number(whole);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Percentage of a group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Part (numerator)",
					value: part,
					onChange: setPart
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Group size (denominator)",
					value: whole,
					onChange: setWhole
				})]
			}),
			w !== 0 && Number.isFinite(p) && Number.isFinite(w) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: [
					p,
					"/",
					w,
					" × 100 = ",
					(100 * p / w).toFixed(1),
					"%"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-bad",
				children: "Group size cannot be 0."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "“Of placebo participants” → placebo total is the denominator, never the grand total unless asked."
			})
		]
	});
}
function ConditionalCalc() {
	const [both, setBoth] = (0, import_react.useState)("20");
	const [given, setGiven] = (0, import_react.useState)("45");
	const b = Number(both);
	const g = Number(given);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Conditional probability",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "P(A AND B) or both-count",
					value: both,
					onChange: setBoth
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "P(B) or given-group size",
					value: given,
					onChange: setGiven
				})]
			}),
			g !== 0 && Number.isFinite(b) && Number.isFinite(g) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: [
					"P(A|B) = ",
					b,
					"/",
					g,
					" = ",
					(b / g).toFixed(4),
					" = ",
					(100 * b / g).toFixed(1),
					"%"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-bad",
				children: "The given group cannot be 0."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "GIVEN = denominator. Library example: 20/45 ≈ 44.4%."
			})
		]
	});
}
function MeanCalc() {
	const [raw, setRaw] = (0, import_react.useState)("10, 12, 14, 16");
	const nums = raw.split(/[,\s]+/).map(Number).filter((n) => Number.isFinite(n));
	const mean = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Mean",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Numbers (comma or space separated)",
				value: raw,
				onChange: setRaw
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: mean == null ? "Enter at least one number." : `mean = ${mean.toFixed(4)}  (n = ${nums.length})`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "Add them up, divide by how many there are."
			})
		]
	});
}
function SdCalc() {
	const [raw, setRaw] = (0, import_react.useState)("4, 6, 8, 10, 12");
	const pop = usePop();
	const nums = raw.split(/[,\s]+/).map(Number).filter((n) => Number.isFinite(n));
	const n = nums.length;
	const mean = n ? nums.reduce((a, b) => a + b, 0) / n : 0;
	const denom = pop ? n : n - 1;
	const sd = n > 1 && denom > 0 ? Math.sqrt(nums.reduce((a, x) => a + (x - mean) ** 2, 0) / denom) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Standard deviation",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Numbers",
				value: raw,
				onChange: setRaw
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: pop ? "default" : "secondary",
					onClick: () => pop.set(true),
					children: "Population (÷ n)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: !pop.value ? "default" : "secondary",
					onClick: () => pop.set(false),
					children: "Sample (÷ n−1)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: sd == null ? "Need at least 2 numbers." : `mean = ${mean.toFixed(4)},  SD = ${sd.toFixed(4)}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "SD is the typical distance from the mean. C955 empirical-rule items usually hand you SD rather than asking you to compute it."
			})
		]
	});
}
function usePop() {
	const [value, set] = (0, import_react.useState)(false);
	return {
		value,
		set
	};
}
function ZCalc() {
	const [x, setX] = (0, import_react.useState)("64");
	const [m, setM] = (0, import_react.useState)("70");
	const [s, setS] = (0, import_react.useState)("3");
	const xv = Number(x), mv = Number(m), sv = Number(s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Z-score",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "x",
						value: x,
						onChange: setX
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Mean",
						value: m,
						onChange: setM
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SD",
						value: s,
						onChange: setS
					})
				]
			}),
			sv !== 0 && Number.isFinite(xv) && Number.isFinite(mv) && Number.isFinite(sv) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: [
					"z = (",
					xv,
					" − ",
					mv,
					") / ",
					sv,
					" = ",
					((xv - mv) / sv).toFixed(4)
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-bad",
				children: "SD cannot be 0."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "Negative z means below the mean. |z| = 2 → empirical-rule 95% territory."
			})
		]
	});
}
function RegCalc() {
	const [a, setA] = (0, import_react.useState)("5.2");
	const [b, setB] = (0, import_react.useState)("1.15");
	const [x, setX] = (0, import_react.useState)("50");
	const av = Number(a), bv = Number(b), xv = Number(x);
	const ok = Number.isFinite(av) && Number.isFinite(bv) && Number.isFinite(xv);
	const y = (0, import_react.useMemo)(() => av + bv * xv, [
		av,
		bv,
		xv
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Regression prediction",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Intercept a",
						value: a,
						onChange: setA
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Slope b",
						value: b,
						onChange: setB
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "x",
						value: x,
						onChange: setX
					})
				]
			}),
			ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-accent",
				children: [
					"ŷ = ",
					av,
					" + ",
					bv,
					"(",
					xv,
					") = ",
					av,
					" + ",
					bv * xv,
					" = ",
					Number(y.toFixed(4))
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-bad",
				children: "Need numeric a, b, and x."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "If r is printed nearby and the question only wants ŷ, ignore r."
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value),
			inputMode: "decimal"
		})]
	});
}
//#endregion
export { CalculatorsPage as component };
