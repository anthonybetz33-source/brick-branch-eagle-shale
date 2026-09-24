import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  CreditCard,
  Download,
  Gauge,
  Home,
  Lightbulb,
  Menu,
  ScrollText,
  Swords,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/quiz", label: "Quiz", icon: Swords },
  { to: "/flashcards", label: "Cards", icon: CreditCard },
  { to: "/tricks", label: "Tricks", icon: Lightbulb },
  { to: "/cheatsheet", label: "Sheet", icon: ScrollText },
  { to: "/calculators", label: "Calc", icon: Calculator },
  { to: "/progress", label: "Progress", icon: Gauge },
] as const;

const MOBILE_PRIMARY = ["/", "/learn", "/quiz", "/flashcards", "/progress"] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useProgress((s) => s.hydrate);
  const startSession = useProgress((s) => s.startSession);
  const addStudySeconds = useProgress((s) => s.addStudySeconds);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hydrate();
    startSession();
  }, [hydrate, startSession]);

  useEffect(() => {
    const t = window.setInterval(() => addStudySeconds(15), 15000);
    return () => window.clearInterval(t);
  }, [addStudySeconds]);

  return (
    <div className="min-h-dvh text-fg">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-bg-elevated/90 px-3 py-5 backdrop-blur-md lg:flex">
        <Brand />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} icon={item.icon} active={match(pathname, item.to)} />
          ))}
        </nav>
        <DownloadLink />
      </aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/80 px-3 py-2 backdrop-blur-md lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Brand compact />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  active={match(pathname, item.to)}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
            <div className="mt-6">
              <DownloadLink />
            </div>
          </SheetContent>
        </Sheet>
        <Brand compact />
        <div className="w-11" />
      </header>

      <main className="lg:pl-60">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 lg:px-8 lg:pb-10">
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-bg-elevated/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        {NAV.filter((n) => (MOBILE_PRIMARY as readonly string[]).includes(n.to)).map((item) => {
          const Icon = item.icon;
          const active = match(pathname, item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                active ? "text-accent" : "text-muted",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-1">
      <span className="grid size-9 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-semibold text-accent">
        Σ
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold tracking-tight">C955 Mastery</span>
        {!compact ? <span className="block text-[11px] text-muted">Applied Probability & Statistics</span> : null}
      </span>
    </Link>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to as "/"}
      onClick={onClick}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
        active ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface hover:text-fg",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function DownloadLink() {
  return (
    <a
      href="/C955_Probability_Statistics_Mastery.html"
      download="C955_Probability_Statistics_Mastery.html"
      className="flex min-h-11 items-center gap-2 rounded-md px-3 text-xs text-muted hover:text-fg"
    >
      <Download className="size-4" />
      Download HTML
    </a>
  );
}

function match(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
