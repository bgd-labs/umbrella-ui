"use client";

import { AboutUmbrella } from "@/app/components/AboutUmbrella/AboutUmbrella";
import { AssetsTable } from "@/app/components/AssetsTable/AssetsTable";
import { UnsupportedMarket } from "@/app/components/UnsupportedMarket";
import { Mobile } from "@/components/MediaQueries/MediaQueries";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { useAllAssets } from "@/hooks/useAllAssets";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { withAtLeastOneActiveReward, withPositiveBalance } from "@/utils/data";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { NoRewardsOnMarket } from "./components/NoRewardsOnMarket/NoRewardsOnMarket";
import { UmbrellaTable } from "./components/UmbrellaTable/UmbrellaTable";

export default function Home() {
  const { isConnected } = useAccount();

  const { data: stkTokens, isLoading: isAllStkTokensLoading } = useAllStkTokens();
  const { data: assets, isLoading: isAllAssetsLoading } = useAllAssets();

  const filteredAssets = useMemo(() => {
    const assetsWithAtLeastOneActiveReward = assets.filter(withAtLeastOneActiveReward);
    return assetsWithAtLeastOneActiveReward.filter((asset) => {
      if (asset.type !== "underlying" && asset.type !== "native") {
        return withPositiveBalance(asset);
      }
      return true;
    });
  }, [assets]);
  const umbrellaPositions = useMemo(() => stkTokens?.filter(withPositiveBalance), [stkTokens]);

  const noRewardsOnMarket = filteredAssets.length === 0;
  const noUmbrellaToWithdrawOrClaimRewards = umbrellaPositions?.length === 0;

  if (isAllStkTokensLoading || isAllAssetsLoading) {
    return <PageLoader />;
  }

  if (!stkTokens) {
    return <UnsupportedMarket />;
  }

  if (isConnected ? noUmbrellaToWithdrawOrClaimRewards && noRewardsOnMarket : noRewardsOnMarket) {
    return <NoRewardsOnMarket />;
  }

  return (
    <main className="mx-auto mb-auto flex w-full max-w-(--mobile-container) flex-col gap-12 md:max-w-(--breakpoint-lg)">
      {umbrellaPositions && umbrellaPositions.length > 0 && (
        <UmbrellaTable data={umbrellaPositions} assets={filteredAssets} />
      )}

      {filteredAssets.length > 0 && <AssetsTable data={filteredAssets} />}

      <Mobile>
        <AboutUmbrella />
      </Mobile>
    </main>
  );
}
