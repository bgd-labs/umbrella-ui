import { MARKETS } from "@/constants/markets";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useMemo } from "react";

export const useCurrentMarket = () => {
  const marketId = useMarketStore((state) => state.marketId);

  return useMemo(() => {
    if (MARKETS.length === 0) {
      throw new Error("No markets found");
    }

    return MARKETS.find((market) => market.id === marketId) || MARKETS[0];
  }, [marketId]);
};
