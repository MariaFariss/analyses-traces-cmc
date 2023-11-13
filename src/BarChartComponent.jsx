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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function BarChartComponent({title, labels, datas}) {
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: labels,
        data: datas,
        backgroundColor: 'rgb(255, 136, 153)',
        },
    ],
  };

  return <Bar options={options} data={data} />;
}
