import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as LIVE_MODELS } from "./catalog-DQyd743U.mjs";
import { a as PixelIcon, c as RetroLink, d as Shell, i as Panel, p as StatusBadge } from "./shell-CuzO58Bx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZOpCxvc.js
var import_jsx_runtime = require_jsx_runtime();
var DESK = [
	{
		to: "/chat",
		label: "Chat IA",
		icon: "chat",
		note: "Grok 4.7"
	},
	{
		to: "/code",
		label: "Code",
		icon: "code",
		note: "Même modèle, mode code"
	},
	{
		to: "/images",
		label: "Images",
		icon: "image",
		note: "Imagine 2.0"
	},
	{
		to: "/videos",
		label: "Vidéos",
		icon: "video",
		note: "Premium · 6 s"
	},
	{
		to: "/audio",
		label: "Audio",
		icon: "audio",
		note: "Voix Grok"
	},
	{
		to: "/models",
		label: "Modèles",
		icon: "models",
		note: "Catalogue"
	}
];
var WORK = [
	{
		kicker: "CHAT",
		title: "Une lecture claire",
		text: "Grande zone blanche, séparations nettes, sélecteur de modèle et envoi explicite. Les réponses viennent du fournisseur connecté."
	},
	{
		kicker: "IMAGES",
		title: "Le cadre, pas le filtre",
		text: "L'interface est pixel. Les images générées restent telles que le modèle les rend, assez grandes pour être jugées."
	},
	{
		kicker: "CODE",
		title: "Un éditeur sobre",
		text: "Les extraits s'affichent en monospace, dans un bloc bordé, avec une action pour copier. Rien d'autre."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-enter h-full overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-start gap-8 md:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-pixel text-micro text-muted",
								children: "ESPACE UNIQUE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 max-w-xl font-display text-4xl leading-display text-ink sm:text-5xl md:text-6xl",
								children: [
									"Toutes vos IA.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Un seul espace."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg",
								children: "Chat, code, images et vidéos : retrouvez vos intelligences artificielles dans un espace unique."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroLink, {
									to: "/chat",
									tone: "primary",
									children: "Commencer gratuitement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroLink, {
									to: "/models",
									children: "Explorer les modèles"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-5 md:mt-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							kicker: "MOSAIUM.EXE",
							bodyClassName: "p-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: DESK.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-b border-line last:border-b-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: "flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-violet-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, { name: item.icon }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-sans text-sm font-medium text-ink",
											children: item.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-auto text-xs text-muted",
											children: item.note
										})
									]
								})
							}, item.to)) })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 md:mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-pixel text-micro text-muted",
							children: "MODELES DISPONIBLES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 max-w-xl font-display text-3xl leading-display text-ink",
							children: "Seulement ce qui est vraiment branché."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-4 md:grid-cols-2",
							children: LIVE_MODELS.map((model, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: index === 1 ? "border border-line bg-surface md:mt-6" : "border border-line bg-surface",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
									className: "flex items-center justify-between gap-3 border-b border-line bg-panel px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl text-ink",
										children: model.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: model.status })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs tracking-wide text-muted uppercase",
											children: [
												model.provider,
												" · ",
												model.use
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-relaxed text-ink",
											children: model.blurb
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted tabular-nums",
												children: [model.cost, " crédits"]
											}), model.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: model.href,
												className: "font-sans text-sm text-violet underline-offset-2 hover:underline",
												children: "Ouvrir"
											}) : null]
										})
									]
								})]
							}, model.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-16 grid gap-4 md:grid-cols-3",
					children: WORK.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: index === 1 ? "border border-line bg-surface md:mt-8" : "border border-line bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center gap-2 border-b border-line px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2 bg-violet",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-pixel text-micro text-ink",
								children: item.kicker
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl text-ink",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: item.text
							})]
						})]
					}, item.kicker))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-12 max-w-2xl text-sm leading-relaxed text-muted",
					children: [
						"GPT, Claude, Gemini et DeepSeek restent non configurés. Ils figurent dans le catalogue avec ce statut, sans réponse inventée.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/models",
							className: "text-ink underline-offset-2 hover:underline",
							children: "Voir le catalogue"
						}),
						"."
					]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {}) });
}
//#endregion
export { Home as component };
