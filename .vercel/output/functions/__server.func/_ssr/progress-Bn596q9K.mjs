import { t as cn } from "./utils-DGuhNb5t.mjs";
import { a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BADGE_LABELS, d as CONCEPT_IDS, f as Button, l as useProgress, o as accuracy, p as buttonVariants, s as formatDuration, u as weakConcepts } from "./router-DJ0Y2-ZD.mjs";
import { t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as QUESTIONS } from "./questions-DdWSlAwK.mjs";
import { t as Progress } from "./progress-2JhZBy8Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-Bn596q9K.js
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-black/70", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-6 text-fg shadow-glow", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "secondary" }), className),
		...props
	});
}
function ProgressPage() {
	const p = useProgress();
	const reset = useProgress((s) => s.reset);
	const acc = accuracy(p.correct, p.attempted);
	const weak = weakConcepts(p, 2);
	const last = p.quizHistory[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold tracking-tight",
			children: "Progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Stored on this device only. Reset anytime."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Attempted",
					value: String(p.attempted)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Correct",
					value: String(p.correct)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Accuracy",
					value: acc == null ? "—" : `${acc}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Streak",
					value: `${p.streak} (best ${p.bestStreak})`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Study time",
					value: formatDuration(p.studySeconds)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Sessions",
					value: String(p.sessions)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Bank seen",
					value: `${p.seenIds.length} / ${QUESTIONS.length}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					label: "Best exam sim",
					value: p.bestExamPct == null ? "—" : `${Math.round(p.bestExamPct)}%`
				})
			]
		}),
		last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Last quiz: ",
				last.correct,
				"/",
				last.total,
				" · ",
				formatDuration(last.seconds)
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-xl font-semibold",
			children: "By concept"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: CONCEPT_IDS.map((id) => {
				const c = p.byConcept[id];
				const a = accuracy(c.correct, c.attempted);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: CONCEPT_META[id].title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted",
							children: c.attempted ? `${c.correct}/${c.attempted}` : "No attempts yet"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums",
								children: a == null ? "—" : `${a}%`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/drill/$concept",
									params: { concept: id },
									children: "Drill"
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-3",
						value: a ?? 0
					})]
				}, id);
			})
		}),
		weak.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Weak areas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: weak.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: CONCEPT_META[w.id].title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-accent",
							children: [w.acc, "%"]
						})]
					}, w.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/quiz/$mode",
						params: { mode: "weak" },
						children: "Drill weak areas"
					})
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-xl font-semibold",
			children: "Badges"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2",
			children: Object.entries(BADGE_LABELS).map(([id, b]) => {
				const on = p.badges.includes(id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-lg border p-4 ${on ? "border-accent/40 bg-accent/10" : "border-border bg-surface opacity-50"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: b.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: b.blurb
					})]
				}, id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					children: "Reset progress"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reset all progress?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This clears scores, streaks, weak areas, and quiz history on this device. Lessons stay available." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => reset(),
				children: "Reset"
			})] })] })] })
		})
	] });
}
function Tile({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { ProgressPage as component };
