"use client";

import {
  createTransactionsTrackerStore,
  TransactionsTrackerStore,
} from "@/store/transactionsTracker";
import { createContext, PropsWithChildren, useCallback, useContext, useRef } from "react";
import { useStore } from "zustand/react";
import { useAccount } from "wagmi";

export type TransactionsTrackerStoreApi = ReturnType<typeof createTransactionsTrackerStore>;

export const TransactionsTrackerStoreContext = createContext<TransactionsTrackerStoreApi | null>(
  null,
);

export type TransactionsTrackerStoreProviderProps = PropsWithChildren;

export const TransactionsTrackerStoreProvider = ({
  children,
}: TransactionsTrackerStoreProviderProps) => {
  const storeRef = useRef<TransactionsTrackerStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createTransactionsTrackerStore();
  }

  return (
    <TransactionsTrackerStoreContext.Provider value={storeRef.current}>
      {children}
    </TransactionsTrackerStoreContext.Provider>
  );
};

export const useTransactionsTrackerStore = <T,>(
  selector: (store: TransactionsTrackerStore) => T,
): T => {
  const counterStoreContext = useContext(TransactionsTrackerStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};

export const useTrackTransaction = () => {
  const { address: wallet } = useAccount();
  const trackTransaction = useTransactionsTrackerStore((state) => state.addTransaction);

  return useCallback(
    (args: Omit<Parameters<typeof trackTransaction>[0], "wallet">) => {
      if (!wallet) {
        throw new Error("wallet is not connected");
      }
      return trackTransaction({
        wallet,
        ...args,
      });
    },
    [trackTransaction, wallet],
  );
};
