import {
  calculateHealthFactor,
  calculateNewHealthFactor,
  getHealthStatus,
} from "@/utils/calculateHealthFactor";
import { Reserve } from "@/types/token";
import { HealthFactor } from "@/components/HealthFactor/HealthFactor";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { cn } from "@/utils/cn";

export type HealthFactorBreakdownProps = {
  reserveId: number;
  newBalance: bigint;
  positions: Reserve[];
};

export const HealthFactorBreakdown = ({
  reserveId,
  newBalance,
  positions,
}: HealthFactorBreakdownProps) => {
  const currentHF = calculateHealthFactor({ positions });
  const newHF = calculateNewHealthFactor({ positions }, { reserveId, balance: newBalance });
  const newHFStatus = getHealthStatus(newHF);

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn("capitalize", {
          "text-[#39BEB7]": newHFStatus === "healthy",
          "text-secondary-500": newHFStatus === "moderate",
          "text-red-500": newHFStatus === "risky",
        })}
      >
        {newHFStatus}
      </div>

      <div className="flex items-center gap-2">
        <HealthFactor value={currentHF} />

        <ArrowRightIcon className="text-main-500" />

        <HealthFactor value={newHF} />
      </div>
    </div>
  );
};
