import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DGuhNb5t.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function gcd(a, b) {
	a = Math.abs(Math.round(a));
	b = Math.abs(Math.round(b));
	while (b) {
		const t = b;
		b = a % b;
		a = t;
	}
	return a || 1;
}
function simplifyFrac(n, d) {
	if (d < 0) {
		n = -n;
		d = -d;
	}
	const g = gcd(n, d);
	return {
		n: n / g,
		d: d / g
	};
}
function fmtFrac(n, d) {
	const s = simplifyFrac(n, d);
	if (s.d === 1) return String(s.n);
	return `${s.n}/${s.d}`;
}
function shuffle(arr, rng = Math.random) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function seededRng(seed) {
	let s = seed >>> 0 || 1;
	return () => {
		s = 1664525 * s + 1013904223 >>> 0;
		return s / 4294967296;
	};
}
//#endregion
export { shuffle as i, fmtFrac as n, seededRng as r, cn as t };
