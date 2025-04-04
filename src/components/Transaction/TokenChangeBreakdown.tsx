import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { ArrowRight } from "lucide-react";
import { TokenType } from "@/types/token";
import { formatBigInt, formatUSDPrice } from "@/utils/formatting";
import { parseUnits } from "viem";
import { cn } from "@/utils/cn";

export type TokenChangeBreakdownProps = {
  fromType: TokenType;
  toType: TokenType;
  decimals: number;
  amount: string | bigint;
  fromSymbol?: string;
  symbol: string;
  usdPrice: bigint;
};

export const TokenChangeBreakdown = ({
  fromType,
  toType,
  symbol,
  decimals,
  amount,
  fromSymbol,
  usdPrice,
}: TokenChangeBreakdownProps) => {
  const formattedAmount = typeof amount === "string" ? parseUnits(amount, decimals) : amount;
  const amountUsdPrice = formatUSDPrice({ balance: formattedAmount, decimals, usdPrice });

  const getSymbol = (symbol: string) => {
    if (fromType === "underlying") {
      return fromSymbol ?? symbol;
    }

    if (fromType === "stk") {
      return `Umbrella ${symbol}`;
    }

    if (fromType === "stkStata") {
      return `Umbrella a${symbol}`;
    }

    if (fromType === "a") {
      return `a${symbol}`;
    }

    if (fromType === "stata") {
      return `wa${symbol}`;
    }
    return symbol;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h2 className="font-bold dark:text-white">
            <NumberDisplay
              value={formatBigInt(formattedAmount, decimals)}
              className="font-bold"
              suffix={` ${getSymbol(symbol)}`}
            />
            <span className="text-main-500 font-normal">
              <NumberDisplay value={amountUsdPrice} type="currency" prefix=" (" suffix=")" />
            </span>
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <AssetIcon
          symbol={fromSymbol ?? symbol}
          type={fromType}
          className={cn("size-9", fromType === "underlying" && "size-7.5")}
        />
        <ArrowRight className="size-4 text-gray-400" />
        <AssetIcon symbol={symbol} type={toType} className={cn("size-9", toType === "underlying" && "size-7.5")} />
      </div>
    </div>
  );
};
