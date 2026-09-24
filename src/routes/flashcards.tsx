import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { FLASHCARDS } from "@/data/flashcards";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/lib/utils";

export const Route = createFileRoute("/flashcards")({ component: FlashcardsPage });

function FlashcardsPage() {
  const [order, setOrder] = useState(() => FLASHCARDS.map((_, i) => i));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = FLASHCARDS[order[i] ?? 0];

  const n = FLASHCARDS.length;
  const label = useMemo(() => `${i + 1} / ${n}`, [i, n]);

  function prev() {
    setI((x) => (x - 1 + n) % n);
    setFlipped(false);
  }
  function next() {
    setI((x) => (x + 1) % n);
    setFlipped(false);
  }
  function mix() {
    setOrder(shuffle(FLASHCARDS.map((_, idx) => idx)));
    setI(0);
    setFlipped(false);
  }

  if (!card) return null;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Flashcards</h1>
      <p className="mt-2 text-muted">Tap the card to flip. These are the phrases C955 leans on.</p>
      <p className="mt-4 text-xs tabular-nums text-muted">{label}</p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="mt-4 flex min-h-[240px] w-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-8 text-center transition-colors hover:border-accent/40"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted">{flipped ? "Back" : "Front"} · tap to flip</span>
        <span className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
          {flipped ? card.back : card.front}
        </span>
        {flipped && card.hint ? <span className="mt-4 text-sm text-muted">{card.hint}</span> : null}
      </button>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <Button variant="secondary" onClick={prev}>
          <ChevronLeft className="size-4" /> Previous
        </Button>
        <Button variant="outline" onClick={mix}>
          <RefreshCw className="size-4" /> Shuffle
        </Button>
        <Button variant="secondary" onClick={next}>
          Next <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
