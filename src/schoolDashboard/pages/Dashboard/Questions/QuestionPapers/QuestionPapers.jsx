import React, { useState, useEffect, useContext } from "react";
import "./QuestionPapers.css";
import { TfiDownload } from "react-icons/tfi";
import { RiEdit2Line } from "react-icons/ri";
import { SchoolContext } from "../../../../context/schoolContext";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import html2pdf from "html2pdf.js";

const QuestionPapers = () => {
	// Form state
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedTerm, setSelectedTerm] = useState("");
	const [sessionId, setSessionId] = useState("");

	// Data state
	const [loading, setLoading] = useState(false);
	const [examData, setExamData] = useState(null);
	const [sessions, setSessions] = useState([]);

	// Get context data
	const { subjects, classes } = useContext(SchoolContext);

	// Fetch sessions when component mounts
	useEffect(() => {
		fetchSessions();
	}, []);

	// Fetch sessions
	const fetchSessions = async () => {
		try {
			const response = await api.get("/school/academic-sessions", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			setSessions(response.data.data || []);
		} catch (error) {
			console.error("Error fetching sessions:", error);
			toast.error("Error fetching sessions");
		}
	};

	// Handle search
	const handleSearch = async () => {
		if (!selectedClass || !selectedSubject) {
			toast.error("Please select both subject and class");
			return;
		}

		setLoading(true);
		setExamData(null);

		try {
			const params = new URLSearchParams();
			if (selectedTerm) params.append("term", selectedTerm);
			if (sessionId) params.append("sessionId", sessionId);

			const response = await api.get(
				`/school-exam/questions/${selectedClass}/${selectedSubject}?${params.toString()}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			setExamData(response.data.data);
		} catch (error) {
			console.error("Error fetching exam questions:", error);
			if (error.response?.status === 404) {
				toast.error(
					"No exam questions found for the selected criteria",
				);
			} else {
				toast.error("Error fetching exam questions");
			}
		} finally {
			setLoading(false);
		}
	};

	// Format duration to hours:minutes
	const formatDuration = (minutes) => {
		if (!minutes) return "N/A";

		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;

		if (hours > 0) {
			return `${hours}:${mins.toString().padStart(2, "0")} hrs`;
		} else {
			return `${mins} mins`;
		}
	};

	// Handle download as PDF
	const handleDownload = () => {
		if (!examData) {
			toast.error("No exam data to download");
			return;
		}

		const examPaper = document.getElementById("exam-paper");
		if (!examPaper) {
			toast.error("Could not generate PDF");
			return;
		}

		const title = `${examData.subject_name}_${examData.class_name}_Term${examData.term}_${examData.session_name}`;
		const options = {
			margin: 10,
			filename: `${title}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};

		html2pdf().set(options).from(examPaper).save();
		toast.success("Downloading exam paper");
	};

	return (
		<div className="question-papers">
			<section className="top">
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="subject">Select Subject*</label>
						<select
							name="subject"
							id="subject"
							value={selectedSubject}
							onChange={(e) => setSelectedSubject(e.target.value)}
							required
						>
							<option value="">Select Subject</option>
							{subjects.map((subject) => (
								<option key={subject.id} value={subject.id}>
									{subject.subject_name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="class">Class*</label>
						<select
							name="class"
							id="class"
							value={selectedClass}
							onChange={(e) => setSelectedClass(e.target.value)}
							required
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
						<label htmlFor="term">Term</label>
						<select
							name="term"
							id="term"
							value={selectedTerm}
							onChange={(e) => setSelectedTerm(e.target.value)}
						>
							<option value="">All Terms</option>
							<option value="1">Term 1</option>
							<option value="2">Term 2</option>
							<option value="3">Term 3</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="session">Session</label>
						<select
							name="session"
							id="session"
							value={sessionId}
							onChange={(e) => setSessionId(e.target.value)}
						>
							<option value="">All Sessions</option>
							{sessions.map((session) => (
								<option key={session.id} value={session.id}>
									{session.session_name}
								</option>
							))}
						</select>
					</div>

					<button
						className="primary-btn"
						onClick={handleSearch}
						disabled={loading}
					>
						{loading ? "Searching..." : "Search"}
					</button>
				</div>
				<button
					className="download-btn"
					onClick={handleDownload}
					disabled={!examData || loading}
				>
					<TfiDownload />
					<span>Download</span>
				</button>
			</section>

			<section className="bottom">
				{loading ? (
					<div className="loading-container">
						<Spinner />
					</div>
				) : examData ? (
					<>
						<span>
							<RiEdit2Line />
						</span>
						<main id="exam-paper">
							<header>
								<h2>{`${examData.subject_name} ${examData.class_name} ${examData.term ? `Term ${examData.term}` : ""} ${examData.session_name || ""}`}</h2>
								<p>
									Duration:{" "}
									{formatDuration(examData.duration)}
								</p>
							</header>
							<section className="questions-list">
								{examData.questions.map((question, index) => (
									<div key={index} className="question-item">
										<p className="question-text">
											<span className="question-number">
												{index + 1}.
											</span>{" "}
											{question.question}
										</p>

										{question.question_type ===
											"multiple_choice" && (
											<div className="options-list">
												{question.options.map(
													(option, optIndex) => (
														<p
															key={optIndex}
															className="option"
														>
															<span>
																{String.fromCharCode(
																	65 +
																		optIndex,
																)}
																.
															</span>{" "}
															{option}
														</p>
													),
												)}
											</div>
										)}
									</div>
								))}
							</section>
						</main>
					</>
				) : (
					<div className="no-data">
						<p>Select subject and class to view exam questions</p>
					</div>
				)}
			</section>
		</div>
	);
};

export default QuestionPapers;
