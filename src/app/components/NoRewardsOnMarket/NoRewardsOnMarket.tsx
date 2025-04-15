import NoRewardsOnMarketIcon from "../../../../public/images/no-rewards-on-market.svg";

export const NoRewardsOnMarket = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <NoRewardsOnMarketIcon />
      <div className="max-w-[440px] text-center text-xl">
        At the moment, there is no asset with rewards on Umbrella in this pool
      </div>
    </div>
  );
};
