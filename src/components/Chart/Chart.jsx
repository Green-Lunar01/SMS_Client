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
        barThickness: 30, // Default thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          minRotation: 45,
          maxRotation: 45,
        },
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          display: false,
        },
      },
    },
    // Dynamically adjust barThickness based on viewport width
    onResize: (chart, size) => {
      chart.data.datasets.forEach((dataset) => {
        dataset.barThickness = size.width <= 768 ? 20 : 30; // Mobile: 25, Larger screens: 30
      });
      chart.update(); // Update the chart with new configurations
    },
  };

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;



