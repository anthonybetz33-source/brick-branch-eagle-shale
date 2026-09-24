import { i as __toESM } from "../_runtime.mjs";
import { i as shuffle } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Button, l as useProgress, n as Route, u as weakConcepts } from "./router-DJ0Y2-ZD.mjs";
import { n as QUIZ_MODES } from "./concepts-CIZFp2CZ.mjs";
import { t as QUESTIONS } from "./questions-DdWSlAwK.mjs";
import { t as QuizPlayer } from "./QuizPlayer-C-gdU9NP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._mode-BjPDiOeC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function questionsForMode(mode, progress) {
	const spec = QUIZ_MODES[mode];
	let pool = QUESTIONS.slice();
	if (spec.concepts?.length) {
		const set = new Set(spec.concepts);
		pool = pool.filter((q) => set.has(q.concept));
	}
	if (spec.difficulties?.length) {
		const set = new Set(spec.difficulties);
		pool = pool.filter((q) => set.has(q.difficulty));
	}
	if (mode === "weak") {
		const weak = weakConcepts(progress, 2).slice(0, 4);
		if (weak.length) {
			const ids = new Set(weak.map((w) => w.id));
			const focused = QUESTIONS.filter((q) => ids.has(q.concept));
			if (focused.length >= 6) pool = focused;
		}
	}
	return takeSpread(pool, spec.count, progress).map((q) => ({
		...q,
		choices: shuffle(q.choices)
	}));
}
function takeSpread(pool, count, progress) {
	const unseen = pool.filter((q) => !progress.seenIds.includes(q.id));
	const missed = new Set(progress.missed.map((m) => m.questionId));
	const retry = pool.filter((q) => missed.has(q.id));
	const rest = shuffle(pool);
	const out = [];
	const used = /* @__PURE__ */ new Set();
	const push = (q) => {
		if (used.has(q.id)) return;
		used.add(q.id);
		out.push(q);
	};
	for (const q of shuffle(retry)) {
		if (out.length >= Math.min(count, Math.ceil(count * .35))) break;
		push(q);
	}
	for (const q of shuffle(unseen.length ? unseen : rest)) {
		if (out.length >= count) break;
		push(q);
	}
	for (const q of rest) {
		if (out.length >= count) break;
		push(q);
	}
	return shuffle(out).slice(0, count);
}
function QuizModePage() {
	const { mode } = Route.useParams();
	const spec = QUIZ_MODES[mode];
	const progress = useProgress();
	const questions = (0, import_react.useMemo)(() => {
		if (!spec) return [];
		return questionsForMode(mode, progress);
	}, [mode]);
	if (!spec) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Unknown quiz"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/quiz",
				children: "Back"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, {
		mode,
		questions
	});
}
//#endregion
export { QuizModePage as component };
