import React, { useState, useContext, useEffect } from "react";
import "./Subject.css";
import ClassesWithSubjects from "./ClassesWithSubjects/ClassesWithSubjects";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown/MultiSelectDropdown";
import { SchoolContext } from "../../../context/schoolContext";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

const Subject = () => {
	const [tab, setTab] = useState("create");
	const { classes, employees } = useContext(SchoolContext);
	const { userToken } = useContext(UserContext);
	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
	const [teacher, setTeacher] = useState();
	const [subject, setSubject] = useState();
	const [teacherList, setTeacherList] = useState([]);
	const [loading, setLoading] = useState(false);

	const getEmployeeByCategory = (category) => {
		setTeacherList(
			employees.filter((employee) => employee.role === category),
		);
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	const createSubject = async () => {
		if (!subject) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);

		try {
			const response = await axios.post(
				`${BASE_API_URL}/school/subjects/create`,
				{
					subject_name: subject,
				},
				{
					headers: {
						Authorization: `${userToken}`,
					},
				},
			);
			console.log(response);
			toast.success("class created successfully");
			setLoading(false);
		} catch (err) {
			toast.error(err.response.data.message || err.message);
			console.log(err);
			setLoading(false);
		}
	};

	const assignSubject = async () => {
		if (!subject) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);

		try {
			const response = await axios.post(
				`${BASE_API_URL}/school/subjects/assign`,
				{
					teacher_id: teacher,
					subject_id: 0,
					class_ids: [0],
				},
				{
					headers: {
						Authorization: `${userToken}`,
					},
				},
			);
			toast.success("Class assigned successfully");
			setLoading(false);
		} catch (err) {
			toast.error(err.response.data.message || err.message);
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<div className="subject-screen">
			<aside>
				<button
					onClick={() => setTab("create")}
					className={tab === "create" ? "active" : ""}
				>
					Assign Subjects
				</button>
				<button
					onClick={() => setTab("all")}
					className={tab === "all" ? "active" : ""}
				>
					Classes with Subjects
				</button>
			</aside>

			{tab === "create" && (
				<>
					<div className="create-class">
						<h3>Create Subject</h3>

						<label htmlFor="subject-class">
							<p>Subject Class *</p>
							<MultiSelectDropdown
								options={classes}
								placeholder="Select Classes"
							/>
						</label>
						<label htmlFor="subject-name">
							<p>Subject Name *</p>
							<input
								type="text"
								id="subject-name"
								placeholder="e.g N40,000"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
							/>
						</label>
						<label htmlFor="subject-teacher">
							<p>Select Subject Teacher *</p>
							<select
								name="subject-teacher"
								id="subject-teacher"
								onChange={(e) => setTeacher(e.target.value)}
							>
								{teacherList.map((teacher) => (
									<option value={teacher.id} key={teacher.id}>
										{teacher.first_name} {teacher.surname}
									</option>
								))}
							</select>
						</label>

						<button onClick={createSubject} disabled={loading}>
							{loading ? (
								<Spinner />
							) : (
								"Create and Assign Subject"
							)}
						</button>
					</div>
				</>
			)}

			{tab === "all" && <ClassesWithSubjects />}
		</div>
	);
};

export default Subject;
