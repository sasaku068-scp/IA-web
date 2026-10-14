import { Link } from "@tanstack/react-router";
import { PixelIcon, type PixelIconName } from "@/components/pixel/icons";
import { Panel, RetroLink } from "@/components/ui/retro";

const DESK: { to: "/" | "/chat" | "/code" | "/images" | "/videos" | "/audio" | "/models" | "/pricing" | "/login"; label: string; icon: PixelIconName; note: string }[] = [
  { to: "/chat", label: "Chat IA", icon: "chat", note: "Conversation" },
  { to: "/code", label: "Code", icon: "code", note: "Dev" },
  { to: "/images", label: "Images", icon: "image", note: "Création" },
  { to: "/videos", label: "Vidéos", icon: "video", note: "Motion" },
  { to: "/audio", label: "Audio", icon: "audio", note: "Voix" },
  { to: "/models", label: "Modèles", icon: "models", note: "Catalogue" },
  { to: "/pricing", label: "Abonnements", icon: "credits", note: "Plans" },
];

export function Landing() {
  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Mosaium IA
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl">
              L'intelligence artificielle
              <br />
              à ton niveau.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
              Chat, code, images et vidéo dans un espace clair et professionnel. Choisis ton plan, utilise les modèles qui te conviennent, avance sans friction.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-600)]"
              >
                Voir les abonnements
              </Link>
              <Link
                to="/models"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/30"
              >
                Explorer les modèles
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 md:mt-8">
            <Panel kicker="ACCÈS RAPIDE" className="rounded-2xl card" bodyClassName="p-0">
              <ul>
                {DESK.map((item) => (
                  <li key={item.to} className="border-b border-[var(--color-line)] last:border-b-0">
                    <Link
                      to={item.to}
                      className="flex min-h-12 items-center gap-3 px-4 py-2.5 transition hover:bg-[var(--color-primary-soft)]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                        <PixelIcon name={item.icon} />
                      </div>
                      <span className="text-sm font-medium text-[var(--color-ink)]">{item.label}</span>
                      <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted)]">
                        {item.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
