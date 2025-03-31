"use client";

import { LoadingBlock } from "@/components/SignTransaction/Loader";
import { SignTransactionProps } from "@/components/SignTransaction/types";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { usePermit } from "@/hooks/usePermit";
import { useTxFormSignature } from "@/providers/TxFormProvider/TxFormContext";
import { useWalletAddress } from "@/providers/WalletProvider/WalletContext";
import { Permit as PermitType } from "@/types/permit";
import { addDays, toUnix } from "@/utils/date";
import { ensureCorrectChainForTx } from "@/utils/ensureCorrectChainForTx/ensureCorrectChainForTx";
import { Check } from "lucide-react";
import { parseSignature } from "viem";
import { useSignTypedData } from "wagmi";

export type PermitProps = SignTransactionProps & {
  value?: PermitType;
  onChange?: (value: PermitType) => void;
  disabled?: boolean;
};

export const Permit = ({ asset, amount, spender, value, onChange, disabled }: PermitProps) => {
  const owner = useWalletAddress();
  const { chainId } = useCurrentMarket();
  const { setSigningStatus } = useTxFormSignature();

  const { data, isLoading } = usePermit({ asset });
  const { signTypedDataAsync, isPending: isSigning } = useSignTypedData();

  const isPermitted = value && value.value === amount;

  const permit = async () => {
    if (!data) {
      return;
    }

    if (data.nonce === undefined) {
      throw new Error("This token does not support permit");
    }

    try {
      setSigningStatus?.("pending");

      const inOneDay = addDays(new Date(), 1);
      const deadline = BigInt(toUnix(inOneDay));
      const domain = {
        name: data.name,
        version: data.version,
        chainId,
        verifyingContract: asset,
      };

      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };

      const message = {
        owner,
        spender,
        value: amount,
        nonce: data.nonce,
        deadline,
      };

      await ensureCorrectChainForTx(chainId);
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "Permit",
        message,
      });

      const { v, r, s } = parseSignature(signature);

      setSigningStatus?.("signed");
      onChange?.({
        token: asset,
        owner,
        spender,
        value: amount,
        deadline,
        nonce: data.nonce,
        v: Number(v),
        r,
        s,
      });
    } catch (error) {
      setSigningStatus?.("failed");
    }
  };

  if (isPermitted) {
    return (
      <div className="mx-auto flex h-[34px] items-center gap-2 text-green-600">
        <Check />
        <div>Authorized</div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <Button
      elevation={1}
      onClick={permit}
      loading={isSigning}
      disabled={isSigning || amount === 0n || disabled}
      outerClassName="w-full md:w-[248px]"
    >
      Authorize
    </Button>
  );
};
