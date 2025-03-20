"use client";

import React, { use } from "react";
import { Address } from "viem";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useStkToken } from "@/hooks/useStkToken";
import { useTotalSupplied } from "@/hooks/useTotalSupplied";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { StakeUnderlyingTokenForm } from "@/app/stake/underlying/[address]/components/StakeUnderlyingTokenForm/StakeUnderlyingTokenForm";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";

const tokenType = "underlying";

export type StakeUnderlyingPageProps = {
  params: Promise<{ address: Address }>;
};

export default function StakeUnderlyingPage(props: StakeUnderlyingPageProps) {
  const { address: asset } = use(props.params);

  const { data: stkToken, isLoading: isStkLoading } = useStkToken({ asset, tokenType });
  const reserveAddress = stkToken?.reserve?.address;
  const { data: totalSupplied, isLoading: isTotalSuppliedLoading } = useTotalSupplied({
    address: reserveAddress,
  });

  if (isStkLoading || isTotalSuppliedLoading) {
    return <PageLoader />;
  }

  if (!stkToken) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <StakeUnderlyingTokenForm asset={asset} stkToken={stkToken} totalSupplied={totalSupplied} />
      </TxFormProvider>
    </PageContainer>
  );
}
