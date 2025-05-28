import { SignableTxForm } from "@/types/form";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export type SignTransactionFormConnectorProps = {
  children: ({ amount }: { amount: bigint }) => React.ReactNode;
};

export const SignTransactionFormConnector = memo(({ children }: SignTransactionFormConnectorProps) => {
  const { control } = useFormContext<SignableTxForm>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;

  return children({ amount });
});
SignTransactionFormConnector.displayName = "SignTransactionFormConnector";
