import { Address } from "viem";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useMutation } from "@tanstack/react-query";
import { signRewardsClaiming } from "@/mutations/signRewardsClaiming";

export type ClaimRewardsParams = {
  owner: Address;
  umbrellaAddress: Address;
  rewardAddresses: Address[];
};

export const useSignClaimPermit = () => {
  const { chainId, rewardsController, batchHelper } = useMarketStore((store) => store.market);
  return useMutation({
    mutationFn: ({ owner, umbrellaAddress, rewardAddresses }: ClaimRewardsParams) => {
      return signRewardsClaiming({
        owner,
        address: rewardsController,
        batchHelper,
        chainId,
        asset: umbrellaAddress,
        rewards: rewardAddresses,
      });
    },
  });
};
