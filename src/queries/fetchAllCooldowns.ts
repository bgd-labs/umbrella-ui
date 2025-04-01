import { UMBRELLA_ABI } from "@/abis/umbrella";
import { config } from "@/configs/wagmi";
import { ChainId } from "@/types/market";
import { readContract } from "@wagmi/core";
import { Address } from "viem";

export type CooldownData = {
  amount: bigint;
  endOfCooldown: number;
  withdrawalWindow: number;
  withdrawalEndsAt: number;
};

export const fetchAllCooldowns = async ({
  chainId,
  addresses,
  owner,
}: {
  chainId: ChainId;
  addresses: Address[];
  owner: Address;
}) => {
  try {
    const cooldowns = await Promise.all(
      addresses.map((address) =>
        readContract(config, {
          chainId,
          address,
          abi: UMBRELLA_ABI,
          functionName: "getStakerCooldown",
          args: [owner],
        }),
      ),
    );
    return cooldowns.reduce(
      (acc, { amount, endOfCooldown, withdrawalWindow }, index) => {
        return {
          ...acc,
          [addresses[index]]: {
            amount,
            endOfCooldown,
            withdrawalWindow,
            withdrawalEndsAt: endOfCooldown + withdrawalWindow,
          },
        };
      },
      {} as Record<Address, CooldownData>,
    );
  } catch (error) {
    throw new Error("Could not fetch cooldown parameters");
  }
};
