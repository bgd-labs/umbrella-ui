import React, { PropsWithChildren } from "react";

export type SummarySectionProps = PropsWithChildren<{ title: string }>;

export const SummarySection = ({ title, children }: SummarySectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-bold dark:text-white">{title}</h2>

      {children}
    </div>
  );
};
