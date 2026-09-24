import { i as __toESM } from "../_runtime.mjs";
import { i as shuffle } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as CONCEPT_IDS, f as Button, i as Route$2 } from "./router-DJ0Y2-ZD.mjs";
import { t as CONCEPT_META } from "./concepts-CIZFp2CZ.mjs";
import { t as QUESTIONS } from "./questions-DdWSlAwK.mjs";
import { t as QuizPlayer } from "./QuizPlayer-C-gdU9NP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drill._concept-BgaHmMd2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DrillPage() {
	const { concept } = Route$2.useParams();
	const id = concept;
	const valid = CONCEPT_IDS.includes(id);
	const questions = (0, import_react.useMemo)(() => {
		if (!valid) return [];
		const pool = QUESTIONS.filter((q) => q.concept === id);
		return shuffle(pool).slice(0, 12).map((q) => ({
			...q,
			choices: shuffle(q.choices)
		}));
	}, [id, valid]);
	if (!valid) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Unknown concept"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/learn",
				children: "Lessons"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPlayer, {
		mode: "drill",
		questions,
		title: `${CONCEPT_META[id].title} drill`
	});
}
//#endregion
export { DrillPage as component };
