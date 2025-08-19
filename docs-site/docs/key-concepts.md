---
id: key-concepts
title: Key Concepts
sidebar_label: Key Concepts
sidebar_position: 2
---

# Key Concepts

Understanding Umbrella requires familiarity with several core concepts. This section provides clear explanations of essential terms and mechanisms that operate the Umbrella system.

## Staking

### aToken

aTokens are interest-bearing tokens you receive when supplying assets to Aave. They represent your share of the supplied liquidity and automatically accrue interest over time.

### StakeToken

The specific token you receive when staking in Umbrella. Each StakeToken represents your staked position for a particular asset on a specific network.

### How Staking Works in Umbrella

You can participate in Umbrella by bringing either:

- **aTokens you already have**

  In this case, you stake your existing aTokens directly.

- **underlying tokens**

  In this case, you deposit underlying tokens (e.g., USDC), which are automatically deposited into Aave as aTokens (e.g., aUSDC) and then are staked in Umbrella.

:::tip Double Yield Benefit
**In both cases, you get double yield benefit:** Aave supply yield + Umbrella staking rewards.
:::

<!-- Note: Image reference removed - you'll need to add the image to your Docusaurus static/img folder -->
<!-- ![Staking Process](./img/staking-process.png) -->

## Deficit

Bad debt that has accumulated in an Aave pool when borrowers' collateral value falls below their debt obligations, making positions uncollectible.

**How it works:** When a borrower's debt exceeds their collateral value and can't be recovered, the loss becomes a deficit. For example, if a borrower owes 1,000 USDC but their remaining collateral is only worth 900 USDC after a market crash, the 100 USDC difference becomes a deficit.

**Umbrella's role:** The system automatically detects a deficit above configured thresholds and triggers proportional slashing of staked aTokens to cover it.

## Slashing

**Slashing is** the automated reduction of staked token balances to cover the accumulated deficit in the associated Aave pool.

**How it's triggered:** Unlike the legacy Safety Module, which required governance votes, Umbrella slashing is automated, triggered when the deficit exceeds preset thresholds, precise (only slashes the exact amount needed), and asset-specific (only affects stakers of the specific asset with a deficit).

:::note Example Scenario
**The values below are hypothetical and used for demonstration only**

1,000 USDC deficit accumulates on Aave v3 Ethereum. An automated system calls slash(USDC) on the Umbrella core contract. Let's say that the deficit offset is configured at 500 USDC. That means only 500 USDC worth of staked wrapped aUSDC gets slashed.
:::

## Safety Module vs Umbrella

**Safety Module:** The previous system where users are staking AAVE, GHO, and stkABPT tokens to earn rewards while covering potential bad debt. Still operational, it requires governance votes for slashing decisions and involves selling slashed assets to cover deficits in different tokens.

**Umbrella advantages:** Users stake aTokens (or underlying tokens that get converted to aTokens) to directly cover a deficit in the same asset. This provides automated slashing based on actual deficit detection, eliminates the need for asset sales since aTokens can be burned directly, and offers more capital-efficient coverage with potentially higher yields from the double-earning mechanism.

## Deficit Offset

**Deficit Offset** is a buffer threshold below which no slashing occurs ([see current deficit offsets per token](https://dash.onaave.com/umbrella/?umbrellaFields=stakeTokenSymbol%2CtotalAssets%2CtotalSupply%2CtargetLiquidity%2Ccooldown%2CunstakeWindow%2CdeficitOffset%2CpendingDeficit%2CactiveRewards)).

**Purpose:** This mechanism allows the DAO to absorb small amounts of deficit without triggering slashing events, providing additional protection for stakers against minor bad debt occurrences while ensuring that larger deficits are still covered through the slashing mechanism. However, once this buffer is fully used, any future deficit will trigger slashing unless the governance establishes a new offset.

## Asset-Specific Coverage

Each staked token protects only its associated borrowed asset.

**How it works:** If you stake aUSDC, you are only accepting slashing risk for any bad debt that occurs with USDC on AAVE pools, nothing else.

**Benefits:**

- **Targeted risk:** Stake for assets you actually use on networks you're active on
- **User clarity:** Clear understanding of what you're protecting
- **Operational simplicity:** No complex cross-chain coordination required

## Target Liquidity

**Target liquidity** is the optimal staking amount used to calibrate reward rates dynamically for each token staked in Umbrella.

**How it works:** Instead of fixed reward rates, Umbrella uses Target Liquidity to automatically adjust incentives. When total staked assets are below target, rewards are proportionally higher to attract more stakers. At target liquidity, the system distributes maximum configured reward rate. If the pool reaches this limit, no further deposits will be accepted that helps to maintain the intended yield.

:::tip Example
- Target Liquidity set at 10M USDC for staked waUSDC
- At low staking amounts: ~16% APY (higher to attract capital)
- At exactly 10M staked: ~8.3% APY rewards. Once target liquidity is reached, additional deposits are blocked, so the APY stays at 8.3% or increases if users unstake
:::

## Rewards Rate

Emission curve is the mathematical model that determines reward rates based on how much is currently staked relative to Target Liquidity.

Traditional systems allocate a fixed number of tokens per second, regardless of participation levels. This creates problems: when few people stake, they receive massive rewards; when many people stake, rewards become negligible. Umbrella's emission curve solves this issue by making reward distribution proportional to the number of tokens staked.

**How it works:** Instead of fixed emission rates, the curve uses a mathematical formula that gradually adjusts the total reward pool based on proximity to Target Liquidity. It prevents unsustainable APY spikes during periods of low liquidity and when large numbers of users decide to stake, ensures predictable costs.

## Getting Rewards

When you stake your tokens, you immediately start earning rewards that accrue every second over time, based on your share of the total staked amount and the current reward rate.

You can claim rewards at any time while your tokens remain staked and continue earning. The system supports claiming multiple reward tokens in a single transaction and allows you to authorize other addresses to claim rewards on your behalf.

## Unstaking

To unstake your tokens and rewards, you need to initiate a withdrawal. Umbrella currently maintains a 20-day cooldown period plus a 2-day withdrawal window, though these parameters can be changed by governance in the future. During cooldown, your tokens remain staked and earn rewards but cannot be withdrawn. After the cooldown completes, you have a 2-day window to complete the withdrawal; otherwise, you need to restart the cooldown process.
