import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Income",
				data: [12000, 15000, 8000, 25000, 20000, 30000, 22000],
				borderColor: "green",
				fill: false,
			},
			{
				label: "Expenses",
				data: [10000, 12000, 6000, 18000, 15000, 24000, 20000],
				borderColor: "orange",
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					display: false, // Hides the Y-axis labels
				},
				grid: {
					display: false,
				},
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default LineChart;
