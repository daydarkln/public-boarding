import React from 'react';
import { Rose } from '@ant-design/plots';

export interface RoseChart {
  data: { value: number; type: string }[];
}

const RoseChart: React.FC<RoseChart> = (props) => {
  const { data } = props;

  const config = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    label: {
      offset: -15,
    },
  };
  return <Rose {...config} />;
};

export default RoseChart;
