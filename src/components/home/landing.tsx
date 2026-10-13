import { Link } from "@tanstack/react-router";
import { LIVE_MODELS } from "@/lib/catalog";
import { PixelIcon, type PixelIconName } from "@/components/pixel/icons";
import { Panel, RetroLink, StatusBadge } from "@/components/ui/retro";

const DESK: { to: "/" | "/chat" | "/code" | "/images" | "/videos" | "/audio" | "/models" | "/login"; label: string; icon: PixelIconName; note: string }[] = [
  { to: "/chat", label: "Chat IA", icon: "chat", note: "SASAKU" },
  { to: "/code", label: "Code", icon: "code", note: "Dev" },
  { to: "/images", label: "Images", icon: "image", note: "Création" },
  { to: "/videos", label: "Vidéos", icon: "video", note: "Motion" },
  { to: "/audio", label: "Audio", icon: "audio", note: "Voix" },
  { to: "/models", label: "Modèles", icon: "models", note: "Catalogue" },
];

export function Landing() {
  return (
    <div className="hero">
      <div className="hero-inner centered-hero">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">espace IA serein</p>
            <h1 className="mt-4 max-w-xl font-sans text-4xl leading-[1.02] tracking-[-0.06em] text-ink sm:text-5xl md:text-6xl">
              Un studio fluide,
              <br />
              pensé pour le confort.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Chat, code, images et audio dans un espace élégant à l’ambiance apaisante — fond animé, interactions douces et navigation claire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RetroLink to="/login" tone="primary">Commencer gratuitement</RetroLink>
              <RetroLink to="/models">Explorer les modèles</RetroLink>
            </div>
          </div>

          <div className="md:col-span-5 md:mt-14">
            <Panel kicker="ACCÈS RAPIDE" className="rounded-[20px] card" bodyClassName="p-0">
              <ul>
                {DESK.map((item) => (
                  <li key={item.to} className="border-b border-line last:border-b-0">
                    <Link to={item.to} className="flex min-h-12 items-center gap-3 px-4 py-2.5 transition hover:bg-primary-soft">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <PixelIcon name={item.icon} />
                      </div>
                      <span className="font-sans text-sm font-medium text-ink">{item.label}</span>
                      <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.16em] text-muted">{item.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>

      {/* Animated waves SVG */}
      <svg className="waves" viewBox="0 0 1600 200" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#e8f2ff" />
            <stop offset="100%" stopColor="#f8fbff" />
          </linearGradient>
        </defs>
        <g className="wave-1 swell" transform="translate(0,0)">
          <path className="wave-path" d="M0,80 C200,120 400,40 800,80 C1200,120 1400,80 1600,100 L1600 200 L0 200 Z" fill="url(#g1)" />
        </g>
        <g className="wave-2" transform="translate(0,6)">
          <path className="wave-path" d="M0,90 C250,60 450,140 800,100 C1150,60 1400,110 1600,90 L1600 200 L0 200 Z" fill="#e1eeff" opacity="0.9" />
        </g>
        <g className="wave-3" transform="translate(0,12)">
          <path className="wave-path" d="M0,110 C300,150 500,70 800,110 C1100,150 1300,90 1600,110 L1600 200 L0 200 Z" fill="#cfe0ff" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
