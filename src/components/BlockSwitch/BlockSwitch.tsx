import * as SwitchPrimitives from "@radix-ui/react-switch";
import { SwitchProps } from "@radix-ui/react-switch";
import { cn } from "@/utils/cn";
import { CSSProperties } from "react";

export type BlockSwitchProps = SwitchProps & {
  elevation?: 1 | 2 | 3;
};

export const BlockSwitch = ({ elevation = 2, className, ...props }: BlockSwitchProps) => {
  const elevationHeight = elevation * 2;
  return (
    <SwitchPrimitives.Root
      {...props}
      className={cn(
        "border-main-950 bg-main-300 relative h-5 w-10 cursor-pointer border",
        "before:bg-secondary-600 before:absolute before:left-0 before:h-full before:transition-all data-[state=checked]:before:w-[30px] data-[state=unchecked]:before:w-0",
        className,
      )}
    >
      <SwitchPrimitives.Thumb
        style={
          {
            "--elevation-height": `${elevationHeight}px`,
            "--half-elevation-height": `${elevationHeight / 2}px`,
          } as CSSProperties
        }
        className={cn(
          "relative block h-5 w-[12px]",
          "-translate-y-[1px] transition-transform data-[state=checked]:translate-x-[27px] data-[state=unchecked]:-translate-x-[1px]",
        )}
      >
        <span className="border-main-950 bg-main-100 absolute -top-[var(--half-elevation-height)] left-0 h-5 w-[var(--elevation-height)] -skew-y-[45deg] border" />
        <div className="bg-main-950 absolute -top-[var(--elevation-height)] left-[var(--elevation-height)] h-5 w-[12px]" />
        <span className="border-main-950 bg-main-300 absolute bottom-0 left-[var(--half-elevation-height)] h-[var(--elevation-height)] w-[12px] -skew-x-[45deg] border" />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
};
