import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
import { StkToken, TokenType } from "@/types/token";

const StataTokenBreakdown = ({ stkToken, amount }: { stkToken: StkToken; amount: string | bigint }) => {
  const stataToken = stkToken.stata;

  if (!stataToken) {
    return null;
  }

  return (
    <TokenBreakdown
      name={stkToken.underlying.name}
      type="stata"
      decimals={stkToken.decimals}
      symbol={stkToken.underlying.symbol}
      amount={amount}
      usdPrice={stataToken.latestAnswer}
    />
  );
};

export type ResultingTokenBreakdownProps = {
  stkToken: StkToken;
  type: TokenType;
  amount: string | bigint;
};

export const ResultingTokenBreakdown = ({ stkToken, type, amount }: ResultingTokenBreakdownProps) => {
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
