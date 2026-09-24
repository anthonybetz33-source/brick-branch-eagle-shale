import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CONCEPT_IDS, type ConceptId } from "@/data/types";
import { CONCEPT_META } from "@/data/concepts";
import { QUESTIONS } from "@/data/questions";
import { QuizPlayer } from "@/components/QuizPlayer";
import { shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/drill/$concept")({
  component: DrillPage,
});

function DrillPage() {
  const { concept } = Route.useParams();
  const id = concept as ConceptId;
  const valid = (CONCEPT_IDS as readonly string[]).includes(id);
  const questions = useMemo(() => {
    if (!valid) return [];
    const pool = QUESTIONS.filter((q) => q.concept === id);
    return shuffle(pool)
      .slice(0, 12)
      .map((q) => ({ ...q, choices: shuffle(q.choices) as typeof q.choices }));
  }, [id, valid]);

  if (!valid) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold">Unknown concept</h1>
        <Button asChild className="mt-4">
          <Link to="/learn">Lessons</Link>
        </Button>
      </div>
    );
  }

  return <QuizPlayer mode="drill" questions={questions} title={`${CONCEPT_META[id].title} drill`} />;
}
