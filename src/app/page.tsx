"use client";

import { PageLoader } from "@/components/PageLoader/PageLoader";
import { UnsupportedMarket } from "@/app/components/UnsupportedMarket";
import React, { useMemo } from "react";
import { UmbrellaTable } from "@/app/components/UmbrellaTable/UmbrellaTable";
import { AssetsTable } from "@/app/components/AssetsTable/AssetsTable";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { withPositiveBalance } from "@/utils/filters";
import { useAllAssets } from "@/hooks/useAllAssets";

export default function Home() {
  const { data: stkTokens, isLoading: isAllStkTokensLoading } =
    useAllStkTokens();
  const { data: assets, isLoading: isAllAssetsLoading } = useAllAssets();

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const hasRewardsToClaim =
        asset.rewards.length > 0 &&
        asset.rewards.every(
          (reward) => !!reward.currentEmissionPerSecondScaled,
        );
      return hasRewardsToClaim;
    });
  }, [assets]);
  const filteredUmbrellaTokens = useMemo(
    () => stkTokens?.filter(withPositiveBalance),
    [stkTokens],
  );

  if (isAllStkTokensLoading || isAllAssetsLoading) {
    return <PageLoader />;
  }

  if (!stkTokens) {
    return <UnsupportedMarket />;
  }

  return (
    <main className="mx-auto mb-auto flex w-full max-w-(--mobile-container) md:max-w-(--breakpoint-lg) flex-col gap-12">
      {filteredUmbrellaTokens && filteredUmbrellaTokens.length > 0 && (
        <UmbrellaTable data={filteredUmbrellaTokens} assets={filteredAssets} />
      )}

      <div className="flex flex-col">
        <AssetsTable data={filteredAssets} />
      </div>
    </main>
  );
}
