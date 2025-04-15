import NoRewardsOnMarketIcon from "../../../../public/images/no-rewards-on-market.svg";

export const NoRewardsOnMarket = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-14">
      <NoRewardsOnMarketIcon />
      <div className="max-w-[440px] text-center text-xl">
        At the moment, umbrella rewards are not offered on any assets in the chosen market
      </div>
    </div>
  );
};
