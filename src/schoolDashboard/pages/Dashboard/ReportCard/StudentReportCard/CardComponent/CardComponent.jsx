import React from "react";
import "./CardComponent.css";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const CardComponent = () => {
	const chartData = {
		labels: [
			"Word Processing",
			"Life Skills",
			"P.H.E",
			"Fine Art",
			"Basic Sci",
			"Business Stu.",
			"History",
			"Yoruba",
			"Comput/ICT",
		],
		datasets: [
			{
				label: "Scores",
				data: [15, 18, 12, 14, 16, 19, 13, 20, 10],
				backgroundColor: "#28a745",
			},
		],
	};

	const subjects = [
		{
			name: "English Language",
			test1: 20,
			test2: 20,
			test3: 15,
			avg: 15,
			exam: 15,
			termCum: 15,
			lastCum: 15,
			finalCum: 15,
			grade: "E",
			remark: "Poor",
		},
		// Add more subjects as needed
	];

	return (
		<div className="card-component">
			{/* Header */}
			<header className="header">
				<select>
					<option value="J.S.S 1 A">J.S.S 1 A</option>
				</select>
				<div className="search">
					<input type="text" placeholder="Search student" />
					<button>Search</button>
				</div>
				<div className="navigation">
					<button>Back</button>
					<button>Next</button>
				</div>
			</header>

			{/* School Info */}
			<section className="school-info">
				<h1>Fountain Int'l High School</h1>
				<p>Omisanjana Area, Ado Ekiti, Ekiti State</p>
				<p>Website: fihs.com.ng | Mobile: 08034290207</p>
			</section>

			{/* Student Info */}
			<section className="student-info">
				<h2>ADABEMBE MOJOLAOLUWA DAVID</h2>
				<div>
					<p>Gender: Male</p>
					<p>Session and Term: 2023/2024 2nd Term</p>
					<p>Admission Number: FIHS/23/2409</p>
					<p>No of times School Opened: 122</p>
					<p>No of times Present: 118</p>
					<p>No of times Absent: 4</p>
				</div>
			</section>

			{/* Performance Chart */}
			<section className="chart-section">
				<Bar data={chartData} />
			</section>

			{/* Subject Scores */}
			<table className="scores-table">
				<thead>
					<tr>
						<th>Subjects</th>
						<th>Test1</th>
						<th>Test2</th>
						<th>Test3</th>
						<th>Test Avg</th>
						<th>Exam</th>
						<th>Term Cum</th>
						<th>Last Term Cum</th>
						<th>Final Cum</th>
						<th>Grade</th>
						<th>Remark</th>
					</tr>
				</thead>
				<tbody>
					{subjects.map((subject, index) => (
						<tr key={index}>
							<td>{subject.name}</td>
							<td>{subject.test1}</td>
							<td>{subject.test2}</td>
							<td>{subject.test3}</td>
							<td>{subject.avg}</td>
							<td>{subject.exam}</td>
							<td>{subject.termCum}</td>
							<td>{subject.lastCum}</td>
							<td>{subject.finalCum}</td>
							<td>{subject.grade}</td>
							<td>{subject.remark}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Summary */}
			<section className="summary">
				<h3>Total: 42%</h3>
				<table>
					<thead>
						<tr>
							<th>Score</th>
							<th>Grade</th>
							<th>Remark</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>70-100</td>
							<td>A</td>
							<td>Excellent</td>
						</tr>
						<tr>
							<td>60-69</td>
							<td>B</td>
							<td>Good</td>
						</tr>
						{/* Add more grading rows */}
					</tbody>
				</table>
				<div>
					<p>
						Class Teacher's Comment: He shows respect for teachers
						and peers.
					</p>
					<p>
						Principal's Comment: Below average result, he needs to
						pay more attention to his studies.
					</p>
					<p>Next Term Begins On: 2024-04-29</p>
				</div>
			</section>
		</div>
	);
};

export default CardComponent;
