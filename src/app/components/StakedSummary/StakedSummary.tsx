import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Block } from "@/components/ui/Block";
import { StkToken } from "@/types/token";
import { memo } from "react";
import { formatUnits } from "viem";

export type StakedSummaryProps = {
  stkTokens: StkToken[];
};

export const StakedSummary = memo(({ stkTokens }: StakedSummaryProps) => {
  if (stkTokens.length === 0) {
    return null;
  }

  const totalStakedUSD = stkTokens.reduce((acc, { decimals, totalAssets, latestAnswerFormatted }) => {
    const stakedTokens = Number(formatUnits(totalAssets, decimals));
    return acc + stakedTokens * latestAnswerFormatted;
  }, 0);

  return (
    <Block elevation={2}>
      <div className="flex flex-col items-start justify-between gap-5 pb-1 sm:flex-row sm:items-center sm:pb-0">
        <div className="border-main-400 flex w-full shrink-0 items-center gap-2 border-b sm:w-auto sm:border-b-0">
          <div>TVL:</div>
          <NumberDisplay value={totalStakedUSD} type="currency" className="text-xl font-bold" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {stkTokens
            // TODO Add dropdown to show more tokens
            .slice(0, 4)
            .map(({ address, totalAssets, decimals, latestAnswerFormatted, targetLiquidity, underlying }) => {
              const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
              const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

              return (
                <div key={address} className="flex w-full basis-1/2 items-center gap-2">
                  <AssetIcon type="underlying" symbol={underlying.symbol} className="size-6 shrink-0" />

                  <div className="flex gap-0.5">
                    <NumberDisplay value={stakedUSD} type="currency" className="text-base font-bold" />
                    <div className="mt-[1px] text-sm">/</div>
                    <NumberDisplay value={targetLiquidityUSD} type="currency" className="mt-[1px] text-sm" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Block>
  );
});
StakedSummary.displayName = "StakedSummary";
