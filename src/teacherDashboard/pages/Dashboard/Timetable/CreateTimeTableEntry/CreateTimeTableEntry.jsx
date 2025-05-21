// CreateTimeTableEntry.js
import React, { useState } from "react";
import "../TimeTableScreen.css";

const CreateTimeTableEntry = ({ onSubmit }) => {
	const initialFormState = {
		subjectName: "",
		time: "",
		dayOfWeek: "Monday",
		class: "JSS1 A",
		period: "1",
		teacher: "Brandi Moore",
		session: "2024/2025",
		term: "2nd Term",
	};

	const [formData, setFormData] = useState(initialFormState);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Basic validation
		if (!formData.subjectName || !formData.time) {
			alert("Please fill in all required fields");
			return;
		}

		onSubmit(formData);

		// Reset form after submission
		setFormData(initialFormState);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="create-entry-container">
			<h2>Create New</h2>
			<form onSubmit={handleSubmit} className="create-entry-form">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="subjectName">Subject Name</label>
						<input
							type="text"
							name="subjectName"
							id="subjectName"
							placeholder="Subject Name"
							value={formData.subjectName}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="time">Time</label>
						<input
							type="text"
							name="time"
							id="time"
							placeholder="Time (e.g., 8:00-9:00)"
							value={formData.time}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="dayOfWeek">Day of Week</label>
						<select
							name="dayOfWeek"
							id="dayOfWeek"
							value={formData.dayOfWeek}
							onChange={handleChange}
						>
							<option value="Monday">Monday</option>
							<option value="Tuesday">Tuesday</option>
							<option value="Wednesday">Wednesday</option>
							<option value="Thursday">Thursday</option>
							<option value="Friday">Friday</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="class">Class</label>
						<select
							name="class"
							id="class"
							value={formData.class}
							onChange={handleChange}
						>
							<option value="JSS1 A">JSS1 A</option>
							<option value="JSS2 A">JSS2 A</option>
							<option value="JSS3 A">JSS3 A</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="period">Period</label>
						<select
							name="period"
							id="period"
							value={formData.period}
							onChange={handleChange}
						>
							{[1, 2, 3, 4, 5, 6].map((num) => (
								<option key={num} value={num}>
									{num}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="teacher">Teacher</label>
						<select
							name="teacher"
							id="teacher"
							value={formData.teacher}
							onChange={handleChange}
						>
							<option value="Brandi Moore">Brandi Moore</option>
							<option value="John Smith">John Smith</option>
							<option value="Jane Doe">Jane Doe</option>
						</select>
					</div>
				</div>

				<button type="submit" className="primary-btn">
					Save
				</button>
			</form>
		</div>
	);
};

export default CreateTimeTableEntry;
