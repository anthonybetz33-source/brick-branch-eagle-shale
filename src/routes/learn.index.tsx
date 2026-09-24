import { createFileRoute, Link } from "@tanstack/react-router";
import { LESSONS } from "@/data/lessons";
import { CONCEPT_META } from "@/data/concepts";
import { useProgress, accuracy } from "@/lib/progress";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/learn/")({ component: LearnIndex });

function LearnIndex() {
  const byConcept = useProgress((s) => s.byConcept);
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Learn</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Each lesson is a sit-down with a tutor: plain English, worked examples, a shortcut, and the trap the exam loves.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {LESSONS.map((lesson) => {
          const stats = byConcept[lesson.concept];
          const acc = accuracy(stats.correct, stats.attempted);
          return (
            <Link
              key={lesson.slug}
              to="/learn/$slug"
              params={{ slug: lesson.slug }}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">Lesson {lesson.order}</span>
                <Badge variant="muted">{lesson.minutes} min</Badge>
              </div>
              <h2 className="mt-2 font-display text-lg font-semibold">{lesson.title}</h2>
              <p className="mt-1 text-sm text-muted">{lesson.subtitle}</p>
              <p className="mt-3 text-xs text-subtle">
                {CONCEPT_META[lesson.concept].short}
                {acc != null ? ` · your accuracy ${acc}%` : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
