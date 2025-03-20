import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

export type PageContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className="grow">
      <div
        className={cn(
          "mx-auto flex w-full max-w-(--mobile-container) flex-col items-start gap-6 self-start md:max-w-(--breakpoint-lg) md:flex-row md:gap-8 md:pt-10",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
