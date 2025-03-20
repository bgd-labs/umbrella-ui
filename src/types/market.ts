import { Address } from "viem";
import { appChains } from "@/configs/wagmi";

export type ChainId = (typeof appChains)[number]["id"];

export type Market = {
  id: string;
  name: string;
  chainId: ChainId;
  pool: Address;
  poolProvider: Address;
  uiPoolDataProvider: Address;
  dataProvider?: Address;
  rewardsController: Address;
  umbrellaHelper: Address;
  batchHelper: Address;
  oracle: Address;
  umbrellaDataAggregationHelper: Address;
  wrapNativeTokenAddress: Address;
};
