import React, { useState } from "react";
import "./Exams.css";
import CreateNewExams from "./CreateNewExams/CreateNewExams";
import ExamResults from "./ExamResults/ExamResults";

const Exams = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="exams-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Create New
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Exam Result
				</button>
			</aside>

			{tab === "one" && <CreateNewExams />}
			{tab === "two" && <ExamResults />}
		</div>
	);
};

export default Exams;
