import { WriteContractErrorType } from "@wagmi/core";

// Didn't find a better way to distinct "User rejected the transaction" error
export const isUserRejectedTransactionError = (error?: WriteContractErrorType | Error | null) => {
  return (
    error &&
    "details" in error &&
    error?.name === "ContractFunctionExecutionError" &&
    error.details.includes("User rejected")
  );
};
