import { DropdownContent, DropdownItem, DropdownRoot, DropdownTrigger } from "@/components/Dropdown/Dropdown";
import { Block } from "@/components/ui/Block";
import { config } from "@/configs/wagmi";
import { useUmbrellaCooldownStatus } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownStatus";
import { useStartCooldown } from "@/hooks/useStartCooldown";
import { useQueryClient } from "@tanstack/react-query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useState } from "react";

import { Mobile, TabletAndDesktop } from "@/components/MediaQueries/MediaQueries";
import { Button } from "@/components/ui/Button";
import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useIsSafeWallet } from "@/hooks/useIsSafeWallet/useIsSafeWallet";
import { useSafeStartCooldown } from "@/hooks/useSafeStartCooldown";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { StkToken } from "@/types/token";
import { useRouter } from "next/navigation";

export type ActionsProps = {
  token: StkToken;
};

export const Actions = ({ token }: ActionsProps) => {
  const router = useRouter();
  const client = useQueryClient();
  const isSafeWallet = useIsSafeWallet();
  const { chainId } = useCurrentMarket();

  const trackTransaction = useTrackTransaction();

  const { address } = token;
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const [safeStartCooldown] = useSafeStartCooldown();
  const [startCooldown, { isPending: isStartCooldownPending }] = useStartCooldown();
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

  const handleWithdrawalClick = async () => {
    if (status === "withdraw") {
      router.push(`/withdraw/${address}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
      {status === "withdraw" && (
        <Button
          href={`/withdraw/${address}`}
          prefetch
          primary
          elevation={1}
          size="lg"
          className="font-semibold"
          outerClassName="sm:max-lg:hidden"
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

      <TabletAndDesktop>
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
            <DropdownItem onClick={handleCooldownClick}>Initiate cooldown</DropdownItem>

            {status === "withdraw" && (
              <DropdownItem onClick={handleWithdrawalClick} className="hidden sm:max-lg:block">
                Withdraw
              </DropdownItem>
            )}
          </DropdownContent>
        </DropdownRoot>
      </TabletAndDesktop>
    </div>
  );
};
