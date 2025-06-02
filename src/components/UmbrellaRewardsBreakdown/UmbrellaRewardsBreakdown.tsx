import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { withPositiveBalance } from "@/utils/data";

import { RewardAssetIcon } from "@/components/RewardAssetIcon/RewardAssetIcon";
import { StkToken } from "@/types/token";

export type UmbrellaRewardsBreakdownProps = {
  umbrella: StkToken;
};

export const UmbrellaRewardsBreakdown = ({ umbrella }: UmbrellaRewardsBreakdownProps) => {
  const filteredRewards = umbrella.rewards.filter(withPositiveBalance);

  return (
    <div className="border-main-100 flex flex-col border-b py-5 last:border-b-0 last:pb-0">
      <div className="border-main-950 flex">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="font-semibold dark:text-white">
              From staking{" "}
              <span className="inline-block translate-y-1.5">
                <AssetIcon
                  symbol={umbrella.underlying.symbol}
                  assetTag={umbrella.isUnderlyingStataToken ? "stkStata" : "stk"}
                  className="size-6"
                />
              </span>{" "}
              {umbrella.isUnderlyingStataToken && "a"}
              {umbrella.underlying.symbol}:
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        {filteredRewards.map((reward) => (
          <div key={reward.address} className="mb-2 flex items-center justify-between">
            <div className="flex max-w-[200px] items-center gap-2 md:max-w-[320px]">
              <RewardAssetIcon reward={reward} className="size-6 shrink-0" />
              <h2 className="truncate text-sm font-semibold dark:text-white">{reward.symbol}</h2>
            </div>

            <div className="flex shrink-0 gap-2">
              <NumberDisplay value={reward.balanceFormatted ?? 0} className="text-main-500 text-sm" />
              <NumberDisplay value={reward.usdAmount ?? 0} type="currency" className="text-sm font-semibold" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
