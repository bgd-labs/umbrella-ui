import { useRelatedAssets } from "@/hooks/useRelatedAssets/useRelatedAssets";
import { StkToken, TokenType } from "@/types/token";
import { AssetsDictionary } from "@/types/addressesDictionary";
import { Address } from "viem";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useMemo } from "react";

export const findStkToken = ({
  stkTokens,
  assetsDict,
  assetAddress,
  tokenType,
}: {
  stkTokens: StkToken[];
  assetsDict: AssetsDictionary;
  assetAddress: Address;
  tokenType: TokenType;
}) => {
  let stkTokenAddress: Address;

  switch (tokenType) {
    case "underlying":
      stkTokenAddress = assetsDict.underlying[assetAddress].umbrella;
      break;
    case "a":
      stkTokenAddress = assetsDict.aToken[assetAddress].umbrella;
      break;
    case "stata":
      stkTokenAddress = assetsDict.stataToken[assetAddress].umbrella;
      break;
  }

  return stkTokens.find((token) => token.address === stkTokenAddress);
};

export const useStkToken = ({ asset, tokenType }: { asset: Address; tokenType: TokenType }) => {
  const { data: assetsDict, isLoading: isAssetsDictLoading } = useRelatedAssets();
  const { data: stkTokens, isLoading: isStkTokensLoading, ...rest } = useAllStkTokens();

  return {
    data: useMemo(() => {
      if (!stkTokens || !assetsDict) {
        return;
      }
      return findStkToken({ stkTokens, assetsDict, assetAddress: asset, tokenType });
    }, [assetsDict, stkTokens, asset, tokenType]),
    isLoading: isAssetsDictLoading || isStkTokensLoading,
    ...rest,
  } as const;
};
