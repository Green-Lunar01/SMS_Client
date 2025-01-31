import React, { useState } from "react";
import "./Tests.css";
import CreateNewTests from "./CreateNewTests/CreateNewTests";
import TestResults from "./TestResults/TestResults";

const Tests = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="tests-screen">
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
					Test Result
				</button>
			</aside>

			{tab === "one" && <CreateNewTests />}
			{tab === "two" && <TestResults />}
		</div>
	);
};

export default Tests;
