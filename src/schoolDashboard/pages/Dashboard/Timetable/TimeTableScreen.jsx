// TimeTableScreen.js
import React, { useState } from "react";
import CreateTimeTableEntry from "./CreateTimeTableEntry/CreateTimeTableEntry";
import TimeTable from "./TimeTable/TimeTable";
import "./TimeTableScreen.css";
import Modal from "../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";

const TimeTableScreen = () => {
	const [timeTableData, setTimeTableData] = useState({
		Monday: [],
		Tuesday: [],
		Wednesday: [],
		Thursday: [],
		Friday: [],
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (id) => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleNewEntry = (entry) => {
		setTimeTableData((prev) => ({
			...prev,
			[entry.dayOfWeek]: [
				...prev[entry.dayOfWeek],
				{
					subject: entry.subjectName,
					time: entry.time,
					period: parseInt(entry.period),
					teacher: entry.teacher,
				},
			],
		}));
	};

	const handleDelete = (day, period) => {
		if (window.confirm("Are you sure you want to delete this entry?")) {
			setTimeTableData((prev) => ({
				...prev,
				[day]: prev[day].filter((entry) => entry.period !== period),
			}));
		}
	};

	const handleEdit = (day, period, subject) => {
		// You can implement your edit logic here
		// For example, you could set some state to open an edit modal
		// or populate the create form with the existing data
		console.log("Edit:", { day, period, subject });

		openModal();
	};

	const handleSubmitEditModal = (e) => {
		e.preventDefault();
		console.log("Edited data: ");
	};

	return (
		<div className="timetable-screen">
			<h2>TIME TABLE</h2>
			<CreateTimeTableEntry onSubmit={handleNewEntry} />
			<TimeTable
				data={timeTableData}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="edit-record-modal">
					<aside>
						<h3>Edit</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>

					<form
						onSubmit={handleSubmitEditModal}
						className="create-entry-form"
					>
						<div className="form-row">
							<div className="form-group">
								<label htmlFor="subjectName">
									Subject Name
								</label>
								<input
									type="text"
									name="subjectName"
									id="subjectName"
									placeholder="Subject Name"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="time">Time</label>
								<input
									type="text"
									name="time"
									id="time"
									placeholder="Time (e.g., 8:00-9:00)"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="dayOfWeek">Day of Week</label>
								<select name="dayOfWeek" id="dayOfWeek">
									<option value="Monday">Monday</option>
									<option value="Tuesday">Tuesday</option>
									<option value="Wednesday">Wednesday</option>
									<option value="Thursday">Thursday</option>
									<option value="Friday">Friday</option>
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="class">Class</label>
								<select name="class" id="class">
									<option value="JSS1 A">JSS1 A</option>
									<option value="JSS2 A">JSS2 A</option>
									<option value="JSS3 A">JSS3 A</option>
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="period">Period</label>
								<select name="period" id="period">
									{[1, 2, 3, 4, 5, 6].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="teacher">Teacher</label>
								<select name="teacher" id="teacher">
									<option value="Brandi Moore">
										Brandi Moore
									</option>
									<option value="John Smith">
										John Smith
									</option>
									<option value="Jane Doe">Jane Doe</option>
								</select>
							</div>
						</div>

						<button type="submit" className="primary-btn">
							Save
						</button>
					</form>
				</div>
			</Modal>
		</div>
	);
};

export default TimeTableScreen;
