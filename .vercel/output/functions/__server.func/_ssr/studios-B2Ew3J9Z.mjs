import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as VOICES, n as COSTS, r as IMAGE_MODEL, s as VIDEO_MODEL } from "./catalog-DQyd743U.mjs";
import { E as pollVideo, O as removeGeneration, _ as generateImage, b as getGeneration, g as generateAudio, j as useAccountStore, l as ScrollPage, m as TextArea, n as Notice, o as PixelWait, r as PageHeader, s as RetroButton, t as FieldLabel, u as SelectInput, v as generateVideo, w as listGenerations, y as getAccount } from "./shell-CuzO58Bx.mjs";
import { n as isHttpsUrl, t as formatWhen } from "./text-DDWQqcvQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studios-B2Ew3J9Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rememberCredits(credits) {
	if (credits === null) return;
	const state = useAccountStore.getState();
	state.setAccount({
		credits,
		preferredModel: state.preferredModel,
		preferredVoice: state.preferredVoice
	});
}
function statusLabel(status) {
	if (status === "done") return "Terminé";
	if (status === "pending") return "En cours";
	if (status === "error") return "Échec";
	return status;
}
function ImageStudio() {
	const credits = useAccountStore((state) => state.credits);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		listGenerations({ data: "image" }).then((rows) => {
			if (!cancel) setItems(rows);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, []);
	async function onSubmit(event) {
		event.preventDefault();
		if (!prompt.trim() || pending) return;
		setPending(true);
		setError(null);
		try {
			const result = await generateImage({ data: { prompt } });
			rememberCredits(result.credits);
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setItems((current) => [result.generation, ...current]);
			setPrompt("");
		} catch {
			setError("La génération n'a pas abouti.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "IMAGES",
		title: "Générer une image",
		lede: "Le prompt part vers Imagine Image 2.0. L'aperçu reste en définition normale : le pixel art concerne l'interface, pas le résultat."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-4 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void onSubmit(event),
			className: "border border-line bg-surface lg:col-span-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "PROMPT"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: prompt,
						onChange: (event) => setPrompt(event.target.value),
						placeholder: "Un objet, un lieu, une lumière."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted tabular-nums",
						children: [
							IMAGE_MODEL,
							" · ",
							COSTS.image,
							" crédits · solde ",
							credits ?? "—"
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error }) : null,
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelWait, { label: "Génération" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroButton, {
						type: "submit",
						tone: "primary",
						disabled: pending || prompt.trim().length === 0,
						children: "Générer"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:col-span-8",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Les images générées apparaîtront ici, à taille réelle."
			}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "media-frame border border-line bg-surface",
				children: [isHttpsUrl(item.resultUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.resultUrl,
					alt: item.prompt,
					className: "max-h-[480px] w-full bg-panel object-contain"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-40 place-items-center bg-panel text-sm text-muted",
					children: statusLabel(item.status)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "border-t border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-3 text-sm text-ink",
						children: item.prompt
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: formatWhen(item.createdAt)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "hover:text-ink",
							onClick: () => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id))),
							children: "Retirer"
						})]
					})]
				})]
			}, item.id))
		})]
	})] });
}
function VideoStudio() {
	const credits = useAccountStore((state) => state.credits);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		listGenerations({ data: "video" }).then((rows) => {
			if (!cancel) setItems(rows);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, []);
	const pendingId = items.find((item) => item.status === "pending")?.id ?? null;
	(0, import_react.useEffect)(() => {
		if (!pendingId) return;
		let cancel = false;
		let timer = 0;
		let tries = 0;
		const tick = async () => {
			tries += 1;
			try {
				const next = await pollVideo({ data: pendingId });
				if (cancel) return;
				setItems((current) => current.map((item) => item.id === next.id ? {
					...item,
					status: next.status,
					resultUrl: next.resultUrl
				} : item));
				if (next.status === "done" || next.status === "error") {
					const account = await getAccount();
					useAccountStore.getState().setAccount(account);
				}
				if (next.status === "pending" && tries < 40) timer = window.setTimeout(() => void tick(), 3e3);
			} catch {
				if (!cancel && tries < 40) timer = window.setTimeout(() => void tick(), 4e3);
			}
		};
		timer = window.setTimeout(() => void tick(), 2e3);
		return () => {
			cancel = true;
			window.clearTimeout(timer);
		};
	}, [pendingId]);
	async function onSubmit(event) {
		event.preventDefault();
		if (!prompt.trim() || pending) return;
		setPending(true);
		setError(null);
		try {
			const result = await generateVideo({ data: { prompt } });
			rememberCredits(result.credits);
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setItems((current) => [result.generation, ...current]);
			setPrompt("");
		} catch {
			setError("La génération n'a pas abouti.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "VIDEO",
		title: "Générer une vidéo",
		lede: "Imagine Video 1.5 produit un clip de 6 secondes. Le suivi reste visible jusqu'à la fin, ou jusqu'à l'échec — auquel cas les crédits sont rendus."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-4 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void onSubmit(event),
			className: "border border-line bg-surface lg:col-span-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "PROMPT"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: prompt,
						onChange: (event) => setPrompt(event.target.value),
						placeholder: "Un mouvement, un lieu, une durée implicite de 6 secondes."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted tabular-nums",
						children: [
							VIDEO_MODEL,
							" · Premium · ",
							COSTS.video,
							" crédits · solde ",
							credits ?? "—"
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error }) : null,
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelWait, { label: "Ouverture" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroButton, {
						type: "submit",
						tone: "primary",
						disabled: pending || prompt.trim().length === 0,
						children: "Générer"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:col-span-8",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Les clips apparaîtront ici, avec leur lecteur."
			}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "media-frame border border-line bg-surface",
				children: [isHttpsUrl(item.resultUrl) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: item.resultUrl,
					controls: true,
					className: "max-h-[520px] w-full bg-panel"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-48 items-center justify-center bg-panel",
					children: item.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelWait, { label: "Rendu en cours" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: statusLabel(item.status)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "border-t border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink",
						children: item.prompt
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							statusLabel(item.status),
							" · ",
							formatWhen(item.createdAt)
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "hover:text-ink",
							onClick: () => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id))),
							children: "Retirer"
						})]
					})]
				})]
			}, item.id))
		})]
	})] });
}
function AudioStudio() {
	const credits = useAccountStore((state) => state.credits);
	const preferredVoice = useAccountStore((state) => state.preferredVoice);
	const [text, setText] = (0, import_react.useState)("");
	const [voice, setVoice] = (0, import_react.useState)(preferredVoice);
	const [language, setLanguage] = (0, import_react.useState)("fr");
	const [items, setItems] = (0, import_react.useState)([]);
	const [clip, setClip] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (VOICES.some((item) => item.id === preferredVoice)) setVoice(preferredVoice);
	}, [preferredVoice]);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		listGenerations({ data: "audio" }).then((rows) => {
			if (!cancel) setItems(rows);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, []);
	async function onSubmit(event) {
		event.preventDefault();
		if (!text.trim() || pending) return;
		setPending(true);
		setError(null);
		try {
			const result = await generateAudio({ data: {
				text,
				voice,
				language
			} });
			rememberCredits(result.credits);
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setItems((current) => [result.generation, ...current]);
			setClip(result.generation.resultText);
			setText("");
		} catch {
			setError("La lecture n'a pas pu être préparée.");
		} finally {
			setPending(false);
		}
	}
	async function play(id) {
		const detail = await getGeneration({ data: id });
		setClip(detail?.resultText ?? null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "AUDIO",
		title: "Lire un texte",
		lede: "La voix Grok prononce exactement le texte saisi. 400 caractères maximum, pour garder l'appel court."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-4 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void onSubmit(event),
			className: "border border-line bg-surface lg:col-span-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "TEXTE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "À lire" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: text,
						maxLength: 400,
						onChange: (event) => setText(event.target.value),
						placeholder: "Une phrase nette, sans mise en forme."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Voix" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
							value: voice,
							onChange: (event) => setVoice(event.target.value),
							"aria-label": "Voix",
							children: VOICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Langue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
							value: language,
							onChange: (event) => setLanguage(event.target.value === "en" ? "en" : "fr"),
							"aria-label": "Langue",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "fr",
								children: "Français"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "en",
								children: "Anglais"
							})]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted tabular-nums",
						children: [
							text.trim().length,
							"/400 · ",
							COSTS.audio,
							" crédits · solde ",
							credits ?? "—"
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: error }) : null,
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixelWait, { label: "Synthèse" }) : null,
					clip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						controls: true,
						src: `data:audio/mpeg;base64,${clip}`,
						className: "w-full"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetroButton, {
						type: "submit",
						tone: "primary",
						disabled: pending || text.trim().length === 0,
						children: "Lire"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "border border-line bg-surface lg:col-span-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink",
				children: "PISTES"
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "p-4 text-sm text-muted",
				children: "Aucune lecture pour le moment."
			}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink",
					children: item.prompt
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						item.model,
						" · ",
						formatWhen(item.createdAt)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-ink underline-offset-2 hover:underline",
						onClick: () => void play(item.id),
						children: "Écouter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-muted hover:text-ink",
						onClick: () => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id))),
						children: "Retirer"
					})]
				})]
			}, item.id))]
		})]
	})] });
}
//#endregion
export { ImageStudio as n, VideoStudio as r, AudioStudio as t };
