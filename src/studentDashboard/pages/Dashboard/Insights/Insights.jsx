import React from "react";
import "./Insights.css";
import SummaryCard from "../../../components/SummaryCard/SummaryCard";
import LineChart from "../../../components/LineChart/LineChart";
import BarChart from "../../../components/BarChart/BarChart";
import Calendar from "../../../components/Calendar/Calendar";
import AttendanceReport from "../../../components/AttendanceReport/AttendanceReport";
import NewAdmissions from "../../../components/NewAdmissions/NewAdmissions";

const Insights = () => {
	return (
		<div className="insights">
			<div className="summary-cards">
				<SummaryCard
					title="Total Student"
					count={3}
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
								d="M4.375 10.5L14 7L23.625 10.5L19.25 13.125V15.75C19.25 15.75 18.0833 14.875 14 14.875C9.91667 14.875 8.75 15.75 8.75 15.75V13.125L4.375 10.5ZM4.375 10.5V17.5"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M19.25 14.875V16.4306C19.25 19.4374 16.8995 21.875 14 21.875C11.1005 21.875 8.75 19.4374 8.75 16.4306V14.875"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M26.8069 19.3014C26.8069 19.3014 27.6552 18.6839 30.625 18.6839C33.5948 18.6839 34.4432 19.3014 34.4432 19.3014M26.8069 19.3014V17.5L23.625 15.75L30.625 13.125L37.625 15.75L34.4432 17.5V19.3014M26.8069 19.3014V19.8069C26.8069 21.9156 28.5162 23.625 30.625 23.625C32.7338 23.625 34.4432 21.9156 34.4432 19.8069V19.3014"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M7.67383 27.8705C6.02327 28.7919 1.69559 30.6733 4.33144 33.0276C5.61902 34.1775 7.05307 35 8.85601 35H19.1439C20.947 35 22.3809 34.1775 23.6686 33.0276C26.3044 30.6733 21.9767 28.7919 20.3261 27.8705C16.4556 25.7098 11.5444 25.7098 7.67383 27.8705Z"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M28 35H34.4834C35.8356 35 36.9112 34.342 37.8768 33.422C39.8538 31.5387 36.6081 30.0335 35.3701 29.2964C33.1384 27.9674 30.4451 27.6603 28 28.3747"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
				<SummaryCard
					title="Total Employee"
					count={2}
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
								d="M32.5782 35H33.436C35.4482 35 37.0487 34.0832 38.4858 32.8013C42.1365 29.5446 33.5547 26.25 30.625 26.25M27.125 8.87035C27.5224 8.79153 27.9351 8.75 28.3584 8.75C31.5432 8.75 34.125 11.1005 34.125 14C34.125 16.8995 31.5432 19.25 28.3584 19.25C27.9351 19.25 27.5224 19.2085 27.125 19.1296"
								stroke="white"
								stroke-width="2.625"
								stroke-linecap="round"
							/>
							<path
								d="M7.8423 28.1946C5.7791 29.3003 0.369493 31.5579 3.66429 34.3829C5.27379 35.763 7.06635 36.75 9.32001 36.75H22.18C24.4337 36.75 26.2262 35.763 27.8357 34.3829C31.1306 31.5579 25.721 29.3003 23.6577 28.1946C18.8195 25.6018 12.6805 25.6018 7.8423 28.1946Z"
								stroke="white"
								stroke-width="2.625"
							/>
							<path
								d="M22.75 13.125C22.75 16.991 19.6159 20.125 15.75 20.125C11.884 20.125 8.75 16.991 8.75 13.125C8.75 9.259 11.884 6.125 15.75 6.125C19.6159 6.125 22.75 9.259 22.75 13.125Z"
								stroke="white"
								stroke-width="2.625"
							/>
						</svg>
					}
				/>
				<SummaryCard
					title="Revenue"
					count="2,000"
					month="This month"
					color="#FB8791"
					currency="₦"
				/>
				<SummaryCard
					title="Total Expenses"
					count="-20,000"
					month="This month"
					color="#6A8BF6"
					currency="₦"
				/>
			</div>
			<div className="main-content">
				<div className="line-chart-container">
					<LineChart />
				</div>
				<div className="calendar-container">
					<Calendar />
				</div>
			</div>
			<div className="bottom-content">
				<div className="bar-chart-container">
					<BarChart />
				</div>
				<aside>
					<AttendanceReport />
					<NewAdmissions />
				</aside>
			</div>
		</div>
	);
};

export default Insights;
