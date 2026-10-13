import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as VOICES, i as LIVE_MODELS, n as COSTS, o as UNCONFIGURED_MODELS, t as CHAT_MODEL } from "./catalog-DQyd743U.mjs";
import { D as removeConversation, M as useCurrentUser, O as removeGeneration, T as listHistory, h as UserButton, j as useAccountStore, k as savePreferences, l as ScrollPage, n as Notice, p as StatusBadge, r as PageHeader, s as RetroButton, u as SelectInput, x as getLedger } from "./shell-CuzO58Bx.mjs";
import { n as isHttpsUrl, t as formatWhen } from "./text-DDWQqcvQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-BXReG191.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ModelCard({ model }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex h-full flex-col border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line bg-panel px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-ink",
				children: model.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: model.status })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-4",
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
					className: "mt-2 flex-1 text-sm leading-relaxed text-ink",
					children: model.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted tabular-nums",
						children: model.cost === null ? "—" : `${model.cost} crédits`
					}), model.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: model.href,
						className: "retro-btn min-h-10 px-3 text-xs",
						children: "Ouvrir"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Pas d'appel possible"
					})]
				})
			]
		})]
	});
}
function ModelsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "CATALOGUE",
			title: "Modèles",
			lede: "Grok est branché sur xAI. Les autres noms sont affichés pour situer l'espace, avec le statut Non configuré. Aucune réponse n'est simulée."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: LIVE_MODELS.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCard, { model }, model.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl text-ink",
			children: "Non configurés"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4 md:grid-cols-2",
			children: UNCONFIGURED_MODELS.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCard, { model }, model.id))
		})
	] });
}
function HistoryPage() {
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [generations, setGenerations] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		listHistory().then((payload) => {
			if (cancel) return;
			setConversations(payload.conversations);
			setGenerations(payload.generations);
		}).catch(() => {
			if (!cancel) setError("L'historique n'a pas pu être lu.");
		});
		return () => {
			cancel = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "HISTORIQUE",
			title: "Ce qui a vraiment été demandé",
			lede: "Conversations et générations de ce compte. Retirer un élément n'efface pas le registre des crédits."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
					children: "CONVERSATIONS"
				}), conversations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-4 text-sm text-muted",
					children: "Aucune conversation."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: conversations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.kind === "code" ? "/code" : "/chat",
						className: "text-sm font-medium text-ink hover:underline",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							item.kind === "code" ? "Code" : "Chat",
							" · ",
							item.model,
							" · ",
							formatWhen(item.updatedAt)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-muted hover:text-ink",
						onClick: () => void removeConversation({ data: item.id }).then(() => setConversations((current) => current.filter((row) => row.id !== item.id))),
						children: "Retirer"
					})]
				}, item.id)) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
					children: "GENERATIONS"
				}), generations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-4 text-sm text-muted",
					children: "Aucune génération."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: generations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-line px-4 py-3 last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink",
							children: item.prompt
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								item.kind,
								" · ",
								item.status,
								" · ",
								item.creditCost,
								" cr · ",
								formatWhen(item.createdAt)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted hover:text-ink",
							onClick: () => void removeGeneration({ data: item.id }).then(() => setGenerations((current) => current.filter((row) => row.id !== item.id))),
							children: "Retirer"
						})]
					}), isHttpsUrl(item.resultUrl) && item.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.resultUrl,
						alt: "",
						className: "mt-3 max-h-48 w-full border border-line object-contain"
					}) : null]
				}, item.id)) })]
			})]
		})
	] });
}
var REASONS = [
	{
		label: "Chat",
		cost: COSTS.chat
	},
	{
		label: "Code",
		cost: COSTS.code
	},
	{
		label: "Image",
		cost: COSTS.image
	},
	{
		label: "Vidéo, 6 secondes",
		cost: COSTS.video
	},
	{
		label: "Audio",
		cost: COSTS.audio
	}
];
function CreditsPage() {
	const credits = useAccountStore((state) => state.credits);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		getLedger().then((ledger) => {
			if (!cancel) setRows(ledger);
		}).catch(() => {
			if (!cancel) setError("Le registre n'a pas pu être lu.");
		});
		return () => {
			cancel = true;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "CREDITS",
			title: "Solde du compte",
			lede: `Chaque compte s'ouvre avec 120 crédits MOSAÏUM. Ils sont distincts du quota xAI. Un appel refusé est remboursé.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid items-start gap-4 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-surface lg:col-span-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
						children: "SOLDE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-6 font-display text-6xl text-ink tabular-nums",
						children: credits ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pb-4 text-sm text-muted",
						children: "Crédits restants sur ce compte."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-surface lg:col-span-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
					children: "BAREME"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: REASONS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium text-ink",
							children: row.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-right text-muted tabular-nums",
							children: row.cost
						})]
					}, row.label)) })
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 border border-line bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "REGISTRE"
			}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error })
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-4 text-sm text-muted",
				children: "Aucun mouvement."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm last:border-b-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-ink",
						children: row.reason
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted tabular-nums",
						children: formatWhen(row.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-16 text-right font-medium text-ink tabular-nums",
						children: row.delta > 0 ? `+${row.delta}` : row.delta
					})
				]
			}, row.id)) })]
		})
	] });
}
function SettingsPage() {
	const user = useCurrentUser();
	const account = useAccountStore();
	const [voice, setVoice] = (0, import_react.useState)(account.preferredVoice);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setVoice(account.preferredVoice);
	}, [account.preferredVoice]);
	async function onSave(event) {
		event.preventDefault();
		setPending(true);
		setNotice(null);
		try {
			const saved = await savePreferences({ data: {
				model: CHAT_MODEL,
				voice
			} });
			account.setAccount(saved);
			setNotice("Préférences enregistrées.");
		} catch {
			setNotice("L'enregistrement a échoué.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "COMPTE",
		title: "Paramètres",
		lede: "Identité de la session et préférences utilisées à l'ouverture des ateliers."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-4 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border border-line bg-surface lg:col-span-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
					children: "IDENTITE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-3 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted uppercase",
						children: "Nom"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-ink",
						children: user?.displayName ?? "—"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted uppercase",
						children: "Adresse"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 break-all text-ink",
						children: user?.primaryEmail ?? "—"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "account-slot border-t border-line px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void onSave(event),
			className: "border border-line bg-surface lg:col-span-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "PREFERENCES"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase",
						children: "Modèle de conversation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: CHAT_MODEL,
						onChange: () => void 0,
						"aria-label": "Modèle de conversation",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: CHAT_MODEL,
							children: "Grok 4.7 · xAI"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase",
						children: "Voix par défaut"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
						value: voice,
						onChange: (event) => setVoice(event.target.value),
						"aria-label": "Voix par défaut",
						children: VOICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					})] }),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink",
						children: notice
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroButton, {
						type: "submit",
						tone: "primary",
						disabled: pending,
						children: "Enregistrer"
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { SettingsPage as i, HistoryPage as n, ModelsPage as r, CreditsPage as t };
