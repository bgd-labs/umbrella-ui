import { Address } from "viem";
import { ChainId } from "@/types/market";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { UI_POOL_DATA_PROVIDER_ABI } from "@/abis/uiPoolDataProvider";
import { getReserveIdByCollateralBitMap } from "@/utils/eMode";
import { EMode } from "@/types/eMode";

export const fetchAllEModes = async ({
  chainId,
  uiPoolDataProvider,
  poolProvider,
}: {
  chainId: ChainId;
  uiPoolDataProvider: Address;
  poolProvider: Address;
}) => {
  const result = await readContract(config, {
    chainId,
    address: uiPoolDataProvider,
    abi: UI_POOL_DATA_PROVIDER_ABI,
    functionName: "getEModes",
    args: [poolProvider],
  });
  return result.map(({ id, eMode }) => ({
    id,
    label: eMode.label,
    ltv: eMode.ltv,
    liquidationThreshold: eMode.liquidationThreshold,
    liquidationBonus: eMode.liquidationBonus,
    reserveId: getReserveIdByCollateralBitMap(eMode.collateralBitmap),
  })) satisfies EMode[];
};
