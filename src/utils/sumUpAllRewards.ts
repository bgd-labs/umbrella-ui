import { StkToken } from "@/types/token";

export const sumUpAllRewards = (stkTokens?: StkToken[]) =>
  stkTokens?.reduce((acc, { totalRewardsUSDAmount }) => acc + totalRewardsUSDAmount, 0) ?? 0;
