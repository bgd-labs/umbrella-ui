import { Block } from "@/components/ui/Block";
import { Token } from "@/app/components/Token/Token";
import React from "react";
import { StkToken } from "@/types/token";
import { NumberDisplay } from "@/components/NumberDisplay/NumberDisplay";
import { useUmbrellaCooldownStatus } from "@/hooks/useAllUmbrellaCooldowns/useUmbrellaCooldownStatus";
import { Actions } from "@/app/components/UmbrellaTable/Actions";
import { UmbrellaStatus } from "@/components/UmbrellaStatus/UmbrellaStatus";

export type UmbrellaCardProps = {
  data: StkToken;
};

export const UmbrellaCard = ({ data }: UmbrellaCardProps) => {
  const { address, balance, underlying, isUnderlyingStataToken } = data;

  const { status } = useUmbrellaCooldownStatus(address);

  return (
    <Block elevation={1} className="flex flex-col gap-7 py-6 pr-5 pl-5">
      <div className="flex items-center justify-between border-b pb-5">
        <Token
          token={{
            address,
            symbol: underlying.symbol,
            type: isUnderlyingStataToken ? "stkStata" : "stk",
          }}
        />

        {balance ? (
          <div className="flex flex-col items-end">
            <NumberDisplay
              value={data.usdAmount ?? 0}
              type="currency"
              className="text-main-950 text-base font-semibold dark:text-white"
            />
            <NumberDisplay
              value={data.balanceFormatted ?? 0}
              className="dark:text-main-500 text-sm text-stone-500"
            />
          </div>
        ) : (
          "—"
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-base">APY</div>
        <div>
          <NumberDisplay
            value={data.apyData.total}
            type="percent"
            className="font-semibold"
          />
        </div>
      </div>

      {status !== "none" && (
        <div className="flex items-center justify-between">
          <div className="text-base">Status</div>
          <UmbrellaStatus token={data} />
        </div>
      )}

      <Actions token={data} />
    </Block>
  );
};
