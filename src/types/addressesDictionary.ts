import { Address } from "viem";

export type UmbrellaAssetsDictionary = {
  underlying: Address;
  aToken?: Address;
  stataToken?: Address;
};
