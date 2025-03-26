import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import ArrowLeftIcon from "../../../public/images/arrow-left.svg";

export type PageContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className="grow">
      <div
        className={cn(
          "mx-auto flex w-full md:px-5 max-w-(--mobile-container) self-start flex-col gap-10 md:max-w-(--breakpoint-lg) md:pt-5",
          className,
        )}
      >
        <div className="md:pl-[3px] flex items-center justify-start">
          <Button
            href="/"
            elevation={1}
            outerClassName="grow-0"
            className=" flex items-center gap-1.5 font-semibold"
          >
            <ArrowLeftIcon className="h-2" />
            Back
          </Button>
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};
