import { MARKETS } from "@/constants/markets";

export const findMarketByChainId = (chainId: number) => {
  return MARKETS.find((market) => market.chainId === chainId);
};

export const findMarketById = (marketId: string) => {
  return MARKETS.find((market) => market.id === marketId);
};
