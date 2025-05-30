import { StakeStataFormValues } from "@/app/stake/stata/[address]/stakeStataTokenFormSchema";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenChangeBreakdown } from "@/components/Transaction/TokenChangeBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { StataToken, StkToken } from "@/types/token";
import { useFormContext, useWatch } from "react-hook-form";

export type StakeStataTokenSummaryProps = {
  token: StataToken;
  stkToken: StkToken;
  hash?: string;
};

export const StakeStataTokenSummary = ({ token, stkToken }: StakeStataTokenSummaryProps) => {
  const { control } = useFormContext<StakeStataFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const approval = useWatch({ control, name: "approval" });

  const { decimals, latestAnswer, reserve } = token;
  const { symbol } = reserve;

  return (
    <TransactionCard title="Details">
      <TokenChangeBreakdown
        fromType="stata"
        toType="stkStata"
        decimals={decimals}
        symbol={symbol}
        amount={amount}
        usdPrice={latestAnswer}
      />

      <APYAndEarningsForecast amount={amount} sourceTokenType="stata" stkToken={stkToken} />

      {approval?.txHash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
