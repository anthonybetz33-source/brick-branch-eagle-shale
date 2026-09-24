import { t as cn } from "./utils-DGuhNb5t.mjs";
import { x as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-2JhZBy8Q.js
var import_jsx_runtime = require_jsx_runtime();
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-surface-2", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full bg-accent transition-[width] duration-300 ease-out",
			style: { width: `${value ?? 0}%` }
		})
	});
}
//#endregion
export { Progress as t };
