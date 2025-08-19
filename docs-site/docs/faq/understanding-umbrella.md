---
id: understanding-umbrella-and-staking-risks
title: Understanding Umbrella and Staking Risks
sidebar_label: Understanding Risks
sidebar_position: 1
---

## Which risks do I need to be aware of when staking on Umbrella?

The primary risk associated with Umbrella is slashing, which occurs if a deficit accrues in the asset connected to the Aave pool (for example, USDC in the v3 Ethereum Core, if you are staking aUSDC). Historically, the Aave DAO has never slashed stakers in the previous Safety Module. Umbrella has a mechanism called "offset," which ensures that the DAO will cover the first loss up to a specified amount (e.g., 100,000 in the case of USDT or USDC). However, it is essential to understand that slashing can happen.

Additionally, as with any smart contract system, there is potential for bugs that could lead to issues. We've minimized these risks through extensive security procedures detailed in our forum post and proposal, as well as through our internal development processes at BGD and four external security audits.

## How frequently is slashing expected to happen?

In a protocol like Aave, small deficits in highly borrowed assets are likely but typically occur on a very low scale.

For example, in a recent month of operation, approximately $400 in deficits accrued across all Aave Pools. Compared to nearly $9.5 billion in outstanding borrows, this represents about 0.000004% of total monthly borrowings.

Umbrella is designed to implement relatively frequent slashing, but at a very low magnitude, with the combined rewards and supply APY of aTokens generally exceeding the losses from slashing.

Given that the DAO reliably establishes an offset to prevent slashing below a certain threshold and that the Safety Module has *never been slashed* historically, significant slashing events should not occur frequently.

However, Umbrella operates as a fair and rational system: you earn rewards as a staker while also accepting the associated risks.

## Can you elaborate on what the Umbrella deficit offset means in simple terms?

For instance, in this initial proposal, the DAO configures an offset of 100,000 USDT for staked USDT. This means that the Aave v3 Core pool must accrue more than 100,000 USDT in bad debt before any staked USDC assets are slashed. Essentially, the DAO absorbs that amount first to cover any losses, protecting stakers.

## If I stake my aUSDC on Arbitrum, do I face slashing risk only from Arbitrum or from all Aave pools?

If you stake aUSDC on Arbitrum, you are only accepting slashing risk for borrowed USDC within that specific Arbitrum pool, and not from any other pools.

## What happens if the staked asset pool cannot fully cover a large deficit?

While the protocol design allows for slashing up to the full staked amount in extreme scenarios, the offset mechanisms significantly reduce the likelihood of any slashing for typical deficit scenarios. If a deficit exceeds the available staked assets, the protocol may utilize additional risk management mechanisms. However, given the historical data showing minimal deficits relative to total borrowings, such scenarios are highly unlikely.
