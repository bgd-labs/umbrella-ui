import { PropsWithChildren } from "react";

export type TableBodyProps = PropsWithChildren;

export const TableBody = ({ children }: TableBodyProps) => {
  return <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">{children}</div>;
};
