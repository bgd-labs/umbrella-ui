import { config } from "@/configs/wagmi";
import SafeAppsSDK, { BaseTransaction, SafeInfo } from "@safe-global/safe-apps-sdk";
import { sendCalls } from "@wagmi/core/experimental";

export type SendSafeTxsContext = { sdk: SafeAppsSDK; safe: SafeInfo };

export const sendSafeTxs = async (txs: BaseTransaction[], { sdk, safe }: SendSafeTxsContext) => {
  try {
    if (safe?.safeAddress) {
      return await sdk.txs.send({ txs });
    }

    await sendCalls(config, {
      calls: txs.map((tx) => ({
        to: tx.to,
        value: BigInt(tx.value),
        data: tx.data,
      })),
    });

    return null;
  } catch (e) {
    throw new Error("Failed to send transactions");
  }
};
