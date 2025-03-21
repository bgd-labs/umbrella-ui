import { DonutChart } from "@/components/DonutChart/DonutChart";
import { useMobile } from "@/hooks/useMediaQuery";
import { HalfPieChart } from "@/components/HalfPieChart/HalfPieChart";

export type SummaryChartProps = {
  totalStaked: number;
  availableToStake: number;
};

export const SummaryChart = ({
  totalStaked,
  availableToStake,
}: SummaryChartProps) => {
  const isMobile = useMobile();
  const chartData = [
    { value: totalStaked, colour: "#ffd400" },
    { value: availableToStake, colour: "#6D6C53" },
  ];

  if (isMobile) {
    return <HalfPieChart data={chartData} size={160} thickness={10} />;
  }

  return <DonutChart data={chartData} size={70} thickness={10} />;
};
