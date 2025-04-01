import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { sendSafeTxs, SendSafeTxsContext } from "@/mutations/sendSafeTxs";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { Address, encodeFunctionData, erc20Abi } from "viem";

export type SafeApproveAndStakeParams = {
  umbrellaAddress: Address;
  assetAddress: Address;
  amount: bigint;
  spender: Address;
};

export const stakeViaSafe = async (
  { umbrellaAddress, assetAddress, spender, amount }: SafeApproveAndStakeParams,
  { sdk, safe }: SendSafeTxsContext,
) => {
  const approveTx = {
    to: umbrellaAddress,
    value: "0",
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, amount],
    }),
  };

  const depositTx = {
    to: spender,
    value: "0",
    data: encodeFunctionData({
      abi: UMBRELLA_BATCH_HELPER_ABI,
      functionName: "deposit",
      args: [
        {
          stakeToken: umbrellaAddress,
          edgeToken: assetAddress,
          value: amount,
        },
      ],
    }),
  };

  const txs = [approveTx, depositTx];

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

export const useSafeApproveAndStake = () => {
  const { sdk, safe } = useSafeAppsSDK();

  const { mutate, ...rest } = useMutation({
    mutationFn: (args: SafeApproveAndStakeParams) => stakeViaSafe({ ...args }, { sdk, safe }),
  });

  return {
    approveAndStake: mutate,
    ...rest,
  } as const;
};
