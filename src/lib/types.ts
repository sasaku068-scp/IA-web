export type Conversation = {
  id: string;
  title: string;
  model: string;
  kind: "chat" | "code";
  updatedAt: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  model: string | null;
  createdAt: string;
};

export type Generation = {
  id: string;
  kind: "image" | "video" | "audio";
  model: string;
  prompt: string;
  status: string;
  resultUrl: string | null;
  creditCost: number;
  createdAt: string;
  hasAudio: boolean;
};

export type GenerationDetail = Generation & {
  resultText: string | null;
};

export type LedgerEntry = {
  id: string;
  delta: number;
  reason: string;
  createdAt: string;
};

export type AccountSnapshot = {
  credits: number;
  preferredModel: string;
  preferredVoice: string;
};

export type HistoryPayload = {
  conversations: Conversation[];
  generations: Generation[];
};
