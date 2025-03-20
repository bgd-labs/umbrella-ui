import * as Select from "@radix-ui/react-select";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import { cn } from "@/utils/cn";
import { CheckIcon } from "lucide-react";

export const BlockSelectItem = forwardRef<
  ComponentRef<typeof Select.Item>,
  ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <Select.Item
      className={cn(
        "flex h-[32px] cursor-pointer items-center gap-3 px-2 data-highlighted:bg-zinc-800 data-highlighted:text-white data-highlighted:outline-hidden",
        className,
      )}
      {...props}
      ref={ref}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon className="size-4" />
      </Select.ItemIndicator>
    </Select.Item>
  );
});
BlockSelectItem.displayName = Select.Item.displayName;
