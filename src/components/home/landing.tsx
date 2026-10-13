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

const WORK = [
  {
    kicker: "CALME",
    title: "Un espace apaisant",
    text: "Des surfaces claires, des marges généreuses et un rythme visuel plus doux pour rester concentré plus longtemps.",
  },
  {
    kicker: "PUISSANT",
    title: "Des outils sans friction",
    text: "Chat, code, image, audio et vidéo dans une même expérience, avec des actions nettes et un parcours fluide.",
  },
  {
    kicker: "CONFIANCE",
    title: "Des créations maîtrisées",
    text: "Chaque modèle est présenté clairement avec son rôle, son usage et son niveau d’accès pour éviter la confusion.",
  },
];

export function Landing() {
  return (
    <div className="page-enter h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">espace IA serein</p>
            <h1 className="mt-4 max-w-xl font-sans text-4xl leading-[1.02] tracking-[-0.06em] text-ink sm:text-5xl md:text-6xl">
              Un vrai studio intelligent,
              <br />
              pensé pour respirer.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Chat, code, images, vidéos et audio dans un seul espace clair, élégant et confortable à utiliser au quotidien.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RetroLink to="/login" tone="primary">
                Commencer gratuitement
              </RetroLink>
              <RetroLink to="/models">Explorer les modèles</RetroLink>
            </div>
          </div>

          <div className="md:col-span-5 md:mt-14">
            <Panel kicker="ACCÈS RAPIDE" className="rounded-[24px] shadow-soft" bodyClassName="p-0">
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

        <section className="mt-16 md:mt-20">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">modèles</p>
          <h2 className="mt-3 max-w-xl font-sans text-3xl leading-tight tracking-[-0.05em] text-ink">
            Un catalogue clair, sans bruit.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {LIVE_MODELS.map((model, index) => (
              <article
                key={model.id}
                className={index === 1 ? "rounded-[20px] border border-line bg-surface shadow-card md:mt-6" : "rounded-[20px] border border-line bg-surface shadow-card"}
              >
                <header className="flex items-center justify-between gap-3 border-b border-line bg-surface-strong px-3 py-3">
                  <h3 className="font-sans text-xl font-semibold tracking-[-0.04em] text-ink">{model.name}</h3>
                  <StatusBadge status={model.status} />
                </header>
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{model.provider} · {model.use}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{model.blurb}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-muted tabular-nums">{model.cost ?? "—"} crédits</span>
                    {model.href ? (
                      <Link to={model.href} className="font-sans text-sm font-medium text-primary underline-offset-2 hover:underline">
                        Ouvrir
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {WORK.map((item, index) => (
            <article
              key={item.kicker}
              className={index === 1 ? "rounded-[20px] border border-line bg-surface shadow-card md:mt-8" : "rounded-[20px] border border-line bg-surface shadow-card"}
            >
              <header className="flex items-center gap-2 border-b border-line px-3 py-2.5">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">{item.kicker}</h2>
              </header>
              <div className="p-4">
                <h3 className="font-sans text-2xl font-semibold tracking-[-0.05em] text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </section>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
          Chaque modèle est montré avec son propre rôle, son niveau d’accès et ses limites. Le site reste premium, lisible et pensé pour un usage quotidien. <Link to="/models" className="font-medium text-ink underline-offset-2 hover:underline">Voir le catalogue</Link>.
        </p>
      </div>
    </div>
  );
}
