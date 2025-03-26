import { ChainId } from "@/types/market";
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

export const DEFAULT_RPCS: Record<ChainId, string | undefined> = {
  [mainnet.id]: "https://rpc.ankr.com/eth",
  [base.id]: "https://base.blockpi.network/v1/rpc/public",
  [arbitrum.id]: "https://endpoints.omniatech.io/v1/arbitrum/one/public",
  [avalanche.id]: "https://api.avax.network/ext/bc/C/rpc",
  [polygon.id]: "https://endpoints.omniatech.io/v1/matic/mainnet/public",
  [gnosis.id]: "https://gnosis.blockpi.network/v1/rpc/public",
  [metis.id]: "https://metis-mainnet.public.blastapi.io",
  [optimism.id]: "https://optimism.blockpi.network/v1/rpc/public",
  [scroll.id]: "https://scroll.blockpi.network/v1/rpc/public",
  [zksync.id]: "https://zksync.meowrpc.com",

  // testnets
  [sepolia.id]: "https://sepolia.drpc.org",
  [baseSepolia.id]: undefined,
  [avalancheFuji.id]: "https://avalanche-fuji.blockpi.network/v1/rpc/public",
} as const;
