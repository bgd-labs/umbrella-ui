import React, { PropsWithChildren } from "react";
import { CopyIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip/Tooltip";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { AssetIcon } from "@/components/AssetIcon/AssetIcon";

export type CopyToClipboardProps = PropsWithChildren<{
  value?: string;
  className?: string;
}>;

export const CopyToClipboard = ({ value, className, children }: CopyToClipboardProps) => {
  const { status, copyToClipboard } = useCopyToClipboard();

  if (children) {
    return (
      <div
        onClick={value ? () => copyToClipboard(value) : undefined}
        className={cn("flex items-center justify-center gap-1.5", className)}
      >
        {children}
        {value && <CopyIcon size={14} className="cursor-pointer" />}
      </div>
    );
  }

  if (!value) {
    return null;
  }

  return (
    <Tooltip open={status === "copied"}>
      <TooltipTrigger>
        <CopyIcon
          size={14}
          onClick={() => copyToClipboard(value)}
          className={cn("cursor-pointer", className)}
        />
      </TooltipTrigger>
      <TooltipContent side="top">
        <div className="border-main-950 bg-main-50 flex border px-2 py-1">Copied</div>
      </TooltipContent>
    </Tooltip>
  );
};
