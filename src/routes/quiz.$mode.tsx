import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { QUIZ_MODES } from "@/data/concepts";
import type { QuizModeId } from "@/data/types";
import { questionsForMode } from "@/lib/quiz";
import { useProgress } from "@/lib/progress";
import { QuizPlayer } from "@/components/QuizPlayer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz/$mode")({
  component: QuizModePage,
});

function QuizModePage() {
  const { mode } = Route.useParams();
  const spec = QUIZ_MODES[mode as QuizModeId];
  const progress = useProgress();
  const questions = useMemo(() => {
    if (!spec) return [];
    return questionsForMode(mode as QuizModeId, progress);
    // only build once per visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (!spec) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold">Unknown quiz</h1>
        <Button asChild className="mt-4">
          <Link to="/quiz">Back</Link>
        </Button>
      </div>
    );
  }

  return <QuizPlayer mode={mode as QuizModeId} questions={questions} />;
}
