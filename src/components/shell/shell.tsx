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
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { PixelReveal } from "@/components/ui/pixel-reveal";

function MenuBar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const mounted = useMounted();
  const credits = useAccountStore((state) => state.credits);
  const section = sectionLabel(pathname);
  const sessionReady = mounted && !isPending;
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("saku-theme") === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("saku-theme", theme);
  }, [theme]);

  return (
    <header className="relative z-20 flex h-12 shrink-0 items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)]/85 px-3 backdrop-blur-sm">
      <Link to="/" aria-label="Mosaium IA, accueil" className="shrink-0">
        <Wordmark />
      </Link>
      <span className="hidden h-4 w-px bg-[var(--color-line)] sm:block" aria-hidden />
      <span className="hidden font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)] sm:inline">v1.3</span>
      <span className="hidden h-4 w-px bg-[var(--color-line)] md:block" aria-hidden />
      <span className="hidden font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)] md:inline">espace</span>
      <span className="truncate font-sans text-sm text-[var(--color-ink)]">{section}</span>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          className="inline-flex min-h-9 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]"
        >
          {theme === "dark" ? "Clair" : "Sombre"}
        </button>
        <Link
          to="/credits"
          className="inline-flex min-h-9 items-center rounded-full border border-[var(--color-line)] bg-[var(--color-primary-soft)] px-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]"
        >
          {user && credits !== null ? `${credits} CR` : "Crédits"}
        </Link>
        <div className="account-slot min-h-8">
          {!sessionReady ? (
            <div className="h-8 w-20 rounded-full bg-[var(--color-panel)]" />
          ) : user ? (
            <UserButton />
          ) : (
            <Link to="/login" className="font-sans text-sm text-[var(--color-ink)] underline-offset-2 hover:underline">
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
      className="relative z-20 flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--color-line)] bg-[var(--color-panel)]/90 px-2 py-2 md:w-60 md:flex-col md:overflow-y-auto md:border-r md:border-b-0 md:px-3 md:py-4"
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
  const provider = configured === null ? "Fournisseur…" : configured ? "Connecteur actif" : "Connecteur inactif";

  return (
    <footer className="relative z-20 flex h-7 shrink-0 items-center gap-3 border-t border-[var(--color-line)] bg-[var(--color-panel)]/90 px-3 text-xs text-[var(--color-muted)]">
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]">prêt</span>
      <span className="h-3 w-px bg-[var(--color-line)]" aria-hidden />
      <span>{session}</span>
      <span className="hidden sm:inline">{provider}</span>
      <span className="ml-auto hidden md:inline">Mosaium IA</span>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { user } = useCurrentUserState();
  const userId = user?.id ?? null;
  const setAccount = useAccountStore((state) => state.setAccount);
  const reset = useAccountStore((state) => state.reset);
  const [revealDone, setRevealDone] = useState(false);

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
    <div className="relative flex h-dvh flex-col bg-[var(--color-bg)] text-[var(--color-ink)]">
      {!revealDone && (
        <PixelReveal
          cols={28}
          rows={18}
          duration={1.15}
          onComplete={() => setRevealDone(true)}
        />
      )}
      <InteractiveGrid cellSize={26} gap={2} />
      <MenuBar />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row">
        <SideNav />
        <main id="contenu" className="min-h-0 min-w-0 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
