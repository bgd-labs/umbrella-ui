import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { mapTokenTypeToLabel } from "@/components/TokenLabel/TokenLabel";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import React from "react";
import { withPositiveBalance } from "@/utils/filters/filters";

import { StkToken } from "@/types/token";
import { RewardAssetIcon } from "@/components/RewardAssetIcon/RewardAssetIcon";

export type UmbrellaRewardsBreakdownProps = {
  umbrella: StkToken;
};

export const UmbrellaRewardsBreakdown = ({
  umbrella,
}: UmbrellaRewardsBreakdownProps) => {
  const filteredRewards = umbrella.rewards.filter(withPositiveBalance);

  return (
    <div className="flex flex-col">
      <div className="border-main-950 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <AssetIcon
            symbol={umbrella.underlying.symbol}
            assetTag="stk"
            className="size-9 md:size-11"
          />

          <div className="flex flex-col">
            <h2 className="font-bold dark:text-white truncate">
              {umbrella.underlying.name}
            </h2>
            <div className="text-main-500 text-sm capitalize">
              {mapTokenTypeToLabel("stk")}
            </div>
          </div>
        </div>

        <h2 className="font-bold dark:text-white">Rewards</h2>
      </div>
      <div className="flex flex-col gap-3 pt-3">
        {filteredRewards.map((reward) => (
          <div
            key={reward.address}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 max-w-[200px] md:max-w-[320px]">
              <RewardAssetIcon reward={reward} className="size-6 shrink-0" />
              <h2 className="font-bold dark:text-white truncate">
                {reward.name}
              </h2>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <NumberDisplay
                value={reward.usdAmount ?? 0}
                type="currency"
                className="text-base font-semibold"
              />
              <NumberDisplay
                value={reward.balanceFormatted ?? 0}
                className="text-main-500 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
