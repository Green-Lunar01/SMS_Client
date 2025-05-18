import React, { useState, useEffect, useContext } from "react";
import "./ExamResults.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import noReport from "../../../../assets/no-report.png";
import pdfIcon from "../../../../assets/pdf-icon.png";
import xlsIcon from "../../../../assets/xls-icon.png";
import csvIcon from "../../../../assets/csv-icon.png";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";
import Spinner from "../../../../components/Spinner/Spinner";

const ExamResults = () => {
	const [tab, setTab] = useState("one");
	const [searchQuery, setSearchQuery] = useState("");
	const { subjects, classes, sessions } = useContext(SchoolContext);

	const [selectedClassId, setSelectedClassId] = useState("");
	const [selectedSubjectId, setSelectedSubjectId] = useState("");
	const [examResults, setExamResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// For filtering the results
	const [selectedTerm, setSelectedTerm] = useState("all");
	const [selectedSession, setSelectedSession] = useState("all");
	const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");

	const fetchExamsResults = async () => {
		if (!selectedClassId || !selectedSubjectId) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await api.get(
				`/school-exam/${selectedClassId}/${selectedSubjectId}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			if (response.data.status) {
				setExamResults(response.data.data.tests || []);
				if ((response.data.data.tests || []).length === 0) {
					toast.error(
						"No exam results found for the selected class and subject",
					);
				} else {
					setTab("two");
				}
			} else {
				setError(
					response.data.message || "Failed to fetch exam results",
				);
				toast.error(
					response.data.message || "Failed to fetch exam results",
				);
			}
		} catch (error) {
			console.error("Error fetching exam results:", error);
			setError(
				error.response?.data?.message || "Error fetching exam results",
			);
			toast.error(
				error.response?.data?.message || "Error fetching exam results",
			);
		} finally {
			setLoading(false);
		}
	};

	// Format date from ISO string to DD/MM/YYYY
	const formatDate = (isoString) => {
		if (!isoString) return "-";
		const date = new Date(isoString);
		return date.toLocaleDateString("en-GB");
	};

	// Get unique terms from results
	const getUniqueTerms = () => {
		const terms = [...new Set(examResults.map((item) => item.term))];
		return terms.sort((a, b) => a - b);
	};

	// Get unique sessions from results
	const getUniqueSessions = () => {
		const sessions = [
			...new Set(examResults.map((item) => item.session_name)),
		];
		return sessions;
	};

	// Apply filters and search
	const filteredData = examResults.filter((item) => {
		// Apply term filter
		if (selectedTerm !== "all" && item.term !== parseInt(selectedTerm)) {
			return false;
		}

		// Apply session filter
		if (
			selectedSession !== "all" &&
			item.session_name !== selectedSession
		) {
			return false;
		}

		// Apply search query
		if (searchQuery) {
			return (
				item.student_name
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				item.matric_number
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				item.class_name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
		}

		return true;
	});

	// Export functions
	const exportToPDF = () => {
		toast.success("Export to PDF feature will be implemented soon");
	};

	const exportToExcel = () => {
		toast.success("Export to Excel feature will be implemented soon");
	};

	const exportToCSV = () => {
		toast.success("Export to CSV feature will be implemented soon");
	};

	// Calculate the average score
	const averageScore =
		filteredData.length > 0
			? (
					filteredData.reduce((sum, item) => sum + item.score, 0) /
					filteredData.length
				).toFixed(2)
			: 0;

	// Calculate highest score
	const highestScore =
		filteredData.length > 0
			? Math.max(...filteredData.map((item) => item.score))
			: 0;

	// Calculate lowest score
	const lowestScore =
		filteredData.length > 0
			? Math.min(...filteredData.map((item) => item.score))
			: 0;

	return (
		<div className="exam-results">
			{tab === "one" && (
				<div className="search-exam-results-form">
					<div className="form-group">
						<label htmlFor="class">Select Class</label>
						<select
							name="class"
							id="class"
							value={selectedClassId}
							onChange={(e) => setSelectedClassId(e.target.value)}
						>
							<option value="">Select Class</option>
							{classes.map((classItem) => (
								<option key={classItem.id} value={classItem.id}>
									{classItem.class_name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="examSubject">Select Exam Subject</label>
						<select
							name="examSubject"
							id="examSubject"
							value={selectedSubjectId}
							onChange={(e) =>
								setSelectedSubjectId(e.target.value)
							}
						>
							<option value="">Select Subject</option>
							{subjects.map((subject) => (
								<option key={subject.id} value={subject.id}>
									{subject.subject_name}
								</option>
							))}
						</select>
					</div>

					<button
						className="primary-btn"
						onClick={fetchExamsResults}
						disabled={
							loading || !selectedClassId || !selectedSubjectId
						}
					>
						{loading ? "Searching..." : "Search"}
					</button>
				</div>
			)}

			{tab === "two" && (
				<div className="exam-results-table">
					<section className="mid">
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
						/>

						<aside>
							<select
								name="term"
								id="term"
								value={selectedTerm}
								onChange={(e) =>
									setSelectedTerm(e.target.value)
								}
							>
								<option value="all">All Terms</option>
								{getUniqueTerms().map((term) => (
									<option key={term} value={term}>
										Term {term}
									</option>
								))}
							</select>

							<select
								name="session"
								id="session"
								value={selectedSession}
								onChange={(e) =>
									setSelectedSession(e.target.value)
								}
							>
								<option value="all">All Sessions</option>
								{getUniqueSessions().map((session) => (
									<option key={session} value={session}>
										{session}
									</option>
								))}
							</select>

							<div onClick={exportToPDF} title="Export to PDF">
								<img src={pdfIcon} alt="Export to PDF" />
							</div>
							<div
								onClick={exportToExcel}
								title="Export to Excel"
							>
								<img src={xlsIcon} alt="Export to Excel" />
							</div>
							<div onClick={exportToCSV} title="Export to CSV">
								<img src={csvIcon} alt="Export to CSV" />
							</div>
						</aside>
					</section>

					<div className="exam-summary">
						<div className="summary-item">
							<span>Average Score:</span> {averageScore}
						</div>
						<div className="summary-item">
							<span>Highest Score:</span> {highestScore}
						</div>
						<div className="summary-item">
							<span>Lowest Score:</span> {lowestScore}
						</div>
						<div className="summary-item">
							<span>Total Students:</span> {filteredData.length}
						</div>
					</div>

					{loading ? (
						<div className="loading-container">
							<Spinner />
						</div>
					) : filteredData.length === 0 ? (
						<div className="no-results">
							<img src={noReport} alt="No results found" />
							<p>
								No exam results found. Try changing your filters
								or search criteria.
							</p>
							<button
								className="primary-btn"
								onClick={() => setTab("one")}
							>
								Go Back
							</button>
						</div>
					) : (
						<>
							<table>
								<thead>
									<tr>
										<th>Exam Date</th>
										<th>Name</th>
										<th>Matric Number</th>
										<th>Session</th>
										<th>Class</th>
										<th>Term</th>
										<th>Subject</th>
										<th>Total Marks</th>
										<th>Marks Obtained</th>
										<th>Percentage (%)</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.map((item, index) => (
										<tr
											key={`${item.matric_number}-${index}`}
										>
											<td>
												{formatDate(item.exam_date)}
											</td>
											<td>{item.student_name}</td>
											<td>{item.matric_number}</td>
											<td>{item.session_name}</td>
											<td>{item.class_name}</td>
											<td>Term {item.term}</td>
											<td>{item.subject_name}</td>
											<td>{item.total_mark}</td>
											<td>{item.score}</td>
											<td>
												{(
													(item.score /
														item.total_mark) *
													100
												).toFixed(2)}
												%
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<div className="button-container">
								<button
									className="secondary-btn"
									onClick={() => setTab("one")}
								>
									New Search
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ExamResults;
