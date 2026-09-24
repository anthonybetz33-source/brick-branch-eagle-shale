import { createFileRoute, Link } from "@tanstack/react-router";
import { CONCEPT_IDS } from "@/data/types";
import { CONCEPT_META } from "@/data/concepts";
import { QUESTIONS } from "@/data/questions";
import {
  accuracy,
  BADGE_LABELS,
  formatDuration,
  useProgress,
  weakConcepts,
} from "@/lib/progress";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  const p = useProgress();
  const reset = useProgress((s) => s.reset);
  const acc = accuracy(p.correct, p.attempted);
  const weak = weakConcepts(p, 2);
  const last = p.quizHistory[0];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Progress</h1>
      <p className="mt-2 text-muted">Stored on this device only. Reset anytime.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Tile label="Attempted" value={String(p.attempted)} />
        <Tile label="Correct" value={String(p.correct)} />
        <Tile label="Accuracy" value={acc == null ? "—" : `${acc}%`} />
        <Tile label="Streak" value={`${p.streak} (best ${p.bestStreak})`} />
        <Tile label="Study time" value={formatDuration(p.studySeconds)} />
        <Tile label="Sessions" value={String(p.sessions)} />
        <Tile label="Bank seen" value={`${p.seenIds.length} / ${QUESTIONS.length}`} />
        <Tile label="Best exam sim" value={p.bestExamPct == null ? "—" : `${Math.round(p.bestExamPct)}%`} />
      </div>

      {last ? (
        <p className="mt-4 text-sm text-muted">
          Last quiz: {last.correct}/{last.total} · {formatDuration(last.seconds)}
        </p>
      ) : null}

      <h2 className="mt-10 font-display text-xl font-semibold">By concept</h2>
      <div className="mt-4 space-y-3">
        {CONCEPT_IDS.map((id) => {
          const c = p.byConcept[id];
          const a = accuracy(c.correct, c.attempted);
          return (
            <div key={id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{CONCEPT_META[id].title}</div>
                  <div className="text-xs text-muted">
                    {c.attempted ? `${c.correct}/${c.attempted}` : "No attempts yet"}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm tabular-nums">{a == null ? "—" : `${a}%`}</span>
                  <Button size="sm" asChild>
                    <Link to="/drill/$concept" params={{ concept: id }}>
                      Drill
                    </Link>
                  </Button>
                </div>
              </div>
              <Progress className="mt-3" value={a ?? 0} />
            </div>
          );
        })}
      </div>

      {weak.length ? (
        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-lg font-semibold">Weak areas</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {weak.map((w) => (
              <li key={w.id} className="flex justify-between gap-3">
                <span>{CONCEPT_META[w.id].title}</span>
                <span className="font-mono text-accent">{w.acc}%</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4">
            <Link to="/quiz/$mode" params={{ mode: "weak" }}>Drill weak areas</Link>
          </Button>
        </div>
      ) : null}

      <h2 className="mt-10 font-display text-xl font-semibold">Badges</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {Object.entries(BADGE_LABELS).map(([id, b]) => {
          const on = p.badges.includes(id);
          return (
            <div
              key={id}
              className={`rounded-lg border p-4 ${on ? "border-accent/40 bg-accent/10" : "border-border bg-surface opacity-50"}`}
            >
              <div className="font-medium">{b.title}</div>
              <div className="text-xs text-muted">{b.blurb}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Reset progress</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
              <AlertDialogDescription>
                This clears scores, streaks, weak areas, and quiz history on this device. Lessons stay available.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => reset()}>Reset</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
