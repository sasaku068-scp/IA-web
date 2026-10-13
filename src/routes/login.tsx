import { createFileRoute, Link } from "@tanstack/react-router";
import { SessionPanel, SessionSkeleton } from "@/components/auth/session-panel";
import { Shell } from "@/components/shell/shell";
import { Panel, RetroLink } from "@/components/ui/retro";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useMounted } from "@/lib/use-mounted";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const mounted = useMounted();
  return (
    <Shell>
      <div className="page-enter grid h-full place-items-center overflow-y-auto px-4 py-8">
        {!mounted || isPending ? (
          <SessionSkeleton />
        ) : user ? (
          <Panel kicker="SESSION" className="w-full max-w-md">
            <h1 className="font-display text-2xl text-ink">Session ouverte</h1>
            <p className="mt-2 text-sm text-muted">
              {user.displayName ?? user.primaryEmail ?? "Compte connecté"}.
            </p>
            <div className="mt-5">
              <RetroLink to="/chat" tone="primary">
                Aller au chat
              </RetroLink>
            </div>
            <p className="mt-4 text-sm">
              <Link to="/" className="text-ink underline-offset-2 hover:underline">
                Retour à l'accueil
              </Link>
            </p>
          </Panel>
        ) : (
          <SessionPanel />
        )}
      </div>
    </Shell>
  );
}
