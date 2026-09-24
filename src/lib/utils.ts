import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function simplifyFrac(n: number, d: number): { n: number; d: number } {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

export function fmtFrac(n: number, d: number): string {
  const s = simplifyFrac(n, d);
  if (s.d === 1) return String(s.n);
  return `${s.n}/${s.d}`;
}

export function fmtPct(n: number, d: number, decimals = 1): string {
  const v = (100 * n) / d;
  const p = v.toFixed(decimals);
  return `${p}%`;
}

export function fmtDec(n: number, d: number, decimals = 2): string {
  return (n / d).toFixed(decimals);
}

export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function seededRng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
