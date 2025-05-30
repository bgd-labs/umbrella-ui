import { fetchAllReserves } from "@/queries/fetchAllReservesData";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useCurrentMarket } from "./useCurrentMarket";

export const useAllReserves = () => {
  const { address: owner } = useAccount();
  const { chainId, poolProvider, uiPoolDataProvider } = useCurrentMarket();

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
