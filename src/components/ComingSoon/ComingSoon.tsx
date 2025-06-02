"use client";

import { Footer } from "@/components/Footer/Footer";
import { Block } from "@/components/ui/Block";
import { cn } from "@/utils/cn";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import ReactCountdown from "react-countdown";

import CountdownGhost from "../../../public/images/countdown.svg";
import UmbrellaLogoIcon from "../../../public/images/umbrella-logo.svg";
import { EXECUTION_TIMESTAMP } from "@/configs/constants";

type Props = {
  date: number;
  className?: string;
};

export const ComingSoon = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center sm:px-7">
      <UmbrellaLogoIcon className="text-main-950 mb-4 w-2/3 max-w-[211px] dark:text-white" />
      <CountdownGhost className="w-full max-w-[726px]" />
      <div className="font-heading -translate-x-2 -translate-y-6 text-xl antialiased sm:-translate-y-10 sm:text-lg">
        <Countdown date={EXECUTION_TIMESTAMP} />
      </div>
      <Footer />
    </div>
  );
};

const CountdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  className,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  className?: string;
}) => (
  <NumberFlowGroup>
    <Block className="bg-main-950 flex items-baseline gap-4 p-2 py-1 text-white tabular-nums sm:px-3 sm:text-2xl">
      <div className={cn("flex items-baseline gap-4 tabular-nums", className)}>
        {days > 0 && (
          <>
            <span className="flex items-baseline tabular-nums">
              <NumberFlow trend={-1} value={days} format={{ minimumIntegerDigits: 1 }} />
              <span className="ml-[2px] text-sm sm:text-lg">D</span>
            </span>
            <span className="flex items-baseline tabular-nums">
              <NumberFlow trend={-1} value={hours} format={{ minimumIntegerDigits: 2 }} />
              <span className="ml-[2px] text-sm sm:text-lg">H</span>
            </span>
          </>
        )}
        {days === 0 && (
          <span className="flex items-baseline tabular-nums">
            <NumberFlow trend={-1} value={hours} format={{ minimumIntegerDigits: 2 }} />
            <span className="ml-[2px] sm:text-lg">H</span>
          </span>
        )}
        <span className="flex items-baseline tabular-nums">
          <NumberFlow trend={-1} value={minutes} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} />
          <span className="ml-[2px] text-sm sm:text-lg">M</span>
        </span>
        <span className="flex items-baseline tabular-nums">
          <NumberFlow trend={-1} value={seconds} digits={{ 1: { max: 5 } }} format={{ minimumIntegerDigits: 2 }} />
          <span className="ml-[2px] text-sm sm:text-lg">S</span>
        </span>
      </div>
    </Block>
  </NumberFlowGroup>
);

export function Countdown({ date, className }: Props) {
  return (
    <ReactCountdown
      key={`countdown-${date}`}
      date={date * 1000}
      renderer={(props) => <CountdownRenderer {...props} className={className} />}
      autoStart
      onComplete={() => {
        window.location.reload();
      }}
    />
  );
}
