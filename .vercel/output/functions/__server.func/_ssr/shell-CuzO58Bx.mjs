import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut, r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { a as hasGateSessionMarker, t as GROK_PROVIDERS } from "./server-DQlwAnno.mjs";
import { a as STATUS_LABEL, l as authMiddleware, t as CHAT_MODEL, u as isVoice } from "./catalog-DQyd743U.mjs";
import { n as Wordmark } from "./router-hEIEo0cI.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CuzO58Bx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function resolveSignInGateState(input) {
	if (input.isPending) return "pending";
	return input.hasUser ? "signed_in" : "signed_out";
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
function SignInGate({ children, fallback }) {
	const { user, isPending } = useCurrentUserState();
	const state = resolveSignInGateState({
		isPending,
		hasUser: user !== null
	});
	if (state === "pending") return null;
	if (state === "signed_in") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButtons, {}) });
}
function SignInButtons() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full max-w-sm flex-col gap-2",
		children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => signIn(p.providerId, { callbackURL: "/" }),
			className: "w-full cursor-pointer rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900",
			children: ["Continue with ", p.label]
		}, p.providerId))
	});
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function RetroButton({ tone = "ghost", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("retro-btn", tone === "primary" && "retro-btn-primary", className),
		...props
	});
}
function RetroLink({ to, tone = "ghost", className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("retro-btn", tone === "primary" && "retro-btn-primary", className),
		children
	});
}
function FieldLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1.5 block font-sans text-xs font-medium tracking-wide text-muted uppercase",
		children
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn("retro-field", props.className)
	});
}
function SelectInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn("retro-field", props.className)
	});
}
function Panel({ kicker, children, className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("window-enter border border-line bg-surface", className),
		children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center gap-2 border-b border-line bg-panel px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2 bg-violet",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-pixel text-micro text-ink",
				children: kicker
			})]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("p-4", bodyClassName),
			children
		})]
	});
}
function PageHeader({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-pixel text-micro text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl leading-display text-ink md:text-4xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted md:text-base",
				children: lede
			}) : null
		]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 border border-line bg-surface px-2 py-1 text-xs text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-2", status === "disponible" && "bg-pixel", status === "premium" && "bg-violet", status === "non-configure" && "bg-panel"),
			"aria-hidden": true
		}), STATUS_LABEL[status]]
	});
}
function Notice({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "border border-line bg-violet-soft px-3 py-2 text-sm leading-relaxed text-ink",
		children
	});
}
function PixelWait({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "pixel-wait",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
			]
		}), label]
	});
}
function ScrollPage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter h-full overflow-y-auto px-4 py-6 md:px-8 md:py-8",
		children
	});
}
var useAccountStore = create((set) => ({
	credits: null,
	preferredModel: CHAT_MODEL,
	preferredVoice: "eve",
	loaded: false,
	setAccount: (account) => set({
		...account,
		loaded: true
	}),
	reset: () => set({
		credits: null,
		preferredModel: CHAT_MODEL,
		preferredVoice: "eve",
		loaded: false
	})
}));
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var providerStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("38b6bd976ef0d8d91bdd453a7bf6b6de7d1f3250c93aaa10501e27a040c1bf3d"));
var getAccount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4168ad5cc10c47c2e18fdaca99fe7795e83e1c0e15d0e28e711ec9599c23d84c"));
var savePreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	return {
		model: input?.model === "grok-4.7" ? CHAT_MODEL : CHAT_MODEL,
		voice: typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve"
	};
}).handler(createSsrRpc("408d0caa72582d4e4d4e29b26e3545a7f74b2faa2ab48225ba6ddab2a527bbfc"));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("336f2637c02f3bedb7263633212a6f55deebb65471f05a602e88d9e957d53164"));
var listConversations = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((kind) => kind === "code" ? "code" : "chat").handler(createSsrRpc("19e711b767202ca211a9675936a3b92a4e823b67949c032dd248fa7421de852e"));
var getMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
	return id;
}).handler(createSsrRpc("91d86e2e9fe7726940890fe39af017c5b782779e0b9c2537dc809a7460d5bdad"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const content = (input?.content ?? "").trim().slice(0, 8e3);
	if (!content) throw new Error("Message vide");
	return {
		content,
		kind: input?.kind === "code" ? "code" : "chat",
		conversationId: typeof input?.conversationId === "string" && input.conversationId.length <= 80 ? input.conversationId : null,
		model: CHAT_MODEL
	};
}).handler(createSsrRpc("799e2b1695b8f233d1bc704df26d18961a9dc0aa692e2315abc53992b040825b"));
var removeConversation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
	return id;
}).handler(createSsrRpc("2998636ccb9d95c96936ce4dc97307822d4fee33192e9d3c1ae9b37ae1ab1934"));
var generateImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
	if (!prompt) throw new Error("Décrivez l'image à générer.");
	return { prompt };
}).handler(createSsrRpc("5a74eaf6f924ce9d7c91e9561966370b42084391c002e6feff96c2d6b2f965ed"));
var generateVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
	if (!prompt) throw new Error("Décrivez la vidéo à générer.");
	return { prompt };
}).handler(createSsrRpc("7e428cd77f73f7406e7b1f6f843d6f2a59e6302ab207ddbe82e18eb213bd062d"));
var pollVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Vidéo invalide");
	return id;
}).handler(createSsrRpc("3f8afc97039ee6f507e4a0c7ac09d834e98d1bee6d1ab1b683cf99ee853a776c"));
var generateAudio = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const text = (input?.text ?? "").trim().slice(0, 400);
	if (!text) throw new Error("Écrivez le texte à lire.");
	return {
		text,
		voice: typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve",
		language: input?.language === "en" ? "en" : "fr"
	};
}).handler(createSsrRpc("26534afc0ac2e17b0cd1d9d2940e23fbea85293d1ca06109a697a6fc5f1e4bb2"));
var listGenerations = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((kind) => kind === "image" || kind === "video" || kind === "audio" ? kind : "all").handler(createSsrRpc("8d1be7336968b7a81411d9ae198f4aa8b34e22821521f57cca3b6eabc2eedd20"));
var getGeneration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
	return id;
}).handler(createSsrRpc("982a84a1beb84ec5b336024a3c0b453449a7476b941e4a5dd5e874fb22b21bd2"));
var removeGeneration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
	return id;
}).handler(createSsrRpc("73ca655eea70c2c95755f44af6625390588f7a5157e0086b30cc864c91d31e2f"));
var listHistory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8b9d5105340b75e761bd1a871765c8735d03f99a0c8c7d533186546e7854904b"));
var ICONS = {
	home: [
		"...##...",
		"..####..",
		".######.",
		"##....##",
		"##....##",
		"##....##",
		"########",
		"........"
	],
	chat: [
		"########",
		"#......#",
		"#......#",
		"######.#",
		".....#..",
		"....#...",
		"...#....",
		"........"
	],
	code: [
		".##..##.",
		"#..##..#",
		"#......#",
		"#......#",
		"#......#",
		"#..##..#",
		".##..##.",
		"........"
	],
	image: [
		"########",
		"#......#",
		"#.##...#",
		"#...##.#",
		"#....##.",
		"#......#",
		"########",
		"........"
	],
	video: [
		"########",
		"#......#",
		"#..#...#",
		"#..##..#",
		"#..#...#",
		"#......#",
		"########",
		"........"
	],
	audio: [
		"..#..#..",
		"..#..#..",
		".##.##.#",
		".##.##.#",
		"#.#.##.#",
		"#.#.##.#",
		".#...#..",
		"........"
	],
	models: [
		"###.###.",
		"#.#.#.#.",
		"###.###.",
		"........",
		"###.###.",
		"#.#.#.#.",
		"###.###.",
		"........"
	],
	history: [
		"..####..",
		".#....#.",
		"#..#...#",
		"#..##..#",
		"#......#",
		".#....#.",
		"..####..",
		"........"
	],
	credits: [
		"..####..",
		".#....#.",
		"#..##..#",
		"#.#..#.#",
		"#..##..#",
		".#....#.",
		"..####..",
		"........"
	],
	settings: [
		"#....#..",
		"#....#..",
		"########",
		"...#...#",
		"...#...#",
		"########",
		"..#....#",
		"..#....#"
	],
	send: [
		"........",
		"...#....",
		"...##...",
		"########",
		"...##...",
		"...#....",
		"........",
		"........"
	]
};
function PixelIcon({ name }) {
	const rows = ICONS[name];
	const cells = [];
	rows.forEach((row, y) => {
		[...row].forEach((cell, x) => {
			if (cell === "#") cells.push({
				x,
				y
			});
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		shapeRendering: "crispEdges",
		className: "shrink-0",
		children: cells.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: cell.x * 2,
			y: cell.y * 2,
			width: "2",
			height: "2",
			fill: "currentColor"
		}, `${cell.x}-${cell.y}`))
	});
}
var NAV = [
	{
		to: "/",
		label: "Accueil",
		icon: "home"
	},
	{
		to: "/chat",
		label: "Chat IA",
		icon: "chat"
	},
	{
		to: "/code",
		label: "Code",
		icon: "code"
	},
	{
		to: "/images",
		label: "Images",
		icon: "image"
	},
	{
		to: "/videos",
		label: "Vidéos",
		icon: "video"
	},
	{
		to: "/audio",
		label: "Audio",
		icon: "audio"
	},
	{
		to: "/models",
		label: "Modèles",
		icon: "models"
	},
	{
		to: "/history",
		label: "Historique",
		icon: "history"
	},
	{
		to: "/credits",
		label: "Crédits",
		icon: "credits"
	},
	{
		to: "/settings",
		label: "Paramètres",
		icon: "settings"
	}
];
function sectionLabel(pathname) {
	return NAV.find((item) => item.to === "/" ? pathname === "/" : pathname.startsWith(item.to))?.label ?? "MOSAÏUM";
}
function MenuBar() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const credits = useAccountStore((state) => state.credits);
	const section = sectionLabel(pathname);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				"aria-label": "MOSAÏUM AI, accueil",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden h-4 w-px bg-line sm:block",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden font-pixel text-micro text-muted sm:inline",
				children: "v1.0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden h-4 w-px bg-line md:block",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden font-pixel text-micro text-muted md:inline",
				children: "FENETRE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate font-sans text-sm text-ink",
				children: section
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-2 sm:gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/credits",
					className: "inline-flex min-h-9 items-center border border-line bg-cream px-2 font-sans text-xs font-medium text-ink tabular-nums",
					children: user && credits !== null ? `${credits} CR` : "CRÉDITS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "account-slot min-h-8",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 bg-panel" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-sans text-sm text-ink underline-offset-2 hover:underline",
						children: "Connexion"
					})
				})]
			})
		]
	});
}
function SideNav() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Sections",
		className: "flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-panel px-2 py-2 md:w-56 md:flex-col md:overflow-y-auto md:border-r md:border-b-0 md:px-3 md:py-4",
		children: NAV.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				activeOptions: { exact: item.to === "/" },
				className: active ? "nav-link is-active" : "nav-link",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tick",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, { name: item.icon }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-sans text-sm font-medium",
						children: item.label
					})
				]
			}, item.to);
		})
	});
}
function StatusBar() {
	const { user, isPending } = useCurrentUserState();
	const [configured, setConfigured] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		providerStatus().then((status) => {
			if (!cancel) setConfigured(status.configured);
		}).catch(() => {
			if (!cancel) setConfigured(null);
		});
		return () => {
			cancel = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "flex h-7 shrink-0 items-center gap-3 border-t border-line bg-panel px-3 text-xs text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-pixel text-micro text-ink",
				children: "PRET"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-3 w-px bg-line",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isPending ? "Session…" : user ? "Session ouverte" : "Session requise" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: configured === null ? "Fournisseur…" : configured ? "xAI configuré" : "xAI non configuré"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto hidden md:inline",
				children: "Thème clair"
			})
		]
	});
}
function Shell({ children }) {
	const { user } = useCurrentUserState();
	const userId = user?.id ?? null;
	const setAccount = useAccountStore((state) => state.setAccount);
	const reset = useAccountStore((state) => state.reset);
	(0, import_react.useEffect)(() => {
		if (!userId) {
			reset();
			return;
		}
		let cancel = false;
		getAccount().then((account) => {
			if (!cancel) setAccount(account);
		}).catch(() => {
			if (!cancel) reset();
		});
		return () => {
			cancel = true;
		};
	}, [
		userId,
		reset,
		setAccount
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-cream text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "contenu",
					className: "min-h-0 min-w-0 flex-1 overflow-hidden",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {})
		]
	});
}
//#endregion
export { sendMessage as A, listConversations as C, removeConversation as D, pollVideo as E, useCurrentUser as M, useCurrentUserState as N, removeGeneration as O, getMessages as S, listHistory as T, generateImage as _, PixelIcon as a, getGeneration as b, RetroLink as c, Shell as d, SignInGate as f, generateAudio as g, UserButton as h, Panel as i, useAccountStore as j, savePreferences as k, ScrollPage as l, TextArea as m, Notice as n, PixelWait as o, StatusBadge as p, PageHeader as r, RetroButton as s, FieldLabel as t, SelectInput as u, generateVideo as v, listGenerations as w, getLedger as x, getAccount as y };
