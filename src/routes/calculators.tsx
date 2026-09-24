import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { fmtFrac } from "@/lib/utils";

export const Route = createFileRoute("/calculators")({ component: CalculatorsPage });

function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Calculators</h1>
      <p className="mt-2 text-muted">Tiny helpers that also show the arithmetic, so you still learn the move.</p>
      <div className="mt-8 space-y-6">
        <BasicProb />
        <PercentCalc />
        <ConditionalCalc />
        <MeanCalc />
        <SdCalc />
        <ZCalc />
        <RegCalc />
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BasicProb() {
  const [fav, setFav] = useState("8");
  const [tot, setTot] = useState("12");
  const f = Number(fav);
  const t = Number(tot);
  const ok = t > 0 && Number.isFinite(f) && Number.isFinite(t);
  return (
    <Panel title="Basic probability">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Favorable" value={fav} onChange={setFav} />
        <Field label="Total" value={tot} onChange={setTot} />
      </div>
      {ok ? (
        <p className="mt-4 font-mono text-sm text-accent">
          {f}/{t} = {fmtFrac(f, t)} = {(f / t).toFixed(4)} = {((100 * f) / t).toFixed(1)}%
        </p>
      ) : (
        <p className="mt-4 text-sm text-bad">Total must be positive.</p>
      )}
      <p className="mt-2 text-xs text-muted">Probability = favorable ÷ total. Simplify the fraction last.</p>
    </Panel>
  );
}

function PercentCalc() {
  const [part, setPart] = useState("28");
  const [whole, setWhole] = useState("41");
  const p = Number(part);
  const w = Number(whole);
  const ok = w !== 0 && Number.isFinite(p) && Number.isFinite(w);
  return (
    <Panel title="Percentage of a group">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Part (numerator)" value={part} onChange={setPart} />
        <Field label="Group size (denominator)" value={whole} onChange={setWhole} />
      </div>
      {ok ? (
        <p className="mt-4 font-mono text-sm text-accent">
          {p}/{w} × 100 = {((100 * p) / w).toFixed(1)}%
        </p>
      ) : (
        <p className="mt-4 text-sm text-bad">Group size cannot be 0.</p>
      )}
      <p className="mt-2 text-xs text-muted">“Of placebo participants” → placebo total is the denominator, never the grand total unless asked.</p>
    </Panel>
  );
}

function ConditionalCalc() {
  const [both, setBoth] = useState("20");
  const [given, setGiven] = useState("45");
  const b = Number(both);
  const g = Number(given);
  const ok = g !== 0 && Number.isFinite(b) && Number.isFinite(g);
  return (
    <Panel title="Conditional probability">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="P(A AND B) or both-count" value={both} onChange={setBoth} />
        <Field label="P(B) or given-group size" value={given} onChange={setGiven} />
      </div>
      {ok ? (
        <p className="mt-4 font-mono text-sm text-accent">
          P(A|B) = {b}/{g} = {(b / g).toFixed(4)} = {((100 * b) / g).toFixed(1)}%
        </p>
      ) : (
        <p className="mt-4 text-sm text-bad">The given group cannot be 0.</p>
      )}
      <p className="mt-2 text-xs text-muted">GIVEN = denominator. Library example: 20/45 ≈ 44.4%.</p>
    </Panel>
  );
}

function MeanCalc() {
  const [raw, setRaw] = useState("10, 12, 14, 16");
  const nums = raw
    .split(/[,\s]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
  const mean = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
  return (
    <Panel title="Mean">
      <Field label="Numbers (comma or space separated)" value={raw} onChange={setRaw} />
      <p className="mt-4 font-mono text-sm text-accent">{mean == null ? "Enter at least one number." : `mean = ${mean.toFixed(4)}  (n = ${nums.length})`}</p>
      <p className="mt-2 text-xs text-muted">Add them up, divide by how many there are.</p>
    </Panel>
  );
}

function SdCalc() {
  const [raw, setRaw] = useState("4, 6, 8, 10, 12");
  const pop = usePop();
  const nums = raw
    .split(/[,\s]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
  const n = nums.length;
  const mean = n ? nums.reduce((a, b) => a + b, 0) / n : 0;
  const denom = pop ? n : n - 1;
  const sd = n > 1 && denom > 0 ? Math.sqrt(nums.reduce((a, x) => a + (x - mean) ** 2, 0) / denom) : null;
  return (
    <Panel title="Standard deviation">
      <Field label="Numbers" value={raw} onChange={setRaw} />
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant={pop ? "default" : "secondary"} onClick={() => pop.set(true)}>
          Population (÷ n)
        </Button>
        <Button size="sm" variant={!pop.value ? "default" : "secondary"} onClick={() => pop.set(false)}>
          Sample (÷ n−1)
        </Button>
      </div>
      <p className="mt-4 font-mono text-sm text-accent">
        {sd == null ? "Need at least 2 numbers." : `mean = ${mean.toFixed(4)},  SD = ${sd.toFixed(4)}`}
      </p>
      <p className="mt-2 text-xs text-muted">
        SD is the typical distance from the mean. C955 empirical-rule items usually hand you SD rather than asking you to compute it.
      </p>
    </Panel>
  );
}

function usePop() {
  const [value, set] = useState(false);
  return { value, set };
}

function ZCalc() {
  const [x, setX] = useState("64");
  const [m, setM] = useState("70");
  const [s, setS] = useState("3");
  const xv = Number(x),
    mv = Number(m),
    sv = Number(s);
  const ok = sv !== 0 && Number.isFinite(xv) && Number.isFinite(mv) && Number.isFinite(sv);
  return (
    <Panel title="Z-score">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="x" value={x} onChange={setX} />
        <Field label="Mean" value={m} onChange={setM} />
        <Field label="SD" value={s} onChange={setS} />
      </div>
      {ok ? (
        <p className="mt-4 font-mono text-sm text-accent">
          z = ({xv} − {mv}) / {sv} = {((xv - mv) / sv).toFixed(4)}
        </p>
      ) : (
        <p className="mt-4 text-sm text-bad">SD cannot be 0.</p>
      )}
      <p className="mt-2 text-xs text-muted">Negative z means below the mean. |z| = 2 → empirical-rule 95% territory.</p>
    </Panel>
  );
}

function RegCalc() {
  const [a, setA] = useState("5.2");
  const [b, setB] = useState("1.15");
  const [x, setX] = useState("50");
  const av = Number(a),
    bv = Number(b),
    xv = Number(x);
  const ok = Number.isFinite(av) && Number.isFinite(bv) && Number.isFinite(xv);
  const y = useMemo(() => av + bv * xv, [av, bv, xv]);
  return (
    <Panel title="Regression prediction">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Intercept a" value={a} onChange={setA} />
        <Field label="Slope b" value={b} onChange={setB} />
        <Field label="x" value={x} onChange={setX} />
      </div>
      {ok ? (
        <p className="mt-4 font-mono text-sm text-accent">
          ŷ = {av} + {bv}({xv}) = {av} + {bv * xv} = {Number(y.toFixed(4))}
        </p>
      ) : (
        <p className="mt-4 text-sm text-bad">Need numeric a, b, and x.</p>
      )}
      <p className="mt-2 text-xs text-muted">If r is printed nearby and the question only wants ŷ, ignore r.</p>
    </Panel>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} inputMode="decimal" />
    </div>
  );
}
