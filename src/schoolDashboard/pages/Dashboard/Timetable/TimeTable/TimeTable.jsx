import React, { useContext, useEffect, useState } from "react";
import "../TimeTableScreen.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";
import Spinner from "../../../../components/Spinner/Spinner";

const TimeTable = ({ onDelete, onEdit }) => {
	const periods = [1, 2, 3, 4, 5, 6];
	const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
	const displayDays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
	];

	const [activeSession, setActiveSession] = useState("");
	const { subjects, classes } = useContext(SchoolContext);
	const [selectedClassId, setSelectedClassId] = useState("");
	const [fetchingTimeTable, setFetchingTimeTable] = useState(false);
	const [timeTableData, setTimeTableData] = useState({
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
	});

	// Get the session from localStorage when component mounts
	useEffect(() => {
		const sessionData = localStorage.getItem("sms_school_session");
		if (sessionData) {
			try {
				// Try to parse as JSON first
				const parsedSession = JSON.parse(sessionData);
				setActiveSession(parsedSession.session_name || parsedSession);
			} catch (e) {
				// If it's not JSON, use the string directly
				setActiveSession(sessionData);
			}
		}
	}, []);

	const getSubjectForPeriod = (day, period) => {
		const dayData = timeTableData[day.toLowerCase()] || [];
		return dayData.find((entry) => entry.period === period) || null;
	};

	const getSubjectColor = (subject) => {
		if (!subject) return "#ffffff";

		const colors = {
			"English Language": "#ff7b7b",
			"Social Studies": "#7bc9ff",
			Mathematics: "#b8ff7b",
			"C.R.K": "#ffb77b",
			Computer: "#7bffd4",
			"P.H.E": "#d47bff",
			Physics: "#d5a6ff",
			Demo: "#ffd280",
		};
		return colors[subject] || "#e0e0e0"; // Default color for subjects not in the list
	};

	const fetchTimeTable = async () => {
		if (!selectedClassId) return;

		setFetchingTimeTable(true);

		try {
			const response = await api.get(
				`/school/timetable/${selectedClassId}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			setTimeTableData(response.data.data);
			toast.success("Time Table Fetched Successfully");
		} catch (err) {
			console.error(err);
			toast.error("Failed to fetch timetable data");
		} finally {
			setFetchingTimeTable(false);
		}
	};

	useEffect(() => {
		if (selectedClassId) {
			fetchTimeTable();
		}
	}, [selectedClassId]);

	return (
		<div className="timetable-container">
			<div className="timetable-header">
				<h3>Time Table</h3>
				<div className="timetable-info">
					<span>{activeSession}</span>
					<select
						name="class"
						id="class"
						value={selectedClassId}
						onChange={(e) => setSelectedClassId(e.target.value)}
					>
						<option value="">Select Class</option>
						{classes.map((classItem) => (
							<option key={classItem.id} value={classItem.id}>
								{classItem.class_name}
							</option>
						))}
					</select>
					{/* <span>Term 2</span> */}
				</div>
			</div>
			{fetchingTimeTable ? (
				<Spinner />
			) : (
				<table className="timetable">
					<thead>
						<tr>
							<th>Period</th>
							{periods.map((period) => (
								<th key={period}>{period}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{days.map((day, index) => (
							<tr key={day}>
								<td className="day-cell">
									{displayDays[index]}
								</td>
								{periods.map((period) => {
									const subjectData = getSubjectForPeriod(
										day,
										period,
									);
									return (
										<td
											key={period}
											style={{
												backgroundColor:
													subjectData?.subject
														? getSubjectColor(
																subjectData.subject,
															)
														: "#ffffff",
											}}
											className={`subject-cell ${
												subjectData?.subject
													? "has-subject"
													: ""
											}`}
										>
											{subjectData?.subject && (
												<>
													<div className="subject-content">
														<div className="subject-name">
															{
																subjectData.subject
															}
														</div>
														<div className="subject-time">
															{subjectData.duration ||
																"N/A"}
														</div>
													</div>
													<div className="cell-actions">
														<button
															className="action-btn edit"
															onClick={() =>
																onEdit(
																	day,
																	period,
																	subjectData,
																)
															}
														>
															<FaRegEdit />
														</button>
														<button
															className="action-btn delete"
															onClick={() =>
																onDelete(
																	day,
																	period,
																)
															}
														>
															<RiDeleteBin5Line />
														</button>
													</div>
												</>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TimeTable;
