import { StakeStataFormValues } from "@/app/stake/stata/[address]/stakeStataTokenFormSchema";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { StataToken, StkToken } from "@/types/token";
import { useFormContext, useWatch } from "react-hook-form";

export type StakeStataTokenSummaryProps = {
  token: StataToken;
  stkToken: StkToken;
  hash?: string;
};

export const StakeStataTokenSummary = ({ token, stkToken, hash }: StakeStataTokenSummaryProps) => {
  const { control } = useFormContext<StakeStataFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const approval = useWatch({ control, name: "approval" });

  const { decimals, latestAnswer, reserve } = token;
  const { name, symbol } = reserve;

  return (
    <TransactionCard title="Details">
      <SummarySection title="You are staking">
        <TokenBreakdown
          name={name}
          type="stata"
          decimals={decimals}
          symbol={symbol}
          amount={amount}
          usdPrice={latestAnswer}
        />
      </SummarySection>

      <SummarySection title="You will receive">
        <TokenBreakdown
          name={name}
          type="stk"
          decimals={decimals}
          symbol={symbol}
          amount={amount}
          usdPrice={stkToken.latestAnswer}
        />
      </SummarySection>

      <APYAndEarningsForecast amount={amount} initialTokenType="stata" stkToken={stkToken} />

      {approval?.txHash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}

      {hash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={hash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
