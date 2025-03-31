import { config } from "@/configs/wagmi";
import { ChainId } from "@/types/market";
import { getAccount, switchChain } from "@wagmi/core";

export const ensureCorrectChainForTx = async (chainId: ChainId) => {
  const activeWallet = getAccount(config);

  if (!activeWallet.address) {
    throw new Error("Wallet not connected");
  }

  if (activeWallet.connector && activeWallet.chainId !== chainId) {
    try {
      await switchChain(config, { chainId });
    } catch (e) {
      console.error(e);
      throw new Error("Error occured when switching chain. Check console log for more details.");
    }
  }
};
