import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import ReactCountdown from "react-countdown";

import { cn } from "@/utils/cn";

type Props = {
  date: number;
  className?: string;
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
    <div className={cn("flex items-center gap-1 tabular-nums", className)}>
      {days > 0 && (
        <>
          <span className="flex items-center">
            <NumberFlow trend={-1} value={days} format={{ minimumIntegerDigits: 1 }} />
            <span>d</span>
          </span>
          <span className="flex items-center">
            <NumberFlow trend={-1} value={hours} format={{ minimumIntegerDigits: 2 }} />
            <span>h</span>
          </span>
        </>
      )}
      {days === 0 && (
        <span className="flex items-center">
          <NumberFlow trend={-1} value={hours} format={{ minimumIntegerDigits: 2 }} />
          <span>h</span>
        </span>
      )}
      <span className="flex items-center">
        <NumberFlow
          trend={-1}
          value={minutes}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <span>min</span>
      </span>
      <span className="flex items-center">
        <NumberFlow
          trend={-1}
          value={seconds}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <span>sec</span>
      </span>
    </div>
  </NumberFlowGroup>
);

export function Countdown({ date, className }: Props) {
  return (
    <ReactCountdown
      key={`countdown-${date}`}
      date={date * 1000}
      renderer={(props) => <CountdownRenderer {...props} className={className} />}
      autoStart
    />
  );
}
