import { t as cn } from "./utils-DGuhNb5t.mjs";
import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as Eye, l as Lightbulb, n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Callouts-jDkcxPuu.js
var import_jsx_runtime = require_jsx_runtime();
function ShortcutBox({ title = "C955 Shortcut", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("rounded-lg border border-accent/30 bg-accent/8 p-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-3.5" }), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm leading-relaxed text-fg",
			children
		})]
	});
}
function TrapBox({ title = "Common Trap", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-lg border border-bad/30 bg-bad/8 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bad",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm leading-relaxed text-fg",
			children
		})]
	});
}
function WatchBox({ words, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-lg border border-warn/25 bg-warn/8 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-warn",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), "Watch for this wording"]
			}),
			words?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-wrap gap-1.5",
				children: words.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-fg",
					children: w
				}, w))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm leading-relaxed text-fg",
				children
			})
		]
	});
}
function FormulaBox({ title, formula, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-wider text-muted",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 overflow-x-auto font-mono text-base text-accent sm:text-lg",
				children: formula
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: note
			}) : null
		]
	});
}
//#endregion
export { WatchBox as i, ShortcutBox as n, TrapBox as r, FormulaBox as t };
