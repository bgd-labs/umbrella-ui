"use client";

import { StakeStataTokenForm } from "@/app/stake/stata/[address]/components/StakeStataTokenForm/StakeStataTokenForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useStkToken } from "@/hooks/useStkToken";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";
import { use } from "react";
import { Address } from "viem";

const tokenType = "stata";

export type StakeStataPageProps = {
  params: Promise<{ address: Address }>;
};

export default function StakeStataPage(props: StakeStataPageProps) {
  const { address: asset } = use(props.params);

  const { data: stkToken, isLoading: isStkLoading } = useStkToken({ asset, tokenType });
  const stataToken = stkToken?.stata;

  if (isStkLoading) {
    return <PageLoader />;
  }

  if (!stkToken || !stataToken) {
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
