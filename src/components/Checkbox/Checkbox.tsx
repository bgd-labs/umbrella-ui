import { cn } from "@/utils/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

export const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "border-main-950 size-4 cursor-pointer border border-t-[3px] border-r-[3px] outline-none dark:border-white",
      "focus:bg-secondary-500 data-[state=checked]:bg-secondary-500 focus:border-1 data-[state=checked]:border-1",
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
  <CheckboxPrimitive.Indicator ref={ref} className={className} {...props}>
    <CheckIcon className="dark:text-main-950 size-full" />
  </CheckboxPrimitive.Indicator>
));
CheckboxIndicator.displayName = CheckboxPrimitive.Indicator.displayName;
