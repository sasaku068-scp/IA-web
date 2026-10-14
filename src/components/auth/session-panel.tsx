import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { ProviderIcon } from "@/components/auth/provider-icons";

export function SessionPanel() {
  return (
    <div className="page-enter mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
        <div className="border-b border-[var(--color-line)] bg-[var(--color-panel)] px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-bold text-[#0a0a0b]">
              M
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Mosaium IA
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Connexion</h1>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Accède à ton espace, tes crédits et tes créations.
          </p>
        </div>

        <div className="space-y-3 p-6">
          {GROK_PROVIDERS.map((provider, i) => (
            <button
              key={provider.providerId}
              type="button"
              className="provider-btn group relative flex h-14 w-full items-center overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              style={{ animationDelay: `${0.06 * i}s` }}
              onClick={() =>
                void signIn(provider.providerId, {
                  callbackURL: `${window.location.pathname}${window.location.search}`,
                })
              }
            >
              {/* logo */}
              <span className="provider-logo relative z-10 flex h-14 w-14 shrink-0 items-center justify-center transition-all duration-300 ease-out group-hover:scale-[1.35] group-hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.35)]">
                <ProviderIcon id={provider.providerId} className="h-6 w-6" />
              </span>

              {/* text — disparaît au hover */}
              <span className="provider-label relative z-10 flex-1 pr-4 text-left text-sm font-medium text-[var(--color-ink)] transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-0">
                Se connecter avec {provider.label}
              </span>

              {/* flèche discrète */}
              <span
                aria-hidden
                className="absolute right-4 text-[var(--color-muted)] opacity-40 transition-all duration-300 group-hover:opacity-0"
              >
                →
              </span>

              {/* glow fond au hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-primary-soft)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </button>
          ))}
        </div>

        <p className="border-t border-[var(--color-line)] px-6 py-4 text-center text-xs text-[var(--color-muted)]">
          En continuant, tu acceptes les conditions d'utilisation de Mosaium IA.
        </p>
      </div>
    </div>
  );
}

export function SessionSkeleton() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]" aria-hidden>
      <div className="h-10 w-10 rounded-xl bg-[var(--color-panel)]" />
      <div className="mt-4 h-6 w-40 rounded-full bg-[var(--color-panel)]" />
      <div className="mt-2 h-4 w-full rounded-full bg-[var(--color-panel)]" />
      <div className="mt-6 space-y-3">
        <div className="h-14 w-full rounded-xl bg-[var(--color-panel)]" />
        <div className="h-14 w-full rounded-xl bg-[var(--color-panel)]" />
        <div className="h-14 w-full rounded-xl bg-[var(--color-panel)]" />
      </div>
    </div>
  );
}
