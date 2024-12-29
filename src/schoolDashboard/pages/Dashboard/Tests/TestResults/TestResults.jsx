import React, { useState } from "react";
import "./TestResults.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import noReport from "../../../../assets/no-report.png";
import pdfIcon from "../../../../assets/pdf-icon.png";
import xlsIcon from "../../../../assets/xls-icon.png";
import csvIcon from "../../../../assets/csv-icon.png";

const TestResults = () => {
	const [tab, setTab] = useState("one");
	const [searchQuery, setSearchQuery] = useState("");

	const sampleData = [
		{
			id: 1,
			"test date": "22/06/2024",
			name: "Harry Marvin",
			"matric no": "B3472833",
			session: "2023/2024",
			class: "J.S.S 1",
			term: "Term 1",
			subject: "Maths",
			"total marks": "100",
			"marks obtained": "90",
		},
		{
			id: 2,
			"test date": "22/06/2024",
			name: "John Doe",
			"matric no": "B3472834",
			session: "2023/2024",
			class: "J.S.S 1",
			term: "Term 1",
			subject: "English",
			"total marks": "100",
			"marks obtained": "85",
		},
		{
			id: 3,
			"test date": "22/06/2024",
			name: "Jane Smith",
			"matric no": "B3472835",
			session: "2023/2024",
			class: "J.S.S 2",
			term: "Term 1",
			subject: "Science",
			"total marks": "100",
			"marks obtained": "88",
		},
		{
			id: 4,
			"test date": "22/06/2024",
			name: "Emily Brown",
			"matric no": "B3472836",
			session: "2023/2024",
			class: "J.S.S 2",
			term: "Term 2",
			subject: "Maths",
			"total marks": "100",
			"marks obtained": "92",
		},
		{
			id: 5,
			"test date": "22/06/2024",
			name: "Michael Johnson",
			"matric no": "B3472837",
			session: "2023/2024",
			class: "J.S.S 3",
			term: "Term 1",
			subject: "History",
			"total marks": "100",
			"marks obtained": "78",
		},
		{
			id: 6,
			"test date": "22/06/2024",
			name: "Sarah Lee",
			"matric no": "B3472838",
			session: "2023/2024",
			class: "J.S.S 3",
			term: "Term 2",
			subject: "Geography",
			"total marks": "100",
			"marks obtained": "95",
		},
	];

	const filteredData = sampleData.filter((item) => {
		const keys = Object.keys(item);
		return keys.some((key) =>
			item[key]
				.toString()
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		);
	});

	return (
		<div className="test-results">
			{tab === "one" && (
				<div className="search-test-results-form">
					<div className="form-group">
						<label htmlFor="class">Select Class</label>
						<select name="class" id="class">
							<option value="">Select Class</option>
							<option value="J.S.S 1">J.S.S 1</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="testSubject">Select Test Subject</label>
						<select name="testSubject" id="testSubject">
							<option value="">Select Subject</option>
							<option value="Maths">Maths</option>
							<option value="English">English</option>
							<option value="Science">Science</option>
						</select>
					</div>

					<button
						className="primary-btn"
						onClick={() => setTab("two")}
					>
						Search
					</button>
				</div>
			)}

			{tab === "two" && (
				<div className="test-results-table">
					<section className="mid">
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>

						<aside>
							<select name="subject" id="subject">
								<option value="all">All Subjects</option>
							</select>
							<select name="term" id="term">
								<option value="term1">Term 1</option>
							</select>
							<select name="session" id="session">
								<option value="2022/2023">2022/2023</option>
							</select>

							<div>
								<img src={pdfIcon} alt="" />
							</div>
							<div>
								<img src={xlsIcon} alt="" />
							</div>
							<div>
								<img src={csvIcon} alt="" />
							</div>
						</aside>
					</section>

					<table>
						<tr>
							<th>Test Date</th>
							<th>Name</th>
							<th>Matric Number</th>
							<th>Session</th>
							<th>Class</th>
							<th>Term</th>
							<th>Subject</th>
							<th>Total Marks</th>
							<th>Marks Obtained</th>
						</tr>
						{filteredData.map((item) => (
							<tr>
								<td>{item["test date"]}</td>
								<td>{item.name}</td>
								<td>{item["matric no"]}</td>
								<td>{item.session}</td>
								<td>{item.class}</td>
								<td>{item.term}</td>
								<td>{item.subject}</td>
								<td>{item["total marks"]}</td>
								<td>{item["marks obtained"]}</td>
							</tr>
						))}
					</table>
				</div>
			)}
		</div>
	);
};

export default TestResults;
