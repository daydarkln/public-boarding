import React from 'react';
import { Liquid } from '@ant-design/plots';

const LiquidChart: React.FC = () => {
  const config = {
    percent: 0.65,
    shape: 'diamond',
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    pattern: {
      type: 'line',
    },
  };
  return <Liquid {...config} />;
};

export default LiquidChart;
