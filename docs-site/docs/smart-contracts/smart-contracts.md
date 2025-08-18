---
id: smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
sidebar_position: 1
---

# Smart Contracts

The complete implementation details, code examples, and integration guides:
- [Full code base](https://github.com/aave-dao/aave-umbrella)
- [Umbrella](https://github.com/aave-dao/aave-umbrella/blob/main/src/contracts/umbrella/README.md)
- [StakeToken](https://github.com/aave-dao/aave-umbrella/tree/main/src/contracts/stakeToken)
- [Rewards controller](https://github.com/bgd-labs/aave-umbrella-private/tree/94877012666992c68d1de48b35ba727e5073c813/src/contracts/rewards)

The Umbrella system operates through a network of interconnected smart contracts – automated programs that execute financial operations without human intervention. These contracts work together to manage the protection system, each handling specific responsibilities while communicating with the others.

Once deployed, they operate 24/7 across multiple blockchain networks, constantly monitoring conditions and executing actions when predetermined criteria are met. In Umbrella's case, the contracts manage everything from detecting reserve shortfalls to distributing rewards to participants.

## The Contract Architecture

Umbrella's smart contract system is built around three core components, each designed with specific roles:

### Umbrella Contract

At the heart of the system lies the main **Umbrella** contract, which acts as the command center. This contract continuously monitors lending markets across different blockchain networks, automatically calculating when and how much funding is needed to address shortfalls. When intervention is required, it triggers the necessary actions across other contracts in the system.

### StakeToken Contract

**StakeToken** contract serves as secure vaults where protective assets are held. It manages exchange rates, handles reward distributions through integrated hooks, and enforces withdrawal rules through cooldown mechanisms. Each protected market has its own dedicated StakeToken contract configured for its specific requirements.

### RewardsController Contract

The **RewardsController** contract manages the distribution of multiple reward types to participants. It tracks contributions, calculates earnings, and handles the claims process, ensuring that those who help protect the system are compensated for their participation.

## How They Work Together

These contracts don't operate in isolation. They communicate through interconnected calls and data sharing, creating a system where each component supports the others. When a reserve deficit occurs, the central contract assesses the situation, determines the required response, and triggers the appropriate StakeToken contracts to provide coverage, while simultaneously updating reward calculations through the RewardsController.

This automated coordination eliminates the delays and potential errors of manual intervention, creating a safety net that responds in real-time to protect the broader ecosystem.
