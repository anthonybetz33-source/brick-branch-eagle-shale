import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ChevronRight, h as Clock, o as RotateCcw, t as X, v as Check } from "../_libs/lucide-react.mjs";
import { f as Button, l as useProgress } from "./router-DJ0Y2-ZD.mjs";
import { n as ShortcutBox, r as TrapBox } from "./Callouts-jDkcxPuu.mjs";
import { t as VisualBlock } from "./VisualBlock-1_Vftn0d.mjs";
import { n as QUIZ_MODES, t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as Badge } from "./badge-CN81wcAL.mjs";
import { t as Progress } from "./progress-2JhZBy8Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QuizPlayer-C-gdU9NP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPlayer({ mode, questions, title }) {
	const spec = mode === "drill" ? {
		title: title ?? "Concept drill",
		immediate: true,
		timed: false,
		exam: false,
		seconds: void 0,
		count: questions.length
	} : QUIZ_MODES[mode];
	const recordAnswer = useProgress((s) => s.recordAnswer);
	const finishQuiz = useProgress((s) => s.finishQuiz);
	const [idx, setIdx] = (0, import_react.useState)(0);
	const [chosen, setChosen] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("ask");
	const [log, setLog] = (0, import_react.useState)([]);
	const logRef = (0, import_react.useRef)([]);
	const finishedRef = (0, import_react.useRef)(false);
	const [secondsLeft, setSecondsLeft] = (0, import_react.useState)(spec.seconds ?? 0);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const started = (0, import_react.useMemo)(() => Date.now(), []);
	const q = questions[idx];
	const immediate = spec.immediate;
	(0, import_react.useEffect)(() => {
		if (!spec.timed || phase === "done") return;
		const t = window.setInterval(() => {
			setSecondsLeft((s) => {
				if (s <= 1) {
					window.clearInterval(t);
					return 0;
				}
				return s - 1;
			});
			setElapsed((e) => e + 1);
		}, 1e3);
		return () => window.clearInterval(t);
	}, [spec.timed, phase]);
	(0, import_react.useEffect)(() => {
		if (spec.timed && secondsLeft === 0 && phase !== "done" && questions.length) wrapUp();
	}, [secondsLeft]);
	function submit(choice) {
		if (!q || chosen) return;
		setChosen(choice);
		const ok = choice === q.correct;
		recordAnswer({
			questionId: q.id,
			concept: q.concept,
			difficulty: q.difficulty,
			correct: ok,
			chosen: choice
		});
		const item = {
			q,
			chosen: choice,
			ok
		};
		logRef.current = [...logRef.current, item];
		setLog(logRef.current);
		if (immediate) setPhase("feedback");
		else goNext();
	}
	function goNext() {
		if (idx + 1 >= questions.length) {
			wrapUp();
			return;
		}
		setIdx((i) => i + 1);
		setChosen(null);
		setPhase("ask");
	}
	function wrapUp() {
		if (finishedRef.current) return;
		finishedRef.current = true;
		const seconds = spec.timed ? (spec.seconds ?? 0) - secondsLeft : Math.round((Date.now() - started) / 1e3);
		setElapsed(seconds);
		setPhase("done");
		if (mode !== "drill") finishQuiz({
			mode,
			total: questions.length,
			correct: logRef.current.filter((l) => l.ok).length,
			seconds,
			missedIds: logRef.current.filter((l) => !l.ok).map((l) => l.q.id)
		});
	}
	if (!questions.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "No questions in this set yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Try Mixed C955, or learn a lesson first so weak-area tracking has data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/quiz",
					children: "Back to quizzes"
				})
			})
		]
	});
	if (phase === "done") {
		const total = log.length || questions.length;
		const right = log.filter((l) => l.ok).length;
		const pct = total ? Math.round(100 * right / total) : 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			spec.exam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: "C955 Practice Simulation — Not an Official WGU Exam"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl font-semibold",
				children: "Results"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Score",
						value: `${right} / ${total}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Percent",
						value: `${pct}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Time",
						value: fmtTime(elapsed)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/quiz",
						children: "Another quiz"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/learn",
						children: "Review lessons"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-xl font-semibold",
				children: "Question review"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: log.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mr-2 text-muted",
									children: [i + 1, "."]
								}), item.q.stem]
							}), item.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5 shrink-0 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5 shrink-0 text-bad" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: ["Your answer: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: item.ok ? "text-ok" : "text-bad",
								children: item.chosen
							})]
						}),
						!item.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Correct: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-accent",
								children: item.q.correct
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-3 list-decimal space-y-1 pl-5 text-sm text-muted",
							children: item.q.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})
					]
				}, `${item.q.id}-${i}`))
			})
		] });
	}
	if (!q) return null;
	const letters = [
		"A",
		"B",
		"C",
		"D"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: spec.title
			}), spec.exam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "C955 Practice Simulation — Not an Official WGU Exam"
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-sm tabular-nums text-muted",
				children: [spec.timed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-1", secondsLeft < 60 && "text-bad"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
						" ",
						fmtTime(secondsLeft)
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					idx + 1,
					" / ",
					questions.length
				] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			className: "mt-3",
			value: (idx + (phase === "feedback" ? 1 : 0)) / questions.length * 100
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "muted",
						children: CONCEPT_META[q.concept].title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: q.difficulty === "BOSS" || q.difficulty === "HARD" ? "warn" : "muted",
						children: q.difficulty
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl",
					children: q.stem
				}),
				q.visual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, { visual: q.visual }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: q.choices.map((c, i) => {
						const show = phase === "feedback";
						const isCorrect = c === q.correct;
						const isPicked = c === chosen;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !!chosen && immediate,
							onClick: () => submit(c),
							className: cn("flex min-h-12 items-start gap-3 rounded-md border px-3 py-3 text-left text-sm transition-colors duration-150", !show && "border-border bg-bg-elevated hover:border-accent/40 hover:bg-surface-2", show && isCorrect && "border-ok/50 bg-ok/10", show && isPicked && !isCorrect && "border-bad/50 bg-bad/10", show && !isPicked && !isCorrect && "border-border bg-bg-elevated opacity-70"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-7 shrink-0 place-items-center rounded-sm border border-border font-mono text-xs text-muted",
								children: letters[i]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pt-0.5",
								children: c
							})]
						}, `${q.id}-${c}`);
					})
				}),
				phase === "feedback" && chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						chosen === q.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-medium text-ok",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" }), " Correct."]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-medium text-bad",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), " Not quite."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: ["Correct answer: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-accent",
								children: q.correct
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted",
							children: "Why"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed",
							children: q.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutBox, { children: q.shortcut }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrapBox, { children: q.trap }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => goNext(),
							className: "mt-2",
							children: [idx + 1 >= questions.length ? "See results" : "Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})
					]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quiz",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Exit"]
				})
			})
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function fmtTime(s) {
	const m = Math.floor(Math.max(0, s) / 60);
	const r = Math.max(0, s) % 60;
	return `${m}:${String(r).padStart(2, "0")}`;
}
//#endregion
export { QuizPlayer as t };
