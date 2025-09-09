---
id: migration-and-current-safety-module-users
title: Migration and Current Safety Module Users
sidebar_label: Safety Module Migration
sidebar_position: 5
---

## I'm staking GHO on Safety Module. What should I do?

It depends on your preferences.

You can remain on the legacy stkGHO without any risk of slashing and with a cooldown period of 20 days, although this option offers lower rewards.

Alternatively, you can migrate to Umbrella stkGHO, which provides higher rewards but comes with a risk of slashing and a 20-day cooldown. If you choose to migrate, please follow these steps once the governance proposal is approved and executed:

1. Initiate a cooldown (this is a required step, but you won't need to utilize the cooldown period) on the legacy stkGHO.
2. Unstake your GHO.
3. Stake your GHO on Umbrella, for example, at [stake.onaave.com](https://stake.onaave.com/), an instance of the official [Aave Umbrella UI](https://github.com/aave-dao/aave-umbrella-ui), which is owned by the DAO and operated by BGD Labs.

## I'm staking AAVE and ABPT on the legacy Safety Module (stkAAVE, stkABPT). Is there anything I should be aware of or need to do?

During this initial activation phase of Umbrella, no action is required if you are staking on stkAAVE or stkABPT. However, it is important to note that the slashing percentage — the amount the system can slash from your staked balance — has been reduced from 30% to 20%, and rewards have been slightly decreased as well. Despite these changes, the system remains fully functional.

## If I'm using the current Safety Module (stkAAVE, stkABPT, stkGHO), do I need to do something?

Under the Aavenomics proposal, stkAAVE and stkABPT will undergo some changes, the most significant being that slashing will eventually be disabled after the activation of Umbrella.

However, Umbrella operates as a separate system, where the assets to stake are aTokens (e.g., aUSDC, aUSDT), not $AAVE or LP tokens like Balancer ABPT. Therefore, if you are holding stkAAVE or stkABPT, no action is required on the Umbrella side.

For stkGHO, a migration will be necessary, but since slashing and cooldown will be disabled, the process will be straightforward: simply withdraw from the legacy stkGHO and stake in the Staked GHO of Umbrella.
