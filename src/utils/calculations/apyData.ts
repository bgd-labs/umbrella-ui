import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { ApyData, StkToken } from "@/types/token";
import { calculateRewardApy } from "./apy/apy";

export const calculateApyData = (
  stkToken: Pick<StkToken, "reserve" | "rewards" | "targetLiquidity" | "decimals" | "latestAnswer">,
): ApyData => {
  const poolApy = stkToken.reserve?.apy || 0;
  let totalRewardsApy = 0;
  let totalMaxRewardsApy = 0;

  const apyComponents = stkToken.rewards.map((reward) => {
    totalRewardsApy += reward.apy;
    return {
      apy: reward.apy,
      reward,
    };
  });

  const maxApyComponents = stkToken.rewards.map((reward) => {
    const maxApy = calculateRewardApy({
      maxEmissionPerSecond: reward.maxEmissionPerSecond,
      targetLiquidity: stkToken.targetLiquidity,
      totalAssets: stkToken.targetLiquidity, // Use targetLiquidity instead of totalAssets
      distributionEnd: reward.distributionEnd,
      decimals: stkToken.decimals,
      price: stkToken.latestAnswer,
      priceFeedDecimals: PRICE_FEED_DECIMALS,
      token: {
        decimals: reward.decimals,
        price: reward.latestAnswer,
        priceFeedDecimals: PRICE_FEED_DECIMALS,
      },
    });

    totalMaxRewardsApy += maxApy;
    return {
      apy: maxApy,
      reward,
    };
  });

  return {
    total: poolApy + totalRewardsApy,
    pool: {
      total: poolApy,
    },
    rewards: {
      total: totalRewardsApy,
      components: apyComponents,
    },
    maxRewards: {
      total: totalMaxRewardsApy,
      components: maxApyComponents,
    },
  };
};
