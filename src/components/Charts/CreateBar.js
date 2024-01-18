import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '2022',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2023',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: '2024',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
  ],
};

export function CreateBar() {
  return <Bar options={options} data={data} style={{width: '100%'}}/>;
}
