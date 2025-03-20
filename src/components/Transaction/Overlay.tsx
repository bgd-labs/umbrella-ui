import { useWaitForTransactionReceipt } from "wagmi";
import PendingGhost from "../../../public/images/pending-ghost.svg";
import React from "react";
import { Loader } from "@/components/Loader/Loader";
import { WriteContractErrorType } from "@wagmi/core";
import { TransactionFormOverlay } from "@/components/SuccessOverlay/TransactionFormOverlay";
import { isUserRejectedTransactionError } from "@/utils/errors";
import { ExplorerLink } from "@/components/Transaction/ExplorerLink";
import { Button } from "@/components/ui/Button";
import { useWaitForSafeTransaction } from "@/hooks/useWaitForSafeTransaction";

const query = { refetchOnWindowFocus: false, refetchOnReconnect: false };

export type NewOverlayProps = {
  hash?: `0x${string}`;
  safeHash?: string | null;
  error?: WriteContractErrorType | Error | null;
  loading?: boolean;
};

export const Overlay = ({ hash, safeHash, loading, error }: NewOverlayProps) => {
  const {
    data: txReceipt,
    isFetching: isTxFetching,
    error: txError,
  } = useWaitForTransactionReceipt({ hash, query });
  const {
    data: safeTxDetails,
    isFetching: isSafeTxFetching,
    error: safeTxError,
  } = useWaitForSafeTransaction({
    hash: safeHash,
    query,
  });

  if (isUserRejectedTransactionError(error)) {
    return null;
  }

  if (
    loading ||
    isTxFetching ||
    isSafeTxFetching ||
    safeTxDetails?.status === "pending" ||
    safeHash === null
  ) {
    return (
      <div className="dark:bg-main-950 flex flex-col justify-center gap-14 bg-white">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative h-[240px] w-[260px]">
            <Loader className="absolute top-2.5 left-4 size-[130px]" />
            <PendingGhost className="absolute right-0 bottom-0 w-[157px]" />
          </div>
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-bold">Pending ...</h1>
            {hash && <ExplorerLink hash={hash} />}
          </div>
          {!hash && safeHash === null && (
            <>
              <div className="flex flex-col items-center gap-5 text-center">
                You can check the status of this transaction in your Safe UI.
              </div>
              <div className="flex items-center justify-center">
                <Button href="/" primary elevation={1} size="lg" outerClassName="w-[250px] grow-0">
                  Return to dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (
    txReceipt?.status === "reverted" ||
    safeTxDetails?.status === "reverted" ||
    error ||
    txError ||
    safeTxError
  ) {
    return <TransactionFormOverlay type="failure" hash={hash} />;
  }

  if (txReceipt?.status === "success" || safeTxDetails?.status === "success") {
    return <TransactionFormOverlay type="success" hash={hash} />;
  }

  return null;
};
