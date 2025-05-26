import { cn } from "@/utils/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

export const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "border-main-950 size-4 cursor-pointer border border-t-[3px] border-r-[3px] dark:border-white",
      className,
    )}
    {...props}
  >
    {children}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export const CheckboxIndicator = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Indicator>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Indicator
    ref={ref}
    className={cn("bg-main-950 ml-0.5 block size-2 dark:bg-white", className)}
    {...props}
  />
));
CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;
