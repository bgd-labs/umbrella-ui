import { getAccount, getClient, switchChain } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { ChainId } from "@/types/market";

export const ensureCorrectChainForTx = async (chainId: ChainId) => {
  const activeWallet = getAccount(config);
  const walletClient = getClient(config);

  if (!activeWallet.address || !walletClient) {
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
