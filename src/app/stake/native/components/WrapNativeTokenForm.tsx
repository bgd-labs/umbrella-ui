import {
  createStakeNativeTokenFormSchema,
  StakeNativeTokenFormValues,
} from "@/app/stake/native/stakeNativeTokenFormSchema";
import { ControlledAmountField } from "@/components/ControlledAmountField/ControlledAmountField";
import { SignTransaction } from "@/components/SignTransaction/SignTransaction";
import { APYAndEarningsForecast } from "@/components/Transaction/APYAndEarningsForecast";
import { SummarySection } from "@/components/Transaction/SummarySection";
import { TokenBreakdown } from "@/components/Transaction/TokenBreakdown";
import { TransactionBreakdown } from "@/components/Transaction/TransactionBreakdown";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useStake } from "@/hooks/useStake";
import { useSafeWrapAndStake } from "@/hooks/useWrapAndStake";
import { useWrapNativeToken } from "@/hooks/useWrapNativeToken";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";
import { NativeToken } from "@/types/token";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayersIcon } from "lucide-react";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { formatUnits } from "viem";

export type WrapNativeTokenFormProps = {
  nativeToken: NativeToken;
};

export const WrapNativeTokenForm = ({ nativeToken }: WrapNativeTokenFormProps) => {
  const { batchHelper: spender } = useCurrentMarket();
  const isSafeWallet = useIsSafeWallet();

  const { signingStatus } = useTxFormSignature();

  const { wrap, data: wrapHash, isPending: isWrapping, error: wrapNativeTokenError } = useWrapNativeToken();
  const { stake, data: depositHash, isPending: isStaking, error: depositError } = useStake();
  const { safeWrapAndStake, data: safeHash, isPending: isSafeStaking, error: safeDepositError } = useSafeWrapAndStake();

  const { name, decimals, symbol, balance, stkToken } = nativeToken;
  const maxAmount = balance || 0n;

  const schema = useMemo(
    () => createStakeNativeTokenFormSchema({ maxAmount, isSafeWallet }),
    [maxAmount, isSafeWallet],
  );
  const formMethods = useForm<StakeNativeTokenFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      wrappedAmount: 0n,
    },
    mode: "onChange",
  });
  const { getFieldState, formState, watch } = formMethods;
  const amountFieldState = getFieldState("amount", formState);
  const approval = watch("approval");

  const handleWrapClick = async () => {
    const amount = formMethods.getValues("amount");
    if (!amount) {
      return;
    }
    await wrap({
      amount,
      description: `Wrap ${formatUnits(amount, decimals)} ${nativeToken.symbol}`,
    });
    formMethods.setValue("wrappedAmount", amount, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (formValues: StakeNativeTokenFormValues) => {
    if (!formValues.amount) {
      return;
    }

    if (isSafeWallet) {
      safeWrapAndStake({
        umbrellaAddress: stkToken.address,
        assetAddress: nativeToken.stkToken.underlying.address,
        amount: formValues.amount,
      });
    } else {
      stake({
        amount: formValues.amount,
        umbrellaAddress: stkToken.address,
        assetAddress: nativeToken.stkToken.underlying.address,
        permit: formValues.permit,
        description: `Stake ${formatUnits(formValues.amount, decimals)} ${symbol}`,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <TransactionCard
        title="Stake native token"
        hash={wrapHash}
        safeHash={safeHash}
        loading={isStaking || isSafeStaking}
        error={wrapNativeTokenError || depositError || safeDepositError}
      >
        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold">Select amount</h2>

          <Controller
            name="amount"
            control={formMethods.control}
            disabled={signingStatus === "pending" || isWrapping || !!wrapHash}
            render={({ field }) => (
              <ControlledAmountField
                {...field}
                autoFocus
                maxValue={maxAmount}
                decimals={decimals}
                usdPrice={nativeToken.stkToken.underlying.latestAnswer}
              />
            )}
          />
        </div>

        {isSafeWallet ? (
          <div className="flex flex-col gap-4 self-center">
            <Button
              primary
              elevation={1}
              onClick={formMethods.handleSubmit(onSubmit)}
              loading={isSafeStaking}
              disabled={isSafeStaking || !formState.isValid}
              outerClassName="w-[248px]"
              className="flex items-center gap-2"
            >
              <LayersIcon size={14} />
              Approve & Stake
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:self-center">
            <Button
              primary
              elevation={1}
              onClick={handleWrapClick}
              loading={isWrapping}
              disabled={isWrapping || amountFieldState.invalid || !amountFieldState.isDirty || !!wrapHash}
              outerClassName="w-full md:w-[248px]"
              className="flex items-center gap-2"
            >
              Wrap
            </Button>

            <SignTransaction asset={nativeToken.stkToken.underlying.address} spender={spender} disabled={!wrapHash} />

            <Button
              primary
              elevation={1}
              onClick={formMethods.handleSubmit(onSubmit)}
              loading={isStaking}
              disabled={isStaking || !formState.isValid}
              outerClassName="w-full md:w-[248px]"
              className="flex items-center gap-2"
            >
              <LayersIcon size={14} />
              Stake
            </Button>
          </div>
        )}
      </TransactionCard>

      <TransactionCard title="Details">
        <SummarySection title="You are staking">
          <TokenBreakdown
            name={name}
            type="underlying"
            decimals={decimals}
            symbol={symbol}
            amount={formMethods.getValues("amount") ?? 0n}
            usdPrice={stkToken.underlying.latestAnswer}
          />
        </SummarySection>

        <SummarySection title="You will receive">
          <TokenBreakdown
            name={nativeToken.stkToken.underlying.name}
            type="stk"
            decimals={nativeToken.stkToken.underlying.decimals}
            symbol={nativeToken.stkToken.underlying.symbol}
            amount={formMethods.getValues("amount") ?? 0n}
            usdPrice={nativeToken.stkToken.latestAnswer}
          />
        </SummarySection>

        <APYAndEarningsForecast
          amount={formMethods.getValues("amount") ?? 0n}
          initialTokenType="native"
          stkToken={stkToken}
        />

        {approval?.txHash && (
          <SummarySection title="Approval hash">
            <TransactionBreakdown hash={approval?.txHash} />
          </SummarySection>
        )}

        {wrapHash && (
          <SummarySection title="Wrapping native token hash">
            <TransactionBreakdown hash={wrapHash} />
          </SummarySection>
        )}

        {depositHash && (
          <SummarySection title="Transaction hash">
            <TransactionBreakdown hash={depositHash} />
          </SummarySection>
        )}
      </TransactionCard>
    </FormProvider>
  );
};
