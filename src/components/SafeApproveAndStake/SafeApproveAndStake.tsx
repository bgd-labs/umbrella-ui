import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { Button } from "@/components/ui/Button";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { sendCalls } from "@wagmi/core/experimental";
import { useState } from "react";
import { Address, encodeFunctionData, erc20Abi } from "viem";
import { useConfig } from "wagmi";

export const SafeApproveAndStake = ({
  umbrellaAddress,
  asset,
  spender,
  amount,
}: {
  umbrellaAddress: Address;
  asset: Address;
  spender: Address;
  amount: bigint;
}) => {
  const [isPending, setIsPending] = useState(false);
  const { sdk, safe } = useSafeAppsSDK();
  const config = useConfig();

  const handleDepositClick = async () => {
    setIsPending(true);
    try {
      const approveTx = {
        to: asset,
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
              edgeToken: asset,
              value: amount,
            },
          ],
        }),
      };

      const txs = [approveTx, depositTx];

      if (safe?.safeAddress) {
        const { safeTxHash } = await sdk.txs.send({ txs });
        return safeTxHash;
      } else {
        const result = await sendCalls(config, {
          calls: txs.map((tx) => ({
            to: tx.to,
            value: BigInt(tx.value),
            data: tx.data,
          })),
        });
        return result;
      }
    } catch (error) {
      console.error("Error in transaction:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      primary
      elevation={1}
      onClick={handleDepositClick}
      loading={isPending}
      disabled={!amount}
      outerClassName="w-[248px]"
      className="flex items-center gap-2"
    >
      Approve & Stake
    </Button>
  );
};
