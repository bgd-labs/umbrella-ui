import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { ApyData, StkToken } from "@/types/token";
import { calculateRewardApy } from "./apy/apy";

export const calculateApyData = (
  stkToken: Pick<StkToken, "reserve" | "rewards" | "targetLiquidity" | "decimals" | "latestAnswer">,
): ApyData => {
  const poolApy = stkToken.reserve?.apy || 0;
  let totalRewardsApy = 0;
  let totalTargetRewardsApy = 0;

  const apyComponents = stkToken.rewards.map((reward) => {
    totalRewardsApy += reward.apy;
    return {
      apy: reward.apy,
      reward,
    };
  });

  const targetApyComponents = stkToken.rewards.map((reward) => {
    const targetApy = calculateRewardApy({
      maxEmissionPerSecond: reward.maxEmissionPerSecond,
      targetLiquidity: stkToken.targetLiquidity,
      totalAssets: stkToken.targetLiquidity,
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

    totalTargetRewardsApy += targetApy;
    return {
      apy: targetApy,
      reward,
    };
  });

  const totalMaxRewardsApy = totalTargetRewardsApy * 2;
  const maxApyComponents = targetApyComponents.map((component) => ({
    apy: component.apy * 2,
    reward: component.reward,
  }));

  return {
    total: poolApy + totalRewardsApy,
    targetTotal: poolApy + totalTargetRewardsApy,
    maxTotal: poolApy + totalMaxRewardsApy,
    pool: {
      total: poolApy,
    },
    rewards: {
      total: totalRewardsApy,
      components: apyComponents,
    },
    targetRewards: {
      total: totalTargetRewardsApy,
      components: targetApyComponents,
    },
    maxRewards: {
      total: totalMaxRewardsApy,
      components: maxApyComponents,
    },
  };
};
