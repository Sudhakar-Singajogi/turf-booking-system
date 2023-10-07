import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Turf1', 'Turf2', 'Turf3'],
  datasets: [
    {
      label: '# of Booking this month',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)', 
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 
      ],
      hoverOffset: 4,
      borderWidth: 1,
    },
  ],
  
};

const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "start",
      labels: {
        color: "000",
      },
    },
    title: {
      display: true,
      text: "Monthly Bookings",
    },
  }, 
};

export default function MonthlyBookings() {
  return <Doughnut data={data} options={options} />;
}
