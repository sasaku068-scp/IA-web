import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHAT_MODEL, COSTS } from "@/lib/catalog";
import { useAccountStore } from "@/lib/account-store";
import {
  getMessages,
  listConversations,
  removeConversation,
  sendMessage,
} from "@/lib/mosaium.functions";
import type { ChatMessage, Conversation } from "@/lib/types";
import { formatWhen, splitBlocks } from "@/lib/text";
import { PixelIcon } from "@/components/pixel/icons";
import { Notice, PixelWait, RetroButton, SelectInput } from "@/components/ui/retro";

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-3 border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="font-pixel text-micro text-muted">{lang || "CODE"}</span>
        <button
          type="button"
          className="font-sans text-xs text-ink underline-offset-2 hover:underline"
          onClick={() => {
            void navigator.clipboard.writeText(code).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            });
          }}
        >
          {copied ? "Copié" : "Copier"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-sm leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MessageBody({ content }: { content: string }) {
  return (
    <div className="text-sm leading-relaxed text-ink md:text-base">
      {splitBlocks(content).map((block, index) =>
        block.type === "code" ? (
          <CodeBlock key={index} lang={block.lang} code={block.content} />
        ) : (
          <p key={index} className="whitespace-pre-wrap break-words">
            {block.content}
          </p>
        ),
      )}
    </div>
  );
}

export function ChatWorkspace({
  kind,
  kicker,
  placeholder,
  empty,
}: {
  kind: "chat" | "code";
  kicker: string;
  placeholder: string;
  empty: string;
}) {
  const cost = kind === "code" ? COSTS.code : COSTS.chat;
  const credits = useAccountStore((state) => state.credits);
  const setAccount = useAccountStore((state) => state.setAccount);
  const preferred = useAccountStore((state) => state.preferredModel);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [model, setModel] = useState(CHAT_MODEL);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const applied = useRef(false);

  useEffect(() => {
    if (!applied.current && preferred === CHAT_MODEL) {
      applied.current = true;
      setModel(preferred);
    }
  }, [preferred]);

  useEffect(() => {
    let cancel = false;
    listConversations({ data: kind })
      .then((rows) => {
        if (!cancel) setConversations(rows);
      })
      .catch(() => {
        if (!cancel) setError("Impossible de lire les conversations.");
      });
    return () => {
      cancel = true;
    };
  }, [kind]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages, pending]);

  async function openConversation(id: string) {
    setActiveId(id);
    setError(null);
    const rows = await getMessages({ data: id });
    setMessages(rows);
    const found = conversations.find((item) => item.id === id);
    if (found?.model === CHAT_MODEL) setModel(found.model);
  }

  function startNew() {
    setActiveId(null);
    setMessages([]);
    setError(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || pending) return;
    setPending(true);
    setError(null);
    setDraft("");
    const optimistic: ChatMessage = {
      id: `local-${Date.now()}`,
      role: "user",
      content,
      model: null,
      createdAt: new Date().toISOString(),
    };
    setMessages((current) => [...current, optimistic]);
    try {
      const result = await sendMessage({
        data: { conversationId: activeId, content, kind, model },
      });
      if (result.credits !== null) {
        setAccount({
          credits: result.credits,
          preferredModel: preferred,
          preferredVoice: useAccountStore.getState().preferredVoice,
        });
      }
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
        result.assistant,
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

  async function onRemove(id: string) {
    await removeConversation({ data: id });
    setConversations((current) => current.filter((item) => item.id !== id));
    if (activeId === id) startNew();
  }

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <aside className="flex max-h-40 shrink-0 flex-col border-b border-line bg-panel md:max-h-none md:w-60 md:border-r md:border-b-0">
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <span className="font-pixel text-micro text-muted">FILS</span>
          <button type="button" className="font-sans text-xs text-ink underline-offset-2 hover:underline" onClick={startNew}>
            Nouveau
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-2 pb-2 md:block md:flex-1 md:overflow-y-auto md:px-2">
          {conversations.length === 0 ? (
            <p className="px-2 py-3 text-xs text-muted">Aucune conversation.</p>
          ) : (
            conversations.map((item) => (
              <div key={item.id} className="flex min-w-40 items-stretch md:mb-1 md:min-w-0">
                <button
                  type="button"
                  onClick={() => void openConversation(item.id)}
                  className={
                    item.id === activeId
                      ? "min-h-11 flex-1 border border-line bg-violet-soft px-2 py-2 text-left"
                      : "min-h-11 flex-1 border border-transparent px-2 py-2 text-left hover:border-line hover:bg-surface"
                  }
                >
                  <span className="block truncate text-sm text-ink">{item.title}</span>
                  <span className="mt-1 block text-xs text-muted tabular-nums">{formatWhen(item.updatedAt)}</span>
                </button>
                <button
                  type="button"
                  className="px-2 text-xs text-muted hover:text-ink"
                  aria-label="Retirer la conversation"
                  onClick={() => void onRemove(item.id)}
                >
                  Retirer
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
      <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-3 py-2">
          <span className="font-pixel text-micro text-muted">{kicker}</span>
          <label className="ml-auto flex min-w-44 items-center gap-2 text-xs text-muted">
            Modèle
            <SelectInput
              aria-label="Modèle"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="min-h-10 py-1"
            >
              <option value={CHAT_MODEL}>Grok 4.7 · xAI</option>
            </SelectInput>
          </label>
        </div>
        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-8">
          {messages.length === 0 && !pending ? (
            <p className="max-w-lg text-sm leading-relaxed text-muted">{empty}</p>
          ) : (
            <ol className="mx-auto flex max-w-3xl flex-col gap-6">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className={message.role === "assistant" ? "border-l-2 border-violet pl-3" : "border-l-2 border-line pl-3"}
                >
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="font-pixel text-micro text-ink">
                      {message.role === "user" ? "VOUS" : "MOSAIUM"}
                    </span>
                    <span className="text-xs text-muted tabular-nums">
                      {message.model ? message.model : formatWhen(message.createdAt)}
                    </span>
                  </div>
                  <MessageBody content={message.content} />
                </li>
              ))}
              {pending ? (
                <li className="border-l-2 border-violet pl-3">
                  <PixelWait label="Génération" />
                </li>
              ) : null}
            </ol>
          )}
        </div>
        <form onSubmit={(event) => void onSubmit(event)} className="border-t border-line bg-cream p-3">
          {error ? (
            <div className="mb-3">
              <Notice>{error}</Notice>
            </div>
          ) : null}
          <div className="mx-auto flex max-w-3xl flex-col gap-2">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={placeholder}
              className="retro-field min-h-16"
              aria-label="Message"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted tabular-nums">
                {cost} crédits · solde {credits ?? "—"}
              </span>
              <RetroButton type="submit" tone="primary" disabled={pending || draft.trim().length === 0}>
                <PixelIcon name="send" />
                Envoyer
              </RetroButton>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
