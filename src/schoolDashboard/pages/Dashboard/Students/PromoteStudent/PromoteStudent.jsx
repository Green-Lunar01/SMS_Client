import React, { useState, useEffect, useContext } from "react";
import "./PromoteStudent.css";
import Modal from "../../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";
import { FaAnglesDown } from "react-icons/fa6";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";
import Spinner from "../../../../components/Spinner/Spinner";

const PromotionTable = () => {
	const { classes } = useContext(SchoolContext);

	const [selectedClass, setSelectedClass] = useState("");
	const [targetClass, setTargetClass] = useState("");
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [promoting, setPromoting] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedStudents, setSelectedStudents] = useState([]);

	useEffect(() => {
		if (selectedClass) {
			fetchStudents();
		}
	}, [selectedClass]);

	// Fetch students from the selected class
	const fetchStudents = async () => {
		setLoading(true);
		try {
			const response = await api.get(
				`/school/students?class_id=${selectedClass}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			// Transform the API response to match our component state
			const studentsData = response.data.data.map((student) => ({
				id: student.id,
				name: `${student.first_name} ${student.surname}`,
				matricNumber:
					student.matric_number || student.admission_number || "N/A",
				currentClass:
					classes.find((c) => c.id === parseInt(selectedClass))
						?.class_name || "Unknown",
				isChecked: false,
			}));

			setStudents(studentsData);
		} catch (error) {
			console.error("Error fetching students:", error);
			setStudents({});
			toast.error("Error fetching students");
		} finally {
			setLoading(false);
		}
	};

	// Open modal and set which students to promote
	const openModal = (promoteAll = false) => {
		if (promoteAll) {
			// All students
			setSelectedStudents(students.map((student) => student.id));
		} else {
			// Only checked students
			const checkedStudents = students
				.filter((student) => student.isChecked)
				.map((student) => student.id);

			if (checkedStudents.length === 0) {
				toast.error("Please select at least one student to promote");
				return;
			}

			setSelectedStudents(checkedStudents);
		}
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setTargetClass("");
	};

	// Handle checkbox change
	const handleCheck = (index) => {
		const updatedStudents = [...students];
		updatedStudents[index].isChecked = !updatedStudents[index].isChecked;
		setStudents(updatedStudents);
	};

	// Handle "Promote All" button click
	const handlePromoteAll = () => {
		if (students.length === 0) {
			toast.error("No students to promote");
			return;
		}

		openModal(true);
	};

	// Handle "Promote Marked" button click
	const handlePromoteMarked = () => {
		openModal(false);
	};

	// Handle the actual promotion
	const handlePromoteStudents = async () => {
		if (!targetClass) {
			toast.error("Please select a target class");
			return;
		}

		setPromoting(true);

		try {
			// Determine which students to omit (not promote)
			const allStudentIds = students.map((student) => student.id);
			const omitStudentIds = allStudentIds.filter(
				(id) => !selectedStudents.includes(id),
			);

			// Call the API to promote students
			await api.post(
				"/school/classes/promote",
				{
					fromClassId: parseInt(selectedClass),
					toClassId: parseInt(targetClass),
					omit: omitStudentIds,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success(
				`Successfully promoted students to ${classes.find((c) => c.id === parseInt(targetClass))?.class_name}`,
			);

			// Refresh the student list
			fetchStudents();
			closeModal();
		} catch (error) {
			console.error("Error promoting students:", error);
			toast.error(
				error.response?.data?.message || "Error promoting students",
			);
		} finally {
			setPromoting(false);
		}
	};

	// Select/unselect all students
	const handleSelectAll = (e) => {
		const checked = e.target.checked;
		const updatedStudents = students.map((student) => ({
			...student,
			isChecked: checked,
		}));
		setStudents(updatedStudents);
	};

	return (
		<div className="promotion-table">
			<div className="search-section">
				<select
					className="class-select"
					value={selectedClass}
					onChange={(e) => setSelectedClass(e.target.value)}
				>
					<option value="">Select Class</option>
					{classes.map((classItem) => (
						<option key={classItem.id} value={classItem.id}>
							{classItem.class_name}
						</option>
					))}
				</select>
				<button
					className="search-button"
					onClick={fetchStudents}
					disabled={!selectedClass || loading}
				>
					{loading ? "Loading..." : "Load Students"}
				</button>
			</div>

			{selectedClass && students.length > 0 && (
				<div className="table-actions">
					<h2>
						{
							classes.find(
								(c) => c.id === parseInt(selectedClass),
							)?.class_name
						}
					</h2>
					<aside>
						<button
							className="action-button"
							onClick={handlePromoteMarked}
						>
							Promote Marked
						</button>
						<button
							className="action-button"
							onClick={handlePromoteAll}
						>
							Promote All
						</button>
					</aside>
				</div>
			)}

			{loading ? (
				<div className="loading-container">
					<Spinner />
				</div>
			) : selectedClass && students.length > 0 ? (
				<table className="student-table">
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									onChange={handleSelectAll}
									checked={
										students.length > 0 &&
										students.every(
											(student) => student.isChecked,
										)
									}
								/>
							</th>
							<th>Name</th>
							<th>Matric Number</th>
							<th>Current Class</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student, index) => (
							<tr key={student.id || index}>
								<td>
									<input
										type="checkbox"
										checked={student.isChecked}
										onChange={() => handleCheck(index)}
									/>
								</td>
								<td>{student.name}</td>
								<td>{student.matricNumber}</td>
								<td>{student.currentClass}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : selectedClass && students.length === 0 ? (
				<div className="no-students">
					<p>No students found in this class</p>
				</div>
			) : (
				<div className="no-class-selected">
					<p>Please select a class to view students</p>
				</div>
			)}

			{selectedClass && students.length > 0 && (
				<div className="footer">
					<p>Class member: {students.length}</p>
				</div>
			)}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="promote-class-modal">
					<aside>
						<h3>Promote Class</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>
					<main>
						<h4>
							Promote{" "}
							{
								classes.find(
									(c) => c.id === parseInt(selectedClass),
								)?.class_name
							}{" "}
							Students to
						</h4>

						<FaAnglesDown />

						<select
							name="targetClass"
							id="targetClass"
							value={targetClass}
							onChange={(e) => setTargetClass(e.target.value)}
							required
						>
							<option value="">Select Class</option>
							{classes
								.filter(
									(classItem) =>
										classItem.id !==
										parseInt(selectedClass),
								)
								.map((classItem) => (
									<option
										key={classItem.id}
										value={classItem.id}
									>
										{classItem.class_name}
									</option>
								))}
						</select>

						<button
							className="primary-btn"
							onClick={handlePromoteStudents}
							disabled={promoting || !targetClass}
						>
							{promoting ? "Promoting..." : "Promote Students"}
						</button>
					</main>
				</div>
			</Modal>
		</div>
	);
};

export default PromotionTable;
