import { Controller, FormProvider, useForm } from "react-hook-form";
import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { Button } from "@/components/ui/Button";
import { LayersIcon } from "lucide-react";
import { StakeStataTokenSummary } from "@/app/stake/stata/[address]/components/StakeStataTokenForm/StakeStataTokenSummary";
import React, { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { StataToken, StkToken } from "@/types/token";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useStake } from "@/hooks/useStake";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignTransaction } from "@/components/SignTransaction/SignTransaction";
import { ControlledAmountField } from "@/components/ControlledAmountField/ControlledAmountField";
import {
  createStakeStataFormSchema,
  StakeStataFormValues,
} from "@/app/stake/stata/[address]/stakeStataTokenFormSchema";
import { useSafeApproveAndStake } from "@/hooks/useSafeApproveAndStake";
import { useIsSafeWallet } from "@/hooks/useSafeWallet";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";

export type StakeStataTokenFormProps = {
  asset: Address;
  stkToken: StkToken;
  stataToken: StataToken;
};

export const StakeStataTokenForm = ({ asset, stkToken, stataToken }: StakeStataTokenFormProps) => {
  const client = useQueryClient();
  const { batchHelper: spender } = useCurrentMarket();
  const isSafeWallet = useIsSafeWallet();
  const { signingStatus } = useTxFormSignature();

  const { stake, data: hash, isPending: isTxPending, error: depositError } = useStake();
  const {
    approveAndStake,
    data: safeHash,
    isPending: isSafeTxPending,
    error: approveAndStakeError,
  } = useSafeApproveAndStake();

  const maxAmount = stataToken.balance || 0n;
  const { decimals, latestAnswer } = stataToken;

  const schema = useMemo(
    () => createStakeStataFormSchema({ maxAmount, isSafeWallet }),
    [maxAmount, isSafeWallet],
  );
  const formMethods = useForm<StakeStataFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async ({ amount, permit, approval }: StakeStataFormValues) => {
    const umbrellaAddress = stkToken.address;

    if (!amount) {
      return;
    }

    if (permit || approval) {
      const { status } = await stake({
        amount,
        umbrellaAddress,
        assetAddress: asset,
        permit,
        description: `Stake ${formatUnits(amount, decimals)} ${stataToken.symbol}`,
      });

      if (status === "success") {
        client.invalidateQueries({
          queryKey: ["allStataTokens"],
        });
      }
    } else {
      approveAndStake({
        umbrellaAddress: stkToken.address,
        assetAddress: asset,
        amount,
        spender,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <TransactionCard
        title="Stake Wrapped aToken"
        hash={hash}
        safeHash={safeHash}
        loading={isTxPending || isSafeTxPending}
        error={depositError || approveAndStakeError}
      >
        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold dark:text-white">Select amount</h2>

          <Controller
            name="amount"
            control={formMethods.control}
            disabled={signingStatus === "pending" || isTxPending || isSafeTxPending}
            render={({ field }) => (
              <ControlledAmountField
                {...field}
                maxValue={maxAmount}
                decimals={decimals}
                usdPrice={latestAnswer}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 self-center">
          {!isSafeWallet ? <SignTransaction asset={asset} spender={spender} /> : null}
          <Button
            primary
            elevation={1}
            onClick={formMethods.handleSubmit(onSubmit)}
            loading={isTxPending || isSafeTxPending}
            disabled={isTxPending || isSafeTxPending || !formMethods.formState.isValid}
            outerClassName="w-[248px]"
            className="flex items-center gap-2"
          >
            <LayersIcon size={14} />
            {isSafeWallet ? "Approve & Stake" : "Stake"}
          </Button>
        </div>
      </TransactionCard>

      <StakeStataTokenSummary token={stataToken} stkToken={stkToken} hash={hash} />
    </FormProvider>
  );
};
