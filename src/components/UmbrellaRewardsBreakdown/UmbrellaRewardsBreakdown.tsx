import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { mapTokenTypeToLabel } from "@/components/TokenLabel/TokenLabel";
import { withPositiveBalance } from "@/utils/data";

import { RewardAssetIcon } from "@/components/RewardAssetIcon/RewardAssetIcon";
import { StkToken } from "@/types/token";

export type UmbrellaRewardsBreakdownProps = {
  umbrella: StkToken;
};

export const UmbrellaRewardsBreakdown = ({ umbrella }: UmbrellaRewardsBreakdownProps) => {
  const filteredRewards = umbrella.rewards.filter(withPositiveBalance);

  return (
    <div className="flex flex-col">
      <div className="border-main-950 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <AssetIcon symbol={umbrella.underlying.symbol} assetTag="stk" className="size-9 md:size-11" />

          <div className="flex flex-col">
            <h2 className="truncate font-bold dark:text-white">{umbrella.underlying.name}</h2>
            <div className="text-main-500 text-sm capitalize">{mapTokenTypeToLabel("stk")}</div>
          </div>
        </div>

        <h2 className="font-bold dark:text-white">Rewards</h2>
      </div>
      <div className="flex flex-col gap-3 pt-3">
        {filteredRewards.map((reward) => (
          <div key={reward.address} className="flex items-center justify-between">
            <div className="flex max-w-[200px] items-center gap-2 md:max-w-[320px]">
              <RewardAssetIcon reward={reward} className="size-6 shrink-0" />
              <h2 className="truncate font-bold dark:text-white">{reward.name}</h2>
            </div>

            <div className="flex shrink-0 flex-col items-end">
              <NumberDisplay value={reward.usdAmount ?? 0} type="currency" className="text-base font-semibold" />
              <NumberDisplay value={reward.balanceFormatted ?? 0} className="text-main-500 text-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
