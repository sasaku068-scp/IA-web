import { createFileRoute } from "@tanstack/react-router";
import { Guarded } from "@/components/auth/guard";
import { VideoStudio } from "@/components/media/studios";
import { Shell } from "@/components/shell/shell";

export const Route = createFileRoute("/videos")({ component: VideosPage });

function VideosPage() {
  return (
    <Shell>
      <Guarded>
        <VideoStudio />
      </Guarded>
    </Shell>
  );
}
