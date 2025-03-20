import { Pie } from "@visx/shape";
import { Group } from "@visx/group";

export type ChartDataItem = {
  value: number;
  colour: string;
};

export type DonutChartProps = {
  data: ChartDataItem[];
  size: number;
  thickness: number;
};

export const DonutChart = ({ data, size, thickness }: DonutChartProps) => {
  const innerWidth = size;
  const innerHeight = size;
  const radius = size / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  return (
    <svg width={size} height={size}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          innerRadius={radius - thickness}
          padAngle={0.02}
        >
          {({ arcs, path }) => (
            <g>
              {arcs.map((arc, i) => (
                <g key={`pie-arc-${i}`}>
                  <path className={`arc${i}`} d={path(arc)!} fill={arc.data.colour} />
                </g>
              ))}
            </g>
          )}
        </Pie>
      </Group>
    </svg>
  );
};
