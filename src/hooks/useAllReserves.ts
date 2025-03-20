import { useQuery } from "@tanstack/react-query";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useAccount } from "wagmi";
import { fetchAllReserves } from "@/queries/fetchAllReservesData";

export const useAllReserves = () => {
  const { address: owner } = useAccount();
  const { chainId, poolProvider, uiPoolDataProvider } = useMarketStore((state) => state.market);

  return useQuery({
    queryFn: () =>
      fetchAllReserves({
        chainId,
        owner,
        poolProvider,
        uiPoolDataProvider,
      }),
    queryKey: ["allReserves", owner, chainId, poolProvider, uiPoolDataProvider],
  });
};
