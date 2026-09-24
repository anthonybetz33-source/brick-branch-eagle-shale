import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QUIZ_MODES } from "./concepts-CIZFp2CZ.mjs";
import { t as QUESTIONS } from "./questions-DdWSlAwK.mjs";
import { t as Badge } from "./badge-CN81wcAL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-qNEmyFwh.js
var import_jsx_runtime = require_jsx_runtime();
var ORDER = [
	"quick-10",
	"quick-20",
	"probability",
	"conditional",
	"independent",
	"normal",
	"scatter",
	"regression",
	"mixed",
	"weak",
	"boss",
	"exam"
];
function QuizIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-semibold tracking-tight",
			children: "Quiz"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-2xl text-muted",
			children: [QUESTIONS.length, " questions in the bank. Choices shuffle every time. Wrong answers get a full walkthrough, not just the letter."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: ORDER.map((id) => {
				const m = QUIZ_MODES[id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/quiz/$mode",
					params: { mode: id },
					className: "rounded-xl border border-border bg-surface p-5 hover:border-accent/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold",
									children: m.title
								}),
								m.exam ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "warn",
									children: "Timed"
								}) : null,
								id === "boss" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Hard" }) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: m.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-subtle",
							children: [
								m.count,
								" questions",
								m.timed ? " · 60 minutes · answers at the end" : " · instant explanations"
							]
						})
					]
				}, id);
			})
		})
	] });
}
//#endregion
export { QuizIndex as component };
