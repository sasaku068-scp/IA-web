/**
 * Durcissement applicatif Mosaium IA
 * - rate limit mémoire (par IP / clé)
 * - validation / sanitization entrées
 * - headers de sécurité recommandés
 * - privacy: ne jamais logger le contenu des messages
 *
 * Note: anti-DDoS réel = CDN / WAF (Cloudflare, etc.) devant l'app.
 * Ceci protège l'app contre abus basiques, injections et fuite de contenu.
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000,
): { ok: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    b = { count: 0, resetAt: now + windowMs };
    buckets.set(key, b);
  }
  b.count += 1;
  const remaining = Math.max(0, limit - b.count);
  if (b.count > limit) {
    return { ok: false, remaining: 0, retryAfterMs: b.resetAt - now };
  }
  return { ok: true, remaining, retryAfterMs: 0 };
}

/** Supprime balises / caractères de contrôle — anti XSS basique côté app. */
export function sanitizeText(input: string, maxLen = 32_000): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, maxLen);
}

/** IDs alphanumériques sûrs (anti injection chemin / SQL param). */
export function isSafeId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{1,128}$/.test(id);
}

/**
 * Log technique sans contenu sensible.
 * Jamais de prompt, réponse, email, token.
 */
export function secureLog(event: string, meta?: Record<string, string | number | boolean>) {
  if (typeof console === "undefined") return;
  const safe = meta
    ? Object.fromEntries(
        Object.entries(meta).map(([k, v]) => {
          if (/prompt|message|body|token|secret|password|email|content/i.test(k)) {
            return [k, "[redacted]"];
          }
          return [k, v];
        }),
      )
    : undefined;
  console.info(`[mosaium] ${event}`, safe ?? "");
}

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  // CSP stricte ; ajuster si tu ajoutes des CDN
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};
