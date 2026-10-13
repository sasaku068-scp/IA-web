import { create } from "zustand";
import { CHAT_MODEL } from "@/lib/catalog";

type AccountState = {
  credits: number | null;
  preferredModel: string;
  preferredVoice: string;
  loaded: boolean;
  setAccount: (account: {
    credits: number;
    preferredModel: string;
    preferredVoice: string;
  }) => void;
  reset: () => void;
};

export const useAccountStore = create<AccountState>((set) => ({
  credits: null,
  preferredModel: CHAT_MODEL,
  preferredVoice: "eve",
  loaded: false,
  setAccount: (account) => set({ ...account, loaded: true }),
  reset: () =>
    set({
      credits: null,
      preferredModel: CHAT_MODEL,
      preferredVoice: "eve",
      loaded: false,
    }),
}));
