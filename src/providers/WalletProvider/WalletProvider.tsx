"use client";

import { PropsWithChildren, useEffect } from "react";
import { WalletContext } from "@/providers/WalletProvider/WalletContext";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const account = useAccount();

  useEffect(() => {
    if (!account.address) {
      router.push("/");
    }
  }, [router, account.address]);

  if (!account.address) {
    return null;
  }

  return <WalletContext.Provider value={account.address}>{children}</WalletContext.Provider>;
};
