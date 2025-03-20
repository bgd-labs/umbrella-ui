import { useCallback } from "react";
import { REWARDS_CONTROLLER_ABI } from "@/abis/rewardsController";
import { Address } from "viem";
import { useWriteContract } from "@/hooks/useWriteContract";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/configs/wagmi";

export type ClaimSelectedRewardsArgs = {
  assets: Address | Address[];
  rewards: Address[] | Address[][];
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
        abi: REWARDS_CONTROLLER_ABI,
        functionName: "claimSelectedRewards",
        args: [assets, rewards, receiver],
      });
      trackTransaction({ chainId, hash, description });
      const { status } = await waitForTransactionReceipt(config, { hash });

      if (status === "success") {
        client.invalidateQueries({
          queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
        });
      }
    },
    [client, trackTransaction, rewardsController, writeContractAsync, chainId],
  );

  return [claimRewards, result] as const;
};
