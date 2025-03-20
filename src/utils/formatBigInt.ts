import { formatUnits } from "viem";

export const formatBigInt = (value?: bigint, decimals: number = 18) => {
  if (!value) {
    return 0;
  }
  try {
    return Number(formatUnits(value, decimals));
  } catch (error) {
    console.error("Error formatting bigInt value:", error);
    return 0;
  }
};
