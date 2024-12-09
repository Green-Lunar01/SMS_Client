import React, { useState } from "react";
import "./AttendanceReport.css";
import attendanceReportEmpty from "../../assets/attendance-report-empty.png";

const AttendanceReport = () => {
	const [data, setData] = useState({
		id: 1,
		presentStudents: 35,
		presentEmployees: 100,
	});

	return (
		<div className="attendance-report">
			<h3>Attendance Report</h3>
			{data ? (
				<>
					<div>
						<span>
							<p>Today Present Students:</p>
							<p>{data?.presentStudents}%</p>
						</span>
						<div
							style={{
								height: "10px",
								background: "#f0f0f0",
								borderRadius: "5px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: "30%",
									background: "green",
									height: "100%",
								}}
							></div>
						</div>
					</div>
					<div>
						<span>
							<p>Today Present Employees:</p>
							<p>{data?.presentEmployees}%</p>
						</span>
						<div
							style={{
								height: "10px",
								background: "#f0f0f0",
								borderRadius: "5px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: "100%",
									background: "blue",
									height: "100%",
								}}
							></div>
						</div>
					</div>
				</>
			) : (
				<aside>
					<img src={attendanceReportEmpty} alt="" />
					<p>No record found.</p>
				</aside>
			)}
		</div>
	);
};

export default AttendanceReport;
