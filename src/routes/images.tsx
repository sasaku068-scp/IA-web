import { createFileRoute } from "@tanstack/react-router";
import { Guarded } from "@/components/auth/guard";
import { ImageStudio } from "@/components/media/studios";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/images")({ component: ImagesPage });

function ImagesPage() {
  return (
    <Shell>
      <Guarded>
        <ImageStudio />
      </Guarded>
    </Shell>
  );
}
