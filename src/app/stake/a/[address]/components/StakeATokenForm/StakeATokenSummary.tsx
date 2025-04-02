import { HealthFactorBreakdown } from "@/app/stake/a/[address]/components/StakeATokenForm/HealthFactorBreakdown";
import { StakeATokenFormValues } from "@/app/stake/a/[address]/stakeATokenFormSchema";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenChangeBreakdown } from "@/components/Transaction/TokenChangeBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Reserve, StkToken } from "@/types/token";
import { useFormContext, useWatch } from "react-hook-form";

export type StakeATokenSummaryProps = {
  reserve: Reserve;
  stkToken: StkToken;
  hash?: string;
  reserves: Reserve[];
};

export const StakeATokenSummary = ({ reserve, stkToken, hash, reserves }: StakeATokenSummaryProps) => {
  const { control } = useFormContext<StakeATokenFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const approval = useWatch({ control, name: "approval" });

  const { reserveId, decimals, symbol, balance, latestAnswer } = reserve;
  const newBalance = balance! - amount;

  return (
    <TransactionCard title="Details">
      <TokenChangeBreakdown
        fromType="a"
        toType="stkStata"
        decimals={decimals}
        symbol={symbol}
        amount={amount}
        usdPrice={latestAnswer}
      />

      <HealthFactorBreakdown reserveId={reserveId} newBalance={newBalance} positions={reserves} />

      <APYAndEarningsForecast amount={amount} initialTokenType="a" stkToken={stkToken} />

      {approval?.txHash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
