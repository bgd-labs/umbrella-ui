import { signRewardsClaiming } from "@/mutations/signRewardsClaiming";
import { useMutation } from "@tanstack/react-query";
import { Address } from "viem";
import { useCurrentMarket } from "../useCurrentMarket";

export type ClaimRewardsParams = {
  owner: Address;
  umbrellaAddress: Address;
  rewardAddresses: Address[];
};

export const useSignClaimPermit = () => {
  const { chainId, rewardsController, batchHelper } = useCurrentMarket();
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
