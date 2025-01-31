import React, { useState } from "react";
import "./Attendance.css";
// import StudentAttendance from "./StudentAttendance/StudentAttendance";
import StudentAttendance from "./StudentAttendance/Student2";

const Attendance = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="attendance-screen">
			<aside>
				<h2>Attendance</h2>
			</aside>

			<StudentAttendance />
		</div>
	);
};

export default Attendance;
