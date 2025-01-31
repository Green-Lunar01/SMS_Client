import React, { useState, useEffect } from "react";
import "./StudentAttendance.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const StudentTotalAttendance = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const sampleData = [
		{
			id: 1,
			name: "Rosemarie Hickle",
			class: "J.S.S.1",
			records: {
				"Week 1": ["P", "A", "P", "P", "A"],
				"Week 2": ["A", "P", "P", "P", "F"],
				"Week 3": ["P", "P", "P", "P", "A"],
				"Week 4": ["P", "A", "P", "P", "A"],
				"Week 5": ["A", "P", "P", "P", "A"],
				"Week 6": ["P", "P", "P", "P", "A"],
			},
		},
	];

	const [records, setRecords] = useState(sampleData);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [classSelected, setClassSelected] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		// Fetch student data from an API later
		fetchRecordsData();
	}, []);

	useEffect(() => {
		filterRecords();
	}, [searchQuery, classSelected]);

	const fetchRecordsData = async () => {
		const response = await fetch("/api/Records");
		const data = await response.json();
		setRecords(data);
		setFilteredRecords(data);
	};

	const filterRecords = () => {
		let filtered = records.filter(
			(record) =>
				record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				record.class
					.toLowerCase()
					.includes(classSelected.toLowerCase()),
		);

		setFilteredRecords(filtered);
		setCurrentPage(1);
	};

	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredRecords.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);

	return (
		<div className="student-attendance-screen">
			<aside>
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</aside>
			<main>
				{filteredRecords.length > 0 ? (
					<div className="record-table">
						{/* <article>
							<p>
								Students: <span>{records.length}</span>
							</p>
						</article> */}
						<table>
							<thead>
								<tr>
									<th>Student Name</th>
									{filteredRecords.map((record) => (
										<>
											{Object.keys(record.records).map(
												(week) => (
													<th key={week}>{week}</th>
												),
											)}
										</>
									))}
								</tr>
							</thead>
							<tbody>
								{filteredRecords.map((record) => (
									<tr key={record.id}>
										<td>{record.name}</td>
										{Object.keys(record.records).map(
											(week) => (
												<td key={week}>
													<div className="attendance-row">
														{record.records[
															week
														].map(
															(status, index) => (
																<span
																	key={index}
																	className={`attendance-status ${
																		status ===
																		"P"
																			? "present"
																			: status ===
																				  "A"
																				? "absent"
																				: status ===
																					  "F"
																					? "late"
																					: "unmarked"
																	}`}
																>
																	{status}
																</span>
															),
														)}
													</div>
												</td>
											),
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="no-records">
						<p>No records found.</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default StudentTotalAttendance;
