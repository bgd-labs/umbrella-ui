import { skipToken, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import SafeAppsSDK from "@safe-global/safe-apps-sdk";
import { TransactionDetails } from "@safe-global/safe-gateway-typescript-sdk";

export type SafeTxDetails = TransactionDetails & {
  status: "success" | "reverted" | "pending";
};

export const fetchSafeTransactionDetails = async ({
  hash,
  sdk,
}: {
  hash: string;
  sdk: SafeAppsSDK;
}) => {
  try {
    const details = await sdk.txs.getBySafeTxHash(hash);
    let status: SafeTxDetails["status"] = "pending";

    if (details.txStatus === "SUCCESS") {
      status = "success";
    } else if (details.txStatus === "FAILED" || details.txStatus === "CANCELLED") {
      status = "reverted";
    }

    return {
      ...details,
      status,
    } as SafeTxDetails;
  } catch (e) {
    throw new Error("Error tracking Safe transaction");
  }
};

export type UseWaitForSafeTransactionArgs = {
  // TODO Get rid of null
  hash?: string | null;
  query?: Omit<
    UseQueryOptions<SafeTxDetails>,
    "queryFn" | "queryKey" | "queryKeyHashFn" | "placeholderData" | "initialData"
  >;
};

export const useWaitForSafeTransaction = ({ hash, query = {} }: UseWaitForSafeTransactionArgs) => {
  const { sdk } = useSafeAppsSDK();

  const { data, ...rest } = useQuery({
    queryFn: hash ? () => fetchSafeTransactionDetails({ hash, sdk }) : skipToken,
    queryKey: ["safeTransactionTracking", hash, sdk],
    refetchInterval: ({ state }) => {
      if (state.data?.status === "success" || state.data?.status === "reverted") {
        return false;
      }
      return 5000;
    },
    ...query,
  });

  return { data, ...rest } as const;
};
