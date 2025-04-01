"use client";

import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { UmbrellaRewardsBreakdown } from "@/components/UmbrellaRewardsBreakdown/UmbrellaRewardsBreakdown";
import { useAllStkTokens } from "@/hooks/useAllStkTokens";
import { useClaimSelectedRewards } from "@/hooks/useClaimSelectedRewards/useClaimSelectedRewards";
import { useSafeClaimSelectedRewards } from "@/hooks/useClaimSelectedRewards/useSafeClaimSelectedRewards";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useWalletAddress } from "@/providers/WalletProvider/WalletContext";
import { withPositiveBalance } from "@/utils/filters/filters";
import { use } from "react";
import { Address } from "viem";

export type ClaimRewardsPageProps = {
  params: Promise<{ address: Address }>;
};

export default function ClaimRewardsPage(props: ClaimRewardsPageProps) {
  const { address: asset } = use(props.params);
  const isSafeWallet = useIsSafeWallet();

  const receiver = useWalletAddress();

  const { data: stkTokens, isLoading: isUmbrellasLoading } = useAllStkTokens();
  const stkToken = stkTokens?.find((token) => token.address === asset);

  const [safeClaim, { data: safeHash, isPending: isSafeClaiming, error: safeClaimError }] =
    useSafeClaimSelectedRewards();
  const [claim, { data: hash, isPending: isClaiming, error: claimError }] = useClaimSelectedRewards();

  if (isUmbrellasLoading) {
    return <PageLoader />;
  }

  if (!stkToken) {
    return null;
  }

  const handleClaim = () => {
    const rewards = stkToken.rewards.filter(withPositiveBalance).map((reward) => reward.address);

    if (isSafeWallet) {
      safeClaim({
        assets: asset,
        rewards,
        receiver,
        description: "Claim Selected Transactions",
      });
    } else {
      claim({
        assets: asset,
        rewards,
        receiver,
        description: "Claim Selected Transactions",
      });
    }
  };

  return (
    <PageContainer>
      <TransactionCard
        title="Claim Rewards"
        hash={hash}
        safeHash={safeHash}
        loading={isClaiming || isSafeClaiming}
        error={claimError || safeClaimError}
      >
        <UmbrellaRewardsBreakdown umbrella={stkToken} />

        <div className="flex items-center justify-end gap-3">
          <div className="text-main-950 text-[20px] font-bold">Total:</div>
          <NumberDisplay value={stkToken.totalRewardsUSDAmount} type="currency" className="text-[30px] font-semibold" />
        </div>

        <div className="flex w-[248px] self-center">
          <Button
            primary
            elevation={1}
            onClick={handleClaim}
            loading={isClaiming}
            disabled={isClaiming}
            className="flex items-center gap-2"
          >
            Claim Rewards
          </Button>
        </div>
      </TransactionCard>
    </PageContainer>
  );
}
