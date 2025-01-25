import React from "react";
import "./Insights.css";
import SummaryCard from "../../../components/SummaryCard/SummaryCard";
import LineChart from "../../../components/LineChart/LineChart";
import BarChart from "../../../components/BarChart/BarChart";
import Calendar from "../../../components/Calendar/Calendar";
import AttendanceReport from "../../../components/AttendanceReport/AttendanceReport";
import NewAdmissions from "../../../components/NewAdmissions/NewAdmissions";

const Insights = () => {
	const todayClasses = [
		{
			id: 1,
			subject: "English",
			time: "08:00am - 10:00am",
			class: "J.S.S 2",
		},
		{
			id: 2,
			subject: "English",
			time: "10:00am - 12:00pm",
			class: "J.S.S 1",
		},
		{
			id: 3,
			subject: "English",
			time: "02:00pm - 04:00pm",
			class: "S.S 1",
		},
	];
	return (
		<div className="insights">
			<div className="summary-cards">
				<SummaryCard
					title="ABSENCE"
					count={10}
					month="This month"
					color="#5554AB"
					icon={
						<svg
							width="42"
							height="42"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.75 26.25C18.7395 36.75 7.51042 26.25 3.5 36.75"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M27.125 26.25H29.7523C33.877 26.25 35.9394 26.25 37.2209 24.9687C38.5023 23.6871 38.5023 21.6248 38.5023 17.5V14C38.5023 9.87522 38.5023 7.81282 37.2209 6.5314C35.9394 5.25 33.877 5.25 29.7523 5.25H22.7523C18.6275 5.25 16.5651 5.25 15.2837 6.5314C14.198 7.61712 14.0322 9.26352 14.0068 12.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.125 26.25C15.5412 26.25 17.5 24.2912 17.5 21.875C17.5 19.4588 15.5412 17.5 13.125 17.5C10.7088 17.5 8.75 19.4588 8.75 21.875C8.75 24.2912 10.7088 26.25 13.125 26.25Z"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12.25H31.5M31.5 19.25H26.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
				<SummaryCard
					title="PRESENT"
					count={26}
					month="This month"
					color="#9FA1D8"
					icon={
						<svg
							width="42"
							height="42"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.75 26.25C18.7395 36.75 7.51042 26.25 3.5 36.75"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M27.125 26.25H29.7523C33.877 26.25 35.9394 26.25 37.2209 24.9687C38.5023 23.6871 38.5023 21.6248 38.5023 17.5V14C38.5023 9.87522 38.5023 7.81282 37.2209 6.5314C35.9394 5.25 33.877 5.25 29.7523 5.25H22.7523C18.6275 5.25 16.5651 5.25 15.2837 6.5314C14.198 7.61712 14.0322 9.26352 14.0068 12.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.125 26.25C15.5412 26.25 17.5 24.2912 17.5 21.875C17.5 19.4588 15.5412 17.5 13.125 17.5C10.7088 17.5 8.75 19.4588 8.75 21.875C8.75 24.2912 10.7088 26.25 13.125 26.25Z"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12.25H31.5M31.5 19.25H26.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
				<SummaryCard
					title="LEAVE"
					count={0}
					month="This month"
					color="#FB8791"
					icon={
						<svg
							width="42"
							height="42"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.75 26.25C18.7395 36.75 7.51042 26.25 3.5 36.75"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M27.125 26.25H29.7523C33.877 26.25 35.9394 26.25 37.2209 24.9687C38.5023 23.6871 38.5023 21.6248 38.5023 17.5V14C38.5023 9.87522 38.5023 7.81282 37.2209 6.5314C35.9394 5.25 33.877 5.25 29.7523 5.25H22.7523C18.6275 5.25 16.5651 5.25 15.2837 6.5314C14.198 7.61712 14.0322 9.26352 14.0068 12.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.125 26.25C15.5412 26.25 17.5 24.2912 17.5 21.875C17.5 19.4588 15.5412 17.5 13.125 17.5C10.7088 17.5 8.75 19.4588 8.75 21.875C8.75 24.2912 10.7088 26.25 13.125 26.25Z"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12.25H31.5M31.5 19.25H26.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
				<SummaryCard
					title="SESSION PRESENT TOTAL"
					count={0}
					month="This month"
					color="#6A8BF6"
					icon={
						<svg
							width="42"
							height="42"
							viewBox="0 0 42 42"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22.75 26.25C18.7395 36.75 7.51042 26.25 3.5 36.75"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M27.125 26.25H29.7523C33.877 26.25 35.9394 26.25 37.2209 24.9687C38.5023 23.6871 38.5023 21.6248 38.5023 17.5V14C38.5023 9.87522 38.5023 7.81282 37.2209 6.5314C35.9394 5.25 33.877 5.25 29.7523 5.25H22.7523C18.6275 5.25 16.5651 5.25 15.2837 6.5314C14.198 7.61712 14.0322 9.26352 14.0068 12.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.125 26.25C15.5412 26.25 17.5 24.2912 17.5 21.875C17.5 19.4588 15.5412 17.5 13.125 17.5C10.7088 17.5 8.75 19.4588 8.75 21.875C8.75 24.2912 10.7088 26.25 13.125 26.25Z"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12.25H31.5M31.5 19.25H26.25"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
			</div>
			<div className="main-content">
				<div className="classes-container">
					<h2>Today Classes</h2>
					<article>
						{todayClasses.map((todayClass) => (
							<div key={todayClass.id} className="class">
								<h4>{todayClass.subject}</h4>
								<p>{todayClass.time}</p>
								<p>{todayClass.class}</p>
							</div>
						))}
					</article>
				</div>
				<div className="calendar-container">
					<Calendar />
				</div>
			</div>
			<div className="bottom-content">
				<h2>J.S.S 1 2023/2024 Payment Update</h2>
				<table>
					<thead>
						<th>Name</th>
						<th>Status</th>
					</thead>
					<tbody>
						<tr>
							<td>John Doe</td>
							<td>
								<p className="paid">paid</p>
							</td>
						</tr>
						<tr>
							<td>James Doe</td>
							<td>
								<p className="owing">owing</p>
							</td>
						</tr>
						<tr>
							<td>Suzan Lehner</td>
							<td>
								<p className="owing">owing</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Insights;
