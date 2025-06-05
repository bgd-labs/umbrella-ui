import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Block } from "@/components/ui/Block";
import { StkToken } from "@/types/token";
import { memo } from "react";
import { InfoIcon } from "lucide-react";
import { formatUnits } from "viem";

const MAX_TOKENS_TO_SHOW = 4;

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
    <Block elevation={2} className="px-4 py-3">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:pb-0">
        <div className="border-main-400 flex w-full shrink-0 items-center gap-1 border-b sm:w-auto sm:border-b-0">
          <div className="text-main-400">TVL:</div>
          <NumberDisplay value={totalStakedUSD} type="currency" className="font-bold" />
        </div>

        <div className="flex grow flex-col items-center justify-end sm:flex-row sm:flex-wrap">
          {stkTokens
            // TODO Add dropdown to show more tokens
            .slice(0, MAX_TOKENS_TO_SHOW)
            .map(
              ({
                address,
                totalAssets,
                decimals,
                latestAnswerFormatted,
                targetLiquidity,
                underlying,
                isUnderlyingStataToken,
              }) => {
                const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
                const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

                return (
                  <div
                    key={address}
                    className="border-main-100 flex shrink-0 items-center gap-2 border-l px-4 first:border-l-0 last:pr-0"
                  >
                    <AssetIcon
                      type="underlying"
                      symbol={underlying.symbol}
                      assetTag={isUnderlyingStataToken ? "stkStata" : "stk"}
                      className="size-6 shrink-0"
                    />

                    <div className="flex items-center gap-1">
                      <NumberDisplay value={stakedUSD} type="currency" className="text-base font-bold" />
                      {/* <div className="mt-[1px] text-sm">/</div> */}
                      {/* <NumberDisplay value={targetLiquidityUSD} type="currency" className="mt-[1px] text-sm" /> */}
                      <InfoIcon className="text-main-300 ml-0.5 size-4" />
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </div>
    </Block>
  );
});
StakedSummary.displayName = "StakedSummary";
