import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { TxFormContext } from "@/providers/TxFormProvider/TxFormContext";
import { TxFormProviderState } from "@/providers/TxFormProvider/types";
import { TxSignStatus } from "@/components/SignTransaction/types";

export type TxFormProviderProps = PropsWithChildren;

export const TxFormProvider = ({ children }: TxFormProviderProps) => {
  const [state, setState] = useState<TxFormProviderState>({ signingStatus: null });

  const setSigningStatus = useCallback((status: TxSignStatus) => {
    setState((current) => ({ ...current, signingStatus: status }));
  }, []);

  // TODO Can be replaced with two contexts: state actions to further improve performance
  const contextValue = useMemo(() => {
    return {
      ...state,
      setSigningStatus,
    };
  }, [state, setSigningStatus]);

  return <TxFormContext.Provider value={contextValue}>{children}</TxFormContext.Provider>;
};
