import { Web3Icon } from "@bgd-labs/react-web3-icons";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { TokenType } from "@/types/token";

const mapTokenTypeToAssetTag = (type?: TokenType) => {
  if (!type || type === "underlying") {
    return undefined;
  }
  return type;
};

export type AssetIconProps = ComponentProps<typeof Web3Icon> & {
  type?: TokenType;
  className?: string;
};

export const AssetIcon = ({ symbol, assetTag, type, className, ...iconProps }: AssetIconProps) => {
  return (
    <div className={cn("relative rounded-full", className)}>
      <div className="flex h-full w-full items-center justify-center rounded-full text-sm font-semibold">
        <Web3Icon
          symbol={symbol}
          assetTag={assetTag || mapTokenTypeToAssetTag(type)}
          className="w-full"
          fallbackProps={{
            className: "text-main-950 dark:text-white border w-full h-full text-xs",
          }}
          {...iconProps}
        />
      </div>
    </div>
  );
};
