/**
 * Privacy conversation — côté client
 * - les messages ne sont pas écrits dans localStorage en clair par défaut
 * - sessionStorage optionnel, effacé à la fermeture d'onglet
 * - jamais de tracking tiers sur le contenu
 *
 * "Invisible / non traçable" côté app = pas de logs contenu + stockage éphémère.
 * Un serveur légitime peut toujours voir le trafic HTTPS s'il proxy les appels API ;
 * pour du E2E réel il faudra chiffrer avant envoi (à brancher avec les API plus tard).
 */

const EPHEMERAL_KEY = "mosaium.chat.ephemeral";

export type PrivateMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: number;
};

export function loadEphemeralThread(): PrivateMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(EPHEMERAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PrivateMessage[];
    return Array.isArray(parsed) ? parsed.slice(-80) : [];
  } catch {
    return [];
  }
}

export function saveEphemeralThread(messages: PrivateMessage[]) {
  if (typeof window === "undefined") return;
  try {
    // session only — disparaît à la fermeture de l'onglet
    sessionStorage.setItem(EPHEMERAL_KEY, JSON.stringify(messages.slice(-80)));
  } catch {
    /* quota / private mode */
  }
}

export function clearEphemeralThread() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(EPHEMERAL_KEY);
  } catch {
    /* ignore */
  }
}

/** Empêche les extensions / console d'afficher facilement le payload dans nos wrappers. */
export function redactForDebug(value: unknown): unknown {
  if (typeof value === "string") return value.length > 0 ? `[${value.length} chars]` : "";
  if (Array.isArray(value)) return value.map(redactForDebug);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (/prompt|message|content|text|body/i.test(k)) out[k] = "[redacted]";
      else out[k] = redactForDebug(v);
    }
    return out;
  }
  return value;
}
