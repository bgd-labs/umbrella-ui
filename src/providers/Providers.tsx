"use client";

import { PropsWithChildren } from "react";
import type * as React from "react";
import { WagmiProvider } from "@/providers/WagmiProvider";
import { RainbowKitProvider } from "@/providers/RainbowKitProvider";
import { MarketProvider } from "@/providers/MarketProvider/MarketProvider";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/Tooltip/Tooltip";
import { TransactionsTrackerStoreProvider } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import SafeProvider from "@safe-global/safe-apps-react-sdk";

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
