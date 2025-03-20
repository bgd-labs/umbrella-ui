import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { useAccount } from "wagmi";
import { calculateMetrics } from "@/utils/calculateMetrics";
import { calculateLinearInterest } from "@/utils/calculateCompoundedInterestPerSecond";
import { DonutChart } from "@/components/DonutChart/DonutChart";
import { calculateAvailableToStakeUsd } from "@/utils/calculateAvailableToStakeUsd";
import { Button } from "@/components/ui/Button";
import { Asset, StkToken } from "@/types/token";
import Image from "next/image";

export type SummaryProps = {
  umbrellaTokens?: StkToken[];
  assets: Asset[];
};

export const Summary = ({ umbrellaTokens, assets }: SummaryProps) => {
  const { address } = useAccount();

  if (!address || !umbrellaTokens || !assets) {
    return null;
  }

  const { totalApy, totalStakedUsd, totalClaimableYield } = calculateMetrics(umbrellaTokens);
  const availableToStakeUsd = calculateAvailableToStakeUsd(assets);
  const monthlyYield = calculateLinearInterest(totalStakedUsd, totalApy, 1) - totalStakedUsd;
  const yearlyYield = calculateLinearInterest(totalStakedUsd, totalApy, 12) - totalStakedUsd;

  const chartData = [
    { value: totalStakedUsd, colour: "#ffd400" },
    { value: availableToStakeUsd, colour: "#6D6C53" },
  ];

  return (
    <div className="flex h-[168px]">
      <div className="bg-main-950 flex grow items-center justify-between px-10 dark:bg-[#17171a]">
        <div className="flex items-center gap-4">
          <DonutChart data={chartData} size={70} thickness={10} />

          <div className="flex flex-col">
            <div className="text-secondary-500 text-xl">Total Staked</div>
            <div className="flex items-end gap-1">
              <NumberDisplay
                value={totalStakedUsd}
                type="currency"
                className="text-2xl font-semibold text-white"
              />
              <span className="text-base text-[#E2E7F2]">/</span>
              <NumberDisplay
                value={availableToStakeUsd}
                type="currency"
                className="text-base font-semibold text-[#E2E7F2]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-secondary-500 flex items-center gap-2 text-xl">
            <div>You are earning</div>
            <NumberDisplay value={totalApy} type="percent" className="text-lg font-semibold" />
          </div>

          <div className="flex gap-7">
            <div className="flex flex-col">
              <div className="text-xs text-[#BCBBBB]">Monthly</div>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-white">~</span>
                <NumberDisplay
                  value={monthlyYield}
                  type="currency"
                  className="text-2xl font-semibold text-white"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-xs text-[#BCBBBB]">Yearly</div>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-white">~</span>
                <NumberDisplay
                  value={yearlyYield}
                  type="currency"
                  className="text-2xl font-semibold text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-main-950 relative flex w-[234px] flex-col justify-center bg-[#F4B00D] px-7">
        <Image
          src="/images/summary-bg.svg"
          width={100}
          height={100}
          alt="Token"
          priority
          className="absolute top-0 right-0"
        />
        <div className="text-base font-semibold">
          Claimable <br /> Rewards
        </div>
        <NumberDisplay
          value={totalClaimableYield}
          type="currency"
          className="mt-2 mb-3 text-[30px] font-semibold"
        />
        <div>
          {totalClaimableYield > 0 && (
            <Button elevation={1} href="/claim-all-rewards" primary className="font-semibold">
              Claim all
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
