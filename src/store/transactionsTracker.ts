import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { ChainId } from "@/types/market";
import { Address } from "viem";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export const createTransactionsTrackerStore = (initState: TransactionsTrackerState = defaultInitState) => {
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
        name: LOCAL_STORAGE_KEYS.TRANSACTIONS_TRACKER,
        storage: createJSONStorage(() => localStorage),
        version: CURRENT_STORE_VERSION,
      },
    ),
  );
};
