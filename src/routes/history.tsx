import { createFileRoute } from "@tanstack/react-router";
import { HistoryPage } from "@/components/account/pages";
import { Guarded } from "@/components/auth/guard";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/history")({ component: Page });

function Page() {
  return (
    <Shell>
      <Guarded>
        <HistoryPage />
      </Guarded>
    </Shell>
  );
}
