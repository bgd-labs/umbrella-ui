"use client";

import { MarketContext } from "@/providers/MarketProvider/MarketContext";
import { createMarketStore, MarketStore } from "@/store/market";
import { findMarketByChainId } from "@/utils/markets/markets";
import { getInitialChainId } from "@/utils/web3";
import { PropsWithChildren, useMemo, useRef, useState } from "react";

export const MarketProvider = ({ children }: PropsWithChildren) => {
  const [initialChainId] = useState(getInitialChainId);

  const storeRef = useRef<MarketStore>(null);
  const market = useMemo(() => findMarketByChainId(initialChainId)!, [initialChainId]);

  if (!storeRef.current) {
    storeRef.current = createMarketStore({ market });
  }

  return <MarketContext.Provider value={storeRef.current}>{children}</MarketContext.Provider>;
};
