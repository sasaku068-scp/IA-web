import { createFileRoute } from "@tanstack/react-router";
import { Guarded } from "@/components/auth/guard";
import { ChatWorkspace } from "@/components/chat/workspace";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/chat")({ component: ChatPage });

function ChatPage() {
  return (
    <Shell>
      <Guarded>
        <ChatWorkspace
          kind="chat"
          kicker="CONVERSATION"
          placeholder="Écrivez un message. Entrée envoie, Maj+Entrée passe une ligne."
          empty="Écrivez un message pour ouvrir une conversation. La réponse vient de Grok 4.7, pas d'un texte préparé."
        />
      </Guarded>
    </Shell>
  );
}
