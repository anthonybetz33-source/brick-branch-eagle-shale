import { createFileRoute, Link } from "@tanstack/react-router";
import { QUIZ_MODES } from "@/data/concepts";
import type { QuizModeId } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { QUESTIONS } from "@/data/questions";

export const Route = createFileRoute("/quiz/")({ component: QuizIndex });

const ORDER: QuizModeId[] = [
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
  "exam",
];

function QuizIndex() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Quiz</h1>
      <p className="mt-2 max-w-2xl text-muted">
        {QUESTIONS.length} questions in the bank. Choices shuffle every time. Wrong answers get a full walkthrough, not just the letter.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {ORDER.map((id) => {
          const m = QUIZ_MODES[id];
          return (
            <Link
              key={id}
              to="/quiz/$mode"
              params={{ mode: id }}
              className="rounded-xl border border-border bg-surface p-5 hover:border-accent/40"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold">{m.title}</h2>
                {m.exam ? <Badge variant="warn">Timed</Badge> : null}
                {id === "boss" ? <Badge>Hard</Badge> : null}
              </div>
              <p className="mt-2 text-sm text-muted">{m.blurb}</p>
              <p className="mt-3 text-xs text-subtle">
                {m.count} questions{m.timed ? " · 60 minutes · answers at the end" : " · instant explanations"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
