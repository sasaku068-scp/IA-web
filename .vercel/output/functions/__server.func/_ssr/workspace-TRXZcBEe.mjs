import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as COSTS, t as CHAT_MODEL } from "./catalog-DQyd743U.mjs";
import { A as sendMessage, C as listConversations, D as removeConversation, S as getMessages, a as PixelIcon, j as useAccountStore, n as Notice, o as PixelWait, s as RetroButton, u as SelectInput } from "./shell-CuzO58Bx.mjs";
import { r as splitBlocks, t as formatWhen } from "./text-DDWQqcvQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-TRXZcBEe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CodeBlock({ lang, code }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-3 border border-line bg-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-line px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-pixel text-micro text-muted",
				children: lang || "CODE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "font-sans text-xs text-ink underline-offset-2 hover:underline",
				onClick: () => {
					navigator.clipboard.writeText(code).then(() => {
						setCopied(true);
						window.setTimeout(() => setCopied(false), 1200);
					});
				},
				children: copied ? "Copié" : "Copier"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto p-3 font-mono text-sm leading-relaxed text-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
		})]
	});
}
function MessageBody({ content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-sm leading-relaxed text-ink md:text-base",
		children: splitBlocks(content).map((block, index) => block.type === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
			lang: block.lang,
			code: block.content
		}, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whitespace-pre-wrap break-words",
			children: block.content
		}, index))
	});
}
function ChatWorkspace({ kind, kicker, placeholder, empty }) {
	const cost = kind === "code" ? COSTS.code : COSTS.chat;
	const credits = useAccountStore((state) => state.credits);
	const setAccount = useAccountStore((state) => state.setAccount);
	const preferred = useAccountStore((state) => state.preferredModel);
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [model, setModel] = (0, import_react.useState)(CHAT_MODEL);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const scroller = (0, import_react.useRef)(null);
	const applied = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!applied.current && preferred === "grok-4.7") {
			applied.current = true;
			setModel(preferred);
		}
	}, [preferred]);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		listConversations({ data: kind }).then((rows) => {
			if (!cancel) setConversations(rows);
		}).catch(() => {
			if (!cancel) setError("Impossible de lire les conversations.");
		});
		return () => {
			cancel = true;
		};
	}, [kind]);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
	}, [messages, pending]);
	async function openConversation(id) {
		setActiveId(id);
		setError(null);
		const rows = await getMessages({ data: id });
		setMessages(rows);
		const found = conversations.find((item) => item.id === id);
		if (found?.model === "grok-4.7") setModel(found.model);
	}
	function startNew() {
		setActiveId(null);
		setMessages([]);
		setError(null);
	}
	async function onSubmit(event) {
		event.preventDefault();
		const content = draft.trim();
		if (!content || pending) return;
		setPending(true);
		setError(null);
		setDraft("");
		const optimistic = {
			id: `local-${Date.now()}`,
			role: "user",
			content,
			model: null,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		setMessages((current) => [...current, optimistic]);
		try {
			const result = await sendMessage({ data: {
				conversationId: activeId,
				content,
				kind,
				model
			} });
			if (result.credits !== null) setAccount({
				credits: result.credits,
				preferredModel: preferred,
				preferredVoice: useAccountStore.getState().preferredVoice
			});
			if (!result.ok) {
				setMessages((current) => current.filter((item) => item.id !== optimistic.id));
				setDraft(content);
				setError(result.error);
				return;
			}
			setActiveId(result.conversation.id);
			setMessages((current) => [
				...current.filter((item) => item.id !== optimistic.id),
				result.user,
				result.assistant
			]);
			setConversations((current) => {
				const rest = current.filter((item) => item.id !== result.conversation.id);
				return [result.conversation, ...rest];
			});
		} catch {
			setMessages((current) => current.filter((item) => item.id !== optimistic.id));
			setDraft(content);
			setError("L'envoi n'a pas abouti.");
		} finally {
			setPending(false);
		}
	}
	async function onRemove(id) {
		await removeConversation({ data: id });
		setConversations((current) => current.filter((item) => item.id !== id));
		if (activeId === id) startNew();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex max-h-40 shrink-0 flex-col border-b border-line bg-panel md:max-h-none md:w-60 md:border-r md:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-pixel text-micro text-muted",
					children: "FILS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-sans text-xs text-ink underline-offset-2 hover:underline",
					onClick: startNew,
					children: "Nouveau"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto px-2 pb-2 md:block md:flex-1 md:overflow-y-auto md:px-2",
				children: conversations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-3 text-xs text-muted",
					children: "Aucune conversation."
				}) : conversations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-40 items-stretch md:mb-1 md:min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void openConversation(item.id),
						className: item.id === activeId ? "min-h-11 flex-1 border border-line bg-violet-soft px-2 py-2 text-left" : "min-h-11 flex-1 border border-transparent px-2 py-2 text-left hover:border-line hover:bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-ink",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted tabular-nums",
							children: formatWhen(item.updatedAt)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "px-2 text-xs text-muted hover:text-ink",
						"aria-label": "Retirer la conversation",
						onClick: () => void onRemove(item.id),
						children: "Retirer"
					})]
				}, item.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 border-b border-line px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-pixel text-micro text-muted",
						children: kicker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex min-w-44 items-center gap-2 text-xs text-muted",
						children: ["Modèle", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							"aria-label": "Modèle",
							value: model,
							onChange: (event) => setModel(event.target.value),
							className: "min-h-10 py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: CHAT_MODEL,
								children: "Grok 4.7 · xAI"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scroller,
					className: "min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-8",
					children: messages.length === 0 && !pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-lg text-sm leading-relaxed text-muted",
						children: empty
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mx-auto flex max-w-3xl flex-col gap-6",
						children: [messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: message.role === "assistant" ? "border-l-2 border-violet pl-3" : "border-l-2 border-line pl-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-pixel text-micro text-ink",
									children: message.role === "user" ? "VOUS" : "MOSAIUM"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted tabular-nums",
									children: message.model ? message.model : formatWhen(message.createdAt)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBody, { content: message.content })]
						}, message.id)), pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-l-2 border-violet pl-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelWait, { label: "Génération" })
						}) : null]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => void onSubmit(event),
					className: "border-t border-line bg-cream p-3",
					children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error })
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-3xl flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: draft,
							onChange: (event) => setDraft(event.target.value),
							onKeyDown: (event) => {
								if (event.key === "Enter" && !event.shiftKey) {
									event.preventDefault();
									event.currentTarget.form?.requestSubmit();
								}
							},
							placeholder,
							className: "retro-field min-h-16",
							"aria-label": "Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted tabular-nums",
								children: [
									cost,
									" crédits · solde ",
									credits ?? "—"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RetroButton, {
								type: "submit",
								tone: "primary",
								disabled: pending || draft.trim().length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelIcon, { name: "send" }), "Envoyer"]
							})]
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ChatWorkspace as t };
