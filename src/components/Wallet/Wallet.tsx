import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/Button";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { Block } from "@/components/ui/Block";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { useState } from "react";

export const Wallet = () => {
  const [open, setOpen] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        if (!mounted) {
          return (
            <Block
              elevation={1}
              className="flex animate-pulse items-center gap-1 md:gap-2 px-2 py-2 md:py-2.5 leading-5"
            >
              <div className="bg-main-100 size-3 md:size-4 animate-pulse rounded-full" />
              <div className="bg-main-100 h-2 w-[66px] md:w-[82px] animate-pulse rounded-lg" />
            </Block>
          );
        }

        return (() => {
          if (!connected) {
            return (
              <Button
                elevation={1}
                size="lg"
                onClick={openConnectModal}
                className="leading-none text-xs md:text-sm font-semibold"
              >
                Connect Wallet
              </Button>
            );
          }

          if (chain.unsupported) {
            return (
              <Button
                elevation={1}
                size="lg"
                onClick={openChainModal}
                className="leading-none text-xs md:text-sm font-semibold"
              >
                Wrong Network
              </Button>
            );
          }

          return (
            <WalletModal open={open} onOpenChange={setOpen}>
              <Button
                elevation={1}
                size="lg"
                className="leading-none text-xs md:text-sm font-semibold gap-1 md:gap-2"
              >
                <AssetIcon chainId={chain.id} className="size-3 md:size-4" />
                <span>{account.displayName}</span>
              </Button>
            </WalletModal>
          );
        })();
      }}
    </ConnectButton.Custom>
  );
};
