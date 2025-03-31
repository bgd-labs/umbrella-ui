import { EMode } from "@/types/eMode";
import { Address } from "viem";

export type TokenType = "underlying" | "a" | "stata" | "stk" | "stkStata";

export type Token = {
  address: Address;
  type: TokenType;
  name: string;
  decimals: number;
  symbol: string;
  balance?: bigint;
  balanceFormatted?: number;
};

export type UserReserveData = {
  underlyingAddress: Address;
  balanceScaled: bigint;
  variableDeptScaled: bigint;
  eModeId: number;
};

export type ReserveData = {
  reserveId: number;
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  underlyingAddress: Address;
  variableDebtAddress: Address;
  isActive: boolean;
  isFrozen: boolean;
  isPaused: boolean;
  usingAsCollateral: boolean;
  latestAnswer: bigint;
  latestAnswerFormatted: number;
  priceFeedDecimals: number;
  liquidityIndex: bigint;
  liquidityRate: bigint;
  liquidationThreshold: bigint;
  variableBorrowIndex: bigint;
  variableBorrowRate: bigint;
  lastUpdateTimestamp: number;
  totalVariableDebtScaled: bigint;
  borrowCap: bigint;
  supplyCap: bigint;
  accruedToTreasury: bigint;
};

export type Reserve = ReserveData & {
  type: "a";
  apy: number;
  balance?: bigint;
  balanceFormatted?: number;
  balanceScaled?: bigint;
  usdAmount?: number;
  variableDeptScaled?: bigint;
  eMode: EMode | null;
};

export type TokenPrice = {
  latestAnswer: bigint;
  latestAnswerFormatted: number;
  usdAmount?: number;
};

export type Reward = Token &
  TokenPrice & {
    type: "underlying";
    currentEmissionPerSecondScaled: bigint;
    apy: number;
  };

export type UnderlyingToken = Token &
  TokenPrice & {
    type: "underlying";
    reserve: Reserve | null;
  };

export type StataToken = Token &
  TokenPrice & {
    type: "stata";
    underlying: UnderlyingToken;
    reserve: Reserve;
  };

export type StkToken = Token &
  TokenPrice & {
    type: "stk";
    totalAssets: bigint;
    totalRewardsUSDAmount: number;
    isUnderlyingStataToken: boolean;
    rewards: Reward[];
    reserve: Reserve | null;
    apyData: ApyData;
    underlying: UnderlyingToken;
    stata: StataToken | null;
  };

export type ApyDataComponent = {
  apy: number;
  reward: Reward;
};

export type ApyData = {
  total: number;
  pool: {
    total: number;
  };
  rewards: {
    total: number;
    components: ApyDataComponent[];
  };
};

export type NativeToken = TokenPrice & {
  address: Address;
  type: "native";
  name: string;
  decimals: number;
  symbol: string;
  balance?: bigint;
  balanceFormatted?: number;
  stkToken: StkToken;
};

export type Asset = {
  address: Address;
  type: "underlying" | "a" | "stata" | "native";
  name: string;
  decimals: number;
  symbol: string;
  balance?: bigint;
  balanceFormatted?: number;
  usdAmount?: number;
  reserve?: Reserve;
  rewards: Reward[];
};
