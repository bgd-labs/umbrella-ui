import {
  ModalBody,
  ModalClose,
  ModalTitle,
  ModalRoot,
  ModalTrigger,
} from "@/components/Modal/Modal";
import { Button } from "@/components/ui/Button";
import { Block, BlocksColumn } from "@/components/ui/Block";
import { useAccount, useDisconnect } from "wagmi";
import { getScannerUrl } from "@/utils/getScannerUrl";
import { ExternalLinkIcon, CopyIcon } from "lucide-react";
import { useNativeToken } from "@/hooks/useNativeToken";
import React, { ComponentProps, PropsWithChildren, useMemo } from "react";
import { textCenterEllipsis } from "@/utils/textCenterEllipsis";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { Transaction } from "@/components/WalletModal/Transaction";
import { useTransactionsTrackerStore } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { byTimestampDesc } from "@/constants/sorts";
import { CopyToClipboard } from "@/components/CopyToClipboard/CopyToClipboard";

export type WalletModalProps = PropsWithChildren<
  Pick<ComponentProps<typeof ModalRoot>, "open" | "onOpenChange">
>;

export const WalletModal = ({ open, onOpenChange, children }: WalletModalProps) => {
  const { address, chainId } = useAccount();
  const { data } = useNativeToken();
  const { disconnect } = useDisconnect();

  const transactionsStore = useTransactionsTrackerStore((state) => state.store);
  const clearAll = useTransactionsTrackerStore((state) => state.reset);

  const sortedTransactions = useMemo(() => {
    if (!address) {
      return [];
    }
    const transactions = transactionsStore[address];

    return Object.values(transactions || []).toSorted(byTimestampDesc);
  }, [transactionsStore, address]);

  if (!chainId || !address) {
    return null;
  }

  const handleClearAll = () => {
    clearAll();
  };

  const handleDisconnectClick = () => {
    onOpenChange?.(false);
    disconnect();
  };

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalTrigger asChild>{children}</ModalTrigger>

      <ModalBody className="w-full max-w-[478px]">
        <BlocksColumn>
          <Block className="bg-main-50 flex items-center justify-between px-[30] py-6">
            <ModalTitle className="text-lg font-bold">Wallet</ModalTitle>
            <ModalClose />
          </Block>

          <Block elevation={2} className="relative px-10 py-10">
            <div className="flex flex-col items-center gap-9">
              <div className="flex flex-col items-center gap-6">
                <AssetIcon chainId={chainId} className="size-[90px]" />

                <div className="flex items-center justify-center gap-1.5">
                  <div className="text-xl font-bold">{textCenterEllipsis(address, 4, 4)}</div>
                  <CopyToClipboard value={address} />
                </div>

                <div className="text-lg">{`${data?.balanceFormatted} ${data?.symbol}`}</div>
              </div>

              <div className="flex w-full flex-col gap-8">
                <div className="flex items-center justify-between border-b pb-6">
                  <div className="text-lg font-bold">Transactions</div>
                  <button
                    className="cursor-pointer text-base underline underline-offset-2"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </button>
                </div>

                <div className="flex max-h-[240px] flex-col gap-8 overflow-y-auto">
                  {sortedTransactions.map((transaction) => (
                    <Transaction key={transaction.hash} {...transaction} />
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center gap-9">
                <Button
                  href={getScannerUrl(chainId, address)}
                  target="_blank"
                  elevation={1}
                  size="lg"
                  className="flex items-center gap-1"
                >
                  All Transactions <ExternalLinkIcon size={14} className="cursor-pointer" />
                </Button>
                <Button elevation={1} size="lg" onClick={handleDisconnectClick}>
                  Disconnect
                </Button>
              </div>
            </div>
          </Block>
        </BlocksColumn>
      </ModalBody>
    </ModalRoot>
  );
};
