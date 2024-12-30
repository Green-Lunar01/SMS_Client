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
		{
			name: "Mathematics",
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
	];

	return (
		<div className="card-component">
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

			<section className="school-info">
				<h1>Fountain Int'l High School</h1>
				<p>Omisanjana Area, Ado Ekiti, Ekiti State</p>
				<p>Website: fihs.com.ng | Mobile: 08034290207</p>
			</section>

			<h2>ADABEMBE MOJOLAOLUWA DAVID</h2>

			<section className="student-info">
				<section className="chart-section">
					<Bar data={chartData} />
				</section>

				<div>
					<h4>Student Details</h4>
					<table>
						<tr>
							<th>Gender</th>
							<td>Male</td>
						</tr>
						<tr>
							<th>Session and Term</th>
							<td>2023/2024 2nd Term</td>
						</tr>
						<tr>
							<th>Admission Number</th>
							<td>FIHS/23/2409</td>
						</tr>
					</table>

					<h5>Student Attendance</h5>
					<table>
						<tr>
							<th>No of times School Opened:</th>
							<td>122</td>
						</tr>
						<tr>
							<th>No of times Present:</th>
							<td>118</td>
						</tr>
						<tr>
							<th>No of times Absent:</th>
							<td>4</td>
						</tr>
					</table>
				</div>
			</section>

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
						<tr>
							<td>50-59</td>
							<td>C</td>
							<td>Okay</td>
						</tr>
						{/* Add more grading rows */}
					</tbody>
				</table>
				<div>
					<article>
						<span>
							<b>Class Teacher's Comment:</b>
							<input
								type="text"
								name="commentT"
								id="commentT"
								placeholder="He shows respect for teachers and peers."
							/>
						</span>

						<span>
							<b>Signature and Date:</b>
							<input type="text" name="signT" id="signT" />
						</span>
					</article>
					<article>
						<span>
							<b>Principal's Comment:</b>
							<input
								type="text"
								name="commentT"
								id="commentT"
								placeholder="Below average result, he needs to pay more attention to his studies."
							/>
						</span>

						<span>
							<b>Signature and Date:</b>
							<input type="text" name="signT" id="signT" />
						</span>
					</article>
					<span>
						<b>Next Term Begins On:</b>
						<input
							type="date"
							name="dateT"
							id="dateT"
							placeholder="2024-04-29"
						/>
					</span>
				</div>
			</section>
		</div>
	);
};

export default CardComponent;
