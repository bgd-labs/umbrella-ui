import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type TableHeaderCellProps = PropsWithChildren<{
  className?: string;
}>;

export const TableHeaderCell = ({ children, className }: TableHeaderCellProps) => {
  return (
    <div className={cn("flex items-center justify-center text-sm tracking-wide", className)}>
      {children}
    </div>
  );
};
