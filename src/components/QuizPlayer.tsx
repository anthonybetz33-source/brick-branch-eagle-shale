import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Clock, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Question, QuizModeId } from "@/data/types";
import { QUIZ_MODES, CONCEPT_META } from "@/data/concepts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VisualBlock } from "@/components/VisualBlock";
import { ShortcutBox, TrapBox } from "@/components/Callouts";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Phase = "ask" | "feedback" | "done";
type LogItem = { q: Question; chosen: string; ok: boolean };

export function QuizPlayer({
  mode,
  questions,
  title,
}: {
  mode: QuizModeId | "drill";
  questions: Question[];
  title?: string;
}) {
  const spec =
    mode === "drill"
      ? { title: title ?? "Concept drill", immediate: true, timed: false, exam: false, seconds: undefined, count: questions.length }
      : QUIZ_MODES[mode];
  const recordAnswer = useProgress((s) => s.recordAnswer);
  const finishQuiz = useProgress((s) => s.finishQuiz);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("ask");
  const [log, setLog] = useState<LogItem[]>([]);
  const logRef = useRef<LogItem[]>([]);
  const finishedRef = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(spec.seconds ?? 0);
  const [elapsed, setElapsed] = useState(0);
  const started = useMemo(() => Date.now(), []);

  const q = questions[idx];
  const immediate = spec.immediate;

  useEffect(() => {
    if (!spec.timed || phase === "done") return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          return 0;
        }
        return s - 1;
      });
      setElapsed((e) => e + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [spec.timed, phase]);

  useEffect(() => {
    if (spec.timed && secondsLeft === 0 && phase !== "done" && questions.length) wrapUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  function submit(choice: string) {
    if (!q || chosen) return;
    setChosen(choice);
    const ok = choice === q.correct;
    recordAnswer({
      questionId: q.id,
      concept: q.concept,
      difficulty: q.difficulty,
      correct: ok,
      chosen: choice,
    });
    const item = { q, chosen: choice, ok };
    logRef.current = [...logRef.current, item];
    setLog(logRef.current);
    if (immediate) setPhase("feedback");
    else goNext();
  }

  function goNext() {
    if (idx + 1 >= questions.length) {
      wrapUp();
      return;
    }
    setIdx((i) => i + 1);
    setChosen(null);
    setPhase("ask");
  }

  function wrapUp() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const seconds = spec.timed ? (spec.seconds ?? 0) - secondsLeft : Math.round((Date.now() - started) / 1000);
    setElapsed(seconds);
    setPhase("done");
    if (mode !== "drill") {
      finishQuiz({
        mode,
        total: questions.length,
        correct: logRef.current.filter((l) => l.ok).length,
        seconds,
        missedIds: logRef.current.filter((l) => !l.ok).map((l) => l.q.id),
      });
    }
  }

  if (!questions.length) {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <h1 className="font-display text-2xl font-semibold">No questions in this set yet</h1>
        <p className="mt-2 text-sm text-muted">Try Mixed C955, or learn a lesson first so weak-area tracking has data.</p>
        <Button asChild className="mt-5">
          <Link to="/quiz">Back to quizzes</Link>
        </Button>
      </div>
    );
  }

  if (phase === "done") {
    const total = log.length || questions.length;
    const right = log.filter((l) => l.ok).length;
    const pct = total ? Math.round((100 * right) / total) : 0;
    return (
      <div>
        {spec.exam ? (
          <p className="text-xs uppercase tracking-[0.18em] text-muted">C955 Practice Simulation — Not an Official WGU Exam</p>
        ) : null}
        <h1 className="mt-1 font-display text-3xl font-semibold">Results</h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Score" value={`${right} / ${total}`} />
          <Stat label="Percent" value={`${pct}%`} />
          <Stat label="Time" value={fmtTime(elapsed)} />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/quiz">Another quiz</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/learn">Review lessons</Link>
          </Button>
        </div>
        <h2 className="mt-10 font-display text-xl font-semibold">Question review</h2>
        <div className="mt-4 space-y-3">
          {log.map((item, i) => (
            <div key={`${item.q.id}-${i}`} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm">
                  <span className="mr-2 text-muted">{i + 1}.</span>
                  {item.q.stem}
                </p>
                {item.ok ? <Check className="size-5 shrink-0 text-ok" /> : <X className="size-5 shrink-0 text-bad" />}
              </div>
              <p className="mt-2 text-sm">
                Your answer: <span className={item.ok ? "text-ok" : "text-bad"}>{item.chosen}</span>
              </p>
              {!item.ok ? (
                <p className="text-sm">
                  Correct: <span className="font-mono text-accent">{item.q.correct}</span>
                </p>
              ) : null}
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
                {item.q.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!q) return null;
  const letters = ["A", "B", "C", "D"];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{spec.title}</p>
          {spec.exam ? <p className="text-xs text-muted">C955 Practice Simulation — Not an Official WGU Exam</p> : null}
        </div>
        <div className="flex items-center gap-3 text-sm tabular-nums text-muted">
          {spec.timed ? (
            <span className={cn("inline-flex items-center gap-1", secondsLeft < 60 && "text-bad")}>
              <Clock className="size-4" /> {fmtTime(secondsLeft)}
            </span>
          ) : null}
          <span>
            {idx + 1} / {questions.length}
          </span>
        </div>
      </div>
      <Progress className="mt-3" value={((idx + (phase === "feedback" ? 1 : 0)) / questions.length) * 100} />

      <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="muted">{CONCEPT_META[q.concept].title}</Badge>
          <Badge variant={q.difficulty === "BOSS" || q.difficulty === "HARD" ? "warn" : "muted"}>{q.difficulty}</Badge>
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl">{q.stem}</h2>
        {q.visual ? <VisualBlock visual={q.visual} /> : null}
        <div className="mt-5 grid gap-2">
          {q.choices.map((c, i) => {
            const show = phase === "feedback";
            const isCorrect = c === q.correct;
            const isPicked = c === chosen;
            return (
              <button
                key={`${q.id}-${c}`}
                type="button"
                disabled={!!chosen && immediate}
                onClick={() => submit(c)}
                className={cn(
                  "flex min-h-12 items-start gap-3 rounded-md border px-3 py-3 text-left text-sm transition-colors duration-150",
                  !show && "border-border bg-bg-elevated hover:border-accent/40 hover:bg-surface-2",
                  show && isCorrect && "border-ok/50 bg-ok/10",
                  show && isPicked && !isCorrect && "border-bad/50 bg-bad/10",
                  show && !isPicked && !isCorrect && "border-border bg-bg-elevated opacity-70",
                )}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-sm border border-border font-mono text-xs text-muted">
                  {letters[i]}
                </span>
                <span className="pt-0.5">{c}</span>
              </button>
            );
          })}
        </div>

        {phase === "feedback" && chosen ? (
          <div className="mt-6 space-y-3">
            {chosen === q.correct ? (
              <p className="flex items-center gap-2 font-medium text-ok">
                <Check className="size-5" /> Correct.
              </p>
            ) : (
              <div>
                <p className="flex items-center gap-2 font-medium text-bad">
                  <X className="size-5" /> Not quite.
                </p>
                <p className="mt-1 text-sm">
                  Correct answer: <span className="font-mono text-accent">{q.correct}</span>
                </p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Why</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
                {q.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <ShortcutBox>{q.shortcut}</ShortcutBox>
            <TrapBox>{q.trap}</TrapBox>
            <Button onClick={() => goNext()} className="mt-2">
              {idx + 1 >= questions.length ? "See results" : "Next"}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" asChild>
          <Link to="/quiz">
            <RotateCcw className="size-4" />
            Exit
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function fmtTime(s: number) {
  const m = Math.floor(Math.max(0, s) / 60);
  const r = Math.max(0, s) % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}
