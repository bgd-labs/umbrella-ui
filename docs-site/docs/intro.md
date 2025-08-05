---
sidebar_position: 1
slug: /
---

# What is Umbrella?

Umbrella is an Aave system allowing stake Aave aTokens to earn rewards, but accepting risk of slashing to cover any deficit accrued on the Aave pools.

## How does Umbrella work?

As commented, users can stake assets such as aUSDC into Umbrella, and receive rewards for taking on slashing risk.

The process involves the following:

1. **Staking:** Users deposit their aTokens (e.g., aUSDC) into Umbrella, and receive Umbrella stake aUSDC.

2. **Rewards Accumulation:** While the user has its aUSDC staked on Umbrella, they still earn yield from supplying on Aave, but also additional rewards in one or multiple tokens, which may include AAVE, GHO, or other assets, depending on the pool.

3. **Claiming rewards:** At any point in time, users can claim all rewards accrued.

4. **Withdrawal process (cooldown and withdrawal window):** To withdraw staked assets, users must first initiate a cooldown period that can last for example 20 days, depending on Umbrella's configuration. Once the cooldown period ends, the user has a withdrawal window to complete the withdrawal, also depending on Umbrella's configuration, but for example of 2 days.

This structured process ensures that withdrawals are orderly and prevents sudden spikes in unstaking, which could potentially destabilize the system.

## User Risks

- This interface is non-custodial: it allows users to connect their wallet applications, building transactions to be submitted to the Umbrella smart contracts.

- All configurations of Umbrella are based on smart contracts controlled by the Aave decentralized governance. This means that over time, aspects like rewards, cooldown period, withdrawal window, or even assets available to stake depend solely and exclusively on the Umbrella smart contracts, not anyhow on this interface.

- The Umbrella system of smart contracts this interface connects is based on a principle of risk and reward: **if you are a user staking in Umbrella and a deficit is accrued on the connected asset on the Aave pool, you can potentially be slashed.** By interacting with the Umbrella contract, you explicitly accept this risk and any consequences arising from it, including earning rewards as compensation for assuming the risk.

## More information and links

- [Aave Governance forum describing Umbrella](https://governance.aave.com/t/arfc-aave-umbrella-activation/21521)
- [Aave Umbrella smart contracts codebase](https://github.com/aave-dao/aave-umbrella)
- [Aave Umbrella UI codebase](https://github.com/aave-dao/aave-umbrella-ui)
- [Block explorer data fetching guide](https://github.com/bgd-labs/umbrella-docs/blob/main/umbrella-raw-data-fetching.md)
- [FAQ](https://github.com/bgd-labs/umbrella-docs/blob/main/umbrella-faq.md)

---

_This documentation is continuously updated. If you have questions or suggestions, please reach out through our official channels._
