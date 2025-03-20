import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type TableCellProps = PropsWithChildren<{
  className?: string;
}>;

export const TableCell = ({ children, className }: TableCellProps) => {
  return <div className={cn("flex items-center justify-center", className)}>{children}</div>;
};
