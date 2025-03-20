import { Address } from "viem";

export type SignTransactionProps = {
  asset: Address;
  amount: bigint;
  spender: Address;
};

export type TxSignStatus = "signed" | "pending" | "failed";
