---
id: staking-and-unstaking-process
title: Staking and Unstaking Process
sidebar_label: Staking Process
sidebar_position: 4
---

## I don't have WETH, but only ETH in my wallet. Can I still stake?

Yes, if you use [stake.onaave.com](https://stake.onaave.com/), the UI will automatically create the transaction to convert your ETH into WETH before staking.

## What do I need to do to unstake from Umbrella?

The process is quite similar to the legacy Safety Module: first, you must activate the cooldown for the amount you are currently staking. After waiting for the cooldown period, which is currently configured to 20 days, you can then unstake your assets. While it is not officially part of the system, since Umbrella is tokenized, a secondary market for staked Umbrella tokens may emerge, allowing you to access the underlying assets without going through the cooldown (though this might involve a fee).

## Can I stake additional tokens while my cooldown period is active?

Yes, you can stake additional tokens during an active cooldown period. However, staking additional tokens during an active cooldown does not affect the ongoing cooldown period. The newly staked tokens will not be eligible for unstaking until a new cooldown period is initiated and completed for those tokens.

## What happens to my cooldown if I receive staked tokens from another user?

When you receive staked tokens through a transfer, your cooldown status is independent of the sender's cooldown. The transferred tokens do not automatically inherit the cooldown period of the sender. You must initiate or continue the cooldown based on your own cooldown status for any tokens you wish to unstake.

## How does unstaking affect my remaining staked tokens?

After the cooldown period has elapsed, only the amount of tokens that were staked and in cooldown can be unstaked. Unstaking resets the cooldown period to zero for the unstaked amount, requiring a new cooldown to be activated for any remaining staked tokens if you want to unstake them later.
