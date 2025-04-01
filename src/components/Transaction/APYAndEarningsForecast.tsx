import { APYBreakdown } from "@/app/components/APYBreakdown/APYBreakdown";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { StkToken, TokenType } from "@/types/token";
import { calculateAPYEarnings } from "@/utils/calculations";
import { formatUSDPrice } from "@/utils/formatting";

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
        <div className="flex flex-col gap-3">
          <h2 className="font-bold dark:text-white">Current APY</h2>
          <NumberDisplay value={currentAPY} type="percent" className="font-semibold" />
        </div>

        <div className="flex flex-col items-end gap-3">
          <h2 className="font-bold dark:text-white">Staked APY</h2>
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
          <h2 className="font-bold dark:text-white">Current Earning</h2>
          <div>
            <span className="font-semibold">~</span>
            <NumberDisplay value={currentEarnings} type="currency" className="font-semibold" />
            /year
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <h2 className="font-bold dark:text-white">You&apos;ll earn</h2>
          <div>
            <span className="font-semibold">~</span>
            <NumberDisplay value={stakedEarnings} type="currency" className="font-semibold" />
            /year
          </div>
        </div>
      </div>
    </>
  );
};
