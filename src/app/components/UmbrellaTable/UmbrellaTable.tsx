import { TableHeaderCell } from "@/components/Table/TableHeaderCell";
import { UmbrellaTableRow } from "@/app/components/UmbrellaTable/UmbrellaTableRow";
import { Block, BlocksColumn } from "@/components/ui/Block";
import React from "react";

import { Asset, StkToken } from "@/types/token";
import { Summary } from "@/app/components/Summary/Summary";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { UmbrellaCard } from "@/app/components/UmbrellaTable/UmbrellaCard";
import {
  Mobile,
  TabletAndDesktop,
} from "@/components/MediaQueries/MediaQueries";

export type UmbrellaTableProps = {
  data: StkToken[];
  assets: Asset[];
};

export const UmbrellaTable = ({ data, assets }: UmbrellaTableProps) => {
  const isMobile = useMobileMediaQuery();
  const elevation = isMobile ? 1 : 2;

  const SummaryBlock = <Summary umbrellaTokens={data} assets={assets} />;
  const TableHead = (
    <div className="bg-main-600 dark:bg-main-900 dark:border-main-500 border-main-950 grid grid-cols-[1fr_80px_120px_160px_160px] gap-4 border-t px-[30px] py-3 text-white">
      <TableHeaderCell className="grow justify-start gap-1">
        Asset
      </TableHeaderCell>
      <TableHeaderCell>Balance</TableHeaderCell>
      <TableHeaderCell>APY</TableHeaderCell>
      <TableHeaderCell />
      <TableHeaderCell />
    </div>
  );

  return (
    <BlocksColumn className="gap-6 md:gap-0">
      <Block elevation={elevation} className="px-0 py-0">
        {SummaryBlock}
        <TabletAndDesktop>{TableHead}</TabletAndDesktop>
      </Block>

      <Mobile>
        {data.map((item) => (
          <UmbrellaCard key={item.address} data={item} />
        ))}
      </Mobile>

      <TabletAndDesktop>
        {data.map((item) => (
          <Block key={item.address} elevation={elevation} className="px-0 py-0">
            <UmbrellaTableRow data={item} />
          </Block>
        ))}
      </TabletAndDesktop>
    </BlocksColumn>
  );
};
