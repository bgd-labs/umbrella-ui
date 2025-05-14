import { EMode } from "@/types/eMode";

export const getEModeForReserve = (userEMode: EMode | null, reserveId: number) => {
  if (!userEMode) {
    return null;
  }

  if (isReserveEnabledOnBitmap(userEMode.collateralBitmap, reserveId)) {
    return userEMode;
  }

  return null;
};

export const isReserveEnabledOnBitmap = (bitmap: number, reserveId: number) => {
  return ((bitmap >> reserveId) & 1) !== 0;
};
