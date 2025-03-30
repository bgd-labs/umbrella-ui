import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { RewardAssetIcon } from "@/components/RewardAssetIcon/RewardAssetIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Tooltip/Tooltip";
import { Reward } from "@/types/token";

export type APYBreakdownProps = {
  symbol: string;
  totalApy: number;
  supplyApy: number;
  rewards: Reward[];
  displayRewards?: boolean;
};

export const APYBreakdown = ({
  symbol,
  totalApy,
  supplyApy,
  rewards,
  displayRewards = true,
}: APYBreakdownProps) => {
  const filteredRewards = rewards.filter(
    (reward) => !!reward.currentEmissionPerSecondScaled,
  );
  return (
    <Tooltip>
      <TooltipTrigger className="group flex items-center justify-center">
        <div className="flex flex-col items-center">
          <NumberDisplay
            value={totalApy}
            type="percent"
            className="group-hover:bg-secondary-500 rounded-2xl px-1.5 font-semibold transition"
          />
          {displayRewards && (
            <div className="flex items-center">
              {!!supplyApy && (
                <AssetIcon
                  key="supply-apy"
                  symbol={symbol}
                  assetTag="a"
                  className="-ml-[6px] size-4 first:ml-0"
                />
              )}
              {filteredRewards?.map((reward) => (
                <RewardAssetIcon
                  key={reward.address}
                  reward={reward}
                  className="-ml-[6px] size-4 first:ml-0"
                />
              ))}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" align="start">
        <div className="border-main-950 bg-main-50 flex min-w-60 flex-col gap-2.5 border p-4 text-[15px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AssetIcon symbol={symbol} assetTag="a" className="size-[18px]" />
              {/* <div>Supply APY</div> */}
            </div>
            <NumberDisplay value={supplyApy} type="percent" />
          </div>
          {filteredRewards.map((reward) => (
            <div
              key={reward.address}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <RewardAssetIcon reward={reward} className="size-[18px]" />
                <div>{reward.name}</div>
              </div>
              <NumberDisplay value={reward.apy} type="percent" />
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
