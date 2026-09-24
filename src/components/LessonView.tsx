import { Link } from "@tanstack/react-router";
import type { Lesson, LessonSection } from "@/data/types";
import { VisualBlock } from "@/components/VisualBlock";
import { FormulaBox, ShortcutBox, TrapBox, WatchBox } from "@/components/Callouts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CONCEPT_META } from "@/data/concepts";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const meta = CONCEPT_META[lesson.concept];
  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">Lesson {lesson.order} · {lesson.minutes} min</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{lesson.title}</h1>
      <p className="mt-2 text-muted">{lesson.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>{meta.short}</Badge>
        <Badge variant="muted">{meta.title}</Badge>
      </div>
      <div className="mt-8 space-y-5">
        {lesson.sections.map((s, i) => (
          <Section key={i} section={s} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-display text-lg font-semibold">Practice this idea</div>
          <p className="text-sm text-muted">A short drill using only {meta.title} items, with explanations after each answer.</p>
        </div>
        <Button asChild>
          <Link to="/drill/$concept" params={{ concept: lesson.concept }}>
            Drill {meta.short}
          </Link>
        </Button>
      </div>
    </article>
  );
}

function Section({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "intro":
      return <p className="text-base leading-relaxed text-fg">{section.body}</p>;
    case "bullets":
      return (
        <div>
          <h2 className="font-display text-xl font-semibold">{section.title}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg">
            {section.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      );
    case "formula":
      return <FormulaBox title={section.title} formula={section.formula} note={section.note} />;
    case "example":
      return (
        <div className="rounded-lg border border-border bg-bg-elevated p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">{section.title}</div>
          <p className="mt-2 text-sm leading-relaxed">{section.setup}</p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-fg">
            {section.steps.map((st) => (
              <li key={st}>{st}</li>
            ))}
          </ol>
          <div className="mt-3 rounded-md bg-accent/10 px-3 py-2 font-mono text-sm text-accent">Answer: {section.answer}</div>
        </div>
      );
    case "shortcut":
      return <ShortcutBox title={section.title ?? "C955 Shortcut"}>{section.body}</ShortcutBox>;
    case "trap":
      return <TrapBox title={section.title ?? "Common Trap"}>{section.body}</TrapBox>;
    case "watch":
      return <WatchBox words={section.words}>{section.body}</WatchBox>;
    case "visual":
      return <VisualBlock visual={section.visual} caption={section.caption} />;
    case "callout":
      return (
        <p
          className={
            section.tone === "warn"
              ? "rounded-lg border border-warn/25 bg-warn/8 p-4 text-sm"
              : section.tone === "tip"
                ? "rounded-lg border border-accent/25 bg-accent/8 p-4 text-sm"
                : "rounded-lg border border-border bg-surface p-4 text-sm text-muted"
          }
        >
          {section.body}
        </p>
      );
    default:
      return null;
  }
}
