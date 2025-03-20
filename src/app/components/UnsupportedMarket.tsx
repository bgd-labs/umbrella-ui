import WrongNetworkImage from "../../../public/images/wrong-network.svg";
import { baseSepolia } from "wagmi/chains";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { useSwitchChain } from "wagmi";
import React from "react";
import { Button } from "@/components/ui/Button";

export const UnsupportedMarket = () => {
  const { name } = useMarketStore((state) => state.market);
  const setMarket = useMarketStore((state) => state.setMarket);
  const { switchChain } = useSwitchChain();

  const handleSwitchToTestnet = () => {
    // TODO Get rid of magic number and rewrite it in a different way
    switchChain({ chainId: baseSepolia.id });
    setMarket("11");
  };

  return (
    <div className="mx-auto mb-auto flex w-full max-w-(--breakpoint-lg) flex-col items-center gap-14 pt-10">
      <WrongNetworkImage />

      <div className="flex flex-col items-center gap-10">
        <div className="text-3xl font-semibold">Oops! There is No Umbrella on {name} Yet</div>

        <div className="text-xl">
          We&apos;re working on adding more chains, but for now you can explore it on a Base Sepolia
        </div>
      </div>

      <div className="mt-14 flex items-center justify-center">
        <Button
          primary
          elevation={1}
          size="lg"
          outerClassName="w-[250px] grow-0"
          onClick={handleSwitchToTestnet}
        >
          Return to dashboard
        </Button>
      </div>
    </div>
  );
};
