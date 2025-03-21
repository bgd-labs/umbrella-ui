import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { useAccount } from "wagmi";
import { calculateMetrics } from "@/utils/calculateMetrics";
import { calculateLinearInterest } from "@/utils/calculateCompoundedInterestPerSecond";
import { calculateAvailableToStakeUsd } from "@/utils/calculateAvailableToStakeUsd";
import { Button } from "@/components/ui/Button";
import { Asset, StkToken } from "@/types/token";
import Image from "next/image";
import { SummaryChart } from "@/app/components/Summary/SummaryChart";

export type SummaryProps = {
  umbrellaTokens?: StkToken[];
  assets: Asset[];
};

export const Summary = ({ umbrellaTokens, assets }: SummaryProps) => {
  const { address } = useAccount();

  if (!address || !umbrellaTokens || !assets) {
    return null;
  }

  const { totalApy, totalStakedUsd, totalClaimableYield } =
    calculateMetrics(umbrellaTokens);
  const availableToStakeUsd = calculateAvailableToStakeUsd(assets);
  const monthlyYield =
    calculateLinearInterest(totalStakedUsd, totalApy, 1) - totalStakedUsd;
  const yearlyYield =
    calculateLinearInterest(totalStakedUsd, totalApy, 12) - totalStakedUsd;

  return (
    <div className="flex flex-col md:flex-row md:h-[168px]">
      <div className="bg-main-950 flex grow items-center justify-between md:justify-start md:gap-4 px-6 py-6 md:px-10 dark:bg-[#17171a]">
        <SummaryChart
          totalStaked={totalStakedUsd}
          availableToStake={availableToStakeUsd}
        />

        <div className="flex flex-col gap-4 md:grow-1 md:gap-0 md:flex-row md:items-center justify-between">
          <div className="flex flex-col gap-2 md:mr-auto">
            <h2 className="text-secondary-500">Total Staked</h2>
            <div className="flex items-end gap-1">
              <NumberDisplay
                value={totalStakedUsd}
                type="currency"
                className="text-2xl md:text-4xl font-semibold text-white"
              />
              <span className="mb-1 md:mb-2 font-bold text-base text-[#E2E7F2]">
                /
              </span>
              <NumberDisplay
                value={availableToStakeUsd}
                type="currency"
                className="mb-1 md:mb-2 text-xs md:text-base font-semibold text-[#E2E7F2]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2">
            <div className="text-secondary-500 flex items-center gap-2 text-xl">
              <h2 className="text-secondary-500">You are earning</h2>
              <NumberDisplay
                value={totalApy}
                type="percent"
                className="text-base md:text-lg font-semibold"
              />
            </div>

            <div className="flex flex-col md:flex-row md:gap-7">
              <div className="flex flex-row items-center md:items-start md:flex-col not-md:gap-1.5">
                <div className="text-xs md:text-base text-[#BCBBBB]">
                  Monthly
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-semibold text-white">
                    ~
                  </span>
                  <NumberDisplay
                    value={monthlyYield}
                    type="currency"
                    className="text-lg md:text-2xl font-semibold text-white"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center -mt-1 md:mt-0 md:items-start md:flex-col not-md:gap-1.5">
                <div className="text-xs md:text-base text-[#BCBBBB]">
                  Yearly
                </div>
                <div className="flex items-center">
                  <span className="text-lg md:text-2xl font-semibold text-white">
                    ~
                  </span>
                  <NumberDisplay
                    value={yearlyYield}
                    type="currency"
                    className="text-lg md:text-2xl font-semibold text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-main-950 relative flex not-md:items-center md:w-[234px] justify-between md:flex-col md:justify-center bg-[#F4B00D] px-6 py-5 md:px-7 md:py-0">
        <Image
          src="/images/summary-bg.svg"
          width={100}
          height={100}
          alt="Token"
          priority
          className="not-md:size-[84px] absolute top-0 right-0"
        />
        <div className="flex flex-col">
          <div className="text-base md:font-semibold leading-none">
            Claimable <br className="not-md:hidden" /> Rewards
          </div>
          <NumberDisplay
            value={totalClaimableYield}
            type="currency"
            className="-mb-1 md:mt-2 md:mb-3 text-2xl md:text-[30px] font-semibold"
          />
        </div>
        <div className="not-md:flex not-md:items-center">
          {totalClaimableYield > 0 && (
            <Button
              elevation={1}
              href="/claim-all-rewards"
              primary
              className="font-semibold"
            >
              Claim all
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
