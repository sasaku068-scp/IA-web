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
import { LockIcon, ProviderLogo } from "@/components/brand/model-logos";
import { cn } from "@/lib/cn";

function ModelCard({ model }: { model: CatalogEntry }) {
  const locked = model.status === "premium" || model.status === "non-configure";
  const isPremium = model.status === "premium";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface)] transition duration-300",
        locked
          ? "border-[var(--color-line)] opacity-90"
          : "border-[var(--color-line)] hover:border-[var(--color-primary)]/35 hover:shadow-[var(--shadow-card)]",
      )}
    >
      <header className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-ink)]">
          <ProviderLogo providerKey={model.providerKey} className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold text-[var(--color-ink)]">{model.name}</h2>
            {locked ? (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-primary)]"
                title={isPremium ? "Réservé aux abonnés Plus" : "Non configuré"}
              >
                <LockIcon className="h-3 w-3" />
                {isPremium ? "Plus" : "Bientôt"}
              </span>
            ) : null}
          </div>
          <p className="truncate text-xs text-[var(--color-muted)]">
            {model.provider} · {model.use}
          </p>
        </div>
        <StatusBadge status={model.status} />
      </header>

      <div className="flex flex-1 flex-col p-4">
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{model.blurb}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-[var(--color-muted)]">
            {model.cost === null ? "—" : `${model.cost} crédits`}
          </span>
          {locked ? (
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-line)] px-3 py-2 text-xs font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
            >
              <LockIcon className="h-3.5 w-3.5" />
              {isPremium ? "Débloquer" : "Indisponible"}
            </Link>
          ) : model.href ? (
            <Link
              to={model.href}
              className="inline-flex rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-[#0a0a0b] transition hover:bg-[var(--color-primary-600)]"
            >
              Ouvrir
            </Link>
          ) : (
            <span className="text-xs text-[var(--color-muted)]">Pas d'appel</span>
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
        lede="Chaque modèle a son logo fournisseur. Les modèles premium affichent un cadenas — accessibles avec Mosaium Plus."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {LIVE_MODELS.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      <h2 className="mt-10 text-xl font-semibold text-[var(--color-ink)]">Non configurés</h2>
      <p className="mt-1 text-sm text-[var(--color-muted)]">Affichés pour transparence — pas encore branchés.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
        <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Conversations
          </h2>
          {conversations.length === 0 ? (
            <p className="p-4 text-sm text-[var(--color-muted)]">Aucune conversation.</p>
          ) : (
            <ul>
              {conversations.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3 last:border-b-0">
                  <div>
                    <Link to={item.kind === "code" ? "/code" : "/chat"} className="text-sm font-medium text-[var(--color-ink)] hover:underline">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {item.kind === "code" ? "Code" : "Chat"} · {item.model} · {formatWhen(item.updatedAt)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
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
        <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Générations
          </h2>
          {generations.length === 0 ? (
            <p className="p-4 text-sm text-[var(--color-muted)]">Aucune génération.</p>
          ) : (
            <ul>
              {generations.map((item) => (
                <li key={item.id} className="border-b border-[var(--color-line)] px-4 py-3 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-[var(--color-ink)]">{item.prompt}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        {item.kind} · {item.status} · {item.creditCost} cr · {formatWhen(item.createdAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
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
                    <img src={item.resultUrl} alt="" className="mt-3 max-h-48 w-full rounded-lg border border-[var(--color-line)] object-contain" />
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
        <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] lg:col-span-4">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Solde
          </h2>
          <p className="px-4 py-6 text-5xl font-bold tabular-nums text-[var(--color-ink)]">{credits ?? "—"}</p>
          <p className="px-4 pb-4 text-sm text-[var(--color-muted)]">Crédits restants sur ce compte.</p>
        </section>
        <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] lg:col-span-8">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Barème
          </h2>
          <table className="w-full text-left text-sm">
            <tbody>
              {REASONS.map((row) => (
                <tr key={row.label} className="border-b border-[var(--color-line)] last:border-b-0">
                  <th className="px-4 py-3 font-medium text-[var(--color-ink)]">{row.label}</th>
                  <td className="px-4 py-3 text-right tabular-nums text-[var(--color-muted)]">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <section className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
        <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
          Registre
        </h2>
        {error ? (
          <div className="p-4">
            <Notice>{error}</Notice>
          </div>
        ) : rows.length === 0 ? (
          <p className="p-4 text-sm text-[var(--color-muted)]">Aucun mouvement.</p>
        ) : (
          <ul>
            {rows.map((row) => (
              <li key={row.id} className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3 text-sm last:border-b-0">
                <span className="text-[var(--color-ink)]">{row.reason}</span>
                <span className="tabular-nums text-[var(--color-muted)]">{formatWhen(row.createdAt)}</span>
                <span className="w-16 text-right font-medium tabular-nums text-[var(--color-ink)]">
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
        <section className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] lg:col-span-5">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Identité
          </h2>
          <dl className="space-y-3 p-4 text-sm">
            <div>
              <dt className="text-xs uppercase text-[var(--color-muted)]">Nom</dt>
              <dd className="mt-1 text-[var(--color-ink)]">{user?.displayName ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-[var(--color-muted)]">Adresse</dt>
              <dd className="mt-1 break-all text-[var(--color-ink)]">{user?.primaryEmail ?? "—"}</dd>
            </div>
          </dl>
          <div className="account-slot border-t border-[var(--color-line)] px-4 py-3">
            <UserButton />
          </div>
        </section>
        <form onSubmit={(event) => void onSave(event)} className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] lg:col-span-7">
          <h2 className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
            Préférences
          </h2>
          <div className="space-y-4 p-4">
            <label>
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">Modèle de conversation</span>
              <SelectInput value={CHAT_MODEL} onChange={() => undefined} aria-label="Modèle de conversation">
                <option value={CHAT_MODEL}>Grok 4.7 · xAI</option>
              </SelectInput>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">Voix par défaut</span>
              <SelectInput value={voice} onChange={(event) => setVoice(event.target.value)} aria-label="Voix par défaut">
                {VOICES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </SelectInput>
            </label>
            {notice ? <p className="text-sm text-[var(--color-ink)]">{notice}</p> : null}
            <RetroButton type="submit" tone="primary" disabled={pending}>
              Enregistrer
            </RetroButton>
          </div>
        </form>
      </div>
    </ScrollPage>
  );
}
