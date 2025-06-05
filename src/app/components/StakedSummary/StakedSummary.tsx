import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Block } from "@/components/ui/Block";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip/Tooltip";
import { StkToken } from "@/types/token";
import { memo } from "react";
import { InfoIcon } from "lucide-react";
import { formatUnits } from "viem";
import { Token } from "@/app/components/Token/Token";

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

        <div className="flex w-full grow flex-col items-center justify-end sm:flex-row sm:flex-wrap">
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
                apyData,
              }) => {
                const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
                const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

                return (
                  <Tooltip key={address}>
                    <TooltipTrigger asChild>
                      <div className="group border-main-100 dark:border-main-600 flex shrink-0 cursor-pointer items-center gap-2 border-l px-4 first:border-l-0 last:pr-0">
                        <AssetIcon
                          type="underlying"
                          symbol={underlying.symbol}
                          assetTag={isUnderlyingStataToken ? "stkStata" : "stk"}
                          className="size-6 shrink-0"
                        />

                        <div className="flex items-center gap-1">
                          <NumberDisplay value={stakedUSD} type="currency" className="text-base font-bold" />
                          <InfoIcon className="text-main-300 group-hover:text-main-900 ml-0.5 size-4" />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <div className="border-main-950 flex min-w-[250px] flex-col gap-1 border bg-white px-4 py-3">
                        <Token
                          token={{
                            address,
                            symbol: underlying.symbol,
                            type: isUnderlyingStataToken ? "stkStata" : "stk",
                          }}
                        />
                        <div className="bg-main-100 my-2 h-px w-full" />
                        <div className="flex items-center justify-between gap-2">
                          <div>Total Staked</div>
                          <div className="text-main-900">
                            <NumberDisplay value={stakedUSD} type="currency" className="font-bold" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div>Target Liquidity</div>
                          <div className="text-main-900">
                            <NumberDisplay value={targetLiquidityUSD} type="currency" className="font-bold" />
                          </div>
                        </div>
                        <div className="bg-main-100 my-2 h-px w-full" />
                        <div className="flex items-center justify-between gap-2">
                          <div>Current yield</div>
                          <div className="text-main-900">
                            <NumberDisplay value={apyData.rewards.total} type="percent" className="font-bold" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div>Maximum yield</div>
                          <div className="text-main-900">
                            <NumberDisplay value={apyData.rewards.total} type="percent" className="font-bold" />
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              },
            )}
        </div>
      </div>
    </Block>
  );
});
StakedSummary.displayName = "StakedSummary";
