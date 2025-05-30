"use client";

import { MarketContext } from "@/providers/MarketProvider/MarketContext";
import { createMarketStore, MarketStore } from "@/store/market";
import { PropsWithChildren, useRef } from "react";

export const MarketProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<MarketStore>(null);

  if (!storeRef.current) {
    storeRef.current = createMarketStore();
  }

  return <MarketContext.Provider value={storeRef.current}>{children}</MarketContext.Provider>;
};
