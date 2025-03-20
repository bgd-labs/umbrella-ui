import { useAllStataTokens } from "@/hooks/useAllStataTokens";
import { useAllReserves } from "@/hooks/useAllReserves";
import { useMemo } from "react";

export const useAllPositions = () => {
  const { data: stataTokens, isLoading: isStataTokensLoading } = useAllStataTokens();
  const { data: reserves, isLoading: isReservesLoading } = useAllReserves();

  const data = useMemo(() => {
    if (!stataTokens || !reserves) {
      return;
    }
    return [...(stataTokens || []), ...(reserves || [])].filter(({ balance }) => !!balance);
  }, [stataTokens, reserves]);
  const isLoading = isStataTokensLoading || isReservesLoading;

  return {
    data,
    isLoading,
  } as const;
};
