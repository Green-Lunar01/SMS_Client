import React, { useState } from "react";
import "./StudentInfoReport.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const StudentInfoReport = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const sampleData = [
		{
			id: 1,
			"s/n": 1,
			name: "Harry Marvin",
			"matric number": "B3472833",
			class: "J.S.S 1",
			"admission date": "22/06/2024",
			"date of birth": "12/05/2007",
			age: 17,
			gender: "Male",
			religion: "Christianity",
			status: "Active",
		},
		{
			id: 2,
			"s/n": 2,
			name: "John Doe",
			"matric number": "B3472834",
			class: "J.S.S 1",
			"admission date": "22/06/2024",
			"date of birth": "22/01/2008",
			age: 16,
			gender: "Male",
			religion: "Islam",
			status: "Active",
		},
		{
			id: 3,
			"s/n": 3,
			name: "Jane Smith",
			"matric number": "B3472835",
			class: "J.S.S 2",
			"admission date": "22/06/2024",
			"date of birth": "17/03/2009",
			age: 15,
			gender: "Female",
			religion: "Christianity",
			status: "Active",
		},
		{
			id: 4,
			"s/n": 4,
			name: "Emily Brown",
			"matric number": "B3472836",
			class: "J.S.S 2",
			"admission date": "22/06/2024",
			"date of birth": "03/05/2010",
			age: 14,
			gender: "Female",
			religion: "Islam",
			status: "Active",
		},
		{
			id: 5,
			"s/n": 5,
			name: "Michael Johnson",
			"matric number": "B3472837",
			class: "J.S.S 3",
			"admission date": "22/06/2024",
			"date of birth": "24/08/2011",
			age: 13,
			gender: "Male",
			religion: "Christianity",
			status: "Active",
		},
		{
			id: 6,
			"s/n": 6,
			name: "Sarah Lee",
			"matric number": "B3472838",
			class: "J.S.S 3",
			"admission date": "22/06/2024",
			"date of birth": "19/04/2012",
			age: 12,
			gender: "Female",
			religion: "Islam",
			status: "Active",
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
		<div className="student-info-report">
			<div className="student-info-report-table">
				<section className="mid">
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
				</section>

				<table>
					<tr>
						<th>S/N</th>
						<th>Name</th>
						<th>Matric Number</th>
						<th>Class</th>
						<th>Admission Date</th>
						<th>Date of Birth</th>
						<th>Age</th>
						<th>Gender</th>
						<th>Religion</th>
						<th>Status</th>
					</tr>
					{filteredData.map((item) => (
						<tr>
							<td>{item["s/n"]}</td>
							<td>{item.name}</td>
							<td>{item["matric number"]}</td>
							<td>{item.class}</td>
							<td>{item["admission date"]}</td>
							<td>{item["date of birth"]}</td>
							<td>{item.age}</td>
							<td>{item.gender}</td>
							<td>{item.religion}</td>
							<td>{item.status}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default StudentInfoReport;
