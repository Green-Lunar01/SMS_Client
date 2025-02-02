import React, { useState, useEffect, useContext } from "react";
import "./AllEmployees.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { IoEyeOutline } from "react-icons/io5";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import emptyEmployee from "../../../../assets/empty-employee.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/schoolContext";

const AllEmployees = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const { userToken } = useContext(UserContext);
	const { employees, employeeCategories } = useContext(SchoolContext);

	const filteredEmployees = employees.filter(
		(employee) =>
			employee.first_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.surname.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="all-employees">
			<SearchBar
				searchQuery={searchTerm}
				setSearchQuery={setSearchTerm}
			/>

			{filteredEmployees.length === 0 ? (
				<div className="empty-state">
					<img src={emptyEmployee} alt="" />
					<p>No record found</p>
				</div>
			) : (
				<>
					{employeeCategories.map((category) => (
						<div key={category}>
							<h3 className="category-title">{category}</h3>
							<div className="employee-cards">
								{filteredEmployees
									.filter(
										(employee) =>
											employee.role === category,
									)
									.map((employee) => (
										<div
											key={employee.id}
											className="employee-card"
										>
											<div className="avatar"></div>
											<p className="employee-name">
												{employee.first_name}{" "}
												{employee.surname}
											</p>
											<p className="employee-role">
												<strong>{employee.role}</strong>
											</p>
											<div className="actions">
												<Link
													to={`/school/dashboard/viewemployee/${employee.id}`}
													className="action-button view"
												>
													<IoEyeOutline />
												</Link>
												<Link
													to={`/school/dashboard/editemployee/${employee.id}`}
													className="action-button edit"
												>
													<RiEdit2Line />
												</Link>
												<button className="action-button delete">
													<RiDeleteBin6Line />
												</button>
											</div>
										</div>
									))}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default AllEmployees;
