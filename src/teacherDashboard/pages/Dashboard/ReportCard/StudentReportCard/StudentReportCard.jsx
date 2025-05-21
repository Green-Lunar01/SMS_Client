import React, { useState } from "react";
import "./StudentReportCard.css";
import CardComponent from "./CardComponent/CardComponent";

const StudentReportCard = () => {
	const [tab, setTab] = useState("one");
	return (
		<div className="student-report-card">
			{tab === "one" && (
				<div className="search-tab">
					<input
						type="text"
						name="student"
						id="student"
						placeholder="Search student"
					/>

					<button
						className="primary-btn"
						onClick={() => setTab("two")}
					>
						Search
					</button>
				</div>
			)}

			{tab === "two" && <CardComponent />}
		</div>
	);
};

export default StudentReportCard;
