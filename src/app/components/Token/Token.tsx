import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import Link from "next/link";
import { getScannerUrl } from "@/utils/getScannerUrl";
import { ExternalLinkIcon } from "lucide-react";
import { TokenLabel } from "@/components/TokenLabel/TokenLabel";
import { cn } from "@/utils/cn";
import { Token as TokenType } from "@/types/token";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";

const getDisplayName = (symbol: string, type: TokenType["type"] | "native") => {
  if (type === "a" || type === "stata") {
    return `a${symbol}`;
  }
  if (type === "stk") {
    return `Umbrella ${symbol}`;
  }
  if (type === "stkStata") {
    return `Umbrella a${symbol}`;
  }
  return symbol;
};

export type TokenProps = {
  // TODO Fix types
  token: Pick<TokenType, "address" | "symbol"> & {
    type: TokenType["type"] | "native";
  };
  className?: string;
};

export const Token = ({ token, className }: TokenProps) => {
  const { chainId } = useMarketStore((state) => state.market);
  const { address, type, symbol } = token;

  const assetTag =
    type !== "underlying" && type !== "native" ? type : undefined;

  return (
    <div
      className={cn(
        "flex min-w-[100px] grow items-center justify-start gap-3",
        className,
      )}
    >
      <AssetIcon
        symbol={symbol}
        assetTag={assetTag}
        className="size-[34px] md:size-11 shrink-0"
      />

      <div className="flex w-[calc(100%_-_--spacing(14))] flex-col items-start">
        <div className="text-main-900 flex w-full items-center gap-[3px] text-xl md:text-base leading-6 font-bold dark:text-white">
          <div className="truncate">{getDisplayName(symbol, type)}</div>
          <Link href={getScannerUrl(chainId, address)} target="_blank">
            <ExternalLinkIcon
              size={14}
              className="text-main-500 cursor-pointer"
            />
          </Link>
        </div>
        <TokenLabel type={type} />
      </div>
    </div>
  );
};
