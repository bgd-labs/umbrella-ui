import { InfinityIcon } from "lucide-react";
import NumberFlow from "@number-flow/react";
import React from "react";
import { getHealthStatus } from "@/utils/calculations";
import { cn } from "@/utils/cn";

export type HealthFactorProps = {
  value: number;
};

export const HealthFactor = ({ value }: HealthFactorProps) => {
  if (value === Infinity) {
    return <InfinityIcon />;
  }

  const status = getHealthStatus(value);
  const colorClass = {
    "text-[#39BEB7]": status === "healthy",
    "text-secondary-500": status === "moderate",
    "text-red-500": status === "risky",
  };

  return (
    <NumberFlow
      value={value}
      format={{
        notation: "compact",
        maximumFractionDigits: 2,
        roundingMode: "floor",
      }}
      className={cn("text-base font-semibold", colorClass)}
    />
  );
};
