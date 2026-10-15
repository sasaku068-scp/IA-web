import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  SUBSCRIPTION_PLANS,
  getModelsForPlan,
  type CatalogEntry,
  type PlanId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { ProviderLogo } from "@/components/brand/model-logos";

function ModelChip({ model }: { model: CatalogEntry }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]/80 p-3.5 transition hover:border-[var(--color-primary)]/35">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-ink)]">
        <ProviderLogo providerKey={model.providerKey} className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-ink)]">{model.name}</span>
          {model.category ? (
            <span className="rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
              {model.category}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)] line-clamp-2">{model.blurb}</p>
        <p className="mt-1 text-[11px] text-[var(--color-muted)]">{model.provider}</p>
      </div>
    </div>
  );
}

function PlanCard({ planId }: { planId: PlanId }) {
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId)!;
  const { featured, extra } = getModelsForPlan(planId);
  const [open, setOpen] = useState(false);
  const isPlus = plan.highlight;

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border p-7 transition duration-300",
        isPlus
          ? "border-[var(--color-primary)]/60 bg-gradient-to-b from-[var(--color-primary)]/[0.08] via-[var(--color-surface)] to-[var(--color-surface)] shadow-[0_0_0_1px_rgba(249,115,22,0.12),0_24px_60px_rgba(0,0,0,0.45)]"
          : "border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:border-[var(--color-primary)]/30",
      )}
    >
      {isPlus && plan.badge ? (
        <div className="absolute -top-0 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-b-xl bg-[var(--color-primary)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0a0a0b] shadow-lg">
            ★ {plan.badge}
          </span>
        </div>
      ) : null}

      <div className={cn("relative", isPlus && "pt-4")}>
        <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink)]">{plan.name}</h2>
        <p className="mt-1.5 text-sm text-[var(--color-muted)]">{plan.tagline}</p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="text-5xl font-bold tracking-tight text-[var(--color-ink)] tabular-nums">
            {plan.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-lg font-medium text-[var(--color-muted)]">€{plan.period}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{plan.description}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
          <span className="tabular-nums">{plan.credits}</span>
          <span>crédits / mois</span>
        </div>

        <div className="mt-8 space-y-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Modèles phares
          </p>
          {featured.map((m) => (
            <ModelChip key={m.id} model={m} />
          ))}
        </div>

        {extra.length > 0 ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="group flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-left text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary-soft)]"
              aria-expanded={open}
            >
              <span>
                +{extra.length} autres IA {isPlus ? "avancées " : ""}incluses
              </span>
              <svg
                className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="space-y-2 overflow-hidden">
                {extra.map((m) => (
                  <ModelChip key={m.id} model={m} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {isPlus ? (
          <p className="mt-4 text-xs font-medium text-[var(--color-muted)]">Inclut tous les avantages d'Essentiel</p>
        ) : null}

        <ul className="mt-6 space-y-3">
          {plan.features.slice(0, 5).map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-ink)]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/login"
            className={cn(
              "flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-bold transition",
              isPlus
                ? "bg-gradient-to-b from-[#fb923c] to-[#f97316] text-[#0a0a0b] shadow-[0_8px_28px_rgba(249,115,22,0.35)] hover:from-[#fdba74] hover:to-[#ea580c]"
                : "border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/50",
            )}
          >
            {plan.cta}
          </Link>
          <p className="mt-3 text-center text-xs text-[var(--color-muted)]">
            Facturation mensuelle · Annulable à tout moment
          </p>
        </div>
      </div>
    </article>
  );
}

const FAQ = [
  {
    q: "Quelle formule choisir ?",
    a: "Essentiel convient pour un usage quotidien (questions, rédaction, code simple). Plus est recommandé dès que tu as besoin de modèles avancés, d'images ou de vidéos, ou d'un volume de crédits plus élevé.",
  },
  {
    q: "Comment fonctionnent les crédits ?",
    a: "Chaque opération consomme un nombre de crédits selon le modèle et le type de requête. Une question simple coûte moins qu'une génération multimédia. Le solde ne peut jamais devenir négatif.",
  },
  {
    q: "Que se passe-t-il lorsque mes crédits sont épuisés ?",
    a: "Tu attends le renouvellement mensuel ou tu passes à la formule supérieure. Aucune opération n'est lancée si le solde est insuffisant.",
  },
  {
    q: "Puis-je changer de formule ?",
    a: "Oui. Passage Essentiel ↔ Plus depuis ton compte, selon le cycle de facturation.",
  },
  {
    q: "Tous les modèles affichés sont-ils disponibles ?",
    a: "Les modèles disponibles le sont. Les non configurés ne sont pas présentés comme un avantage utilisable.",
  },
];

export function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            Mosaium IA · Abonnements
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[var(--color-ink)] sm:text-5xl">
            L'intelligence artificielle
            <span className="block text-[var(--color-primary)]">à ton niveau.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Deux formules claires. Logos fournisseurs réels. Crédits transparents. Aucun modèle inventé.
          </p>
        </header>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-8">
          <PlanCard planId="essentiel" />
          <PlanCard planId="plus" />
        </div>

        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold text-[var(--color-ink)]">Comparatif</h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-[var(--color-panel)]">
                  <th className="px-6 py-4 font-medium text-[var(--color-muted)]"> </th>
                  <th className="px-6 py-4 font-bold text-[var(--color-ink)]">Essentiel</th>
                  <th className="px-6 py-4 font-bold text-[var(--color-primary)]">Plus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {[
                  ["Prix mensuel", "2,99 €", "7,99 €"],
                  ["Crédits mensuels", "300", "900"],
                  ["Modèles de base", "Oui", "Oui"],
                  ["Modèles avancés", "—", "+7 modèles"],
                  ["Multimédia", "Limité", "Images & vidéos"],
                  ["Usage recommandé", "Quotidien", "Projets avancés"],
                ].map(([label, a, b]) => (
                  <tr key={label}>
                    <td className="px-6 py-4 text-[var(--color-muted)]">{label}</td>
                    <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{a}</td>
                    <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold text-[var(--color-ink)]">Questions fréquentes</h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] open:border-[var(--color-primary)]/25"
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-[var(--color-ink)] marker:content-none">
                  <div className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <svg className="h-4 w-4 shrink-0 text-[var(--color-muted)] transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <p className="border-t border-[var(--color-line)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-16 text-center text-xs text-[var(--color-muted)]">
          Crédits selon modèle et opération. Aucune promesse de requêtes illimitées.
        </p>
      </div>
    </div>
  );
}
