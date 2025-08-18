---
id: helpers
title: Helpers
sidebar_label: Helpers
sidebar_position: 1
parent: smart-contracts
---

# Helpers

In addition to core smart contracts, Umbrella has multiple helpers that ensures its smooth operation.

## Umbrella Batch Helper

The Umbrella Batch Helper streamlines user interactions by combining multiple operations into single transactions. Users can deposit and withdraw across different token types, while StakeToken holders can also claim rewards and activate cooldowns. The helper includes built-in security features that ensure all funds always go to the transaction sender, preventing potential misuse even if signatures are compromised.

[View on GitHub](https://github.com/bgd-labs/aave-umbrella-private/blob/94877012666992c68d1de48b35ba727e5073c813/src/contracts/helpers/README.md)

## DataAggregationHelper

The DataAggregationHelper aggregates comprehensive system data across all StakeTokens and their associated rewards. Instead of making multiple separate calls to different contracts, this helper aggregates information about total assets, target liquidity levels, reward emission rates, and distribution schedules into unified responses.

[View on GitHub](https://github.com/bgd-labs/umbrella-docs/blob/main/umbrella-raw-data-fetching.md)

## DeficitOffsetClinicSteward

The DeficitOffsetClinicSteward covers reserve deficits up to configured offset thresholds without requiring individual governance proposals for each coverage event. It draws funds from the Aave Treasury and covers deficits when they occur, preventing small shortfalls from accumulating into larger problems. The steward operates with predefined limits and permissions, allowing the finance committee to execute coverage operations efficiently while maintaining proper oversight and fund management.

[View on GitHub](https://github.com/aave-dao/aave-umbrella/blob/main/src/contracts/stewards/DeficitOffsetClinicSteward.sol)

## UmbrellaConfigEngine

The UmbrellaConfigEngine simplifies complex governance operations by bundling multiple configuration changes into single transactions. Instead of executing dozens of separate calls to update StakeToken parameters, slashing configurations, and reward settings, governance can use this engine to perform comprehensive system updates atomically. It handles everything from creating new StakeTokens with full configuration to removing existing ones, while automatically managing dependencies like approvals and parameter validations.

[View on GitHub](https://github.com/aave-dao/aave-umbrella/blob/main/src/contracts/payloads/configEngine/UmbrellaConfigEngine.sol)

## SlashingRobot

The SlashingRobot provides automated monitoring and execution of slashing operations when reserves face deficits. It continuously checks all StakeTokens to identify which ones need slashing, then executes those operations automatically. The robot includes safety features like reserve disabling capabilities, limitations on the number of simultaneous checks to prevent overload, and triggering slashing when the required conditions are met.

[View on GitHub](https://github.com/aave-dao/aave-umbrella/blob/main/src/contracts/automation/SlashingRobot.sol)

## GelatoSlashingRobot

The GelatoSlashingRobot is a specialized automation contract that integrates with Gelato's decentralized automation network to perform slashing operations. It extends the basic SlashingRobot functionality by formatting its responses specifically for Gelato's execution requirements, encoding function calls with proper selectors that Gelato can execute automatically when slashing conditions are met.

[View on GitHub](https://github.com/aave-dao/aave-umbrella/blob/main/src/contracts/automation/GelatoSlashingRobot.sol)
