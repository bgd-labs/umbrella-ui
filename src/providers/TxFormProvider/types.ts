import { TxSignStatus } from "@/components/SignTransaction/types";

export type TxFormProviderState = {
  signingStatus: TxSignStatus | null;
};

export type TxFormProviderActions = {
  setSigningStatus: (status: TxSignStatus) => void;
};

export type TxFormProviderValue = TxFormProviderState & TxFormProviderActions;
