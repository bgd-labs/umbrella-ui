"use client";

import { TooltipProvider } from "@/components/Tooltip/Tooltip";
import { MarketProvider } from "@/providers/MarketProvider/MarketProvider";
import { RainbowKitProvider } from "@/providers/RainbowKitProvider";
import { TransactionsTrackerStoreProvider } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { WagmiProvider } from "@/providers/WagmiProvider";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <WagmiProvider>
        <SafeProvider>
          <RainbowKitProvider>
            <MarketProvider>
              <TransactionsTrackerStoreProvider>
                <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
              </TransactionsTrackerStoreProvider>
            </MarketProvider>
          </RainbowKitProvider>
        </SafeProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
