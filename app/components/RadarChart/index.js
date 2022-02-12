import React from 'react';
import { Radar } from 'react-chartjs-2';

const options = {
  scales: {
    r: {
      ticks: {
        display: false,
        maxTicksLimit: 3,
      },
      grid: {
        lineWidth: 1,
        borderDash: context => (context.index === 1 ? [] : [6, 4]),
      },
      pointLabels: {
        font: {
          color: '#3E4237',
          size: 10,
          weight: 600,
          family: 'Nunito',
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderWidth: 3,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        font: {
          color: '#3E4237',
          size: 12,
          weight: 600,
          family: 'Nunito',
        },
      },
    },
  },
};

function RadarChart({ data }) {
  return (
    <>
      <Radar data={data} options={options} />
    </>
  );
}

export default RadarChart;
