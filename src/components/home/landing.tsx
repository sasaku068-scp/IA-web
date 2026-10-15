import { Link } from "@tanstack/react-router";
import { ProviderLogo } from "@/components/brand/model-logos";
import { LIVE_MODELS } from "@/lib/catalog";

const QUICK = [
  { to: "/chat" as const, label: "Chat IA", desc: "Conversation intelligente", icon: "💬" },
  { to: "/code" as const, label: "Code", desc: "Dev & debug", icon: "</>" },
  { to: "/images" as const, label: "Images", desc: "Génération visuelle", icon: "◈" },
  { to: "/videos" as const, label: "Vidéos", desc: "Motion & clips", icon: "▶" },
  { to: "/audio" as const, label: "Audio", desc: "Voix & son", icon: "♪" },
  { to: "/models" as const, label: "Modèles", desc: "Catalogue complet", icon: "◆" },
];

const SHOWCASE = LIVE_MODELS.filter((m) =>
  ["gpt-6-luna", "claude-sonnet-5-5", "gemini-3-8-flash", "grok-4.7"].includes(m.id),
);

export function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.1),transparent_70%)] blur-2xl"
      />

      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="fade-up lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/80 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Mosaium IA · Plateforme multi-modèles
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
              L'intelligence artificielle
              <span className="mt-1 block bg-gradient-to-r from-[var(--color-primary)] via-[#fb923c] to-[#fdba74] bg-clip-text text-transparent">
                à ton niveau.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              Chat, code, images et vidéo. OpenAI, Claude, Gemini, Grok et plus — un seul espace, des crédits clairs, zéro friction.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/pricing" className="btn btn--primary px-6 text-sm">
                Voir les abonnements
                <span aria-hidden>→</span>
              </Link>
              <Link to="/models" className="btn btn--secondary px-6 text-sm">
                Explorer les modèles
              </Link>
            </div>

            {/* trusted providers */}
            <div className="mt-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Fournisseurs intégrés
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                {(["openai", "anthropic", "google", "xai", "deepseek"] as const).map((key) => (
                  <div
                    key={key}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                    title={key}
                  >
                    <ProviderLogo providerKey={key} className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right panel — quick access grand */}
          <div className="fade-up fade-up-delay-2 lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)]/90 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent" />
              <div className="border-b border-[var(--color-line)] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">Accès rapide</p>
                <p className="mt-0.5 text-sm text-[var(--color-ink)]">Tout l'espace en un clic</p>
              </div>
              <ul className="p-2">
                {QUICK.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-[var(--color-primary-soft)]"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] text-sm font-semibold text-[var(--color-primary)] transition group-hover:border-[var(--color-primary)]/40 group-hover:bg-[var(--color-surface)]">
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[var(--color-ink)]">{item.label}</span>
                        <span className="block text-xs text-[var(--color-muted)]">{item.desc}</span>
                      </span>
                      <span className="text-[var(--color-muted)] opacity-0 transition group-hover:opacity-100">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[var(--color-line)] p-3">
                <Link
                  to="/pricing"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[var(--color-primary-600)]"
                >
                  Abonnements Essentiel & Plus
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* model showcase strip */}
        <div className="fade-up fade-up-delay-3 mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">Catalogue</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-ink)]">Modèles phares</h2>
            </div>
            <Link to="/models" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
              Tout voir →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHOWCASE.map((m) => (
              <Link
                key={m.id}
                to={m.href ?? "/models"}
                className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/35 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-panel)] text-[var(--color-ink)]">
                    <ProviderLogo providerKey={m.providerKey} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{m.name}</p>
                    <p className="truncate text-xs text-[var(--color-muted)]">{m.provider}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted)]">{m.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
