import React, { useState, useEffect, useCallback } from "react";
import "./EmployeeAttendance.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import userPng from "../../../../assets/user.png";

const EmployeeAttendance = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [allRecords, setAllRecords] = useState([]); // Store all fetched records
	const [displayRecords, setDisplayRecords] = useState([]); // Records after filtering
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [activeSession, setActiveSession] = useState(null);

	const [selectedMonth, setSelectedMonth] = useState("");
	const [selectedYear, setSelectedYear] = useState("");
	const [statistics, setStatistics] = useState({
		present: 0,
		absent: 0,
		late: 0,
		total: 0,
	});

	// Get the session data from context or localStorage
	useEffect(() => {
		try {
			const sessionData = localStorage.getItem("sms_school_session");
			if (sessionData) {
				const parsedSession = JSON.parse(sessionData);
				setActiveSession(parsedSession);
			}
		} catch (error) {
			console.error("Error parsing session data:", error);
		}

		// Initialize month and year
		const currentDate = new Date();
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		setSelectedMonth(monthNames[currentDate.getMonth()]);
		setSelectedYear(currentDate.getFullYear().toString());
	}, []);

	// Helper function to get week of month (memoized to prevent recreating on each render)
	const getWeekOfMonth = useCallback((date) => {
		const firstDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			1,
		).getDay();
		return Math.ceil((date.getDate() + firstDay) / 7);
	}, []);

	// Fetch attendance records when session is set - ONLY once when session changes
	useEffect(() => {
		const fetchAttendanceRecords = async () => {
			if (!activeSession || !activeSession.id) return;

			setLoading(true);
			try {
				const response = await api.get(
					`/school/staff-attendance/all/${activeSession.id}`,
					{
						headers: {
							Authorization: `${localStorage.getItem("sms_token")}`,
						},
					},
				);
				console.log(response.data);
				// Process the attendance data
				const staffData = response.data.data || [];

				if (staffData.length === 0) {
					toast.info("No attendance records found for this session");
					setAllRecords([]);
					setLoading(false);
					return;
				}

				// Transform the API data into the format needed for display
				const formattedData = staffData.map((staff) => {
					// Group attendance by month and week
					const attendanceByMonth = {};

					if (staff.attendance && staff.attendance.length > 0) {
						staff.attendance.forEach((record) => {
							const date = new Date(record.date);
							const monthName = date.toLocaleString("default", {
								month: "long",
							});
							const weekOfMonth = getWeekOfMonth(date);
							const weekKey = `week${weekOfMonth}`;

							if (!attendanceByMonth[monthName]) {
								attendanceByMonth[monthName] = {};
							}

							if (!attendanceByMonth[monthName][weekKey]) {
								attendanceByMonth[monthName][weekKey] =
									Array(7).fill("-");
							}

							// Get day of week (0-6)
							const dayOfWeek = date.getDay();

							// Map status codes to letters
							let status;
							if (record.status === "present")
								status = "P"; // Present
							else if (record.status === "absent")
								status = "A"; // Absent
							else if (
								record.status === "late" ||
								record.status === "leave"
							)
								status = "L"; // Late/Leave
							else status = "-";

							attendanceByMonth[monthName][weekKey][dayOfWeek] =
								status;
						});
					}

					return {
						id: staff.id,
						photo: staff.profile_photo || userPng, // FIX: Use a local fallback image instead of external placeholder
						name:
							staff.name ||
							`${staff.first_name || ""} ${staff.surname || ""}`,
						role: staff.role || "Staff",
						records: attendanceByMonth,
					};
				});

				setAllRecords(formattedData);
			} catch (error) {
				console.error("Error fetching attendance records:", error);
				toast.error(
					error.response?.data?.message ||
						"Error fetching attendance records",
				);
				setAllRecords([]);
			} finally {
				setLoading(false);
			}
		};

		fetchAttendanceRecords();
	}, [activeSession, getWeekOfMonth]);

	// FIX: Move calculateStatistics to outside the render cycle and memoize properly
	const calculateStatistics = useCallback(
		(records) => {
			let presentCount = 0;
			let absentCount = 0;
			let lateCount = 0;
			let totalCount = 0;

			records.forEach((record) => {
				if (record.records[selectedMonth]) {
					Object.keys(record.records[selectedMonth]).forEach(
						(week) => {
							record.records[selectedMonth][week].forEach(
								(status) => {
									if (status === "P") presentCount++;
									else if (status === "A") absentCount++;
									else if (status === "L") lateCount++;

									if (status !== "-") totalCount++;
								},
							);
						},
					);
				}
			});

			setStatistics({
				present:
					totalCount > 0
						? ((presentCount / totalCount) * 100).toFixed(1)
						: 0,
				absent:
					totalCount > 0
						? ((absentCount / totalCount) * 100).toFixed(1)
						: 0,
				late:
					totalCount > 0
						? ((lateCount / totalCount) * 100).toFixed(1)
						: 0,
				total: totalCount,
			});
		},
		[selectedMonth], // FIX: only depend on selectedMonth
	);

	// Apply filters whenever records, search, month or year changes
	// FIX: Separated statistics calculation to avoid dependency cycle
	useEffect(() => {
		// Skip processing if no records
		if (allRecords.length === 0) {
			setDisplayRecords([]);
			setStatistics({
				present: 0,
				absent: 0,
				late: 0,
				total: 0,
			});
			return;
		}

		// First apply search filter
		let filtered = [...allRecords];

		if (searchQuery.trim() !== "") {
			filtered = filtered.filter(
				(record) =>
					record.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					record.role
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
		}

		setDisplayRecords(filtered);

		// FIX: Calculate statistics in a separate effect to break the dependency cycle
	}, [allRecords, searchQuery]);

	// FIX: Separate effect for statistics calculation
	useEffect(() => {
		if (displayRecords.length > 0) {
			calculateStatistics(displayRecords);
		}
		// Reset to page 1 when filter changes
		setCurrentPage(1);
	}, [displayRecords, selectedMonth, calculateStatistics]);

	// Handle month or year change
	const handlePeriodChange = (e) => {
		if (e.target.name === "month") {
			setSelectedMonth(e.target.value);
		} else if (e.target.name === "year") {
			setSelectedYear(e.target.value);
		}
	};

	// Get weeks for the selected month
	const getWeeksForSelectedMonth = useCallback(
		(record) => {
			if (!record.records[selectedMonth]) {
				return [];
			}

			return Object.keys(record.records[selectedMonth]).sort((a, b) => {
				return (
					parseInt(a.replace("week", "")) -
					parseInt(b.replace("week", ""))
				);
			});
		},
		[selectedMonth],
	);

	// Create array of years for dropdown (current year and 4 years back)
	const getYearOptions = useCallback(() => {
		const currentYear = new Date().getFullYear();
		const years = [];
		for (let i = 0; i < 5; i++) {
			years.push(currentYear - i);
		}
		return years;
	}, []);

	// Create array of month names
	const getMonths = useCallback(() => {
		return [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
	}, []);

	// Pagination settings
	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = displayRecords.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);
	const totalPages = Math.ceil(displayRecords.length / itemsPerPage);

	return (
		<div className="employee-attendance-screen">
			<aside>
				<div className="filter-controls">
					<select
						name="month"
						id="month"
						value={selectedMonth}
						onChange={handlePeriodChange}
					>
						{getMonths().map((month) => (
							<option key={month} value={month}>
								{month}
							</option>
						))}
					</select>

					<select
						name="year"
						id="year"
						value={selectedYear}
						onChange={handlePeriodChange}
					>
						{getYearOptions().map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</aside>

			<main>
				{loading ? (
					<div className="loading-container">
						<Spinner />
					</div>
				) : (
					<>
						<header>
							<p>
								Employees: <span>{displayRecords.length}</span>
							</p>
							<div className="legend">
								<span className="legend-item">
									<span className="dot present"></span> P{" "}
									{statistics.present}%
								</span>
								<span className="legend-item">
									<span className="dot absent"></span> A{" "}
									{statistics.absent}%
								</span>
								<span className="legend-item">
									<span className="dot late"></span> L{" "}
									{statistics.late}%
								</span>
							</div>
						</header>

						{displayRecords.length > 0 ? (
							<div className="attendance-table">
								<table>
									<thead>
										<tr>
											<th>Photo</th>
											<th>Employee Name</th>
											<th>Role</th>
											{currentItems.length > 0 &&
												currentItems[0].records[
													selectedMonth
												] &&
												getWeeksForSelectedMonth(
													currentItems[0],
												).map((week) => (
													<th key={week}>
														{selectedMonth}{" "}
														{week.replace(
															"week",
															"Week ",
														)}
													</th>
												))}
											{(!currentItems.length ||
												!currentItems[0].records[
													selectedMonth
												]) && <th>No Data</th>}
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
														onError={(e) => {
															e.target.src =
																userPng;
														}}
													/>
												</td>
												<td>{record.name}</td>
												<td>{record.role}</td>
												{record.records[
													selectedMonth
												] ? (
													getWeeksForSelectedMonth(
														record,
													).map((week) => (
														<td key={week}>
															<div className="attendance-row">
																{record.records[
																	selectedMonth
																][week].map(
																	(
																		status,
																		index,
																	) => (
																		<span
																			key={
																				index
																			}
																			className={`attendance-status ${
																				status ===
																				"P"
																					? "present"
																					: status ===
																						  "A"
																						? "absent"
																						: status ===
																							  "L"
																							? "late"
																							: "neutral"
																			}`}
																			title={
																				[
																					"Sunday",
																					"Monday",
																					"Tuesday",
																					"Wednesday",
																					"Thursday",
																					"Friday",
																					"Saturday",
																				][
																					index
																				]
																			}
																		>
																			{
																				status
																			}
																		</span>
																	),
																)}
															</div>
														</td>
													))
												) : (
													<td>
														No attendance records
													</td>
												)}
											</tr>
										))}
									</tbody>
								</table>

								{totalPages > 1 && (
									<div className="pagination">
										<button
											disabled={currentPage === 1}
											onClick={() =>
												setCurrentPage(
													(prev) => prev - 1,
												)
											}
										>
											Previous
										</button>
										<span>
											Page {currentPage} of {totalPages}
										</span>
										<button
											disabled={
												currentPage === totalPages
											}
											onClick={() =>
												setCurrentPage(
													(prev) => prev + 1,
												)
											}
										>
											Next
										</button>
									</div>
								)}
							</div>
						) : (
							<div className="no-records">
								<p>
									No attendance records found for this period
								</p>
								{activeSession && activeSession.id ? (
									<p>
										Try selecting a different month or year
									</p>
								) : (
									<p>No active session found</p>
								)}
							</div>
						)}
					</>
				)}
			</main>
		</div>
	);
};

export default EmployeeAttendance;
