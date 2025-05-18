import React from "react";
import "./MeetingCard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { Link } from "react-router-dom";

const MeetingCard = ({ meeting }) => {
	const {
		meetingType,
		meetingWith,
		date,
		time,
		duration,
		status,
		id,
		title,
		description,
	} = meeting;

	return (
		<div className="meeting-card">
			<div className="meeting-header">
				<span
					className={`meeting-tag ${
						meetingType === "Host" ? "host" : "invitation"
					}`}
				>
					{meetingType}
				</span>
				<span className="meeting-with">
					Meeting with: {meetingWith}
				</span>
			</div>
			<div className="meeting-body">
				<div className="meeting-row">
					<article>
						<span className="meeting-icon">
							<IoCalendarClearOutline />
						</span>
						<span style={{ marginRight: "10px" }}>{date}</span>
						<span className="meeting-icon">
							<LuClock3 />
						</span>
						<span>
							{time} Duration: {duration}
						</span>
					</article>
					<article>
						<span
							className={`meeting-status ${
								status === "Active" ? "active" : "completed"
							}`}
						>
							{status}
						</span>
						<button className="delete-btn">
							<RiDeleteBin6Line />
						</button>
					</article>
				</div>
				<div className="meeting-row">
					<div>
						<a href="#" className="meeting-id">
							{id}
						</a>
						<h3 className="meeting-title">{title}</h3>

						<p className="meeting-description">{description}</p>
					</div>
					<Link
						to={`/school/dashboard/liveclass/${id}`}
						className="primary-btn"
					>
						Join Room
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MeetingCard;
