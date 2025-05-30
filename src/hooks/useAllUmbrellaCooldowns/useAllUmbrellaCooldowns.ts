import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { fetchAllCooldowns } from "@/queries/fetchAllCooldowns";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useAllStkTokens } from "../useAllStkTokens";

export const useAllUmbrellaCooldowns = () => {
  const { chainId } = useCurrentMarket();

  const { address: owner } = useAccount();
  const { data, isLoading: isUmbrellaAddressesLoading } = useAllStkTokens();
  const addresses = data?.map((token) => token.address);

  const { isLoading: isCooldownsLoading, ...rest } = useQuery({
    queryFn: owner && addresses ? () => fetchAllCooldowns({ chainId, owner, addresses }) : skipToken,
    queryKey: ["cooldowns", chainId, owner, addresses],
    refetchInterval: 5 * 1000,
  });

  return {
    isLoading: isUmbrellaAddressesLoading || isCooldownsLoading,
    ...rest,
  };
};
