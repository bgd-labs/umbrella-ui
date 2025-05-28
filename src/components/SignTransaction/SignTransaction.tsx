import { Approve } from "@/components/SignTransaction/Approve/Approve";
import { LoadingBlock } from "@/components/SignTransaction/Loader";
import { Permit } from "@/components/SignTransaction/Permit/Permit";
import { useAllowance } from "@/hooks/useAllowance";
import { usePermit } from "@/hooks/usePermit";
import { SignableTxForm } from "@/types/form";
import { memo } from "react";
import { Control, Controller } from "react-hook-form";
import { Address } from "viem";

export type SignTransactionProps = {
  control: Control<SignableTxForm>;
  asset: Address;
  spender: Address;
  amount: bigint;
  disabled?: boolean;
};

export const SignTransaction = memo(({ control, asset, spender, amount, disabled }: SignTransactionProps) => {
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
          <Approve asset={asset} amount={amount} spender={spender} onChange={field.onChange} disabled={disabled} />
        );
      }}
    />
  );
});
SignTransaction.displayName = "SignTransaction";
