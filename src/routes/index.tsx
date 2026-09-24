import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Swords, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CONCEPT_META } from "@/data/concepts";
import { QUESTIONS } from "@/data/questions";
import { accuracy, formatDuration, strongestConcept, useProgress, weakConcepts } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const p = useProgress();
  const acc = accuracy(p.correct, p.attempted);
  const weak = weakConcepts(p);
  const strong = strongestConcept(p);
  const last = p.quizHistory[0];
  const weakest = weak[0];

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">WGU C955 tutor</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">C955 Progress</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Learn the idea in plain English, see worked examples, then practice until the wording stops tricking you.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Questions answered" value={String(p.attempted)} />
        <Stat label="Accuracy" value={acc == null ? "—" : `${acc}%`} />
        <Stat label="Current streak" value={String(p.streak)} hint={`Best ${p.bestStreak}`} />
        <Stat label="Study time" value={formatDuration(p.studySeconds)} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Weakest concept" value={weakest ? CONCEPT_META[weakest.id].title : "Not enough data yet"} hint={weakest && weakest.acc != null ? `${weakest.acc}%` : "Answer a few items first"} />
        <Stat label="Strongest concept" value={strong ? CONCEPT_META[strong.id].title : "Not enough data yet"} hint={strong && strong.acc != null ? `${strong.acc}%` : "Keep going"} />
      </div>

      {last ? (
        <p className="mt-4 text-sm text-muted">
          Recent quiz: {last.correct}/{last.total} ({Math.round((100 * last.correct) / last.total)}%)
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/learn">
            Continue learning
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link to="/quiz/$mode" params={{ mode: "quick-10" }}>
            Take Quick 10
            <Swords className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/quiz/$mode" params={{ mode: "weak" }}>
            Drill weak areas
            <Target className="size-4" />
          </Link>
        </Button>
      </div>

      {weak.length ? (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold">Your weak areas</h2>
          <div className="mt-4 space-y-3">
            {weak.slice(0, 5).map((w) => (
              <div key={w.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{CONCEPT_META[w.id].title}</div>
                    <div className="text-xs text-muted">
                      {w.correct}/{w.attempted} correct
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm tabular-nums text-accent">{w.acc}%</span>
                    <Button asChild size="sm">
                      <Link to="/drill/$concept" params={{ concept: w.id }}>
                        Drill
                      </Link>
                    </Button>
                  </div>
                </div>
                <Progress className="mt-3" value={w.acc ?? 0} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>How this tutor works</CardTitle>
            <CardDescription>LEARN → EXAMPLES → PRACTICE → REVIEW MISTAKES → DRILL WEAK AREAS → MIXED QUIZ</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <Mini to="/learn" icon={BookOpen} title="Learn" body="Short lessons with shortcuts, traps, and worked examples." />
            <Mini to="/quiz" icon={Swords} title="Practice" body={`${QUESTIONS.length} questions. Immediate teaching when you miss.`} />
            <Link to="/quiz/$mode" params={{ mode: "exam" }} className="rounded-lg border border-border bg-bg-elevated p-4 hover:border-accent/40">
              <Target className="size-4 text-accent" />
              <div className="mt-2 font-medium">Simulate</div>
              <p className="mt-1 text-sm text-muted">Timed mixed set. No hints until the review.</p>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums leading-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-subtle">{hint}</div> : null}
    </div>
  );
}

function Mini({ to, icon: Icon, title, body }: { to: string; icon: typeof BookOpen; title: string; body: string }) {
  return (
    <Link to={to} className="rounded-lg border border-border bg-bg-elevated p-4 hover:border-accent/40">
      <Icon className="size-4 text-accent" />
      <div className="mt-2 font-medium">{title}</div>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </Link>
  );
}
