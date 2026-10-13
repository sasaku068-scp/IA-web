import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/home/landing";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <Shell>
      <Landing />
    </Shell>
  );
}
