import { createContext, useContext } from "react";
import { Address } from "viem";

export const WalletContext = createContext<Address | null>(null);

export const useWalletAddress = () => {
  const connectedWallet = useContext(WalletContext);

  if (!connectedWallet) {
    throw new Error("useWallet must be used within WalletContext");
  }

  return connectedWallet;
};
