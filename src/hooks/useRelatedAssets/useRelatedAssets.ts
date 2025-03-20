import { useUmbrellaAssets } from "@/hooks/useRelatedAssets/useUmbrellaAssets";
import { useMemo } from "react";
import { Address } from "viem";
import { AssetsDictionary, UmbrellaAssetsDictionary } from "@/types/addressesDictionary";

const mapAssets = (
  relatedAssetsMap: Record<Address, UmbrellaAssetsDictionary>,
): AssetsDictionary => {
  const umbrellaAddresses = Object.keys(relatedAssetsMap) as Address[];

  return {
    underlying: umbrellaAddresses.reduce(
      (acc, address) => ({
        ...acc,
        [relatedAssetsMap[address].underlying]: {
          aToken: relatedAssetsMap[address].aToken,
          stataToken: relatedAssetsMap[address].stataToken,
          umbrella: address,
        },
      }),
      {} as AssetsDictionary["underlying"],
    ),
    aToken: umbrellaAddresses.reduce(
      (acc, address) => {
        if (!relatedAssetsMap[address].aToken) {
          return acc;
        }
        return {
          ...acc,
          [relatedAssetsMap[address].aToken]: {
            underlying: relatedAssetsMap[address].underlying,
            stataToken: relatedAssetsMap[address].stataToken,
            umbrella: address,
          },
        };
      },
      {} as AssetsDictionary["aToken"],
    ),
    stataToken: umbrellaAddresses.reduce(
      (acc, address) => {
        if (!relatedAssetsMap[address].stataToken) {
          return acc;
        }
        return {
          ...acc,
          [relatedAssetsMap[address].stataToken]: {
            underlying: relatedAssetsMap[address].underlying,
            aToken: relatedAssetsMap[address].aToken,
            umbrella: address,
          },
        };
      },
      {} as AssetsDictionary["stataToken"],
    ),
    umbrella: relatedAssetsMap,
  } as const;
};

export const useRelatedAssets = () => {
  const { data: relatedAssets, ...rest } = useUmbrellaAssets();
  const data = useMemo(() => {
    if (!relatedAssets) {
      return undefined;
    }
    return mapAssets(relatedAssets);
  }, [relatedAssets]);

  return {
    data,
    ...rest,
  };
};
