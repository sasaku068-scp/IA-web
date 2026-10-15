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

function ModelRow({ model }: { model: CatalogEntry }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-panel)] text-[var(--color-ink)]">
        <ProviderLogo providerKey={model.providerKey} className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[var(--color-ink)]">{model.name}</p>
        <p className="truncate text-xs text-[var(--color-muted)]">{model.provider}</p>
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
        "flex flex-col rounded-3xl border p-8",
        isPlus
          ? "border-[var(--color-primary)]/40 bg-[var(--color-surface)]"
          : "border-[var(--color-line)] bg-[var(--color-surface)]",
      )}
    >
      {isPlus && plan.badge ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
          {plan.badge}
        </p>
      ) : (
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Formule</p>
      )}

      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{plan.shortName}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{plan.tagline}</p>

      <div className="mt-8 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tabular-nums text-[var(--color-ink)]">
          {plan.price.toFixed(2).replace(".", ",")}&nbsp;€
        </span>
        <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
      </div>

      <p className="mt-3 text-sm text-[var(--color-muted)]">
        <span className="font-medium text-[var(--color-ink)]">{plan.credits} crédits</span> chaque mois
      </p>

      <div className="mt-8 border-t border-[var(--color-line)] pt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">Inclus</p>
        <div className="mt-2 divide-y divide-[var(--color-line)]">
          {featured.map((m) => (
            <ModelRow key={m.id} model={m} />
          ))}
        </div>

        {extra.length > 0 ? (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              {open ? "Masquer" : `+ ${extra.length} autres`} {isPlus ? "avancés" : ""}
            </button>
            {open ? (
              <div className="mt-1 divide-y divide-[var(--color-line)]">
                {extra.map((m) => (
                  <ModelRow key={m.id} model={m} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <ul className="mt-8 space-y-2.5">
        {plan.features.slice(0, 4).map((f) => (
          <li key={f} className="flex gap-2 text-sm text-[var(--color-muted)]">
            <span className="text-[var(--color-primary)]">·</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-10">
        <Link
          to="/login"
          className={cn(
            "flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition",
            isPlus
              ? "bg-[var(--color-primary)] text-[#0a0a0b] hover:bg-[var(--color-primary-600)]"
              : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/40",
          )}
        >
          {plan.cta}
        </Link>
        <p className="mt-3 text-center text-xs text-[var(--color-muted)]">Mensuel · annulable quand tu veux</p>
      </div>
    </article>
  );
}

const FAQ = [
  {
    q: "Quelle formule ?",
    a: "Essentiel pour un usage du quotidien. Plus quand tu as besoin de plus de crédits ou de modèles avancés.",
  },
  {
    q: "Les crédits ?",
    a: "Chaque action en consomme un peu. Une question simple coûte moins qu'une image ou une vidéo. Le solde ne passe pas sous zéro.",
  },
  {
    q: "Plus de crédits ?",
    a: "Tu attends le mois suivant, ou tu passes à Plus. Rien ne part si le solde ne suffit pas.",
  },
  {
    q: "Changer de formule ?",
    a: "Oui, depuis ton compte, selon le cycle en cours.",
  },
];

export function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium text-[var(--color-primary)]">Abonnements</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Deux formules. C'est tout.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          Pas de tableau compliqué. Tu vois le prix, les crédits, ce qui est inclus.
        </p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <PlanCard planId="essentiel" />
        <PlanCard planId="plus" />
      </div>

      <section className="mx-auto mt-20 max-w-lg">
        <h2 className="text-center text-lg font-semibold text-[var(--color-ink)]">Questions</h2>
        <div className="mt-6 space-y-2">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]"
            >
              <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-[var(--color-ink)] marker:content-none">
                <div className="flex items-center justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[var(--color-muted)] group-open:hidden">+</span>
                  <span className="hidden text-[var(--color-muted)] group-open:inline">−</span>
                </div>
              </summary>
              <p className="border-t border-[var(--color-line)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
