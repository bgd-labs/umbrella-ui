"use client";

import { WrapNativeTokenForm } from "@/app/stake/native/components/WrapNativeTokenForm";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useNativeToken } from "@/hooks/useNativeToken";
import { TxFormProvider } from "@/providers/TxFormProvider/TxFormProvider";

export default function StakeNativeTokenPage() {
  const { data: token, isLoading } = useNativeToken();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!token) {
    return null;
  }

  return (
    <PageContainer>
      <TxFormProvider>
        <WrapNativeTokenForm nativeToken={token} />
      </TxFormProvider>
    </PageContainer>
  );
}
