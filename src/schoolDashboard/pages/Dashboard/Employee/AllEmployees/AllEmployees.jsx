import React, { useState, useContext } from "react";
import "./AllEmployees.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { IoEyeOutline } from "react-icons/io5";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import emptyEmployee from "../../../../assets/empty-employee.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/schoolContext";

const AllEmployees = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { userToken } = useContext(UserContext);
	const { employees } = useContext(SchoolContext);

	const filteredEmployees = employees.filter(
		(employee) =>
			employee.first_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			employee.surname.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Group employees by role
	const employeesByRole = filteredEmployees.reduce((groups, employee) => {
		const role = employee.role;
		if (!groups[role]) {
			groups[role] = [];
		}
		groups[role].push(employee);
		return groups;
	}, {});

	// Get unique role categories
	const uniqueRoles = Object.keys(employeesByRole);

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
					{uniqueRoles.map((role) => (
						<div key={role}>
							<h3 className="category-title">{role}</h3>
							<div className="employee-cards">
								{employeesByRole[role].map((employee) => (
									<div
										key={employee.id}
										className="employee-card"
									>
										<div className="avatar">
											<img src={employee.profile_photo} />
										</div>
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
