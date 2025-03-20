"use client";

import React, { use } from "react";
import { Address } from "viem";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useStkToken } from "@/hooks/useStkToken";
import { useAllReserves } from "@/hooks/useAllReserves";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { StakeATokenForm } from "@/app/stake/a/[address]/components/StakeATokenForm/StakeATokenForm";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";

const tokenType = "a";

export type StakeATokenPageProps = {
  params: Promise<{ address: Address }>;
};

export default function StakeATokenPage(props: StakeATokenPageProps) {
  const { address: asset } = use(props.params);

  const { data: stkToken, isLoading: isStkLoading } = useStkToken({ asset, tokenType });
  const { data: reserves, isLoading: isReservesLoading } = useAllReserves();

  if (isStkLoading || isReservesLoading) {
    return <PageLoader />;
  }

  if (!stkToken || !reserves || !stkToken.reserve) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <StakeATokenForm asset={asset} stkToken={stkToken} reserves={reserves} />
      </TxFormProvider>
    </PageContainer>
  );
}
