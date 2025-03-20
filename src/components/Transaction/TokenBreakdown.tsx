import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { mapTokenTypeToLabel } from "@/components/TokenLabel/TokenLabel";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { formatBigInt } from "@/utils/formatBigInt";
import React from "react";
import { parseUnits } from "viem";
import { formatUSDPrice } from "@/utils/formatUSDPrice";
import { TokenType } from "@/types/token";

export type TokenBreakdownProps = {
  name: string;
  type: TokenType;
  decimals: number;
  amount: string | bigint;
  symbol: string;
  usdPrice: bigint;
};

export const TokenBreakdown = ({
  name,
  type,
  symbol,
  decimals,
  amount,
  usdPrice,
}: TokenBreakdownProps) => {
  const formattedAmount = typeof amount === "string" ? parseUnits(amount, decimals) : amount;
  const amountUsdPrice = formatUSDPrice({ balance: formattedAmount, decimals, usdPrice });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AssetIcon symbol={symbol} type={type} className="size-9" />

        <div className="flex flex-col">
          <h2 className="font-bold dark:text-white">{name}</h2>
          <div className="text-main-500 text-sm capitalize">
            {type === "underlying" ? null : mapTokenTypeToLabel(type)}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <NumberDisplay
          value={formatBigInt(formattedAmount, decimals)}
          className="text-base font-semibold"
        />
        <NumberDisplay value={amountUsdPrice} type="currency" className="text-main-500 text-sm" />
      </div>
    </div>
  );
};
