import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./StudentAttendance.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { RiDeleteBinLine } from "react-icons/ri";

const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="pagination">
			<p>
				Per Pages <span>{itemsPerPage}</span>
			</p>
			<main>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<IoIosArrowBack />
				</button>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(
					(pageNumber) => (
						<button
							key={pageNumber}
							className={
								currentPage === pageNumber ? "active" : ""
							}
							onClick={() => handlePageChange(pageNumber)}
						>
							{pageNumber}
						</button>
					),
				)}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					<IoIosArrowForward />
				</button>
			</main>
		</div>
	);
};

const StudentAttendance = () => {
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
				week1: ["U", "U", "U", "U", "U"],
				week2: ["U", "U", "U", "U", "U"],
				week3: ["U", "U", "U", "U", "U"],
			},
		},
		{
			id: 2,
			name: "Harry Marvin",
			class: "J.S.S.1",
			records: {
				week1: ["U", "U", "U", "U", "U"],
				week2: ["U", "U", "U", "U", "U"],
				week3: ["U", "U", "U", "U", "U"],
			},
		},
		{
			id: 3,
			name: "Sophia Johnson",
			class: "J.S.S.2",
			records: {
				week1: ["P", "U", "P", "U", "P"],
				week2: ["U", "P", "U", "P", "U"],
				week3: ["P", "P", "U", "U", "P"],
			},
		},
		{
			id: 4,
			name: "Liam Smith",
			class: "S.S.S.1",
			records: {
				week1: ["A", "P", "P", "A", "U"],
				week2: ["P", "A", "P", "U", "P"],
				week3: ["U", "U", "P", "P", "A"],
			},
		},
		{
			id: 5,
			name: "Olivia Brown",
			class: "J.S.S.3",
			records: {
				week1: ["P", "P", "P", "U", "P"],
				week2: ["A", "U", "A", "P", "P"],
				week3: ["P", "A", "U", "U", "P"],
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
		let filtered = records.filter((record) =>
			record.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);

		setFilteredRecords(filtered);
		setCurrentPage(1);
	};

	const handleAttendanceClick = (recordId, week, dayIndex) => {
		setRecords((prevRecords) => {
			const newRecords = [...prevRecords];
			const recordIndex = newRecords.findIndex((r) => r.id === recordId);
			const currentStatus =
				newRecords[recordIndex].records[week][dayIndex];

			// Cycle through states: U (unmarked) -> P (present) -> A (absent) -> U (unmarked)
			let newStatus;
			switch (currentStatus) {
				case "U":
					newStatus = "P";
					break;
				case "P":
					newStatus = "A";
					break;
				case "A":
					newStatus = "U";
					break;
				default:
					newStatus = "U";
			}

			newRecords[recordIndex].records[week] = [
				...newRecords[recordIndex].records[week].slice(0, dayIndex),
				newStatus,
				...newRecords[recordIndex].records[week].slice(dayIndex + 1),
			];

			return newRecords;
		});
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
						<article>
							<p>
								Students: <span>{records.length}</span>
							</p>
						</article>
						<table>
							<thead>
								<tr>
									<th>Student Name</th>
									<th>Week 1</th>
									<th>Week 2</th>
									<th>Week 3</th>
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
																	onClick={() =>
																		handleAttendanceClick(
																			record.id,
																			week,
																			index,
																		)
																	}
																	className={`attendance-status ${
																		status ===
																		"P"
																			? "present"
																			: status ===
																				  "A"
																				? "absent"
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
						<Pagination
							totalItems={filteredRecords.length}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
						<button className="primary-btn">Submit</button>
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

export default StudentAttendance;
