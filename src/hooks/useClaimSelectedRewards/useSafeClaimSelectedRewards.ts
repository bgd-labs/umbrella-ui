import { REWARDS_CONTROLLER_ABI } from "@/abis/rewardsController";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { sendSafeTxs, SendSafeTxsContext } from "@/mutations/sendSafeTxs";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { waitForSafeTransactionDetails } from "@/utils/waitForSafeTransactionDetails";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Address, encodeFunctionData } from "viem";

export type UseSafeClaimSelectedRewardsParams = {
  rewardsController: Address;
  assets: Address | Address[];
  rewards: Address[] | Address[][];
  receiver: Address;
  description: string;
};

export const claimSelectedRewardsViaSafe = async (
  { rewardsController, assets, rewards, receiver }: UseSafeClaimSelectedRewardsParams,
  { sdk, safe }: SendSafeTxsContext,
) => {
  const claimSelectedRewardsTx = {
    to: rewardsController,
    value: "0",
    data: encodeFunctionData({
      abi: REWARDS_CONTROLLER_ABI,
      functionName: "claimSelectedRewards",
      // @ts-expect-error function overriding doesn't work in this case
      args: [assets, rewards, receiver],
    }),
  };

  const txs = [claimSelectedRewardsTx];

  try {
    const result = await sendSafeTxs(txs, { sdk, safe });

    if (result === null) {
      return null;
    }

    return result.safeTxHash;
  } catch (e) {
    throw new Error("Failed to approve and stake via safe wallet");
  }
};

export const useSafeClaimSelectedRewards = () => {
  const client = useQueryClient();
  const { sdk, safe } = useSafeAppsSDK();
  const { chainId, rewardsController } = useCurrentMarket();

  const trackTransaction = useTrackTransaction();

  const { mutate, data, ...rest } = useMutation({
    mutationFn: (args: Omit<UseSafeClaimSelectedRewardsParams, "rewardsController">) =>
      claimSelectedRewardsViaSafe({ ...args, rewardsController }, { sdk, safe }),
    onSuccess: async (hash, { description }) => {
      if (hash === null) {
        return;
      }

      trackTransaction({ isSafeWallet: true, chainId, hash: hash as `0x${string}`, description });
      const { status } = await waitForSafeTransactionDetails({ sdk }, { hash });

      if (status === "success") {
        client.invalidateQueries({
          queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
        });
      }
    },
  });

  return [mutate, { data, ...rest }] as const;
};
