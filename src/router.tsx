import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { MosaicMark } from "@/components/brand/mark";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-ink">
      <div className="w-full max-w-md border border-line bg-surface p-6">
        <MosaicMark />
        <p className="mt-4 font-pixel text-micro text-muted">404</p>
        <h1 className="mt-3 font-display text-3xl leading-display">Cette page n'existe pas.</h1>
        <a href="/" className="retro-btn retro-btn-primary mt-6">
          Retour à l'accueil
        </a>
      </div>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
