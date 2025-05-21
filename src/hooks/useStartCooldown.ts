import { useWriteContract } from "@/hooks/useWriteContract/useWriteContract";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useCallback } from "react";
import { Address } from "viem";

import { IUmbrellaStakeToken_ABI } from "@bgd-labs/aave-address-book/abis";

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
        abi: IUmbrellaStakeToken_ABI,
        functionName: "cooldown",
      });
    },
    [writeContractAsync, chainId],
  );

  return [cooldown, result] as const;
};
