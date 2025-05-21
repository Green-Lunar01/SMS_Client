import React, { useState, useEffect, useContext } from "react";
import "./MarkAttendance.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SchoolContext } from "../../../../context/schoolContext";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import userPng from "../../../../assets/user.png";

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

const MarkAttendance = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { employees } = useContext(SchoolContext);
	const [activeSession, setActiveSession] = useState(null);
	const [selectedDate, setSelectedDate] = useState("");
	const [term, setTerm] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [employeeRecords, setEmployeeRecords] = useState([]);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		toast("Please select a term to mark attendance!");
	}, []);

	// Initialize the session from localStorage
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

		// Initialize with current date
		const today = new Date().toISOString().split("T")[0];
		setSelectedDate(today);
	}, []);

	// Initialize employee records when employees are loaded
	useEffect(() => {
		if (employees && employees.length > 0) {
			const records = employees.map((employee) => ({
				id: employee.id,
				name: `${employee.first_name} ${employee.surname}`,
				type: employee.role,
				photo: employee.profile_photo,
				status: "", // Default status
			}));
			setEmployeeRecords(records);
			setFilteredRecords(records);
		}
	}, [employees]);

	// Filter employees based on search query
	useEffect(() => {
		if (employeeRecords.length > 0) {
			const filtered = employeeRecords.filter(
				(record) =>
					record.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					record.type
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
			setFilteredRecords(filtered);
			setCurrentPage(1);
		}
	}, [searchQuery, employeeRecords]);

	// Change status of a single employee
	const handleStatusChange = (id, newStatus) => {
		setEmployeeRecords((prevRecords) =>
			prevRecords.map((record) =>
				record.id === id ? { ...record, status: newStatus } : record,
			),
		);
	};

	// Mark attendance for a single employee
	const markSingleAttendance = async (staffId, status) => {
		if (!activeSession || !selectedDate || !term) {
			toast.error("Session ID, date, and term are required");
			return;
		}

		try {
			const response = await api.post(
				`/school/staff-attendance/mark/${staffId}`,
				{
					sessionId: activeSession.id,
					term: parseInt(term),
					date: selectedDate,
					record: parseInt(
						status === "present" ? 1 : status === "absent" ? 0 : 2,
					),
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success(`Attendance marked for staff ID: ${staffId}`);
			return true;
		} catch (error) {
			console.error("Error marking attendance:", error);
			toast.error(
				error.response?.data?.message || "Error marking attendance",
			);
			return false;
		}
	};

	// Submit attendance for all employees
	const submitAllAttendance = async () => {
		if (!activeSession || !selectedDate || !term) {
			toast.error("Session ID, date, and term are required");
			return;
		}

		setSubmitting(true);

		try {
			// Prepare records for API submission
			const records = employeeRecords.map((record) => ({
				staff_id: record.id,
				status:
					record.status === "present"
						? 1
						: record.status === "absent"
							? 0
							: 2,
			}));

			const response = await api.post(
				"/school/staff-attendance/mark-all",
				{
					sessionId: activeSession.id,
					term: parseInt(term),
					date: selectedDate,
					records: records,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Attendance marked for all staff successfully");
		} catch (error) {
			console.error("Error marking attendance for all staff:", error);
			toast.error(
				error.response?.data?.message || "Error marking attendance",
			);
		} finally {
			setSubmitting(false);
		}
	};

	// Handle date change
	const handleDateChange = (e) => {
		setSelectedDate(e.target.value);
	};

	// Pagination settings
	const itemsPerPage = 5;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredRecords.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);

	// Calculate attendance statistics
	const totalLeaves = filteredRecords.filter(
		(record) => record.status === "leave",
	).length;
	const totalAbsent = filteredRecords.filter(
		(record) => record.status === "absent",
	).length;
	const totalPresent = filteredRecords.filter(
		(record) => record.status === "present",
	).length;

	// Status code mapping
	const getStatusCode = (status) => {
		return status === "present" ? 1 : status === "absent" ? 0 : 2;
	};

	return (
		<div className="mark-attendance-screen">
			<aside>
				<input
					type="date"
					id="date"
					value={selectedDate}
					onChange={handleDateChange}
				/>

				<select
					name="term"
					id="term"
					value={term}
					onChange={(e) => setTerm(e.target.value)}
					className="term-select"
				>
					<option value="">Select Term</option>
					<option value="1">Term 1</option>
					<option value="2">Term 2</option>
					<option value="3">Term 3</option>
				</select>

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
				) : filteredRecords.length > 0 ? (
					<div className="record-table">
						<article>
							<p>
								Employees: <span>{filteredRecords.length}</span>
							</p>

							<span>
								<div>
									<span
										style={{ backgroundColor: "#FFBC04" }}
									>
										L
									</span>
									<p>
										{totalLeaves} (
										{filteredRecords.length > 0
											? `${((totalLeaves / filteredRecords.length) * 100).toFixed(1)}%`
											: "0%"}
										)
									</p>
								</div>
								<div>
									<span
										style={{ backgroundColor: "#13A541" }}
									>
										P
									</span>
									<p>
										{totalPresent} (
										{filteredRecords.length > 0
											? `${((totalPresent / filteredRecords.length) * 100).toFixed(1)}%`
											: "0%"}
										)
									</p>
								</div>
								<div>
									<span
										style={{ backgroundColor: "#FF3D3D" }}
									>
										A
									</span>
									<p>
										{totalAbsent} (
										{filteredRecords.length > 0
											? `${((totalAbsent / filteredRecords.length) * 100).toFixed(1)}%`
											: "0%"}
										)
									</p>
								</div>
							</span>
						</article>
						<table>
							<thead>
								<tr>
									<th>Photo</th>
									<th>Employee Name</th>
									<th>Employee Type</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{currentItems.map((record) => (
									<tr key={record.id}>
										<td>
											<img
												src={record.photo || userPng}
												alt={record.name}
												style={{
													width: "40px",
													height: "40px",
													borderRadius: "50%",
												}}
												onError={(e) => {
													e.target.src = userPng;
												}}
											/>
										</td>
										<td>{record.name}</td>
										<td>{record.type}</td>
										<td className="status">
											<button
												style={{
													backgroundColor:
														record.status ===
														"present"
															? "#13A541"
															: "#FFF",
													color:
														record.status ===
														"present"
															? "#FFF"
															: "#000",
												}}
												onClick={() =>
													handleStatusChange(
														record.id,
														"present",
													)
												}
											>
												P
											</button>
											<button
												style={{
													backgroundColor:
														record.status ===
														"absent"
															? "#FF3D3D"
															: "#FFF",
													color:
														record.status ===
														"absent"
															? "#FFF"
															: "#000",
												}}
												onClick={() =>
													handleStatusChange(
														record.id,
														"absent",
													)
												}
											>
												A
											</button>
											<button
												style={{
													backgroundColor:
														record.status ===
														"leave"
															? "#FFBC04"
															: "#FFF",
													color:
														record.status ===
														"leave"
															? "#FFF"
															: "#000",
												}}
												onClick={() =>
													handleStatusChange(
														record.id,
														"leave",
													)
												}
											>
												L
											</button>
										</td>
										<td>
											<button
												className="mark-single-btn"
												onClick={() =>
													markSingleAttendance(
														record.id,
														record.status,
													)
												}
												disabled={
													!selectedDate ||
													!term ||
													!activeSession
												}
											>
												Mark
											</button>
										</td>
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
						<button
							className="primary-btn"
							onClick={submitAllAttendance}
							disabled={
								submitting ||
								!selectedDate ||
								!term ||
								!activeSession
							}
						>
							{submitting ? "Submitting..." : "Submit All"}
						</button>
					</div>
				) : (
					<div className="no-records">
						{/* SVG and no records message */}
						<p>No records found.</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default MarkAttendance;
