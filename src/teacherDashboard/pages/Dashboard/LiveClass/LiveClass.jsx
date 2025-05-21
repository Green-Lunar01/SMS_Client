import React, { useState } from "react";
import "./LiveClass.css";
import noMeeting from "../../../assets/no-meeting.png";
import MeetingCard from "./MeetingCard/MeetingCard";

const LiveClass = () => {
	const [messageTo, setMessageTo] = useState("");
	const [specificClass, setSpecificClass] = useState("");
	const [specificTeacher, setSpecificTeacher] = useState("");
	const [specificStudent, setSpecificStudent] = useState("");
	const [scheduled, setScheduled] = useState(false);
	const [viewTab, setViewTab] = useState("all");

	const meetings = [
		{
			meetingType: "Host",
			meetingWith: "All Teachers",
			date: "2024-09-22",
			time: "07:50 PM",
			duration: "1 hour 30 min",
			status: "Active",
			id: "ESK5110BR1rYDj",
			title: "Why are you poor",
			description:
				"Lorem ipsum dolor sit amet consectetur. Gravida tempus congue donec nisi risus consectetur proin volutpat sit.",
		},
		{
			meetingType: "Invitation",
			meetingWith: "Momoh Paul",
			date: "2024-09-22",
			time: "07:50 PM",
			duration: "1 hour 30 min",
			status: "Active",
			id: "ESK5110BR1rYDj",
			title: "Why are you poor",
			description:
				"Lorem ipsum dolor sit amet consectetur. Gravida tempus congue donec nisi risus consectetur proin volutpat sit.",
		},
		{
			meetingType: "Host",
			meetingWith: "All Teachers",
			date: "2024-09-23",
			time: "08:00 PM",
			duration: "2 hours",
			status: "Completed",
			id: "ESK5110BR1rYDj",
			title: "Strategies for Success",
			description:
				"In this session, we will explore actionable strategies for achieving success in your field.",
		},
	];

	const filterMeetings = () => {
		const today = new Date().toISOString().split("T")[0];
		const tomorrow = new Date();
		tomorrow.setDate(new Date().getDate() + 1);
		const tomorrowDate = tomorrow.toISOString().split("T")[0];

		if (viewTab === "today") {
			return meetings.filter((meeting) => meeting.date === today);
		}
		if (viewTab === "tomorrow") {
			return meetings.filter((meeting) => meeting.date === tomorrowDate);
		}
		if (viewTab === "selfHost") {
			return meetings.filter((meeting) => meeting.meetingType === "Host");
		}
		if (viewTab === "invitation") {
			return meetings.filter(
				(meeting) => meeting.meetingType === "Invitation",
			);
		}
		return meetings; // Default: All meetings
	};

	const filteredMeetings = filterMeetings();

	return (
		<div className="live-class-screen">
			<h2>Live Class</h2>

			<section>
				<aside>
					<h3>Host Meeting</h3>

					<div className="form-group">
						<label htmlFor="title">Meeting Title*</label>
						<input type="text" name="title" id="title" />
					</div>

					<div className="form-group">
						<label htmlFor="meetingID">Meeting ID*</label>
						<input
							type="text"
							name="meetingID"
							id="meetingID"
							style={{ color: "#13A541" }}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="messageTo">Meeting With*</label>
						<select
							name="messageTo"
							id="messageTo"
							onChange={(e) => setMessageTo(e.target.value)}
						>
							<option value="admin">School Admin</option>
							<option value="specific class">
								Specific Class
							</option>
							<option value="specific teacher">
								Specific Teacher
							</option>
							<option value="specific student">
								Specific Student
							</option>
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

					{messageTo === "specific teacher" && (
						<div className="form-group">
							<label htmlFor="teacher">Teacher*</label>
							<select
								name="teacher"
								id="teacher"
								onChange={(e) =>
									setSpecificTeacher(e.target.value)
								}
							>
								<option value="teacher 1">Teacher 1</option>
								<option value="teacher 2">Teacher 2</option>
								<option value="teacher 3">Teacher 3</option>
								<option value="teacher 4">Teacher 4</option>
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

					<span>
						<input
							type="checkbox"
							name="checkbox"
							id="checkbox"
							onChange={(e) => setScheduled(e.target.checked)}
						/>
						<label htmlFor="checkbox">
							I want to schedule this meeting.
						</label>
					</span>

					{scheduled && (
						<div className="form-row">
							<div className="form-group">
								<label htmlFor="scheduleDate">Date *</label>
								<input
									type="date"
									name="scheduleDate"
									id="scheduleDate"
									onChange={(e) =>
										setScheduleDate(e.target.value)
									}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="startTime">Start Time *</label>
								<input
									type="time"
									name="startTime"
									id="startTime"
									onChange={(e) =>
										setStartTime(e.target.value)
									}
								/>
							</div>
						</div>
					)}

					<textarea
						name="messageBody"
						id="messageBody"
						placeholder="Write your message here"
						maxLength={500}
						onChange={(e) => setMessageBody(e.target.value)}
					></textarea>

					<button className="primary-btn">Start Meeting</button>
				</aside>

				<main>
					<div className="select-tab">
						<button
							className={viewTab === "all" ? "active" : ""}
							onClick={() => setViewTab("all")}
						>
							All Meetings
						</button>
						<button
							className={viewTab === "today" ? "active" : ""}
							onClick={() => setViewTab("today")}
						>
							Today
						</button>
						<button
							className={viewTab === "tomorrow" ? "active" : ""}
							onClick={() => setViewTab("tomorrow")}
						>
							Tomorrow
						</button>
						<button
							className={viewTab === "selfHost" ? "active" : ""}
							onClick={() => setViewTab("selfHost")}
						>
							Self Host
						</button>
						<button
							className={viewTab === "invitation" ? "active" : ""}
							onClick={() => setViewTab("invitation")}
						>
							Invitation
						</button>
					</div>

					<div className="meetings-area">
						{filteredMeetings.length === 0 ? (
							<div className="no-meetings">
								<img src={noMeeting} alt="No meetings" />
								<p>No meetings found</p>
							</div>
						) : (
							filteredMeetings.map((meeting, index) => (
								<MeetingCard key={index} meeting={meeting} />
							))
						)}
					</div>
				</main>
			</section>
		</div>
	);
};

export default LiveClass;
