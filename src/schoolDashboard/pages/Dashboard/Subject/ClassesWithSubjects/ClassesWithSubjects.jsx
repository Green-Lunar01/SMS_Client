import React, { useState, useEffect, useContext } from "react";
import "./ClassesWithSubjects.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { RiEdit2Line, RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";
import Modal from "../../../../components/Modal/Modal";
import { FiPlus } from "react-icons/fi";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";
import Spinner from "../../../../components/Spinner/Spinner";

const ClassesWithSubjects = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClassId, setSelectedClassId] = useState(null);
	const [classSubjects, setClassSubjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	// Add a new state for managing class data
	const [classesData, setClassesData] = useState([]);

	// Context and state for edit form
	const { classes, employees, subjects } = useContext(SchoolContext);

	// Fetch classes with subjects on component mount
	useEffect(() => {
		fetchClassesWithSubjects();
	}, []);

	const fetchClassesWithSubjects = async () => {
		setLoading(true);
		try {
			// Use the single endpoint to fetch all classes with their subjects and teachers
			const response = await api.get("/school/classes/subjects", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			// Process the data to match the expected format for our component
			const processedData = response.data.data.map((classItem) => ({
				id: classItem.classId,
				name: classItem.class_name,
				subjects: classItem.subjects.map(
					(subject) => subject.subject_name,
				),
			}));

			setClassesData(processedData);
		} catch (error) {
			console.error("Error fetching classes with subjects:", error);
			toast.error("Failed to load classes and subjects");
		} finally {
			setLoading(false);
		}
	};

	// Fetch subjects and teachers for a specific class when modal is opened
	const fetchClassSubjects = async (classId) => {
		setLoading(true);
		try {
			// We can extract the class subjects from our already fetched data
			const classData = classesData.find((cls) => cls.id === classId);

			if (!classData) {
				toast.error("Class not found");
				return;
			}

			// Find the class in the original API response to get teacher data
			const response = await api.get("/school/classes/subjects", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			const classWithSubjects = response.data.data.find(
				(cls) => cls.classId === classId,
			);

			if (!classWithSubjects) {
				toast.error("Class details not found");
				return;
			}

			// Format subjects with subject_name and teacher_id
			const formattedSubjects = classWithSubjects.subjects.map(
				(subject) => {
					// Find the teacher ID based on teacher name
					const teacher = employees.find(
						(emp) =>
							`${emp.first_name} ${emp.surname}` ===
							subject.teacher_name,
					);

					return {
						subject_name: subject.subject_name,
						teacher_id: teacher ? teacher.id.toString() : "",
					};
				},
			);

			setClassSubjects(formattedSubjects);
		} catch (error) {
			console.error(
				`Error fetching subjects for class ${classId}:`,
				error,
			);
			toast.error("Failed to load class subjects");
			setClassSubjects([]);
		} finally {
			setLoading(false);
		}
	};

	const openModal = (id) => {
		setSelectedClassId(id);
		fetchClassSubjects(id);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedClassId(null);
		setClassSubjects([]);
	};

	// Add a new subject row in the edit form
	const addSubject = () => {
		setClassSubjects([
			...classSubjects,
			{ subject_name: "", teacher_id: "" },
		]);
	};

	// Remove a subject from the edit form
	const removeSubject = (index) => {
		const updatedSubjects = [...classSubjects];
		updatedSubjects.splice(index, 1);
		setClassSubjects(updatedSubjects);
	};

	// Update subject or teacher for a subject
	const updateSubject = (index, field, value) => {
		const updatedSubjects = [...classSubjects];
		updatedSubjects[index][field] = value;
		setClassSubjects(updatedSubjects);
	};

	// Handle saving the updated subjects and teachers
	const saveSubjects = async () => {
		// Validate data
		const hasEmptyFields = classSubjects.some(
			(subject) => !subject.subject_name || !subject.teacher_id,
		);

		if (hasEmptyFields) {
			toast.error("Please fill in all fields");
			return;
		}

		setSaving(true);

		try {
			// Format the data for the API
			const formattedSubjects = classSubjects.map((subject) => ({
				subject_name: subject.subject_name,
				teacher_id: parseInt(subject.teacher_id),
			}));

			// Make the API call
			await api.put(
				`/school/classes/${selectedClassId}/subjects/edit`,
				{ subjects: formattedSubjects },
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Subjects updated successfully");
			fetchClassesWithSubjects(); // Refresh the class list
			closeModal();
		} catch (error) {
			console.error("Error saving subjects:", error);
			toast.error(
				error.response?.data?.message || "Failed to update subjects",
			);
		} finally {
			setSaving(false);
		}
	};

	// Filter classes based on search query
	const filteredClasses = classesData.filter((classData) =>
		classData.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Filter teachers to show only those with 'Teacher' role
	const teachers = employees.filter(
		(employee) => employee.role === "Teacher",
	);

	return (
		<div className="classes-with-subjects-container">
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{loading && !isModalOpen ? (
				<div className="loading-container">
					<Spinner />
				</div>
			) : (
				<div className="class-list">
					{filteredClasses.length > 0 ? (
						filteredClasses.map((classData) => (
							<ClassCard
								key={classData.id}
								data={classData}
								openModal={openModal}
							/>
						))
					) : (
						<div className="no-records-found">
							<svg
								width="291"
								height="167"
								viewBox="0 0 291 167"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								{/* SVG content omitted for brevity */}
							</svg>
							<p>No records found.</p>
						</div>
					)}
				</div>
			)}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="subjects-modal">
					<aside>
						<h3>Edit</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>

					{loading ? (
						<div className="loading-container">
							<Spinner />
						</div>
					) : (
						selectedClassId && (
							<div className="edit-class-card">
								<h3>
									{
										classes.find(
											(c) => c.id === selectedClassId,
										)?.class_name
									}
								</h3>
								<ul>
									{classSubjects.map((subject, index) => (
										<li key={index}>
											<span>
												<p>
													<select
														value={
															subject.subject_name
														}
														onChange={(e) =>
															updateSubject(
																index,
																"subject_name",
																e.target.value,
															)
														}
													>
														<option value="">
															Select Subject
														</option>
														{subjects.map((sub) => (
															<option
																key={sub.id}
																value={
																	sub.subject_name
																}
															>
																{
																	sub.subject_name
																}
															</option>
														))}
													</select>
												</p>
												<select
													value={subject.teacher_id}
													onChange={(e) =>
														updateSubject(
															index,
															"teacher_id",
															e.target.value,
														)
													}
												>
													<option value="">
														Select Teacher
													</option>
													{teachers.map((teacher) => (
														<option
															key={teacher.id}
															value={teacher.id}
														>
															{teacher.first_name}{" "}
															{teacher.surname}
														</option>
													))}
												</select>
											</span>
											<RiDeleteBin6Line
												onClick={() =>
													removeSubject(index)
												}
											/>
										</li>
									))}
								</ul>

								<button
									className="add-more"
									onClick={addSubject}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "5px",
									}}
								>
									<FiPlus /> Add more subject
								</button>

								<button
									className="primary-btn"
									onClick={saveSubjects}
									disabled={saving}
								>
									{saving ? "Saving..." : "Save"}
								</button>
							</div>
						)
					)}
				</div>
			</Modal>
		</div>
	);
};

const ClassCard = ({ data, openModal }) => {
	const { id, name, subjects } = data;

	return (
		<div className="class-card">
			<div className="top">
				<RiEdit2Line onClick={() => openModal(id)} />
				<h3>{name}</h3>
			</div>
			<div className="bottom">
				<ul>
					{subjects.map((subject, index) => (
						<li key={index}>{subject}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ClassesWithSubjects;
