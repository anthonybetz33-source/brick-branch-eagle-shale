import { i as __toESM } from "../_runtime.mjs";
import { r as seededRng } from "./utils-DGuhNb5t.mjs";
import { S as require_react, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VisualBlock-1_Vftn0d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VisualBlock({ visual, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "my-4 overflow-hidden rounded-lg border border-border bg-bg-elevated p-3",
		children: [
			visual.kind === "scatter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
				r: visual.r,
				seed: visual.seed
			}),
			visual.kind === "bell" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
				mean: visual.mean,
				sd: visual.sd,
				shadeSd: visual.shadeSd
			}),
			visual.kind === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, { visual }),
			visual.kind === "venn" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Venn, { visual }),
			visual.kind === "number-line" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberLine, { visual }),
			visual.kind === "hierarchy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hierarchy, {}),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-2 text-center text-xs text-muted",
				children: caption
			}) : null
		]
	});
}
function Scatter({ r, seed }) {
	const pts = (0, import_react.useMemo)(() => correlatedPoints(40, r, seed), [r, seed]);
	const w = 320, h = 200, pad = 22;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "mx-auto h-auto w-full max-w-md",
		role: "img",
		"aria-label": `Scatterplot with r about ${r}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: pad,
				y: 12,
				width: 276,
				height: 164,
				fill: "transparent",
				stroke: "currentColor",
				className: "text-border"
			}),
			pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: pad + p[0] * 276,
				cy: 12 + (1 - p[1]) * 164,
				r: 3.2,
				className: "fill-accent",
				opacity: .9
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: w / 2,
				y: 196,
				textAnchor: "middle",
				className: "fill-muted",
				fontSize: "11",
				fontFamily: "var(--font-mono)",
				children: ["r ≈ ", r]
			})
		]
	});
}
function correlatedPoints(n, r, seed) {
	const rng = seededRng(seed + 17);
	const gauss = () => {
		const u = Math.max(1e-12, rng());
		const v = rng();
		return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
	};
	const rr = Math.max(-1, Math.min(1, r));
	const out = [];
	for (let i = 0; i < n; i++) {
		const x = gauss();
		const y = rr * x + Math.sqrt(Math.max(0, 1 - rr * rr)) * gauss();
		out.push([clamp01((x + 3) / 6), clamp01((y + 3) / 6)]);
	}
	return out;
}
function clamp01(x) {
	return Math.max(.04, Math.min(.96, x));
}
function Bell({ mean, sd, shadeSd }) {
	const w = 360, h = 180, pad = 20;
	const xs = [];
	const mu = mean;
	const s = sd || 1;
	const min = mu - 4 * s;
	const max = mu + 4 * s;
	const pdf = (x) => Math.exp(-.5 * ((x - mu) / s) ** 2);
	const N = 80;
	for (let i = 0; i <= N; i++) xs.push(min + i / N * (max - min));
	const ys = xs.map(pdf);
	const maxY = Math.max(...ys);
	const X = (x) => pad + (x - min) / (max - min) * 320;
	const Y = (y) => 152 - y / maxY * 130;
	const line = xs.map((x, i) => `${i ? "L" : "M"}${X(x)},${Y(ys[i])}`).join(" ");
	const k = shadeSd ?? 1;
	const a = mu - k * s;
	const b = mu + k * s;
	const shadeXs = xs.filter((x) => x >= a && x <= b);
	const shade = shadeXs.length > 1 ? `M${X(shadeXs[0])},152 ` + shadeXs.map((x) => `L${X(x)},${Y(pdf(x))}`).join(" ") + ` L${X(shadeXs.at(-1))},152 Z` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "mx-auto h-auto w-full max-w-md",
		role: "img",
		"aria-label": "Normal bell curve",
		children: [
			shade ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: shade,
				className: "fill-accent/25"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: line,
				fill: "none",
				className: "stroke-accent",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pad,
				y1: 152,
				x2: 340,
				y2: 152,
				className: "stroke-border"
			}),
			[
				-3,
				-2,
				-1,
				0,
				1,
				2,
				3
			].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: X(mu + z * s),
				y1: 152,
				x2: X(mu + z * s),
				y2: 156,
				className: "stroke-muted"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(mu + z * s),
				y: 170,
				textAnchor: "middle",
				fontSize: "10",
				className: "fill-muted",
				fontFamily: "var(--font-mono)",
				children: mu + z * s
			})] }, z))
		]
	});
}
function DataTable({ visual }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [visual.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs text-muted",
			children: visual.caption
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[280px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-2 py-2 font-medium",
					children: " "
				}), visual.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-2 py-2 font-medium tabular-nums",
					children: c
				}, c))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [visual.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-2 py-2 font-medium",
					children: r.label
				}), r.values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-2 py-2 tabular-nums",
					children: v
				}, i))]
			}, r.label)), visual.totals ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-2 py-2 font-semibold",
					children: "Total"
				}), visual.totals.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-2 py-2 font-semibold tabular-nums",
					children: v
				}, i))]
			}) : null] })]
		})]
	});
}
function Venn({ visual }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 360 180",
		className: "mx-auto h-auto w-full max-w-md",
		role: "img",
		"aria-label": "Venn diagram",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "140",
				cy: "90",
				r: "62",
				className: "fill-accent/15 stroke-accent",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "220",
				cy: "90",
				r: "62",
				className: "fill-ok/10 stroke-ok",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "115",
				y: "88",
				textAnchor: "middle",
				className: "fill-fg",
				fontSize: "16",
				fontWeight: "600",
				children: visual.onlyA
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "88",
				textAnchor: "middle",
				className: "fill-accent",
				fontSize: "16",
				fontWeight: "600",
				children: visual.both
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "245",
				y: "88",
				textAnchor: "middle",
				className: "fill-fg",
				fontSize: "16",
				fontWeight: "600",
				children: visual.onlyB
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "110",
				y: "28",
				textAnchor: "middle",
				className: "fill-muted",
				fontSize: "11",
				children: visual.aLabel
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "250",
				y: "28",
				textAnchor: "middle",
				className: "fill-muted",
				fontSize: "11",
				children: visual.bLabel
			}),
			visual.neither != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: "180",
				y: "168",
				textAnchor: "middle",
				className: "fill-subtle",
				fontSize: "11",
				children: ["outside both: ", visual.neither]
			}) : null
		]
	});
}
function NumberLine({ visual }) {
	const w = 360, h = 90, pad = 24;
	const X = (v) => pad + (v - visual.min) / (visual.max - visual.min) * 312;
	const ticks = [];
	for (let t = visual.min; t <= visual.max; t++) ticks.push(t);
	const x1 = X(visual.from);
	const x2 = X(visual.to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "mx-auto h-auto w-full max-w-md",
		role: "img",
		"aria-label": "Number line",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pad,
				y1: 40,
				x2: 336,
				y2: 40,
				className: "stroke-muted",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: `336,40 328,35 328,45`,
				className: "fill-muted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: x1,
				y: 34,
				width: Math.max(2, x2 - x1),
				height: 12,
				className: "fill-accent/35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: X(visual.from),
				cy: 40,
				r: 6,
				className: visual.closedLeft ? "fill-accent" : "fill-bg-elevated stroke-accent",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: X(visual.to),
				cy: 40,
				r: 6,
				className: visual.closedRight ? "fill-accent" : "fill-bg-elevated stroke-accent",
				strokeWidth: "2"
			}),
			ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: X(t),
				y1: 40,
				x2: X(t),
				y2: 48,
				className: "stroke-muted"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(t),
				y: 68,
				textAnchor: "middle",
				fontSize: "11",
				className: "fill-muted",
				fontFamily: "var(--font-mono)",
				children: t
			})] }, t))
		]
	});
}
function Hierarchy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: [
			{
				label: "Real numbers ℝ",
				sub: "everything on the number line"
			},
			{
				label: "Rational ℚ  +  Irrational",
				sub: "fractions vs √2, π"
			},
			{
				label: "Integers ℤ",
				sub: "… −2, −1, 0, 1, 2 …"
			},
			{
				label: "Whole numbers",
				sub: "0, 1, 2, 3, …"
			},
			{
				label: "Natural numbers ℕ",
				sub: "1, 2, 3, …"
			}
		].map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md border border-border bg-surface-2 px-3 py-2",
			style: { marginLeft: i * 12 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: l.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted",
				children: l.sub
			})]
		}, l.label))
	});
}
//#endregion
export { VisualBlock as t };
