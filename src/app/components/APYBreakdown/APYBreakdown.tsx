"use client";

import { AssetIcon } from "@/components/AssetIcon/AssetIcon";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { RewardAssetIcon } from "@/components/RewardAssetIcon/RewardAssetIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip/Tooltip";
import { Reward } from "@/types/token";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export type APYBreakdownProps = {
  symbol: string;
  totalApy: number;
  supplyApy: number;
  rewards: Reward[];
  displayRewards?: boolean;
};

export const APYBreakdown = ({ symbol, totalApy, supplyApy, rewards, displayRewards = true }: APYBreakdownProps) => {
  const filteredRewards = rewards.filter((reward) => !!reward.apy);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    if (!isTouchDevice || !isOpen) return;

    const handleClickOutside = (event: Event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isTouchDevice, isOpen]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (isTouchDevice) {
      setIsOpen(open);
    }
  };

  const tooltipProps = isTouchDevice ? { open: isOpen, onOpenChange: handleOpenChange } : {};

  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger ref={triggerRef} className="group flex items-center justify-center" onClick={handleTriggerClick}>
        <div className="flex flex-row-reverse items-center gap-0.5 sm:flex-col">
          <NumberDisplay
            value={totalApy}
            type="percent"
            className="group-hover:bg-secondary-500 rounded-2xl px-1.5 font-semibold transition"
          />
          {displayRewards && (
            <div className="flex items-center">
              {!!supplyApy && (
                <AssetIcon key="supply-apy" symbol={symbol} assetTag="a" className="-ml-[6px] size-4 first:ml-0" />
              )}
              {filteredRewards?.map((reward) => (
                <RewardAssetIcon key={reward.address} reward={reward} className="-ml-[6px] size-4 first:ml-0" />
              ))}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side={isTouchDevice ? "top" : "right"} align="start">
        <div
          className={cn(
            "border-main-950 bg-main-50 flex flex-col gap-2.5 border p-4 text-[15px]",
            isTouchDevice ? "max-w-[280px] min-w-[240px]" : "min-w-60",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AssetIcon symbol={symbol} assetTag="a" className="size-[18px]" />
              <div>Aave Supply Yield</div>
            </div>
            <NumberDisplay value={supplyApy} type="percent" />
          </div>
          {filteredRewards.map((reward) => (
            <div key={reward.address} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <RewardAssetIcon reward={reward} className="size-[18px] shrink-0" />
                <div>Umbrella rewards in {reward.symbol}</div>
              </div>
              <NumberDisplay value={reward.apy} type="percent" />
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
