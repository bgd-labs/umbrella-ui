import { appChains } from "@/configs/wagmi";
import { ExternalLinkIcon } from "lucide-react";

import { DATE_FORMAT, TIME_FORMAT } from "@/constants/time";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useWaitForSafeTransaction } from "@/hooks/useWaitForSafeTransaction";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";
import Link from "next/link";
import { useTransactionReceipt } from "wagmi";

export type TransactionProps = {
  isSafeWallet: boolean;
  chainId: number;
  hash: `0x${string}`;
  description: string;
  timestamp: number;
};

export const Transaction = ({ isSafeWallet, chainId, hash, description, timestamp }: TransactionProps) => {
  const isSafeWalletConnected = useIsSafeWallet();
  // TODO Need to take into account on what chain a transaction has appeared
  const chain = appChains.find((chain) => chain.id === chainId)!;

  const { data: receipt, isLoading: isTxLoading } = useTransactionReceipt({
    hash: isSafeWallet ? undefined : hash,
  });
  const { data: safeTxDetails, isLoading: isSafeTxLoading } = useWaitForSafeTransaction({
    hash: isSafeWallet && isSafeWalletConnected ? hash : undefined,
  });
  const status = receipt?.status || safeTxDetails?.status;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-2.5">
          <div className="text-lg font-bold">{description}</div>
          {!isSafeWallet && (
            <Link href={`${chain.blockExplorers?.default.url}/tx/${hash}`} target="_blank" className="cursor-pointer">
              <ExternalLinkIcon size={14} />
            </Link>
          )}
        </div>
        {(isTxLoading || isSafeTxLoading) && <div className="text-sm">Pending</div>}
        {status && (
          <div
            className={cn("text-sm", {
              ["text-[#39BEB7]"]: status === "success",
              ["text-red-500"]: status === "reverted",
            })}
          >
            {status === "success" ? "Confirmed" : "Reverted"}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="font-semibold">{dayjs(timestamp).format(TIME_FORMAT)}</div>
        <div className="text-main-500 text-sm">{dayjs(timestamp).format(DATE_FORMAT)}</div>
      </div>
    </div>
  );
};
