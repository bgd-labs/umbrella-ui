import { TableHeaderCell } from "@/components/Table/TableHeaderCell";
import { UmbrellaTableRow } from "@/app/components/UmbrellaTable/UmbrellaTableRow";
import { Block, BlocksColumn } from "@/components/ui/Block";
import React from "react";

import { Asset, StkToken } from "@/types/token";
import { Summary } from "@/app/components/Summary/Summary";

export type UmbrellaTableProps = {
  data: StkToken[];
  assets: Asset[];
};

export const UmbrellaTable = ({ data, assets }: UmbrellaTableProps) => {
  return (
    <BlocksColumn>
      <Block elevation={2} className="px-0 py-0">
        <Summary umbrellaTokens={data} assets={assets} />
        <div className="bg-main-600 dark:bg-main-900 dark:border-main-500 border-main-950 grid grid-cols-[1fr_80px_120px_160px_160px] gap-4 border-t px-[30px] py-3 text-white">
          <TableHeaderCell className="grow justify-start gap-1">Asset</TableHeaderCell>
          <TableHeaderCell>Balance</TableHeaderCell>
          <TableHeaderCell>APY</TableHeaderCell>
          <TableHeaderCell />
          <TableHeaderCell />
        </div>
      </Block>
      {data.map((item) => (
        <Block key={item.address} elevation={2} className="px-0 py-0">
          <UmbrellaTableRow data={item} />
        </Block>
      ))}
    </BlocksColumn>
  );
};
