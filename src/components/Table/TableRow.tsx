import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type TableRowProps = PropsWithChildren<{
  className?: string;
}>;

export const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-b border-stone-100 px-7 py-3.5 last:border-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
