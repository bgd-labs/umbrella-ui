import { BlockSelectItem } from "@/components/BlockSelect/BlockSelectItem";
import { Block } from "@/components/ui/Block";
import { cn } from "@/utils/cn";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";
import { Key, ReactNode } from "react";

export type Item = {
  label: ReactNode;
  value: string;
};

export type SelectV2Props<T extends Item> = {
  placeholder?: string;
  items: T[];
  value?: T["value"];
  onValueChange?: (value: T["value"]) => void;
  defaultValue?: T["value"];
  getKey?: (item: T) => Key;
  className?: string;
};

export const BlockSelect = <T extends Item>({
  placeholder,
  items,
  value,
  onValueChange,
  defaultValue,
  getKey = (item) => item.value,
  className,
}: SelectV2Props<T>) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange} defaultValue={defaultValue}>
      <Select.Trigger className={cn("w-[220px] outline-hidden", className)}>
        <Block
          elevation={1}
          className="text-main-950 dark:!bg-main-900 flex h-[38px] items-center justify-center gap-2 px-5 leading-5 font-bold md:justify-between md:px-3.5 dark:text-white"
        >
          <Select.Value placeholder={placeholder} className="font-semibold" />
          <Select.Icon>
            <ChevronDownIcon className="size-4" />
          </Select.Icon>
        </Block>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" className="animate-in fade-in w-[336px] duration-200 md:w-[220px]">
          <Block elevation={1} className="px-0">
            <Select.Viewport className="p-1">
              {items?.map((item) => (
                <BlockSelectItem key={getKey(item)} value={item.value}>
                  {item.label}
                </BlockSelectItem>
              ))}
            </Select.Viewport>
          </Block>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
