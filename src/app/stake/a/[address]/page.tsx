"use client";

import { StakeATokenForm } from "@/app/stake/a/[address]/components/StakeATokenForm/StakeATokenForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useAllReserves } from "@/hooks/useAllReserves";
import { useStkToken } from "@/hooks/useStkToken";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";
import { use } from "react";
import { Address } from "viem";

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
