"use client";

import { StakeUnderlyingTokenForm } from "@/app/stake/underlying/[address]/components/StakeUnderlyingTokenForm/StakeUnderlyingTokenForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useStkToken } from "@/hooks/useStkToken";
import { useTotalSupplied } from "@/hooks/useTotalSupplied";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";
import { use } from "react";
import { Address } from "viem";

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
