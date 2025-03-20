import { useMarketStore } from "@/providers/MarketProvider/MarketContext";

export const useCurrentMarket = () => {
  return useMarketStore((state) => state.market);
};
