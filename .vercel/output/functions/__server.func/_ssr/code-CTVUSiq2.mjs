import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Shell } from "./shell-CuzO58Bx.mjs";
import { t as Guarded } from "./guard-WdvqgCSp.mjs";
import { t as ChatWorkspace } from "./workspace-TRXZcBEe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/code-CTVUSiq2.js
var import_jsx_runtime = require_jsx_runtime();
function CodePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guarded, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWorkspace, {
		kind: "code",
		kicker: "EDITEUR",
		placeholder: "Décrivez la fonction, le bug, ou collez un extrait.",
		empty: "Le code renvoyé s'affiche en monospace, dans un bloc d'éditeur, avec une action pour le copier."
	}) }) });
}
//#endregion
export { CodePage as component };
