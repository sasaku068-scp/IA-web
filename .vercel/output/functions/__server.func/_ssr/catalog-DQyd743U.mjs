import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DQyd743U.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-IWHfIGH2.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-UZV-Ywjm.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var CHAT_MODEL = "grok-4.7";
var IMAGE_MODEL = "grok-imagine-image-2.0";
var VIDEO_MODEL = "grok-imagine-video-1.5";
var COSTS = {
	chat: 2,
	code: 2,
	image: 8,
	video: 24,
	audio: 4
};
var VOICES = [
	{
		id: "eve",
		label: "Eve"
	},
	{
		id: "ara",
		label: "Ara"
	},
	{
		id: "leo",
		label: "Leo"
	},
	{
		id: "sal",
		label: "Sal"
	},
	{
		id: "luna",
		label: "Luna"
	},
	{
		id: "rex",
		label: "Rex"
	},
	{
		id: "carina",
		label: "Carina"
	},
	{
		id: "orion",
		label: "Orion"
	}
];
function isVoice(value) {
	return VOICES.some((voice) => voice.id === value);
}
var LIVE_MODELS = [
	{
		id: CHAT_MODEL,
		name: "Grok 4.7",
		provider: "xAI",
		use: "Chat et code",
		status: "disponible",
		blurb: "Conversation, rédaction et code. C'est le seul modèle de texte réellement branché.",
		cost: COSTS.chat,
		href: "/chat"
	},
	{
		id: IMAGE_MODEL,
		name: "Imagine Image 2.0",
		provider: "xAI",
		use: "Images",
		status: "disponible",
		blurb: "Génération d'images à partir d'un prompt. Le résultat n'est pas retravaillé en pixel art.",
		cost: COSTS.image,
		href: "/images"
	},
	{
		id: VIDEO_MODEL,
		name: "Imagine Video 1.5",
		provider: "xAI",
		use: "Vidéos",
		status: "premium",
		blurb: "Clip de 6 secondes. Coût plus élevé, réservé aux demandes explicites.",
		cost: COSTS.video,
		href: "/videos"
	},
	{
		id: "grok-voice",
		name: "Voix Grok",
		provider: "xAI",
		use: "Audio",
		status: "disponible",
		blurb: "Synthèse vocale. Le texte est lu, pas réécrit par un autre modèle.",
		cost: COSTS.audio,
		href: "/audio"
	}
];
var UNCONFIGURED_MODELS = [
	{
		id: "gpt",
		name: "GPT",
		provider: "OpenAI",
		use: "Chat",
		status: "non-configure",
		blurb: "Aucune clé OpenAI n'est configurée. Le modèle n'est pas simulé.",
		cost: null,
		href: null
	},
	{
		id: "claude",
		name: "Claude",
		provider: "Anthropic",
		use: "Chat",
		status: "non-configure",
		blurb: "Aucune clé Anthropic n'est configurée. Le modèle n'est pas simulé.",
		cost: null,
		href: null
	},
	{
		id: "gemini",
		name: "Gemini",
		provider: "Google",
		use: "Chat",
		status: "non-configure",
		blurb: "Aucune clé Google n'est configurée. Le modèle n'est pas simulé.",
		cost: null,
		href: null
	},
	{
		id: "deepseek",
		name: "DeepSeek",
		provider: "DeepSeek",
		use: "Chat",
		status: "non-configure",
		blurb: "Aucune clé DeepSeek n'est configurée. Le modèle n'est pas simulé.",
		cost: null,
		href: null
	}
];
var STATUS_LABEL = {
	disponible: "Disponible",
	premium: "Premium",
	"non-configure": "Non configuré"
};
//#endregion
export { STATUS_LABEL as a, VOICES as c, LIVE_MODELS as i, authMiddleware as l, COSTS as n, UNCONFIGURED_MODELS as o, IMAGE_MODEL as r, VIDEO_MODEL as s, CHAT_MODEL as t, isVoice as u };
