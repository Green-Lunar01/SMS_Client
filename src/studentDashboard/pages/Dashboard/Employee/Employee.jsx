import React, { useState } from "react";
import "./Employee.css";
import AddNewEmployee from "./AddNewEmployee/AddNewEmployee";
import AllEmployees from "./AllEmployees/AllEmployees";
import EmployeeLetter from "./EmployeeLetter/EmployeeLetter";

const Employee = () => {
	const [tab, setTab] = useState("new");

	return (
		<div className="employee-screen">
			<aside>
				<button
					onClick={() => setTab("new")}
					className={tab === "new" ? "active" : ""}
				>
					Add new employee
				</button>
				<button
					onClick={() => setTab("all")}
					className={tab === "all" ? "active" : ""}
				>
					All employees
				</button>
				<button
					onClick={() => setTab("letter")}
					className={tab === "letter" ? "active" : ""}
				>
					Employment letter
				</button>
			</aside>

			{tab === "new" && <AddNewEmployee />}
			{tab === "all" && <AllEmployees />}
			{tab === "letter" && <EmployeeLetter />}
		</div>
	);
};

export default Employee;
