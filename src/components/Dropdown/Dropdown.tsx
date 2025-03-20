import * as DropdownPrimitives from "@radix-ui/react-dropdown-menu";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import { cn } from "@/utils/cn";

export const DropdownRoot = DropdownPrimitives.Root;

export const DropdownTrigger = forwardRef<
  ComponentRef<typeof DropdownPrimitives.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownPrimitives.Trigger>
>(({ children, className, ...props }, ref) => (
  <DropdownPrimitives.Trigger ref={ref} className={cn("cursor-pointer", className)} {...props}>
    {children}
  </DropdownPrimitives.Trigger>
));
DropdownTrigger.displayName = DropdownPrimitives.Trigger.name;

export const DropdownContent = forwardRef<
  ComponentRef<typeof DropdownPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DropdownPrimitives.Content>
>(
  (
    {
      children,
      className,
      align = "start",
      alignOffset = -2,
      side = "right",
      sideOffset = 8,
      ...props
    },
    ref,
  ) => (
    <DropdownPrimitives.Portal>
      <DropdownPrimitives.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...props}
        className={cn("border-main-950 flex flex-col border bg-white p-1", className)}
      >
        {children}
      </DropdownPrimitives.Content>
    </DropdownPrimitives.Portal>
  ),
);
DropdownContent.displayName = DropdownPrimitives.Content.displayName;

export const DropdownLabel = DropdownPrimitives.Label;

export const DropdownItem = forwardRef<
  ComponentRef<typeof DropdownPrimitives.Item>,
  ComponentPropsWithoutRef<typeof DropdownPrimitives.Item>
>(({ children, disabled, className, ...props }, ref) => (
  <DropdownPrimitives.Item
    ref={ref}
    {...props}
    className={cn(
      "text-main-950 z-50 flex cursor-pointer items-center bg-white px-2.5 py-1 text-xs transition outline-none",
      {
        "hover:bg-main-950 hover:text-white": !disabled,
        "text-main-400": disabled,
      },
      className,
    )}
  >
    {children}
  </DropdownPrimitives.Item>
));
DropdownItem.displayName = DropdownPrimitives.Item.displayName;
