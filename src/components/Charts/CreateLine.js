import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
        usePointStyle: true,
        color: '#141414',
      },
    },
    title: {
      display: true,
      text: 'Monthly sales by category',
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
      label: 'Ropa de mujer',
      data: labels.map(() => faker.datatype.boolean({ min: -1000, max: 1000 })),
      borderColor: 'rgb(241, 59, 78)',
      backgroundColor: 'rgba(241, 59, 78, 0.5)',
    },
    {
      label: 'Ropa de hombre',
      data: labels.map(() => faker.datatype.boolean({ min: -1000, max: 1000 })),
      borderColor: 'rgb(59, 103, 241)',
      backgroundColor: 'rgba(59, 103, 241, 0.5)',
    },
    {
        label: 'Joyeria',
        data: labels.map(() => faker.datatype.boolean({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 209, 102)',
        backgroundColor: 'rgba(255, 209, 102, 0.5)',
      },
  ],
};
export function CreateLine() {
    return <Line options={options} data={data} style={{width: '100%', height:'450'}}/>;
}