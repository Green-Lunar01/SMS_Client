import React, { useState, useEffect } from "react";
import "./EmployeeAttendance.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const EmployeeAttendance = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [records, setRecords] = useState([]);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const sampleData = [
		{
			id: 1,
			photo: "https://via.placeholder.com/40",
			name: "Harry Marvin",
			role: "Cleaner",
			records: {
				January: {
					week1: ["P", "P", "P", "P", "A", "S", "S"],
					week2: ["M", "T", "W", "T", "F", "S", "S"],
				},
			},
		},
		{
			id: 2,
			photo: "https://via.placeholder.com/40",
			name: "Harry Marvin",
			role: "Security",
			records: {
				January: {
					week1: ["A", "A", "A", "A", "A", "A", "A"],
					week2: ["M", "T", "W", "T", "F", "S", "S"],
				},
			},
		},
		{
			id: 3,
			photo: "https://via.placeholder.com/40",
			name: "Harry Marvin",
			role: "Teacher",
			records: {
				January: {
					week1: ["P", "P", "P", "P", "P", "A", "S"],
					week2: ["M", "T", "W", "T", "F", "S", "S"],
				},
			},
		},
	];

	useEffect(() => {
		setRecords(sampleData);
		setFilteredRecords(sampleData); // Initialize filteredRecords with all records
	}, []);

	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredRecords(records); // Show all records when the search query is empty
		} else {
			filterRecords();
		}
	}, [searchQuery, records]);

	const filterRecords = () => {
		const filtered = records.filter((record) =>
			record.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredRecords(filtered);
	};

	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredRecords.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	return (
		<div className="employee-attendance-screen">
			<aside>
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>

				<select name="date" id="date">
					<option value="2024">2024</option>
					<option value="2023">2023</option>
					<option value="2022">2022</option>
					<option value="2021">2021</option>
				</select>
			</aside>
			<main>
				<header>
					<p>
						Employees: <span>{records.length}</span>
					</p>
					<div className="legend">
						<span className="legend-item">
							<span className="dot present"></span> P 55%
						</span>
						<span className="legend-item">
							<span className="dot absent"></span> A 50%
						</span>
						<span className="legend-item">
							<span className="dot late"></span> L 20%
						</span>
					</div>
				</header>
				{filteredRecords.length > 0 ? (
					<div className="attendance-table">
						<table>
							<thead>
								<tr>
									<th>Photo</th>
									<th>Employee Name</th>
									<th>Role</th>
									<th>January Week 1</th>
									<th>January Week 2</th>
								</tr>
							</thead>
							<tbody>
								{currentItems.map((record) => (
									<tr key={record.id}>
										<td>
											<img
												src={record.photo}
												alt={record.name}
												className="employee-photo"
											/>
										</td>
										<td>{record.name}</td>
										<td>{record.role}</td>
										{Object.keys(
											record.records.January
										).map((week) => (
											<td key={week}>
												<div className="attendance-row">
													{record.records.January[
														week
													].map((status, index) => (
														<span
															key={index}
															className={`attendance-status ${
																status === "P"
																	? "present"
																	: status ===
																	  "A"
																	? "absent"
																	: status ===
																	  "L"
																	? "late"
																	: "neutral"
															}`}
														>
															{status}
														</span>
													))}
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						<div className="pagination">
							<button
								disabled={currentPage === 1}
								onClick={() =>
									setCurrentPage((prev) => prev - 1)
								}
							>
								Previous
							</button>
							<button
								disabled={
									indexOfLastItem >= filteredRecords.length
								}
								onClick={() =>
									setCurrentPage((prev) => prev + 1)
								}
							>
								Next
							</button>
						</div>
					</div>
				) : (
					<p>No records found</p>
				)}
			</main>
		</div>
	);
};

export default EmployeeAttendance;
