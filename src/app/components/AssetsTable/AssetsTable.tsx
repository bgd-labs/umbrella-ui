import { TableHeaderCell } from "@/components/Table/TableHeaderCell";
import { AssetsTableRow } from "@/app/components/AssetsTable/AssetsTableRow";
import { Block, BlocksColumn } from "@/components/ui/Block";
import React from "react";
import { useAccount } from "wagmi";
import { Asset } from "@/types/token";
import { cn } from "@/utils/cn";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { AssetCard } from "@/app/components/AssetsTable/AssetCard";

export type AssetsTableProps = {
  data: Asset[];
};

export const AssetsTable = ({ data }: AssetsTableProps) => {
  const isMobile = useMobileMediaQuery();
  const { isConnected } = useAccount();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-bold pb-2.5">Available</h2>

        {data.map((asset) => (
          <AssetCard key={asset.address} data={asset} />
        ))}
      </div>
    );
  }

  return (
    <BlocksColumn>
      <Block elevation={2} className="bg-main-50 px-0 py-0">
        <div className="border-b-main-950 dark:border-b-main-500 flex items-center border-b sm:max-lg:px-4 px-7 py-6">
          <span className="text-xl font-bold">Available</span>
        </div>
        <div
          className={cn(
            "bg-main-600 dark:bg-main-900 grid gap-4 md:px-4 lg:px-[30px] py-3 text-white",
            {
              "grid-cols-[1fr_128px_128px_128px]": isConnected,
              "grid-cols-[1fr_128px_128px]": !isConnected,
            },
          )}
        >
          <TableHeaderCell className="grow justify-start gap-1">
            Asset
          </TableHeaderCell>
          {isConnected && <TableHeaderCell>Balance</TableHeaderCell>}
          <TableHeaderCell>Stake APY</TableHeaderCell>
          <TableHeaderCell />
        </div>
      </Block>

      {data.map((asset) => (
        <Block key={asset.address} elevation={2} className="px-0 py-0">
          <AssetsTableRow data={asset} />
        </Block>
      ))}
    </BlocksColumn>
  );
};
