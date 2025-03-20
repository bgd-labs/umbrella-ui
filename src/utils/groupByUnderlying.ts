import { isReserve } from "@/utils/isReserve";
import { Reserve, StataToken, UnderlyingToken } from "@/types/token";

export const groupByUnderlying = (
  positions?: (Reserve | StataToken)[],
  underlyings?: UnderlyingToken[],
) => {
  if (positions && underlyings) {
    return [...positions, ...underlyings].toSorted((a, b) => {
      const aUnderlying = isReserve(a) ? a.underlyingAddress : a.reserve.underlyingAddress;
      const bUnderlying = isReserve(b) ? b.underlyingAddress : b.reserve.underlyingAddress;

      return aUnderlying.localeCompare(bUnderlying);
    });
  }

  return positions || underlyings || [];
};
