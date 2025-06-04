import { LoadingBlock } from "@/components/SignTransaction/Loader";
import { SignTransactionProps } from "@/components/SignTransaction/types";
import { config } from "@/configs/wagmi";
import { USDT } from "@/constants/assets";
import { useAllowance } from "@/hooks/useAllowance";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWriteContract } from "@/hooks/useWriteContract/useWriteContract";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";
import { Approval } from "@/types/approval";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Check } from "lucide-react";
import { erc20Abi } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { Button } from "../../ui/Button";

export type ApproveProps = SignTransactionProps & {
  onChange?: (approval: Approval) => void;
  disabled?: boolean;
};

export const Approve = ({ asset, spender, amount, onChange, disabled }: ApproveProps) => {
  const client = useQueryClient();
  const { chainId } = useCurrentMarket();
  const trackTransaction = useTrackTransaction();
  const { setSigningStatus } = useTxFormSignature();

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    isFetching: isAllowanceFetching,
    queryKey: allowanceQueryKey,
  } = useAllowance({
    asset,
    spender,
  });
  const { writeContractAsync, data: hash, isPending: isApprovalPending } = useWriteContract();
  const { isFetching: isReceiptFetching } = useWaitForTransactionReceipt({
    hash,
  });

  const isApproved = allowance ? allowance >= amount : false;

  const handleApproveClick = async () => {
    try {
      setSigningStatus("pending");

      // For USDT on mainnet we have to reset allowance to 0 if it is non 0 now
      // https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
      if (asset === USDT && allowance !== 0n) {
        const hash = await writeContractAsync({
          chainId,
          address: asset,
          abi: erc20Abi,
          functionName: "approve",
          args: [spender, 0n],
        });
        await waitForTransactionReceipt(config, { hash });
        trackTransaction({ chainId, hash, description: "Reset allowance to 0" });
      }

      const hash = await writeContractAsync({
        chainId,
        address: asset,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, amount],
      });
      await waitForTransactionReceipt(config, { hash });
      await client.invalidateQueries({ queryKey: allowanceQueryKey });
      setSigningStatus("signed");
      onChange?.({ txHash: hash, allowance: amount });
      trackTransaction({ chainId, hash, description: "Approval" });
    } catch (error) {
      // TODO Handle error
      console.error(error);
      setSigningStatus("failed");
    }
  };

  if (isApproved && amount !== 0n) {
    return (
      <div className="mx-auto flex h-[34px] items-center gap-2 text-green-600">
        <Check />
        <div>Approved</div>
      </div>
    );
  }

  if (isAllowanceLoading) {
    return <LoadingBlock />;
  }

  return (
    <Button
      elevation={1}
      loading={isApprovalPending || isReceiptFetching || isAllowanceFetching}
      disabled={isApprovalPending || isReceiptFetching || isAllowanceFetching || amount === 0n || disabled}
      onClick={handleApproveClick}
      outerClassName="w-full md:w-[248px]"
    >
      Approve
    </Button>
  );
};
