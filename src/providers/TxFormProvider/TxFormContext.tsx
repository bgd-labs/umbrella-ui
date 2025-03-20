import { createContext, useContext } from "react";
import { TxFormProviderValue } from "@/providers/TxFormProvider/types";

export const TxFormContext = createContext<TxFormProviderValue | null>(null);

export const useTxForm = () => {
  const txFormValue = useContext(TxFormContext);

  if (!txFormValue) {
    throw new Error("useTxForm must be used within TxFormProvider");
  }

  return txFormValue;
};

export const useTxFormSignature = () => {
  const { signingStatus, setSigningStatus } = useTxForm();
  return { signingStatus, setSigningStatus } as const;
};
