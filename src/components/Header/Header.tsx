"use client";

import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { BlockSelect } from "@/components/BlockSelect/BlockSelect";
import { ThemeToggleButton } from "@/components/ThemeToggleButton/ThemeToggleButton";
import { Wallet } from "@/components/Wallet/Wallet";
import { config } from "@/configs/wagmi";
import { MARKETS } from "@/constants/markets";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { findMarketById } from "@/utils/markets/markets";
import { switchChain } from "@wagmi/core";
import Link from "next/link";
import UmbrellaLogoIcon from "../../../public/images/umbrella-logo.svg";
import { Button } from "../ui/Button";

const items = MARKETS.map((market) => ({
  label: (
    <div className="flex items-center gap-2">
      <AssetIcon chainId={market.chainId} className="size-4" />
      <div>{market.name}</div>
    </div>
  ),
  value: market.id,
}));

export const Header = () => {
  const market = useCurrentMarket();
  const setMarket = useMarketStore((store) => store.setMarket);

  const handleMarketChange = (marketId: string) => {
    const newMarket = findMarketById(marketId);

    if (!newMarket) {
      return;
    }

    setMarket(marketId);
    switchChain(config, { chainId: newMarket.chainId });
  };

  return (
    <header className="mx-auto mb-5 flex w-full max-w-(--mobile-container) flex-wrap items-center justify-between gap-y-9 py-6 md:max-w-(--breakpoint-lg)">
      <div className="order-1 flex basis-[30%] md:basis-1/3">
        <Link href="/" className="flex items-center gap-3">
          <UmbrellaLogoIcon className="text-main-950 w-[130px] md:w-[211px] dark:text-white" />
        </Link>
      </div>

      <div className="order-3 flex basis-[100%] justify-center md:order-2 md:basis-1/3">
        <BlockSelect
          placeholder="Select Market"
          items={items}
          value={market.id}
          onValueChange={handleMarketChange}
          className="h-[38px] not-md:w-full"
        />
      </div>

      <div className="order-2 flex basis-[60%] justify-end md:order-3 md:basis-1/3">
        <div className="flex items-center gap-3 md:gap-5">
          <Wallet />

          <div className="flex not-md:hidden">
            <Button href="/docs" elevation={1} size="lg">
              <span className="flex size-5 flex-col items-center justify-center">
                <span className="bg-main-950 mb-0.5 size-[3.5px] rounded-full dark:bg-white" />
                <span className="bg-main-950 h-3 w-[3.5px] dark:bg-white" />
              </span>
            </Button>
          </div>

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
