---
id: umbrella-ui
title: Umbrella UI
sidebar_label: Umbrella UI
sidebar_position: 5
---

# Umbrella UI

Interactive web interface for staking, rewards management, and yield tracking.

## Implementation & Code

- [GitHub Repository](https://github.com/aave-dao/aave-umbrella-ui) - Full source code and documentation

## Quick Start Guide

### Staking

1. [Open the Website](https://stake.onaave.com)

2. Connect your wallet
   
   ![Connect Wallet](/img/ui-connect-wallet.png)

3. Select asset to stake
   
   Once your wallet is connected, you will see a "Stake" button appear next to the assets you have in your wallet.
   
   ![Select Asset](/img/ui-select-asset.png)

4. Enter amount
   
   ![Enter Amount](/img/ui-enter-amount.png)

5. Confirm transaction

   ![Confirm Transaction](/img/ui-confirm-transaction.png)

   Confirmation can be done in two ways (depends on asset):
* **Permit signature**: Off-chain signature, no additional gas cost
* **Approve transaction**: On-chain approval, requires separate gas payment
   
The method is determined by the token's smart contract capabilities. Older tokens like USDT only support the approve method. 

**ETH wrapping**: ETH requires wrapping to WETH first (since ETH is not an ERC-20 token).

6. Stake
   
   ![Stake](/img/ui-stake.png)

### Claim Rewards

1. Navigate to the main dashboard
   
   At the top of the screen you can see your staked assets and available rewards.

2. Claim your rewards
   
   ![Claim Rewards](/img/ui-claim-rewards.png)

### Unstake

1. Navigate to the main dashboard
   
   Initiate cooldown period for the asset you want to unstake.
   
   ![Initiate Cooldown](/img/ui-initiate-cooldown.png)

2. Withdraw your assets
   
   Once the cooldown is over, you have a 2-day window to withdraw your assets.
