import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as useCurrentUserState, f as SignInGate } from "./shell-CuzO58Bx.mjs";
import { n as SessionSkeleton, t as SessionPanel } from "./session-panel-B7PdI2YQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guard-WdvqgCSp.js
var import_jsx_runtime = require_jsx_runtime();
function Guarded({ children }) {
	const { isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter grid h-full place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionSkeleton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-enter grid h-full place-items-center overflow-y-auto px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionPanel, {})
		}),
		children
	});
}
//#endregion
export { Guarded as t };
