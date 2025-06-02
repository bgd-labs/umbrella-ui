import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { TableCell } from "@/components/Table/TableCell";

import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { Token } from "@/app/components/Token/Token";
import { UmbrellaStatus } from "@/components/UmbrellaStatus/UmbrellaStatus";
import { StkToken } from "@/types/token";
import { Actions } from "./Actions";

export type UmbrellaTableRowProps = {
  data: StkToken;
};

export const UmbrellaTableRow = ({ data }: UmbrellaTableRowProps) => {
  const { address, balance, underlying, rewards, isUnderlyingStataToken } = data;

  return (
    <div
      className={
        "grid gap-4 py-3.5 md:grid-cols-[1fr_80px_100px_160px_60px] md:px-4 lg:grid-cols-[1fr_80px_120px_160px_160px] lg:px-[30px]"
      }
    >
      <TableCell>
        <Token
          token={{
            address,
            symbol: underlying.symbol,
            type: isUnderlyingStataToken ? "stkStata" : "stk",
          }}
        />
      </TableCell>

      <TableCell>
        {balance ? (
          <div className="flex flex-col items-center">
            <NumberDisplay
              value={data.usdAmount ?? 0}
              type="currency"
              className="text-main-950 text-base font-semibold dark:text-white"
            />
            <NumberDisplay value={data.balanceFormatted ?? 0} className="dark:text-main-500 text-sm text-stone-500" />
          </div>
        ) : (
          "—"
        )}
      </TableCell>

      <TableCell>
        <APYBreakdown
          symbol={underlying.symbol}
          totalApy={data.apyData.total}
          supplyApy={data.apyData.pool.total}
          rewards={rewards}
        />
      </TableCell>

      <TableCell>
        <UmbrellaStatus token={data} />
      </TableCell>

      <TableCell className="justify-end border">
        <Actions token={data} />
      </TableCell>
    </div>
  );
};
