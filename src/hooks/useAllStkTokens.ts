import { useAccount, useReadContract } from "wagmi";
import { UMBRELLA_DATA_AGGREGATION_HELPER_ABI } from "@/abis/umbrellaDataAggregationHelper";
import { useMemo } from "react";
import { formatBigInt } from "@/utils/formatBigInt";
import { useAllReserves } from "@/hooks/useAllReserves";
import { useRelatedAssets } from "@/hooks/useRelatedAssets/useRelatedAssets";
import { ZERO_CONTRACT_ADDRESS } from "@/constants/contracts";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { formatUSDPrice } from "@/utils/formatUSDPrice";
import { calculateEmissionPerYear } from "@/utils/apy";
import { calculateApyData } from "@/utils/calculateApyData";
import { Reward, StkToken } from "@/types/token";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useAllReservesUnderlyings } from "@/hooks/useAllReservesUnderlyings";

export const useAllStkTokens = () => {
  const { address: owner } = useAccount();
  const { chainId, umbrellaDataAggregationHelper, umbrellaHelper, rewardsController, oracle } =
    useCurrentMarket();

  const { data: assetsDict, isLoading: isAssetsDictLoading } = useRelatedAssets();
  const { data: reserves, isLoading: isReservesLoading } = useAllReserves();
  const { data: underlyings, isLoading: isUnderlyingsLoading } = useAllReservesUnderlyings();

  const { data, isLoading, ...rest } = useReadContract({
    chainId,
    abi: UMBRELLA_DATA_AGGREGATION_HELPER_ABI,
    address: umbrellaDataAggregationHelper,
    functionName: "getAllAggregatedData",
    args: [umbrellaHelper, rewardsController, oracle, owner ?? ZERO_CONTRACT_ADDRESS],
  });

  return {
    data: useMemo(() => {
      if (!data || !reserves || !assetsDict || !underlyings) return undefined;

      const [aggregatedData, , userAggregatedData] = data;

      return aggregatedData
        .map(({ stakeTokenData, rewardsTokenData, totalAssets }, index) => {
          const { stakeUserBalance, rewardsTokenUserData } = userAggregatedData?.[index] ?? {};
          const underlyingAddress = assetsDict.umbrella[stakeTokenData.token].underlying;
          const reserveAddress = assetsDict.umbrella[stakeTokenData.token].aToken;
          const isUnderlyingStataToken = !!reserveAddress;

          const underlying = underlyings.find((token) => token.address === underlyingAddress)!;
          const reserve = reserves.find((reserve) => reserve.address === reserveAddress);
          const rewards: Reward[] = rewardsTokenData.map(
            ({ currentEmissionPerSecondScaled, rewardTokenData }, rewardIndex) => {
              const { currentReward } = rewardsTokenUserData?.[rewardIndex] ?? {};

              return {
                type: "underlying",
                address: rewardTokenData.token,
                name: rewardTokenData.name,
                symbol: rewardTokenData.symbol,
                decimals: rewardTokenData.decimals,
                balance: currentReward,
                balanceFormatted: formatBigInt(currentReward, rewardTokenData.decimals),
                latestAnswer: rewardTokenData.price,
                latestAnswerFormatted: formatBigInt(rewardTokenData.price, PRICE_FEED_DECIMALS),
                usdAmount: formatUSDPrice({
                  balance: currentReward,
                  decimals: rewardTokenData.decimals,
                  usdPrice: rewardTokenData.price,
                }),
                currentEmissionPerSecondScaled,
                apy: calculateEmissionPerYear({
                  totalAssets,
                  decimals: stakeTokenData.decimals,
                  usdPrice: stakeTokenData.price,
                  reward: { usdPrice: rewardTokenData.price, currentEmissionPerSecondScaled },
                }),
              };
            },
          );
          const stkToken: Omit<StkToken, "apyData"> = {
            type: "stk",
            address: stakeTokenData.token,
            name: stakeTokenData.name,
            symbol: stakeTokenData.symbol,
            decimals: stakeTokenData.decimals,
            balance: stakeUserBalance,
            balanceFormatted: formatBigInt(stakeUserBalance, stakeTokenData.decimals),
            latestAnswer: stakeTokenData.price,
            latestAnswerFormatted: formatBigInt(stakeTokenData.price, PRICE_FEED_DECIMALS),
            usdAmount: formatUSDPrice({
              balance: stakeUserBalance,
              decimals: stakeTokenData.decimals,
              usdPrice: stakeTokenData.price,
            }),
            isUnderlyingStataToken,
            totalAssets,
            totalRewardsUSDAmount: rewards.reduce(
              (acc, { usdAmount }) => acc + (usdAmount ?? 0),
              0,
            ),
            rewards,
            reserve: reserve ?? null,
            underlying,
          };

          return {
            ...stkToken,
            apyData: calculateApyData(stkToken),
          } satisfies StkToken;
        })
        .filter((stkToken) => !!stkToken);
    }, [assetsDict, underlyings, reserves, data]),
    isLoading: isAssetsDictLoading || isUnderlyingsLoading || isReservesLoading || isLoading,
    ...rest,
  } as const;
};
