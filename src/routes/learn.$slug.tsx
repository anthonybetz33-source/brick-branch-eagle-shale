import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getLesson, LESSONS } from "@/data/lessons";
import { LessonView } from "@/components/LessonView";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/learn/$slug")({
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  if (!lesson) throw notFound();
  const idx = LESSONS.findIndex((l) => l.slug === slug);
  const prev = LESSONS[idx - 1];
  const next = LESSONS[idx + 1];
  return (
    <div>
      <Button variant="ghost" asChild className="-ml-3 mb-4">
        <Link to="/learn">
          <ArrowLeft className="size-4" /> All lessons
        </Link>
      </Button>
      <LessonView lesson={lesson} />
      <div className="mx-auto mt-8 flex max-w-3xl justify-between gap-3">
        {prev ? (
          <Button variant="secondary" asChild>
            <Link to="/learn/$slug" params={{ slug: prev.slug }}>
              <ArrowLeft className="size-4" /> {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button variant="secondary" asChild>
            <Link to="/learn/$slug" params={{ slug: next.slug }}>
              {next.title} <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
