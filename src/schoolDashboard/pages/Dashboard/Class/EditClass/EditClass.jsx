import React, { useState, useEffect, useContext } from "react";
import "./EditClass.css";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/schoolContext";
import api from "../../../../lib/axios";

const EditClass = () => {
	const { id } = useParams();
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

	const fetchClassDetails = async () => {
		try {
			const response = await api.get(`/school/students?class_id=${id}`, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			console.log(response);
			// setClassDetails(response.data.data);
		} catch (err) {
			console.error("Error fetching class details:", err);
			toast.error(
				err.response.data.message ||
					err.message ||
					"Failed to load class details. Please refresh or try again later.",
			);
		}
	};

	useEffect(() => {
		fetchClassDetails();
	}, []);

	const updateClass = async () => {
		if (!className) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);
		console.log(className, classTeacher);
		setLoading(false);
		return;

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
		<div className="edit-class-screen">
			<aside>
				<Link to="/school/dashboard/class">Create New Class</Link>
				<Link to="/school/dashboard/class">All Classes</Link>
			</aside>

			<Link to="/school/dashboard/class" className="back-link">
				<IoMdArrowBack />
			</Link>

			<div className="edit-class">
				<h3>Edit Class</h3>

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
						onChange={(e) => setClassTeacher(e.target.value)}
					>
						{teacherList.map((teacher) => (
							<option key={teacher.id} value={teacher.id}>
								{teacher.first_name} {teacher.surname}
							</option>
						))}
					</select>
				</label>

				<button onClick={updateClass} disabled={loading}>
					{loading ? <Spinner /> : "Update Class"}
				</button>
			</div>
		</div>
	);
};

export default EditClass;
