import { HealthFactor } from "@/components/HealthFactor/HealthFactor";
import { Reserve } from "@/types/token";
import { calculateHealthFactor, calculateNewHealthFactor } from "@/utils/calculations";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export type HealthFactorBreakdownProps = {
  reserveId: number;
  newBalance: bigint;
  positions: Reserve[];
};

export const HealthFactorBreakdown = ({ reserveId, newBalance, positions }: HealthFactorBreakdownProps) => {
  const currentHF = calculateHealthFactor({ positions });
  const newHF = calculateNewHealthFactor({ positions }, { reserveId, balance: newBalance });

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold dark:text-white">Health factor</h2>

      <div className="flex items-center gap-2">
        <HealthFactor value={currentHF} />

        <motion.div layout transition={{ duration: 0.35 }}>
          <ArrowRight className="size-4 text-gray-400" />
        </motion.div>

        <HealthFactor value={newHF} />
      </div>
    </div>
  );
};
