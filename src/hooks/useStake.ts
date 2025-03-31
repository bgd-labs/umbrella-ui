import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { config } from "@/configs/wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWriteContract } from "@/hooks/useWriteContract";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { Permit } from "@/types/permit";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Address, encodeFunctionData } from "viem";

export type StakeAssetParams = {
  umbrellaAddress: Address;
  assetAddress: Address;
  amount: bigint;
  permit?: Permit;
  description: string;
};

export const useStake = () => {
  const client = useQueryClient();
  const trackTransaction = useTrackTransaction();

  const { chainId, batchHelper } = useCurrentMarket();
  const { writeContractAsync, ...result } = useWriteContract();

  const stake = async ({ amount, assetAddress, umbrellaAddress, permit, description }: StakeAssetParams) => {
    let transactionRequest: Promise<`0x${string}`>;

    if (permit) {
      const encodedPermit = encodeFunctionData({
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "permit",
        args: [permit],
      });

      const encodedDeposit = encodeFunctionData({
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "deposit",
        args: [
          {
            stakeToken: umbrellaAddress,
            edgeToken: assetAddress,
            value: amount,
          },
        ],
      });

      transactionRequest = writeContractAsync({
        chainId,
        address: batchHelper,
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "multicall",
        args: [[encodedPermit, encodedDeposit]],
      });
    } else {
      transactionRequest = writeContractAsync({
        chainId,
        address: batchHelper,
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "deposit",
        args: [
          {
            stakeToken: umbrellaAddress,
            edgeToken: assetAddress,
            value: amount,
          },
        ],
      });
    }

    const hash = await transactionRequest;
    trackTransaction({ chainId, hash, description });
    const receipt = await waitForTransactionReceipt(config, { hash });

    if (receipt.status === "success") {
      client.invalidateQueries({
        queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
      });
    }

    return receipt;
  };

  return {
    stake,
    ...result,
  } as const;
};
