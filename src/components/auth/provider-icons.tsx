/** Logos SVG officiels / reconnaissables pour les boutons de connexion. */

export function ProviderIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  switch (id) {
    case "google":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#EA4335"
            d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.3-.2-1.9H12z"
          />
          <path
            fill="#34A853"
            d="M5.3 14.3 4.4 15l-2.7 2.1C3.4 20.5 7.4 23 12 23c3 0 5.5-1 7.3-2.7l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.4-4z"
          />
          <path
            fill="#4A90E2"
            d="M5.3 9.7C5 10.4 4.8 11.2 4.8 12s.2 1.6.5 2.3c0 .1 3.5-2.7 3.5-2.7l-2.1-1.6-.4-.3z"
          />
          <path
            fill="#FBBC05"
            d="M12 4.8c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.5 1.4 15 0 12 0 7.4 0 3.4 2.5 1.7 6.1l3.6 2.8C6.2 6.5 8.8 4.8 12 4.8z"
          />
          <path fill="#4285F4" d="M5.3 9.7 12 14.7l3.5-2.7H12V10.2H5.5l-.2-.5z" opacity=".01" />
          <path
            fill="#4285F4"
            d="M12 10.2v3.9h5.9c-.3 1.5-1.2 2.6-2.4 3.3v.1l3.1 2.4C20.5 18.2 22 15.4 22 12c0-.7-.1-1.3-.2-1.9H12z"
          />
        </svg>
      );
    case "apple":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.4 12.3c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1 .0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.2-3.3zm-2-6.2c.6-.7 1-1.7.9-2.7-1 .1-2.1.6-2.7 1.4-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.7-1.3z" />
        </svg>
      );
    case "grok-x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.8-6.3L6 22H3.2l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
        </svg>
      );
    case "grok-github":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.6C22 6.6 17.5 2 12 2z" />
        </svg>
      );
    case "grok-microsoft":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
          <path fill="#00A4EF" d="M12.5 2H22v9.5h-9.5z" />
          <path fill="#7FBA00" d="M2 12.5h9.5V22H2z" />
          <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
        </svg>
      );
    default:
      return (
        <span className={`inline-flex items-center justify-center rounded bg-[var(--color-primary-soft)] text-xs font-bold text-[var(--color-primary)] ${className}`}>
          ?
        </span>
      );
  }
}
