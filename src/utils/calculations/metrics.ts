import { StkToken } from "@/types/token";

export const calculateMetrics = (tokens: StkToken[]) => {
  return tokens.reduce(
    ({ totalStakedUsd, totalApy, totalClaimableYield }, token) => {
      const tokenUsdPrice = token.usdAmount ?? 0;

      return {
        totalStakedUsd: totalStakedUsd + tokenUsdPrice,
        totalApy:
          totalStakedUsd + tokenUsdPrice > 0
            ? (totalApy * totalStakedUsd + token.apyData.total * tokenUsdPrice) /
              (totalStakedUsd + tokenUsdPrice)
            : 0,
        totalClaimableYield: totalClaimableYield + token.totalRewardsUSDAmount,
      };
    },
    { totalStakedUsd: 0, totalApy: 0, totalClaimableYield: 0 },
  );
};
