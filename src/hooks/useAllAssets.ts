import { Asset } from "@/types/token";
import { groupByUnderlying } from "@/utils/data";
import { useMemo } from "react";
import { useAllStkTokens } from "./useAllStkTokens";
import { useNativeToken } from "./useNativeToken";

export const useAllAssets = () => {
  const { data: stkTokens, isLoading: isStkTokensLoading } = useAllStkTokens();
  const { data: nativeToken, isLoading: isNativeTokenLoading } = useNativeToken();

  return {
    data: useMemo(() => {
      if (!stkTokens) {
        return [];
      }

      const statas = stkTokens.map((stkToken) => stkToken.stata).filter((stata) => !!stata);
      const reserves = stkTokens.map((stkToken) => stkToken.reserve).filter((reserve) => !!reserve);
      const underlyings = stkTokens.map((stkToken) => stkToken.underlying);

      const sortedTokens = groupByUnderlying([...statas, ...reserves], underlyings);
      const assets: Asset[] = [...sortedTokens, ...(nativeToken ? [nativeToken] : [])].map((token) => {
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
          if (token.type === "underlying") {
            return stkToken.underlying.address === token.address;
          }
          if (token.type === "a") {
            return stkToken.underlying.address === token.underlyingAddress;
          }
          return stkToken.underlying.address === token.underlying.address;
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
          reserve: reserve ?? undefined,
          rewards,
        } satisfies Asset;
      });

      return assets;
    }, [stkTokens, nativeToken]),
    isLoading: isStkTokensLoading || isNativeTokenLoading,
  } as const;
};
