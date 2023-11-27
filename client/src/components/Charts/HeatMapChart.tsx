import React, { useState, useEffect } from "react";
import { Heatmap, G2 } from "@ant-design/plots";
import { dateDependsAcrivity } from "../../employee/modules/OnBoarding/dateDependsAcrivity";

interface DataItem {
  week: string;
  day: string;
  commits: number;
  date: string;
  lastWeek?: boolean;
  lastDay?: boolean;
}

const HeatmapChart: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData(dateDependsAcrivity);
  }, []);

  G2.registerShape("polygon", "boundary-polygon", {
    draw(cfg, container) {
      const group = container.addGroup();
      const attrs = {
        stroke: "#fff",
        lineWidth: 1,
        fill: cfg.color,
        path: [],
      };
      const points = cfg.points;
      const path = [
        ["M", points[0].x, points[0].y],
        ["L", points[1].x, points[1].y],
        ["L", points[2].x, points[2].y],
        ["L", points[3].x, points[3].y],
        ["Z"],
      ];
      attrs.path = this.parsePath(path);
      group.addShape("path", {
        attrs,
      });

      if (cfg.data.lastWeek) {
        const linePath = [
          ["M", points[2].x, points[2].y],
          ["L", points[3].x, points[3].y],
        ];
        group.addShape("path", {
          attrs: {
            path: this.parsePath(linePath),
            lineWidth: 4,
            stroke: "#404040",
          },
        });

        if (cfg.data.lastDay) {
          group.addShape("path", {
            attrs: {
              path: this.parsePath([
                ["M", points[1].x, points[1].y],
                ["L", points[2].x, points[2].y],
              ]),
              lineWidth: 4,
              stroke: "#404040",
            },
          });
        }
      }

      return group;
    },
  });

  const config = {
    data,
    autoFit: true,
    xField: "week",
    yField: "day",
    colorField: "commits",
    reflect: "y",
    shape: "boundary-polygon",
    meta: {
      day: {
        type: "cat",
        values: [
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
          "Воскресенье",
        ],
      },
      week: {
        type: "cat",
      },
      commits: {
        sync: true,
      },
      date: {
        type: "cat",
      },
    },
    yAxis: {
      grid: null,
    },
    tooltip: {
      title: "date",
      showMarkers: false,
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    xAxis: {
      position: "top",
      tickLine: null,
      line: null,
      label: {
        offset: 12,
        style: {
          fontSize: 12,
          fill: "white",
          textBaseline: "top",
        },
        formatter: (val) => {
          if (val === "2") {
            return "MAY";
          } else if (val === "6") {
            return "JUN";
          } else if (val === "10") {
            return "JUL";
          } else if (val === "15") {
            return "AUG";
          } else if (val === "19") {
            return "SEP";
          } else if (val === "24") {
            return "OCT";
          }
          return "";
        },
      },
    },
  };

  return <Heatmap style={{ height: "17.5vw" }} {...config} />;
};

export default HeatmapChart;
