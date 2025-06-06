import { Block } from "@/components/ui/Block";
import { Token } from "@/app/components/Token/Token";
import { TableCell } from "@/components/Table/TableCell";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { Asset } from "@/types/token";
import { useAccount } from "wagmi";
import React from "react";
import { Actions } from "@/app/components/AssetsTable/Actions";

export type AssetCardProps = {
  data: Asset;
};

export const AssetCard = ({ data }: AssetCardProps) => {
  const { isConnected } = useAccount();

  const { symbol, reserve, rewards } = data;
  const totalRewardsAPY = rewards.reduce((acc, reward) => acc + reward.apy, 0);
  const totalAPY = (reserve?.apy ?? 0) + totalRewardsAPY;
  const isNative = data.type === "native";

  return (
    <Block elevation={1} className="flex flex-col gap-7 py-6 pr-5 pl-5">
      <div className="flex items-center justify-between border-b pb-5">
        <Token token={data} />

        {isConnected && (
          <TableCell>
            <div className="flex flex-col items-center">
              {data.usdAmount ? (
                <NumberDisplay value={data.usdAmount} type="currency" className="text-base font-semibold" />
              ) : (
                <div className="text-base font-semibold">—</div>
              )}
              <NumberDisplay value={data.balanceFormatted ?? 0} className="dark:text-main-500 text-sm text-stone-500" />
            </div>
          </TableCell>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-base">APY</div>
        <APYBreakdown
          symbol={isNative ? (data.reserve?.symbol ?? symbol) : symbol}
          totalApy={totalAPY}
          supplyApy={reserve?.apy ?? 0}
          rewards={rewards}
        />
      </div>

      <Actions data={data} />
    </Block>
  );
};
