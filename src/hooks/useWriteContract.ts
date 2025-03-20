import { useWriteContract as useWagmiWriteContract } from "wagmi";
import { isUserRejectedTransactionError } from "@/utils/errors";
import { useCallback } from "react";
import { ensureCorrectChainForTx } from "@/utils/ensureCorrectChainForTx";
import { ChainId } from "@/types/market";

export const useWriteContract = () => {
  const { writeContractAsync, error, ...rest } = useWagmiWriteContract();

  return {
    error: isUserRejectedTransactionError(error) ? undefined : error,
    writeContractAsync: useCallback(
      async (...args: Parameters<typeof writeContractAsync>) => {
        const { chainId } = args[0];

        if (!chainId) {
          throw new Error("ChainId must be provided");
        }

        await ensureCorrectChainForTx(chainId as ChainId);
        return writeContractAsync(...args);
      },
      [writeContractAsync],
    ),
    ...rest,
  } as const;
};
