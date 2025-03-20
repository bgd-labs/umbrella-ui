import { Address } from "viem";

export type PermitVRS = { v: number; r: `0x${string}`; s: `0x${string}` };

export type Permit = PermitVRS & {
  token: Address;
  owner: Address;
  spender: Address;
  value: bigint;
  deadline: bigint;
  nonce: bigint;
};

export type ClaimRewardsPermit = PermitVRS & {
  stakeToken: Address;
  receiver: Address;
  restake: boolean;
  rewards: Address[];
  deadline: bigint;
  nonce: bigint;
};
