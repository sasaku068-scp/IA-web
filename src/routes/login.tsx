import { createFileRoute, Link } from "@tanstack/react-router";
import { SessionPanel, SessionSkeleton } from "@/components/auth/session-panel";
import { Shell } from "@/components/shell/shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useMounted } from "@/lib/use-mounted";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  const mounted = useMounted();

  return (
    <Shell>
      <div className="grid h-full place-items-center overflow-y-auto px-4 py-10">
        {!mounted || isPending ? (
          <SessionSkeleton />
        ) : user ? (
          <div className="page-enter w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Session</p>
            <h1 className="mt-2 text-2xl font-semibold text-[var(--color-ink)]">Session ouverte</h1>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {user.displayName ?? user.primaryEmail ?? "Compte connecté"}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[var(--color-primary-600)]"
              >
                Aller au chat
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-line)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)]/40"
              >
                Accueil
              </Link>
            </div>
          </div>
        ) : (
          <SessionPanel />
        )}
      </div>
    </Shell>
  );
}
