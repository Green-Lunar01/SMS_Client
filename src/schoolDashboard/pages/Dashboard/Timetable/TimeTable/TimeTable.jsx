// TimeTable.js
import React, { useState } from "react";
import "../TimeTableScreen.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const TimeTable = ({ data, onDelete, onEdit }) => {
	const periods = [1, 2, 3, 4, 5, 6];
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
		};
		return colors[subject] || "#ffffff";
	};

	return (
		<div className="timetable-container">
			<div className="timetable-header">
				<h3>Time Table</h3>
				<div className="timetable-info">
					<span>2024/2025</span>
					<span>JSS1 A</span>
					<span>Term 2</span>
				</div>
			</div>

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
					{days.map((day) => (
						<tr key={day}>
							<td className="day-cell">{day}</td>
							{periods.map((period) => {
								const subject = getSubjectForPeriod(
									day,
									period
								);
								return (
									<td
										key={period}
										style={{
											backgroundColor: subject
												? getSubjectColor(
														subject.subject
												  )
												: "#ffffff",
										}}
										className={`subject-cell ${
											subject ? "has-subject" : ""
										}`}
									>
										{subject && (
											<>
												<div className="subject-content">
													<div className="subject-name">
														{subject.subject}
													</div>
													<div className="subject-time">
														{subject.time}
													</div>
													<div className="subject-teacher">
														{subject.teacher}
													</div>
												</div>
												<div className="cell-actions">
													<button
														className="action-btn edit"
														onClick={() =>
															onEdit(
																day,
																period,
																subject
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
																period
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
		</div>
	);
};

export default TimeTable;
