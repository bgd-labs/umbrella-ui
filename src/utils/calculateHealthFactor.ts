import { Reserve } from "@/types/token";
import { toUnix } from "@/utils/date";
import {
  calculateHealthFactorFromBalances,
  getCompoundedBalance,
  getMarketReferenceCurrencyAndUsdBalance,
} from "@/utils/math/pool-math";

export type CalculateHealthFactorArgs = {
  positions: Reserve[];
};

export const calculateHealthFactor = ({ positions }: CalculateHealthFactorArgs): number => {
  const currentTimestamp = toUnix();

  let totalCollateralInBaseCurrency = 0n;
  let totalDebtInBaseCurrency = 0n;
  let weightedLiquidationThreshold = 0n;

  for (const position of positions) {
    const {
      reserveId,
      decimals,
      balance,
      eMode,
      variableDeptScaled,
      variableBorrowIndex,
      variableBorrowRate,
      usingAsCollateral,
      latestAnswer,
      priceFeedDecimals,
      liquidationThreshold,
      lastUpdateTimestamp,
    } = position;

    // Calculate compounded balances
    const compoundedATokenBalance = balance ?? 0n;
    const compoundedVariableDebt = getCompoundedBalance({
      principalBalance: variableDeptScaled ?? 0n,
      reserveIndex: variableBorrowIndex,
      reserveRate: variableBorrowRate,
      lastUpdateTimestamp,
      currentTimestamp,
    });

    const { marketReferenceCurrencyBalance: collateralInBaseCurrency } =
      getMarketReferenceCurrencyAndUsdBalance({
        balance: compoundedATokenBalance,
        decimals,
        priceInMarketReferenceCurrency: latestAnswer,
        marketReferenceCurrencyDecimals: priceFeedDecimals,
        marketReferencePriceInUsdNormalized: latestAnswer,
      });

    const { marketReferenceCurrencyBalance: debtInBaseCurrency } =
      getMarketReferenceCurrencyAndUsdBalance({
        balance: compoundedVariableDebt,
        decimals,
        priceInMarketReferenceCurrency: latestAnswer,
        marketReferenceCurrencyDecimals: priceFeedDecimals,
        marketReferencePriceInUsdNormalized: latestAnswer,
      });

    if (usingAsCollateral) {
      totalCollateralInBaseCurrency += collateralInBaseCurrency;

      let effectiveLiquidationThreshold: bigint;
      if (eMode && reserveId === eMode.reserveId) {
        effectiveLiquidationThreshold = BigInt(eMode.liquidationThreshold);
      } else {
        effectiveLiquidationThreshold = liquidationThreshold;
      }

      weightedLiquidationThreshold += collateralInBaseCurrency * effectiveLiquidationThreshold;
    }

    totalDebtInBaseCurrency += debtInBaseCurrency;
  }

  if (totalDebtInBaseCurrency === 0n) {
    return Infinity;
  }

  const avgLiquidationThreshold =
    totalCollateralInBaseCurrency > 0n
      ? weightedLiquidationThreshold / totalCollateralInBaseCurrency
      : 0n;

  const healthFactor = calculateHealthFactorFromBalances({
    collateralBalanceMarketReferenceCurrency: totalCollateralInBaseCurrency,
    borrowBalanceMarketReferenceCurrency: totalDebtInBaseCurrency,
    averageLiquidationThreshold: avgLiquidationThreshold,
  });

  return Number(healthFactor) / 1e18;
};

export type CalculateNewHealthFactorArgs = {
  positions: Reserve[];
};

export const calculateNewHealthFactor = (
  { positions }: CalculateNewHealthFactorArgs,
  newPosition: Pick<Reserve, "reserveId" | "balance">,
) => {
  return calculateHealthFactor({
    positions: positions.map((position) => {
      if (position.reserveId === newPosition.reserveId) {
        return {
          ...position,
          ...newPosition,
        };
      }
      return position;
    }),
  });
};

export type HealthFactorStatus = "risky" | "moderate" | "healthy";

export const getHealthStatus = (healthFactor: number): HealthFactorStatus => {
  if (healthFactor < 2) return "risky";
  else if (healthFactor <= 3) return "moderate";
  return "healthy";
};
