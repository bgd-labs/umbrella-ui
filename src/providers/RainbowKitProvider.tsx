"use client";

import { RainbowKitProvider as RainbowKitProviderBase } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";

export function RainbowKitProvider({ children }: PropsWithChildren) {
  return <RainbowKitProviderBase showRecentTransactions>{children}</RainbowKitProviderBase>;
}
