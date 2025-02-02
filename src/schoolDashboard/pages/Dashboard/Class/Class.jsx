import React, { useState, useEffect, useContext } from "react";
import "./Class.css";
import AllClasses from "./AllClasses/AllClasses";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { UserContext } from "../../../context/userContext";
import { SchoolContext } from "../../../context/schoolContext";

const Class = () => {
	const [tab, setTab] = useState("create");
	const [loading, setLoading] = useState(false);
	const [className, setClassName] = useState();
	const [schoolFees, setSchoolFees] = useState();
	const [classTeacher, setClassTeacher] = useState();

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
	const { userToken } = useContext(UserContext);
	const { employees } = useContext(SchoolContext);
	const [teacherList, setTeacherList] = useState([]);

	const getEmployeeByCategory = (category) => {
		setTeacherList(
			employees.filter((employee) => employee.role === category),
		);
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	const navigate = useNavigate();

	const createClass = async () => {
		if (!className) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);
		// console.log(className, classTeacher);
		// setLoading(false);
		// return;

		try {
			const response = await axios.post(
				`${BASE_API_URL}/school/classes/create`,
				{
					class_name: className,
					teacher_id: Number(classTeacher),
				},
				{
					headers: {
						Authorization: `${userToken}`,
					},
				},
			);
			toast.success("class created successfully");
			setLoading(false);
		} catch (err) {
			toast.error(err.response.data.message || err.message);
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<div className="class-screen">
			<aside>
				<button
					onClick={() => setTab("create")}
					className={tab === "create" ? "active" : ""}
				>
					Create New Class
				</button>
				<button
					onClick={() => setTab("all")}
					className={tab === "all" ? "active" : ""}
				>
					All Classes
				</button>
			</aside>

			{tab === "create" && (
				<>
					<div className="create-class">
						<h3>Add New Class</h3>

						<label htmlFor="class-name">
							<p>Class Name *</p>
							<input
								type="text"
								id="class-name"
								placeholder="e.g J.S.S 1"
								value={className}
								onChange={(e) => setClassName(e.target.value)}
							/>
						</label>
						<label htmlFor="term-fee">
							<p>School Fees *</p>
							<input
								type="text"
								id="term-fee"
								value={schoolFees}
								onChange={(e) => setSchoolFees(e.target.value)}
								placeholder="e.g N40,000"
							/>
						</label>
						<label htmlFor="class-teacher">
							<p>Class Teacher *</p>
							<select
								name="class-teacher"
								id="class-teacher"
								value={classTeacher}
								onChange={(e) =>
									setClassTeacher(e.target.value)
								}
							>
								{teacherList.map((teacher) => (
									<option key={teacher.id} value={teacher.id}>
										{teacher.first_name} {teacher.surname}
									</option>
								))}
							</select>
						</label>

						<button onClick={createClass} disabled={loading}>
							{loading ? <Spinner /> : "Create Class"}
						</button>
					</div>
				</>
			)}

			{tab === "all" && <AllClasses />}
		</div>
	);
};

export default Class;
