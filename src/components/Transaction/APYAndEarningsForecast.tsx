import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { applyMinimumTotalAssets } from "@/hooks/useAllStkTokens";
import { StkToken } from "@/types/token";
import { calculateApyData, calculateAPYEarnings } from "@/utils/calculations";
import { calculateRewardApy } from "@/utils/calculations/apy/apy";
import { formatUSDPrice } from "@/utils/formatting";
import { NumberFlowGroup } from "@number-flow/react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const calculateForecastedStkToken = (stkToken: StkToken, amount: bigint) => {
  const forecastedStkToken = {
    ...stkToken,
    totalAssets: stkToken.totalAssets + amount,
    rewards: stkToken.rewards.map((reward) => {
      const currentTotalAssets = applyMinimumTotalAssets(stkToken.totalAssets, reward.distributionEnd);
      const totalAssets = currentTotalAssets + amount;
      const apy = calculateRewardApy({
        maxEmissionPerSecond: reward.maxEmissionPerSecond,
        targetLiquidity: stkToken.targetLiquidity,
        totalAssets,
        distributionEnd: reward.distributionEnd,
        decimals: stkToken.decimals,
        price: stkToken.latestAnswer,
        priceFeedDecimals: PRICE_FEED_DECIMALS,
        token: {
          decimals: reward.decimals,
          price: reward.latestAnswer,
          priceFeedDecimals: PRICE_FEED_DECIMALS,
        },
      });

      return {
        ...reward,
        apy,
      };
    }),
  };

  return {
    ...forecastedStkToken,
    apyData: calculateApyData(forecastedStkToken),
  };
};

const getCurrentApy = (stkToken: StkToken) => {
  if (stkToken.balance) {
    return stkToken.apyData.total;
  }
  if (stkToken.reserve?.balance) {
    return stkToken.apyData.pool.total;
  }
  return 0;
};

export type APYAndEarningsForecastProps = {
  amount: bigint;
  stkToken: StkToken;
};

export const APYAndEarningsForecast = ({ amount, stkToken }: APYAndEarningsForecastProps) => {
  const currentAPY = getCurrentApy(stkToken);

  const forecastedStkToken = calculateForecastedStkToken(stkToken, amount);

  const usdAmount = formatUSDPrice({
    balance: amount,
    decimals: stkToken.decimals,
    usdPrice: stkToken.latestAnswer,
  });

  const totalAmountUSD = (stkToken.usdAmount ?? 0) + usdAmount;
  const currentEarnings = calculateAPYEarnings(totalAmountUSD, currentAPY);
  const stakedEarnings = calculateAPYEarnings(totalAmountUSD, forecastedStkToken.apyData.total);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold dark:text-white">APY</h2>

        <div className="-mr-2 flex items-center gap-3">
          <NumberDisplay value={currentAPY} type="percent" className="font-semibold" />
          <ArrowRight className="size-4 text-gray-400" />
          <APYBreakdown
            symbol={forecastedStkToken.underlying.symbol}
            totalApy={forecastedStkToken.apyData.total}
            supplyApy={forecastedStkToken.apyData.pool.total}
            rewards={forecastedStkToken.rewards}
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
