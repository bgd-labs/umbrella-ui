import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Address, PublicClient } from "viem";
import { useAccount, usePublicClient } from "wagmi";

const fetchIsSafeWallet = async ({ address, publicClient }: { address: Address; publicClient: PublicClient }) => {
  try {
    const code = await publicClient.getCode({ address });
    if (code === undefined || code === "0x") {
      return false;
    }

    const owners = await publicClient.readContract({
      address,
      abi: [
        {
          inputs: [],
          name: "getOwners",
          outputs: [{ name: "", type: "address[]" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "getOwners",
    });

    return Array.isArray(owners);
  } catch {
    return false;
  }
};

export const useIsSafeWallet = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { safe } = useSafeAppsSDK();

  const { data } = useQuery({
    queryFn: address && publicClient ? () => fetchIsSafeWallet({ address, publicClient }) : skipToken,
    queryKey: ["isSafeWallet", address, publicClient],
  });

  return useMemo(() => {
    if (safe?.safeAddress) {
      return true;
    }
    return !!data;
  }, [safe, data]);
};
