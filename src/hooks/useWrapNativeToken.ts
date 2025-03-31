import { config } from "@/configs/wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWriteContract } from "@/hooks/useWriteContract";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { waitForTransactionReceipt } from "@wagmi/core";
import { parseAbi } from "viem";

export const useWrapNativeToken = () => {
  const { chainId, wrapNativeTokenAddress } = useCurrentMarket();
  const trackTransaction = useTrackTransaction();

  const { writeContractAsync, ...result } = useWriteContract();

  const wrap = async ({ amount, description }: { amount: bigint; description: string }) => {
    try {
      const hash = await writeContractAsync({
        chainId,
        address: wrapNativeTokenAddress,
        abi: parseAbi(["function deposit(uint256 payableAmount) payable"]),
        functionName: "deposit",
        args: [amount],
        value: amount,
      });

      trackTransaction({ chainId, hash, description });
      const { status } = await waitForTransactionReceipt(config, { hash });

      if (status === "success") {
        return hash;
      }
      throw new Error("Transactions has been reverted");
    } catch (error) {
      // TODO Add proper error handling with custom errors
      throw new Error("Could not wrap native token");
    }
  };

  return {
    wrap,
    ...result,
  } as const;
};
