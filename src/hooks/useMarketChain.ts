import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { appChains } from "@/configs/wagmi";

export const useMarketChain = () => {
  const { chainId } = useCurrentMarket();
  return appChains.find((chain) => chain.id === chainId)!;
};
