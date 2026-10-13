import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/account/pages";
import { Guarded } from "@/components/auth/guard";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/settings")({ component: Page });

function Page() {
  return (
    <Shell>
      <Guarded>
        <SettingsPage />
      </Guarded>
    </Shell>
  );
}
