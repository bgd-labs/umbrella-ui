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
              className="flex animate-pulse items-center gap-2 px-2 py-2.5 leading-5"
            >
              <div className="bg-main-100 size-4 animate-pulse rounded-full" />
              <div className="bg-main-100 h-2 w-[89px] animate-pulse rounded-lg" />
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
                className="flex items-center"
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
                className="flex items-center"
              >
                Wrong Network
              </Button>
            );
          }

          return (
            <WalletModal open={open} onOpenChange={setOpen}>
              <Button elevation={1} size="lg" className="flex items-center gap-2">
                <AssetIcon chainId={chain.id} className="size-4 dark:text-white" />
                <span>{account.displayName}</span>
              </Button>
            </WalletModal>
          );
        })();
      }}
    </ConnectButton.Custom>
  );
};
