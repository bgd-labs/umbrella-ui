import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { StkToken, TokenType } from "@/types/token";
import { calculateAPYEarnings } from "@/utils/calculations";
import { formatUSDPrice } from "@/utils/formatting";
import { NumberFlowGroup } from "@number-flow/react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export type APYAndEarningsForecastProps = {
  amount: bigint;
  initialTokenType: Exclude<TokenType, "stk" | "stkStata"> | "native";
  stkToken: StkToken;
};

export const APYAndEarningsForecast = ({ amount, initialTokenType, stkToken }: APYAndEarningsForecastProps) => {
  const currentAPY =
    initialTokenType === "underlying" || initialTokenType === "native" ? 0 : stkToken.apyData.pool.total;
  const totalAPY = stkToken.apyData.total;

  const amountUsd = formatUSDPrice({
    balance: amount,
    decimals: stkToken.decimals,
    usdPrice: stkToken.latestAnswer,
  });

  const currentEarnings = calculateAPYEarnings(amountUsd, currentAPY);
  const stakedEarnings = calculateAPYEarnings(amountUsd, totalAPY);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold dark:text-white">APY</h2>

        <div className="-mr-2 flex items-center gap-3">
          <NumberDisplay value={currentAPY} type="percent" className="font-semibold" />
          <ArrowRight className="size-4 text-gray-400" />
          <APYBreakdown
            symbol={stkToken.underlying.symbol}
            totalApy={stkToken.apyData.total}
            supplyApy={stkToken.apyData.pool.total}
            rewards={stkToken.rewards}
            displayRewards={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold dark:text-white">Earnings</h2>
        </div>

        <div className="flex items-center gap-3">
          <NumberFlowGroup>
            <div>
              <NumberDisplay
                value={currentEarnings}
                type="currency"
                className="font-semibold"
                prefix="~"
                suffix="/year"
              />
            </div>
            <motion.div layout transition={{ duration: 0.35 }}>
              <ArrowRight className="size-4 text-gray-400" />
            </motion.div>
            <div>
              <NumberDisplay
                value={stakedEarnings}
                type="currency"
                className="font-semibold"
                prefix="~"
                suffix="/year"
              />
            </div>
          </NumberFlowGroup>
        </div>
      </div>
    </>
  );
};
