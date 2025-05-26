import { DEFAULT_RPCS } from "@/constants/defaultRPCs";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { baseSepolia, mainnet } from "wagmi/chains";

export const appChains = [
  mainnet,

  // testnets
  baseSepolia,
];

export const config = getDefaultConfig({
  appName: "Umbrella UI",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, ...appChains.slice(1)],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET || DEFAULT_RPCS[mainnet.id]),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA || DEFAULT_RPCS[baseSepolia.id]),
  },
  ssr: false,
});
