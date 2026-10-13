import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  CHAT_MODEL,
  COSTS,
  IMAGE_MODEL,
  STARTING_CREDITS,
  VIDEO_MODEL,
  isVoice,
  type ToolKind,
  type VoiceId,
} from "@/lib/catalog";
import type {
  AccountSnapshot,
  ChatMessage,
  Conversation,
  Generation,
  GenerationDetail,
  HistoryPayload,
  LedgerEntry,
} from "@/lib/types";

const CHAT_SYSTEM =
  "Tu es MOSAÏUM AI, un assistant professionnel. Réponds en français, clairement et sans emoji. Quand tu montres du code, utilise des blocs délimités par ```. Reste concis sauf demande contraire.";

const CODE_SYSTEM =
  "Tu es MOSAÏUM AI en mode code. Explique en français, et place le code dans des blocs ```langage. Privilégie un code correct, lisible et directement utilisable. Pas d'emoji.";

type Sql = Awaited<ReturnType<(typeof import("@/lib/db"))["getSql"]>>;

async function db(): Promise<Sql> {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return typeof value === "string" ? value : String(value ?? "");
}

function num(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function apiErrorMessage(status: number, raw: string): string {
  let text = raw.slice(0, 500);
  try {
    const parsed = JSON.parse(raw) as { error?: unknown; message?: unknown };
    if (typeof parsed.error === "string") text = parsed.error;
    else if (parsed.error && typeof parsed.error === "object") {
      const message = (parsed.error as { message?: unknown }).message;
      text = typeof message === "string" ? message : JSON.stringify(parsed.error);
    } else if (typeof parsed.message === "string") text = parsed.message;
  } catch {
    /* keep raw slice */
  }
  if (status === 401 || status === 403 || /credit|spending|quota|billing/i.test(text)) {
    return "Le fournisseur xAI refuse l'appel : quota ou crédits épuisés. L'intégration est en place ; rien n'a été inventé à la place.";
  }
  return `Le modèle n'a pas répondu (${status}).`;
}

function publicError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return "Le modèle a mis trop de temps à répondre.";
    }
    if (error.message === "NO_KEY") {
      return "Le fournisseur xAI n'est pas configuré dans cet environnement.";
    }
    if (error.message.startsWith("Le ")) return error.message;
  }
  return "La génération a échoué. Les crédits de cette tentative ont été rendus.";
}

function requireKey(): string {
  const key = process.env.XAI_API_KEY?.trim();
  if (!key) throw new Error("NO_KEY");
  return key;
}

async function ensureProfile(sql: Sql, userId: string) {
  await sql`insert into profiles (user_id, credits) values (${userId}, ${STARTING_CREDITS}) on conflict (user_id) do nothing`;
}

async function charge(sql: Sql, userId: string, cost: number, reason: string): Promise<number | null> {
  await ensureProfile(sql, userId);
  const rows = await sql<{ credits: number }>`
    update profiles set credits = credits - ${cost}
    where user_id = ${userId} and credits >= ${cost}
    returning credits
  `;
  if (!rows[0]) return null;
  await sql`insert into credit_ledger (id, user_id, delta, reason) values (${crypto.randomUUID()}, ${userId}, ${-cost}, ${reason})`;
  return num(rows[0].credits);
}

async function refund(sql: Sql, userId: string, cost: number, reason: string): Promise<number> {
  const rows = await sql<{ credits: number }>`
    update profiles set credits = credits + ${cost} where user_id = ${userId} returning credits
  `;
  await sql`insert into credit_ledger (id, user_id, delta, reason) values (${crypto.randomUUID()}, ${userId}, ${cost}, ${reason})`;
  return num(rows[0]?.credits);
}

async function xai(path: string, init: RequestInit & { timeout?: number }) {
  const key = requireKey();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${key}`);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return fetch(`https://api.x.ai${path}`, {
    ...init,
    headers,
    signal: AbortSignal.timeout(init.timeout ?? 55_000),
  });
}

function mapConversation(row: {
  id: string;
  title: string;
  model: string;
  kind: string;
  updated_at: unknown;
}): Conversation {
  return {
    id: row.id,
    title: row.title,
    model: row.model,
    kind: row.kind === "code" ? "code" : "chat",
    updatedAt: iso(row.updated_at),
  };
}

function mapMessage(row: {
  id: string;
  role: string;
  content: string;
  model: string | null;
  created_at: unknown;
}): ChatMessage {
  return {
    id: row.id,
    role: row.role === "assistant" ? "assistant" : "user",
    content: row.content,
    model: row.model,
    createdAt: iso(row.created_at),
  };
}

function mapGeneration(row: {
  id: string;
  kind: string;
  model: string;
  prompt: string;
  status: string;
  result_url: string | null;
  credit_cost: number;
  created_at: unknown;
  has_audio?: unknown;
}): Generation {
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
    hasAudio: flag === true || flag === "t" || flag === "true",
  };
}

export const providerStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: Boolean(process.env.XAI_API_KEY?.trim()) };
});

export const getAccount = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<AccountSnapshot> => {
    const sql = await db();
    await ensureProfile(sql, context.userId);
    const rows = await sql<{
      credits: number;
      preferred_model: string;
      preferred_voice: string;
    }>`select credits, preferred_model, preferred_voice from profiles where user_id = ${context.userId}`;
    const row = rows[0];
    return {
      credits: num(row?.credits ?? STARTING_CREDITS),
      preferredModel: row?.preferred_model || CHAT_MODEL,
      preferredVoice: row?.preferred_voice || "eve",
    };
  });

export const savePreferences = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { model?: string; voice?: string }) => {
    const model = input?.model === CHAT_MODEL ? CHAT_MODEL : CHAT_MODEL;
    const voice = typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve";
    return { model, voice };
  })
  .handler(async ({ context, data }): Promise<AccountSnapshot> => {
    const sql = await db();
    await ensureProfile(sql, context.userId);
    const rows = await sql<{ credits: number }>`
      update profiles
      set preferred_model = ${data.model}, preferred_voice = ${data.voice}
      where user_id = ${context.userId}
      returning credits
    `;
    return {
      credits: num(rows[0]?.credits),
      preferredModel: data.model,
      preferredVoice: data.voice,
    };
  });

export const getLedger = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<LedgerEntry[]> => {
    const sql = await db();
    const rows = await sql<{ id: string; delta: number; reason: string; created_at: unknown }>`
      select id, delta, reason, created_at from credit_ledger
      where user_id = ${context.userId}
      order by created_at desc
      limit 40
    `;
    return rows.map((row) => ({
      id: row.id,
      delta: num(row.delta),
      reason: row.reason,
      createdAt: iso(row.created_at),
    }));
  });

export const listConversations = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((kind: "chat" | "code") => (kind === "code" ? "code" : "chat"))
  .handler(async ({ context, data }): Promise<Conversation[]> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      title: string;
      model: string;
      kind: string;
      updated_at: unknown;
    }>`
      select id, title, model, kind, updated_at from conversations
      where user_id = ${context.userId} and kind = ${data}
      order by updated_at desc
      limit 40
    `;
    return rows.map(mapConversation);
  });

export const getMessages = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
    return id;
  })
  .handler(async ({ context, data }): Promise<ChatMessage[]> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      role: string;
      content: string;
      model: string | null;
      created_at: unknown;
    }>`
      select id, role, content, model, created_at from messages
      where conversation_id = ${data} and user_id = ${context.userId}
      order by created_at asc
    `;
    return rows.map(mapMessage);
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { conversationId?: string | null; content?: string; kind?: string; model?: string }) => {
    const content = (input?.content ?? "").trim().slice(0, 8000);
    if (!content) throw new Error("Message vide");
    const kind = input?.kind === "code" ? "code" : "chat";
    const conversationId =
      typeof input?.conversationId === "string" && input.conversationId.length <= 80
        ? input.conversationId
        : null;
    return { content, kind, conversationId, model: CHAT_MODEL as typeof CHAT_MODEL };
  })
  .handler(
    async ({
      context,
      data,
    }): Promise<
      | {
          ok: true;
          conversation: Conversation;
          user: ChatMessage;
          assistant: ChatMessage;
          credits: number;
        }
      | { ok: false; error: string; credits: number | null }
    > => {
      const sql = await db();
      const cost = data.kind === "code" ? COSTS.code : COSTS.chat;
      const credits = await charge(sql, context.userId, cost, data.kind === "code" ? "Code" : "Chat");
      if (credits === null) {
        const account = await sql<{ credits: number }>`select credits from profiles where user_id = ${context.userId}`;
        return { ok: false, error: "Crédits insuffisants pour cet envoi.", credits: num(account[0]?.credits) };
      }
      try {
        let conversationId = data.conversationId;
        let prior: { role: string; content: string }[] = [];
        if (conversationId) {
          const owned = await sql<{ id: string }>`
            select id from conversations
            where id = ${conversationId} and user_id = ${context.userId} and kind = ${data.kind}
          `;
          if (!owned[0]) conversationId = null;
          else {
            prior = await sql<{ role: string; content: string }>`
              select role, content from messages
              where conversation_id = ${conversationId} and user_id = ${context.userId}
              order by created_at asc
            `;
          }
        }
        const history = prior.slice(-8).map((row) => ({
          role: row.role === "assistant" ? "assistant" : "user",
          content: row.content.slice(0, 4000),
        }));
        const response = await xai("/v1/chat/completions", {
          method: "POST",
          timeout: 55_000,
          body: JSON.stringify({
            model: data.model,
            max_tokens: 900,
            messages: [
              { role: "system", content: data.kind === "code" ? CODE_SYSTEM : CHAT_SYSTEM },
              ...history,
              { role: "user", content: data.content },
            ],
          }),
        });
        const raw = await response.text();
        if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
        const parsed = JSON.parse(raw) as { choices?: { message?: { content?: string } }[] };
        const text = parsed.choices?.[0]?.message?.content?.trim() ?? "";
        if (!text) throw new Error("Le modèle a renvoyé une réponse vide.");

        const nowTitle = data.content.replace(/\s+/g, " ").slice(0, 72);
        if (!conversationId) {
          conversationId = crypto.randomUUID();
          await sql`
            insert into conversations (id, user_id, kind, title, model)
            values (${conversationId}, ${context.userId}, ${data.kind}, ${nowTitle}, ${data.model})
          `;
        } else {
          await sql`
            update conversations
            set updated_at = now(), model = ${data.model}
            where id = ${conversationId} and user_id = ${context.userId}
          `;
        }
        const userId = crypto.randomUUID();
        const assistantId = crypto.randomUUID();
        const userCreated = new Date().toISOString();
        await sql`
          insert into messages (id, conversation_id, user_id, role, content, model)
          values (${userId}, ${conversationId}, ${context.userId}, ${"user"}, ${data.content}, ${null})
        `;
        await sql`
          insert into messages (id, conversation_id, user_id, role, content, model)
          values (${assistantId}, ${conversationId}, ${context.userId}, ${"assistant"}, ${text}, ${data.model})
        `;
        const convRows = await sql<{
          id: string;
          title: string;
          model: string;
          kind: string;
          updated_at: unknown;
        }>`
          select id, title, model, kind, updated_at from conversations
          where id = ${conversationId} and user_id = ${context.userId}
        `;
        const conversation = mapConversation(
          convRows[0] ?? {
            id: conversationId,
            title: nowTitle,
            model: data.model,
            kind: data.kind,
            updated_at: userCreated,
          },
        );
        return {
          ok: true,
          conversation,
          credits,
          user: {
            id: userId,
            role: "user",
            content: data.content,
            model: null,
            createdAt: userCreated,
          },
          assistant: {
            id: assistantId,
            role: "assistant",
            content: text,
            model: data.model,
            createdAt: userCreated,
          },
        };
      } catch (error) {
        const restored = await refund(sql, context.userId, cost, "Remboursement");
        return { ok: false, error: publicError(error), credits: restored };
      }
    },
  );

export const removeConversation = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Conversation invalide");
    return id;
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    await sql`delete from messages where conversation_id = ${data} and user_id = ${context.userId}`;
    await sql`delete from conversations where id = ${data} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

async function recordGeneration(
  sql: Sql,
  userId: string,
  row: {
    kind: "image" | "video" | "audio";
    model: string;
    prompt: string;
    status: string;
    resultUrl: string | null;
    resultText: string | null;
    cost: number;
  },
): Promise<GenerationDetail> {
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
  const rows = await sql<{ created_at: unknown }>`select created_at from generations where id = ${id}`;
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
    hasAudio: row.kind === "audio" && Boolean(row.resultText),
  };
}

async function runPaid<T>(
  userId: string,
  kind: ToolKind,
  reason: string,
  work: (sql: Sql) => Promise<T>,
): Promise<{ ok: true; credits: number; value: T } | { ok: false; error: string; credits: number | null }> {
  const sql = await db();
  const cost = COSTS[kind];
  const credits = await charge(sql, userId, cost, reason);
  if (credits === null) {
    const account = await sql<{ credits: number }>`select credits from profiles where user_id = ${userId}`;
    return { ok: false, error: "Crédits insuffisants.", credits: num(account[0]?.credits) };
  }
  try {
    const value = await work(sql);
    return { ok: true, credits, value };
  } catch (error) {
    const restored = await refund(sql, userId, cost, "Remboursement");
    return { ok: false, error: publicError(error), credits: restored };
  }
}

export const generateImage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { prompt?: string }) => {
    const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
    if (!prompt) throw new Error("Décrivez l'image à générer.");
    return { prompt };
  })
  .handler(async ({ context, data }) => {
    const paid = await runPaid(context.userId, "image", "Image", async (sql) => {
      const response = await xai("/v1/images/generations", {
        method: "POST",
        timeout: 90_000,
        body: JSON.stringify({
          model: IMAGE_MODEL,
          prompt: data.prompt,
          n: 1,
          response_format: "url",
        }),
      });
      const raw = await response.text();
      if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
      const parsed = JSON.parse(raw) as { data?: { url?: string }[] };
      const url = parsed.data?.[0]?.url ?? "";
      if (!url.startsWith("https://")) throw new Error("Le modèle n'a pas renvoyé d'image.");
      return recordGeneration(sql, context.userId, {
        kind: "image",
        model: IMAGE_MODEL,
        prompt: data.prompt,
        status: "done",
        resultUrl: url,
        resultText: null,
        cost: COSTS.image,
      });
    });
    if (!paid.ok) return paid;
    return { ok: true as const, credits: paid.credits, generation: paid.value };
  });

export const generateVideo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { prompt?: string }) => {
    const prompt = (input?.prompt ?? "").trim().slice(0, 1500);
    if (!prompt) throw new Error("Décrivez la vidéo à générer.");
    return { prompt };
  })
  .handler(async ({ context, data }) => {
    const paid = await runPaid(context.userId, "video", "Vidéo", async (sql) => {
      const response = await xai("/v1/videos/generations", {
        method: "POST",
        timeout: 40_000,
        body: JSON.stringify({
          model: VIDEO_MODEL,
          prompt: data.prompt,
          duration: 6,
        }),
      });
      const raw = await response.text();
      if (!response.ok) throw new Error(apiErrorMessage(response.status, raw));
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const requestId = [parsed.request_id, parsed.requestId, parsed.id].find((value) => typeof value === "string");
      if (typeof requestId !== "string") throw new Error("Le modèle n'a pas ouvert de génération vidéo.");
      return recordGeneration(sql, context.userId, {
        kind: "video",
        model: VIDEO_MODEL,
        prompt: data.prompt,
        status: "pending",
        resultUrl: null,
        resultText: requestId,
        cost: COSTS.video,
      });
    });
    if (!paid.ok) return paid;
    return { ok: true as const, credits: paid.credits, generation: paid.value };
  });

export const pollVideo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Vidéo invalide");
    return id;
  })
  .handler(async ({ context, data }): Promise<GenerationDetail> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      kind: string;
      model: string;
      prompt: string;
      status: string;
      result_url: string | null;
      result_text: string | null;
      credit_cost: number;
      created_at: unknown;
    }>`
      select id, kind, model, prompt, status, result_url, result_text, credit_cost, created_at
      from generations
      where id = ${data} and user_id = ${context.userId} and kind = ${"video"}
    `;
    const row = rows[0];
    if (!row) throw new Error("Vidéo introuvable");
    const detail = (): GenerationDetail => ({
      ...mapGeneration(row),
      resultText: row.result_text,
      status: row.status,
      resultUrl: row.result_url,
    });
    if (row.status !== "pending" || !row.result_text) return detail();
    const response = await xai(`/v1/videos/${encodeURIComponent(row.result_text)}`, {
      method: "GET",
      timeout: 20_000,
    });
    const raw = await response.text();
    if (!response.ok) {
      if (response.status === 404) return detail();
      throw new Error(apiErrorMessage(response.status, raw));
    }
    const parsed = JSON.parse(raw) as {
      status?: string;
      video?: { url?: string };
      error?: unknown;
    };
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

export const generateAudio = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { text?: string; voice?: string; language?: string }) => {
    const text = (input?.text ?? "").trim().slice(0, 400);
    if (!text) throw new Error("Écrivez le texte à lire.");
    const voice: VoiceId = typeof input?.voice === "string" && isVoice(input.voice) ? input.voice : "eve";
    const language = input?.language === "en" ? "en" : "fr";
    return { text, voice, language };
  })
  .handler(async ({ context, data }) => {
    const paid = await runPaid(context.userId, "audio", "Audio", async (sql) => {
      const response = await xai("/v1/tts", {
        method: "POST",
        timeout: 40_000,
        body: JSON.stringify({
          text: data.text,
          voice_id: data.voice,
          language: data.language,
        }),
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
        cost: COSTS.audio,
      });
    });
    if (!paid.ok) return paid;
    return { ok: true as const, credits: paid.credits, generation: paid.value };
  });

export const listGenerations = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((kind: "image" | "video" | "audio" | "all") =>
    kind === "image" || kind === "video" || kind === "audio" ? kind : "all",
  )
  .handler(async ({ context, data }): Promise<Generation[]> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      kind: string;
      model: string;
      prompt: string;
      status: string;
      result_url: string | null;
      credit_cost: number;
      created_at: unknown;
      has_audio: unknown;
    }>`
      select id, kind, model, prompt, status, result_url, credit_cost, created_at,
        (kind = 'audio' and result_text is not null) as has_audio
      from generations
      where user_id = ${context.userId} and (${data} = 'all' or kind = ${data})
      order by created_at desc
      limit 40
    `;
    return rows.map(mapGeneration);
  });

export const getGeneration = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
    return id;
  })
  .handler(async ({ context, data }): Promise<GenerationDetail | null> => {
    const sql = await db();
    const rows = await sql<{
      id: string;
      kind: string;
      model: string;
      prompt: string;
      status: string;
      result_url: string | null;
      result_text: string | null;
      credit_cost: number;
      created_at: unknown;
    }>`
      select id, kind, model, prompt, status, result_url, result_text, credit_cost, created_at
      from generations
      where id = ${data} and user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return null;
    return { ...mapGeneration({ ...row, has_audio: Boolean(row.result_text) && row.kind === "audio" }), resultText: row.result_text };
  });

export const removeGeneration = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => {
    if (typeof id !== "string" || id.length < 8 || id.length > 80) throw new Error("Élément invalide");
    return id;
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    await sql`delete from generations where id = ${data} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const listHistory = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<HistoryPayload> => {
    const sql = await db();
    const conversations = await sql<{
      id: string;
      title: string;
      model: string;
      kind: string;
      updated_at: unknown;
    }>`
      select id, title, model, kind, updated_at from conversations
      where user_id = ${context.userId}
      order by updated_at desc
      limit 30
    `;
    const generations = await sql<{
      id: string;
      kind: string;
      model: string;
      prompt: string;
      status: string;
      result_url: string | null;
      credit_cost: number;
      created_at: unknown;
      has_audio: unknown;
    }>`
      select id, kind, model, prompt, status, result_url, credit_cost, created_at,
        (kind = 'audio' and result_text is not null) as has_audio
      from generations
      where user_id = ${context.userId}
      order by created_at desc
      limit 30
    `;
    return {
      conversations: conversations.map(mapConversation),
      generations: generations.map(mapGeneration),
    };
  });
