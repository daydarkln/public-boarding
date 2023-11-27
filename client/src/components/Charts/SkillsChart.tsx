import { Radar } from "@ant-design/plots";
import { theme } from "antd";
import React, { memo } from "react";

const content = [
  {
    name: "UI",
    star: 10371,
  },
  {
    name: "UX",
    star: 7380,
  },
  {
    name: "CSS",
    star: 7414,
  },
  {
    name: "JavaScript",
    star: 2140,
  },
  {
    name: "React",
    star: 660,
  },
  {
    name: "TypeScript",
    star: 885,
  },
  {
    name: "Git",
    star: 1626,
  },
];

const SkillsChart: React.FC<{ data?: any }> = ({ data = content }) => {
  const { token } = theme.useToken();

  const config = {
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: "name",
    yField: "star",
    appendPadding: [0, 10, 0, 10],
    meta: {
      star: {
        alias: "star количество",
        min: 0,
        nice: true,
        formatter: (v: number) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: "rgba(0, 0, 0, 0.04)",
      },
    },
    point: {
      size: 2,
    },
    area: {},
    lineStyle: {
      fill: token.colorPrimary,
      fillOpacity: 0.3,
      strokeOpacity: 0.3,
    },
  };
  return <Radar {...config} />;
};

export default memo(SkillsChart);
