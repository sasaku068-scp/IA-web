import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Shell } from "./shell-CuzO58Bx.mjs";
import { t as Guarded } from "./guard-WdvqgCSp.mjs";
import { t as ChatWorkspace } from "./workspace-TRXZcBEe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-D9sUcOuq.js
var import_jsx_runtime = require_jsx_runtime();
function ChatPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guarded, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWorkspace, {
		kind: "chat",
		kicker: "CONVERSATION",
		placeholder: "Écrivez un message. Entrée envoie, Maj+Entrée passe une ligne.",
		empty: "Écrivez un message pour ouvrir une conversation. La réponse vient de Grok 4.7, pas d'un texte préparé."
	}) }) });
}
//#endregion
export { ChatPage as component };
