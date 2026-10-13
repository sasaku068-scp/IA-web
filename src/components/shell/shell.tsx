import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Wordmark } from "@/components/brand/mark";
import { PixelIcon } from "@/components/pixel/icons";
import { NAV, sectionLabel } from "@/components/shell/nav";
import { useAccountStore } from "@/lib/account-store";
import { getAccount, providerStatus } from "@/lib/mosaium.functions";
import { useMounted } from "@/lib/use-mounted";

function MenuBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const mounted = useMounted();
  const credits = useAccountStore((state) => state.credits);
  const section = sectionLabel(pathname);
  const sessionReady = mounted && !isPending;

  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface px-3">
      <Link to="/" aria-label="MOSAÏUM AI, accueil" className="shrink-0">
        <Wordmark />
      </Link>
      <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
      <span className="hidden font-pixel text-micro text-muted sm:inline">v1.0</span>
      <span className="hidden h-4 w-px bg-line md:block" aria-hidden />
      <span className="hidden font-pixel text-micro text-muted md:inline">FENETRE</span>
      <span className="truncate font-sans text-sm text-ink">{section}</span>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Link
          to="/credits"
          className="inline-flex min-h-9 items-center border border-line bg-cream px-2 font-sans text-xs font-medium text-ink tabular-nums"
        >
          {user && credits !== null ? `${credits} CR` : "CRÉDITS"}
        </Link>
        <div className="account-slot min-h-8">
          {!sessionReady ? (
            <div className="h-8 w-20 bg-panel" />
          ) : user ? (
            <UserButton />
          ) : (
            <Link to="/login" className="font-sans text-sm text-ink underline-offset-2 hover:underline">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function SideNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav
      aria-label="Sections"
      className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-panel px-2 py-2 md:w-56 md:flex-col md:overflow-y-auto md:border-r md:border-b-0 md:px-3 md:py-4"
    >
      {NAV.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className={active ? "nav-link is-active" : "nav-link"}
          >
            <span className="tick" aria-hidden />
            <PixelIcon name={item.icon} />
            <span className="font-sans text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function StatusBar() {
  const { user, isPending } = useCurrentUserState();
  const mounted = useMounted();
  const [configured, setConfigured] = useState<boolean | null>(null);
  useEffect(() => {
    let cancel = false;
    providerStatus()
      .then((status) => {
        if (!cancel) setConfigured(status.configured);
      })
      .catch(() => {
        if (!cancel) setConfigured(null);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const session = !mounted || isPending ? "Session…" : user ? "Session ouverte" : "Session requise";
  const provider =
    configured === null ? "Fournisseur…" : configured ? "xAI configuré" : "xAI non configuré";

  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 border-t border-line bg-panel px-3 text-xs text-muted">
      <span className="font-pixel text-micro text-ink">PRET</span>
      <span className="h-3 w-px bg-line" aria-hidden />
      <span>{session}</span>
      <span className="hidden sm:inline">{provider}</span>
      <span className="ml-auto hidden md:inline">Thème clair</span>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { user } = useCurrentUserState();
  const userId = user?.id ?? null;
  const setAccount = useAccountStore((state) => state.setAccount);
  const reset = useAccountStore((state) => state.reset);

  useEffect(() => {
    if (!userId) {
      reset();
      return;
    }
    let cancel = false;
    getAccount()
      .then((account) => {
        if (!cancel) setAccount(account);
      })
      .catch(() => {
        if (!cancel) reset();
      });
    return () => {
      cancel = true;
    };
  }, [userId, reset, setAccount]);

  return (
    <div className="flex h-dvh flex-col bg-cream text-ink">
      <MenuBar />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <SideNav />
        <main id="contenu" className="min-h-0 min-w-0 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
