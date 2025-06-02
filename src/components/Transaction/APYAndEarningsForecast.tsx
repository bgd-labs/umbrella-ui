import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { applyMinimumTotalAssets } from "@/hooks/useAllStkTokens";
import { StkToken, TokenType } from "@/types/token";
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

const getCurrentApy = (stkToken: StkToken, sourceTokenType: Exclude<TokenType, "stk" | "stkStata"> | "native") => {
  if (sourceTokenType === "native" || sourceTokenType === "underlying") {
    return 0;
  }
  return stkToken.apyData.pool.total;
};

export type APYAndEarningsForecastProps = {
  amount: bigint;
  sourceTokenType: Exclude<TokenType, "stk" | "stkStata"> | "native";
  stkToken: StkToken;
};

export const APYAndEarningsForecast = ({ amount, sourceTokenType, stkToken }: APYAndEarningsForecastProps) => {
  const currentAPY = getCurrentApy(stkToken, sourceTokenType);

  const forecastedStkToken = calculateForecastedStkToken(stkToken, amount);

  const currentUSDAmount = stkToken.usdAmount ?? 0;
  const stakedUSDAmount = formatUSDPrice({
    balance: amount,
    decimals: stkToken.decimals,
    usdPrice: stkToken.latestAnswer,
  });

  const totalAmountUSD = currentUSDAmount + stakedUSDAmount;
  const currentEarnings = calculateAPYEarnings(currentUSDAmount, currentAPY);
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

const getCurrentApyForWithdrawal = (stkToken: StkToken, targetTokenType: TokenType) => {
  if (targetTokenType === "underlying") {
    return 0;
  }
  if (targetTokenType === "a") {
    return stkToken.reserve?.apy || 0;
  }
  if (targetTokenType === "stata") {
    return stkToken.reserve?.apy || 0;
  }
  return stkToken.apyData.pool.total;
};

export type APYAndEarningsForecastWithdrawalProps = {
  amount: bigint;
  targetTokenType: TokenType;
  stkToken: StkToken;
};

export const APYAndEarningsForecastWithdrawal = ({
  amount,
  targetTokenType,
  stkToken,
}: APYAndEarningsForecastWithdrawalProps) => {
  const currentAPY = stkToken.apyData.total;
  const targetAPY = getCurrentApyForWithdrawal(stkToken, targetTokenType);

  const currentUSDAmount = stkToken.usdAmount ?? 0;
  const withdrawalUSDAmount = formatUSDPrice({
    balance: amount,
    decimals: stkToken.decimals,
    usdPrice: stkToken.latestAnswer,
  });

  const currentEarnings = calculateAPYEarnings(currentUSDAmount, currentAPY);
  const targetEarnings = calculateAPYEarnings(withdrawalUSDAmount, targetAPY);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold dark:text-white">APY</h2>

        <div className="-mr-2 flex items-center gap-3">
          <APYBreakdown
            symbol={stkToken.underlying.symbol}
            totalApy={stkToken.apyData.total}
            supplyApy={stkToken.apyData.pool.total}
            rewards={stkToken.rewards}
            displayRewards={false}
          />
          <ArrowRight className="size-4 text-gray-400" />
          <NumberDisplay value={targetAPY} type="percent" className="font-semibold" />
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
                value={targetEarnings}
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
