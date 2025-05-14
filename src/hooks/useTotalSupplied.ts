import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { IAToken_ABI } from "@bgd-labs/aave-address-book/abis";
import { Address } from "viem";
import { useReadContract } from "wagmi";

export const useTotalSupplied = ({ address }: { address?: Address }) => {
  const { chainId } = useCurrentMarket();
  return useReadContract({ chainId, address, abi: IAToken_ABI, functionName: "totalSupply" });
};
