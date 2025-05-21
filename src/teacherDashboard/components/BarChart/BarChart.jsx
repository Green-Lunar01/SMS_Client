import React from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = () => {
	const data = {
		labels: ["J.S.S.1", "J.S.S.2", "J.S.S.3", "S.S.1", "S.S.2", "S.S.3"],
		datasets: [
			{
				label: "Students",
				data: [110, 80, 90, 70, 50, 30],
				backgroundColor: "green",
			},
			{
				label: "Teachers",
				data: [10, 5, 7, 5, 3, 2],
				backgroundColor: "orange",
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
				grid: {
					display: false,
				},
			},
		},
	};

	return (
		<div
			style={{
				height: "300px",
				padding: "10px",
				background: "#fff",
				borderRadius: "8px",
			}}
		>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
