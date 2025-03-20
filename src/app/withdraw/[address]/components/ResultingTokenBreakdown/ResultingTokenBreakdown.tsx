import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
import React from "react";
import { StkToken, TokenType } from "@/types/token";
import { useAllStataTokens } from "@/hooks/useAllStataTokens";

const StataTokenBreakdown = ({
  stkToken,
  amount,
}: {
  stkToken: StkToken;
  amount: string | bigint;
}) => {
  const { data: stataTokens } = useAllStataTokens();
  const resultingStataToken = stataTokens?.find(
    (token) => token.underlying.address === stkToken.underlying.address,
  );

  return (
    <TokenBreakdown
      name={stkToken.underlying.name}
      type="stata"
      decimals={stkToken.decimals}
      symbol={stkToken.underlying.symbol}
      amount={amount}
      usdPrice={resultingStataToken?.latestAnswer || stkToken.latestAnswer}
    />
  );
};

export type ResultingTokenBreakdownProps = {
  stkToken: StkToken;
  type: TokenType;
  amount: string | bigint;
};

export const ResultingTokenBreakdown = ({
  stkToken,
  type,
  amount,
}: ResultingTokenBreakdownProps) => {
  if (type === "stata") {
    return <StataTokenBreakdown stkToken={stkToken} amount={amount} />;
  }

  if (type === "a") {
    return (
      <TokenBreakdown
        name={stkToken.underlying.name}
        type={type}
        decimals={stkToken.decimals}
        symbol={stkToken.underlying.symbol}
        amount={amount}
        usdPrice={stkToken.reserve!.latestAnswer}
      />
    );
  }

  return (
    <TokenBreakdown
      name={stkToken.underlying.name}
      type={type}
      decimals={stkToken.decimals}
      symbol={stkToken.underlying.symbol}
      amount={amount}
      usdPrice={stkToken.underlying.latestAnswer}
    />
  );
};
