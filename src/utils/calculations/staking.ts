import { Asset } from "@/types/token";

export const calculateAvailableToStakeUsd = (assets: Asset[]) => {
  return assets.reduce((acc, asset) => {
    if (asset.usdAmount) {
      return acc + asset.usdAmount;
    }

    return acc;
  }, 0);
};
