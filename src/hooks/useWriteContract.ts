import { ChainId } from "@/types/market";
import { ensureCorrectChainForTx } from "@/utils/ensureCorrectChainForTx";
import { isUserRejectedTransactionError } from "@/utils/errors";
import { useCallback } from "react";
import { useWriteContract as useWagmiWriteContract } from "wagmi";

export const useWriteContract = () => {
  const { writeContractAsync, error, ...rest } = useWagmiWriteContract();

  const wrappedWriteContractAsync: typeof writeContractAsync = useCallback(
    async function (...args) {
      const { chainId } = args[0];

      if (!chainId) {
        throw new Error("ChainId must be provided");
      }

      await ensureCorrectChainForTx(chainId as ChainId);
      return writeContractAsync(...args);
    },
    [writeContractAsync],
  );

  return {
    error: isUserRejectedTransactionError(error) ? undefined : error,
    writeContractAsync: wrappedWriteContractAsync,
    ...rest,
  } as const;
};
