import { HealthFactorBreakdown } from "@/app/stake/a/[address]/components/StakeATokenForm/HealthFactorBreakdown";
import { StakeATokenFormValues } from "@/app/stake/a/[address]/stakeATokenFormSchema";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
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

  const { reserveId, name, decimals, symbol, balance, latestAnswer } = reserve;
  const newBalance = balance! - amount;

  return (
    <TransactionCard title="Details">
      <SummarySection title="You are staking">
        <TokenBreakdown
          name={name}
          type="a"
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

      <SummarySection title="Health factor">
        <HealthFactorBreakdown reserveId={reserveId} newBalance={newBalance} positions={reserves} />
      </SummarySection>

      <APYAndEarningsForecast amount={amount} initialTokenType="a" stkToken={stkToken} />

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
