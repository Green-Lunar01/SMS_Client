import React, { useState, useContext, useEffect } from "react";
import "./Assignment.css";
import personImg from "../../../assets/person-img.png";
import calendarImg from "../../../assets/calendar-img.png";
import bookImg from "../../../assets/book-img.png";
import teachImg from "../../../assets/teach-img.png";
import { LiaCommentDots } from "react-icons/lia";
import Modal from "../../../components/Modal/Modal";
import { RiCloseLine } from "react-icons/ri";
import { UserContext } from "../../../context/userContext";
import { SchoolContext } from "../../../context/schoolContext";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";

const Assignment = () => {
	const [assignments, setAssignments] = useState([]);
	 

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { user } = useContext(UserContext);
	const { subjects, classes, employees } = useContext(SchoolContext);

	const [teacherList, setTeacherList] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSubject, setSelectedSubject] = useState("");
	const [selectedTeacher, setSelectedTeacher] = useState("");
	const [date, setDate] = useState("");
	const [details, setDetails] = useState("");
	const [creating, setCreating] = useState(false);

	const [filterDate, setFilterDate] = useState("");
	const [filterClass, setFilterClass] = useState("");
	const [filterTeacher, setFilterTeacher] = useState("");
	const [loading, setLoading] = useState(false);

	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [selectedAssignment, setSelectedAssignment] = useState(null);
	const [submittingComment, setSubmittingComment] = useState(false);
	const [loadingComments, setLoadingComments] = useState(false);

	const openCommentModal = (assignment) => {
		setSelectedAssignment(assignment);
		setIsModal2Open(true);
		fetchComments(assignment.id);
	};

	const fetchComments = async (assignmentId) => {
		setLoadingComments(true);
		try {
			const response = await api.get(
				`/school/assignments/${assignmentId}/comments`,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			setComments(response.data.data || []);
		} catch (err) {
			console.log(err);
			toast.error("Error fetching comments");
		} finally {
			setLoadingComments(false);
		}
	};

	const submitComment = async () => {
		if (!commentText.trim()) {
			toast.error("Comment cannot be empty");
			return;
		}

		setSubmittingComment(true);
		try {
			const response = await api.post(
				`/school/assignments/${selectedAssignment.id}/comment`,
				{
					comment: commentText,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			toast.success("Comment added successfully");
			setCommentText("");
			fetchComments(selectedAssignment.id);
		} catch (err) {
			console.log(err);
			toast.error(
				err.response?.data?.message ||
					err.message ||
					"Error adding comment",
			);
		} finally {
			setSubmittingComment(false);
		}
	};

	const getEmployeeByCategory = (category) => {
		setTeacherList(
			employees.filter((employee) => employee.role === category),
		);
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [isModal2Open, setIsModal2Open] = useState(false);

	const openModal2 = () => {
		setIsModal2Open(true);
	};
	const closeModal2 = () => {
		setIsModal2Open(false);
	};

	const createAssignment = async () => {
		if (
			!selectedClass ||
			!selectedSubject ||
			!date ||
			!selectedTeacher ||
			!details
		) {
			toast.error("All fields are required");
			return;
		}

		setCreating(true);

		try {
			const response = await api.post(
				"/school/assignments/create",
				{
					teacher_id: Number(selectedTeacher),
					subject_id: Number(selectedSubject),
					class_id: Number(selectedClass),
					details,
					date,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);
			// console.log(response);
			toast.success("Assignment created successfully");
			setCreating(false);
			setIsModalOpen(false);
			fetchAssignments();
		} catch (err) {
			console.log(err);
			toast.error(
				err.response.data.message ||
					err.message ||
					"Error creating assignment",
			);
			setCreating(false);
		}
	};

	const formatDate = (dateString) => {
		return dateString.split("T")[0];
	};

	const fetchAssignments = async () => {
		setLoading(true);
		try {
			const response = await api.get(`/school/assignments`, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
				params: {
					date: formatDate(filterDate),
					class_id: Number(filterClass),
					teacher_id: Number(filterTeacher),
				},
			});
			// console.log(response.data.assignments);
			if (response.data.assignments.length === 0) {
				toast.error(
					"No assignments found for the selected combination",
				);
			}
			setAssignments(response.data.assignments);
		} catch (err) {
			console.log(err);
			if (
				err.response.data.message ===
				'Server Error: invalid input syntax for type date: ""'
			) {
				toast.error("No assignments found for the selected date");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!filterDate || !filterClass || !filterTeacher) return;
		fetchAssignments();
	}, [filterDate, filterClass, filterTeacher]);

	return (
		<div className="assignment-screen">
			<h2>Assignment</h2>
			<aside>
				<article>
					<div>
						<label htmlFor="date">Homework Date *</label>
						<input
							type="date"
							name="date"
							id="date"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
						/>
					</div>

					<div>
						<label htmlFor="class">Class *</label>
						<select
							name="class"
							id="class"
							value={filterClass}
							onChange={(e) => setFilterClass(e.target.value)}
						>
							<option value="">Select Class</option>
							{classes.map((classItem) => (
								<option key={classItem.id} value={classItem.id}>
									{classItem.class_name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="teacher">Teacher *</label>
						<select
							name="teacher"
							id="teacher"
							value={filterTeacher}
							onChange={(e) => setFilterTeacher(e.target.value)}
						>
							<option value="">Select Teacher</option>
							{teacherList.map((teacher) => (
								<option key={teacher.id} value={teacher.id}>
									{teacher.first_name} {teacher.last_name}
								</option>
							))}
						</select>
					</div>
					{/* <button className="primary-btn">Search</button> */}
					<button onClick={() => setIsModalOpen(true)}>
						Add Assignment
					</button>
				</article>
			</aside>

			{loading ? (
				<Spinner />
			) : (
				<main>
					{assignments.map((assignment) => (
						<article key={assignment.id}>
							<div className="top">
								<div style={{ backgroundColor: "#F3FEF7" }}>
									<img src={personImg} alt="" />
									<span>
										<h6>{assignment.teacher_name}</h6>
										<p>Teacher</p>
									</span>
								</div>
								<div style={{ backgroundColor: "#E9EFFF" }}>
									<img src={bookImg} alt="" />
									<span>
										<h6>{assignment.subject_name}</h6>
										<p>Subject</p>
									</span>
								</div>
								<div style={{ backgroundColor: "#FFF5EF" }}>
									<img src={teachImg} alt="" />
									<span>
										<h6>{assignment.class_name}</h6>
										<p>Class</p>
									</span>
								</div>
								<div style={{ backgroundColor: "#E6E6E6" }}>
									<img src={calendarImg} alt="" />
									<span>
										<h6>{formatDate(assignment.date)}</h6>
										<p>Date</p>
									</span>
								</div>

								<span
									onClick={() => openCommentModal(assignment)}
								>
									<LiaCommentDots />
									<p>Add Comments</p>
								</span>
							</div>
							<div className="bottom">
								<h4>Assignment</h4>
								<p>{assignment.details}</p>
							</div>
						</article>
					))}
				</main>
			)}

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div className="add-assignment-modal">
					<aside>
						<h3>Add Assignment</h3>
						<RiCloseLine onClick={closeModal} />
					</aside>
					<main>
						<article>
							<div className="form-group">
								<label htmlFor="date">Homework Date *</label>
								<input
									type="date"
									name="date"
									id="date"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="setBy">Set By *</label>
								<select
									name="setBy"
									id="setBy"
									value={selectedTeacher}
									onChange={(e) =>
										setSelectedTeacher(e.target.value)
									}
								>
									<option value="">Select Teacher</option>
									{teacherList.map((teacher) => (
										<option
											key={teacher.id}
											value={teacher.id}
										>
											{teacher.first_name}{" "}
											{teacher.surname}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="class">Class *</label>
								<select
									name="class"
									id="class"
									value={selectedClass}
									onChange={(e) =>
										setSelectedClass(e.target.value)
									}
								>
									<option value="">Select Class</option>
									{classes.map((cls) => (
										<option key={cls.id} value={cls.id}>
											{cls.class_name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="subject">Subject *</label>
								<select
									name="subject"
									id="subject"
									value={selectedSubject}
									onChange={(e) =>
										setSelectedSubject(e.target.value)
									}
								>
									<option value="">Select Subject</option>
									{subjects.map((sub) => (
										<option key={sub.id} value={sub.id}>
											{sub.subject_name}
										</option>
									))}
								</select>
							</div>
						</article>
						<section>
							<div className="form-group details">
								<label htmlFor="details">Details *</label>
								<textarea
									name="details"
									id="details"
									cols="30"
									rows="10"
									placeholder="Enter assignment details"
									value={details}
									onChange={(e) => setDetails(e.target.value)}
								></textarea>
							</div>

							<button
								className="primary-btn"
								disabled={creating}
								onClick={createAssignment}
							>
								{creating ? "Adding..." : "Add Assignment"}
							</button>
						</section>
					</main>
				</div>
			</Modal>

			<Modal isOpen={isModal2Open} onClose={closeModal2}>
				<div className="add-comment-modal">
					<aside>
						<h3>Add Comment</h3>
						<RiCloseLine onClick={closeModal2} />
					</aside>
					<main>
						{loadingComments ? (
							<div className="loading-comments">
								<Spinner />
							</div>
						) : (
							<>
								<div className="comments-list">
									{comments.length > 0 ? (
										comments.map((comment) => (
											<div
												key={comment.id}
												className="comment-item"
											>
												<div className="comment-avatar">
													{comment.commenter_name.charAt(
														0,
													)}
												</div>
												<div className="comment-content">
													<p className="comment-text">
														{comment.comment}
													</p>
													<div className="comment-meta">
														<span className="comment-author">
															{
																comment.commenter_name
															}
														</span>
														<span className="comment-date">
															{new Date(
																comment.created_at,
															).toLocaleString()}
														</span>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="no-comments">
											No comments yet
										</div>
									)}
								</div>
								<div className="comment-form">
									<div className="comment-input-container">
										<div className="comment-avatar">
											{user?.first_name?.charAt(0) || "U"}
										</div>
										<textarea
											className="comment-input"
											placeholder="Enter comment"
											value={commentText}
											onChange={(e) =>
												setCommentText(e.target.value)
											}
										></textarea>
									</div>
									<div className="comment-controls">
										<div className="comment-emojis">
											<span role="img" aria-label="smile">
												😀
											</span>
											<span className="attachment-icon">
												<svg
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
												</svg>
											</span>
										</div>
										<button
											className="send-comment-btn"
											onClick={submitComment}
											disabled={submittingComment}
										>
											{submittingComment
												? "Sending..."
												: "Send"}
										</button>
									</div>
								</div>
							</>
						)}
					</main>
				</div>
			</Modal>
		</div>
	);
};

export default Assignment;
