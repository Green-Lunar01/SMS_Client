import React, { useEffect, useState } from "react";
import "./Attendance.css";
import StudentAttendance from "./StudentAttendance/Student2";
import { useTeacherAuth } from "../../../Auth/context/TeacherAuthProvider";

const Attendance = () => {
	const [tab, setTab] = useState("one");
    const {currentSession, classID, getAllStudentAttendance, attendanceData} = useTeacherAuth();


	useEffect(() => {
		console.log("ON Attendance(currentsession):", currentSession, classID)
		getAllStudentAttendance(classID, currentSession)
	}, [])
	return (
		<div className="attendance-screen">
			<aside>
				<h2>Attendance</h2>
			</aside>

			<StudentAttendance attendanceData={attendanceData} />
		</div>
	);
};

export default Attendance;
