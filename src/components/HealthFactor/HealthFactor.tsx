import { InfinityIcon } from "lucide-react";
import NumberFlow from "@number-flow/react";
import React from "react";

export type HealthFactorProps = {
  value: number;
};

export const HealthFactor = ({ value }: HealthFactorProps) => {
  if (value === Infinity) {
    return <InfinityIcon />;
  }

  return (
    <NumberFlow
      value={value}
      format={{
        notation: "compact",
        maximumFractionDigits: 2,
        roundingMode: "floor",
      }}
      className="text-base font-normal font-semibold"
    />
  );
};
