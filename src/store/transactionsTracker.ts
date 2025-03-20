import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Address } from "viem";
import { ChainId } from "@/types/market";

const CURRENT_STORE_VERSION = 1;

export type TransactionStoreItem = {
  isSafeWallet: boolean;
  hash: `0x${string}`;
  chainId: ChainId;
  description: string;
  timestamp: number;
};

export type WalletTransactionsStore = Record<string, TransactionStoreItem>;

export type TransactionsTrackerState = {
  store: Record<Address, WalletTransactionsStore>;
};

export type TransactionsTrackerActions = {
  addTransaction: (payload: {
    isSafeWallet?: boolean;
    wallet: Address;
    chainId: ChainId;
    hash: `0x${string}`;
    description: string;
  }) => void;
  reset: () => void;
};

export type TransactionsTrackerStore = TransactionsTrackerState & TransactionsTrackerActions;

export const defaultInitState: TransactionsTrackerState = {
  store: {},
};

export const createTransactionsTrackerStore = (
  initState: TransactionsTrackerState = defaultInitState,
) => {
  return createStore<TransactionsTrackerStore>()(
    persist(
      (set) => ({
        ...initState,

        addTransaction: ({ isSafeWallet = false, wallet, chainId, hash, description }) =>
          set((currentStore) => {
            const walletTransactions = currentStore.store[wallet] || {};
            const newTransactionItem: TransactionStoreItem = {
              chainId,
              hash,
              description,
              isSafeWallet,
              timestamp: Date.now(),
            };
            return {
              ...currentStore,
              store: {
                ...currentStore.store,
                [wallet]: {
                  ...walletTransactions,
                  [hash]: newTransactionItem,
                },
              },
            };
          }),

        reset: () => set({ ...initState }),
      }),
      {
        name: "store:transactionsTracker",
        storage: createJSONStorage(() => localStorage),
        version: CURRENT_STORE_VERSION,
        // migrate: (persistedState: unknown, version: number) => {
        //   if (version === 0 || version !== CURRENT_STORE_VERSION) {
        //     return undefined;
        //   }
        //
        //   return persistedState;
        // },
        partialize: (state) => ({
          store: state.store,
        }),
      },
    ),
  );
};
