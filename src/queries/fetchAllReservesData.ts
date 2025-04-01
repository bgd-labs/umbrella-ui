import { fetchReservesData } from "@/queries/fetchReservesData";
import { fetchUserReservesData } from "@/queries/fetchUserReservesData";
import { ChainId } from "@/types/market";
import { toUnix } from "@/utils/date";
import { calculateAPY, getCurrentLiquidityBalance } from "@/utils/math/pool-math";
import { Address } from "viem";

import { fetchAllEModes } from "@/queries/fetchAllEModes";
import { Reserve } from "@/types/token";
import { formatBigInt, formatUSDPrice } from "@/utils/formatting";

export type AllReservesDataArgs = {
  chainId: ChainId;
  owner?: Address;
  poolProvider: Address;
  uiPoolDataProvider: Address;
};

export const fetchAllReserves = async ({ chainId, owner, poolProvider, uiPoolDataProvider }: AllReservesDataArgs) => {
  const commonArgs = { chainId, poolProvider, uiPoolDataProvider };
  const [reservesData, eModes, userReservesData] = await Promise.all([
    fetchReservesData(commonArgs),
    fetchAllEModes(commonArgs),
    owner && fetchUserReservesData({ ...commonArgs, owner }),
  ]);

  const currentTimestamp = toUnix();

  return reservesData.map((reserveData) => {
    const userReserveData = userReservesData?.find((item) => item.underlyingAddress === reserveData.underlyingAddress);
    const balanceScaled = userReserveData?.balanceScaled;
    const balance =
      balanceScaled &&
      getCurrentLiquidityBalance({
        scaledBalance: balanceScaled,
        index: reserveData.liquidityIndex,
        rate: reserveData.liquidityRate,
        lastUpdateTimestamp: reserveData.lastUpdateTimestamp,
        currentTimestamp,
      });
    const variableDeptScaled = userReserveData?.variableDeptScaled;
    const eMode = eModes.find((eMode) => eMode.id === userReserveData?.eModeId) ?? null;
    const apy = calculateAPY(reserveData.liquidityRate);

    return {
      ...reserveData,
      type: "a",
      apy,
      balance,
      balanceFormatted: formatBigInt(balance, reserveData.decimals),
      balanceScaled,
      usdAmount: formatUSDPrice({
        balance,
        decimals: reserveData.decimals,
        usdPrice: reserveData.latestAnswer,
      }),
      variableDeptScaled,
      eMode,
    } satisfies Reserve;
  });
};
