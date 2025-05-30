import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { MARKETS } from "@/constants/markets";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MarketState {
  marketId: string;

  setMarket: (marketId: string) => void;
  reset: () => void;
}

export type MarketStore = ReturnType<typeof createMarketStore>;

export const initialState: Pick<MarketState, "marketId"> = {
  marketId: MARKETS[0].id,
};

export const createMarketStore = () => {
  return createStore<MarketState>()(
    persist(
      (set) => ({
        ...initialState,

        setMarket: (marketId: string) => set({ marketId }),
        reset: () => set({ ...initialState }),
      }),
      {
        name: LOCAL_STORAGE_KEYS.MARKET,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
