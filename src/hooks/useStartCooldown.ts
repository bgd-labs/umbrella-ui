import { UMBRELLA_ABI } from "@/abis/umbrella";
import { Address } from "viem";
import { useCallback } from "react";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useWriteContract } from "@/hooks/useWriteContract";

export type UmbrellaCooldownParams = {
  assetAddress: Address;
};

export const useStartCooldown = () => {
  const { chainId } = useMarketStore((state) => state.market);
  const { writeContractAsync, ...result } = useWriteContract();

  const cooldown = useCallback(
    ({ assetAddress }: UmbrellaCooldownParams) => {
      return writeContractAsync({
        chainId,
        address: assetAddress,
        abi: UMBRELLA_ABI,
        functionName: "cooldown",
      });
    },
    [writeContractAsync, chainId],
  );

  return [cooldown, result] as const;
};
