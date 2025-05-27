import { TableCell } from "@/components/Table/TableCell";

import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { Actions } from "@/app/components/AssetsTable/Actions";
import { Token } from "@/app/components/Token/Token";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { Asset } from "@/types/token";
import { cn } from "@/utils/cn";
import { useAccount } from "wagmi";

export type AssetsTableRowProps = {
  data: Asset;
};

export const AssetsTableRow = ({ data }: AssetsTableRowProps) => {
  const { isConnected } = useAccount();

  const { symbol, reserve, rewards } = data;
  const totalRewardsAPY = rewards.reduce((acc, reward) => acc + reward.apy, 0);
  const totalAPY = (reserve?.apy ?? 0) + totalRewardsAPY;
  const isNative = data.type === "native";

  return (
    <div
      className={cn("grid gap-4 py-3.5 md:px-4 lg:px-[30px]", {
        "grid-cols-[1fr_128px_128px_128px]": isConnected,
        "grid-cols-[1fr_128px_128px]": !isConnected,
      })}
    >
      <TableCell className="min-w-[100px] grow justify-start gap-3">
        <Token token={data} />
      </TableCell>

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

      <TableCell>
        <APYBreakdown
          symbol={isNative ? (data.reserve?.symbol ?? symbol) : symbol}
          totalApy={totalAPY}
          supplyApy={reserve?.apy ?? 0}
          rewards={rewards}
        />
      </TableCell>

      <TableCell className="justify-end">
        <Actions data={data} />
      </TableCell>
    </div>
  );
};
