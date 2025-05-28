import { AmountField, AmountFieldProps } from "@/components/AmountField/AmountField";
import { ComponentProps, forwardRef, useState } from "react";
import { formatUnits, parseUnits } from "viem";

const getDefaultValue = (value: bigint | undefined, decimals: number) => {
  if (value === undefined) {
    return "";
  }
  return formatUnits(value, decimals);
};

export type ControlledAmountFieldProps = Omit<AmountFieldProps, "value" | "onValueChange"> & {
  value?: bigint;
  onChange: (value: bigint) => void;
};

export const ControlledAmountField = forwardRef<
  ComponentProps<typeof AmountField>["getInputRef"],
  ControlledAmountFieldProps
>(({ value, onChange, decimals, ...props }: ControlledAmountFieldProps, ref) => {
  const [strValue, setStrValue] = useState<string>(getDefaultValue(value, decimals));

  const handlerChange = (newValue: string) => {
    setStrValue(newValue);
    onChange(parseUnits(newValue, decimals));
  };

  return (
    <AmountField value={strValue} onValueChange={handlerChange} decimals={decimals} getInputRef={ref} {...props} />
  );
});
ControlledAmountField.displayName = "ControlledAmountField";
