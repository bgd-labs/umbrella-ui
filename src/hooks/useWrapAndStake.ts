import { Address, encodeFunctionData, parseAbi } from "viem";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { erc20Abi } from "viem";
import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { useMutation } from "@tanstack/react-query";
import { sendSafeTxs, SendSafeTxsContext } from "@/mutations/sendSafeTxs";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

export type SafeWrapAndStakeParams = {
  nativeTokenAddress: Address;
  umbrellaAddress: Address;
  assetAddress: Address;
  amount: bigint;
  spender: Address;
};

export const wrapAndStakeViaSafe = async (
  { nativeTokenAddress, umbrellaAddress, assetAddress, spender, amount }: SafeWrapAndStakeParams,
  { sdk, safe }: SendSafeTxsContext,
) => {
  const wrapTx = {
    to: nativeTokenAddress,
    value: String(amount),
    data: encodeFunctionData({
      abi: parseAbi(["function deposit(uint256 payableAmount) payable"]),
      functionName: "deposit",
      args: [amount],
    }),
  };

  const approveTx = {
    to: assetAddress,
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

  const txs = [wrapTx, approveTx, depositTx];

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

export const useSafeWrapAndStake = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const { wrapNativeTokenAddress, batchHelper: spender } = useCurrentMarket();

  const { mutate, ...rest } = useMutation({
    mutationFn: (args: Omit<SafeWrapAndStakeParams, "spender" | "nativeTokenAddress">) =>
      wrapAndStakeViaSafe(
        { ...args, nativeTokenAddress: wrapNativeTokenAddress, spender },
        { sdk, safe },
      ),
  });

  return {
    safeWrapAndStake: mutate,
    ...rest,
  } as const;
};
