/** Logos fournisseurs pour le catalogue de modèles. */

export function ProviderLogo({
  providerKey,
  className = "h-6 w-6",
}: {
  providerKey?: string;
  className?: string;
}) {
  switch (providerKey) {
    case "openai":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.3 10.1c.1-.6.1-1.2 0-1.8-.1-.6-.3-1.1-.6-1.6-.6-1.1-1.5-2-2.7-2.5-.5-.2-1-.4-1.5-.4-.6-.1-1.2 0-1.8.1C15 2.5 13.6 1.7 12 1.7S9 2.5 8.3 3.9c-.6-.1-1.2-.2-1.8-.1-.5 0-1.1.2-1.5.4-1.2.5-2.1 1.4-2.7 2.5-.3.5-.5 1-.6 1.6-.1.6-.1 1.2 0 1.8C.6 11 0 12.4 0 14c0 1.6.6 3 1.7 4.1.5.5 1.1.9 1.8 1.1.6.2 1.2.2 1.8.1C6 21.5 7.4 22.3 9 22.3c.6 0 1.1-.1 1.6-.3.5-.2 1-.4 1.4-.7.4.3.9.5 1.4.7.5.2 1 .3 1.6.3 1.6 0 3-.8 4-2 .6.1 1.2.1 1.8-.1.7-.2 1.3-.6 1.8-1.1C23.4 17 24 15.6 24 14c0-1.6-.6-3-1.7-3.9zM12 19.5c-1.1 0-2.1-.3-3-.9.1-.1.2-.1.3-.2 1.1-.6 1.8-1.8 1.8-3.1V9.2c.3.1.6.3.9.4.9.5 1.9.5 2.8 0 .3-.1.6-.3.9-.4v6.1c0 2.3-1.7 4.2-3.7 4.2zm-6.5-2.9c-.5-.9-.5-1.9 0-2.8.1-.3.3-.6.5-.8l5.3 3.1c-.1.3-.3.6-.5.8-1.1.6-2.4.6-3.5 0-.7-.4-1.2-1-1.5-1.7.0-.1-.2-.4-.3-.6zm-.7-6.5c.5-.9 1.3-1.5 2.3-1.7.3-.1.6-.1.9 0v6.2c-.3.1-.6.3-.9.4-.9.5-1.9.5-2.8 0-.3-.1-.6-.3-.9-.4.1-1.5.7-2.9 1.4-4.5zm13.1 5.6c-.3.5-.7 1-1.2 1.3-1.1.6-2.4.6-3.5 0-.2-.1-.4-.3-.5-.4l5.3-3.1c.1.3.2.5.3.8.2.9.1 1.8-.4 2.6v-.2zm1.6-2.2-.1.1-5.3 3.1V9.2c.3-.1.6-.3.9-.4.9-.5 1.9-.5 2.8 0 .3.1.6.3.9.4-.1 1.5-.6 2.9-1.4 4.4.1.1.1.2.2.3zM8.9 6.8c-.1.1-.2.1-.3.2L3.3 10c-.5-.9-.5-1.9 0-2.8.3-.7.8-1.3 1.5-1.7 1.1-.6 2.4-.6 3.5 0 .2.1.4.3.6.5v.8zm6.2 0V6c.2-.2.4-.4.6-.5 1.1-.6 2.4-.6 3.5 0 .7.4 1.2 1 1.5 1.7.5.9.5 1.9 0 2.8l-5.3-3.1c-.1-.1-.2-.1-.3-.1z" />
        </svg>
      );
    case "anthropic":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.6 3h-3.2L4 21h3.1l1.3-3.6h7.2L16.9 21H20L13.6 3zm-3.8 11.4 2.6-7.2 2.6 7.2h-5.2z" />
        </svg>
      );
    case "google":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.3-.2-1.9H12z" />
          <path fill="#34A853" d="M5.3 14.3c-.3-.7-.5-1.5-.5-2.3s.2-1.6.5-2.3l-3.6-2.8C1.1 8.5.5 10.2.5 12s.6 3.5 1.7 4.9l3.1-2.6z" />
          <path fill="#FBBC05" d="M12 4.8c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.5 1.4 15 0 12 0 7.4 0 3.4 2.5 1.7 6.1l3.6 2.8C6.2 6.5 8.8 4.8 12 4.8z" />
          <path fill="#4285F4" d="M12 24c3 0 5.5-1 7.3-2.7l-3.1-2.4c-.9.6-2 .9-3.3.9-3.2 0-5.9-2.1-6.8-5l-3.6 2.8C4.4 21.5 7.9 24 12 24z" />
        </svg>
      );
    case "xai":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.2 2H21l-6.6 7.5L22 22h-6.2l-4.8-6.3L6 22H3.2l7-8L2 2h6.3l4.4 5.8L18.2 2zm-1.1 18h1.7L7 3.9H5.2L17.1 20z" />
        </svg>
      );
    case "deepseek":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "minimax":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 18V6h2.4l3.2 7.2L13 6H15.4v12h-2.1v-7.5L10.2 18H8.6L5.9 10.5V18H4zm12.5 0 3.2-12h2.3L18.6 18h-2.1z" />
        </svg>
      );
    case "bytedance":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 4h4v16H4V4zm6 4h4v12h-4V8zm6-2h4v14h-4V6z" />
        </svg>
      );
    default:
      return (
        <span className={`inline-flex items-center justify-center rounded-md bg-[var(--color-primary-soft)] text-[10px] font-bold text-[var(--color-primary)] ${className}`}>
          AI
        </span>
      );
  }
}

export function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}
