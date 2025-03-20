import { Address, encodeFunctionData } from "viem";
import { Permit } from "@/types/permit";
import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";
import { useWriteContract } from "@/hooks/useWriteContract";
import { useQueryClient } from "@tanstack/react-query";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { WithdrawalMethod } from "@/types/withdraw";

export type WithdrawUmbrellaParams = {
  umbrellaAddress: Address;
  assetAddress: Address;
  amount: bigint;
  permit?: Permit;
  withdrawMethod: WithdrawalMethod;
  description: string;
};

export const useWithdraw = () => {
  const client = useQueryClient();
  const trackTransaction = useTrackTransaction();

  const { chainId, batchHelper } = useCurrentMarket();
  const { writeContractAsync, ...result } = useWriteContract();

  const withdraw = async ({
    umbrellaAddress,
    assetAddress,
    amount,
    permit,
    withdrawMethod,
    description,
  }: WithdrawUmbrellaParams) => {
    let transactionRequest: Promise<`0x${string}`>;

    if (permit) {
      const encodedPermit = encodeFunctionData({
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "permit",
        args: [permit],
      });

      const encodedDeposit = encodeFunctionData({
        abi: UMBRELLA_BATCH_HELPER_ABI,
        functionName: "redeem",
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
        functionName: "redeem",
        args: [[umbrellaAddress, assetAddress, amount]],
      });
    }

    const hash = await transactionRequest;
    trackTransaction({ chainId, hash, description });
    const { status } = await waitForTransactionReceipt(config, { hash });

    if (status === "success") {
      client.invalidateQueries({
        queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
      });

      // TODO Find a better way to do the same
      if (withdrawMethod === "withdrawToStata") {
        client.invalidateQueries({
          queryKey: ["allStataTokens"],
        });
      } else if (withdrawMethod === "withdrawToAave") {
        client.invalidateQueries({
          queryKey: ["allReserves"],
        });
      } else {
        client.invalidateQueries({
          queryKey: ["allUnderlyings"],
        });
      }
    }

    return hash;
  };

  return {
    withdraw,
    ...result,
  };
};
