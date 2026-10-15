# Déploiement Mosaium IA (hébergeur générique)

Pas lié à Netlify. Fonctionne sur tout hôte Node 22+ (VPS, Railway, Fly, Render, Docker…).

## Build

```bash
npm ci
npm run build
```

## Run production

Selon la sortie Vite / TanStack Start du projet :

```bash
npm run preview
# ou node serveur généré si SSR
```

## Variables d'environnement

Voir `.env.example`. Ne jamais committer les secrets.

- `VITE_AUTH_ENABLED=true`
- `BETTER_AUTH_URL=https://ton-domaine`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (optionnel)
- `BETTER_AUTH_SECRET` (aléatoire long en prod)

## Sécurité recommandée devant l'app

1. **CDN / WAF** (Cloudflare, Fastly…) — anti-DDoS réel
2. HTTPS uniquement
3. Headers déjà prévus dans `src/lib/security.ts` (à brancher sur le reverse-proxy ou middleware serveur)
4. Rate-limit au edge + `rateLimit()` applicatif
5. Secrets uniquement en env, jamais dans le bundle client

## Privacy chat

Voir `src/lib/privacy-chat.ts` : fil de conversation en sessionStorage éphémère, logs sans contenu.

## Google OAuth redirect

```
https://TON-DOMAINE/api/auth/callback/google
```
