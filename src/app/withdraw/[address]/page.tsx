"use client";

import { Address } from "viem";
import React, { use, useEffect } from "react";
import { useUmbrellaCooldown } from "@/store/dashboard";
import { useUmbrellaCooldownData } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownData";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useRelatedAssets } from "@/hooks/useRelatedAssets/useRelatedAssets";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { WithdrawalForm } from "@/app/withdraw/[address]/components/WithdrawalForm";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";

export type WithdrawPageProps = {
  params: Promise<{ address: Address }>;
};

export default function WithdrawPage(props: WithdrawPageProps) {
  const { address } = use(props.params);
  const router = useRouter();

  const { data: assetsDict, isLoading: isAssetAddressLoading } = useRelatedAssets();
  const { data: stkTokens, isLoading: isAllUmbrellasLoading } = useAllStkTokens();
  const { data: cooldown, isLoading: isCooldownLoading } = useUmbrellaCooldownData(address);

  const stkToken = stkTokens?.find((token) => token.address === address);
  const relatedAssets = assetsDict?.umbrella[address];
  const status = useUmbrellaCooldown(address);

  useEffect(() => {
    if (status !== "withdraw") {
      router.push("/");
    }
  }, [router, status]);

  if (isAllUmbrellasLoading || isAssetAddressLoading || isCooldownLoading) {
    return <PageLoader />;
  }

  if (!stkToken || !relatedAssets || !cooldown) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <WithdrawalForm stkToken={stkToken} relatedAssets={relatedAssets} cooldown={cooldown} />
      </TxFormProvider>
    </PageContainer>
  );
}
