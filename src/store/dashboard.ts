import { createSelectors } from "@/store/createSelectors";
import { CooldownStatus } from "@/types/cooldown";
import { Address } from "viem";
import { create } from "zustand";

export interface DashboardStore {
  umbrellaCooldownStatusMap: Record<Address, CooldownStatus>;
  setCooldownStatus: (payload: { assetAddress: Address; status: CooldownStatus }) => void;
}

export const useDashboardStoreBase = create<DashboardStore>()((set) => ({
  umbrellaCooldownStatusMap: {},
  setCooldownStatus: ({ assetAddress, status }) =>
    set((store) => ({
      umbrellaCooldownStatusMap: {
        ...store.umbrellaCooldownStatusMap,
        [assetAddress]: status,
      },
    })),
}));

export const useUmbrellaCooldown = (assetAddress: Address) => {
  return useDashboardStore.use.umbrellaCooldownStatusMap()[assetAddress];
};

export const useDashboardStore = createSelectors(useDashboardStoreBase);
