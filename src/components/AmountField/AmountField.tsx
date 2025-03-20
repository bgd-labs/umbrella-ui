import { NumberFormatValues, NumericFormat } from "react-number-format";
import { formatBigInt } from "@/utils/formatBigInt";
import { ComponentProps } from "react";
import { formatUnits, parseUnits } from "viem";
import { cn } from "@/utils/cn";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { formatUSDPrice } from "@/utils/formatUSDPrice";
import WalletIcon from "../../../public/images/wallet.svg";
import { Button } from "@/components/ui/Button";

const calculateUsdAmount = ({
  value,
  decimals,
  usdPrice,
}: {
  value: AmountFieldProps["value"];
  decimals: number;
  usdPrice?: bigint;
}) => {
  if (!usdPrice) {
    return undefined;
  }

  if (!value) {
    return undefined;
  }

  const amount = parseUnits(String(value), decimals);

  return formatUSDPrice({ balance: amount, decimals, usdPrice });
};

export type AmountFieldProps = Omit<ComponentProps<typeof NumericFormat>, "onValueChange"> & {
  maxValue: bigint;
  decimals: number;
  usdPrice?: bigint;
  onValueChange: (value: string) => void;
};

export const AmountField = ({
  value,
  onValueChange,
  maxValue,
  decimals,
  usdPrice,
  disabled,
  className,
  ...numericFieldProps
}: AmountFieldProps) => {
  const usdAmount = calculateUsdAmount({ value, decimals, usdPrice });

  const handleAmountChange = (values: NumberFormatValues) => {
    onValueChange(values.value);
  };

  const handleMaxClick = () => {
    onValueChange(String(formatBigInt(maxValue, decimals)));
  };

  const isAmountValid = ({ floatValue }: NumberFormatValues) => {
    if (!maxValue || !decimals || !floatValue) {
      return true;
    }
    return floatValue <= parseFloat(formatUnits(maxValue, decimals));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="border-main-950 dark:border-main-500 flex h-16 overflow-hidden border">
        <NumericFormat
          className={cn(
            "block w-full bg-transparent px-5 py-4 text-2xl font-semibold text-stone-700 focus:outline-hidden dark:text-white",
            className,
          )}
          value={value}
          displayType="input"
          onValueChange={handleAmountChange}
          placeholder="0.000"
          thousandSeparator=","
          decimalScale={decimals}
          allowNegative={false}
          isAllowed={isAmountValid}
          disabled={disabled}
          {...numericFieldProps}
        />
      </div>

      <div className="line flex h-6 items-center justify-between gap-2 leading-none">
        <div>
          {!!usdAmount && <NumberDisplay value={usdAmount} type="currency" className="text-base" />}
        </div>

        <div className="flex items-center gap-4 pr-[5px]">
          <div className="flex items-center gap-1">
            <WalletIcon className="text-main-950 dark:text-white" />
            <span>{formatBigInt(maxValue, decimals)}</span>
          </div>
          <Button
            elevation={1}
            onClick={handleMaxClick}
            disabled={disabled}
            className="px-1 py-0"
            size="sm"
          >
            MAX
          </Button>
        </div>
      </div>
    </div>
  );
};
