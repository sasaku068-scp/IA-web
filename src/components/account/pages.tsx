import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import {
  CHAT_MODEL,
  COSTS,
  LIVE_MODELS,
  STARTING_CREDITS,
  UNCONFIGURED_MODELS,
  VOICES,
  type CatalogEntry,
} from "@/lib/catalog";
import { useAccountStore } from "@/lib/account-store";
import { getLedger, listHistory, removeConversation, removeGeneration, savePreferences } from "@/lib/mosaium.functions";
import type { Conversation, Generation, LedgerEntry } from "@/lib/types";
import { formatWhen, isHttpsUrl } from "@/lib/text";
import { Notice, PageHeader, RetroButton, ScrollPage, SelectInput, StatusBadge } from "@/components/ui/retro";

function ModelCard({ model }: { model: CatalogEntry }) {
  return (
    <article className="flex h-full flex-col border border-line bg-surface">
      <header className="flex items-center justify-between gap-3 border-b border-line bg-panel px-3 py-2">
        <h2 className="font-display text-xl text-ink">{model.name}</h2>
        <StatusBadge status={model.status} />
      </header>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs tracking-wide text-muted uppercase">
          {model.provider} · {model.use}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink">{model.blurb}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-muted tabular-nums">{model.cost === null ? "—" : `${model.cost} crédits`}</span>
          {model.href ? (
            <Link to={model.href} className="retro-btn min-h-10 px-3 text-xs">
              Ouvrir
            </Link>
          ) : (
            <span className="text-xs text-muted">Pas d'appel possible</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ModelsPage() {
  return (
    <ScrollPage>
      <PageHeader
        kicker="CATALOGUE"
        title="Modèles"
        lede="Grok est branché sur xAI. Les autres noms sont affichés pour situer l'espace, avec le statut Non configuré. Aucune réponse n'est simulée."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {LIVE_MODELS.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      <h2 className="mt-10 font-display text-2xl text-ink">Non configurés</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {UNCONFIGURED_MODELS.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </ScrollPage>
  );
}

export function HistoryPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    listHistory()
      .then((payload) => {
        if (cancel) return;
        setConversations(payload.conversations);
        setGenerations(payload.generations);
      })
      .catch(() => {
        if (!cancel) setError("L'historique n'a pas pu être lu.");
      });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <ScrollPage>
      <PageHeader kicker="HISTORIQUE" title="Ce qui a vraiment été demandé" lede="Conversations et générations de ce compte. Retirer un élément n'efface pas le registre des crédits." />
      {error ? <Notice>{error}</Notice> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="border border-line bg-surface">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">CONVERSATIONS</h2>
          {conversations.length === 0 ? (
            <p className="p-4 text-sm text-muted">Aucune conversation.</p>
          ) : (
            <ul>
              {conversations.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0">
                  <div>
                    <Link to={item.kind === "code" ? "/code" : "/chat"} className="text-sm font-medium text-ink hover:underline">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-muted">
                      {item.kind === "code" ? "Code" : "Chat"} · {item.model} · {formatWhen(item.updatedAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-muted hover:text-ink"
                    onClick={() =>
                      void removeConversation({ data: item.id }).then(() =>
                        setConversations((current) => current.filter((row) => row.id !== item.id)),
                      )
                    }
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="border border-line bg-surface">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">GENERATIONS</h2>
          {generations.length === 0 ? (
            <p className="p-4 text-sm text-muted">Aucune génération.</p>
          ) : (
            <ul>
              {generations.map((item) => (
                <li key={item.id} className="border-b border-line px-4 py-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-ink">{item.prompt}</p>
                      <p className="mt-1 text-xs text-muted">
                        {item.kind} · {item.status} · {item.creditCost} cr · {formatWhen(item.createdAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-muted hover:text-ink"
                      onClick={() =>
                        void removeGeneration({ data: item.id }).then(() =>
                          setGenerations((current) => current.filter((row) => row.id !== item.id)),
                        )
                      }
                    >
                      Retirer
                    </button>
                  </div>
                  {isHttpsUrl(item.resultUrl) && item.kind === "image" ? (
                    <img src={item.resultUrl} alt="" className="mt-3 max-h-48 w-full border border-line object-contain" />
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </ScrollPage>
  );
}

const REASONS: { label: string; cost: number }[] = [
  { label: "Chat", cost: COSTS.chat },
  { label: "Code", cost: COSTS.code },
  { label: "Image", cost: COSTS.image },
  { label: "Vidéo, 6 secondes", cost: COSTS.video },
  { label: "Audio", cost: COSTS.audio },
];

export function CreditsPage() {
  const credits = useAccountStore((state) => state.credits);
  const [rows, setRows] = useState<LedgerEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    getLedger()
      .then((ledger) => {
        if (!cancel) setRows(ledger);
      })
      .catch(() => {
        if (!cancel) setError("Le registre n'a pas pu être lu.");
      });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <ScrollPage>
      <PageHeader
        kicker="CREDITS"
        title="Solde du compte"
        lede={`Chaque compte s'ouvre avec ${STARTING_CREDITS} crédits MOSAÏUM. Ils sont distincts du quota xAI. Un appel refusé est remboursé.`}
      />
      <div className="grid items-start gap-4 lg:grid-cols-12">
        <section className="border border-line bg-surface lg:col-span-4">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">SOLDE</h2>
          <p className="px-4 py-6 font-display text-6xl text-ink tabular-nums">{credits ?? "—"}</p>
          <p className="px-4 pb-4 text-sm text-muted">Crédits restants sur ce compte.</p>
        </section>
        <section className="border border-line bg-surface lg:col-span-8">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">BAREME</h2>
          <table className="w-full text-left text-sm">
            <tbody>
              {REASONS.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-b-0">
                  <th className="px-4 py-3 font-medium text-ink">{row.label}</th>
                  <td className="px-4 py-3 text-right text-muted tabular-nums">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <section className="mt-4 border border-line bg-surface">
        <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">REGISTRE</h2>
        {error ? (
          <div className="p-4">
            <Notice>{error}</Notice>
          </div>
        ) : rows.length === 0 ? (
          <p className="p-4 text-sm text-muted">Aucun mouvement.</p>
        ) : (
          <ul>
            {rows.map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm last:border-b-0">
                <span className="text-ink">{row.reason}</span>
                <span className="text-muted tabular-nums">{formatWhen(row.createdAt)}</span>
                <span className="w-16 text-right font-medium text-ink tabular-nums">
                  {row.delta > 0 ? `+${row.delta}` : row.delta}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ScrollPage>
  );
}

export function SettingsPage() {
  const user = useCurrentUser();
  const account = useAccountStore();
  const [voice, setVoice] = useState(account.preferredVoice);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setVoice(account.preferredVoice);
  }, [account.preferredVoice]);

  async function onSave(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setNotice(null);
    try {
      const saved = await savePreferences({ data: { model: CHAT_MODEL, voice } });
      account.setAccount(saved);
      setNotice("Préférences enregistrées.");
    } catch {
      setNotice("L'enregistrement a échoué.");
    } finally {
      setPending(false);
    }
  }

  return (
    <ScrollPage>
      <PageHeader kicker="COMPTE" title="Paramètres" lede="Identité de la session et préférences utilisées à l'ouverture des ateliers." />
      <div className="grid items-start gap-4 lg:grid-cols-12">
        <section className="border border-line bg-surface lg:col-span-5">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">IDENTITE</h2>
          <dl className="space-y-3 p-4 text-sm">
            <div>
              <dt className="text-xs text-muted uppercase">Nom</dt>
              <dd className="mt-1 text-ink">{user?.displayName ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted uppercase">Adresse</dt>
              <dd className="mt-1 break-all text-ink">{user?.primaryEmail ?? "—"}</dd>
            </div>
          </dl>
          <div className="account-slot border-t border-line px-4 py-3">
            <UserButton />
          </div>
        </section>
        <form onSubmit={(event) => void onSave(event)} className="border border-line bg-surface lg:col-span-7">
          <h2 className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">PREFERENCES</h2>
          <div className="space-y-4 p-4">
            <label>
              <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Modèle de conversation</span>
              <SelectInput value={CHAT_MODEL} onChange={() => undefined} aria-label="Modèle de conversation">
                <option value={CHAT_MODEL}>Grok 4.7 · xAI</option>
              </SelectInput>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">Voix par défaut</span>
              <SelectInput value={voice} onChange={(event) => setVoice(event.target.value)} aria-label="Voix par défaut">
                {VOICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </SelectInput>
            </label>
            {notice ? <p className="text-sm text-ink">{notice}</p> : null}
            <RetroButton type="submit" tone="primary" disabled={pending}>
              Enregistrer
            </RetroButton>
          </div>
        </form>
      </div>
    </ScrollPage>
  );
}
