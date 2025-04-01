import { ResultingTokenBreakdown } from "@/app/withdraw/[address]/components/ResultingTokenBreakdown/ResultingTokenBreakdown";
import { WithdrawalFormValues } from "@/app/withdraw/[address]/withdrawalFormSchema";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { StkToken } from "@/types/token";
import { getTokenTypeByWithdrawalMethod } from "@/utils/web3";
import { useFormContext, useWatch } from "react-hook-form";

export type SummaryProps = {
  stkToken: StkToken;
  txHash?: string;
};

export const Summary = ({ stkToken, txHash }: SummaryProps) => {
  const { control } = useFormContext<WithdrawalFormValues>();
  const amount = useWatch({ control, name: "amount" }) ?? 0n;
  const withdrawalMethod = useWatch({ control, name: "withdrawalMethod" });
  const approval = useWatch({ control, name: "approval" });

  const resultingTokenType = getTokenTypeByWithdrawalMethod(withdrawalMethod);

  return (
    <TransactionCard title="Details">
      <SummarySection title="You are withdrawing">
        <TokenBreakdown
          name={stkToken.underlying.name}
          type="stk"
          decimals={stkToken.decimals}
          symbol={stkToken.underlying.symbol}
          amount={amount}
          usdPrice={stkToken.latestAnswer}
        />
      </SummarySection>

      <SummarySection title="You will receive">
        <ResultingTokenBreakdown stkToken={stkToken} type={resultingTokenType} amount={amount} />
      </SummarySection>

      {approval?.txHash && (
        <SummarySection title="Approval hash">
          <TransactionBreakdown hash={approval?.txHash} />
        </SummarySection>
      )}

      {txHash && (
        <SummarySection title="Transaction hash">
          <TransactionBreakdown hash={txHash} />
        </SummarySection>
      )}
    </TransactionCard>
  );
};
