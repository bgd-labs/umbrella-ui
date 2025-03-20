import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { useAccount, usePublicClient } from "wagmi";
import { useMemo, useEffect, useState } from "react";

export const useIsSafeWallet = () => {
  const { safe } = useSafeAppsSDK();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [isContract, setIsContract] = useState(false);

  useEffect(() => {
    const checkContract = async () => {
      if (!address || safe?.safeAddress || !publicClient) {
        setIsContract(false);
        return;
      }

      try {
        const code = await publicClient.getCode({ address });
        if (code === undefined || code === "0x") {
          setIsContract(false);
          return;
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

        setIsContract(Array.isArray(owners));
      } catch {
        setIsContract(false);
      }
    };

    checkContract();
  }, [address, safe, publicClient]);

  return useMemo(() => {
    if (safe?.safeAddress) {
      return true;
    }
    return isContract;
  }, [safe, isContract]);
};
