/** Lecture env Google / Apple (server-only). */
export function readGoogleEnv() {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  return {
    enabled: Boolean(clientId && clientSecret),
    clientId: clientId ?? "",
    clientSecret: clientSecret ?? "",
  };
}

export function readAppleEnv() {
  const clientId = process.env.APPLE_CLIENT_ID?.trim();
  const clientSecret = process.env.APPLE_CLIENT_SECRET?.trim();
  const appBundleIdentifier = process.env.APPLE_APP_BUNDLE_IDENTIFIER?.trim();
  return {
    enabled: Boolean(clientId && clientSecret),
    clientId: clientId ?? "",
    clientSecret: clientSecret ?? "",
    appBundleIdentifier,
  };
}
