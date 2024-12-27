import React, { useState } from "react";
import "./Fee.css";
import AddNewBank from "./AddNewBank/AddNewBank";
import FeeCollection from "./FeeCollection/FeeCollection";
import Defaulters from "./Defaulters/Defaulters";

const Fee = () => {
	const [tab, setTab] = useState("one");

	const generateStudentData = (numStudents) => {
		const firstNames = [
			"John",
			"Jane",
			"Michael",
			"Emily",
			"David",
			"Sarah",
			"Robert",
			"Jessica",
			"William",
			"Olivia",
		];
		const lastNames = [
			"Smith",
			"Johnson",
			"Williams",
			"Brown",
			"Davis",
			"Miller",
			"Wilson",
			"Anderson",
			"Taylor",
			"Thompson",
		];
		const classes = ["A.S.S D", "B.S.S A", "C.S.S B", "D.S.S C", "E.S.S D"];
		const classTeachers = [
			"Lorena Gutmann",
			"Mariana Schmid",
			"Tobias Mayer",
			"Karin Becker",
			"Florian Weber",
		];
		const sessionYears = ["2021/2022", "2022/2023", "2023/2024"];

		const students = [];

		for (let i = 0; i < numStudents; i++) {
			const firstName =
				firstNames[Math.floor(Math.random() * firstNames.length)];
			const lastName =
				lastNames[Math.floor(Math.random() * lastNames.length)];
			const matricNumber = Math.floor(
				Math.random() * 1000000000
			).toString();
			const classIndex = Math.floor(Math.random() * classes.length);
			const classTeacherIndex = Math.floor(
				Math.random() * classTeachers.length
			);
			const sessionYearIndex = Math.floor(
				Math.random() * sessionYears.length
			);
			const dateOfAdmission = generateRandomDate();

			students.push({
				firstName,
				lastName,
				matricNumber,
				class: classes[classIndex],
				classTeacher: classTeachers[classTeacherIndex],
				sessionYear: sessionYears[sessionYearIndex],
				dateOfAdmission: dateOfAdmission.toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
			});
		}

		return students;
	};

	const generateRandomDate = () => {
		const startDate = new Date(2020, 0, 1);
		const endDate = new Date();
		return new Date(
			startDate.getTime() +
				Math.random() * (endDate.getTime() - startDate.getTime())
		);
	};

	const studentData = generateStudentData(100);

	return (
		<div className="fee-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Collection Bank
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Fee Collection
				</button>
				<button
					onClick={() => setTab("three")}
					className={tab === "three" ? "active" : ""}
				>
					Fee Defaulters
				</button>
			</aside>

			{tab === "one" && <AddNewBank />}
			{tab === "two" && <FeeCollection />}
			{tab === "three" && <Defaulters studentData={studentData} />}
		</div>
	);
};

export default Fee;
