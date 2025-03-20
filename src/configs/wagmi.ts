import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import {
  arbitrum,
  avalanche,
  avalancheFuji,
  base,
  baseSepolia,
  fantom,
  gnosis,
  harmonyOne,
  mainnet,
  metis,
  opBNB,
  optimism,
  polygon,
  scroll,
  sepolia,
  zksync,
} from "wagmi/chains";

export const appChains = [
  mainnet,
  base,
  arbitrum,
  avalanche,
  polygon,
  fantom,
  gnosis,
  harmonyOne,
  metis,
  opBNB,
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
  // TODO Refactor it
  transports: {
    [mainnet.id]: http(
      process.env.NEXT_PUBLIC_MAINNET || "https://rpc.ankr.com/eth",
      // "https://eth.nodeconnect.org",
    ),
    [base.id]: http(
      process.env.NEXT_PUBLIC_BASE || "https://base.blockpi.network/v1/rpc/public",
      // "https://base.llamarpc.com" ||
      // "https://base-mainnet.public.blastapi.io" ||
      // "https://base.meowrpc.com",
    ),
    [arbitrum.id]: http(
      process.env.NEXT_PUBLIC_ARBITRUM || "https://endpoints.omniatech.io/v1/arbitrum/one/public",
      // "https://arbitrum.llamarpc.com" ||
      // "https://arb-mainnet-public.unifra.io" ||
      // "https://endpoints.omniatech.io/v1/arbitrum/one/public",
    ),
    [avalanche.id]: http(
      process.env.NEXT_PUBLIC_AVALANCE || "https://api.avax.network/ext/bc/C/rpc",
      // "https://avalanche.drpc.org" ||
      // "https://avax.meowrpc.com" ||
      // "https://avalanche.blockpi.network/v1/rpc/public",
    ),
    [polygon.id]: http(
      process.env.NEXT_PUBLIC_POLYGON || "https://endpoints.omniatech.io/v1/matic/mainnet/public",
      // "https://polygon.llamarpc.com" ||
      // "https://polygon-bor.publicnode.com",
    ),
    [fantom.id]: http(process.env.NEXT_PUBLIC_FANTOM),
    [gnosis.id]: http(
      process.env.NEXT_PUBLIC_GNOSIS || "https://gnosis.blockpi.network/v1/rpc/public",
      // "https://gnosis-mainnet.public.blastapi.io",
    ),
    [harmonyOne.id]: http(process.env.NEXT_PUBLIC_HARMONY_ONE),
    [metis.id]: http(
      process.env.NEXT_PUBLIC_METIS || "https://metis-mainnet.public.blastapi.io",
      // "https://metis.api.onfinality.io/public",
    ),
    [opBNB.id]: http(process.env.NEXT_PUBLIC_OP_BNB),
    [optimism.id]: http(
      process.env.NEXT_PUBLIC_OPTIMISM || "https://optimism.blockpi.network/v1/rpc/public",
      // "https://optimism.llamarpc.com" ||
      // "https://optimism.publicnode.com",
    ),
    [scroll.id]: http(
      process.env.NEXT_PUBLIC_SCROLL || "https://scroll.blockpi.network/v1/rpc/public",
      // "https://scroll-mainnet.public.blastapi.io",
    ),
    [zksync.id]: http(
      process.env.NEXT_PUBLIC_ZKSYNC || "https://zksync.meowrpc.com",
      // "https://mainnet.era.zksync.io",
    ),

    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA || "https://sepolia.drpc.org",
      // "https://eth-sepolia.public.blastapi.io" ||
      // "https://endpoints.omniatech.io/v1/eth/sepolia/public" ||
      // "https://ethereum-sepolia.blockpi.network/v1/rpc/public" ||
      // "https://ethereum-sepolia.publicnode.com",
    ),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA),
    [avalancheFuji.id]: http(
      process.env.NEXT_PUBLIC_AVALANCHE_FUJI ||
        "https://avalanche-fuji.blockpi.network/v1/rpc/public",
      // "https://api.avax-test.network/ext/bc/C/rpc" ||
      // "https://avalanche-fuji-c-chain.publicnode.com" ||
      // "https://rpc.ankr.com/avalanche_fuji",
    ),
  },
  ssr: false,
});
