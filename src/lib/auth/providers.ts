/**
 * Upstream identity providers the app offers for sign-in (via the broker).
 *
 * Keep this file minimal — the app shows sign-in buttons from this list, and
 * the broker/service must support each upstream. Adding an entry here only
 * exposes the button; the broker must be configured with the real secrets.
 */
export type GrokProvider = {
  /** This app's local provider id; also the callback path segment. */
  providerId: string;
  /** Upstream hint the broker forwards to (Better Auth social id). */
  idp: string;
  /** Human label for the sign-in button. */
  label: string;
};

export const GROK_PROVIDERS: readonly GrokProvider[] = [
  { providerId: "grok-google", idp: "google", label: "Google" },
  { providerId: "grok-x", idp: "twitter", label: "X" },
  { providerId: "grok-apple", idp: "apple", label: "Apple" },
  { providerId: "grok-github", idp: "github", label: "GitHub" },
  { providerId: "grok-microsoft", idp: "microsoft", label: "Microsoft" },
];
