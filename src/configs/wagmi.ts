import { DEFAULT_RPCS } from "@/constants/defaultRPCs";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";
import { forkedMainnet } from "./tenderly.config";

export const appChains = [
  mainnet,

  // testnets
  baseSepolia,
  ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true" ? [forkedMainnet] : []),
];

export const config = getDefaultConfig({
  appName: "AAVE Umbrella",
  projectId: "2cb581955df9284a18d9ae163a520290",
  chains: [mainnet, ...appChains.slice(1)],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET || DEFAULT_RPCS[mainnet.id]),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA || DEFAULT_RPCS[baseSepolia.id]),
    ...(process.env.NEXT_PUBLIC_TENDERLY_VNETS_ENABLED === "true"
      ? {
          [forkedMainnet.id]: http(process.env.NEXT_PUBLIC_TENDERLY_VNET_RPC!),
        }
      : {}),
  },
  ssr: false,
});
