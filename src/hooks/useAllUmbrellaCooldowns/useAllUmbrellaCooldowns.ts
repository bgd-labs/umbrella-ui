import { useAccount } from "wagmi";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchAllCooldowns } from "@/queries/fetchAllCooldowns";
import { useUmbrellaAddresses } from "@/hooks/useUmbrellaAddresses";

export const useAllUmbrellaCooldowns = () => {
  const { chainId } = useMarketStore((state) => state.market);

  const { address: owner } = useAccount();
  const { data: addresses, isLoading: isUmbrellaAddressesLoading } = useUmbrellaAddresses();

  const { isLoading: isCooldownsLoading, ...rest } = useQuery({
    queryFn:
      owner && addresses ? () => fetchAllCooldowns({ chainId, owner, addresses }) : skipToken,
    queryKey: ["cooldowns", chainId, owner, addresses],
    refetchInterval: 5 * 1000,
  });

  return {
    isLoading: isUmbrellaAddressesLoading || isCooldownsLoading,
    ...rest,
  };
};
