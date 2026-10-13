import type { ErrorComponentProps } from "@tanstack/react-router";
import { MosaicMark } from "@/components/brand/mark";

const FALLBACK_MESSAGE = "Une erreur inattendue s'est produite. Rechargez la page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-ink">
      <div className="w-full max-w-md border border-line bg-surface p-6">
        <MosaicMark />
        <h1 className="mt-4 font-display text-2xl leading-display">Une erreur est survenue</h1>
        <p className="mt-3 text-sm leading-relaxed break-words text-muted">{errorMessage(error)}</p>
      </div>
    </main>
  );
}
