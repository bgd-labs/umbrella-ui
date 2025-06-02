"use client";

import { Countdown } from "@/components/Countdown/Countdown";

import { Footer } from "@/components/Footer/Footer";

import PendingGhost from "../../../public/images/countdown.svg";
import UmbrellaLogoIcon from "../../../public/images/umbrella-logo.svg";

export const EXECUTION_TIMESTAMP = 1749109200;

export const ComingSoon = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center sm:px-7">
      <UmbrellaLogoIcon className="text-main-950 w-[130px] md:w-[211px] dark:text-white" />
      <div className="font-countdown antialiased">
        <Countdown date={EXECUTION_TIMESTAMP} />
      </div>
      <PendingGhost className="" />
      <Footer />
    </div>
  );
};
