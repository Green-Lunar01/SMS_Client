import React, { useState } from "react";
import "./ReportCard.css";
import StudentReportCard from "./StudentReportCard/StudentReportCard";
import StudentInfoReport from "./StudentInfoReport/StudentInfoReport";

const ReportCard = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="report-card-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Student Report Card
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Student Info Report
				</button>
			</aside>

			{tab === "one" && <StudentReportCard />}
			{tab === "two" && <StudentInfoReport />}
		</div>
	);
};

export default ReportCard;
