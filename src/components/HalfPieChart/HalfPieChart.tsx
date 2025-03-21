import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { cn } from "@/utils/cn";

export type ChartDataItem = {
  value: number;
  colour: string;
};

export type HalfPieChartProps = {
  data: ChartDataItem[];
  size: number;
  thickness: number;
  className?: string;
};

export const HalfPieChart = ({
  data,
  size,
  thickness,
  className,
}: HalfPieChartProps) => {
  const radius = size / 2;

  return (
    <svg width={size} height={size} className={cn("-mr-[100px]", className)}>
      <Group top={size / 2} left={size / 2}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          innerRadius={radius - thickness}
          padAngle={0.02}
          startAngle={-Math.PI}
          endAngle={0}
        >
          {({ arcs, path }) => {
            return arcs.map((arc, i) => (
              <g key={`pie-arc-${i}`}>
                <path d={path(arc)!} fill={arc.data.colour} />
              </g>
            ));
          }}
        </Pie>
      </Group>
    </svg>
  );
};
