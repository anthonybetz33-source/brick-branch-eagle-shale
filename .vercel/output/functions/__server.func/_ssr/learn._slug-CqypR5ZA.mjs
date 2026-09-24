import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { R as notFound, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ArrowLeft, x as ArrowRight } from "../_libs/lucide-react.mjs";
import { f as Button, r as Route$1 } from "./router-DJ0Y2-ZD.mjs";
import { i as WatchBox, n as ShortcutBox, r as TrapBox, t as FormulaBox } from "./Callouts-jDkcxPuu.mjs";
import { t as VisualBlock } from "./VisualBlock-1_Vftn0d.mjs";
import { t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as Badge } from "./badge-CN81wcAL.mjs";
import { n as getLesson, t as LESSONS } from "./lessons-BaEeiWsX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn._slug-CqypR5ZA.js
var import_jsx_runtime = require_jsx_runtime();
function LessonView({ lesson }) {
	const meta = CONCEPT_META[lesson.concept];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-muted",
				children: [
					"Lesson ",
					lesson.order,
					" · ",
					lesson.minutes,
					" min"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
				children: lesson.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: lesson.subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: meta.short }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "muted",
					children: meta.title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-5",
				children: lesson.sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { section: s }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg font-semibold",
					children: "Practice this idea"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"A short drill using only ",
						meta.title,
						" items, with explanations after each answer."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/drill/$concept",
						params: { concept: lesson.concept },
						children: ["Drill ", meta.short]
					})
				})]
			})
		]
	});
}
function Section({ section }) {
	switch (section.type) {
		case "intro": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-base leading-relaxed text-fg",
			children: section.body
		});
		case "bullets": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold",
			children: section.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg",
			children: section.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: it }, it))
		})] });
		case "formula": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaBox, {
			title: section.title,
			formula: section.formula,
			note: section.note
		});
		case "example": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-bg-elevated p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: section.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed",
					children: section.setup
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 list-decimal space-y-1.5 pl-5 text-sm text-fg",
					children: section.steps.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: st }, st))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-md bg-accent/10 px-3 py-2 font-mono text-sm text-accent",
					children: ["Answer: ", section.answer]
				})
			]
		});
		case "shortcut": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShortcutBox, {
			title: section.title ?? "C955 Shortcut",
			children: section.body
		});
		case "trap": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrapBox, {
			title: section.title ?? "Common Trap",
			children: section.body
		});
		case "watch": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchBox, {
			words: section.words,
			children: section.body
		});
		case "visual": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisualBlock, {
			visual: section.visual,
			caption: section.caption
		});
		case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: section.tone === "warn" ? "rounded-lg border border-warn/25 bg-warn/8 p-4 text-sm" : section.tone === "tip" ? "rounded-lg border border-accent/25 bg-accent/8 p-4 text-sm" : "rounded-lg border border-border bg-surface p-4 text-sm text-muted",
			children: section.body
		});
		default: return null;
	}
}
function LessonPage() {
	const { slug } = Route$1.useParams();
	const lesson = getLesson(slug);
	if (!lesson) throw notFound();
	const idx = LESSONS.findIndex((l) => l.slug === slug);
	const prev = LESSONS[idx - 1];
	const next = LESSONS[idx + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			asChild: true,
			className: "-ml-3 mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/learn",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " All lessons"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonView, { lesson }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-8 flex max-w-3xl justify-between gap-3",
			children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$slug",
					params: { slug: prev.slug },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
						" ",
						prev.title
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$slug",
					params: { slug: next.slug },
					children: [
						next.title,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
					]
				})
			}) : null]
		})
	] });
}
//#endregion
export { LessonPage as component };
