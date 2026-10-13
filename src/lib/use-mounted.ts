import { useEffect, useState } from "react";

/** Same first paint on the server and the client, before session state resolves. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
