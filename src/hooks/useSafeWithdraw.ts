import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { Address, encodeFunctionData, erc20Abi } from "viem";
import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { sendSafeTxs, SendSafeTxsContext } from "@/mutations/sendSafeTxs";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

export type WithdrawUmbrellaParams = {
  batchHelper: Address;
  umbrellaAddress: Address;
  assetAddress: Address;
  amount: bigint;
};

export const withdrawViaSafe = async (
  { batchHelper, umbrellaAddress, assetAddress, amount }: WithdrawUmbrellaParams,
  { sdk, safe }: SendSafeTxsContext,
) => {
  const approveTx = {
    to: assetAddress,
    value: "0",
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [batchHelper, amount],
    }),
  };

  const withdrawTx = {
    to: batchHelper,
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

  const txs = [approveTx, withdrawTx];

  try {
    const result = await sendSafeTxs(txs, { sdk, safe });

    if (result === null) {
      return null;
    }

    return result.safeTxHash;
  } catch (e) {
    throw new Error("Failed to approve and withdraw via safe wallet");
  }
};

export const useSafeWithdraw = () => {
  const { sdk, safe } = useSafeAppsSDK();

  const { batchHelper } = useCurrentMarket();

  const { mutate, ...rest } = useMutation({
    mutationFn: (args: Omit<WithdrawUmbrellaParams, "batchHelper">) =>
      withdrawViaSafe({ ...args, batchHelper }, { sdk, safe }),
  });

  return {
    safeWithdraw: mutate,
    ...rest,
  } as const;
};
