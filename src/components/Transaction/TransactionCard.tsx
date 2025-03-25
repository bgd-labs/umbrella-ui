import React, { PropsWithChildren } from "react";
import { Block, BlocksColumn } from "@/components/ui/Block";
import { WriteContractErrorType } from "@wagmi/core";
import { Overlay } from "@/components/Transaction/Overlay";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";

export type TransactionCardProps = PropsWithChildren<{
  title: string;

  hash?: `0x${string}`;
  safeHash?: string | null;
  error?: WriteContractErrorType | Error | null;
  loading?: boolean;
}>;

export const TransactionCard = ({
  title,
  hash,
  safeHash,
  loading,
  error,
  children,
}: TransactionCardProps) => {
  const isMobile = useMobileMediaQuery();
  const displayOverlay = hash || safeHash || loading || error;
  return (
    <BlocksColumn className="mx-auto w-full md:max-w-[480px]">
      <Block
        elevation={isMobile ? 1 : 2}
        className="bg-main-50 dark:bg-main-900 px-7 py-5 md:px-8 md:py-6"
      >
        <h1 className="font-bold dark:text-white">{title}</h1>
      </Block>
      <Block
        elevation={isMobile ? 1 : 2}
        className="relative flex flex-col gap-8 px-6 pt-5 pb-5 md:px-10 md:pt-8 md:pb-10"
        outerClassName="flex"
      >
        {displayOverlay ? (
          <Overlay
            hash={hash}
            safeHash={safeHash}
            loading={loading}
            error={error}
          />
        ) : (
          children
        )}
      </Block>
    </BlocksColumn>
  );
};
