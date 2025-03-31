import { StakeUnderlyingTokenSummary } from "@/app/stake/underlying/[address]/components/StakeUnderlyingTokenForm/StakeUnderlyingTokenSummary";
import {
  createStakeFormSchema,
  StakeUnderlyingFormValues,
} from "@/app/stake/underlying/[address]/stakeUnderlyingFormSchema";
import { ControlledAmountField } from "@/components/ControlledAmountField/ControlledAmountField";
import { SignTransaction } from "@/components/SignTransaction/SignTransaction";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useSafeApproveAndStake } from "@/hooks/useSafeApproveAndStake";
import { useStake } from "@/hooks/useStake";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";
import { StkToken } from "@/types/token";
import { calculateMaxSupply } from "@/utils/calaculteMaxAmountForReserve";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayersIcon } from "lucide-react";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Address, formatUnits } from "viem";

export type StakeUnderlyingTokenFormProps = {
  asset: Address;
  stkToken: StkToken;
  totalSupplied: bigint | undefined;
};

export const StakeUnderlyingTokenForm = ({ asset, stkToken, totalSupplied }: StakeUnderlyingTokenFormProps) => {
  const { batchHelper: spender } = useCurrentMarket();
  const isSafeWallet = useIsSafeWallet();

  const { signingStatus } = useTxFormSignature();

  const {
    approveAndStake,
    data: safeHash,
    isPending: isSafeTxPending,
    error: approveAndStakeError,
  } = useSafeApproveAndStake();
  const { stake, data: hash, isPending: isTxPending, error: depositError } = useStake();

  const { decimals, latestAnswer, symbol } = stkToken.underlying;
  const maxAmount = calculateMaxSupply(stkToken, totalSupplied);

  const schema = useMemo(() => createStakeFormSchema({ maxAmount, isSafeWallet }), [maxAmount, isSafeWallet]);
  const formMethods = useForm<StakeUnderlyingFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { control, formState, handleSubmit } = formMethods;

  const onSubmit = (formValues: StakeUnderlyingFormValues) => {
    if (!formValues.amount) {
      return;
    }
    if (formValues.permit || formValues.approval) {
      stake({
        umbrellaAddress: stkToken.address,
        assetAddress: asset,
        amount: formValues.amount,
        permit: formValues.permit,
        description: `Stake ${formatUnits(formValues.amount, decimals)} ${symbol}`,
      });
    } else {
      approveAndStake({
        umbrellaAddress: stkToken.address,
        assetAddress: asset,
        amount: formValues.amount,
        spender,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <TransactionCard
        title="Supply & Stake"
        hash={hash}
        safeHash={safeHash}
        loading={isTxPending || isSafeTxPending}
        error={depositError || approveAndStakeError}
      >
        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold dark:text-white">Select amount</h2>

          <Controller
            name="amount"
            control={control}
            disabled={signingStatus === "pending" || isTxPending || isSafeTxPending}
            render={({ field }) => (
              <ControlledAmountField
                {...field}
                autoFocus
                maxValue={maxAmount}
                decimals={decimals}
                usdPrice={latestAnswer}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 md:self-center">
          {!isSafeWallet ? <SignTransaction asset={asset} spender={spender} /> : null}
          <Button
            primary
            elevation={1}
            onClick={handleSubmit(onSubmit)}
            loading={isTxPending || isSafeTxPending}
            disabled={isTxPending || isSafeTxPending || !formState.isValid}
            outerClassName="w-full md:w-[248px]"
            className="flex items-center gap-2"
          >
            <LayersIcon size={14} />
            {isSafeWallet ? "Approve & Stake" : "Stake"}
          </Button>
        </div>
      </TransactionCard>

      <StakeUnderlyingTokenSummary stkToken={stkToken} hash={hash} />
    </FormProvider>
  );
};
