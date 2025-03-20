import { HashLink } from "@/components/HashLink/HashLink";
import React from "react";

export type TransactionBreakdownProps = {
  hash: string;
};

export const TransactionBreakdown = ({ hash }: TransactionBreakdownProps) => {
  return <HashLink txHashAddress={hash} className="font-semibold" />;
};
