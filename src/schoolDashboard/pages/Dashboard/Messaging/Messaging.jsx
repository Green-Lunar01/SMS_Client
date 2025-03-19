import React, { useState, useEffect, useContext } from "react";
import "./Messaging.css";
import noMessages from "../../../assets/no-messages.png";
import api from "../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import { SchoolContext } from "../../../context/schoolContext";
import { UserContext } from "../../../context/userContext";

const Messaging = () => {
	const [messageTo, setMessageTo] = useState("");
	const [messageBody, setMessageBody] = useState("");
	const [specificClassId, setSpecificClassId] = useState("");
	const [specificTeacherId, setSpecificTeacherId] = useState("");
	const [specificStudentId, setSpecificStudentId] = useState("");
	const [viewTab, setViewTab] = useState("all");
	const [messages, setMessages] = useState([]);
	const [filteredMessages, setFilteredMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);

	// Get classes, teachers, and students from context
	const { classes, students, employees } = useContext(SchoolContext);
	const { user } = useContext(UserContext);
	const [teachers, setTeachers] = useState([]);

	// Fetch teachers
	const getEmployeeByCategory = (category) => {
		setTeachers(employees.filter((employee) => employee.role === category));
	};

	useEffect(() => {
		getEmployeeByCategory("Teacher");
	}, [employees]);

	// Fetch messages
	const fetchMessages = async () => {
		setLoading(true);
		try {
			const response = await api.get("/school-messages", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			console.log("MESSAGES: ", response.data.data);
			setMessages(response.data.data || []);
		} catch (err) {
			console.error(err);
			toast.error("Error fetching messages");
		} finally {
			setLoading(false);
		}
	};

	// Fetch messages on component mount
	useEffect(() => {
		fetchMessages();
	}, []);

	// Filter messages based on the selected tab
	useEffect(() => {
		if (messages.length > 0) {
			let filtered = [];

			if (viewTab === "all") {
				filtered = messages;
			} else if (viewTab === "sent") {
				filtered = messages.filter(
					(message) => message.sender_id === user.id,
				);
			} else if (viewTab === "received") {
				filtered = messages.filter(
					(message) => message.sender_id !== user.id,
				);
			}

			setFilteredMessages(filtered);
		} else {
			setFilteredMessages([]);
		}
	}, [messages, viewTab, user]);

	// Format date
	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toLocaleDateString();
	};

	// Handle send message
	const handleSendMessage = async () => {
		if (!messageTo) {
			toast.error("Please select a recipient");
			return;
		}

		if (!messageBody.trim()) {
			toast.error("Please enter a message");
			return;
		}

		setSending(true);

		try {
			let recipientId = 0;
			let recipientRole = "";
			let classId = 0;

			// Set recipient details based on selection
			if (messageTo === "all_students") {
				recipientRole = "student";
			} else if (messageTo === "all_teachers") {
				recipientRole = "teacher";
			} else if (messageTo === "specific_class") {
				recipientRole = "class";
				classId = specificClassId;
			} else if (messageTo === "specific_teacher") {
				recipientRole = "teacher";
				recipientId = specificTeacherId;
			} else if (messageTo === "specific_student") {
				recipientRole = "student";
				recipientId = specificStudentId;
			}

			const messageData = {
				recipientId: parseInt(recipientId) || 0,
				recipientRole,
				classId: parseInt(classId) || 0,
				message: messageBody,
			};
			console.log(messageData);

			await api.post("/school-messages/send", messageData, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			toast.success("Message sent successfully");
			setMessageBody("");

			// Refresh messages
			await fetchMessages();

			// Reset form
			setMessageTo("");
			setSpecificClassId("");
			setSpecificTeacherId("");
			setSpecificStudentId("");
		} catch (err) {
			console.error(err);
			toast.error(err.response?.data?.message || "Error sending message");
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="messaging-screen">
			<h2>Messaging</h2>

			<section>
				<aside>
					<h3>Write a New Message</h3>

					<div className="form-group">
						<label htmlFor="messageTo">Send Message To*</label>
						<select
							name="messageTo"
							id="messageTo"
							value={messageTo}
							onChange={(e) => setMessageTo(e.target.value)}
						>
							<option value="">Select Recipient</option>
							<option value="all_teachers">All Teachers</option>
							<option value="all_students">All Students</option>
							<option value="specific_class">
								Specific Class
							</option>
							<option value="specific_teacher">
								Specific Teacher
							</option>
							<option value="specific_student">
								Specific Student
							</option>
						</select>
					</div>

					{messageTo === "specific_class" && (
						<div className="form-group">
							<label htmlFor="class">Class*</label>
							<select
								name="class"
								id="class"
								value={specificClassId}
								onChange={(e) =>
									setSpecificClassId(e.target.value)
								}
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
					)}

					{messageTo === "specific_teacher" && (
						<div className="form-group">
							<label htmlFor="teacher">Teacher*</label>
							<select
								name="teacher"
								id="teacher"
								value={specificTeacherId}
								onChange={(e) =>
									setSpecificTeacherId(e.target.value)
								}
							>
								<option value="">Select Teacher</option>
								{teachers.map((teacher) => (
									<option key={teacher.id} value={teacher.id}>
										{teacher.first_name} {teacher.surname}
									</option>
								))}
							</select>
						</div>
					)}

					{messageTo === "specific_student" && (
						<div className="form-group">
							<label htmlFor="student">Student*</label>
							<select
								name="student"
								id="student"
								value={specificStudentId}
								onChange={(e) =>
									setSpecificStudentId(e.target.value)
								}
							>
								<option value="">Select Student</option>
								{students.map((student) => (
									<option key={student.id} value={student.id}>
										{student.first_name} {student.surname}
									</option>
								))}
							</select>
						</div>
					)}

					<textarea
						name="messageBody"
						id="messageBody"
						placeholder="Write your message here"
						maxLength={500}
						value={messageBody}
						onChange={(e) => setMessageBody(e.target.value)}
					></textarea>

					<button
						className="primary-btn"
						onClick={handleSendMessage}
						disabled={sending}
					>
						{sending ? "Sending..." : "Send Message"}
					</button>
				</aside>

				<main>
					<div className="select-tab">
						<button
							className={viewTab === "all" ? "active" : ""}
							onClick={() => setViewTab("all")}
						>
							All Messages
						</button>
						<button
							className={viewTab === "sent" ? "active" : ""}
							onClick={() => setViewTab("sent")}
						>
							Sent Messages
						</button>
						<button
							className={viewTab === "received" ? "active" : ""}
							onClick={() => setViewTab("received")}
						>
							Received Messages
						</button>
					</div>

					<div className="messages-area">
						{loading ? (
							<Spinner />
						) : filteredMessages.length > 0 ? (
							<>
								{filteredMessages.map((message) => {
									const isSentByUser =
										message.sender_id === user.id;
									return (
										<div
											className={
												isSentByUser
													? "message-block sent"
													: "message-block"
											}
											key={message.id}
										>
											<h3>
												{formatDate(message.sent_at)}
											</h3>
											<main>
												{isSentByUser ? (
													<h6>
														To:{" "}
														{message.recipient_role ===
														"class"
															? `Class: ${message.class_id ? classes.find((c) => c.id === message.class_id)?.class_name || "Unknown Class" : "All Classes"}`
															: message.recipient_name ||
																`All ${message.recipient_role}s`}
													</h6>
												) : (
													<h6>
														From:{" "}
														{message.sender_name ||
															"Unknown"}
													</h6>
												)}
												<p>{message.message}</p>
											</main>
										</div>
									);
								})}
							</>
						) : (
							<div className="no-messages">
								<img src={noMessages} alt="no messages" />
								<p>No Messages</p>
							</div>
						)}
					</div>
				</main>
			</section>
		</div>
	);
};

export default Messaging;
