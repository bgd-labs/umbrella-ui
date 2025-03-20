import { ChainId } from "@/types/market";
import { Address } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";

import { ReserveData } from "@/types/token";
import { UI_POOL_DATA_PROVIDER_ABI } from "@/abis/uiPoolDataProvider";
import { formatBigInt } from "@/utils/formatBigInt";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";

export type ReservesDataArgs = {
  chainId: ChainId;
  poolProvider: Address;
  uiPoolDataProvider: Address;
};

export const fetchReservesData = async ({
  chainId,
  poolProvider,
  uiPoolDataProvider,
}: ReservesDataArgs) => {
  const [reservesData] = await readContract(config, {
    chainId,
    address: uiPoolDataProvider,
    abi: UI_POOL_DATA_PROVIDER_ABI,
    functionName: "getReservesData",
    args: [poolProvider],
  });

  return reservesData.map((reserveData, index) => ({
    reserveId: index,
    address: reserveData.aTokenAddress,
    name: reserveData.name,
    symbol: reserveData.symbol,
    decimals: Number(reserveData.decimals),
    underlyingAddress: reserveData.underlyingAsset,
    variableDebtAddress: reserveData.variableDebtTokenAddress,
    isActive: reserveData.isActive,
    isFrozen: reserveData.isFrozen,
    isPaused: reserveData.isPaused,
    usingAsCollateral: reserveData.usageAsCollateralEnabled,
    latestAnswer: reserveData.priceInMarketReferenceCurrency,
    latestAnswerFormatted: formatBigInt(
      reserveData.priceInMarketReferenceCurrency,
      PRICE_FEED_DECIMALS,
    ),
    priceFeedDecimals: PRICE_FEED_DECIMALS,
    liquidityIndex: reserveData.liquidityIndex,
    liquidityRate: reserveData.liquidityRate,
    liquidationThreshold: reserveData.reserveLiquidationThreshold,
    variableBorrowIndex: reserveData.variableBorrowIndex,
    variableBorrowRate: reserveData.baseVariableBorrowRate,
    lastUpdateTimestamp: reserveData.lastUpdateTimestamp,
    totalVariableDebtScaled: reserveData.totalScaledVariableDebt,
    borrowCap: reserveData.borrowCap,
    supplyCap: reserveData.supplyCap,
    accruedToTreasury: reserveData.accruedToTreasury,
  })) satisfies ReserveData[];
};
