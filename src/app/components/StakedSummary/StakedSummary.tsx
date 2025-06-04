import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Block } from "@/components/ui/Block";
import { StkToken } from "@/types/token";
import { useMemo } from "react";
import { formatUnits } from "viem";

export type StakedSummaryProps = {
  stkTokens: StkToken[];
};

export const StakedSummary = ({ stkTokens }: StakedSummaryProps) => {
  const totalStakedUSD = useMemo(() => {
    return stkTokens.reduce((acc, { decimals, totalAssets, latestAnswerFormatted }) => {
      const stakedTokens = Number(formatUnits(totalAssets, decimals));
      return acc + stakedTokens * latestAnswerFormatted;
    }, 0);
  }, [stkTokens]);

  return (
    <Block elevation={2}>
      <div className="flex items-center justify-between">
        <div className="flex shrink-0 items-center gap-2">
          <div>Total staked:</div>
          <NumberDisplay value={totalStakedUSD} type="currency" className="text-xl font-bold" />
        </div>

        <div className="flex items-center gap-2">
          {stkTokens.map(({ address, underlying }) => (
            <div key={address} className="flex items-center gap-1.5">
              <AssetIcon type="underlying" symbol={underlying.symbol} className="size-6" />
              <div className="flex items-center">
                <NumberDisplay value={totalStakedUSD} type="currency" className="text-xl font-bold" />
                <NumberDisplay value={totalStakedUSD} type="currency" className="text-xl font-bold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
};
