import { Link } from "@tanstack/react-router";
import { LIVE_MODELS } from "@/lib/catalog";
import { PixelIcon, type PixelIconName } from "@/components/pixel/icons";
import { Panel, RetroLink, StatusBadge } from "@/components/ui/retro";

const DESK: { to: "/" | "/chat" | "/code" | "/images" | "/videos" | "/audio" | "/models"; label: string; icon: PixelIconName; note: string }[] = [
  { to: "/chat", label: "Chat IA", icon: "chat", note: "Grok 4.7" },
  { to: "/code", label: "Code", icon: "code", note: "Même modèle, mode code" },
  { to: "/images", label: "Images", icon: "image", note: "Imagine 2.0" },
  { to: "/videos", label: "Vidéos", icon: "video", note: "Premium · 6 s" },
  { to: "/audio", label: "Audio", icon: "audio", note: "Voix Grok" },
  { to: "/models", label: "Modèles", icon: "models", note: "Catalogue" },
];

const WORK = [
  {
    kicker: "CHAT",
    title: "Une lecture claire",
    text: "Grande zone blanche, séparations nettes, sélecteur de modèle et envoi explicite. Les réponses viennent du fournisseur connecté.",
  },
  {
    kicker: "IMAGES",
    title: "Le cadre, pas le filtre",
    text: "L'interface est pixel. Les images générées restent telles que le modèle les rend, assez grandes pour être jugées.",
  },
  {
    kicker: "CODE",
    title: "Un éditeur sobre",
    text: "Les extraits s'affichent en monospace, dans un bloc bordé, avec une action pour copier. Rien d'autre.",
  },
];

export function Landing() {
  return (
    <div className="page-enter h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-pixel text-micro text-muted">ESPACE UNIQUE</p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-display text-ink sm:text-5xl md:text-6xl">
              Toutes vos IA.
              <br />
              Un seul espace.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Chat, code, images et vidéos : retrouvez vos intelligences artificielles dans un espace unique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RetroLink to="/chat" tone="primary">
                Commencer gratuitement
              </RetroLink>
              <RetroLink to="/models">Explorer les modèles</RetroLink>
            </div>
          </div>
          <div className="md:col-span-5 md:mt-16">
            <Panel kicker="MOSAIUM.EXE" bodyClassName="p-0">
              <ul>
                {DESK.map((item) => (
                  <li key={item.to} className="border-b border-line last:border-b-0">
                    <Link to={item.to} className="flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-violet-soft">
                      <PixelIcon name={item.icon} />
                      <span className="font-sans text-sm font-medium text-ink">{item.label}</span>
                      <span className="ml-auto text-xs text-muted">{item.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>

        <section className="mt-16 md:mt-20">
          <p className="font-pixel text-micro text-muted">MODELES DISPONIBLES</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-display text-ink">
            Seulement ce qui est vraiment branché.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {LIVE_MODELS.map((model, index) => (
              <article
                key={model.id}
                className={index === 1 ? "border border-line bg-surface md:mt-6" : "border border-line bg-surface"}
              >
                <header className="flex items-center justify-between gap-3 border-b border-line bg-panel px-3 py-2">
                  <h3 className="font-display text-xl text-ink">{model.name}</h3>
                  <StatusBadge status={model.status} />
                </header>
                <div className="p-4">
                  <p className="text-xs tracking-wide text-muted uppercase">{model.provider} · {model.use}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{model.blurb}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-muted tabular-nums">
                      {model.cost} crédits
                    </span>
                    {model.href ? (
                      <Link to={model.href} className="font-sans text-sm text-violet underline-offset-2 hover:underline">
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
              className={index === 1 ? "border border-line bg-surface md:mt-8" : "border border-line bg-surface"}
            >
              <header className="flex items-center gap-2 border-b border-line px-3 py-2">
                <span className="size-2 bg-violet" aria-hidden />
                <h2 className="font-pixel text-micro text-ink">{item.kicker}</h2>
              </header>
              <div className="p-4">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </section>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
          GPT, Claude, Gemini et DeepSeek restent non configurés. Ils figurent dans le catalogue avec ce statut, sans
          réponse inventée.{" "}
          <Link to="/models" className="text-ink underline-offset-2 hover:underline">
            Voir le catalogue
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
