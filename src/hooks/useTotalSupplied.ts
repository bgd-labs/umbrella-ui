import { useReadContract } from "wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { Address } from "viem";
import { A_ABI } from "@/abis/a";

export const useTotalSupplied = ({ address }: { address?: Address }) => {
  const { chainId } = useCurrentMarket();
  return useReadContract({ chainId, address, abi: A_ABI, functionName: "totalSupply" });
};
