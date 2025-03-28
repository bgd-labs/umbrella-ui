import { SECONDS_PER_YEAR } from "@/utils/math/constants";
import { formatUnits } from "viem";

const SCALING_FACTOR = 18;

export const calculateRewardsApy = ({
  totalAssets,
  usdPrice,
  decimals,
  reward,
}: {
  totalAssets: bigint;
  usdPrice: bigint;
  decimals: number;
  reward: {
    usdPrice: bigint;
    currentEmissionPerSecondScaled: bigint;
  };
}) => {
  if (totalAssets === 0n || reward.currentEmissionPerSecondScaled === 0n) {
    return 0;
  }

  const totalAssetsScaled =
    totalAssets * 10n ** BigInt(SCALING_FACTOR - decimals);
  const totalAssetsUsdPriceScaled = totalAssetsScaled * usdPrice;

  const secondsPerYearScaled = SECONDS_PER_YEAR * 10n ** BigInt(SCALING_FACTOR);
  const rewardEmissionPerYearScaled =
    reward.currentEmissionPerSecondScaled * secondsPerYearScaled;
  const yearlyRewardValueInUSD = rewardEmissionPerYearScaled * reward.usdPrice;

  const apy = yearlyRewardValueInUSD / totalAssetsUsdPriceScaled;

  return Number(formatUnits(apy, SCALING_FACTOR - 2)); // -2 to display in %
};
