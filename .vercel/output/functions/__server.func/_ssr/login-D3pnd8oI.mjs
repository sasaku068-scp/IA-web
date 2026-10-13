import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as useCurrentUserState, c as RetroLink, d as Shell, i as Panel } from "./shell-CuzO58Bx.mjs";
import { n as SessionSkeleton, t as SessionPanel } from "./session-panel-B7PdI2YQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D3pnd8oI.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter grid h-full place-items-center overflow-y-auto px-4 py-8",
		children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionSkeleton, {}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			kicker: "SESSION",
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-ink",
					children: "Session ouverte"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [user.displayName ?? user.primaryEmail ?? "Compte connecté", "."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroLink, {
						to: "/chat",
						tone: "primary",
						children: "Aller au chat"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-ink underline-offset-2 hover:underline",
						children: "Retour à l'accueil"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionPanel, {})
	}) });
}
//#endregion
export { Login as component };
