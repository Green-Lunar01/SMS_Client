import React, { useState } from "react";
import "./ClassDetails.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";

const ClassDetails = () => {
	const [searchQuery, setSearchQuery] = useState("");
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

	const filteredStudents = students.filter(
		(data) =>
			data.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
			data.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			data.matricNumber.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const SearchBar = ({ searchQuery, setSearchQuery }) => (
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
	);

	return (
		<div className="class-details-screen">
			<aside>
				<Link to="/dashboard/class">Create New Class</Link>
				<Link to="/dashboard/class">All Classes</Link>
			</aside>

			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<Link to="/dashboard/class" className="back-link">
				<IoMdArrowBack />
			</Link>

			<main>
				<div className="student-table">
					<header className="table-header">
						<div className="table-info">
							<p>J.S.S 1</p>
							<p>No of Students: 50</p>
						</div>
						<p>Class Teacher: Paul Mark</p>
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
							{filteredStudents.map((student, index) => (
								<tr key={index}>
									<td>{student.surname}</td>
									<td>{student.firstName}</td>
									<td>{student.matricNumber}</td>
									<td>{student.gender}</td>
									<td>{student.schoolFees}</td>
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
