import { useWriteContract } from "wagmi";
import { useCallback } from "react";
import { ClaimRewardsPermit } from "@/types/permit";
import { useMarketStore } from "@/providers/MarketProvider/MarketContext";
import { ensureCorrectChainForTx } from "@/utils/ensureCorrectChainForTx";
import { UMBRELLA_BATCH_HELPER_ABI } from "@/abis/umbrellaBatchHelper";

export type ClaimRewardsParams = {
  permit: ClaimRewardsPermit;
};

export const useClaimSelectedWithPermit = () => {
  const { chainId, batchHelper } = useMarketStore((store) => store.market);
  const { writeContractAsync, ...result } = useWriteContract();

  // const claimRewards = useCallback(
  //   async ({ permit }: ClaimRewardsParams) => {
  //     await ensureCorrectChainForTx(chainId);
  //     return writeContractAsync({
  //       chainId,
  //       address: batchHelper,
  //       abi: UMBRELLA_BATCH_HELPER_ABI_NEW,
  //       functionName: "batch",
  //       args: [[], [], [permit], []],
  //     });
  //   },
  //   [batchHelper, writeContractAsync, chainId],
  // );
  //
  // return [claimRewards, result] as const;
};
