import React, { useState, useEffect, useContext } from "react";
import "./Questions.css";
import { LuPlus } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import Modal from "../../../components/Modal/Modal";
import QuestionPapers from "./QuestionPapers/QuestionPapers";
import api from "../../../lib/axios";
import { SchoolContext } from "../../../context/schoolContext";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

const Questions = () => {
	const [tab, setTab] = useState("one");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [questions, setQuestions] = useState([
		{
			type: "multiple_choice",
			options: ["", "", "", ""],
			answer: "",
			question: "",
		},
	]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	// Form fields
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedTerm, setSelectedTerm] = useState("");
	const [selectedSession, setSelectedSession] = useState("");
	const [examDuration, setExamDuration] = useState(60); // Default 60 minutes

	const { subjects, classes } = useContext(SchoolContext);
	const [sessions, setSessions] = useState([]);
	const [activeSession, setActiveSession] = useState(null);

	// Initialize the session from localStorage
	useEffect(() => {
		try {
			const sessionData = localStorage.getItem("sms_school_session");
			if (sessionData) {
				const parsedSession = JSON.parse(sessionData);
				setActiveSession(parsedSession);
				setSelectedSession(parsedSession.id);
			}
		} catch (error) {
			console.error("Error parsing session data:", error);
		}
	}, []);

	// Fetch all academic sessions
	const fetchSessions = async () => {
		setLoading(true);
		try {
			const response = await api.get("/school/academic-sessions", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			setSessions(response.data.data);
		} catch (error) {
			console.error("Error fetching sessions:", error);
			toast.error("Error fetching sessions");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSessions();
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		// Reset the form
		setQuestions([
			{
				type: "multiple_choice",
				options: ["", "", "", ""],
				answer: "",
				question: "",
			},
		]);
		setSelectedSubject("");
		setSelectedClass("");
		setSelectedTerm("");
		setExamDuration(60);
	};

	const addQuestion = () => {
		setQuestions([
			...questions,
			{
				type: "multiple_choice",
				options: ["", "", "", ""],
				answer: "",
				question: "",
			},
		]);
	};

	const removeQuestion = (index) => {
		const updatedQuestions = questions.filter(
			(_, qIndex) => qIndex !== index,
		);
		setQuestions(updatedQuestions);
	};

	const updateQuestion = (index, field, value) => {
		const updatedQuestions = [...questions];
		if (field === "type") {
			// Convert UI terms to API terms
			let apiType = value;
			if (value === "Multiple choice") apiType = "multiple_choice";
			if (value === "True/False") apiType = "true_false";
			if (value === "Essay") apiType = "essay";
			if (value === "Completion") apiType = "completion";

			updatedQuestions[index] = {
				...updatedQuestions[index],
				type: apiType,
				options: apiType === "multiple_choice" ? ["", "", "", ""] : [],
				answer: "",
			};
		} else {
			updatedQuestions[index][field] = value;
		}
		setQuestions(updatedQuestions);
	};

	const updateOption = (qIndex, optIndex, value) => {
		const updatedQuestions = [...questions];
		updatedQuestions[qIndex].options[optIndex] = value;
		setQuestions(updatedQuestions);
	};

	const addOption = (index) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index].options.push("");
		setQuestions(updatedQuestions);
	};

	const removeOption = (qIndex, optIndex) => {
		const updatedQuestions = [...questions];
		updatedQuestions[qIndex].options = updatedQuestions[
			qIndex
		].options.filter((_, oIndex) => oIndex !== optIndex);
		setQuestions(updatedQuestions);
	};

	// Convert duration from hour:minute format to total minutes
	const convertDurationToMinutes = (timeString) => {
		if (!timeString) return 60; // Default to 60 minutes

		const [hours, minutes] = timeString.split(":").map(Number);
		return hours * 60 + minutes;
	};

	// Handle time input change
	const handleDurationChange = (e) => {
		setExamDuration(convertDurationToMinutes(e.target.value));
	};

	// Validate a question before submission
	const validateQuestion = (question, index) => {
		if (!question.question.trim()) {
			toast.error(`Question ${index + 1}: Question text is required`);
			return false;
		}

		if (!question.type) {
			toast.error(`Question ${index + 1}: Question type is required`);
			return false;
		}

		if (question.type === "multiple_choice") {
			// Check if at least two options are provided
			const validOptions = question.options.filter(
				(opt) => opt.trim() !== "",
			);
			if (validOptions.length < 2) {
				toast.error(
					`Question ${index + 1}: Multiple choice questions require at least 2 options`,
				);
				return false;
			}

			// Check if the answer is one of the options
			if (!question.answer.trim()) {
				toast.error(`Question ${index + 1}: Answer is required`);
				return false;
			}

			if (!question.options.includes(question.answer)) {
				toast.error(
					`Question ${index + 1}: Answer must be one of the options`,
				);
				return false;
			}
		}

		if (question.type === "true_false") {
			if (question.answer !== "true" && question.answer !== "false") {
				toast.error(
					`Question ${index + 1}: Answer must be 'true' or 'false'`,
				);
				return false;
			}
		}

		return true;
	};

	const handleSubmit = async () => {
		// Validate required fields
		if (!selectedSubject) {
			toast.error("Please select a subject");
			return;
		}

		if (!selectedClass) {
			toast.error("Please select a class");
			return;
		}

		if (!selectedTerm) {
			toast.error("Please select a term");
			return;
		}

		if (!selectedSession) {
			toast.error("Please select a session");
			return;
		}

		// Validate all questions
		for (let i = 0; i < questions.length; i++) {
			if (!validateQuestion(questions[i], i)) {
				return;
			}
		}

		setSubmitting(true);

		try {
			// Prepare question data array
			const questionData = questions.map((question) => ({
				question: question.question,
				questionType: question.type,
				options:
					question.type === "multiple_choice"
						? question.options.filter((opt) => opt.trim() !== "")
						: [],
				correctAnswer: question.answer,
			}));

			// Create a single request with all questions
			const requestBody = {
				subjectId: parseInt(selectedSubject),
				sessionId: parseInt(selectedSession),
				term: parseInt(selectedTerm),
				classId: parseInt(selectedClass),
				examDuration: examDuration,
				questionData: questionData,
			};

			await api.post("/school-exam/set-questions", requestBody, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			toast.success("Questions saved successfully!");
			closeModal();
		} catch (error) {
			console.error("Error saving questions:", error);
			toast.error(
				error.response?.data?.message || "Error saving questions",
			);
		} finally {
			setSubmitting(false);
		}
	};

	// Convert API type to UI display type
	const getDisplayType = (apiType) => {
		switch (apiType) {
			case "multiple_choice":
				return "Multiple choice";
			case "true_false":
				return "True/False";
			case "essay":
				return "Essay";
			case "completion":
				return "Completion";
			default:
				return apiType;
		}
	};

	return (
		<div className="questions-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Create New
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Question Papers
				</button>
			</aside>

			{tab === "one" && (
				<div className="create-questions">
					<button className="primary-btn" onClick={openModal}>
						<LuPlus />
						<p>Create New Questions</p>
					</button>
				</div>
			)}

			{tab === "two" && <QuestionPapers />}

			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<div className="create-question-modal">
						<aside>
							<h3>Create New Questions</h3>
							<RiCloseLine onClick={closeModal} />
						</aside>
						<main>
							<section className="top">
								<div className="form-group">
									<label htmlFor="subject">
										Select Subject*
									</label>
									<select
										name="subject"
										id="subject"
										value={selectedSubject}
										onChange={(e) =>
											setSelectedSubject(e.target.value)
										}
										required
									>
										<option value="">Select Subject</option>
										{subjects.map((subject) => (
											<option
												key={subject.id}
												value={subject.id}
											>
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
										onChange={(e) =>
											setSelectedClass(e.target.value)
										}
										required
									>
										<option value="">Select Class</option>
										{classes.map((classItem) => (
											<option
												key={classItem.id}
												value={classItem.id}
											>
												{classItem.class_name}
											</option>
										))}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="term">Term*</label>
									<select
										name="term"
										id="term"
										value={selectedTerm}
										onChange={(e) =>
											setSelectedTerm(e.target.value)
										}
										required
									>
										<option value="">Select Term</option>
										<option value="1">Term 1</option>
										<option value="2">Term 2</option>
										<option value="3">Term 3</option>
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="session">Session*</label>
									<select
										name="session"
										id="session"
										value={selectedSession}
										onChange={(e) =>
											setSelectedSession(e.target.value)
										}
										required
									>
										<option value="">Select Session</option>
										{sessions.map((session) => (
											<option
												key={session.id}
												value={session.id}
											>
												{session.session_name}
											</option>
										))}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="duration">
										Duration (minutes)*
									</label>
									<input
										type="number"
										name="duration"
										id="duration"
										min="1"
										value={examDuration}
										onChange={(e) =>
											setExamDuration(
												parseInt(e.target.value) || 60,
											)
										}
										required
									/>
								</div>
							</section>

							<section className="bottom">
								{questions.map((question, qIndex) => (
									<div key={qIndex} className="question-item">
										<article className="question-row">
											<div className="form-group">
												<label>{qIndex + 1}</label>
												<input
													type="text"
													placeholder="Enter question"
													value={
														question.question || ""
													}
													onChange={(e) =>
														updateQuestion(
															qIndex,
															"question",
															e.target.value,
														)
													}
													required
												/>
											</div>
											<div className="form-group">
												<select
													value={getDisplayType(
														question.type,
													)}
													onChange={(e) =>
														updateQuestion(
															qIndex,
															"type",
															e.target.value,
														)
													}
													required
												>
													<option value="Multiple choice">
														Multiple choice
													</option>
													<option value="True/False">
														True/False
													</option>
													<option value="Essay">
														Essay
													</option>
													<option value="Completion">
														Completion
													</option>
												</select>
											</div>
										</article>
										<article className="options-row">
											{question.type ===
												"multiple_choice" && (
												<>
													{question.options.map(
														(option, optIndex) => (
															<div
																key={optIndex}
																className="form-group option"
															>
																<input
																	type="text"
																	placeholder={`Option ${String.fromCharCode(
																		65 +
																			optIndex,
																	)}`}
																	value={
																		option
																	}
																	onChange={(
																		e,
																	) =>
																		updateOption(
																			qIndex,
																			optIndex,
																			e
																				.target
																				.value,
																		)
																	}
																	required={
																		optIndex <
																		2
																	}
																/>
																<button
																	type="button"
																	className="remove-option-btn"
																	onClick={() =>
																		removeOption(
																			qIndex,
																			optIndex,
																		)
																	}
																	disabled={
																		question
																			.options
																			.length <=
																		2
																	}
																>
																	<RiCloseLine />
																</button>
															</div>
														),
													)}
													<button
														type="button"
														className="add-option-btn"
														onClick={() =>
															addOption(qIndex)
														}
													>
														<LuPlus />
													</button>
												</>
											)}

											{question.type === "true_false" && (
												<div className="true-false-options">
													<label>
														<input
															type="radio"
															name={`q${qIndex}-tf`}
															value="true"
															checked={
																question.answer ===
																"true"
															}
															onChange={() =>
																updateQuestion(
																	qIndex,
																	"answer",
																	"true",
																)
															}
														/>{" "}
														True
													</label>
													<label>
														<input
															type="radio"
															name={`q${qIndex}-tf`}
															value="false"
															checked={
																question.answer ===
																"false"
															}
															onChange={() =>
																updateQuestion(
																	qIndex,
																	"answer",
																	"false",
																)
															}
														/>{" "}
														False
													</label>
												</div>
											)}
										</article>
										<div className="form-group answer">
											<label>Ans</label>
											{question.type ===
											"multiple_choice" ? (
												<select
													value={question.answer}
													onChange={(e) =>
														updateQuestion(
															qIndex,
															"answer",
															e.target.value,
														)
													}
													required
												>
													<option value="">
														Select Answer
													</option>
													{question.options.map(
														(option, optIdx) =>
															option.trim() && (
																<option
																	key={optIdx}
																	value={
																		option
																	}
																>
																	{option}
																</option>
															),
													)}
												</select>
											) : (
												question.type !==
													"true_false" && (
													<input
														type="text"
														placeholder="Enter answer"
														value={question.answer}
														onChange={(e) =>
															updateQuestion(
																qIndex,
																"answer",
																e.target.value,
															)
														}
														required
													/>
												)
											)}
											<button
												type="button"
												className="remove-question-btn"
												onClick={() =>
													removeQuestion(qIndex)
												}
												disabled={questions.length <= 1}
											>
												<RiCloseLine />
											</button>
										</div>
									</div>
								))}
								<button
									type="button"
									className="add-question-btn"
									onClick={addQuestion}
								>
									<LuPlus /> Add More Questions
								</button>
							</section>

							<button
								type="button"
								className="primary-btn"
								onClick={handleSubmit}
								disabled={submitting}
								style={{
									backgroundColor: "var(--primary-green)",
									color: "#fff",
									padding: "15px 40px",
									fontSize: "1rem",
									fontWeight: "600",
									margin: "0 auto",
									display: "block",
									border: "none",
									borderRadius: "4px",
									cursor: submitting
										? "not-allowed"
										: "pointer",
									opacity: submitting ? 0.7 : 1,
								}}
							>
								{submitting ? "Saving..." : "Save"}
							</button>
						</main>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Questions;
