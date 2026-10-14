import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  SUBSCRIPTION_PLANS,
  getModelsForPlan,
  type CatalogEntry,
  type PlanId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

function ModelChip({ model }: { model: CatalogEntry }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3 transition hover:border-[var(--color-primary)]/30">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-soft)] text-xs font-semibold text-[var(--color-primary)]">
        {model.name.slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--color-ink)]">{model.name}</span>
          {model.category ? (
            <span className="rounded-full bg-[var(--color-panel)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
              {model.category}
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-muted)] line-clamp-2">{model.blurb}</p>
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
        "relative flex flex-col rounded-2xl border bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition duration-200",
        isPlus
          ? "border-[var(--color-primary)]/40 ring-1 ring-[var(--color-primary)]/20"
          : "border-[var(--color-line)] hover:border-[var(--color-primary)]/25",
      )}
    >
      {isPlus && plan.badge ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
            {plan.badge}
          </span>
        </div>
      ) : null}

      {isPlus ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-[var(--color-primary)]/8 to-transparent" />
      ) : null}

      <div className="relative">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">{plan.name}</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{plan.tagline}</p>

        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-[var(--color-ink)] tabular-nums">
            {plan.price.toFixed(2).replace(".", ",")}&nbsp;€
          </span>
          <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{plan.description}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-soft)] px-3 py-1.5 text-sm font-medium text-[var(--color-primary)]">
          <span className="tabular-nums">{plan.credits}</span>
          <span>crédits / mois</span>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted)]">Modèles phares</p>
          {featured.map((m) => (
            <ModelChip key={m.id} model={m} />
          ))}
        </div>

        {extra.length > 0 ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="group flex w-full items-center justify-between rounded-lg px-1 py-2 text-left text-sm font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-primary-soft)]"
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
                "grid transition-all duration-200 ease-out",
                open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden space-y-2">
                {extra.map((m) => (
                  <ModelChip key={m.id} model={m} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {isPlus ? (
          <p className="mt-4 text-xs font-medium text-[var(--color-muted)]">Inclut les avantages d'Essentiel</p>
        ) : null}

        <ul className="mt-5 space-y-2.5">
          {plan.features.slice(0, 5).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-ink)]">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/login"
            className={cn(
              "flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold transition",
              isPlus
                ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-md hover:opacity-95"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)]",
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
    a: "Chaque opération consomme un nombre de crédits qui dépend du modèle et du type de requête (chat, code, image, vidéo…). Une question simple coûte moins qu'une génération multimédia. Le solde ne peut jamais devenir négatif.",
  },
  {
    q: "Que se passe-t-il lorsque mes crédits sont épuisés ?",
    a: "Tu peux attendre le renouvellement mensuel, ou passer à la formule supérieure pour disposer de plus de crédits. Aucune opération n'est lancée si le solde est insuffisant.",
  },
  {
    q: "Puis-je changer de formule ?",
    a: "Oui. Tu peux passer d'Essentiel à Plus (ou inversement) depuis ton compte. Le changement prend effet selon le cycle de facturation en cours.",
  },
  {
    q: "Tous les modèles affichés sont-ils disponibles immédiatement ?",
    a: "Les modèles listés comme disponibles le sont. Les modèles marqués non configurés dans le catalogue ne sont pas encore branchés et ne sont pas présentés comme un avantage utilisable.",
  },
];

export function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Intro */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Mosaium IA · Nos abonnements
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          L'intelligence artificielle à ton niveau.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
          Choisis les IA qui correspondent à tes projets. Une formule simple pour commencer, une formule plus complète pour aller plus loin.
        </p>
      </header>

      {/* Cards */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-6">
        <PlanCard planId="essentiel" />
        <PlanCard planId="plus" />
      </div>

      {/* Comparison */}
      <section className="mt-20">
        <h2 className="text-center text-xl font-semibold text-[var(--color-ink)]">Comparatif rapide</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-[var(--color-panel)]">
                <th className="px-5 py-3.5 font-medium text-[var(--color-muted)]"> </th>
                <th className="px-5 py-3.5 font-semibold text-[var(--color-ink)]">Essentiel</th>
                <th className="px-5 py-3.5 font-semibold text-[var(--color-ink)]">Plus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Prix mensuel</td>
                <td className="px-5 py-3.5 font-medium tabular-nums">2,99 €</td>
                <td className="px-5 py-3.5 font-medium tabular-nums">7,99 €</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Crédits mensuels</td>
                <td className="px-5 py-3.5 font-medium tabular-nums">300</td>
                <td className="px-5 py-3.5 font-medium tabular-nums">900</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Modèles de base</td>
                <td className="px-5 py-3.5">5 modèles</td>
                <td className="px-5 py-3.5">5 modèles</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Modèles avancés</td>
                <td className="px-5 py-3.5">—</td>
                <td className="px-5 py-3.5">+7 modèles</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Multimédia</td>
                <td className="px-5 py-3.5">Limité</td>
                <td className="px-5 py-3.5">Images & vidéos selon crédits</td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 text-[var(--color-muted)]">Usage recommandé</td>
                <td className="px-5 py-3.5">Quotidien</td>
                <td className="px-5 py-3.5">Projets avancés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-center text-xl font-semibold text-[var(--color-ink)]">Questions fréquentes</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] open:shadow-sm"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-[var(--color-ink)] marker:content-none">
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
        Les crédits sont consommés selon le modèle et l'opération. Aucune promesse de requêtes illimitées.
      </p>
    </div>
  );
}
