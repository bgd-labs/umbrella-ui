import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { StkToken, TokenType } from "@/types/token";
import { useMemo } from "react";
import { Address } from "viem";

export const findStkToken = ({
  stkTokens,
  assetAddress,
  tokenType,
}: {
  stkTokens: StkToken[];
  assetAddress: Address;
  tokenType: TokenType;
}) => {
  switch (tokenType) {
    case "underlying":
      return stkTokens.find((token) => token.underlying.address === assetAddress);
    case "a":
      return stkTokens.find((token) => token.reserve?.address === assetAddress);
    case "stata":
      return stkTokens.find((token) => token.stata?.address === assetAddress);
  }
};

export const useStkToken = ({ asset, tokenType }: { asset: Address; tokenType: TokenType }) => {
  const { data: stkTokens, isLoading: isStkTokensLoading, ...rest } = useAllStkTokens();

  return {
    data: useMemo(() => {
      if (!stkTokens) {
        return;
      }
      return findStkToken({ stkTokens, assetAddress: asset, tokenType });
    }, [stkTokens, asset, tokenType]),
    isLoading: isStkTokensLoading,
    ...rest,
  } as const;
};
