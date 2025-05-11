import { Button } from "@/components/ui/Button";
import { MARKETS } from "@/constants/markets";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import WrongNetworkImage from "../../../public/images/wrong-network.svg";

export const UnsupportedMarket = () => {
  const { name } = useMarketStore((state) => state.market);
  const setMarket = useMarketStore((state) => state.setMarket);
  const { switchChain } = useSwitchChain();

  const handleSwitchToTestnet = () => {
    switchChain({ chainId: baseSepolia.id });
    setMarket(MARKETS.find((market) => market.chainId === baseSepolia.id)!.id);
  };

  return (
    <div className="mx-auto mb-auto flex w-full max-w-[890px] flex-col items-center pt-10">
      <WrongNetworkImage className="mb-[50px] h-[185px]" />

      <div className="flex flex-col items-center gap-6">
        <div className="text-3xl font-semibold">Oops! There is No Umbrella on {name} Yet</div>

        <div className="text-xl">
          We&apos;re working on adding more chains, but for now you can explore it on a Base Sepolia
        </div>

        <div className="flex items-center justify-center">
          <Button primary elevation={1} size="lg" outerClassName="w-[250px] grow-0" onClick={handleSwitchToTestnet}>
            Return to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
