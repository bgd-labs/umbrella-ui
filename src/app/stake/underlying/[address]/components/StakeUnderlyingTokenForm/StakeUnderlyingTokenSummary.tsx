import { StakeUnderlyingFormValues } from "@/app/stake/underlying/[address]/stakeUnderlyingFormSchema";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenChangeBreakdown } from "@/components/Transaction/TokenChangeBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { StkToken } from "@/types/token";
import { rayDiv } from "@/utils/math/ray-math";
import { useFormContext, useWatch } from "react-hook-form";

const calculateScaledAmount = ({ amount, liquidityIndex }: { amount: bigint; liquidityIndex: bigint }) => {
  return rayDiv(amount, liquidityIndex);
};

export type StakeUnderlyingTokenSummaryProps = {
  stkToken: StkToken;
  hash?: string;
};

export const StakeUnderlyingTokenSummary = ({ stkToken, hash }: StakeUnderlyingTokenSummaryProps) => {
  const { control } = useFormContext<StakeUnderlyingFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const approval = useWatch({ control, name: "approval" });

  const { decimals, symbol, reserve, latestAnswer } = stkToken.underlying;
  const liquidityIndex = reserve?.liquidityIndex;

  const amountScaled = liquidityIndex ? calculateScaledAmount({ amount, liquidityIndex }) : amount;

  return (
    <TransactionCard title="Details">
      <TokenChangeBreakdown
        fromType="underlying"
        toType="stkStata"
        decimals={decimals}
        symbol={symbol}
        amount={amount}
        usdPrice={latestAnswer}
      />

      <APYAndEarningsForecast amount={amountScaled} initialTokenType="underlying" stkToken={stkToken} />

      {approval?.txHash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
