import React, { useState } from "react";
import "./RolePrivileges.css";

const RolePrivileges = () => {
	const [selectedRole, setSelectedRole] = useState("Principal");

	const roles = ["Principal", "Accountant"];

	const permissions = {
		Principal: {
			Class: {
				"Create new class": { edit: true, view: false },
				"All classes": { edit: true, view: false },
			},
			Subject: {
				"Assign subjects": { edit: true, view: false },
				"Classes with subject": { edit: false, view: true },
			},
			Employee: {
				"Add new employee": { edit: true, view: false },
				"All employees": { edit: false, view: true },
			},
			Fee: {
				"Collection Bank": { edit: true, view: false },
				"Fee Collection": { edit: false, view: true },
				"Fee Slip": { edit: false, view: true },
				"Fee Defaulters": { edit: false, view: true },
			},
			Account: {
				"Chart of Account": { edit: true, view: false },
				"Add Income": { edit: false, view: true },
				"Add Expense": { edit: true, view: false },
				"Account Statement": { edit: false, view: true },
			},
			Salary: {
				"Salary Form": { edit: true, view: false },
				"Salary Report List": { edit: false, view: true },
			},
			Attendance: {
				"Mark Employee Attendance": { edit: true, view: false },
				"Student Attendance Report": { edit: false, view: true },
				"Employee Attendance Report": { edit: false, view: false },
			},
			Assignment: { Assignment: { edit: true, view: false } },
			"Time Table": { "": { edit: true, view: false } },
			Messaging: { "": { edit: true, view: false } },
			"Live Class": { "": { edit: true, view: false } },
			"Question Paper": {
				"Create New": { edit: true, view: false },
				"Question Papers": { edit: false, view: true },
			},
			Exams: {
				"Create New": { edit: true, view: false },
				"Exam Result": { edit: false, view: true },
			},
			"Class Test": {
				"Create New": { edit: true, view: false },
				"Test Result": { edit: false, view: true },
			},
			Report: {
				"Student Report Card": { edit: true, view: false },
				"Student Info Report": { edit: false, view: true },
			},
			"Users Access": { "": { edit: false, view: false } },
			Certificates: { "": { edit: false, view: false } },
		},
		Accountant: {
			// Permissions for Accountant role (similar structure as above)
		},
	};

	return (
		<div className="role-privileges-comp">
			{/* Role Selector */}
			<div className="role-selector">
				{roles.map((role, index) => (
					<button
						key={index}
						className={`role-button ${
							selectedRole === role ? "active" : ""
						}`}
						onClick={() => setSelectedRole(role)}
					>
						{role}
					</button>
				))}
			</div>

			{/* Privileges Table */}
			<table className="privileges-table">
				<thead>
					<tr>
						<th>Action</th>
						<th>Edit/View</th>
						<th>Edit/View</th>
						<th>Edit/View</th>
						<th>Edit/View</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(permissions[selectedRole]).map(
						([category, actions]) => (
							<tr key={category}>
								<td>{category}</td>
								{Object.entries(actions).map(
									([action, { edit, view }]) => (
										<td
											key={action}
											className="action-cell"
										>
											<article>
												<p className="action-label">
													{action}
												</p>
												<div className="checkbox-group">
													<input
														type="checkbox"
														checked={edit}
														onChange={() => {}}
														readOnly
													/>
													<span className="separator"></span>
													<input
														type="checkbox"
														checked={view}
														onChange={() => {}}
														readOnly
													/>
												</div>
											</article>
										</td>
									)
								)}
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default RolePrivileges;
