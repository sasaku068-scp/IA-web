import { createFileRoute } from "@tanstack/react-router";
import { ModelsPage } from "@/components/account/pages";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/models")({ component: Page });

function Page() {
  return (
    <Shell>
      <ModelsPage />
    </Shell>
  );
}
