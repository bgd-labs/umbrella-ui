import { AssetIcon, AssetIconProps } from "@/components/AssetIcon/AssetIcon";
import { Reward } from "@/types/token";
import { ChainId } from "@/types/market";
import { baseSepolia } from "wagmi/chains";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";

// TODO Define short names for all chains
const CHAIN_ID_TO_SHORT_NAME: Partial<Record<ChainId, string>> = {
  [baseSepolia.id]: "BasSep",
} as const;

const transformSymbol = ({ chainId, symbol }: { chainId: ChainId; symbol: string }) => {
  const shortChainName = CHAIN_ID_TO_SHORT_NAME[chainId];

  // if there is no defined short chain name that means that we don't have strategy to format symbol
  if (!shortChainName) {
    return symbol;
  }

  // remove token version at the end of the symbol if any
  let formattedSymbol = symbol.replace(/.V[1,9]$/, "");

  // if reward is `stata token`
  if (symbol.startsWith(`wa${shortChainName}`)) {
    formattedSymbol = formattedSymbol.replace(`wa${shortChainName}`, "");
    return `stataAva${formattedSymbol}`;
  }

  // if reward is `a token`
  if (symbol.startsWith(`a${shortChainName}`)) {
    formattedSymbol = formattedSymbol.replace(`a${shortChainName}`, "");
    return `aAva${formattedSymbol}`;
  }

  return symbol;
};

export type RewardAssetIconProps = Omit<AssetIconProps, "symbol"> & {
  reward: Reward;
};

export const RewardAssetIcon = ({ reward, ...props }: RewardAssetIconProps) => {
  const { chainId } = useCurrentMarket();
  const symbol = transformSymbol({ chainId, symbol: reward.symbol });

  return <AssetIcon symbol={symbol} {...props} />;
};
