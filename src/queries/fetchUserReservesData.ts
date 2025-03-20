import { ChainId } from "@/types/market";
import { Address } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";

import { UserReserveData } from "@/types/token";
import { UI_POOL_DATA_PROVIDER_ABI } from "@/abis/uiPoolDataProvider";

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

  return userReservesData.map((userReserveData) => ({
    underlyingAddress: userReserveData.underlyingAsset,
    balanceScaled: userReserveData.scaledATokenBalance,
    variableDeptScaled: userReserveData.scaledVariableDebt,
    eModeId,
  })) satisfies UserReserveData[];
};
