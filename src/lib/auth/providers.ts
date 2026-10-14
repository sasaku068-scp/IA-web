/**
 * Providers proposés à l'écran de connexion.
 *
 * - `mode: "oauth2"` → broker Grok (genericOAuth)
 * - `mode: "social"` → better-auth social natif (Google / Apple locaux)
 */
export type GrokProvider = {
  providerId: string;
  idp: string;
  label: string;
  mode: "oauth2" | "social";
};

export const GROK_PROVIDERS: readonly GrokProvider[] = [
  { providerId: "google", idp: "google", label: "Google", mode: "social" },
  { providerId: "apple", idp: "apple", label: "Apple", mode: "social" },
  { providerId: "grok-x", idp: "twitter", label: "X", mode: "oauth2" },
  { providerId: "grok-github", idp: "github", label: "GitHub", mode: "oauth2" },
  { providerId: "grok-microsoft", idp: "microsoft", label: "Microsoft", mode: "oauth2" },
];
