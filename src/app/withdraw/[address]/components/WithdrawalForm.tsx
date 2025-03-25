import { TransactionCard } from "@/components/Transaction/TransactionCard";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { mapTokenTypeToLabel } from "@/components/TokenLabel/TokenLabel";
import { UmbrellaStatus } from "@/components/UmbrellaStatus/UmbrellaStatus";
import { SelectWithdrawalMethod } from "@/app/withdraw/[address]/components/SelectWithdrawalMethod";
import { Button } from "@/components/ui/Button";
import { LayersIcon } from "lucide-react";
import { Summary } from "@/app/withdraw/[address]/components/Summary";
import React, { useMemo } from "react";
import { StkToken } from "@/types/token";
import { useWithdraw } from "@/hooks/useWithdraw";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import {
  calculateSupportedWithdrawingMethods,
  getRelatedAssetByWithdrawMethod,
} from "@/utils/getRelatedAssetByWithdrawMethod";
import { UmbrellaAssetsDictionary } from "@/types/addressesDictionary";
import { CooldownData } from "@/queries/fetchAllCooldowns";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatUnits } from "viem";
import { ControlledAmountField } from "@/components/ControlledAmountField/ControlledAmountField";
import { SignTransaction } from "@/components/SignTransaction/SignTransaction";
import {
  createWithdrawalFormSchema,
  WithdrawalFormValues,
} from "@/app/withdraw/[address]/withdrawalFormSchema";
import { useIsSafeWallet } from "@/hooks/useSafeWallet";
import { useSafeWithdraw } from "@/hooks/useSafeWithdraw";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";

export type WithdrawalFormProps = {
  stkToken: StkToken;
  relatedAssets: UmbrellaAssetsDictionary;
  cooldown: CooldownData;
};

export const WithdrawalForm = ({
  stkToken,
  relatedAssets,
  cooldown,
}: WithdrawalFormProps) => {
  const { batchHelper: spender } = useCurrentMarket();
  const isSafeWallet = useIsSafeWallet();
  const { signingStatus } = useTxFormSignature();

  const {
    safeWithdraw,
    data: safeHash,
    isPending: isSafeWithdrawing,
    error: safeWithdrawalError,
  } = useSafeWithdraw();
  const {
    withdraw,
    data: hash,
    isPending: isWithdrawing,
    error: withdrawalError,
  } = useWithdraw();
  const maxAmount = cooldown.amount;

  const schema = useMemo(
    () => createWithdrawalFormSchema({ maxAmount, isSafeWallet }),
    [maxAmount, isSafeWallet],
  );
  const formMethods = useForm<WithdrawalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      withdrawalMethod: "withdrawToUnderlying",
    },
    mode: "onChange",
  });
  const { control } = formMethods;

  const { decimals, underlying, latestAnswer } = stkToken;
  const supportedWithdrawingMethods =
    calculateSupportedWithdrawingMethods(relatedAssets);

  const onSubmit = async (formValues: WithdrawalFormValues) => {
    if (!formValues.amount) {
      return;
    }
    const { amount, withdrawalMethod, permit } = formValues;
    const assetAddress = getRelatedAssetByWithdrawMethod(
      relatedAssets,
      withdrawalMethod,
    );

    if (!assetAddress) {
      throw new Error("Unknown asset address");
    }

    if (isSafeWallet) {
      safeWithdraw({
        umbrellaAddress: stkToken.address,
        assetAddress,
        amount,
      });
    } else {
      withdraw({
        umbrellaAddress: stkToken.address,
        assetAddress,
        amount,
        permit,
        withdrawMethod: withdrawalMethod,
        description: `Withdraw ${formatUnits(formValues.amount, decimals)} ${stkToken.underlying.symbol}`,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <TransactionCard
        title="Withdraw"
        hash={hash}
        safeHash={safeHash}
        loading={isWithdrawing || isSafeWithdrawing}
        error={withdrawalError || safeWithdrawalError}
      >
        <div className="border-y-main-950 flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <AssetIcon
              symbol={underlying.symbol}
              type="stk"
              className="size-9"
            />

            <div className="flex flex-col">
              <h2 className="font-bold dark:text-white">{underlying.name}</h2>
              <div className="text-main-500 text-sm capitalize">
                {mapTokenTypeToLabel("stk")}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <UmbrellaStatus token={stkToken} />
          </div>
        </div>

        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold dark:text-white">Select amount</h2>

          <Controller
            name="amount"
            control={formMethods.control}
            disabled={
              signingStatus === "pending" || isWithdrawing || isSafeWithdrawing
            }
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

        <div className="flex flex-col justify-start gap-5 self-stretch">
          <h2 className="font-bold">Withdraw method</h2>

          <Controller
            name="withdrawalMethod"
            control={control}
            render={({ field }) => (
              <SelectWithdrawalMethod
                ref={field.ref}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                withdrawalMethods={supportedWithdrawingMethods}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-4 md:self-center">
          {isSafeWallet ? null : (
            <SignTransaction asset={stkToken.address} spender={spender} />
          )}

          <Button
            primary
            elevation={1}
            loading={isWithdrawing || isSafeWithdrawing}
            disabled={
              isWithdrawing ||
              isSafeWithdrawing ||
              !formMethods.formState.isValid
            }
            onClick={formMethods.handleSubmit(onSubmit)}
            outerClassName="w-full md:w-[248px]"
            className="flex items-center gap-2"
          >
            <LayersIcon size={14} />
            {isSafeWallet ? "Approve & Withdraw" : "Withdraw"}
          </Button>
        </div>
      </TransactionCard>

      <Summary stkToken={stkToken} txHash={hash} />
    </FormProvider>
  );
};
