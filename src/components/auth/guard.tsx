import type { ReactNode } from "react";
import { SignInGate } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useMounted } from "@/lib/use-mounted";
import { SessionPanel, SessionSkeleton } from "@/components/auth/session-panel";

export function Guarded({ children }: { children: ReactNode }) {
  const { isPending } = useCurrentUserState();
  const mounted = useMounted();
  if (!mounted || isPending) {
    return (
      <div className="grid h-full place-items-center px-4">
        <SessionSkeleton />
      </div>
    );
  }
  return (
    <SignInGate
      fallback={
        <div className="page-enter grid h-full place-items-center overflow-y-auto px-4 py-8">
          <SessionPanel />
        </div>
      }
    >
      {children}
    </SignInGate>
  );
}