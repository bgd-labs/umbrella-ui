import { createContext, useContext } from "react";

export type ModalsContextValue = {
  isTermsAndConditionsOpen: boolean;
  setIsTermsAndConditionsOpen: (isOpen: boolean) => void;
  isTermsAndConditionsContentOpen: boolean;
  setIsTermsAndConditionsContentOpen: (isOpen: boolean) => void;
};

export const ModalsContext = createContext<ModalsContextValue | null>(null);

export const useModalsContext = () => {
  const context = useContext(ModalsContext);
  if (!context) {
    throw new Error("useModalsContext must be used within a ModalsProvider");
  }
  return context;
};
