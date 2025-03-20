import { useAllUmbrellaCooldowns } from "@/hooks/useAllUmbrellaCooldowns/useAllUmbrellaCooldowns";
import { Address } from "viem";

export const useUmbrellaCooldownData = (address: Address) => {
  const { data: umbrellasToCooldownsMap, ...rest } = useAllUmbrellaCooldowns();

  return {
    data: umbrellasToCooldownsMap?.[address],
    ...rest,
  } as const;
};
