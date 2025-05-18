import React, { useState, useEffect, useContext } from "react";
import "../TimeTableScreen.css";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";

const CreateTimeTableEntry = () => {
	const initialFormState = {
		subject_id: "",
		duration: "",
		day: "",
		class_id: "",
		period: "",
		teacher_id: "",
		term: "",
		sessionId: JSON.parse(localStorage.getItem("sms_school_session")).id,
	};

	const [formData, setFormData] = useState(initialFormState);
	const { subjects, classes, employees } = useContext(SchoolContext);
	const [teacherList, setTeacherList] = useState([]);
	const [submitting, setSubmitting] = useState(false);

	const getEmployeeByCategory = (category) => {
		setTeacherList(
			employees.filter((employee) => employee.role === category),
		);
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData);

		if (
			!formData.subject_id ||
			!formData.duration ||
			!formData.day ||
			!formData.period ||
			!formData.class_id ||
			!formData.term
		) {
			toast.error("Please fill in all required fields");
			return;
		}

		setSubmitting(true);

		try {
			const response = await api.post(
				"/school/timetable/create",
				formData,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			toast.success("Time Table Entry Created Successfully");
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message ||
					error.message ||
					"Failed to create time table entry. Please try again.",
			);
		} finally {
			setSubmitting(false);
			setFormData(initialFormState);
		}
	};

	return (
		<div className="create-entry-container">
			<h2>Create New</h2>
			<form onSubmit={handleSubmit} className="create-entry-form">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="subject_id">Subject Name</label>
						<select
							name="subject_id"
							id="subject_id"
							value={formData.subject_id}
							onChange={(e) =>
								setFormData({
									...formData,
									subject_id: Number(e.target.value),
								})
							}
						>
							<option value="">Select Subject</option>
							{subjects.map((subject) => (
								<option key={subject.id} value={subject.id}>
									{subject.subject_name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="duration">Time</label>
						<input
							type="text"
							name="duration"
							id="duration"
							placeholder="Time (e.g., 08:00-09:00)"
							value={formData.duration}
							onChange={(e) =>
								setFormData({
									...formData,
									duration: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="day">Day of Week</label>
						<select
							name="day"
							id="day"
							value={formData.day}
							onChange={(e) =>
								setFormData({
									...formData,
									day: e.target.value,
								})
							}
						>
							<option value="">Select Day</option>
							<option value="monday">Monday</option>
							<option value="tuesday">Tuesday</option>
							<option value="wednesday">Wednesday</option>
							<option value="thursday">Thursday</option>
							<option value="friday">Friday</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="class">Class</label>
						<select
							name="class"
							id="class"
							value={formData.class_id}
							onChange={(e) =>
								setFormData({
									...formData,
									class_id: Number(e.target.value),
								})
							}
						>
							<option value="">Select Class</option>
							{classes.map((classItem) => (
								<option key={classItem.id} value={classItem.id}>
									{classItem.class_name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="period">Period</label>
						<select
							name="period"
							id="period"
							value={formData.period}
							onChange={(e) =>
								setFormData({
									...formData,
									period: Number(e.target.value),
								})
							}
						>
							<option value="">Select Period</option>
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
							value={formData.teacher_id}
							onChange={(e) =>
								setFormData({
									...formData,
									teacher_id: Number(e.target.value),
								})
							}
						>
							<option value="">Select Teacher</option>
							{teacherList.map((teacher) => (
								<option key={teacher.id} value={teacher.id}>
									{teacher.first_name} {teacher.surname}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="term">Term</label>
						<select
							name="term"
							id="term"
							value={formData.term}
							onChange={(e) =>
								setFormData({
									...formData,
									term: Number(e.target.value),
								})
							}
						>
							<option value="">Select Term</option>
							{[1, 2, 3].map((term) => (
								<option key={term} value={term}>
									{term}
								</option>
							))}
						</select>
					</div>
				</div>

				<button
					type="submit"
					className="primary-btn"
					disabled={submitting}
				>
					{submitting ? "Creating..." : "Create"}
				</button>
			</form>
		</div>
	);
};

export default CreateTimeTableEntry;
