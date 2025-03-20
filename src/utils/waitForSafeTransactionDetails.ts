import SafeAppsSDK from "@safe-global/safe-apps-sdk";
import { fetchSafeTransactionDetails } from "@/hooks/useWaitForSafeTransaction";

export const waitForSafeTransactionDetails = async (
  { sdk }: { sdk: SafeAppsSDK },
  { hash, pollingInterval = 5000 }: { hash: string; pollingInterval?: number },
) => {
  while (true) {
    try {
      const details = await fetchSafeTransactionDetails({ hash, sdk });

      if (details.status !== "pending") {
        return details;
      }
    } catch (error) {
      throw new Error("Failed polling safe transaction status");
    }

    await new Promise((resolve) => setTimeout(resolve, pollingInterval));
  }
};
