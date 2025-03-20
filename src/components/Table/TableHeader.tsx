import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type TableHeaderProps = PropsWithChildren<{
  className?: string;
}>;

export const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <div className={cn("flex gap-4 border-b border-stone-100 bg-stone-100 px-7 py-5", className)}>
      {children}
    </div>
  );
};
