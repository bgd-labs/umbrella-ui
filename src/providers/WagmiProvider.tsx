import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as WagmiProviderBase } from "wagmi";

import { config } from "@/configs/wagmi";
import { getQueryClient } from "@/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={getQueryClient()}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </WagmiProviderBase>
  );
}
