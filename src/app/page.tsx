"use client";

import { PageLoader } from "@/components/PageLoader/PageLoader";
import { UnsupportedMarket } from "@/app/components/UnsupportedMarket";
import React, { useMemo } from "react";
import { UmbrellaTable } from "@/app/components/UmbrellaTable/UmbrellaTable";
import { AssetsTable } from "@/app/components/AssetsTable/AssetsTable";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import {
  withAtLeastOneActiveReward,
  withPositiveBalance,
} from "@/utils/filters";
import { useAllAssets } from "@/hooks/useAllAssets";
import { Mobile } from "@/components/MediaQueries/MediaQueries";
import { AboutUmbrella } from "@/app/components/AboutUmbrella/AboutUmbrella";

export default function Home() {
  const { data: stkTokens, isLoading: isAllStkTokensLoading } =
    useAllStkTokens();
  const { data: assets, isLoading: isAllAssetsLoading } = useAllAssets();

  const filteredAssets = useMemo(
    () => assets.filter(withAtLeastOneActiveReward),
    [assets],
  );
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

      <AssetsTable data={filteredAssets} />

      <Mobile>
        <AboutUmbrella />
      </Mobile>
    </main>
  );
}
