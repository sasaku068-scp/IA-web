export const CHAT_MODEL = "grok-4.7";
export const IMAGE_MODEL = "grok-imagine-image-2.0";
export const VIDEO_MODEL = "grok-imagine-video-1.5";
export const STARTING_CREDITS = 120;

export const COSTS = {
  chat: 2,
  code: 2,
  image: 8,
  video: 24,
  audio: 4,
} as const;

export type ToolKind = keyof typeof COSTS;

export const VOICES = [
  { id: "eve", label: "Eve" },
  { id: "ara", label: "Ara" },
  { id: "leo", label: "Leo" },
  { id: "sal", label: "Sal" },
  { id: "luna", label: "Luna" },
  { id: "rex", label: "Rex" },
  { id: "carina", label: "Carina" },
  { id: "orion", label: "Orion" },
] as const;

export type VoiceId = (typeof VOICES)[number]["id"];

export function isVoice(value: string): value is VoiceId {
  return VOICES.some((voice) => voice.id === value);
}

export type ModelStatus = "disponible" | "premium" | "non-configure";

export type CatalogEntry = {
  id: string;
  name: string;
  provider: string;
  use: string;
  status: ModelStatus;
  blurb: string;
  cost: number | null;
  href: "/chat" | "/code" | "/images" | "/videos" | "/audio" | null;
};

export const LIVE_MODELS: CatalogEntry[] = [
  {
    id: CHAT_MODEL,
    name: "Grok 4.7",
    provider: "xAI",
    use: "Chat et code",
    status: "disponible",
    blurb: "Conversation, rédaction et code. C'est le seul modèle de texte réellement branché.",
    cost: COSTS.chat,
    href: "/chat",
  },
  {
    id: IMAGE_MODEL,
    name: "Imagine Image 2.0",
    provider: "xAI",
    use: "Images",
    status: "disponible",
    blurb: "Génération d'images à partir d'un prompt. Le résultat n'est pas retravaillé en pixel art.",
    cost: COSTS.image,
    href: "/images",
  },
  {
    id: VIDEO_MODEL,
    name: "Imagine Video 1.5",
    provider: "xAI",
    use: "Vidéos",
    status: "premium",
    blurb: "Clip de 6 secondes. Coût plus élevé, réservé aux demandes explicites.",
    cost: COSTS.video,
    href: "/videos",
  },
  {
    id: "grok-voice",
    name: "Voix Grok",
    provider: "xAI",
    use: "Audio",
    status: "disponible",
    blurb: "Synthèse vocale. Le texte est lu, pas réécrit par un autre modèle.",
    cost: COSTS.audio,
    href: "/audio",
  },
];

export const UNCONFIGURED_MODELS: CatalogEntry[] = [
  {
    id: "gpt",
    name: "GPT",
    provider: "OpenAI",
    use: "Chat",
    status: "non-configure",
    blurb: "Aucune clé OpenAI n'est configurée. Le modèle n'est pas simulé.",
    cost: null,
    href: null,
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    use: "Chat",
    status: "non-configure",
    blurb: "Aucune clé Anthropic n'est configurée. Le modèle n'est pas simulé.",
    cost: null,
    href: null,
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    use: "Chat",
    status: "non-configure",
    blurb: "Aucune clé Google n'est configurée. Le modèle n'est pas simulé.",
    cost: null,
    href: null,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    use: "Chat",
    status: "non-configure",
    blurb: "Aucune clé DeepSeek n'est configurée. Le modèle n'est pas simulé.",
    cost: null,
    href: null,
  },
];

export const STATUS_LABEL: Record<ModelStatus, string> = {
  disponible: "Disponible",
  premium: "Premium",
  "non-configure": "Non configuré",
};
