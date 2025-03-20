import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { SECONDS_PER_YEAR } from "@/utils/math/constants";
import { formatUnits } from "viem";

const SCALING_FACTOR = 18;

export const calculateEmissionPerYear = ({
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
  if (totalAssets === 0n) {
    return 0;
  }

  // Check if distribution has ended
  if (reward.currentEmissionPerSecondScaled === 0n) {
    return 0;
  }

  const totalAssetsScaled = totalAssets * 10n ** BigInt(SCALING_FACTOR - decimals);
  const assetPriceScaled = usdPrice * 10n ** BigInt(SCALING_FACTOR - PRICE_FEED_DECIMALS);
  const totalAssetsUsdPriceScaled = totalAssetsScaled * assetPriceScaled;

  const secondsPerYearScaled = SECONDS_PER_YEAR * 10n ** BigInt(SCALING_FACTOR);
  const emissionPerSecondScaled =
    reward.currentEmissionPerSecondScaled * 10n ** BigInt(SCALING_FACTOR);
  const emissionPerYearScaled = emissionPerSecondScaled * secondsPerYearScaled;
  const rewardPriceScaled = reward.usdPrice * 10n ** BigInt(SCALING_FACTOR - PRICE_FEED_DECIMALS);
  const yearlyValueInUSD = emissionPerYearScaled * rewardPriceScaled;

  const apy =
    ((yearlyValueInUSD / totalAssetsUsdPriceScaled) * 100n) / 10n ** BigInt(SCALING_FACTOR);

  return Number(formatUnits(apy, SCALING_FACTOR));
};
