import React, { useState } from "react";
import "./LiveMeeting.css";
import { IoIosSend, IoMdClose } from "react-icons/io";
import userImg from "../../../../assets/user.png";
import { MdCallEnd } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { BsPersonPlus } from "react-icons/bs";
import { BsArrowsFullscreen } from "react-icons/bs";
import liveClassDemo from "../../../../assets/live-class-demo.png";

const LiveMeeting = () => {
	const [activeTab, setActiveTab] = useState("message");
	const [sidePanel, setSidePanel] = useState(false);
	const [videoActive, setVideoActive] = useState(false);
	const [micActive, setMicActive] = useState(false);
	const [handActive, setHandActive] = useState(false);
	const [fullScreenActive, setFullScreenActive] = useState(false);

	const messages = [
		{
			id: 1,
			name: "User Name",
			message: "Lorem ipsum sit dolor amet",
		},
		{
			id: 2,
			name: "User Name",
			message: "Lorem ipsum sit dolor amet",
		},
		{
			id: 3,
			name: "User Name",
			message: "Lorem ipsum sit dolor amet",
		},
		{
			id: 4,
			name: "User Name",
			message: "Lorem ipsum sit dolor amet",
		},
		{
			id: 5,
			name: "User Name",
			message: "Lorem ipsum sit dolor ametbsgdsdgsdshgdsgdhg",
		},
		{
			id: 6,
			name: "User Name",
			message: "Lorem ipsum sit dolor amet hsjds dsdsgd",
		},
	];
	return (
		<div className="live-meeting-screen">
			<h2>Live Class</h2>
			<div className="live-meeting-container">
				<div className="video-section">
					<div className="main-video">
						<div className="live-indicator">Live</div>
						<img
							src={liveClassDemo}
							alt="Main Presenter"
							className="video-frame"
						/>
					</div>
					<div className="bottom-bar">
						<div>
							<button className="stop-button">
								<MdCallEnd /> <p>Stop</p>
							</button>
							<p>48 watching</p>
						</div>

						<div className="meeting-info">
							<div className="meeting-id">ESK5110BR1rYDj</div>
							<div className="meeting-message">
								why are you poor
							</div>
						</div>

						<div className="action-buttons">
							<button
								className={
									videoActive
										? "icon-button active"
										: "icon-button"
								}
								onClick={() => setVideoActive(!videoActive)}
							>
								<IoVideocamOutline />
							</button>
							<button
								className={
									micActive
										? "icon-button active"
										: "icon-button"
								}
								onClick={() => setMicActive(!micActive)}
							>
								<CiMicrophoneOn />
							</button>
							<button
								className={
									sidePanel
										? "icon-button active"
										: "icon-button"
								}
								onClick={() => setSidePanel(!sidePanel)}
							>
								<IoChatboxEllipsesOutline />
							</button>
							<button
								className={
									handActive
										? "icon-button active"
										: "icon-button"
								}
								onClick={() => setHandActive(!handActive)}
							>
								<HiOutlineHandRaised />
							</button>
							<button className="icon-button">
								<BsPersonPlus />
							</button>
							<button
								className={
									fullScreenActive
										? "icon-button active"
										: "icon-button"
								}
								onClick={() =>
									setFullScreenActive(!fullScreenActive)
								}
							>
								<BsArrowsFullscreen />
							</button>
						</div>
					</div>
				</div>
				{sidePanel && (
					<div className="side-panel">
						<div className="close-side-panel">
							<IoMdClose onClick={() => setSidePanel(false)} />
						</div>
						<div className="tabs">
							<button
								className={
									activeTab === "attendance" ? "active" : ""
								}
								onClick={() => setActiveTab("attendance")}
							>
								Attendance
							</button>
							<button
								className={
									activeTab === "message" ? "active" : ""
								}
								onClick={() => setActiveTab("message")}
							>
								Message
							</button>
						</div>
						<div className="tab-content">
							{activeTab === "attendance" && (
								<ul className="attendance-list">
									{[
										"John Doe",
										"Jane Smith",
										"Michael Brown",
										"John Doe",
										"Jane Smith",
										"Michael Brown",
										"John Doe",
										"Jane Smith",
										"Michael Brown",
										"John Doe",
										"Jane Smith",
										"Michael Brown",
									].map((name, index) => (
										<li key={index}>
											<img src={userImg} alt="" />
											<p>{name}</p>
										</li>
									))}
								</ul>
							)}
							{activeTab === "message" && (
								<div className="message-panel">
									<ul className="messages">
										{messages.map((message) => (
											<li key={message.id}>
												<span>
													<img src={userImg} alt="" />
													<p>{message.name}</p>
												</span>
												<p>{message.message}</p>
											</li>
										))}
									</ul>
									<div className="message-input">
										<input
											type="text"
											placeholder="Write a message"
										/>
										<button>
											<IoIosSend />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default LiveMeeting;
