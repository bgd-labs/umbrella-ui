import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useAllPositions } from "@/hooks/useAllPositions";
import { useAllReservesUnderlyings } from "@/hooks/useAllReservesUnderlyings";
import { useNativeToken } from "@/hooks/useNativeToken";
import { useMemo } from "react";
import { groupByUnderlying } from "@/utils/groupByUnderlying";
import { Asset } from "@/types/token";

export const useAllAssets = () => {
  const { data: stkTokens, isLoading: isStkTokensLoading } = useAllStkTokens();
  const { data: positions, isLoading: isPositionsLoading } = useAllPositions();
  const { data: underlyings, isLoading: isReservesLoading } = useAllReservesUnderlyings();
  const { data: nativeToken, isLoading: isNativeTokenLoading } = useNativeToken();

  return {
    data: useMemo(() => {
      if (!stkTokens) {
        return [];
      }

      const sortedTokens = groupByUnderlying(positions, underlyings);
      const assets: Asset[] = [...sortedTokens, ...(nativeToken ? [nativeToken] : [])].map(
        (token) => {
          if (token.type === "native") {
            return {
              address: token.address,
              name: token.name,
              symbol: token.symbol,
              decimals: token.decimals,
              type: "native",
              balance: token.balance,
              balanceFormatted: token.balanceFormatted,
              usdAmount: token.usdAmount,
              reserve: token.stkToken.reserve ?? undefined,
              rewards: token.stkToken.rewards,
            };
          }

          const reserve = token.type === "a" ? token : token.reserve;
          const rewards = stkTokens.find((stkToken) => {
            if (token.type === "a") {
              return stkToken.underlying.address === token.underlyingAddress;
            }
            return stkToken.underlying.address === token.reserve.underlyingAddress;
          })!.rewards;

          return {
            address: token.address,
            name: reserve?.name ?? token.name,
            symbol: reserve?.symbol ?? token.symbol,
            decimals: token.decimals,
            type: token.type,
            balance: token.balance,
            balanceFormatted: token.balanceFormatted,
            usdAmount: token.usdAmount,
            reserve,
            rewards,
          } satisfies Asset;
        },
      );

      return assets;
    }, [positions, underlyings, stkTokens, nativeToken]),
    isLoading:
      isStkTokensLoading || isPositionsLoading || isReservesLoading || isNativeTokenLoading,
  } as const;
};
