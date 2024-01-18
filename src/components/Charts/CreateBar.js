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
      labels: {
        color: '#141414',
      },
    },
    title: {
      display: true,
      text: 'Monthly Sales',
      color: 'white',
      font: {
        size: 16,
        weight: 'normal',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#141414',
      }
    },
    y: {
      ticks: {
        color: '#3d3d3d',
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '2022',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(37, 54, 98, 0.7)',
    },
    {
      label: '2023',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(28, 69, 93, 0.7)',
    },
    {
      label: '2024',
      data: labels.map(() => faker.datatype.boolean({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(250, 137, 107, 0.7)',
    },
  ],
};

export function CreateBar() {
  return <Bar options={options} data={data} style={{width: '100%'}}/>;
}
