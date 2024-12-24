import React, { useState } from "react";
import "./Attendance.css";
import MarkAttendance from "./MarkAttendance/MarkAttendance";
import StudentAttendance from "./StudentAttendance/StudentAttendance";
import EmployeeAttendance from "./EmployeeAttendance/EmployeeAttendance";

const Attendance = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="attendance-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Mark Employee Attendance
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Student Attendance Report
				</button>
				<button
					onClick={() => setTab("three")}
					className={tab === "three" ? "active" : ""}
				>
					Employee Attendance Report
				</button>
			</aside>

			{tab === "one" && <MarkAttendance />}
			{tab === "two" && <StudentAttendance />}
			{tab === "three" && <EmployeeAttendance />}
		</div>
	);
};

export default Attendance;
