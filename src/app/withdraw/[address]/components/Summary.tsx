import { WithdrawalFormValues } from "@/app/withdraw/[address]/withdrawalFormSchema";
import { APYAndEarningsForecastWithdrawal } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenChangeBreakdown } from "@/components/Transaction/TokenChangeBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { StkToken } from "@/types/token";
import { getTokenTypeByWithdrawalMethod } from "@/utils/web3";
import { useFormContext, useWatch } from "react-hook-form";

export type SummaryProps = {
  stkToken: StkToken;
  txHash?: string;
};

export const Summary = ({ stkToken }: SummaryProps) => {
  const { control } = useFormContext<WithdrawalFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const withdrawalMethod = useWatch({ control, name: "withdrawalMethod" });
  const approval = useWatch({ control, name: "approval" });

  const resultingTokenType = getTokenTypeByWithdrawalMethod(withdrawalMethod);

  return (
    <TransactionCard title="Details">
      <TokenChangeBreakdown
        fromType={stkToken.isUnderlyingStataToken ? "stkStata" : "stk"}
        toType={resultingTokenType}
        symbol={stkToken.underlying.symbol}
        decimals={stkToken.decimals}
        amount={amount}
        usdPrice={stkToken.latestAnswer}
      />

      <APYAndEarningsForecastWithdrawal amount={amount} targetTokenType={resultingTokenType} stkToken={stkToken} />

      {approval?.txHash && (
        <SummarySection title="Approval hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
