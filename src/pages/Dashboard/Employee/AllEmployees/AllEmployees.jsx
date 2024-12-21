import React, { useState } from "react";
import "./AllEmployees.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { IoEyeOutline } from "react-icons/io5";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import emptyEmployee from "../../../../assets/empty-employee.svg";
import { Link } from "react-router-dom";

const AllEmployees = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const employees = [
		{
			id: 1,
			name: "Robert Donnelly",
			role: "Management",
			category: "Teachers",
		},
		{
			id: 2,
			name: "Robert Donnelly",
			role: "Management",
			category: "Teachers",
		},
		{
			id: 3,
			name: "Robert Donnelly",
			role: "Management",
			category: "Management",
		},
		{
			id: 4,
			name: "Robert Donnelly",
			role: "Management",
			category: "Management",
		},
	];

	const filteredEmployees = employees.filter((employee) =>
		employee.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const categories = ["Teachers", "Management"];

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
					{categories.map((category) => (
						<div key={category}>
							<h3 className="category-title">{category}</h3>
							<div className="employee-cards">
								{filteredEmployees
									.filter(
										(employee) =>
											employee.category === category
									)
									.map((employee) => (
										<div
											key={employee.id}
											className="employee-card"
										>
											<div className="avatar"></div>
											<p className="employee-name">
												{employee.name}
											</p>
											<p className="employee-role">
												<strong>{employee.role}</strong>
											</p>
											<div className="actions">
												<Link
													to={`/dashboard/viewemployee/${employee.id}`}
													className="action-button view"
												>
													<IoEyeOutline />
												</Link>
												<Link
													to={`/dashboard/editemployee/${employee.id}`}
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
