import { createFileRoute } from "@tanstack/react-router";
import { FormulaBox, ShortcutBox } from "@/components/Callouts";
import { VisualBlock } from "@/components/VisualBlock";

export const Route = createFileRoute("/cheatsheet")({ component: CheatSheet });

function CheatSheet() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Cheat sheet</h1>
        <p className="mt-2 text-muted">Quick-reference formulas, lists, and wording cues. Not an official WGU sheet.</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Probability rules</h2>
        <FormulaBox title="Basic" formula="P = favorable / total" note="Always between 0 and 1. 0 = impossible, 1 = certain." />
        <FormulaBox title="Complement / missing" formula="P(not A) = 1 − P(A)" note="Add listed probabilities, subtract from 1." />
        <FormulaBox title="OR" formula="P(A OR B) = P(A) + P(B) − P(A AND B)" />
        <FormulaBox title="AND (general)" formula="P(A AND B) = P(A) × P(B|A)" />
        <FormulaBox title="AND (independent)" formula="P(A AND B) = P(A) × P(B)" />
        <FormulaBox title="Conditional" formula="P(A | B) = P(A AND B) / P(B)" note="GIVEN = denominator." />
        <ShortcutBox>OR = add, subtract overlap. AND = multiply. GIVEN = denominator. Without replacement = total drops.</ShortcutBox>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Two-way tables</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Joint: one cell / grand total</li>
          <li>Marginal: row or column total / grand total</li>
          <li>Conditional: cell / that group’s total (“of placebo”, “given experimental”)</li>
        </ul>
        <VisualBlock
          visual={{
            kind: "table",
            caption: "Example study",
            columns: ["Pass", "Fail", "Total"],
            rows: [
              { label: "Experimental", values: [60, 28, 88] },
              { label: "Placebo", values: [28, 13, 41] },
            ],
            totals: [88, 41, 129],
          }}
        />
        <p className="text-sm text-muted">Percentage of placebo who passed = 28/41, not 28/129.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Independent vs dependent</h2>
        <FormulaBox title="Test" formula="Independent  ⇔  P(B) = P(B | A)" />
        <p className="text-sm text-muted">With replacement → independent. Without replacement → dependent. Mutually exclusive is a different idea.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Empirical rule</h2>
        <FormulaBox title="Normal data" formula="68% within 1 SD · 95% within 2 SD · 99.7% within 3 SD" />
        <FormulaBox title="z-score" formula="z = (x − mean) / SD" />
        <VisualBlock visual={{ kind: "bell", mean: 100, sd: 15, shadeSd: 2 }} caption="Mean 100, SD 15, shaded ±2 SD ≈ 95%" />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Correlation & regression</h2>
        <FormulaBox title="r" formula="−1 ≤ r ≤ 1" note="Sign = direction. |r| = strength. 0 = no linear association. r is often not printed on the scatterplot." />
        <p className="text-sm">r ≈ 0.1 weak + · 0.6 moderate + · 0.9 strong + · −0.7 strong −</p>
        <FormulaBox title="Least squares" formula="ŷ = a + b x" note="a intercept, b slope. Predict by plugging in x. You do not need r for the plug-in." />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Number systems</h2>
        <VisualBlock visual={{ kind: "hierarchy" }} />
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>3 — natural, whole, integer, rational, real</li>
          <li>0 — whole, integer, rational, real</li>
          <li>−4 — integer, rational, real</li>
          <li>1/2 and 0.75 — rational, real</li>
          <li>√2 and π — irrational, real</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Inequalities</h2>
        <p className="text-sm">Filled dot / [ ] includes. Open dot / ( ) excludes. Infinity always uses a parenthesis.</p>
        <VisualBlock visual={{ kind: "number-line", min: -2, max: 6, from: 2, to: 6, closedLeft: true, closedRight: false }} caption="x ≥ 2" />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Primes (useful ranges)</h2>
        <p className="text-sm">
          <span className="text-muted">1–10:</span> 2, 3, 5, 7
        </p>
        <p className="text-sm">
          <span className="text-muted">1–20:</span> 2, 3, 5, 7, 11, 13, 17, 19
        </p>
        <p className="text-sm">
          <span className="text-muted">1–25:</span> 2, 3, 5, 7, 11, 13, 17, 19, 23
        </p>
        <p className="text-sm">
          <span className="text-muted">1–50:</span> + 29, 31, 37, 41, 43, 47
        </p>
        <p className="text-sm">
          <span className="text-muted">1–100:</span> + 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
        </p>
        <p className="text-sm text-muted">1 is neither prime nor composite. 2 is the only even prime.</p>
      </section>
    </div>
  );
}
