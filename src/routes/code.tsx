import { createFileRoute } from "@tanstack/react-router";
import { Guarded } from "@/components/auth/guard";
import { ChatWorkspace } from "@/components/chat/workspace";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/code")({ component: CodePage });

function CodePage() {
  return (
    <Shell>
      <Guarded>
        <ChatWorkspace
          kind="code"
          kicker="EDITEUR"
          placeholder="Décrivez la fonction, le bug, ou collez un extrait."
          empty="Le code renvoyé s'affiche en monospace, dans un bloc d'éditeur, avec une action pour le copier."
        />
      </Guarded>
    </Shell>
  );
}
