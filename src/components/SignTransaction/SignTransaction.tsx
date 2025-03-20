import { usePermit } from "@/hooks/usePermit";
import { Permit } from "@/components/SignTransaction/Permit/Permit";
import { Approve } from "@/components/SignTransaction/Approve/Approve";
import React, { memo } from "react";
import { LoadingBlock } from "@/components/SignTransaction/Loader";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useAllowance } from "@/hooks/useAllowance";
import { Address } from "viem";
import { SignableTxForm } from "@/types/form";

export type SignTransactionProps = {
  asset: Address;
  spender: Address;
  disabled?: boolean;
};

export const SignTransaction = memo(({ asset, spender, disabled }: SignTransactionProps) => {
  const { control } = useFormContext<SignableTxForm>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;

  const { data: permitData, isLoading: isPermitLoading } = usePermit({ asset });
  const { data: allowance, isLoading: isAllowanceLoading } = useAllowance({ asset, spender });

  if (isPermitLoading || isAllowanceLoading) {
    return <LoadingBlock />;
  }

  if (!permitData || allowance === undefined) {
    return null;
  }

  const hasPermitSupport = permitData.nonce !== undefined;

  if (hasPermitSupport) {
    return (
      <Controller
        name="permit"
        control={control}
        disabled={disabled}
        render={({ field }) => {
          return (
            <Permit
              asset={asset}
              amount={amount}
              spender={spender}
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
            />
          );
        }}
      />
    );
  }

  return (
    <Controller
      name="approval"
      control={control}
      defaultValue={{ allowance }}
      disabled={disabled}
      render={({ field }) => {
        return (
          <Approve
            asset={asset}
            amount={amount}
            spender={spender}
            onChange={field.onChange}
            disabled={disabled}
          />
        );
      }}
    />
  );
});
SignTransaction.displayName = "SignTransaction";
