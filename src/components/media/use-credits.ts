import { useAccountStore } from "@/lib/account-store";

export function rememberCredits(credits: number | null) {
  if (credits === null) return;
  const state = useAccountStore.getState();
  state.setAccount({
    credits,
    preferredModel: state.preferredModel,
    preferredVoice: state.preferredVoice,
  });
}
