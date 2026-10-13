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
export type ProviderKey = "openai" | "anthropic" | "google" | "xai" | "deepseek" | "minimax" | "bytedance";

export type CatalogEntry = {
  id: string;
  name: string;
  provider: string;
  providerKey?: ProviderKey;
  use: string;
  status: ModelStatus;
  blurb: string;
  cost: number | null;
  href: "/chat" | "/code" | "/images" | "/videos" | "/audio" | "/pricing" | null;
};

export const PROVIDER_LABELS: Record<ProviderKey, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google Gemini",
  xai: "xAI",
  deepseek: "DeepSeek",
  minimax: "MiniMax",
  bytedance: "ByteDance",
};

export const PROVIDER_META: Record<ProviderKey, { label: string; accent: string; dark: string }> = {
  openai: { label: "OpenAI", accent: "#111111", dark: "#f3f4f6" },
  anthropic: { label: "Anthropic", accent: "#f97316", dark: "#fff7ed" },
  google: { label: "Google Gemini", accent: "#3b82f6", dark: "#eff6ff" },
  xai: { label: "xAI", accent: "#111111", dark: "#f5f5f5" },
  deepseek: { label: "DeepSeek", accent: "#2563eb", dark: "#dbeafe" },
  minimax: { label: "MiniMax", accent: "#7c3aed", dark: "#f3e8ff" },
  bytedance: { label: "ByteDance", accent: "#0f172a", dark: "#e2e8f0" },
};

export const LIVE_MODELS: CatalogEntry[] = [
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    provider: "OpenAI",
    providerKey: "openai",
    use: "Chat · Raisonnement · Code",
    status: "disponible",
    blurb: "Modèle économique pour les tâches courantes, le support quotidien et les demandes rapides.",
    cost: COSTS.chat,
    href: "/chat",
  },
  {
    id: "gpt-6-1-sol",
    name: "GPT-6.1 Sol",
    provider: "OpenAI",
    providerKey: "openai",
    use: "Chat · Code · Polyvalent",
    status: "disponible",
    blurb: "Le modèle principal de développement et de rédaction avec un bon équilibre entre vitesse et précision.",
    cost: COSTS.chat,
    href: "/code",
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    provider: "OpenAI",
    providerKey: "openai",
    use: "Premium · Analyse avancée",
    status: "premium",
    blurb: "Pour les tâches complexes, les analyses longues et les situations nécessitant une vraie profondeur.",
    cost: 3,
    href: "/pricing",
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    provider: "Anthropic",
    providerKey: "anthropic",
    use: "Rapide · Économie · Rédaction",
    status: "disponible",
    blurb: "Idéal pour les demandes rapides, le résumé, les idées et le traitement de contenu texte léger.",
    cost: COSTS.chat,
    href: "/chat",
  },
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    provider: "Anthropic",
    providerKey: "anthropic",
    use: "Code · Analyse · Travail quotidien",
    status: "disponible",
    blurb: "Modèle polyvalent pour l’écriture, le code et les tâches de production au quotidien.",
    cost: 3,
    href: "/code",
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "Anthropic",
    providerKey: "anthropic",
    use: "Premium · Analyse complexe",
    status: "premium",
    blurb: "Pour les sujets exigeants, les synthèses profondes et les décisions complexes.",
    cost: 5,
    href: "/pricing",
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    provider: "Google Gemini",
    providerKey: "google",
    use: "Chat · Multimodal · Analyse",
    status: "disponible",
    blurb: "Modèle principal polyvalent pour les conversations, les réponses multimodales et les analyses rapides.",
    cost: COSTS.chat,
    href: "/chat",
  },
  {
    id: "grok-4.7",
    name: "Grok 4.7",
    provider: "xAI",
    providerKey: "xai",
    use: "Chat · Raisonnement · Code",
    status: "disponible",
    blurb: "Le modèle de base du site, pensé pour la conversation, le raisonnement et les tâches courantes.",
    cost: COSTS.chat,
    href: "/chat",
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    providerKey: "deepseek",
    use: "Économie · Code · Analyse",
    status: "disponible",
    blurb: "Option rapide et économique pour le développement et les tâches longues de traitement de texte.",
    cost: 2,
    href: "/code",
  },
  {
    id: "nano-banana-2-1",
    name: "Nano Banana 2.1",
    provider: "Google Gemini",
    providerKey: "google",
    use: "Images · Retouche · Références",
    status: "disponible",
    blurb: "Le choix principal pour la génération d’images avec un bon équilibre qualité / vitesse.",
    cost: COSTS.image,
    href: "/images",
  },
  {
    id: "h3-max",
    name: "H3 Max",
    provider: "MiniMax",
    providerKey: "minimax",
    use: "Vidéo · Audio intégré",
    status: "premium",
    blurb: "Option vidéo à privilégier pour les premiers essais, avec un excellent compromis entrée / rendu.",
    cost: COSTS.video,
    href: "/videos",
  },
  {
    id: "veo-3-1",
    name: "Veo 3.1",
    provider: "Google",
    providerKey: "google",
    use: "Vidéo avancée",
    status: "premium",
    blurb: "Variation premium pour la génération vidéo avancée, à tester selon les budgets et le débit réel.",
    cost: COSTS.video,
    href: "/videos",
  },
];

export const UNCONFIGURED_MODELS: CatalogEntry[] = [
  {
    id: "gpt-5-3-codex",
    name: "GPT-5.3 Codex",
    provider: "OpenAI",
    providerKey: "openai",
    use: "Programmation · Développement",
    status: "non-configure",
    blurb: "Modèle orienté programmation et travail de développement, en attente de vérification API.",
    cost: null,
    href: null,
  },
  {
    id: "gemini-3-8-live",
    name: "Gemini 3.8 Live",
    provider: "Google Gemini",
    providerKey: "google",
    use: "Conversations vocales",
    status: "non-configure",
    blurb: "Conversation vocale en temps réel, à intégrer après validation des points d’accès et des coûts.",
    cost: null,
    href: null,
  },
  {
    id: "grok-imagine-image-2.0",
    name: "Grok Imagine Image 2.0",
    provider: "xAI",
    providerKey: "xai",
    use: "Images premium",
    status: "non-configure",
    blurb: "Alternative image premium à l’usage plus créatif et de retouche avancée.",
    cost: null,
    href: null,
  },
  {
    id: "seedance-2-5",
    name: "Seedance 2.5",
    provider: "ByteDance",
    providerKey: "bytedance",
    use: "Vidéo · Étude",
    status: "non-configure",
    blurb: "Candidat potentiel pour élargir le catalogue vidéo lorsque les crédits sont prêts.",
    cost: null,
    href: null,
  },
  {
    id: "nano-banana-pro",
    name: "Nano Banana Pro",
    provider: "Google Gemini",
    providerKey: "google",
    use: "Images premium",
    status: "non-configure",
    blurb: "Version premium pour les créations complexes et les résultats de qualité supérieure.",
    cost: null,
    href: null,
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "Anthropic",
    providerKey: "anthropic",
    use: "Premium · Analyse complexe",
    status: "non-configure",
    blurb: "Modèle premium réservé aux usages exigeants lorsque les accès API et les budgets sont validés.",
    cost: null,
    href: null,
  },
];

export const STATUS_LABEL: Record<ModelStatus, string> = {
  disponible: "Disponible",
  premium: "Premium",
  "non-configure": "Non configuré",
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "starter",
    name: "Essentiel",
    price: 4,
    period: "/ mois",
    description: "Pour tester le site et utiliser les modèles courants sans dépasser le budget.",
    highlight: false,
    features: ["Chat IA + code", "Images rapides", "Accès aux modèles économiques", "1 compte actif"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 8.99,
    period: "/ mois",
    description: "Pour les usages réguliers, les tâches avancées et les créations plus ambitieuses.",
    highlight: true,
    features: ["Tout le plan Essentiel", "Crédits premium", "Images et vidéo avancées", "Priorité d’accès"],
  },
] as const;

export const PROVIDER_ORDER: ProviderKey[] = ["openai", "anthropic", "google", "xai", "deepseek", "minimax", "bytedance"];
