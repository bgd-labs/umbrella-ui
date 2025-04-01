import { Reserve, StataToken, UnderlyingToken } from "@/types/token";
import { isReserve } from "@/utils/web3";

export const groupByUnderlying = (positions?: (Reserve | StataToken)[], underlyings?: UnderlyingToken[]) => {
  if (positions && underlyings) {
    return [...positions, ...underlyings].toSorted((a, b) => {
      const aUnderlying = isReserve(a) ? a.underlyingAddress : a.type === "stata" ? a.underlying.address : a.address;
      const bUnderlying = isReserve(b) ? b.underlyingAddress : b.type === "stata" ? b.underlying.address : b.address;

      return aUnderlying.localeCompare(bUnderlying);
    });
  }

  return positions || underlyings || [];
};
