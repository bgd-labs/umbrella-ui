import { appChains } from "@/configs/wagmi";
import { Address } from "viem";

export type ChainId = (typeof appChains)[number]["id"];

export type Market = {
  id: string;
  name: string;
  chainId: ChainId;
  poolProvider: Address;
  uiPoolDataProvider: Address;
  rewardsController: Address;
  umbrellaHelper: Address;
  batchHelper: Address;
  oracle: Address;
  umbrellaDataAggregationHelper: Address;
  wrapNativeTokenAddress: Address;
};
