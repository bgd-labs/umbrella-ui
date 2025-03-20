import { createContext, useContext } from "react";
import { MarketState, MarketStore } from "@/store/market";
import { useStore } from "zustand/react";

export const MarketContext = createContext<MarketStore | null>(null);

export const useMarketStore = <T,>(selector: (state: MarketState) => T): T => {
  const store = useContext(MarketContext);

  if (!store) {
    throw new Error("useMarket must be used within MarketProvider");
  }

  return useStore(store, selector);
};
