import { RingProgress } from "@ant-design/plots";
import React from "react";
export interface RingProgressChartProps {
  color: string[];
  percent: number;
  title?: string;
}

const RingProgressChart: React.FC<RingProgressChartProps> = (props) => {
  const { color, percent, title } = props;

  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: percent,
    color: color,
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: "#fffff",
          fontSize: "9px",
          lineHeight: "14px",
        },
        formatter: () => `${title}`,
      },
    },
  };
  return <RingProgress {...config} />;
};

export default RingProgressChart;
