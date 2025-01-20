import React, { useState } from "react";
import "./Subject.css";
import ClassesWithSubjects from "./ClassesWithSubjects/ClassesWithSubjects";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown/MultiSelectDropdown";

const Subject = () => {
	const [tab, setTab] = useState("create");
	const classes = ["Class A", "Class B", "Class C", "Class D", "Class E"];

	return (
		<div className="subject-screen">
			<aside>
				<button
					onClick={() => setTab("create")}
					className={tab === "create" ? "active" : ""}
				>
					Assign Subjects
				</button>
				<button
					onClick={() => setTab("all")}
					className={tab === "all" ? "active" : ""}
				>
					Classes with Subjects
				</button>
			</aside>

			{tab === "create" && (
				<>
					<div className="create-class">
						<h3>Create Subject</h3>

						<label htmlFor="subject-class">
							<p>Subject Class *</p>
							<MultiSelectDropdown
								options={classes}
								placeholder="Select Classes"
							/>
						</label>
						<label htmlFor="subject-name">
							<p>Subject Name *</p>
							<input
								type="text"
								id="subject-name"
								placeholder="e.g N40,000"
							/>
						</label>
						<label htmlFor="subject-teacher">
							<p>Select Subject Teacher *</p>
							<select name="subject-teacher" id="subject-teacher">
								<option value="Mr John">Mr John</option>
								<option value="Mrs Jane">Mrs Jane</option>
							</select>
						</label>

						<button>Create Assign Subject</button>
					</div>
				</>
			)}

			{tab === "all" && <ClassesWithSubjects />}
		</div>
	);
};

export default Subject;
