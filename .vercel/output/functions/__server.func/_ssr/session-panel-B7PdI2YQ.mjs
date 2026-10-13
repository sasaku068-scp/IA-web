import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-IWHfIGH2.mjs";
import { t as GROK_PROVIDERS } from "./server-DQlwAnno.mjs";
import { i as Panel } from "./shell-CuzO58Bx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-panel-B7PdI2YQ.js
var import_jsx_runtime = require_jsx_runtime();
function SessionPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		kicker: "SESSION",
		className: "mx-auto max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl leading-display text-ink",
				children: "Connexion requise"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Connectez-vous pour conserver vos conversations, vos générations et vos crédits. Google et X sont les accès disponibles."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-col gap-3",
				children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "retro-btn retro-btn-primary",
					onClick: () => signIn(provider.providerId, { callbackURL: `${window.location.pathname}${window.location.search}` }),
					children: ["Continuer avec ", provider.label]
				}, provider.providerId))
			})
		]
	});
}
function SessionSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md border border-line bg-surface p-4",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-24 bg-panel" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-8 w-56 bg-panel" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-16 w-full bg-panel" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-11 w-full bg-violet-soft" })
		]
	});
}
//#endregion
export { SessionSkeleton as n, SessionPanel as t };
