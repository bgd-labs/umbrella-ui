import { Countdown } from "@/components/Countdown/Countdown";
import { useUmbrellaCooldownData } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownData";
import { useUmbrellaCooldownStatus } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownStatus";

import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { StkToken } from "@/types/token";
import { formatBigInt } from "@/utils/formatBigInt";

export type UmbrellaStatusProps = {
  token: StkToken;
  className?: string;
};

export const UmbrellaStatus = ({ token, className }: UmbrellaStatusProps) => {
  const { data } = useUmbrellaCooldownData(token.address);
  const { status } = useUmbrellaCooldownStatus(token.address);

  const formattedAmount = data ? formatBigInt(data.amount, token.decimals) : 0;

  if (status === "none" || !data) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <Countdown
        date={status === "cooldown" ? data.endOfCooldown : status === "withdraw" ? data.withdrawalEndsAt : 0}
        className={className}
      />
      {status === "cooldown" && (
        <div className="flex items-center justify-center gap-1 text-sm leading-0">
          <NumberDisplay value={formattedAmount} />
          <span>on</span>
          <span className="font-bold">cooldown</span>
        </div>
      )}
      <div className="flex items-center justify-center gap-1 text-sm leading-0">
        {status === "withdraw" && (
          <>
            <span>to</span>
            <span className="font-bold">withdraw</span>
            <NumberDisplay value={formattedAmount} />
          </>
        )}
      </div>
    </div>
  );
};
