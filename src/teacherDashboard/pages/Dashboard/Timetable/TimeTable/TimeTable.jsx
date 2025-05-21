// TimeTable.js
import React, { useState, useEffect} from "react";
import "../TimeTableScreen.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";
import axios from "axios"

const TimeTable = ({ data, onDelete, onEdit }) => {
    const {getTimetable,timeTable, arrOfMaxClass, teacherToken, currentSession, teacherProfile} = useTeacherAuth()
	const periods = [1, 2, 3, 4, 5, 6];
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const formatTimetable = (data) => {
		return Object.entries(data).map(([day, subjects]) => ({
			day: day.charAt(0).toUpperCase() + day.slice(1), 
			subjectsForDay: subjects
		}));
	};
	const weekTimetable = formatTimetable(timeTable)

	const activeSession = teacherProfile?.academic_sessions.find(session => session.isactive === true);
	const activeSessionName = activeSession ? activeSession.session_name : "No active session";
	useEffect(() => {
		getTimetable()
		console.log("this week timetable:", weekTimetable, "curent session", activeSessionName)
	}, [])
	// useEffect(() => {
	// 	console.log("On TimeTable Mount: ", timeTable)
	// }, [])

 console.log("this week timetable:",weekTimetable)
	const getSubjectForPeriod = (day, period) => {
		return data[day]?.find((entry) => entry.period === period) || null;
	};

	const getSubjectColor = (subject) => {
		const colors = {
			"English Language": "#ff7b7b",
			"Social Studies": "#7bc9ff",
			Mathematics: "#b8ff7b",
			"C.R.K": "#ffb77b",
			Computer: "#7bffd4",
			"P.H.E": "#d47bff",
			"Physical Health Education": "#d47bff",
			Physics: "#fc5c5c",
			Chemistry: "#5cfc5c",
			"No Class Assigned": "#000"
		};
		return colors[subject] || "#ffffff";
	};

	return (
		<div className="timetable-container">
			<div className="timetable-header">
				<h3>Time Table</h3>
				<div className="timetable-info">
					<span>{activeSessionName}</span>
					{/* <span>{teacherProfile.user.class_name}</span> */}
					<span>Term {teacherProfile.user.current_term} </span>
				</div>
			</div>

			<table className="timetable">
				<thead>
					<tr>
						<th>Period</th>
						{/* {periods.map((period) => (
							<th key={period}>{period}</th>
						))} */}
						{arrOfMaxClass?.map((_, index) => (
							<th key={index}>{index + 1}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{weekTimetable.map((dayItem) => (
					<tr key={dayItem.day}>
						{/* Day Column */}
						<td className="day-cell">{dayItem.day}</td>

						{/* Periods for the Day */}
						{dayItem.subjectsForDay.map((subjectItem, index) => (
						<td
							key={index}
							style={{
							backgroundColor: subjectItem?.subject
								? getSubjectColor(subjectItem.subject)
								: "#ffffff",
							}}
							className={`subject-cell ${subjectItem?.subject ? "has-subject" : ""}`}
						>
							<div className="subject-content">
							<div className="subject-name">
								{subjectItem?.subject ? subjectItem.subject : "No Class Assigned"}
							</div>
							<div className="subject-time">{subjectItem?.duration || "—"}</div>
							<div className="subject-teacher">{subjectItem?.teacher || "—"}</div>
							</div>
						</td>
						))}
					</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TimeTable;
