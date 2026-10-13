import { useEffect, useState, type FormEvent } from "react";
import { COSTS, IMAGE_MODEL, VIDEO_MODEL, VOICES } from "@/lib/catalog";
import { useAccountStore } from "@/lib/account-store";
import {
  generateAudio,
  generateImage,
  generateVideo,
  getAccount,
  getGeneration,
  listGenerations,
  pollVideo,
  removeGeneration,
} from "@/lib/mosaium.functions";
import type { Generation } from "@/lib/types";
import { formatWhen, isHttpsUrl } from "@/lib/text";
import { rememberCredits } from "@/components/media/use-credits";
import {
  FieldLabel,
  Notice,
  PageHeader,
  PixelWait,
  RetroButton,
  ScrollPage,
  SelectInput,
  TextArea,
} from "@/components/ui/retro";

function statusLabel(status: string) {
  if (status === "done") return "Terminé";
  if (status === "pending") return "En cours";
  if (status === "error") return "Échec";
  return status;
}

export function ImageStudio() {
  const credits = useAccountStore((state) => state.credits);
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<Generation[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    listGenerations({ data: "image" })
      .then((rows) => {
        if (!cancel) setItems(rows);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim() || pending) return;
    setPending(true);
    setError(null);
    try {
      const result = await generateImage({ data: { prompt } });
      rememberCredits(result.credits);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setItems((current) => [result.generation, ...current]);
      setPrompt("");
    } catch {
      setError("La génération n'a pas abouti.");
    } finally {
      setPending(false);
    }
  }

  return (
    <ScrollPage>
      <PageHeader
        kicker="IMAGES"
        title="Générer une image"
        lede="Le prompt part vers Imagine Image 2.0. L'aperçu reste en définition normale : le pixel art concerne l'interface, pas le résultat."
      />
      <div className="grid items-start gap-4 lg:grid-cols-12">
        <form onSubmit={(event) => void onSubmit(event)} className="border border-line bg-surface lg:col-span-4">
          <div className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">PROMPT</div>
          <div className="space-y-3 p-4">
            <label>
              <FieldLabel>Description</FieldLabel>
              <TextArea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Un objet, un lieu, une lumière." />
            </label>
            <p className="text-xs text-muted tabular-nums">
              {IMAGE_MODEL} · {COSTS.image} crédits · solde {credits ?? "—"}
            </p>
            {error ? <Notice>{error}</Notice> : null}
            {pending ? <PixelWait label="Génération" /> : null}
            <RetroButton type="submit" tone="primary" disabled={pending || prompt.trim().length === 0}>
              Générer
            </RetroButton>
          </div>
        </form>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Les images générées apparaîtront ici, à taille réelle.</p>
          ) : (
            items.map((item) => (
              <figure key={item.id} className="media-frame border border-line bg-surface">
                {isHttpsUrl(item.resultUrl) ? (
                  <img src={item.resultUrl} alt={item.prompt} className="max-h-[480px] w-full bg-panel object-contain" />
                ) : (
                  <div className="grid h-40 place-items-center bg-panel text-sm text-muted">{statusLabel(item.status)}</div>
                )}
                <figcaption className="border-t border-line p-3">
                  <p className="line-clamp-3 text-sm text-ink">{item.prompt}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span className="tabular-nums">{formatWhen(item.createdAt)}</span>
                    <button type="button" className="hover:text-ink" onClick={() => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id)))}>
                      Retirer
                    </button>
                  </div>
                </figcaption>
              </figure>
            ))
          )}
        </div>
      </div>
    </ScrollPage>
  );
}

export function VideoStudio() {
  const credits = useAccountStore((state) => state.credits);
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<Generation[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    listGenerations({ data: "video" })
      .then((rows) => {
        if (!cancel) setItems(rows);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  const pendingId = items.find((item) => item.status === "pending")?.id ?? null;

  useEffect(() => {
    if (!pendingId) return;
    let cancel = false;
    let timer = 0;
    let tries = 0;
    const tick = async () => {
      tries += 1;
      try {
        const next = await pollVideo({ data: pendingId });
        if (cancel) return;
        setItems((current) => current.map((item) => (item.id === next.id ? { ...item, status: next.status, resultUrl: next.resultUrl } : item)));
        if (next.status === "done" || next.status === "error") {
          const account = await getAccount();
          useAccountStore.getState().setAccount(account);
        }
        if (next.status === "pending" && tries < 40) timer = window.setTimeout(() => void tick(), 3000);
      } catch {
        if (!cancel && tries < 40) timer = window.setTimeout(() => void tick(), 4000);
      }
    };
    timer = window.setTimeout(() => void tick(), 2000);
    return () => {
      cancel = true;
      window.clearTimeout(timer);
    };
  }, [pendingId]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim() || pending) return;
    setPending(true);
    setError(null);
    try {
      const result = await generateVideo({ data: { prompt } });
      rememberCredits(result.credits);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setItems((current) => [result.generation, ...current]);
      setPrompt("");
    } catch {
      setError("La génération n'a pas abouti.");
    } finally {
      setPending(false);
    }
  }

  return (
    <ScrollPage>
      <PageHeader
        kicker="VIDEO"
        title="Générer une vidéo"
        lede="Imagine Video 1.5 produit un clip de 6 secondes. Le suivi reste visible jusqu'à la fin, ou jusqu'à l'échec — auquel cas les crédits sont rendus."
      />
      <div className="grid items-start gap-4 lg:grid-cols-12">
        <form onSubmit={(event) => void onSubmit(event)} className="border border-line bg-surface lg:col-span-4">
          <div className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">PROMPT</div>
          <div className="space-y-3 p-4">
            <label>
              <FieldLabel>Description</FieldLabel>
              <TextArea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Un mouvement, un lieu, une durée implicite de 6 secondes." />
            </label>
            <p className="text-xs text-muted tabular-nums">
              {VIDEO_MODEL} · Premium · {COSTS.video} crédits · solde {credits ?? "—"}
            </p>
            {error ? <Notice>{error}</Notice> : null}
            {pending ? <PixelWait label="Ouverture" /> : null}
            <RetroButton type="submit" tone="primary" disabled={pending || prompt.trim().length === 0}>
              Générer
            </RetroButton>
          </div>
        </form>
        <div className="grid gap-4 lg:col-span-8">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Les clips apparaîtront ici, avec leur lecteur.</p>
          ) : (
            items.map((item) => (
              <figure key={item.id} className="media-frame border border-line bg-surface">
                {isHttpsUrl(item.resultUrl) ? (
                  <video src={item.resultUrl} controls className="max-h-[520px] w-full bg-panel" />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-panel">
                    {item.status === "pending" ? <PixelWait label="Rendu en cours" /> : <span className="text-sm text-muted">{statusLabel(item.status)}</span>}
                  </div>
                )}
                <figcaption className="border-t border-line p-3">
                  <p className="text-sm text-ink">{item.prompt}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>{statusLabel(item.status)} · {formatWhen(item.createdAt)}</span>
                    <button type="button" className="hover:text-ink" onClick={() => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id)))}>
                      Retirer
                    </button>
                  </div>
                </figcaption>
              </figure>
            ))
          )}
        </div>
      </div>
    </ScrollPage>
  );
}

export function AudioStudio() {
  const credits = useAccountStore((state) => state.credits);
  const preferredVoice = useAccountStore((state) => state.preferredVoice);
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(preferredVoice);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [items, setItems] = useState<Generation[]>([]);
  const [clip, setClip] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (VOICES.some((item) => item.id === preferredVoice)) setVoice(preferredVoice);
  }, [preferredVoice]);

  useEffect(() => {
    let cancel = false;
    listGenerations({ data: "audio" })
      .then((rows) => {
        if (!cancel) setItems(rows);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim() || pending) return;
    setPending(true);
    setError(null);
    try {
      const result = await generateAudio({ data: { text, voice, language } });
      rememberCredits(result.credits);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setItems((current) => [result.generation, ...current]);
      setClip(result.generation.resultText);
      setText("");
    } catch {
      setError("La lecture n'a pas pu être préparée.");
    } finally {
      setPending(false);
    }
  }

  async function play(id: string) {
    const detail = await getGeneration({ data: id });
    setClip(detail?.resultText ?? null);
  }

  return (
    <ScrollPage>
      <PageHeader
        kicker="AUDIO"
        title="Lire un texte"
        lede="La voix Grok prononce exactement le texte saisi. 400 caractères maximum, pour garder l'appel court."
      />
      <div className="grid items-start gap-4 lg:grid-cols-12">
        <form onSubmit={(event) => void onSubmit(event)} className="border border-line bg-surface lg:col-span-5">
          <div className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">TEXTE</div>
          <div className="space-y-3 p-4">
            <label>
              <FieldLabel>À lire</FieldLabel>
              <TextArea value={text} maxLength={400} onChange={(event) => setText(event.target.value)} placeholder="Une phrase nette, sans mise en forme." />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label>
                <FieldLabel>Voix</FieldLabel>
                <SelectInput value={voice} onChange={(event) => setVoice(event.target.value)} aria-label="Voix">
                  {VOICES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </SelectInput>
              </label>
              <label>
                <FieldLabel>Langue</FieldLabel>
                <SelectInput value={language} onChange={(event) => setLanguage(event.target.value === "en" ? "en" : "fr")} aria-label="Langue">
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </SelectInput>
              </label>
            </div>
            <p className="text-xs text-muted tabular-nums">
              {text.trim().length}/400 · {COSTS.audio} crédits · solde {credits ?? "—"}
            </p>
            {error ? <Notice>{error}</Notice> : null}
            {pending ? <PixelWait label="Synthèse" /> : null}
            {clip ? <audio controls src={`data:audio/mpeg;base64,${clip}`} className="w-full" /> : null}
            <RetroButton type="submit" tone="primary" disabled={pending || text.trim().length === 0}>
              Lire
            </RetroButton>
          </div>
        </form>
        <ul className="border border-line bg-surface lg:col-span-7">
          <li className="border-b border-line bg-panel px-3 py-2 font-pixel text-micro text-ink">PISTES</li>
          {items.length === 0 ? (
            <li className="p-4 text-sm text-muted">Aucune lecture pour le moment.</li>
          ) : (
            items.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-3 border-b border-line px-4 py-3 last:border-b-0">
                <div>
                  <p className="text-sm text-ink">{item.prompt}</p>
                  <p className="mt-1 text-xs text-muted">
                    {item.model} · {formatWhen(item.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-3 text-xs">
                  <button type="button" className="text-ink underline-offset-2 hover:underline" onClick={() => void play(item.id)}>
                    Écouter
                  </button>
                  <button
                    type="button"
                    className="text-muted hover:text-ink"
                    onClick={() => void removeGeneration({ data: item.id }).then(() => setItems((current) => current.filter((row) => row.id !== item.id)))}
                  >
                    Retirer
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </ScrollPage>
  );
}
