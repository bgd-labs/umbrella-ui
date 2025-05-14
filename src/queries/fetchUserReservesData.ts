import { config } from "@/configs/wagmi";
import { ChainId } from "@/types/market";
import { readContract } from "@wagmi/core";
import { Address } from "viem";

import { UI_POOL_DATA_PROVIDER_ABI } from "@/abis/uiPoolDataProvider";
import { UserReservesData } from "@/types/token";

export type UserReservesDataArgs = {
  chainId: ChainId;
  owner: Address;
  poolProvider: Address;
  uiPoolDataProvider: Address;
};

export const fetchUserReservesData = async ({
  chainId,
  owner,
  poolProvider,
  uiPoolDataProvider,
}: UserReservesDataArgs) => {
  const [userReservesData, eModeId] = await readContract(config, {
    chainId,
    address: uiPoolDataProvider,
    abi: UI_POOL_DATA_PROVIDER_ABI,
    functionName: "getUserReservesData",
    args: [poolProvider, owner],
  });

  return {
    eModeId,
    userReserves: userReservesData.map((userReserveData) => ({
      underlyingAddress: userReserveData.underlyingAsset,
      balanceScaled: userReserveData.scaledATokenBalance,
      variableDeptScaled: userReserveData.scaledVariableDebt,
    })),
  } satisfies UserReservesData;
};
