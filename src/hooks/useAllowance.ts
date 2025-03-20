import { type Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

export type UseAllowanceOptions = {
  asset: Address;
  spender: Address;
};

export const useAllowance = ({ asset, spender }: UseAllowanceOptions) => {
  const { address: owner } = useAccount();
  const { chainId } = useCurrentMarket();

  return useReadContract({
    abi: erc20Abi,
    chainId,
    address: asset,
    functionName: "allowance",
    args: [owner!, spender],
    query: {
      gcTime: 0,
      staleTime: 0,
    },
  });
};
