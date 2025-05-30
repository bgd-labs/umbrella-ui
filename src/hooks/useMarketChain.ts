import { appChains } from "@/configs/wagmi";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

export const useMarketChain = () => {
  const { chainId } = useCurrentMarket();
  return appChains.find((chain) => chain.id === chainId)!;
};
