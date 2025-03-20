"use client";

import React, { use } from "react";
import { Address } from "viem";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { useStkToken } from "@/hooks/useStkToken";
import { useAllStataTokens } from "@/hooks/useAllStataTokens";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { StakeStataTokenForm } from "@/app/stake/stata/[address]/components/StakeStataTokenForm/StakeStataTokenForm";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";

const tokenType = "stata";

export type StakeStataPageProps = {
  params: Promise<{ address: Address }>;
};

export default function StakeStataPage(props: StakeStataPageProps) {
  const { address: asset } = use(props.params);

  const { data: stkToken, isLoading: isStkLoading } = useStkToken({ asset, tokenType });
  const { data: stataTokens, isLoading: isStataLoading } = useAllStataTokens();
  const stataToken = stataTokens?.find((token) => token.address === asset);

  if (isStkLoading || isStataLoading) {
    return <PageLoader />;
  }

  if (!stataToken || !stkToken) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <StakeStataTokenForm asset={asset} stkToken={stkToken} stataToken={stataToken} />
      </TxFormProvider>
    </PageContainer>
  );
}
