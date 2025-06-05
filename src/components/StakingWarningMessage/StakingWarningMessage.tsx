import { TriangleAlert } from "lucide-react";

export const StakingWarningMessage = () => {
  return (
    <div className="flex gap-3">
      <TriangleAlert className="text-main-300 size-8" />
      Once you stake, you will need to cooldown 20 days to unstake.
    </div>
  );
};
