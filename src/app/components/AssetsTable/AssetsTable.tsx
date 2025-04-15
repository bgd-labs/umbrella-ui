import { AssetCard } from "@/app/components/AssetsTable/AssetCard";
import { AssetsTableRow } from "@/app/components/AssetsTable/AssetsTableRow";
import { TableHeaderCell } from "@/components/Table/TableHeaderCell";
import { Block, BlocksColumn } from "@/components/ui/Block";
import { useMobileMediaQuery } from "@/hooks/useMediaQuery";
import { Asset } from "@/types/token";
import { cn } from "@/utils/cn";
import { useAccount } from "wagmi";

export type AssetsTableProps = {
  data: Asset[];
};

export const AssetsTable = ({ data }: AssetsTableProps) => {
  const isMobile = useMobileMediaQuery();
  const { isConnected } = useAccount();

  if (isMobile) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="pb-2.5 text-lg font-bold">Available</h2>

        {data.map((asset) => (
          <AssetCard key={asset.address} data={asset} />
        ))}
      </div>
    );
  }

  return (
    <BlocksColumn>
      <Block elevation={2} className="bg-main-50 px-0 py-0">
        <div className="border-b-main-950 dark:border-b-main-500 flex items-center border-b px-7 py-6 sm:max-lg:px-4">
          <span className="text-xl font-bold">Available</span>
        </div>
        <div
          className={cn("bg-main-600 dark:bg-main-900 grid gap-4 py-3 text-white md:px-4 lg:px-[30px]", {
            "grid-cols-[1fr_128px_128px_128px]": isConnected,
            "grid-cols-[1fr_128px_128px]": !isConnected,
          })}
        >
          <TableHeaderCell className="grow justify-start gap-1">Asset</TableHeaderCell>
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
