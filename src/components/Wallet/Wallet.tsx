import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { Block } from "@/components/ui/Block";
import { Button } from "@/components/ui/Button";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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
              className="flex animate-pulse items-center gap-1 px-3.5 py-2 leading-5 md:gap-2 md:py-2.5"
            >
              <div className="bg-main-100 size-3 animate-pulse rounded-full md:size-4" />
              <div className="bg-main-100 h-2 w-[66px] animate-pulse rounded-lg md:w-[82px]" />
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
                className="text-xs leading-none font-semibold md:h-[38px] md:px-3.5 md:text-sm"
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
                className="text-xs leading-none font-semibold md:h-[38px] md:px-3.5 md:text-sm"
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
                className="gap-1 text-xs leading-none font-semibold md:h-[38px] md:gap-2 md:px-3.5 md:text-sm"
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
