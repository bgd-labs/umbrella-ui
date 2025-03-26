import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  arbitrum,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  gnosis,
  mainnet,
  metis,
  optimism,
  polygon,
  scroll,
  sepolia,
  zksync,
} from "wagmi/chains";
import { DEFAULT_RPCS } from "@/constants/defaultRPCs";

export const appChains = [
  mainnet,
  base,
  arbitrum,
  avalanche,
  polygon,
  gnosis,
  metis,
  optimism,
  scroll,
  zksync,

  // testnets
  sepolia,
  baseSepolia,
  avalancheFuji,
];

export const config = getDefaultConfig({
  appName: "Umbrella UI",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, ...appChains.slice(1)],
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_MAINNET || DEFAULT_RPCS[mainnet.id],
    ),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE || DEFAULT_RPCS[base.id]),
    [arbitrum.id]: http(
      process.env.NEXT_PUBLIC_ARBITRUM || DEFAULT_RPCS[arbitrum.id],
    ),
    [avalanche.id]: http(
      process.env.NEXT_PUBLIC_AVALANCE || DEFAULT_RPCS[avalanche.id],
    ),
    [polygon.id]: http(
      process.env.NEXT_PUBLIC_POLYGON || DEFAULT_RPCS[polygon.id],
    ),
    [gnosis.id]: http(
      process.env.NEXT_PUBLIC_GNOSIS || DEFAULT_RPCS[gnosis.id],
    ),
    [metis.id]: http(process.env.NEXT_PUBLIC_METIS || DEFAULT_RPCS[metis.id]),
    [optimism.id]: http(
      process.env.NEXT_PUBLIC_OPTIMISM || DEFAULT_RPCS[optimism.id],
    ),
    [scroll.id]: http(
      process.env.NEXT_PUBLIC_SCROLL || DEFAULT_RPCS[scroll.id],
    ),
    [zksync.id]: http(
      process.env.NEXT_PUBLIC_ZKSYNC || DEFAULT_RPCS[zksync.id],
    ),

    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA || DEFAULT_RPCS[sepolia.id],
    ),
    [baseSepolia.id]: http(
      process.env.NEXT_PUBLIC_BASE_SEPOLIA || DEFAULT_RPCS[baseSepolia.id],
    ),
    [avalancheFuji.id]: http(
      process.env.NEXT_PUBLIC_AVALANCHE_FUJI || DEFAULT_RPCS[avalancheFuji.id],
    ),
  },
  ssr: false,
});
