import { BlockSelect } from "@/components/BlockSelect/BlockSelect";
import { Block } from "@/components/ui/Block";
import { WITHDRAWAL_METHODS } from "@/constants/withdraw";
import { WithdrawalMethod } from "@/types/withdraw";
import { cn } from "@/utils/cn";
import * as Select from "@radix-ui/react-select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { ComponentProps, ComponentRef, forwardRef } from "react";

function getMethodLabel(method: WithdrawalMethod) {
  switch (method) {
    case "withdrawToAave":
      return {
        label: "Withdraw to rebasing aToken",
      };
    case "withdrawToStata":
      return {
        label: "Withdraw to non-rebasing aToken",
      };
    case "withdrawToUnderlying":
      return {
        label: "Withdraw from Aave",
      };
    default:
      return {
        label: "Unknown",
      };
  }
}

const items = WITHDRAWAL_METHODS.map((withdrawalMethod) => {
  const { label } = getMethodLabel(withdrawalMethod);
  return {
    label: (
      <div className="flex flex-col items-start">
        <div className="font-bold">{label}</div>
      </div>
    ),
    value: withdrawalMethod,
  };
});

export type SelectWithdrawalMethodProps = Omit<ComponentProps<typeof BlockSelect>, "onValueChange" | "items"> & {
  withdrawalMethods: WithdrawalMethod[];
  onValueChange?: (value: WithdrawalMethod) => void;
  onBlur?: () => void;
  className?: string;
};

export const SelectWithdrawalMethod = forwardRef<
  ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectWithdrawalMethodProps
>(({ value, onValueChange, onBlur, withdrawalMethods }, ref) => {
  const defaultValue = withdrawalMethods.length === 1 ? withdrawalMethods[0] : "withdrawToAave";

  return (
    <Select.Root value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <Select.Trigger ref={ref} onBlur={onBlur} className="outline-hidden">
        <Block
          elevation={1}
          className="flex items-center justify-between gap-2 px-6 leading-5 font-bold text-[#2E364E] dark:text-white"
        >
          <Select.Value placeholder="Select" className="font-semibold" />
          <Select.Icon>
            <ChevronDownIcon className="size-4" />
          </Select.Icon>
        </Block>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="animate-in fade-in w-[var(--radix-select-trigger-width)] duration-200"
        >
          <Block elevation={1} className="px-0" outerClassName="flex">
            <Select.Viewport className="p-1">
              {items
                ?.filter((item) => withdrawalMethods.includes(item.value))
                .map((item) => (
                  <Select.Item
                    key={item.value}
                    value={item.value}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 px-5 py-2",
                      "data-highlighted:bg-zinc-800 data-highlighted:text-white data-highlighted:outline-hidden",
                      "not-last:mb-3",
                    )}
                  >
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator className="SelectItemIndicator">
                      <CheckIcon className="size-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
            </Select.Viewport>
          </Block>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});
SelectWithdrawalMethod.displayName = "SelectWithdrawalMethod";
