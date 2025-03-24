import {
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "@/components/Dropdown/Dropdown";
import { Block } from "@/components/ui/Block";
import React, { useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { useStartCooldown } from "@/hooks/useStartCooldown";
import { useUmbrellaCooldownStatus } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownStatus";

import { StkToken } from "@/types/token";
import { useSafeStartCooldown } from "@/hooks/useSafeStartCooldown";
import { useIsSafeWallet } from "@/hooks/useSafeWallet";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { Button } from "@/components/ui/Button";
import { Desktop, Mobile } from "@/components/MediaQueries/MediaQueries";

export type ActionsProps = {
  token: StkToken;
};

export const Actions = ({ token }: ActionsProps) => {
  const client = useQueryClient();
  const isSafeWallet = useIsSafeWallet();
  const { chainId } = useCurrentMarket();

  const trackTransaction = useTrackTransaction();

  const { address } = token;
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const [safeStartCooldown] = useSafeStartCooldown();
  const [startCooldown, { isPending: isStartCooldownPending }] =
    useStartCooldown();
  const { status } = useUmbrellaCooldownStatus(address);

  const handleCooldownClick = async () => {
    if (isSafeWallet) {
      const hash = (await safeStartCooldown({
        assetAddress: address,
      })) as `0x${string}`;

      if (hash) {
        trackTransaction({ chainId, hash, description: `Start cooldown` });
        const { status } = await waitForTransactionReceipt(config, { hash });

        if (status === "success") {
          client.invalidateQueries({ queryKey: ["cooldowns"] });
        }
      }
    } else {
      const hash = await startCooldown({ assetAddress: address });
      trackTransaction({ chainId, hash, description: `Start cooldown` });
      const { status } = await waitForTransactionReceipt(config, { hash });

      if (status === "success") {
        client.invalidateQueries({ queryKey: ["cooldowns"] });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 md:items-center md:justify-center md:gap-4">
      {status === "withdraw" && (
        <Button
          href={`/withdraw/${address}`}
          prefetch
          primary
          elevation={1}
          size="lg"
          className="font-semibold"
        >
          Withdraw
        </Button>
      )}

      <Mobile>
        <Button
          elevation={1}
          size="lg"
          loading={isStartCooldownPending}
          disabled={isStartCooldownPending}
          onClick={handleCooldownClick}
          className="font-semibold"
        >
          Initiate cooldown
        </Button>
      </Mobile>

      <Desktop>
        <DropdownRoot onOpenChange={setIsDropdownOpened}>
          <DropdownTrigger className="outline-none">
            <Block
              elevation={1}
              isHovered={isDropdownOpened}
              className="flex items-center justify-center gap-1.5 px-1.5 py-4"
            >
              <span className="bg-main-950 size-[3.5px] rounded-full dark:bg-white" />
              <span className="bg-main-950 size-[3.5px] rounded-full dark:bg-white" />
              <span className="bg-main-950 size-[3.5px] rounded-full dark:bg-white" />
            </Block>
          </DropdownTrigger>

          <DropdownContent>
            <DropdownItem onClick={handleCooldownClick}>
              Initiate cooldown
            </DropdownItem>
          </DropdownContent>
        </DropdownRoot>
      </Desktop>
    </div>
  );
};
