import { createFileRoute } from "@tanstack/react-router";
import { CreditsPage } from "@/components/account/pages";
import { Guarded } from "@/components/auth/guard";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/credits")({ component: Page });

function Page() {
  return (
    <Shell>
      <Guarded>
        <CreditsPage />
      </Guarded>
    </Shell>
  );
}
