"use client";

import Link from "next/link";
import { BlockSelect } from "@/components/BlockSelect/BlockSelect";
import { MARKETS } from "@/constants/markets";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { Wallet } from "@/components/Wallet/Wallet";
import { switchChain } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { findMarketById } from "@/utils/markets/markets";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { ThemeToggleButton } from "@/components/ThemeToggleButton/ThemeToggleButton";
import UmbrellaLogoIcon from "../../../public/images/umbrella-logo.svg";
import { InfoModal } from "@/components/InfoModal/InfoModal";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

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
    <header className="mx-auto mb-5 flex flex-wrap w-full max-w-(--mobile-container) items-center justify-between gap-y-9 py-6 md:max-w-(--breakpoint-lg)">
      <div className="flex basis-[30%] md:basis-1/3 order-1">
        <Link href="/" className="flex items-center gap-3">
          <UmbrellaLogoIcon className="text-main-950 w-[130px] md:w-[211px] dark:text-white" />
        </Link>
      </div>

      <div className="flex basis-[100%] md:basis-1/3 justify-center order-3 md:order-2">
        <BlockSelect
          placeholder="Select Market"
          items={items}
          value={market.id}
          onValueChange={handleMarketChange}
          className="not-md:w-full h-[38px]"
        />
      </div>

      <div className="flex basis-[60%] md:basis-1/3 justify-end order-2 md:order-3">
        <div className="flex items-center gap-3 md:gap-5">
          <Wallet />

          <div className="flex not-md:hidden">
            <InfoModal />
          </div>

          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};
