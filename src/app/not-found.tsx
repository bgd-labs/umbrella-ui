import NotFoundImage from "../../public/images/not-found.svg";
import { Button } from "@/components/ui/Button";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto mb-auto flex w-full max-w-(--breakpoint-lg) flex-col pt-10">
      <div className="flex items-center justify-center">
        <NotFoundImage />
      </div>

      <div className="mt-[90px] flex items-center justify-center">
        <div className="text-3xl font-semibold">Something went wrong!</div>
      </div>

      <div className="mt-14 flex items-center justify-center">
        <Button href="/" primary elevation={1} size="lg" outerClassName="w-[250px] grow-0">
          Return to dashboard
        </Button>
      </div>
    </div>
  );
}
