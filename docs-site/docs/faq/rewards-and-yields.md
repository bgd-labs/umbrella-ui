---
id: rewards-and-yields
title: Rewards and Yields
sidebar_label: Rewards and Yields
sidebar_position: 2
---

## What happens to the yield I accrued on my aTokens when staking?

You continue to accrue yield while staking because *the aToken itself is being staked*. For example, if aUSDC yields 6% on Aave and Umbrella rewards provide an additional 4%, when staking, you would earn a total of 6% + 4% = 10%.

## Will I always earn the APY defined in the previous forum posts?

Not quite. Umbrella yield consists of two components:

1. When staking any non-GHO token (such as USDC, USDT, or WETH initially), you will earn aToken yield (for instance, ~4% on aUSDT as of June 1). This yield will automatically accrue to your staked assets, increasing their value if no slashing occurs and there is ongoing yield on Aave.

2. Additionally, for assuming slashing risk, Umbrella provides continuous rewards. The DAO can adjust these rewards over time, but they should always represent an extra yield percentage on top of the basic Aave yield. To understand the dynamics of how the Umbrella Emission Curve works, we recommend reading the detailed explanation. As a general rule: if the target liquidity is set at 100 million USDC and the configured rewards yield an additional 5%, this means that when nobody is staking, the total yield could be 10% (double the aToken yield). If total staked assets exceed 100 million USDC, the yield percentage will decrease but will always remain higher than the yield earned from just supplying on Aave.

## How do I accrue Umbrella rewards? And how do I claim them?

Once you start staking, you will continuously accrue Umbrella rewards. You can claim these rewards at any time by executing a blockchain transaction, for example, via [stake.onaave.com](https://stake.onaave.com/). The process is fully on-chain.

## Can I earn multiple types of reward tokens simultaneously?

Yes, each staked asset can simultaneously earn up to eight different reward token types. The Aave DAO governance controls target liquidity levels, maximum emission rates, reward token selection, and distribution periods for these multiple reward streams.
