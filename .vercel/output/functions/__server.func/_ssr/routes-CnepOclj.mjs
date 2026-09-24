import "../_runtime.mjs";
import { t as cn } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as BookOpen, i as Swords, r as Target, x as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as strongestConcept, f as Button, l as useProgress, o as accuracy, s as formatDuration, u as weakConcepts } from "./router-DJ0Y2-ZD.mjs";
import { t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as QUESTIONS } from "./questions-DdWSlAwK.mjs";
import { t as Progress } from "./progress-2JhZBy8Q.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface text-fg shadow-[0_12px_40px_-24px_rgb(0,0,0,0.8)]", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-5 pb-0", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5", className),
		...props
	});
}
function Home() {
	const p = useProgress();
	const acc = accuracy(p.correct, p.attempted);
	const weak = weakConcepts(p);
	const strong = strongestConcept(p);
	const last = p.quizHistory[0];
	const weakest = weak[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted",
			children: "WGU C955 tutor"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
			children: "C955 Progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-muted",
			children: "Learn the idea in plain English, see worked examples, then practice until the wording stops tricking you."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Questions answered",
					value: String(p.attempted)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Accuracy",
					value: acc == null ? "—" : `${acc}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Current streak",
					value: String(p.streak),
					hint: `Best ${p.bestStreak}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Study time",
					value: formatDuration(p.studySeconds)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Weakest concept",
				value: weakest ? CONCEPT_META[weakest.id].title : "Not enough data yet",
				hint: weakest && weakest.acc != null ? `${weakest.acc}%` : "Answer a few items first"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Strongest concept",
				value: strong ? CONCEPT_META[strong.id].title : "Not enough data yet",
				hint: strong && strong.acc != null ? `${strong.acc}%` : "Keep going"
			})]
		}),
		last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Recent quiz: ",
				last.correct,
				"/",
				last.total,
				" (",
				Math.round(100 * last.correct / last.total),
				"%)"
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col gap-3 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/learn",
						children: ["Continue learning", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz/$mode",
						params: { mode: "quick-10" },
						children: ["Take Quick 10", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz/$mode",
						params: { mode: "weak" },
						children: ["Drill weak areas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" })]
					})
				})
			]
		}),
		weak.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Your weak areas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: weak.slice(0, 5).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: CONCEPT_META[w.id].title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted",
							children: [
								w.correct,
								"/",
								w.attempted,
								" correct"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm tabular-nums text-accent",
								children: [w.acc, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/drill/$concept",
									params: { concept: w.id },
									children: "Drill"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-3",
						value: w.acc ?? 0
					})]
				}, w.id))
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "How this tutor works" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "LEARN → EXAMPLES → PRACTICE → REVIEW MISTAKES → DRILL WEAK AREAS → MIXED QUIZ" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						to: "/learn",
						icon: BookOpen,
						title: "Learn",
						body: "Short lessons with shortcuts, traps, and worked examples."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						to: "/quiz",
						icon: Swords,
						title: "Practice",
						body: `${QUESTIONS.length} questions. Immediate teaching when you miss.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quiz/$mode",
						params: { mode: "exam" },
						className: "rounded-lg border border-border bg-bg-elevated p-4 hover:border-accent/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-medium",
								children: "Simulate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Timed mixed set. No hints until the review."
							})
						]
					})
				]
			})]
		})
	] });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wider text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-2xl font-semibold tabular-nums leading-tight",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function Mini({ to, icon: Icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-lg border border-border bg-bg-elevated p-4 hover:border-accent/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: body
			})
		]
	});
}
//#endregion
export { Home as component };
