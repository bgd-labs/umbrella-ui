import { config } from "@/configs/wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWriteContract } from "@/hooks/useWriteContract/useWriteContract";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { IUmbrellaRewardsController_ABI } from "@bgd-labs/aave-address-book/abis";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useCallback } from "react";
import { Address } from "viem";

export type ClaimSelectedRewardsArgs =
  | {
      assets: Address;
      rewards: Address[];
      receiver: Address;
      description: string;
    }
  | {
      assets: Address[];
      rewards: Address[][];
      receiver: Address;
      description: string;
    };

export const useClaimSelectedRewards = () => {
  const client = useQueryClient();
  const trackTransaction = useTrackTransaction();

  const { chainId, rewardsController } = useCurrentMarket();
  const { writeContractAsync, ...result } = useWriteContract();

  const claimRewards = useCallback(
    async ({ assets, rewards, receiver, description }: ClaimSelectedRewardsArgs) => {
      const hash = await writeContractAsync({
        chainId,
        address: rewardsController,
        abi: IUmbrellaRewardsController_ABI,
        functionName: "claimSelectedRewards",
        args: Array.isArray(assets)
          ? ([assets as readonly Address[], rewards as readonly (readonly Address[])[], receiver] as const)
          : ([assets, rewards as readonly Address[], receiver] as const),
      });
      trackTransaction({ chainId, hash, description });
      const { status } = await waitForTransactionReceipt(config, { hash });

      if (status === "success") {
        client.invalidateQueries({
          queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
        });
        client.invalidateQueries({
          queryKey: ["allReserves"],
        });
      }
    },
    [client, trackTransaction, rewardsController, writeContractAsync, chainId],
  );

  return [claimRewards, result] as const;
};
