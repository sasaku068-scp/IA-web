import { createFileRoute } from "@tanstack/react-router";
import { Guarded } from "@/components/auth/guard";
import { AudioStudio } from "@/components/media/studios";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/audio")({ component: AudioPage });

function AudioPage() {
  return (
    <Shell>
      <Guarded>
        <AudioStudio />
      </Guarded>
    </Shell>
  );
}
