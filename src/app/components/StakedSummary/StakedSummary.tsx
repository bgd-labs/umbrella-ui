import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Block } from "@/components/ui/Block";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip/Tooltip";
import { Mobile, TabletAndDesktop } from "@/components/MediaQueries/MediaQueries";
import { StkToken } from "@/types/token";
import { memo, useState } from "react";
import { InfoIcon, ChevronDown } from "lucide-react";
import { formatUnits } from "viem";
import { Token } from "@/app/components/Token/Token";

const MAX_TOKENS_TO_SHOW = 4;

export type StakedSummaryProps = {
  stkTokens: StkToken[];
};

export const StakedSummary = memo(({ stkTokens }: StakedSummaryProps) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  if (stkTokens.length === 0) {
    return null;
  }

  const totalStakedUSD = stkTokens.reduce((acc, { decimals, totalAssets, latestAnswerFormatted }) => {
    const stakedTokens = Number(formatUnits(totalAssets, decimals));
    return acc + stakedTokens * latestAnswerFormatted;
  }, 0);

  const tokensToShow = stkTokens.slice(0, MAX_TOKENS_TO_SHOW);

  const renderTokenDetails = (token: StkToken) => {
    const {
      address,
      totalAssets,
      decimals,
      latestAnswerFormatted,
      targetLiquidity,
      underlying,
      isUnderlyingStataToken,
      apyData,
    } = token;

    const stakedUSD = Number(formatUnits(totalAssets, decimals)) * latestAnswerFormatted;
    const targetLiquidityUSD = Number(formatUnits(targetLiquidity, decimals)) * latestAnswerFormatted;

    return (
      <div key={address} className="border-main-200 flex flex-col gap-4 border-b pb-4 last:border-b-0 last:pb-0">
        <div className="flex items-center gap-3">
          <Token
            token={{
              address,
              symbol: underlying.symbol,
              type: isUnderlyingStataToken ? "stkStata" : "stk",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Total Staked</div>
            <NumberDisplay value={stakedUSD} type="currency" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Target Liquidity</div>
            <NumberDisplay value={targetLiquidityUSD} type="currency" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Current Yield</div>
            <NumberDisplay value={apyData.rewards.total} type="percent" className="font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-main-500">Yield at Target</div>
            <NumberDisplay value={apyData.maxRewards.total} type="percent" className="font-bold" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Block elevation={2} className="px-4 py-3">
      <Mobile>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="text-main-400">TVL:</div>
              <NumberDisplay value={totalStakedUSD} type="currency" className="font-bold" />
            </div>
            <ChevronDown
              className={`text-main-400 size-5 transition-transform duration-200 ${
                isMobileExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileExpanded && <div className="flex flex-col gap-4 pt-2">{tokensToShow.map(renderTokenDetails)}</div>}
        </div>
      </Mobile>

      <TabletAndDesktop>
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:pb-0">
          <div className="border-main-400 flex w-full shrink-0 items-center gap-1 border-b sm:w-auto sm:border-b-0">
            <div className="text-main-400">TVL:</div>
            <NumberDisplay value={totalStakedUSD} type="currency" className="font-bold" />
          </div>

          <div className="flex w-full grow flex-col items-center justify-end sm:flex-row sm:flex-wrap">
            {tokensToShow.map(
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
                          <div>Current Yield</div>
                          <div className="text-main-900">
                            <NumberDisplay value={apyData.rewards.total} type="percent" className="font-bold" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div>Yield at Target</div>
                          <div className="text-main-900">
                            <NumberDisplay value={apyData.maxRewards.total} type="percent" className="font-bold" />
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
      </TabletAndDesktop>
    </Block>
  );
});

StakedSummary.displayName = "StakedSummary";
