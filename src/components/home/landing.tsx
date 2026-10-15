import { Link } from "@tanstack/react-router";

const QUICK = [
  { to: "/chat" as const, label: "Discuter", desc: "Pose une question, avance" },
  { to: "/code" as const, label: "Coder", desc: "Écrire et corriger" },
  { to: "/images" as const, label: "Créer des images", desc: "Visualiser une idée" },
  { to: "/videos" as const, label: "Vidéo", desc: "Courts formats" },
  { to: "/audio" as const, label: "Audio", desc: "Voix et sons" },
  { to: "/pricing" as const, label: "Abonnements", desc: "2 formules simples" },
];

export function Landing() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),transparent_60%)]"
      />

      <section className="relative mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-[var(--color-primary)]">Mosaium</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Un espace calme pour travailler
            <span className="block text-[var(--color-muted)]">avec des outils utiles.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--color-muted)]">
            Écrire, coder, imaginer. Sans bruit, sans promesse trop grande — juste ce dont tu as besoin, au moment où tu en as besoin.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[var(--color-primary-600)]"
            >
              Voir les formules
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-transparent px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/40"
            >
              Commencer
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-3xl gap-3 sm:grid-cols-2">
          {QUICK.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-5 text-left transition hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-panel)]"
            >
              <span className="block text-base font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)]">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-[var(--color-muted)]">{item.desc}</span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-md text-center text-sm text-[var(--color-muted)]">
          Deux abonnements, des crédits clairs. Tu choisis ce que tu utilises.
        </p>
      </section>
    </div>
  );
}
