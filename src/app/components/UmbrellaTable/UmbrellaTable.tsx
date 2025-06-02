import { UmbrellaTableRow } from "@/app/components/UmbrellaTable/UmbrellaTableRow";
import { TableHeaderCell } from "@/components/Table/TableHeaderCell";
import { Block, BlocksColumn } from "@/components/ui/Block";

import { Summary } from "@/app/components/Summary/Summary";
import { UmbrellaCard } from "@/app/components/UmbrellaTable/UmbrellaCard";
import { Mobile, TabletAndDesktop } from "@/components/MediaQueries/MediaQueries";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { Asset, StkToken } from "@/types/token";
import { withPositiveBalance } from "@/utils/data/filters";
import { useMemo } from "react";

export type UmbrellaTableProps = {
  data: StkToken[];
  assets: Asset[];
};

export const UmbrellaTable = ({ data, assets }: UmbrellaTableProps) => {
  const isMobile = useMobileMediaQuery();
  const elevation = isMobile ? 1 : 2;

  const filteredData = useMemo(() => data.filter(withPositiveBalance), [data]);
  const hasRewardsToClaim = data.some((item) => item.rewards.some(withPositiveBalance));

  const SummaryBlock = <Summary umbrellaTokens={data} assets={assets} />;
  const TableHead = (
    <div className="bg-main-600 dark:bg-main-900 dark:border-main-500 border-main-950 grid gap-4 border-t py-3 text-white md:grid-cols-[1fr_80px_100px_160px_60px] md:px-4 lg:grid-cols-[1fr_80px_120px_160px_160px] lg:px-[30px]">
      <TableHeaderCell className="grow justify-start gap-1">Asset</TableHeaderCell>
      <TableHeaderCell>Balance</TableHeaderCell>
      <TableHeaderCell>Yield</TableHeaderCell>
      <TableHeaderCell />
      <TableHeaderCell />
    </div>
  );

  if (filteredData.length === 0 && !hasRewardsToClaim) {
    return null;
  }

  return (
    <BlocksColumn className="gap-6 md:gap-0">
      <Block elevation={elevation} className="px-0 py-0">
        {SummaryBlock}
        <TabletAndDesktop>{TableHead}</TabletAndDesktop>
      </Block>

      <Mobile>
        {filteredData.map((item) => (
          <UmbrellaCard key={item.address} data={item} />
        ))}
      </Mobile>

      <TabletAndDesktop>
        {filteredData.map((item) => (
          <Block key={item.address} elevation={elevation} className="px-0 py-0">
            <UmbrellaTableRow data={item} />
          </Block>
        ))}
      </TabletAndDesktop>
    </BlocksColumn>
  );
};
