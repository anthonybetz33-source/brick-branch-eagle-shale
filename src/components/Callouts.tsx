import { AlertTriangle, Eye, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShortcutBox({ title = "C955 Shortcut", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className={cn("rounded-lg border border-accent/30 bg-accent/8 p-4")}>
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
        <Lightbulb className="size-3.5" />
        {title}
      </div>
      <div className="text-sm leading-relaxed text-fg">{children}</div>
    </aside>
  );
}

export function TrapBox({ title = "Common Trap", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-bad/30 bg-bad/8 p-4">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bad">
        <AlertTriangle className="size-3.5" />
        {title}
      </div>
      <div className="text-sm leading-relaxed text-fg">{children}</div>
    </aside>
  );
}

export function WatchBox({ words, children }: { words?: string[]; children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border border-warn/25 bg-warn/8 p-4">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-warn">
        <Eye className="size-3.5" />
        Watch for this wording
      </div>
      {words?.length ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {words.map((w) => (
            <span key={w} className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-fg">
              {w}
            </span>
          ))}
        </div>
      ) : null}
      <div className="text-sm leading-relaxed text-fg">{children}</div>
    </aside>
  );
}

export function FormulaBox({ title, formula, note }: { title: string; formula: string; note?: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-4">
      <div className="text-xs font-medium uppercase tracking-wider text-muted">{title}</div>
      <div className="mt-2 overflow-x-auto font-mono text-base text-accent sm:text-lg">{formula}</div>
      {note ? <p className="mt-2 text-sm text-muted">{note}</p> : null}
    </div>
  );
}
