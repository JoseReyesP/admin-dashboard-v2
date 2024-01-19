import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#141414',
      },
    },
    title: {
      display: true,
      text: 'Yearly sales',
      color: 'white',
      font: {
        size: 16,
        weight: 'normal',
      },
    },
  },
};

export const data = {
  labels: ['2022', '2023', '2024'],
  datasets: [
    {
      label: '# of items',
      data: [12, 19, 2],
      backgroundColor: [
        'rgba(37, 54, 98, 0.5)',
        'rgba(28, 69, 93, 0.5)',
        'rgba(250, 137, 107, 0.5)',
      ],
      borderColor: [
        'rgba(37, 54, 98, 1)',
        'rgba(28, 69, 93, 1)',
        'rgba(250, 137, 107, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
export function CreateDoughnut() {
    return <Doughnut options={options} data={data} style={{width: '90%', height:'250px'}}/>;
}