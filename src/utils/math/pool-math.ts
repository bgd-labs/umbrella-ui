import { LTV_PRECISION, SECONDS_PER_YEAR } from "./constants";
import * as RayMath from "./ray-math";

interface CalculateCompoundedInterestRequest {
  rate: bigint;
  currentTimestamp: number;
  lastUpdateTimestamp: number;
}

export function calculateCompoundedInterest({
  rate,
  currentTimestamp,
  lastUpdateTimestamp,
}: CalculateCompoundedInterestRequest): bigint {
  const exp = BigInt(currentTimestamp - lastUpdateTimestamp);

  if (exp == 0n) {
    return RayMath.RAY;
  }

  const expMinusOne = exp - 1n;
  const expMinusTwo = exp > 2 ? exp - 2n : 0n;
  const basePowerTwo = RayMath.rayMul(rate, rate) / (SECONDS_PER_YEAR * SECONDS_PER_YEAR);
  const basePowerThree = RayMath.rayMul(basePowerTwo, rate) / SECONDS_PER_YEAR;

  const secondTerm = (exp * expMinusOne * basePowerTwo) / 2n;
  const thirdTerm = (exp * expMinusOne * expMinusTwo * basePowerThree) / 6n;
  return RayMath.RAY + (rate * exp) / SECONDS_PER_YEAR + secondTerm + thirdTerm;
}

export function calculateAPY(rate: bigint): number {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const lastUpdateTimestamp = currentTimestamp - Number(SECONDS_PER_YEAR);

  const compoundedInterest = calculateCompoundedInterest({
    rate,
    currentTimestamp,
    lastUpdateTimestamp,
  });

  const interestFactor = Number(compoundedInterest) / 1e27;
  const apy = (interestFactor - 1) * 100;

  return apy;
}

interface LinearInterestRequest {
  rate: bigint;
  currentTimestamp: number;
  lastUpdateTimestamp: number;
}

export function calculateLinearInterest({
  rate,
  currentTimestamp,
  lastUpdateTimestamp,
}: LinearInterestRequest): bigint {
  return (rate * BigInt(currentTimestamp - lastUpdateTimestamp)) / SECONDS_PER_YEAR + RayMath.RAY;
}

interface NormalizedIncomeRequest {
  rate: bigint;
  index: bigint;
  lastUpdateTimestamp: number;
  currentTimestamp: number;
}
export function getNormalizedIncome({
  rate,
  index,
  lastUpdateTimestamp,
  currentTimestamp,
}: NormalizedIncomeRequest): bigint {
  if (!rate) {
    return index;
  }

  const cumulatedInterest = calculateLinearInterest({
    rate,
    currentTimestamp,
    lastUpdateTimestamp,
  });

  return RayMath.rayMul(index, cumulatedInterest);
}

export function getNormalizedDebt({
  rate,
  index,
  currentTimestamp,
  lastUpdateTimestamp,
}: NormalizedIncomeRequest): bigint {
  if (currentTimestamp === lastUpdateTimestamp || rate === 0n) {
    return index;
  }
  return RayMath.rayMul(
    index,
    calculateCompoundedInterest({
      rate,
      currentTimestamp,
      lastUpdateTimestamp,
    }),
  );
}

interface CurrentBalanceRequest {
  scaledBalance: bigint;
  index: bigint;
  rate: bigint;
  lastUpdateTimestamp: number;
  currentTimestamp: number;
}
export function getCurrentLiquidityBalance({
  scaledBalance,
  index,
  rate,
  lastUpdateTimestamp,
  currentTimestamp,
}: CurrentBalanceRequest) {
  if (!scaledBalance) {
    return 0n;
  }

  return RayMath.rayToWad(
    RayMath.rayMul(
      RayMath.wadToRay(scaledBalance),
      getNormalizedIncome({
        rate,
        index,
        lastUpdateTimestamp,
        currentTimestamp,
      }),
    ),
  );
}

export function getCurrentDebtBalance({
  index,
  scaledBalance,
  rate,
  lastUpdateTimestamp,
  currentTimestamp,
}: CurrentBalanceRequest): bigint {
  if (!scaledBalance) {
    return 0n;
  }

  return RayMath.rayMul(
    scaledBalance,
    getNormalizedDebt({
      index,
      rate,
      currentTimestamp,
      lastUpdateTimestamp,
    }),
  );
}

interface HealthFactorFromBalanceRequest {
  collateralBalanceMarketReferenceCurrency: bigint;
  borrowBalanceMarketReferenceCurrency: bigint;
  averageLiquidationThreshold: bigint;
}

// 1e18 returned means 1HF
export function calculateHealthFactorFromBalances({
  borrowBalanceMarketReferenceCurrency,
  collateralBalanceMarketReferenceCurrency,
  averageLiquidationThreshold,
}: HealthFactorFromBalanceRequest): bigint {
  if (!borrowBalanceMarketReferenceCurrency) {
    return -1n; // Invalid number
  }

  return RayMath.wadDiv(
    (collateralBalanceMarketReferenceCurrency * averageLiquidationThreshold) / 10n ** LTV_PRECISION,
    borrowBalanceMarketReferenceCurrency,
  );
}

interface AvailableBorrowsMarketReferenceCurrencyRequest {
  collateralBalanceMarketReferenceCurrency: bigint;
  borrowBalanceMarketReferenceCurrency: bigint;
  currentLtv: bigint;
}

export function calculateAvailableBorrowsMarketReferenceCurrency({
  collateralBalanceMarketReferenceCurrency,
  borrowBalanceMarketReferenceCurrency,
  currentLtv,
}: AvailableBorrowsMarketReferenceCurrencyRequest): bigint {
  if (!currentLtv) {
    return 0n;
  }

  const availableBorrowsMarketReferenceCurrency =
    (collateralBalanceMarketReferenceCurrency * currentLtv) / 10n ** LTV_PRECISION -
    borrowBalanceMarketReferenceCurrency;
  return availableBorrowsMarketReferenceCurrency > 0 ? availableBorrowsMarketReferenceCurrency : 0n;
}

interface MarketReferenceCurrencyAndUsdBalanceRequest {
  balance: bigint;
  priceInMarketReferenceCurrency: bigint;
  marketReferenceCurrencyDecimals: number;
  decimals: number;
  marketReferencePriceInUsdNormalized: bigint;
}

interface MarketReferenceAndUsdBalanceResponse {
  marketReferenceCurrencyBalance: bigint;
  usdBalance: bigint;
}
/**
 * @returns non humanized/normalized values for usd/marketReference
 */
export function getMarketReferenceCurrencyAndUsdBalance({
  balance,
  priceInMarketReferenceCurrency,
  marketReferenceCurrencyDecimals,
  decimals,
  marketReferencePriceInUsdNormalized,
}: MarketReferenceCurrencyAndUsdBalanceRequest): MarketReferenceAndUsdBalanceResponse {
  const marketReferenceCurrencyBalance =
    (balance * priceInMarketReferenceCurrency) / BigInt(10 ** decimals);
  const usdBalance =
    (marketReferenceCurrencyBalance * marketReferencePriceInUsdNormalized) /
    BigInt(10 ** marketReferenceCurrencyDecimals);
  return { marketReferenceCurrencyBalance, usdBalance };
}

interface CompoundedBalanceRequest {
  principalBalance: bigint;
  reserveIndex: bigint;
  reserveRate: bigint;
  lastUpdateTimestamp: number;
  currentTimestamp: number;
}

export function getCompoundedBalance({
  principalBalance,
  reserveIndex,
  reserveRate,
  lastUpdateTimestamp,
  currentTimestamp,
}: CompoundedBalanceRequest): bigint {
  if (principalBalance === 0n) {
    return 0n;
  }

  const compoundedInterest = calculateCompoundedInterest({
    rate: reserveRate,
    currentTimestamp,
    lastUpdateTimestamp,
  });
  const cumulatedInterest = RayMath.rayMul(compoundedInterest, reserveIndex);
  const principalBalanceRay = RayMath.wadToRay(principalBalance);

  return RayMath.rayToWad(RayMath.rayMul(principalBalanceRay, cumulatedInterest));
}

export const convertToShares = (assets: bigint, income: bigint): bigint => {
  return RayMath.rayDiv(assets, income);
};

export const convertToAssets = (shares: bigint, income: bigint): bigint => {
  return RayMath.rayMul(shares, income);
};
