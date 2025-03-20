import { useRelatedAssets } from "@/hooks/useRelatedAssets/useRelatedAssets";
import { useMemo } from "react";
import { useAllReservesUnderlyings } from "@/hooks/useAllReservesUnderlyings";
import { StataToken } from "@/types/token";
import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchAllStataTokens } from "@/queries/fetchAllStataTokens";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useAccount } from "wagmi";

export const useAllStataTokens = () => {
  const { address: owner } = useAccount();
  const { chainId } = useMarketStore((state) => state.market);

  const { data: assetsDict, isLoading: isAssetsDictLoading } = useRelatedAssets();
  const { data: underlyings, isLoading: isUnderlyingsLoading } = useAllReservesUnderlyings();

  const addresses = useMemo(() => {
    if (!assetsDict?.umbrella) {
      return;
    }
    return Object.values(assetsDict.umbrella)
      .map((dict) => dict.stataToken)
      .filter((item) => !!item);
  }, [assetsDict]);

  const { data, isLoading, ...rest } = useQuery({
    queryFn: addresses ? () => fetchAllStataTokens({ addresses, chainId, owner }) : skipToken,
    queryKey: ["allStataTokens", addresses, chainId, owner],
  });

  return {
    data: useMemo(() => {
      if (!assetsDict || !underlyings) {
        return;
      }
      return data?.map((stataToken) => {
        const underlyingAddress = assetsDict.stataToken[stataToken.address].underlying;
        const underlying = underlyings.find((underlying) => {
          return underlying.address === underlyingAddress;
        })!;

        return {
          ...stataToken,
          type: "stata",
          reserve: underlying.reserve,
          underlying: underlying,
        } satisfies StataToken;
      });
    }, [assetsDict, underlyings, data]),
    isLoading: isAssetsDictLoading || isUnderlyingsLoading || isLoading,
    ...rest,
  } as const;
};
