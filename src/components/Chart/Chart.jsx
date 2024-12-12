import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  
  const data = {
    labels: ['Word Processing', 'Lit-In-Eng', 'P.H.E', 'Fine Art', 'Basic Science', 'Business St.', 'History', 'Yoruba', 'Comp/ICT'], // X-axis labels
    datasets: [
      {
        label: '',
        data: [80, 70, 100, 57, 69, 95, 76, 400, 90], // Y-axis data
        backgroundColor: '#13A541', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border
        borderWidth: 1,
        barThickness: 30,
        padding:0,
        boxWidth:0,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom', // Legend position
      },
      title: {
        display: true,
        text: '', // Chart title
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
        ticks:{
            minRotation: 45,
            maxRotation: 45
        }
      },
      y: {
        min: 0,
        max:100,
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
      },
    },
  };

  return <div className='' style={{ width: '400px', height: '300px' }}>
  <Bar data={data} options={options} height={1000} />
</div>
};

export default Chart;
