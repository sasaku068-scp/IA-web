import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { l as authMiddleware, n as COSTS, r as IMAGE_MODEL, s as VIDEO_MODEL, t as CHAT_MODEL, u as isVoice } from "./catalog-DQyd743U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mosaium.functions-BxnCOeZa.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CHAT_SYSTEM = "Tu es MOSAÏUM AI, un assistant professionnel. Réponds en français, clairement et sans emoji. Quand tu montres du code, utilise des blocs délimités par ```. Reste concis sauf demande contraire.";
var CODE_SYSTEM = "Tu es MOSAÏUM AI en mode code. Explique en français, et place le code dans des blocs ```langage. Privilégie un code correct, lisible et directement utilisable. Pas d'emoji.";
async function db() {
	const { getSql } = await import("./db-C8Fbpzs7.mjs").then((n) => n.t).then((n) => n.t);
	return getSql();
}
function iso(value) {
	if (value instanceof Date) return value.toISOString();
	return typeof value === "string" ? value : String(value ?? "");
}
function num(value) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function apiErrorMessage(status, raw) {
	let text = raw.slice(0, 500);
	try {
		const parsed = JSON.parse(raw);
		if (typeof parsed.error === "string") text = parsed.error;
		else if (parsed.error && typeof parsed.error === "object") {
			const message = parsed.error.message;
			text = typeof message === "string" ? message : JSON.stringify(parsed.error);
		} else if (typeof parsed.message === "string") text = parsed.message;
	} catch {}
	if (status === 401 || status === 403 || /credit|spending|quota|billing/i.test(text)) return "Le fournisseur xAI refuse l'appel : quota ou crédits épuisés. L'intégration est en place ; rien n'a été inventé à la place.";
	return `Le modèle n'a pas répondu (${status}).`;
}
function publicError(error) {
	if (error instanceof Error) {
		if (error.name === "TimeoutError" || error.name === "AbortError") return "Le modèle a mis trop de temps à répondre.";
		if (error.message === "NO_KEY") return "Le fournisseur xAI n'est pas configuré dans cet environnement.";
		if (error.message.startsWith("Le ")) return error.message;
	}
	return "La génération a échoué. Les crédits de cette tentative ont été rendus.";
}
function requireKey() {
	const key = process.env.XAI_API_KEY?.trim();
	if (!key) throw new Error("NO_KEY");
	return key;
}
async function ensureProfile(sql, userId) {
	await sql`insert into profiles (user_id, credits) values (${userId}, ${120}) on conflict (user_id) do nothing`;
}
async function charge(sql, userId, cost, reason) {
	await ensureProfile(sql, userId);
	const rows = await sql`
    update profiles set credits = credits - ${cost}
    where user_id = ${userId} and credits >= ${cost}
    returning credits
  `;
	if (!rows[0]) return null;
	await sql`insert into credit_ledger (id, user_id, delta, reason) values (${crypto.randomUUID()}, ${userId}, ${-cost}, ${reason})`;
	return num(rows[0].credits);
}
async function refund(sql, userId, cost, reason) {
	const rows = await sql`
    update profiles set credits = credits + ${cost} where user_id = ${userId} returning credits
  `;
	await sql`insert into credit_ledger (id, user_id, delta, reason) values (${crypto.randomUUID()}, ${userId}, ${cost}, ${reason})`;
	return num(rows[0]?.credits);
}
async function xai(path, init) {
	const key = requireKey();
	const headers = new Headers(init.headers);
	headers.set("Authorization", `Bearer ${key}`);
	if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
	return fetch(`https://api.x.ai${path}`, {
		...init,
		headers,
		signal: AbortSignal.timeout(init.timeout ?? 55e3)
	});
}
function mapConversation(row) {
	return {
		id: row.id,
		title: row.title,
		model: row.model,
		kind: row.kind === "code" ? "code" : "chat",
		updatedAt: iso(row.updated_at)
	};
}
function mapMessage(row) {
	return {
		id: row.id,
		role: row.role === "assistant" ? "assistant" : "user",
		content: row.content,
		model: row.model,
		createdAt: iso(row.created_at)
	};
}
function mapGeneration(row) {
	const kind = row.kind === "video" || row.kind === "audio" ? row.kind : "image";
	const flag = row.has_audio;
	return {
		id: row.id,
		kind,
		model: row.model,
		prompt: row.prompt,
		status: row.status,
		resultUrl: row.result_url,
		creditCost: num(row.credit_cost),
		createdAt: iso(row.created_at),
		hasAudio: flag === true || flag === "t" || flag === "true"
	};
}
var providerStatus_createServerFn_handler = createServerRpc({
	id: "38b6bd976ef0d8d91bdd453a7bf6b6de7d1f3250c93aaa10501e27a040c1bf3d",
	name: "providerStatus",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => providerStatus.__executeServer(opts));
var providerStatus = createServerFn({ method: "GET" }).handler(providerStatus_createServerFn_handler, async () => {
	return { configured: Boolean(process.env.XAI_API_KEY?.trim()) };
});
var getAccount_createServerFn_handler = createServerRpc({
	id: "4168ad5cc10c47c2e18fdaca99fe7795e83e1c0e15d0e28e711ec9599c23d84c",
	name: "getAccount",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => getAccount.__executeServer(opts));
var getAccount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAccount_createServerFn_handler, async ({ context }) => {
	const sql = await db();
	await ensureProfile(sql, context.userId);
	const row = (await sql`select credits, preferred_model, preferred_voice from profiles where user_id = ${context.userId}`)[0];
	return {
		credits: num(row?.credits ?? 120),
		preferredModel: row?.preferred_model || "grok-4.7",
		preferredVoice: row?.preferred_voice || "eve"
	};
});
var savePreferences_createServerFn_handler = createServerRpc({
	id: "408d0caa72582d4e4d4e29b26e3545a7f74b2faa2ab48225ba6ddab2a527bbfc",
	name: "savePreferences",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => savePreferences.__executeServer(opts));
var savePreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	return {
		model: input?.model === "grok-4.7" ? CHAT_MODEL : CHAT_MODEL,
		voice: typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve"
	};
}).handler(savePreferences_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	await ensureProfile(sql, context.userId);
	return {
		credits: num((await sql`
      update profiles
      set preferred_model = ${data.model}, preferred_voice = ${data.voice}
      where user_id = ${context.userId}
      returning credits
    `)[0]?.credits),
		preferredModel: data.model,
		preferredVoice: data.voice
	};
});
var getLedger_createServerFn_handler = createServerRpc({
	id: "336f2637c02f3bedb7263633212a6f55deebb65471f05a602e88d9e957d53164",
	name: "getLedger",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => getLedger.__executeServer(opts));
var getLedger = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getLedger_createServerFn_handler, async ({ context }) => {
	return (await (await db())`
      select id, delta, reason, created_at from credit_ledger
      where user_id = ${context.userId}
      order by created_at desc
      limit 40
    `).map((row) => ({
		id: row.id,
		delta: num(row.delta),
		reason: row.reason,
		createdAt: iso(row.created_at)
	}));
});
var listConversations_createServerFn_handler = createServerRpc({
	id: "19e711b767202ca211a9675936a3b92a4e823b67949c032dd248fa7421de852e",
	name: "listConversations",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => listConversations.__executeServer(opts));
var listConversations = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((kind) => kind === "code" ? "code" : "chat").handler(listConversations_createServerFn_handler, async ({ context, data }) => {
	return (await (await db())`
      select id, title, model, kind, updated_at from conversations
      where user_id = ${context.userId} and kind = ${data}
      order by updated_at desc
      limit 40
    `).map(mapConversation);
});
var getMessages_createServerFn_handler = createServerRpc({
	id: "91d86e2e9fe7726940890fe39af017c5b782779e0b9c2537dc809a7460d5bdad",
	name: "getMessages",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => getMessages.__executeServer(opts));
var getMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
	return id;
}).handler(getMessages_createServerFn_handler, async ({ context, data }) => {
	return (await (await db())`
      select id, role, content, model, created_at from messages
      where conversation_id = ${data} and user_id = ${context.userId}
      order by created_at asc
    `).map(mapMessage);
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "799e2b1695b8f233d1bc704df26d18961a9dc0aa692e2315abc53992b040825b",
	name: "sendMessage",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const content = (input?.content ?? "").trim().slice(0, 8e3);
	if (!content) throw new Error("Message vide");
	return {
		content,
		kind: input?.kind === "code" ? "code" : "chat",
		conversationId: typeof input?.conversationId === "string" && input.conversationId.length <= 80 ? input.conversationId : null,
		model: CHAT_MODEL
	};
}).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	const cost = data.kind === "code" ? COSTS.code : COSTS.chat;
	const credits = await charge(sql, context.userId, cost, data.kind === "code" ? "Code" : "Chat");
	if (credits === null) return {
		ok: false,
		error: "Crédits insuffisants pour cet envoi.",
		credits: num((await sql`select credits from profiles where user_id = ${context.userId}`)[0]?.credits)
	};
	try {
		let conversationId = data.conversationId;
		let prior = [];
		if (conversationId) {
			if (!(await sql`
            select id from conversations
            where id = ${conversationId} and user_id = ${context.userId} and kind = ${data.kind}
          `)[0]) conversationId = null;
			else prior = await sql`
              select role, content from messages
              where conversation_id = ${conversationId} and user_id = ${context.userId}
              order by created_at asc
            `;
		}
		const history = prior.slice(-8).map((row) => ({
			role: row.role === "assistant" ? "assistant" : "user",
			content: row.content.slice(0, 4e3)
		}));
		const response = await xai("/v1/chat/completions", {
			method: "POST",
			timeout: 55e3,
			body: JSON.stringify({
				model: data.model,
				max_tokens: 900,
				messages: [
					{
						role: "system",
						content: data.kind === "code" ? CODE_SYSTEM : CHAT_SYSTEM
					},
					...history,
					{
						role: "user",
						content: data.content
					}
				]
			})
		});
		const raw = await response.text();
		if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
		const text = JSON.parse(raw).choices?.[0]?.message?.content?.trim() ?? "";
		if (!text) throw new Error("Le modèle a renvoyé une réponse vide.");
		const nowTitle = data.content.replace(/\s+/g, " ").slice(0, 72);
		if (!conversationId) {
			conversationId = crypto.randomUUID();
			await sql`
            insert into conversations (id, user_id, kind, title, model)
            values (${conversationId}, ${context.userId}, ${data.kind}, ${nowTitle}, ${data.model})
          `;
		} else await sql`
            update conversations
            set updated_at = now(), model = ${data.model}
            where id = ${conversationId} and user_id = ${context.userId}
          `;
		const userId = crypto.randomUUID();
		const assistantId = crypto.randomUUID();
		const userCreated = (/* @__PURE__ */ new Date()).toISOString();
		await sql`
          insert into messages (id, conversation_id, user_id, role, content, model)
          values (${userId}, ${conversationId}, ${context.userId}, ${"user"}, ${data.content}, ${null})
        `;
		await sql`
          insert into messages (id, conversation_id, user_id, role, content, model)
          values (${assistantId}, ${conversationId}, ${context.userId}, ${"assistant"}, ${text}, ${data.model})
        `;
		return {
			ok: true,
			conversation: mapConversation((await sql`
          select id, title, model, kind, updated_at from conversations
          where id = ${conversationId} and user_id = ${context.userId}
        `)[0] ?? {
				id: conversationId,
				title: nowTitle,
				model: data.model,
				kind: data.kind,
				updated_at: userCreated
			}),
			credits,
			user: {
				id: userId,
				role: "user",
				content: data.content,
				model: null,
				createdAt: userCreated
			},
			assistant: {
				id: assistantId,
				role: "assistant",
				content: text,
				model: data.model,
				createdAt: userCreated
			}
		};
	} catch (error) {
		const restored = await refund(sql, context.userId, cost, "Remboursement");
		return {
			ok: false,
			error: publicError(error),
			credits: restored
		};
	}
});
var removeConversation_createServerFn_handler = createServerRpc({
	id: "2998636ccb9d95c96936ce4dc97307822d4fee33192e9d3c1ae9b37ae1ab1934",
	name: "removeConversation",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => removeConversation.__executeServer(opts));
var removeConversation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
	return id;
}).handler(removeConversation_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	await sql`delete from messages where conversation_id = ${data} and user_id = ${context.userId}`;
	await sql`delete from conversations where id = ${data} and user_id = ${context.userId}`;
	return { ok: true };
});
async function recordGeneration(sql, userId, row) {
	const id = crypto.randomUUID();
	await sql`
    insert into generations (id, user_id, kind, model, prompt, status, result_url, result_text, credit_cost)
    values (
      ${id},
      ${userId},
      ${row.kind},
      ${row.model},
      ${row.prompt},
      ${row.status},
      ${row.resultUrl},
      ${row.resultText},
      ${row.cost}
    )
  `;
	const rows = await sql`select created_at from generations where id = ${id}`;
	return {
		id,
		kind: row.kind,
		model: row.model,
		prompt: row.prompt,
		status: row.status,
		resultUrl: row.resultUrl,
		resultText: row.resultText,
		creditCost: row.cost,
		createdAt: iso(rows[0]?.created_at),
		hasAudio: row.kind === "audio" && Boolean(row.resultText)
	};
}
async function runPaid(userId, kind, reason, work) {
	const sql = await db();
	const cost = COSTS[kind];
	const credits = await charge(sql, userId, cost, reason);
	if (credits === null) return {
		ok: false,
		error: "Crédits insuffisants.",
		credits: num((await sql`select credits from profiles where user_id = ${userId}`)[0]?.credits)
	};
	try {
		return {
			ok: true,
			credits,
			value: await work(sql)
		};
	} catch (error) {
		const restored = await refund(sql, userId, cost, "Remboursement");
		return {
			ok: false,
			error: publicError(error),
			credits: restored
		};
	}
}
var generateImage_createServerFn_handler = createServerRpc({
	id: "5a74eaf6f924ce9d7c91e9561966370b42084391c002e6feff96c2d6b2f965ed",
	name: "generateImage",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => generateImage.__executeServer(opts));
var generateImage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
	if (!prompt) throw new Error("Décrivez l'image à générer.");
	return { prompt };
}).handler(generateImage_createServerFn_handler, async ({ context, data }) => {
	const paid = await runPaid(context.userId, "image", "Image", async (sql) => {
		const response = await xai("/v1/images/generations", {
			method: "POST",
			timeout: 9e4,
			body: JSON.stringify({
				model: IMAGE_MODEL,
				prompt: data.prompt,
				n: 1,
				response_format: "url"
			})
		});
		const raw = await response.text();
		if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
		const url = JSON.parse(raw).data?.[0]?.url ?? "";
		if (!url.startsWith("https://")) throw new Error("Le modèle n'a pas renvoyé d'image.");
		return recordGeneration(sql, context.userId, {
			kind: "image",
			model: IMAGE_MODEL,
			prompt: data.prompt,
			status: "done",
			resultUrl: url,
			resultText: null,
			cost: COSTS.image
		});
	});
	if (!paid.ok) return paid;
	return {
		ok: true,
		credits: paid.credits,
		generation: paid.value
	};
});
var generateVideo_createServerFn_handler = createServerRpc({
	id: "7e428cd77f73f7406e7b1f6f843d6f2a59e6302ab207ddbe82e18eb213bd062d",
	name: "generateVideo",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => generateVideo.__executeServer(opts));
var generateVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
	if (!prompt) throw new Error("Décrivez la vidéo à générer.");
	return { prompt };
}).handler(generateVideo_createServerFn_handler, async ({ context, data }) => {
	const paid = await runPaid(context.userId, "video", "Vidéo", async (sql) => {
		const response = await xai("/v1/videos/generations", {
			method: "POST",
			timeout: 4e4,
			body: JSON.stringify({
				model: VIDEO_MODEL,
				prompt: data.prompt,
				duration: 6
			})
		});
		const raw = await response.text();
		if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
		const parsed = JSON.parse(raw);
		const requestId = [
			parsed.request_id,
			parsed.requestId,
			parsed.id
		].find((value) => typeof value === "string");
		if (typeof requestId !== "string") throw new Error("Le modèle n'a pas ouvert de génération vidéo.");
		return recordGeneration(sql, context.userId, {
			kind: "video",
			model: VIDEO_MODEL,
			prompt: data.prompt,
			status: "pending",
			resultUrl: null,
			resultText: requestId,
			cost: COSTS.video
		});
	});
	if (!paid.ok) return paid;
	return {
		ok: true,
		credits: paid.credits,
		generation: paid.value
	};
});
var pollVideo_createServerFn_handler = createServerRpc({
	id: "3f8afc97039ee6f507e4a0c7ac09d834e98d1bee6d1ab1b683cf99ee853a776c",
	name: "pollVideo",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => pollVideo.__executeServer(opts));
var pollVideo = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Vidéo invalide");
	return id;
}).handler(pollVideo_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	const row = (await sql`
      select id, kind, model, prompt, status, result_url, result_text, credit_cost, created_at
      from generations
      where id = ${data} and user_id = ${context.userId} and kind = ${"video"}
    `)[0];
	if (!row) throw new Error("Vidéo introuvable");
	const detail = () => ({
		...mapGeneration(row),
		resultText: row.result_text,
		status: row.status,
		resultUrl: row.result_url
	});
	if (row.status !== "pending" || !row.result_text) return detail();
	const response = await xai(`/v1/videos/${encodeURIComponent(row.result_text)}`, {
		method: "GET",
		timeout: 2e4
	});
	const raw = await response.text();
	if (!response.ok) {
		if (response.status === 404) return detail();
		throw new Error(apiErrorMessage(response.status, raw));
	}
	const parsed = JSON.parse(raw);
	const status = parsed.status ?? "pending";
	if (status === "done" && parsed.video?.url?.startsWith("https://")) {
		await sql`
        update generations set status = ${"done"}, result_url = ${parsed.video.url}
        where id = ${row.id} and user_id = ${context.userId}
      `;
		row.status = "done";
		row.result_url = parsed.video.url;
		return detail();
	}
	if (status === "failed" || status === "expired") {
		await sql`
        update generations set status = ${"error"}
        where id = ${row.id} and user_id = ${context.userId} and status = ${"pending"}
      `;
		await refund(sql, context.userId, num(row.credit_cost), "Remboursement vidéo");
		row.status = "error";
		return detail();
	}
	return detail();
});
var generateAudio_createServerFn_handler = createServerRpc({
	id: "26534afc0ac2e17b0cd1d9d2940e23fbea85293d1ca06109a697a6fc5f1e4bb2",
	name: "generateAudio",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => generateAudio.__executeServer(opts));
var generateAudio = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const text = (input?.text ?? "").trim().slice(0, 400);
	if (!text) throw new Error("Écrivez le texte à lire.");
	return {
		text,
		voice: typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve",
		language: input?.language === "en" ? "en" : "fr"
	};
}).handler(generateAudio_createServerFn_handler, async ({ context, data }) => {
	const paid = await runPaid(context.userId, "audio", "Audio", async (sql) => {
		const response = await xai("/v1/tts", {
			method: "POST",
			timeout: 4e4,
			body: JSON.stringify({
				text: data.text,
				voice_id: data.voice,
				language: data.language
			})
		});
		const type = response.headers.get("content-type") ?? "";
		if (!response.ok || type.includes("json") || type.includes("text")) {
			const raw = await response.text();
			throw new Error(apiErrorMessage(response.status, raw));
		}
		const bytes = Buffer.from(await response.arrayBuffer());
		if (bytes.byteLength < 32) throw new Error("Le modèle n'a pas renvoyé d'audio.");
		const b64 = bytes.toString("base64");
		return recordGeneration(sql, context.userId, {
			kind: "audio",
			model: data.voice,
			prompt: data.text,
			status: "done",
			resultUrl: null,
			resultText: b64,
			cost: COSTS.audio
		});
	});
	if (!paid.ok) return paid;
	return {
		ok: true,
		credits: paid.credits,
		generation: paid.value
	};
});
var listGenerations_createServerFn_handler = createServerRpc({
	id: "8d1be7336968b7a81411d9ae198f4aa8b34e22821521f57cca3b6eabc2eedd20",
	name: "listGenerations",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => listGenerations.__executeServer(opts));
var listGenerations = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((kind) => kind === "image" || kind === "video" || kind === "audio" ? kind : "all").handler(listGenerations_createServerFn_handler, async ({ context, data }) => {
	return (await (await db())`
      select id, kind, model, prompt, status, result_url, credit_cost, created_at,
        (kind = 'audio' and result_text is not null) as has_audio
      from generations
      where user_id = ${context.userId} and (${data} = 'all' or kind = ${data})
      order by created_at desc
      limit 40
    `).map(mapGeneration);
});
var getGeneration_createServerFn_handler = createServerRpc({
	id: "982a84a1beb84ec5b336024a3c0b453449a7476b941e4a5dd5e874fb22b21bd2",
	name: "getGeneration",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => getGeneration.__executeServer(opts));
var getGeneration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
	return id;
}).handler(getGeneration_createServerFn_handler, async ({ context, data }) => {
	const row = (await (await db())`
      select id, kind, model, prompt, status, result_url, result_text, credit_cost, created_at
      from generations
      where id = ${data} and user_id = ${context.userId}
    `)[0];
	if (!row) return null;
	return {
		...mapGeneration({
			...row,
			has_audio: Boolean(row.result_text) && row.kind === "audio"
		}),
		resultText: row.result_text
	};
});
var removeGeneration_createServerFn_handler = createServerRpc({
	id: "73ca655eea70c2c95755f44af6625390588f7a5157e0086b30cc864c91d31e2f",
	name: "removeGeneration",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => removeGeneration.__executeServer(opts));
var removeGeneration = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => {
	if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
	return id;
}).handler(removeGeneration_createServerFn_handler, async ({ context, data }) => {
	await (await db())`delete from generations where id = ${data} and user_id = ${context.userId}`;
	return { ok: true };
});
var listHistory_createServerFn_handler = createServerRpc({
	id: "8b9d5105340b75e761bd1a871765c8735d03f99a0c8c7d533186546e7854904b",
	name: "listHistory",
	filename: "src/lib/mosaium.functions.ts"
}, (opts) => listHistory.__executeServer(opts));
var listHistory = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listHistory_createServerFn_handler, async ({ context }) => {
	const sql = await db();
	const conversations = await sql`
      select id, title, model, kind, updated_at from conversations
      where user_id = ${context.userId}
      order by updated_at desc
      limit 30
    `;
	const generations = await sql`
      select id, kind, model, prompt, status, result_url, credit_cost, created_at,
        (kind = 'audio' and result_text is not null) as has_audio
      from generations
      where user_id = ${context.userId}
      order by created_at desc
      limit 30
    `;
	return {
		conversations: conversations.map(mapConversation),
		generations: generations.map(mapGeneration)
	};
});
//#endregion
export { generateAudio_createServerFn_handler, generateImage_createServerFn_handler, generateVideo_createServerFn_handler, getAccount_createServerFn_handler, getGeneration_createServerFn_handler, getLedger_createServerFn_handler, getMessages_createServerFn_handler, listConversations_createServerFn_handler, listGenerations_createServerFn_handler, listHistory_createServerFn_handler, pollVideo_createServerFn_handler, providerStatus_createServerFn_handler, removeConversation_createServerFn_handler, removeGeneration_createServerFn_handler, savePreferences_createServerFn_handler, sendMessage_createServerFn_handler };
