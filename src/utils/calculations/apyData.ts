import { ApyData, StkToken } from "@/types/token";

export const calculateApyData = (stkToken: Pick<StkToken, "reserve" | "rewards">): ApyData => {
  const poolApy = stkToken.reserve?.apy || 0;
  let totalRewardsApy = 0;

  const apyComponents = stkToken.rewards.map((reward) => {
    totalRewardsApy += reward.apy;
    return {
      apy: reward.apy,
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
  };
};
