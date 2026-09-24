import { useMemo } from "react";
import type { VisualSpec } from "@/data/types";
import { seededRng } from "@/lib/utils";

export function VisualBlock({ visual, caption }: { visual: VisualSpec; caption?: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-lg border border-border bg-bg-elevated p-3">
      {visual.kind === "scatter" && <Scatter r={visual.r} seed={visual.seed} />}
      {visual.kind === "bell" && <Bell mean={visual.mean} sd={visual.sd} shadeSd={visual.shadeSd} />}
      {visual.kind === "table" && <DataTable visual={visual} />}
      {visual.kind === "venn" && <Venn visual={visual} />}
      {visual.kind === "number-line" && <NumberLine visual={visual} />}
      {visual.kind === "hierarchy" && <Hierarchy />}
      {caption ? <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

function Scatter({ r, seed }: { r: number; seed: number }) {
  const pts = useMemo(() => correlatedPoints(40, r, seed), [r, seed]);
  const w = 320,
    h = 200,
    pad = 22;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto h-auto w-full max-w-md" role="img" aria-label={`Scatterplot with r about ${r}`}>
      <rect x={pad} y={12} width={w - pad * 2} height={h - 36} fill="transparent" stroke="currentColor" className="text-border" />
      {pts.map((p, i) => (
        <circle key={i} cx={pad + p[0] * (w - pad * 2)} cy={12 + (1 - p[1]) * (h - 36)} r={3.2} className="fill-accent" opacity={0.9} />
      ))}
      <text x={w / 2} y={h - 4} textAnchor="middle" className="fill-muted" fontSize="11" fontFamily="var(--font-mono)">
        r ≈ {r}
      </text>
    </svg>
  );
}

function correlatedPoints(n: number, r: number, seed: number): [number, number][] {
  const rng = seededRng(seed + 17);
  const gauss = () => {
    const u = Math.max(1e-12, rng());
    const v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const rr = Math.max(-1, Math.min(1, r));
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const x = gauss();
    const y = rr * x + Math.sqrt(Math.max(0, 1 - rr * rr)) * gauss();
    out.push([clamp01((x + 3) / 6), clamp01((y + 3) / 6)]);
  }
  return out;
}
function clamp01(x: number) {
  return Math.max(0.04, Math.min(0.96, x));
}

function Bell({ mean, sd, shadeSd }: { mean: number; sd: number; shadeSd?: number }) {
  const w = 360,
    h = 180,
    pad = 20;
  const xs: number[] = [];
  const mu = mean;
  const s = sd || 1;
  const min = mu - 4 * s;
  const max = mu + 4 * s;
  const pdf = (x: number) => Math.exp(-0.5 * ((x - mu) / s) ** 2);
  const N = 80;
  for (let i = 0; i <= N; i++) xs.push(min + (i / N) * (max - min));
  const ys = xs.map(pdf);
  const maxY = Math.max(...ys);
  const X = (x: number) => pad + ((x - min) / (max - min)) * (w - pad * 2);
  const Y = (y: number) => h - 28 - (y / maxY) * (h - 50);
  const line = xs.map((x, i) => `${i ? "L" : "M"}${X(x)},${Y(ys[i]!)}`).join(" ");
  const k = shadeSd ?? 1;
  const a = mu - k * s;
  const b = mu + k * s;
  const shadeXs = xs.filter((x) => x >= a && x <= b);
  const shade =
    shadeXs.length > 1
      ? `M${X(shadeXs[0]!)},${h - 28} ` +
        shadeXs.map((x) => `L${X(x)},${Y(pdf(x))}`).join(" ") +
        ` L${X(shadeXs.at(-1)!)},${h - 28} Z`
      : "";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto h-auto w-full max-w-md" role="img" aria-label="Normal bell curve">
      {shade ? <path d={shade} className="fill-accent/25" /> : null}
      <path d={line} fill="none" className="stroke-accent" strokeWidth="2" />
      <line x1={pad} y1={h - 28} x2={w - pad} y2={h - 28} className="stroke-border" />
      {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
        <g key={z}>
          <line x1={X(mu + z * s)} y1={h - 28} x2={X(mu + z * s)} y2={h - 24} className="stroke-muted" />
          <text x={X(mu + z * s)} y={h - 10} textAnchor="middle" fontSize="10" className="fill-muted" fontFamily="var(--font-mono)">
            {mu + z * s}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DataTable({ visual }: { visual: Extract<VisualSpec, { kind: "table" }> }) {
  return (
    <div className="overflow-x-auto">
      {visual.caption ? <p className="mb-2 text-xs text-muted">{visual.caption}</p> : null}
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="px-2 py-2 font-medium"> </th>
            {visual.columns.map((c) => (
              <th key={c} className="px-2 py-2 font-medium tabular-nums">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visual.rows.map((r) => (
            <tr key={r.label} className="border-b border-border/60">
              <td className="px-2 py-2 font-medium">{r.label}</td>
              {r.values.map((v, i) => (
                <td key={i} className="px-2 py-2 tabular-nums">
                  {v}
                </td>
              ))}
            </tr>
          ))}
          {visual.totals ? (
            <tr className="text-accent">
              <td className="px-2 py-2 font-semibold">Total</td>
              {visual.totals.map((v, i) => (
                <td key={i} className="px-2 py-2 font-semibold tabular-nums">
                  {v}
                </td>
              ))}
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function Venn({ visual }: { visual: Extract<VisualSpec, { kind: "venn" }> }) {
  return (
    <svg viewBox="0 0 360 180" className="mx-auto h-auto w-full max-w-md" role="img" aria-label="Venn diagram">
      <circle cx="140" cy="90" r="62" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
      <circle cx="220" cy="90" r="62" className="fill-ok/10 stroke-ok" strokeWidth="1.5" />
      <text x="115" y="88" textAnchor="middle" className="fill-fg" fontSize="16" fontWeight="600">
        {visual.onlyA}
      </text>
      <text x="180" y="88" textAnchor="middle" className="fill-accent" fontSize="16" fontWeight="600">
        {visual.both}
      </text>
      <text x="245" y="88" textAnchor="middle" className="fill-fg" fontSize="16" fontWeight="600">
        {visual.onlyB}
      </text>
      <text x="110" y="28" textAnchor="middle" className="fill-muted" fontSize="11">
        {visual.aLabel}
      </text>
      <text x="250" y="28" textAnchor="middle" className="fill-muted" fontSize="11">
        {visual.bLabel}
      </text>
      {visual.neither != null ? (
        <text x="180" y="168" textAnchor="middle" className="fill-subtle" fontSize="11">
          outside both: {visual.neither}
        </text>
      ) : null}
    </svg>
  );
}

function NumberLine({ visual }: { visual: Extract<VisualSpec, { kind: "number-line" }> }) {
  const w = 360,
    h = 90,
    pad = 24;
  const X = (v: number) => pad + ((v - visual.min) / (visual.max - visual.min)) * (w - pad * 2);
  const ticks: number[] = [];
  for (let t = visual.min; t <= visual.max; t++) ticks.push(t);
  const x1 = X(visual.from);
  const x2 = X(visual.to);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto h-auto w-full max-w-md" role="img" aria-label="Number line">
      <line x1={pad} y1={40} x2={w - pad} y2={40} className="stroke-muted" strokeWidth="2" />
      <polygon points={`${w - pad},40 ${w - pad - 8},35 ${w - pad - 8},45`} className="fill-muted" />
      <rect x={x1} y={34} width={Math.max(2, x2 - x1)} height={12} className="fill-accent/35" />
      <circle cx={X(visual.from)} cy={40} r={6} className={visual.closedLeft ? "fill-accent" : "fill-bg-elevated stroke-accent"} strokeWidth="2" />
      <circle cx={X(visual.to)} cy={40} r={6} className={visual.closedRight ? "fill-accent" : "fill-bg-elevated stroke-accent"} strokeWidth="2" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={40} x2={X(t)} y2={48} className="stroke-muted" />
          <text x={X(t)} y={68} textAnchor="middle" fontSize="11" className="fill-muted" fontFamily="var(--font-mono)">
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Hierarchy() {
  const layers = [
    { label: "Real numbers ℝ", sub: "everything on the number line" },
    { label: "Rational ℚ  +  Irrational", sub: "fractions vs √2, π" },
    { label: "Integers ℤ", sub: "… −2, −1, 0, 1, 2 …" },
    { label: "Whole numbers", sub: "0, 1, 2, 3, …" },
    { label: "Natural numbers ℕ", sub: "1, 2, 3, …" },
  ];
  return (
    <div className="space-y-2">
      {layers.map((l, i) => (
        <div
          key={l.label}
          className="rounded-md border border-border bg-surface-2 px-3 py-2"
          style={{ marginLeft: i * 12 }}
        >
          <div className="text-sm font-medium">{l.label}</div>
          <div className="text-xs text-muted">{l.sub}</div>
        </div>
      ))}
    </div>
  );
}
