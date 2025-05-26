import { getCurrentUnixTimestamp } from "@/utils/date";
import {
  FLAT_EMISSION,
  FLAT_LIQ_BOUND,
  MAX_DECIMALS,
  ONE_E18,
  PERCENT_100,
  SECONDS_PER_YEAR,
} from "@/utils/math/constants";
import { toWad, wadMul } from "@/utils/math/ray-math";

export type RewardDataToCalculateApy = {
  maxEmissionPerSecond: bigint;
  targetLiquidity: bigint;
  totalAssets: bigint;
  distributionEnd: bigint;
  decimals: number;
  price: bigint;
  priceFeedDecimals: number;
  token: {
    decimals: number;
    price: bigint;
    priceFeedDecimals: number;
  };
};

export const calculateRewardApy = (rewardData: RewardDataToCalculateApy) => {
  const emissionPerSecond = getCurrentEmission(rewardData);

  if (emissionPerSecond === 0n) {
    return 0;
  }

  const assetPriceWad = toWad(rewardData.price, rewardData.priceFeedDecimals);
  const totalAssetsWad = toWad(rewardData.totalAssets, rewardData.decimals);
  const totaAssetsUSDWad = wadMul(totalAssetsWad, assetPriceWad);
  const rewardPriceWad = toWad(rewardData.token.price, rewardData.token.priceFeedDecimals);
  const usdPerSecond = (rewardPriceWad * emissionPerSecond) / 10n ** BigInt(rewardData.token.decimals);

  const usdPerYear = usdPerSecond * SECONDS_PER_YEAR;

  return calculatePercentage(usdPerYear, totaAssetsUSDWad);
};

export const getCurrentEmission = (data: RewardDataToCalculateApy): bigint => {
  const now = BigInt(getCurrentUnixTimestamp());

  if (now > data.distributionEnd) {
    return 0n;
  }

  const decimalsScaling = BigInt(MAX_DECIMALS - data.decimals);
  const maxEmissionScaled = data.maxEmissionPerSecond * 10n ** decimalsScaling;

  const emissionScaled = getEmissionPerSecondScaled(maxEmissionScaled, data.targetLiquidity, data.totalAssets);

  const divisor = ONE_E18 * 10n ** decimalsScaling;
  return emissionScaled / divisor;
};

const getEmissionPerSecondScaled = (
  maxEmissionPerSecondScaled: bigint,
  targetLiquidity: bigint,
  totalAssets: bigint,
): bigint => {
  const params = calculateEmissionParams(maxEmissionPerSecondScaled, targetLiquidity);

  if (totalAssets <= params.targetLiquidity) {
    return slopeCurve(params.maxEmission, params.targetLiquidity, totalAssets);
  }
  if (totalAssets < params.targetLiquidityExcess) {
    return linearDecrease(params, totalAssets);
  }
  return params.flatEmission * ONE_E18;
};

type EmissionParams = {
  targetLiquidity: bigint;
  targetLiquidityExcess: bigint;
  maxEmission: bigint;
  flatEmission: bigint;
};

function calculateEmissionParams(maxEmissionPerSecondScaled: bigint, targetLiquidity: bigint): EmissionParams {
  return {
    targetLiquidity,
    targetLiquidityExcess: percentMulDiv(targetLiquidity, FLAT_LIQ_BOUND),
    maxEmission: maxEmissionPerSecondScaled,
    flatEmission: percentMulDiv(maxEmissionPerSecondScaled, FLAT_EMISSION),
  };
}

function slopeCurve(maxEmission: bigint, targetLiquidity: bigint, totalAssets: bigint): bigint {
  const emissionDecrease = (maxEmission * totalAssets * ONE_E18) / targetLiquidity;
  return ((2n * maxEmission * ONE_E18 - emissionDecrease) * totalAssets) / targetLiquidity;
}

function linearDecrease(p: EmissionParams, totalAssets: bigint): bigint {
  const num = (p.maxEmission - p.flatEmission) * (totalAssets - p.targetLiquidity);
  const denom = p.targetLiquidityExcess - p.targetLiquidity;
  return (p.maxEmission - num / denom) * ONE_E18;
}

function percentMulDiv(value: bigint, bps: bigint): bigint {
  return (value * bps) / PERCENT_100;
}

function calculatePercentage(num: bigint, denom: bigint): number {
  if (denom === 0n) return 0;
  const scaledPercentage = (num * 10_000n) / denom;
  return Number(scaledPercentage) / 100;
}
