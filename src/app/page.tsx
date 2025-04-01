"use client";

import { AboutUmbrella } from "@/app/components/AboutUmbrella/AboutUmbrella";
import { AssetsTable } from "@/app/components/AssetsTable/AssetsTable";
import { UnsupportedMarket } from "@/app/components/UnsupportedMarket";
import { Mobile } from "@/components/MediaQueries/MediaQueries";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useAllAssets } from "@/hooks/useAllAssets";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { withAtLeastOneActiveReward, withPositiveBalance } from "@/utils/filters/filters";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { UmbrellaTable } from "./components/UmbrellaTable/UmbrellaTable";

export default function Home() {
  const { address } = useAccount();

  const { data: stkTokens, isLoading: isAllStkTokensLoading } = useAllStkTokens();
  const { data: assets, isLoading: isAllAssetsLoading } = useAllAssets();

  const filteredAssets = useMemo(() => {
    const assetsWithAtLeastOneActiveReward = assets.filter(withAtLeastOneActiveReward);

    if (address) {
      return assetsWithAtLeastOneActiveReward.filter(withPositiveBalance);
    }

    return assetsWithAtLeastOneActiveReward.filter((asset) => {
      return asset.type === "underlying" || asset.type === "native";
    });
  }, [assets, address]);
  const filteredUmbrellaTokens = useMemo(() => stkTokens?.filter(withPositiveBalance), [stkTokens]);

  if (isAllStkTokensLoading || isAllAssetsLoading) {
    return <PageLoader />;
  }

  if (!stkTokens) {
    return <UnsupportedMarket />;
  }

  return (
    <main className="mx-auto mb-auto flex w-full max-w-(--mobile-container) flex-col gap-12 md:max-w-(--breakpoint-lg)">
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
