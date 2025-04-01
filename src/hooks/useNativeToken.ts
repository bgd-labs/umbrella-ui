import { appChains } from "@/configs/wagmi";
import { NATIVE_TOKEN_ADDRESS } from "@/constants/markets";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { NativeToken } from "@/types/token";
import { formatBigInt, formatUSDPrice } from "@/utils/formatting";
import { useMemo } from "react";
import { useAccount, useBalance } from "wagmi";

export const useNativeToken = () => {
  const { chainId, wrapNativeTokenAddress } = useCurrentMarket();
  const { address } = useAccount();

  const { data: stkTokens, isLoading: isStkTokensLoading } = useAllStkTokens();
  const { data, isLoading: isBalanceLoading, ...rest } = useBalance({ chainId, address });

  return {
    data: useMemo(() => {
      if (!stkTokens) {
        return;
      }

      const stkToken = stkTokens.find((token) => token.underlying.address === wrapNativeTokenAddress)!;
      const chain = appChains.find((chain) => chain.id === chainId)!;

      return {
        address: NATIVE_TOKEN_ADDRESS,
        type: "native",
        name: chain.nativeCurrency.name,
        decimals: chain.nativeCurrency.decimals,
        symbol: chain.nativeCurrency.symbol,
        balance: data?.value,
        balanceFormatted: data ? formatBigInt(data.value, data.decimals) : undefined,
        latestAnswer: stkToken.latestAnswer,
        latestAnswerFormatted: stkToken.latestAnswerFormatted,
        usdAmount: formatUSDPrice({
          balance: data?.value,
          decimals: chain.nativeCurrency.decimals,
          usdPrice: stkToken.latestAnswer,
        }),
        stkToken,
      } satisfies NativeToken;
    }, [wrapNativeTokenAddress, stkTokens, data, chainId]),
    isLoading: isStkTokensLoading || isBalanceLoading,
    ...rest,
  } as const;
};
