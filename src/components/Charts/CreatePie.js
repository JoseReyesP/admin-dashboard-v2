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
        'rgba(241, 59, 78, 0.8)',
        'rgba(59, 103, 241, 0.8)',
        'rgb(255, 209, 102, 0.8)',
      ],
      borderColor: [
        'rgba(241, 59, 78, 1)',
        'rgba(59, 103, 241, 1)',
        'rgb(255, 209, 102, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export function CreatePie() {
  return <Pie options={options} data={data} style={{width:'80%', paddingBottom: 5}} />;
}