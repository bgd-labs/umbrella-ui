---
id: umbrella-intro
title: Umbrella Overview
sidebar_label: Overview
sidebar_position: 1
slug: /
---

# Umbrella Overview

Aave Umbrella is a system of permissionless staking smart contracts designed to protect the Aave liquidity protocol. Through this system, users can stake their Aave aTokens to earn rewards in exchange for accepting slashing risk—meaning their staked tokens may be reduced to cover potential losses within the Aave liquidity protocol

## How does Umbrella work?

Users can stake assets such as aUSDC into Umbrella and receive a staked version of the same asset (e.g., staked aUSDC) in return, eligible for rewards. On the other side, this deposit can be slashed to cover the deficit of the same asset.

## The Staking Process

![Umbrella Diagram](/img/Umbrella_Post_Diagram_1.jpg)

1. **Staking:** Users deposit their aTokens (e.g., aUSDC) into Umbrella and receive a corresponding staked token.

2. **Rewards Accumulation:** While the user has their aToken staked in Umbrella, they continue to earn yield from supplying liquidity to Aave and also receive additional rewards. The reward is paid out in the same token you staked. For example, if you stake aUSDC, your reward will be in aUSDC. Umbrella supports multiple staking options, so you can choose which token to stake based on your preference (USDC, WETH, USDT etc.).

3. **Claiming Rewards:** At any time, users can claim all accumulated rewards.

4. **Withdrawal Process:**
   - To withdraw staked assets, users must first initiate a withdrawal which has a cooldown period. The duration of this period is defined by Umbrella's smart contract configuration (currently set to 20 days).
   - After the cooldown ends, there is a limited withdrawal window (currently set to 2 days) during which users can complete their withdrawal.

This structured process **ensures orderly withdrawals** and helps prevent sudden spikes in unstaking that could destabilize the system.

## User Risks

:::warning Important Risks
Please carefully review these risks before using Umbrella:
:::

- **Non-custodial interface:** Users connect their wallets and submit transactions directly to Umbrella smart contracts. This means users maintain full control of their funds, but are also responsible for transaction security and wallet safety.

- **On-chain parameters:** All rewards, cooldowns, withdrawal windows, and staking configurations are defined by smart contracts, not this interface. The smart contracts have undergone security audits, but users should understand that smart contract interactions carry inherent risks.

- **Slashing risk:** If deficit occurs in an Aave pool for a specific asset, users who staked that asset may be partially slashed. By using Umbrella, users accept this risk in exchange for earning rewards.
