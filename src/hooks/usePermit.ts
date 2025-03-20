import { useReadContracts } from "wagmi";
import { Address, erc20Abi, parseAbi } from "viem";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWalletAddress } from "@/providers/WalletProvider/WalletContext";
import { useMemo } from "react";

export type UsePermitOptions = {
  asset: Address;
};

export const usePermit = ({ asset }: UsePermitOptions) => {
  const owner = useWalletAddress();
  const { chainId } = useCurrentMarket();

  const { data, ...rest } = useReadContracts({
    contracts: [
      {
        chainId,
        address: asset,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        chainId,
        address: asset,
        abi: parseAbi(["function version() view returns (string)"]),
        functionName: "version",
      },
      {
        chainId,
        address: asset,
        abi: parseAbi(["function nonces(address owner) view returns (uint256)"]),
        functionName: "nonces",
        args: [owner],
      },
    ],
    query: {
      gcTime: 0,
      staleTime: 0,
    },
  });

  return {
    data: useMemo(() => {
      if (!data) {
        return;
      }

      const [nameResult, versionResult, nonceResult] = data;
      const name = nameResult.result;
      const version = versionResult.result || "1";
      const nonce = nonceResult.result;

      return {
        name,
        version,
        nonce,
      };
    }, [data]),
    ...rest,
  } as const;
};
