import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#141414',
      },
    },
    title: {
      display: true,
      text: 'Product Categories',
      color: 'white',
      font: {
        size: 16,
        weight: 'normal',
      },
    },
  },
};

export const data = {
  labels: ['Ropa de mujer', 'Ropa de hombre', 'Joyería'],
  datasets: [
    {
      label: '# of Items',
      data: [26, 37, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(19, 189, 158, 0.8)',
        'rgba(93, 135, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(19, 189, 158, 1)',
        'rgba(93, 135, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function CreatePie() {
  return <Pie options={options} data={data} style={{width:'80%', paddingBottom: 5}} />;
}