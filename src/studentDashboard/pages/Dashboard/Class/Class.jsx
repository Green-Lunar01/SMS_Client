import React, { useState } from "react";
import "./Class.css";
import AllClasses from "./AllClasses/AllClasses";

const Class = () => {
	const [tab, setTab] = useState("create");

	return (
		<div className="class-screen">
			<aside>
				<button
					onClick={() => setTab("create")}
					className={tab === "create" ? "active" : ""}
				>
					Create New Class
				</button>
				<button
					onClick={() => setTab("all")}
					className={tab === "all" ? "active" : ""}
				>
					All Classes
				</button>
			</aside>

			{tab === "create" && (
				<>
					<div className="create-class">
						<h3>Add New Class</h3>

						<label htmlFor="class-name">
							<p>Class Name *</p>
							<input
								type="text"
								id="class-name"
								placeholder="e.g J.S.S 1"
							/>
						</label>
						<label htmlFor="term-fee">
							<p>Class Name *</p>
							<input
								type="text"
								id="term-fee"
								placeholder="e.g N40,000"
							/>
						</label>
						<label htmlFor="class-teacher">
							<p>Class Teacher *</p>
							<select name="class-teacher" id="class-teacher">
								<option value="Mr John">Mr John</option>
								<option value="Mrs Jane">Mrs Jane</option>
							</select>
						</label>

						<button>Create</button>
					</div>
				</>
			)}

			{tab === "all" && <AllClasses />}
		</div>
	);
};

export default Class;
