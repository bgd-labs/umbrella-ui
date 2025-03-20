import { FileX as NoDataIcon } from "lucide-react";
import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type NodataProps = PropsWithChildren<{
  className?: string;
}>;

export const NoData = ({ children, className }: NodataProps) => {
  return (
    <div className={cn("flex h-32 w-full items-center justify-center", className)}>
      <div className="flex items-center gap-4">
        <NoDataIcon className="size-9 text-gray-600" />
        <div>{children}</div>
      </div>
    </div>
  );
};
