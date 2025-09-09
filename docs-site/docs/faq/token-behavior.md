---
id: token-behavior-and-technical-details
title: Token Behavior and Technical Details
sidebar_label: Token Behavior
sidebar_position: 3
---

## While staking aTokens, does my balance grow? Does the staked token rebase?

No, the system always wraps your rebasing aTokens before staking them on Umbrella. However, if you use the Umbrella UI, the wrapping and unwrapping process occurs transparently for you in a single transaction.

When you unstake from Umbrella, you can choose whether to withdraw a rebasing aToken or a non-rebasing (wrapped) one, or to completely exit Aave.

## I see that when staking on Umbrella, my aTokens don't increase in balance but do increase in value. How is that possible?

The assets you stake in Umbrella are wrapped aTokens (previously referred to as [stata/static aTokens](https://github.com/aave-dao/aave-v3-origin/tree/main/src/contracts/extensions/stata-token)). These represent a special version of aTokens that grow in value (exchange rate) rather than in balance. However, in terms of yield, both wrapped and non-wrapped versions are essentially equivalent.

If you use [stake.onaave.com](https://stake.onaave.com/), the interface will recognize any underlying asset type and wrap it appropriately for you. This means that whether you have USDT, aUSDT (rebasing, which increases balance), or waUSDT (already wrapped), the interface will allow you to stake seamlessly.

Upon unstaking, the interface will also let you choose which type of underlying asset you wish to receive, such as USDT, aUSDT, or waUSDT.

## I am staking aUSDT in Umbrella, and the UI shows me $1,000, while I only have ~888 aUSDT staked. How is that possible?

What you are staking are wrapped aTokens, which are based on the exchange rate. This means that 1 wrapped aUSDT has a higher value than USDT or non-wrapped (rebasing) aUSDT. As a result, your ~888 staked aUSDT translates to a value of $1,000.
