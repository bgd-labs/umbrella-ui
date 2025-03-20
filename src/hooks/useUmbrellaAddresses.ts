import { useReadContract } from "wagmi";
import { UMBRELLA_HELPER_ABI } from "@/abis/umbrellaHelper";
import { ONE_DAY } from "@/constants/time";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { Address } from "viem";

export const useUmbrellaAddresses = () => {
  const { chainId, umbrellaHelper } = useMarketStore((state) => state.market);
  const { data, ...rest } = useReadContract({
    chainId,
    address: umbrellaHelper,
    abi: UMBRELLA_HELPER_ABI,
    functionName: "getStkTokens",
    query: {
      gcTime: ONE_DAY,
      staleTime: ONE_DAY,
    },
  });

  return {
    data: data as Address[] | undefined,
    ...rest,
  };
};
