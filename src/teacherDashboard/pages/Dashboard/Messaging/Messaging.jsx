import React, { useState, useEffect } from "react";
import "./Messaging.css";
import noMessages from "../../../assets/no-messages.png";

const Messaging = () => {
	const [messageTo, setMessageTo] = useState("");
	const [messageBody, setMessageBody] = useState("");
	const [specificClass, setSpecificClass] = useState("");
	const [specificStudent, setSpecificStudent] = useState("");
	const [viewTab, setViewTab] = useState("all");
	const [filteredMessages, setFilteredMessages] = useState([]);

	const allMessages = [
		{
			id: 1,
			date: "01/01/2023",
			from: "John Doe",
			to: "",
			text: "Hello, I'm John Doe. How can I help you today?",
			type: "recieved",
		},
		{
			id: 2,
			date: "01/01/2023",
			from: "",
			to: "Students",
			text: "Happy New Year",
			type: "sent",
		},
		{
			id: 3,
			date: "01/01/2023",
			from: "",
			to: "School Admin",
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptates officiis suscipit at mollitia, reiciendis ad vitae totam veniam maiores excepturi laborum nemo sit assumenda hic, consequatur tempore eligendi illum.",
			type: "sent",
		},
	];

	const filterMessages = (messages, viewTab) => {
		return messages.filter((message) => {
			if (viewTab === "all") return true;
			if (viewTab === "sent" && message.type === "sent") return true;
			if (viewTab === "recieved" && message.type === "recieved")
				return true;
			return false;
		});
	};

	useEffect(() => {
		setFilteredMessages(filterMessages(allMessages, viewTab));
	}, [viewTab]);

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
							onChange={(e) => setMessageTo(e.target.value)}
						>
							<option value="admin">School Admin</option>
							<option value="specific class">
								Specific Class
							</option>
							<option value="students">Specific Students</option>
						</select>
					</div>

					{messageTo === "specific class" && (
						<div className="form-group">
							<label htmlFor="class">Class*</label>
							<select
								name="class"
								id="class"
								onChange={(e) =>
									setSpecificClass(e.target.value)
								}
							>
								<option value="class 1">Class 1</option>
								<option value="class 2">Class 2</option>
								<option value="class 3">Class 3</option>
								<option value="class 4">Class 4</option>
							</select>
						</div>
					)}

					{messageTo === "specific student" && (
						<div className="form-group">
							<label htmlFor="student">student*</label>
							<select
								name="student"
								id="student"
								onChange={(e) =>
									setSpecificStudent(e.target.value)
								}
							>
								<option value="student 1">student 1</option>
								<option value="student 2">student 2</option>
								<option value="student 3">student 3</option>
								<option value="student 4">student 4</option>
							</select>
						</div>
					)}

					<textarea
						name="messageBody"
						id="messageBody"
						placeholder="Write your message here"
						maxLength={500}
						onChange={(e) => setMessageBody(e.target.value)}
					></textarea>

					<button className="primary-btn">Send Message</button>
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
							className={viewTab === "recieved" ? "active" : ""}
							onClick={() => setViewTab("recieved")}
						>
							Recieved Messages
						</button>
					</div>

					<div className="messages-area">
						{filteredMessages.length > 0 ? (
							<>
								{filteredMessages.map((message) => (
									<div
										className={
											message.type === "recieved"
												? "message-block"
												: "message-block sent"
										}
										key={message.id}
									>
										<h3>{message.date}</h3>
										<main>
											{message.type === "recieved" ? (
												<h6>From {message.from}</h6>
											) : (
												<h6>To {message.to}</h6>
											)}

											<p>{message.text}</p>
										</main>
									</div>
								))}
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
