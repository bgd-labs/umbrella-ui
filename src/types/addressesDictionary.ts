import { Address } from "viem";

export type UnderlyingAssetsDictionary = {
  aToken?: Address;
  stataToken?: Address;
  umbrella: Address;
};

export type AaveAssetsDictionary = {
  underlying: Address;
  stataToken: Address;
  umbrella: Address;
};

export type StataAssetsDictionary = {
  underlying: Address;
  aToken: Address;
  stataToken: Address;
  umbrella: Address;
};

export type UmbrellaAssetsDictionary = {
  underlying: Address;
  aToken?: Address;
  stataToken?: Address;
};

export type AssetsDictionary = {
  underlying: Record<Address, UnderlyingAssetsDictionary>;
  aToken: Record<Address, AaveAssetsDictionary>;
  stataToken: Record<Address, StataAssetsDictionary>;
  umbrella: Record<Address, UmbrellaAssetsDictionary>;
};
