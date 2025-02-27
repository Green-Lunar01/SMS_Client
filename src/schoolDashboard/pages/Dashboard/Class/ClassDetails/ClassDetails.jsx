import React, { useState, useEffect } from "react";
import "./ClassDetails.css";
import { Link, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";

const ClassDetails = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { id } = useParams();
	const students = [
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678941",
			gender: "Male",
			schoolFees: "₦2,000",
		},
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678943",
			gender: "Male",
			schoolFees: "₦2,000",
		},
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678943",
			gender: "Male",
			schoolFees: "₦2,000",
		},
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678943",
			gender: "Male",
			schoolFees: "₦2,000",
		},
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678943",
			gender: "Male",
			schoolFees: "₦2,000",
		},
		{
			surname: "Joseph",
			firstName: "Asher",
			matricNumber: "BT45678943",
			gender: "Male",
			schoolFees: "₦2,000",
		},
	];

	const [classDetails, setClassDetails] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchClassDetails = async () => {
		setLoading(true);

		try {
			const response = await api.get(
				`/school/classes/full-details/${id}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			setClassDetails(response.data.data);
		} catch (err) {
			console.error("Error fetching class details:", err);
			toast.error(
				"Failed to load class details. Please refresh or try again later.",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchClassDetails();
	}, []);

	const filteredStudents = classDetails?.students?.filter(
		(data) =>
			data.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
			data.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			data.matric_number
				.toLowerCase()
				.includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="class-details-screen">
			<aside>
				<Link to="/school/dashboard/class">Create New Class</Link>
				<Link to="/school/dashboard/class">All Classes</Link>
			</aside>

			<div className="search-area">
				<div>
					<span className="search-bar">
						<CiSearch />
						<input
							type="text"
							placeholder="Search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</span>
					<button>Search</button>
				</div>
			</div>

			<Link to="/school/dashboard/class" className="back-link">
				<IoMdArrowBack />
			</Link>

			<main>
				<div className="student-table">
					<header className="table-header">
						<div className="table-info">
							<p>{classDetails.class_name}</p>
							<p>
								No of Students: {classDetails?.students?.length}
							</p>
						</div>
						<p>Class Teacher: {classDetails.class_teacher}</p>
					</header>
					<table>
						<thead>
							<tr>
								<th>Surname</th>
								<th>First Name</th>
								<th>Matric Number</th>
								<th>Gender</th>
								<th>School Fees</th>
							</tr>
						</thead>
						<tbody>
							{filteredStudents?.map((student, index) => (
								<tr key={index}>
									<td>{student.surname}</td>
									<td>{student.first_name}</td>
									<td>{student.matric_number}</td>
									<td>{student.gender}</td>
									<td>{student.school_fees}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</div>
	);
};

export default ClassDetails;
