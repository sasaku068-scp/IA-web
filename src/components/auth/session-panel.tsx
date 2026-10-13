import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Panel } from "@/components/ui/retro";

export function SessionPanel() {
  return (
    <Panel kicker="SESSION" className="mx-auto max-w-md rounded-[26px] shadow-soft">
      <h1 className="font-sans text-3xl font-semibold tracking-[-0.06em] text-ink">Connectez-vous</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Accédez à votre espace IA personnel, vos historiques, vos crédits et vos créations en un seul clic.
      </p>
      <div className="mt-5 grid gap-3">
        {GROK_PROVIDERS.map((provider) => (
          <button
            key={provider.providerId}
            type="button"
            className="retro-btn retro-btn-primary justify-between rounded-full"
            onClick={() =>
              signIn(provider.providerId, {
                callbackURL: `${window.location.pathname}${window.location.search}`,
              })
            }
          >
            <span>Continuer avec {provider.label}</span>
            <span aria-hidden>→</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export function SessionSkeleton() {
  return (
    <div className="mx-auto max-w-md rounded-[24px] border border-line bg-surface p-4 shadow-card" aria-hidden>
      <div className="h-3 w-28 rounded-full bg-panel" />
      <div className="mt-4 h-9 w-56 rounded-full bg-panel" />
      <div className="mt-3 h-18 w-full rounded-2xl bg-panel" />
      <div className="mt-5 h-12 w-full rounded-full bg-primary-soft" />
    </div>
  );
}
