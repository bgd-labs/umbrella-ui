import { UI_POOL_DATA_PROVIDER_ABI } from "@/abis/uiPoolDataProvider";
import { config } from "@/configs/wagmi";
import { EMode } from "@/types/eMode";
import { ChainId } from "@/types/market";
import { readContract } from "@wagmi/core";
import { Address } from "viem";

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
    ltv: BigInt(eMode.ltv),
    liquidationThreshold: BigInt(eMode.liquidationThreshold),
    liquidationBonus: eMode.liquidationBonus,
    collateralBitmap: Number(eMode.collateralBitmap),
  })) satisfies EMode[];
};
