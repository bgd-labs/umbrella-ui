"use client";

import { TermsAndConditionsContentModal } from "@/components/TermsAndConditionsContentModal/TermsAndConditionsContentModal";
import { TermsAndConditionsModal } from "@/components/TermsAndConditionsModal/TermsAndConditionsModal";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ModalsContext } from "./ModalsContext";

const getIsTermsAgreementAccepted = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isTermsAgreementAccepted = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_AGREEMENT);

  if (isTermsAgreementAccepted === null) {
    return false;
  }

  return isTermsAgreementAccepted === "true";
};

export const ModalsProvider = ({ children }: PropsWithChildren) => {
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] = useState(() => {
    const isTermsAgreementAccepted = getIsTermsAgreementAccepted();
    return !isTermsAgreementAccepted;
  });
  const [isTermsAndConditionsContentOpen, setIsTermsAndConditionsContentOpen] = useState(false);

  const handleTermsAndConditionsOpenChange = useCallback((open: boolean) => {
    if (!open) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_AGREEMENT, "true");
    }

    setIsTermsAndConditionsOpen(open);
  }, []);

  const value = useMemo(
    () => ({
      isTermsAndConditionsOpen,
      setIsTermsAndConditionsOpen: handleTermsAndConditionsOpenChange,
      isTermsAndConditionsContentOpen,
      setIsTermsAndConditionsContentOpen,
    }),
    [isTermsAndConditionsOpen, isTermsAndConditionsContentOpen, handleTermsAndConditionsOpenChange],
  );

  return (
    <ModalsContext.Provider value={value}>
      {children}
      <TermsAndConditionsModal />
      <TermsAndConditionsContentModal />
    </ModalsContext.Provider>
  );
};
