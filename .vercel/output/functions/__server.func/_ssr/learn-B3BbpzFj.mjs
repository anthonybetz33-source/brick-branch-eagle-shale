import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useProgress, o as accuracy } from "./router-DJ0Y2-ZD.mjs";
import { t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as Badge } from "./badge-CN81wcAL.mjs";
import { t as LESSONS } from "./lessons-BaEeiWsX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-B3BbpzFj.js
var import_jsx_runtime = require_jsx_runtime();
function LearnIndex() {
	const byConcept = useProgress((s) => s.byConcept);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold tracking-tight",
			children: "Learn"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-muted",
			children: "Each lesson is a sit-down with a tutor: plain English, worked examples, a shortcut, and the trap the exam loves."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: LESSONS.map((lesson) => {
				const stats = byConcept[lesson.concept];
				const acc = accuracy(stats.correct, stats.attempted);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/learn/$slug",
					params: { slug: lesson.slug },
					className: "rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: ["Lesson ", lesson.order]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "muted",
								children: [lesson.minutes, " min"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-lg font-semibold",
							children: lesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: lesson.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-subtle",
							children: [CONCEPT_META[lesson.concept].short, acc != null ? ` · your accuracy ${acc}%` : ""]
						})
					]
				}, lesson.slug);
			})
		})
	] });
}
//#endregion
export { LearnIndex as component };
