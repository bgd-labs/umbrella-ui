"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/utils/cn";

export const Toggle = (props: TogglePrimitive.ToggleProps) => (
  <TogglePrimitive.Root className="group" {...props}>
    <div className="select-none inline-flex bg-main-900 origin-center cursor-pointer">
      <div
        className={cn(
          "border w-10 h-6 flex items-center justify-center text-xs font-bold origin-right bg-white text-main-900 border-main-900 transition-all duration-200 ease-in-out group-data-[state=off]:skew-y-[8deg] group-data-[state=off]:bg-main-50 group-data-[state=off]:text-main-200 group-data-[state=off]:border-r-main-100"
        )}
      >
        ON
      </div>
      <div
        className={cn(
          "border w-10 h-6 flex items-center justify-center text-xs font-bold origin-left transition-all bg-white border-main-900 duration-200 ease-in-out group-data-[state=on]:-skew-y-[8deg] group-data-[state=on]:text-main-200 group-data-[state=on]:bg-main-50 group-data-[state=on]:border-l-main-100"
        )}
      >
        OFF
      </div>
    </div>
  </TogglePrimitive.Root>
);

export default Toggle;
