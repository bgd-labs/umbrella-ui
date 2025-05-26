import { Reward } from "@/types/token";

export const withPositiveBalance = ({ balance }: { balance?: bigint }) => {
  return !!balance && balance > 0n;
};

export const withAtLeastOneActiveReward = ({ rewards }: { rewards: Reward[] }) => {
  return rewards.length > 0 && rewards.some((reward) => !!reward.apy);
};
