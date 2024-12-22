import React, { useState } from "react";
import "./Salary.css";
import SalaryForm from "./SalaryForm/SalaryForm";
import ReportList from "./ReportList/ReportList";

const Salary = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="salary-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Salary Form
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Salary Report List
				</button>
			</aside>

			{tab === "one" && <SalaryForm />}
			{tab === "two" && <ReportList />}
		</div>
	);
};

export default Salary;
