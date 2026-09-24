import { createFileRoute } from "@tanstack/react-router";
import { TRICKS } from "@/data/tricks";
import { ShortcutBox, WatchBox } from "@/components/Callouts";

export const Route = createFileRoute("/tricks")({ component: TricksPage });

function TricksPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Memory tricks</h1>
      <p className="mt-2 text-muted">
        Keep these on a mental sticky note. Most missed C955 items are wording, not arithmetic.
      </p>
      <div className="mt-8 space-y-4">
        {TRICKS.map((t) => (
          <div key={t.id} className="space-y-2">
            <ShortcutBox title={t.title}>{t.body}</ShortcutBox>
            {t.watch ? (
              <WatchBox words={t.watch.split("·").map((s) => s.trim()).filter(Boolean)}>
                If you see these words, reach for this trick first.
              </WatchBox>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
