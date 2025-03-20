import { useAllReserves } from "@/hooks/useAllReserves";
import { useMemo } from "react";

import { UnderlyingToken } from "@/types/token";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useAccount } from "wagmi";
import { fetchAllUnderlyingTokens } from "@/queries/fetchAllUnderlyingTokens";

export const useAllReservesUnderlyings = () => {
  const { address: owner } = useAccount();
  const { chainId, oracle } = useMarketStore((state) => state.market);

  const { data: reserves, isLoading: isReservesLoading } = useAllReserves();

  const addresses = useMemo(
    () => reserves?.map((reserve) => reserve.underlyingAddress),
    [reserves],
  );

  const { data, isLoading, ...rest } = useQuery({
    queryFn: addresses
      ? () => fetchAllUnderlyingTokens({ owner, addresses, chainId, oracle })
      : skipToken,
    queryKey: ["allUnderlyings", addresses, chainId, owner, oracle],
  });

  return {
    data: useMemo(() => {
      if (!reserves) {
        return;
      }

      return data?.map((underlying) => {
        const reserve = reserves.find((reserve) => {
          return reserve.underlyingAddress === underlying.address;
        })!;

        return {
          ...underlying,
          type: "underlying",
          reserve,
        } satisfies UnderlyingToken;
      });
    }, [reserves, data]),
    isLoading: isReservesLoading || isLoading,
    ...rest,
  } as const;
};
