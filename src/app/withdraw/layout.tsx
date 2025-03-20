"use client";

import { PropsWithChildren } from "react";
import { WalletProvider } from "@/providers/WalletProvider/WalletProvider";

export default function Layout({ children }: PropsWithChildren) {
  return <WalletProvider>{children}</WalletProvider>;
}
