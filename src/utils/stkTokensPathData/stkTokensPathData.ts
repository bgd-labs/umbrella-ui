import { StataToken, TokenType, UnderlyingToken } from "@/types/token";
import { Address } from "viem";
import { formatBigInt } from "../formatBigInt";
import { formatUSDPrice } from "../formatUSDPrice";

export const TOKEN_TYPE_IN_PATH_DATA: Record<Extract<TokenType, "underlying" | "a" | "stata">, number> = {
  underlying: 1,
  a: 2,
  stata: 3,
} as const;

export type StkTokenPathData = {
  stakeToken: Address;
  tokensFromRoute: {
    typeOfToken: number;
    tokenData: {
      token: Address;
      price: bigint;
      name: string;
      symbol: string;
      decimals: number;
    };
  }[];
};

export type UserPathData = {
  stakeToken: Address;
  balancesOfRouteTokens: readonly {
    typeOfToken: number;
    token: Address;
    userBalance: bigint;
  }[];
};

export const findReserveAddressInPathData = (data: StkTokenPathData) => {
  const tokenData = findTokenInPathData(data, "a");
  return tokenData?.tokenData.token;
};

export const findTokenInPathData = (
  data: StkTokenPathData,
  tokenType: Extract<TokenType, "underlying" | "a" | "stata">,
) => {
  const typeOfToken = TOKEN_TYPE_IN_PATH_DATA[tokenType];
  return data.tokensFromRoute.find((routeData) => routeData.typeOfToken === typeOfToken);
};

export const extractUnderlyingToken = (
  pathData: StkTokenPathData,
  userPathData: UserPathData | undefined,
): UnderlyingToken => {
  const underlyingToken = findTokenInPathData(pathData, "underlying")!.tokenData;
  const userTokenData = userPathData?.balancesOfRouteTokens.find(
    (token) => token.typeOfToken === TOKEN_TYPE_IN_PATH_DATA.underlying,
  );

  return {
    type: "underlying",
    address: underlyingToken.token,
    name: underlyingToken.name,
    decimals: underlyingToken.decimals,
    symbol: underlyingToken.symbol,
    balance: userTokenData?.userBalance,
    balanceFormatted: formatBigInt(userTokenData?.userBalance, underlyingToken.decimals),
    latestAnswer: underlyingToken.price,
    latestAnswerFormatted: formatBigInt(underlyingToken.price, underlyingToken.decimals),
    usdAmount: formatUSDPrice({
      balance: userTokenData?.userBalance,
      decimals: underlyingToken.decimals,
      usdPrice: underlyingToken.price,
    }),
    reserve: null,
  };
};

export const extractStataToken = (
  pathData: StkTokenPathData,
  userPathData: UserPathData | undefined,
): Omit<StataToken, "reserve" | "underlying"> | null => {
  const stataToken = findTokenInPathData(pathData, "stata")?.tokenData;
  const userTokenData = userPathData?.balancesOfRouteTokens.find(
    (token) => token.typeOfToken === TOKEN_TYPE_IN_PATH_DATA.stata,
  );

  if (!stataToken) {
    return null;
  }

  return {
    type: "stata",
    address: stataToken.token,
    name: stataToken.name,
    decimals: stataToken.decimals,
    symbol: stataToken.symbol,
    balance: userTokenData?.userBalance,
    balanceFormatted: formatBigInt(userTokenData?.userBalance, stataToken.decimals),
    latestAnswer: stataToken.price,
    latestAnswerFormatted: formatBigInt(stataToken.price, stataToken.decimals),
    usdAmount: formatUSDPrice({
      balance: userTokenData?.userBalance,
      decimals: stataToken.decimals,
      usdPrice: stataToken.price,
    }),
  };
};
