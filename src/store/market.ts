import { MARKETS } from "@/constants/markets";
import { Market } from "@/types/market";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const CURRENT_STORE_VERSION = 10;

export interface MarketState {
  market: Market;

  setMarket: (marketId: string) => void;
  reset: () => void;
}

export type MarketStore = ReturnType<typeof createMarketStore>;

export const createMarketStore = (initialState: Pick<MarketState, "market">) => {
  return createStore<MarketState>()(
    persist(
      (set) => ({
        ...initialState,

        setMarket: (marketId: string) => set({ market: MARKETS.find(({ id }) => id === marketId)! }),

        reset: () => set(initialState),
      }),
      {
        name: "store:market",
        storage: createJSONStorage(() => localStorage),
        version: CURRENT_STORE_VERSION,
        migrate: (persistedState: unknown, version: number) => {
          if (version === 0 || version !== CURRENT_STORE_VERSION) {
            return undefined;
          }

          return persistedState;
        },
        partialize: (state) => ({
          market: state.market,
        }),
      },
    ),
  );
};
