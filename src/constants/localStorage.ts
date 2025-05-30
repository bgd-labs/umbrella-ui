export const LOCAL_STORAGE_APP_PREFIX = "aave-umbrella-ui";

export const LOCAL_STORAGE_KEYS = {
  MARKET: `${LOCAL_STORAGE_APP_PREFIX}:store:market`,
  TRANSACTIONS_TRACKER: `${LOCAL_STORAGE_APP_PREFIX}:store:transactionsTracker`,
  USER_AGREEMENT: `${LOCAL_STORAGE_APP_PREFIX}:userAgreement`,
} as const;
