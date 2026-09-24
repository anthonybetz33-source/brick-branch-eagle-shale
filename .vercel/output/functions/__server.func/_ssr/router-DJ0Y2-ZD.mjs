import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-DGuhNb5t.mjs";
import { S as require_react, d as DialogClose, f as DialogContent, g as DialogTrigger, h as DialogTitle, m as DialogPortal, p as DialogOverlay, u as Dialog, v as Slot, x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ScrollText, b as BookOpen, c as Menu, d as Gauge, i as Swords, l as Lightbulb, m as CreditCard, n as TriangleAlert, p as Download, t as X, u as House, y as Calculator } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DJ0Y2-ZD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out", className),
		...props
	});
}
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 gap-4 bg-bg-elevated p-6 shadow-lg border border-border text-fg", side === "left" && "inset-y-0 left-0 h-full w-80", side === "right" && "inset-y-0 right-0 h-full w-80", side === "bottom" && "inset-x-0 bottom-0 rounded-t-xl", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,transform,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_35%,transparent)]",
			secondary: "bg-surface text-fg border border-border hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface",
			outline: "border border-border bg-transparent text-fg hover:bg-surface",
			destructive: "bg-bad text-bad-fg hover:bg-bad/90",
			link: "text-accent underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4 py-2 min-h-11",
			sm: "h-9 rounded-sm px-3",
			lg: "h-12 rounded-lg px-6 text-base",
			icon: "h-11 w-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var CONCEPT_IDS = [
	"basic-probability",
	"prime-composite",
	"or-probability",
	"and-probability",
	"without-replacement",
	"conditional",
	"two-way-tables",
	"independent-dependent",
	"empirical-rule",
	"correlation",
	"regression",
	"number-systems",
	"inequalities",
	"multiplication-rule"
];
var KEY = "c955-mastery-v1";
var emptyConcept = () => ({
	attempted: 0,
	correct: 0,
	byDifficulty: {
		EASY: {
			attempted: 0,
			correct: 0
		},
		MEDIUM: {
			attempted: 0,
			correct: 0
		},
		HARD: {
			attempted: 0,
			correct: 0
		},
		BOSS: {
			attempted: 0,
			correct: 0
		}
	}
});
function defaultProgress() {
	const byConcept = {};
	for (const id of CONCEPT_IDS) byConcept[id] = emptyConcept();
	return {
		version: 1,
		attempted: 0,
		correct: 0,
		streak: 0,
		bestStreak: 0,
		studySeconds: 0,
		sessions: 0,
		lastSessionAt: null,
		byConcept,
		missed: [],
		seenIds: [],
		quizHistory: [],
		bestExamPct: null,
		badges: []
	};
}
function load() {
	if (typeof window === "undefined") return defaultProgress();
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultProgress();
		const parsed = JSON.parse(raw);
		if (parsed.version !== 1) return defaultProgress();
		const base = defaultProgress();
		return {
			...base,
			...parsed,
			byConcept: {
				...base.byConcept,
				...parsed.byConcept
			},
			missed: parsed.missed ?? [],
			seenIds: parsed.seenIds ?? [],
			quizHistory: parsed.quizHistory ?? [],
			badges: parsed.badges ?? []
		};
	} catch {
		return defaultProgress();
	}
}
function awardBadges(p) {
	const badges = new Set(p.badges);
	if (p.attempted >= 1) badges.add("first-step");
	if (p.attempted >= 25) badges.add("warmed-up");
	if (p.attempted >= 100) badges.add("century");
	if (p.bestStreak >= 5) badges.add("streak-5");
	if (p.bestStreak >= 10) badges.add("streak-10");
	if (p.bestExamPct != null && p.bestExamPct >= 80) badges.add("exam-80");
	if (p.correct >= 50) badges.add("fifty-correct");
	if (CONCEPT_IDS.filter((c) => (p.byConcept[c]?.attempted ?? 0) >= 5).length >= 8) badges.add("coverage");
	return [...badges];
}
var useProgress = create((set, get) => ({
	...defaultProgress(),
	hydrated: false,
	hydrate: () => {
		set({
			...load(),
			hydrated: true
		});
	},
	persist: () => {
		if (typeof window === "undefined") return;
		const { hydrated: _h, hydrate: _hy, persist: _p, recordAnswer: _r, finishQuiz: _f, addStudySeconds: _a, startSession: _st, reset: _re, ...data } = get();
		localStorage.setItem(KEY, JSON.stringify(data));
	},
	recordAnswer: ({ questionId, concept, difficulty, correct, chosen }) => {
		const s = get();
		const byConcept = { ...s.byConcept };
		const cs = {
			...emptyConcept(),
			...byConcept[concept]
		};
		cs.attempted += 1;
		if (correct) cs.correct += 1;
		cs.byDifficulty = {
			...cs.byDifficulty,
			[difficulty]: {
				attempted: cs.byDifficulty[difficulty].attempted + 1,
				correct: cs.byDifficulty[difficulty].correct + (correct ? 1 : 0)
			}
		};
		byConcept[concept] = cs;
		const streak = correct ? s.streak + 1 : 0;
		const missed = correct ? s.missed.filter((m) => m.questionId !== questionId) : [{
			questionId,
			at: Date.now(),
			chosen
		}, ...s.missed.filter((m) => m.questionId !== questionId)].slice(0, 80);
		const seenIds = s.seenIds.includes(questionId) ? s.seenIds : [...s.seenIds, questionId].slice(-500);
		const next = {
			attempted: s.attempted + 1,
			correct: s.correct + (correct ? 1 : 0),
			streak,
			bestStreak: Math.max(s.bestStreak, streak),
			byConcept,
			missed,
			seenIds
		};
		next.badges = awardBadges({
			...s,
			...next
		});
		set(next);
		get().persist();
	},
	finishQuiz: ({ mode, total, correct, seconds, missedIds }) => {
		const s = get();
		const pct = total ? 100 * correct / total : 0;
		const quizHistory = [{
			mode,
			at: Date.now(),
			total,
			correct,
			seconds,
			missedIds
		}, ...s.quizHistory].slice(0, 30);
		const bestExamPct = mode === "exam" ? Math.max(s.bestExamPct ?? 0, pct) : s.bestExamPct;
		set({
			quizHistory,
			bestExamPct,
			badges: awardBadges({
				...s,
				quizHistory,
				bestExamPct
			})
		});
		get().persist();
	},
	addStudySeconds: (n) => {
		set({ studySeconds: get().studySeconds + n });
		get().persist();
	},
	startSession: () => {
		const s = get();
		const now = Date.now();
		if ((s.lastSessionAt ? now - s.lastSessionAt : Infinity) > 18e5) {
			set({
				sessions: s.sessions + 1,
				lastSessionAt: now
			});
			get().persist();
		} else {
			set({ lastSessionAt: now });
			get().persist();
		}
	},
	reset: () => {
		set({
			...defaultProgress(),
			hydrated: true
		});
		if (typeof window !== "undefined") localStorage.removeItem(KEY);
	}
}));
function accuracy(correct, attempted) {
	if (!attempted) return null;
	return Math.round(1e3 * correct / attempted) / 10;
}
function weakConcepts(p, minAttempts = 3) {
	return CONCEPT_IDS.map((id) => {
		const c = p.byConcept[id];
		const acc = accuracy(c.correct, c.attempted);
		return {
			id,
			attempted: c.attempted,
			correct: c.correct,
			acc
		};
	}).filter((c) => c.attempted >= minAttempts && c.acc != null).sort((a, b) => (a.acc ?? 100) - (b.acc ?? 100));
}
function strongestConcept(p) {
	const ranked = CONCEPT_IDS.map((id) => {
		const c = p.byConcept[id];
		return {
			id,
			attempted: c.attempted,
			acc: accuracy(c.correct, c.attempted)
		};
	}).filter((c) => c.attempted >= 3 && c.acc != null);
	ranked.sort((a, b) => (b.acc ?? 0) - (a.acc ?? 0));
	return ranked[0] ?? null;
}
var BADGE_LABELS = {
	"first-step": {
		title: "First step",
		blurb: "Answered your first question."
	},
	"warmed-up": {
		title: "Warmed up",
		blurb: "25 questions attempted."
	},
	century: {
		title: "Century",
		blurb: "100 questions attempted."
	},
	"streak-5": {
		title: "On a roll",
		blurb: "5 correct in a row."
	},
	"streak-10": {
		title: "Locked in",
		blurb: "10 correct in a row."
	},
	"exam-80": {
		title: "Simulation 80+",
		blurb: "Scored 80% or higher on an exam simulation."
	},
	"fifty-correct": {
		title: "Fifty correct",
		blurb: "50 answers correct."
	},
	coverage: {
		title: "Broad coverage",
		blurb: "Practiced 8+ concepts with at least 5 attempts each."
	}
};
function formatDuration(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	if (h) return `${h}h ${m}m`;
	if (m) return `${m}m`;
	return `${s}s`;
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/learn",
		label: "Learn",
		icon: BookOpen
	},
	{
		to: "/quiz",
		label: "Quiz",
		icon: Swords
	},
	{
		to: "/flashcards",
		label: "Cards",
		icon: CreditCard
	},
	{
		to: "/tricks",
		label: "Tricks",
		icon: Lightbulb
	},
	{
		to: "/cheatsheet",
		label: "Sheet",
		icon: ScrollText
	},
	{
		to: "/calculators",
		label: "Calc",
		icon: Calculator
	},
	{
		to: "/progress",
		label: "Progress",
		icon: Gauge
	}
];
var MOBILE_PRIMARY = [
	"/",
	"/learn",
	"/quiz",
	"/flashcards",
	"/progress"
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hydrate = useProgress((s) => s.hydrate);
	const startSession = useProgress((s) => s.startSession);
	const addStudySeconds = useProgress((s) => s.addStudySeconds);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
		startSession();
	}, [hydrate, startSession]);
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => addStudySeconds(15), 15e3);
		return () => window.clearInterval(t);
	}, [addStudySeconds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-bg-elevated/90 px-3 py-5 backdrop-blur-md lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-1 flex-col gap-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: item.to,
							label: item.label,
							icon: item.icon,
							active: match(pathname, item.to)
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadLink, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex items-center justify-between border-b border-border bg-bg/80 px-3 py-2 backdrop-blur-md lg:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "left",
							className: "w-72",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true }) }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "mt-6 flex flex-col gap-1",
									children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										to: item.to,
										label: item.label,
										icon: item.icon,
										active: match(pathname, item.to),
										onClick: () => setOpen(false)
									}, item.to))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadLink, {})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { compact: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-11" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "lg:pl-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-5xl px-4 py-6 pb-24 lg:px-8 lg:pb-10",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-bg-elevated/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden",
				children: NAV.filter((n) => MOBILE_PRIMARY.includes(n.to)).map((item) => {
					const Icon = item.icon;
					const active = match(pathname, item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-accent" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			})
		]
	});
}
function Brand({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-9 place-items-center rounded-md border border-accent/40 bg-accent/10 font-display text-sm font-semibold text-accent",
			children: "Σ"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-sm font-semibold tracking-tight",
				children: "C955 Mastery"
			}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[11px] text-muted",
				children: "Applied Probability & Statistics"
			}) : null]
		})]
	});
}
function NavLink({ to, label, icon: Icon, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		onClick,
		className: cn("flex min-h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150", active ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface hover:text-fg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
function DownloadLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "/C955_Probability_Statistics_Mastery.html",
		download: "C955_Probability_Statistics_Mastery.html",
		className: "flex min-h-11 items-center gap-2 rounded-md px-3 text-xs text-muted hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download HTML"]
	});
}
function match(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
var styles_default = "/assets/styles-MSA9EfW4.css";
var APP_NAME = "C955 Mastery";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "WGU C955 Applied Probability and Statistics tutor: lessons, drills, flashcards, and exam simulation."
			},
			{
				name: "theme-color",
				content: "#07090f"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Sora:wght@500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$10 = () => import("./routes-CnepOclj.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./calculators-BvphDXht.mjs");
var Route$9 = createFileRoute("/calculators")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./cheatsheet-Dk4tFzSP.mjs");
var Route$8 = createFileRoute("/cheatsheet")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./flashcards-Cd5F0NqW.mjs");
var Route$7 = createFileRoute("/flashcards")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./learn-B3BbpzFj.mjs");
var Route$6 = createFileRoute("/learn")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./progress-Bn596q9K.mjs");
var Route$5 = createFileRoute("/progress")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./quiz-qNEmyFwh.mjs");
var Route$4 = createFileRoute("/quiz")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tricks-Co-pcnMW.mjs");
var Route$3 = createFileRoute("/tricks")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./drill._concept-BgaHmMd2.mjs");
var Route$2 = createFileRoute("/drill/$concept")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./learn._slug-CqypR5ZA.mjs");
var Route$1 = createFileRoute("/learn/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./quiz._mode-BjPDiOeC.mjs");
var Route = createFileRoute("/quiz/$mode")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var CalculatorsRoute = Route$9.update({
	id: "/calculators",
	path: "/calculators",
	getParentRoute: () => Route$11
});
var CheatsheetRoute = Route$8.update({
	id: "/cheatsheet",
	path: "/cheatsheet",
	getParentRoute: () => Route$11
});
var FlashcardsRoute = Route$7.update({
	id: "/flashcards",
	path: "/flashcards",
	getParentRoute: () => Route$11
});
var LearnRoute = Route$6.update({
	id: "/learn",
	path: "/learn",
	getParentRoute: () => Route$11
});
var ProgressRoute = Route$5.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$11
});
var QuizRoute = Route$4.update({
	id: "/quiz",
	path: "/quiz",
	getParentRoute: () => Route$11
});
var TricksRoute = Route$3.update({
	id: "/tricks",
	path: "/tricks",
	getParentRoute: () => Route$11
});
var DrillConceptRoute = Route$2.update({
	id: "/drill/$concept",
	path: "/drill/$concept",
	getParentRoute: () => Route$11
});
var LearnSlugRoute = Route$1.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LearnRoute
});
var QuizModeRoute = Route.update({
	id: "/$mode",
	path: "/$mode",
	getParentRoute: () => QuizRoute
});
var LearnRouteChildren = { LearnSlugRoute };
var LearnRouteWithChildren = LearnRoute._addFileChildren(LearnRouteChildren);
var QuizRouteChildren = { QuizModeRoute };
var rootRouteChildren = {
	IndexRoute,
	CalculatorsRoute,
	CheatsheetRoute,
	FlashcardsRoute,
	LearnRoute: LearnRouteWithChildren,
	ProgressRoute,
	QuizRoute: QuizRoute._addFileChildren(QuizRouteChildren),
	TricksRoute,
	DrillConceptRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { BADGE_LABELS as a, strongestConcept as c, CONCEPT_IDS as d, Button as f, Route$2 as i, useProgress as l, Route as n, accuracy as o, buttonVariants as p, Route$1 as r, formatDuration as s, router_exports as t, weakConcepts as u };
