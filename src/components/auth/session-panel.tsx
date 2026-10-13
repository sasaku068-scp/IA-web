import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Panel } from "@/components/ui/retro";

export function SessionPanel() {
  return (
    <Panel kicker="SESSION" className="mx-auto max-w-md">
      <h1 className="font-display text-2xl leading-display text-ink">Connexion requise</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Connectez-vous pour conserver vos conversations, vos générations et vos crédits. Google et X sont les accès
        disponibles.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {GROK_PROVIDERS.map((provider) => (
          <button
            key={provider.providerId}
            type="button"
            className="retro-btn retro-btn-primary"
            onClick={() =>
              signIn(provider.providerId, {
                callbackURL: `${window.location.pathname}${window.location.search}`,
              })
            }
          >
            Continuer avec {provider.label}
          </button>
        ))}
      </div>
    </Panel>
  );
}

export function SessionSkeleton() {
  return (
    <div className="mx-auto max-w-md border border-line bg-surface p-4" aria-hidden>
      <div className="h-3 w-24 bg-panel" />
      <div className="mt-4 h-8 w-56 bg-panel" />
      <div className="mt-3 h-16 w-full bg-panel" />
      <div className="mt-5 h-11 w-full bg-violet-soft" />
    </div>
  );
}
