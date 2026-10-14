import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell/shell";
import { PricingPage } from "@/components/pricing/pricing-page";

export const Route = createFileRoute("/pricing")({
  component: PricingRoute,
});

function PricingRoute() {
  return (
    <Shell>
      <PricingPage />
    </Shell>
  );
}
