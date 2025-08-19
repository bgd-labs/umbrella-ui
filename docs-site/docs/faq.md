---
id: umbrella-faq
title: Umbrella FAQ
sidebar_label: FAQ
sidebar_position: 9
---

# Umbrella FAQ

## Understanding Umbrella and Staking Risks

### Which risks do I need to be aware of when staking on Umbrella?

The primary risk associated with Umbrella is slashing, which occurs if a deficit accrues in the asset connected to the Aave pool (for example, USDC in the v3 Ethereum Core, if you are staking aUSDC). Historically, the Aave DAO has never slashed stakers in the previous Safety Module. Umbrella has a mechanism called "offset", which ensures that the DAO will cover the first loss up to a specified amount (e.g., 100,000 in the case of USDT or USDC). However, it is essential to understand that slashing can happen.

Additionally, as with any smart contract system, there is potential for bugs that could lead to issues. We've minimized these risks through extensive security procedures detailed in our forum post and proposal, as well as through our internal development processes at BGD and four external security audits.

### How frequently is slashing expected to happen?

In a protocol like Aave, small deficits in highly borrowed assets are likely but typically occur on a very low scale.

For example, in a recent month of operation, approximately $400 in deficits accrued across all Aave Pools. Compared to nearly $9.5 billion in outstanding borrows, this represents about 0.000004% of total monthly borrowings.

Umbrella is designed to implement relatively frequent slashing, but at a very low magnitude, with the combined rewards and supply APY of aTokens generally exceeding the losses from slashing.

Given that the DAO reliably establishes an offset to prevent slashing below a certain threshold and that the Safety Module has *never been slashed* historically, significant slashing events should not occur frequently.

However, Umbrella operates as a fair and rational system: you earn rewards as a staker while also accepting the associated risks.

### Can you elaborate on what the Umbrella deficit offset means in simple terms?

For instance, in this initial proposal, the DAO configures an offset of 100,000 USDT for staked USDT. This means that the Aave v3 Core pool must accrue more than 100,000 USDT in bad debt before any staked USDC assets are slashed. Essentially, the DAO absorbs that amount first to cover any losses, protecting stakers.

### If I stake my aUSDC on Arbitrum, do I face slashing risk only from Arbitrum or from all Aave pools?

If you stake aUSDC on Arbitrum, you are only accepting slashing risk for borrowed USDC within that specific Arbitrum pool, and not from any other pools.

### What happens if the staked asset pool cannot fully cover a large deficit?

While the protocol design allows for slashing up to the full staked amount in extreme scenarios, the offset mechanisms significantly reduce the likelihood of any slashing for typical deficit scenarios. If a deficit exceeds the available staked assets, the protocol may utilize additional risk management mechanisms. However, given the historical data showing minimal deficits relative to total borrowings, such scenarios are highly unlikely.

## Rewards and Yields

### What happens to the yield I accrued on my aTokens when staking?

You continue to accrue yield while staking because *the aToken itself is being staked*. For example, if aUSDC yields 6% on Aave and Umbrella rewards provide an additional 4%, when staking, you would earn a total of 6% + 4% = 10%.

### Will I always earn the APY defined in the previous forum posts?

Not quite. Umbrella yield consists of two components:

1. When staking any non-GHO token (such as USDC, USDT, or WETH initially), you will earn aToken yield (for instance, ~4% on aUSDT as of June 1). This yield will automatically accrue to your staked assets, increasing their value if no slashing occurs and there is ongoing yield on Aave.

2. Additionally, for assuming slashing risk, Umbrella provides continuous rewards. The DAO can adjust these rewards over time, but they should always represent an extra yield percentage on top of the basic Aave yield. To understand the dynamics of how the Umbrella Emission Curve works, we recommend reading the detailed explanation. As a general rule: if the target liquidity is set at 100 million USDC and the configured rewards yield an additional 5%, this means that when nobody is staking, the total yield could be 10% (double the aToken yield). If total staked assets exceed 100 million USDC, the yield percentage will decrease but will always remain higher than the yield earned from just supplying on Aave.

### How do I accrue Umbrella rewards? And how do I claim them?

Once you start staking, you will continuously accrue Umbrella rewards. You can claim these rewards at any time by executing a blockchain transaction, for example, via [stake.onaave.com](https://stake.onaave.com/). The process is fully on-chain.

### Can I earn multiple types of reward tokens simultaneously?

Yes, each staked asset can simultaneously earn up to eight different reward token types. The Aave DAO governance controls target liquidity levels, maximum emission rates, reward token selection, and distribution periods for these multiple reward streams.

## Token Behavior and Technical Details

### While staking aTokens, does my balance grow? Does the staked token rebase?

No, the system always wraps your rebasing aTokens before staking them on Umbrella. However, if you use the Umbrella UI, the wrapping and unwrapping process occurs transparently for you in a single transaction.

When you unstake from Umbrella, you can choose whether to withdraw a rebasing aToken or a non-rebasing (wrapped) one, or to completely exit Aave.

### I see that when staking on Umbrella, my aTokens don't increase in balance but do increase in value. How is that possible?

The assets you stake in Umbrella are wrapped aTokens (previously referred to as [stata/static aTokens](https://github.com/aave-dao/aave-v3-origin/tree/main/src/contracts/extensions/stata-token)). These represent a special version of aTokens that grow in value (exchange rate) rather than in balance. However, in terms of yield, both wrapped and non-wrapped versions are essentially equivalent.

If you use [stake.onaave.com](https://stake.onaave.com/), the interface will recognize any underlying asset type and wrap it appropriately for you. This means that whether you have USDT, aUSDT (rebasing, which increases balance), or waUSDT (already wrapped), the interface will allow you to stake seamlessly.

Upon unstaking, the interface will also let you choose which type of underlying asset you wish to receive, such as USDT, aUSDT, or waUSDT.

### I am staking aUSDT in Umbrella, and the UI shows me $1,000, while I only have ~888 aUSDT staked. How is that possible?

What you are staking are wrapped aTokens, which are based on the exchange rate. This means that 1 wrapped aUSDT has a higher value than USDT or non-wrapped (rebasing) aUSDT. As a result, your ~888 staked aUSDT translates to a value of $1,000.

## Staking and Unstaking Process

### I don't have WETH, but only ETH in my wallet. Can I still stake?

Yes, if you use [stake.onaave.com](https://stake.onaave.com/), the UI will automatically create the transaction to convert your ETH into WETH before staking.

### What do I need to do to unstake from Umbrella?

The process is quite similar to the legacy Safety Module: first, you must activate the cooldown for the amount you are currently staking. After waiting for the cooldown period, which is currently configured to 20 days, you can then unstake your assets. While it is not officially part of the system, since Umbrella is tokenized, a secondary market for staked Umbrella tokens may emerge, allowing you to access the underlying assets without going through the cooldown (though this might involve a fee).

### Can I stake additional tokens while my cooldown period is active?

Yes, you can stake additional tokens during an active cooldown period. However, staking additional tokens during an active cooldown does not affect the ongoing cooldown period. The newly staked tokens will not be eligible for unstaking until a new cooldown period is initiated and completed for those tokens.

### What happens to my cooldown if I receive staked tokens from another user?

When you receive staked tokens through a transfer, your cooldown status is independent of the sender's cooldown. The transferred tokens do not automatically inherit the cooldown period of the sender. You must initiate or continue the cooldown based on your own cooldown status for any tokens you wish to unstake.

### How does unstaking affect my remaining staked tokens?

After the cooldown period has elapsed, only the amount of tokens that were staked and in cooldown can be unstaked. Unstaking resets the cooldown period to zero for the unstaked amount, requiring a new cooldown to be activated for any remaining staked tokens if you want to unstake them later.

## Migration and Current Safety Module Users

### I'm staking GHO on Safety Module. What should I do?

It depends on your preferences.

You can remain on the legacy stkGHO without any risk of slashing and with a cooldown period of 20 days, although this option offers lower rewards.

Alternatively, you can migrate to Umbrella stkGHO, which provides higher rewards but comes with a risk of slashing and a 20-day cooldown. If you choose to migrate, please follow these steps once the governance proposal is approved and executed:

1. Initiate a cooldown (this is a required step, but you won't need to utilize the cooldown period) on the legacy stkGHO.
2. Unstake your GHO.
3. Stake your GHO on Umbrella, for example, at [stake.onaave.com](https://stake.onaave.com/), an instance of the official [Aave Umbrella UI](https://github.com/aave-dao/aave-umbrella-ui), which is owned by the DAO and operated by BGD Labs.

### I'm staking AAVE and ABPT on the legacy Safety Module (stkAAVE, stkABPT). Is there anything I should be aware of or need to do?

During this initial activation phase of Umbrella, no action is required if you are staking on stkAAVE or stkABPT. However, it is important to note that the slashing percentage — the amount the system can slash from your staked balance — has been reduced from 30% to 20%, and rewards have been slightly decreased as well. Despite these changes, the system remains fully functional.

### If I'm using the current Safety Module (stkAAVE, stkABPT, stkGHO), do I need to do something?

Under the Aavenomics proposal, stkAAVE and stkABPT will undergo some changes, the most significant being that slashing will eventually be disabled after the activation of Umbrella.

However, Umbrella operates as a separate system, where the assets to stake are aTokens (e.g., aUSDC, aUSDT), not $AAVE or LP tokens like Balancer ABPT. Therefore, if you are holding stkAAVE or stkABPT, no action is required on the Umbrella side.

For stkGHO, a migration will be necessary, but since slashing and cooldown will be disabled, the process will be straightforward: simply withdraw from the legacy stkGHO and stake in the Staked GHO of Umbrella.

## Future Expansion and Additional Information

### I have different assets than the ones enabled in this proposal, or I am using Aave on another non-Ethereum network. Will I be able to use Umbrella?

We plan to expand Umbrella to include additional Aave pools in the near future, incorporating assets that do not require staking, provided they do not accrue a deficit. Therefore, even if you currently do not have USDC, USDT, ETH, or GHO on Ethereum to stake, you should still be able to participate with other assets in the future, subject to Aave governance decisions.

### What is the role of BGD Labs in the project?

As service providers to the Aave DAO, we designed and developed Umbrella. However, like other Aave DAO smart contracts, we do not control the instances activated by governance proposals. Our ongoing role involves monitoring system functionality and security while suggesting improvements and supporting other service providers working with Umbrella. Additionally, we developed and maintain one instance of the official [**Aave Umbrella UI owned by the DAO**](https://github.com/aave-dao/aave-umbrella-ui) at [**stake.onaave.com**](https://stake.onaave.com/). This software is fully permissioned and can be accessed by anyone; it assists users of the Umbrella smart contracts in building transactions and visualizing data.
