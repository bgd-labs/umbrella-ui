import { sendSafeTxs, SendSafeTxsContext } from "@/mutations/sendSafeTxs";
import { IUmbrellaStakeToken_ABI } from "@bgd-labs/aave-address-book/abis";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { Address, encodeFunctionData } from "viem";

export type StartCooldownParams = {
  assetAddress: Address;
};

export const startCooldownViaSafe = async (
  { assetAddress }: StartCooldownParams,
  { sdk, safe }: SendSafeTxsContext,
) => {
  const cooldownTx = {
    to: assetAddress,
    value: "0",
    data: encodeFunctionData({
      abi: IUmbrellaStakeToken_ABI,
      functionName: "cooldown",
    }),
  };

  const txs = [cooldownTx];

  try {
    const result = await sendSafeTxs(txs, { sdk, safe });

    if (result === null) {
      return null;
    }

    return result.safeTxHash;
  } catch (e) {
    throw new Error("Failed to start cooldown via safe wallet");
  }
};

export const useSafeStartCooldown = () => {
  const { sdk, safe } = useSafeAppsSDK();

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (args: StartCooldownParams) => startCooldownViaSafe(args, { sdk, safe }),
  });

  return [mutateAsync, rest] as const;
};
