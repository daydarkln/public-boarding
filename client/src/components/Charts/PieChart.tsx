import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChart: React.FC = () => {
  const data = [
    {
      type: 'Классификация',
      value: 27,
    },
    {
      type: 'Классификация два',
      value: 25,
    },
    {
      type: 'Классификация три',
      value: 18,
    },
    {
      type: 'Классификация четыре',
      value: 15,
    },
    {
      type: 'Пятая категория',
      value: 10,
    },
    {
      type: 'другой',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Навыки',
      },
    },
  };
  return <Pie {...config} />;
};

export default PieChart;
