import React, { useState, useEffect, useContext } from "react";
import "./CreateNewExams.css";
import { BsArrowLeft } from "react-icons/bs";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { SchoolContext } from "../../../../context/schoolContext";

const CreateNewExams = () => {
	const [tab, setTab] = useState("one");
	const { subjects, classes, sessions } = useContext(SchoolContext);
	const [selectedClassId, setSelectedClassId] = useState("");
	const [selectedClassName, setSelectedClassName] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedSession, setSelectedSession] = useState("");
	const [examDate, setExamDate] = useState("");
	const [term, setTerm] = useState("");
	const [totalMark, setTotalMark] = useState("");
	const [loading, setLoading] = useState(false);
	const [creating, setCreating] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [examStudents, setExamStudents] = useState([]);
	const [examId, setExamId] = useState(null);
	const [studentScores, setStudentScores] = useState({});

	const handleClassChange = (e) => {
		setSelectedClassId(e.target.value);
		if (e.target.value) {
			const selectedClass = classes.find(
				(c) => c.id.toString() === e.target.value,
			);
			setSelectedClassName(selectedClass ? selectedClass.class_name : "");
		} else {
			setSelectedClassName("");
		}
	};

	const createExam = async () => {
		if (
			!selectedClassId ||
			!selectedSubject ||
			!selectedSession ||
			!examDate ||
			!term ||
			!totalMark
		) {
			toast.error("All fields are required");
			return;
		}

		setCreating(true);
		try {
			const response = await api.post(
				"/school-exam/create/",
				{
					class_id: Number(selectedClassId),
					subject_id: Number(selectedSubject),
					sessionId: Number(selectedSession),
					date: examDate,
					term: Number(term),
					total_mark: Number(totalMark),
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Exam created successfully");

			// Initialize student scores with default values of 0
			const students = response.data.data.students || [];
			const initialScores = {};
			students.forEach((student) => {
				initialScores[student.id] = "0";
			});

			setExamStudents(students);
			setStudentScores(initialScores);
			setExamId(response.data.data.examId || response.data.data.id);
			setTab("three");
		} catch (error) {
			console.error("Error creating exam:", error);
			toast.error(error.response?.data?.message || "Error creating exam");
		} finally {
			setCreating(false);
		}
	};

	const handleScoreChange = (studentId, score) => {
		// Validate score is not greater than total mark
		if (Number(score) > Number(totalMark)) {
			toast.error(`Score cannot exceed ${totalMark}`);
			return;
		}

		setStudentScores((prev) => ({
			...prev,
			[studentId]: score,
		}));
	};

	const submitScores = async () => {
		if (!examId) {
			toast.error("Exam ID is missing");
			return;
		}

		// Format scores data for API
		const scores = Object.keys(studentScores).map((studentId) => ({
			student_id: Number(studentId),
			score: Number(studentScores[studentId]),
		}));

		setSubmitting(true);
		try {
			const response = await api.post(
				"/school-exam/add-scores/",
				{
					exam_id: examId,
					scores: scores,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Exam scores submitted successfully");
			// Reset form and go back to first tab
			resetForm();
			setTab("one");
		} catch (error) {
			console.error("Error submitting scores:", error);
			toast.error(
				error.response?.data?.message || "Error submitting scores",
			);
		} finally {
			setSubmitting(false);
		}
	};

	const resetForm = () => {
		setSelectedClassId("");
		setSelectedClassName("");
		setSelectedSubject("");
		setSelectedSession("");
		setExamDate("");
		setTerm("");
		setTotalMark("");
		setExamStudents([]);
		setExamId(null);
		setStudentScores({});
	};

	return (
		<div className="create-new-exams">
			{tab === "one" && (
				<div className="search-tab">
					<select
						name="class"
						id="class"
						value={selectedClassId}
						onChange={handleClassChange}
					>
						<option value="">Select Class</option>
						{classes.map((classItem) => (
							<option key={classItem.id} value={classItem.id}>
								{classItem.class_name}
							</option>
						))}
					</select>

					<button
						className="primary-btn"
						onClick={() => setTab("two")}
						disabled={!selectedClassId}
					>
						Search
					</button>
				</div>
			)}

			{tab === "two" && (
				<div className="create-new-exams-form">
					<h3>{selectedClassName}</h3>

					<div className="form-group">
						<label htmlFor="date">Exam Date*</label>
						<input
							type="date"
							name="date"
							id="date"
							value={examDate}
							onChange={(e) => setExamDate(e.target.value)}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="term">Term</label>
						<select
							name="term"
							id="term"
							value={term}
							onChange={(e) => setTerm(e.target.value)}
						>
							<option value="">Select Term</option>
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
							value={selectedSession}
							onChange={(e) => setSelectedSession(e.target.value)}
						>
							<option value="">Select Session</option>
							{sessions.map((session) => (
								<option key={session.id} value={session.id}>
									{session.session_name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="examSubject">Select Exam Subject</label>
						<select
							name="examSubject"
							id="examSubject"
							value={selectedSubject}
							onChange={(e) => setSelectedSubject(e.target.value)}
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
						<label htmlFor="examMark">Exam Mark</label>
						<input
							type="number"
							name="examMark"
							id="examMark"
							value={totalMark}
							onChange={(e) => setTotalMark(e.target.value)}
						/>
					</div>

					<div className="button-group">
						<button
							className="secondary-btn"
							onClick={() => setTab("one")}
						>
							Back
						</button>
						<button
							className="primary-btn"
							onClick={createExam}
							disabled={creating}
						>
							{creating ? "Creating..." : "Create Exam"}
						</button>
					</div>
				</div>
			)}

			{tab === "three" && (
				<div className="new-exams-table">
					<span>
						<BsArrowLeft onClick={() => setTab("two")} />
						<h5>
							Kindly Include Marks Received in The Exam (out of{" "}
							{totalMark})
						</h5>
					</span>

					<table>
						<thead>
							<tr>
								<th>Student Name</th>
								<th>Matric Number</th>
								<th>Obtained Marks/{totalMark}</th>
							</tr>
						</thead>
						<tbody>
							{examStudents.length === 0 ? (
								<tr>
									<td colSpan="3" className="no-students">
										No students found
									</td>
								</tr>
							) : (
								examStudents.map((student) => (
									<tr key={student.id}>
										<td>{student.student_name}</td>
										<td>{student.matric_number}</td>
										<td className="marks">
											<input
												type="number"
												name={`score-${student.id}`}
												id={`score-${student.id}`}
												min="0"
												max={totalMark}
												value={
													studentScores[student.id] ||
													"0"
												}
												onChange={(e) =>
													handleScoreChange(
														student.id,
														e.target.value,
													)
												}
											/>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>

					<div className="button-group">
						<button
							className="secondary-btn"
							onClick={() => setTab("two")}
						>
							Back
						</button>
						<button
							className="primary-btn"
							onClick={submitScores}
							disabled={submitting || examStudents.length === 0}
						>
							{submitting ? "Submitting..." : "Submit Scores"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateNewExams;
