import { useLocation } from "@tanstack/react-router";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { NAV, sectionLabel } from "./nav";
import { Link } from "@tanstack/react-router";
import { PixelIcon } from "@/components/pixel/icons";
import { cn } from "@/lib/cn";

export function Shell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const current = sectionLabel(location.pathname);

  return (
    <div className="relative min-h-screen">
      <InteractiveGrid cellSize={26} gap={2} />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-[var(--color-ink)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-primary)] text-xs font-bold text-[#0a0a0b]">
                M
              </span>
              <span>Mosaium IA</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV.filter((item) =>
                ["/", "/chat", "/models", "/pricing", "/credits"].includes(item.to),
              ).map((item) => {
                const active =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                      active
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              to="/login"
              className="rounded-lg bg-[var(--color-primary)] px-3.5 py-1.5 text-sm font-semibold text-[#0a0a0b] transition hover:bg-[var(--color-primary-600)]"
            >
              Se connecter
            </Link>
          </div>
        </header>

        {/* Mobile section title */}
        <div className="border-b border-[var(--color-line)] px-4 py-2 md:hidden">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">{current}</p>
        </div>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[var(--color-line)] py-6 text-center text-xs text-[var(--color-muted)]">
          Mosaium IA · Abonnements clairs · Crédits transparents
        </footer>
      </div>
    </div>
  );
}
