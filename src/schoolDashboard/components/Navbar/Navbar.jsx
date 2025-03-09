import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import school from "../../assets/school.png";
import { FiBell } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdMenu, IoIosLogIn } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import api from "../../lib/axios";
import { SchoolContext } from "../../context/schoolContext";

const Navbar = ({ setOpenMenu, setOpenNotifications }) => {
	const [openProfileMenu, setOpenProfileMenu] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [setupModalScreen, setSetupModalScreen] = useState(1);
	const [selectedSession, setSelectedSession] = useState(0);
	const { sessions, setSessions } = useContext(SchoolContext);
	const [newSessionName, setNewSessionName] = useState("");
	const [currentSession, setCurrentSession] = useState("");
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const navigate = useNavigate();

	const handleLogout = () => {
		toast("Logging out...");
		localStorage.setItem("sms_token", null);
		navigate("/school/login");
	};

	// Fetch all academic sessions
	const fetchSessions = async () => {
		setLoading(true);
		try {
			const response = await api.get("/school/academic-sessions", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			console.log("SESSIONS: ", response.data.data);

			setSessions(response.data.data);

			// Find and set current active session
			const activeSession = response.data.data.find(
				(session) => session.isactive === true,
			);
			if (activeSession) {
				setCurrentSession(activeSession.session_name);
				localStorage.setItem(
					"sms_school_session",
					JSON.stringify(activeSession),
				);
			}
		} catch (error) {
			console.error("Error fetching sessions:", error);
			toast.error("Error fetching sessions");
		} finally {
			setLoading(false);
		}
	};

	// Create new academic session
	const createSession = async () => {
		if (!newSessionName.trim()) {
			toast.error("Please enter a session name");
			return;
		}

		setLoading(true);
		try {
			const response = await api.post(
				"/school/academic-sessions/create",
				{ sessionName: newSessionName },
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Session created successfully");
			setNewSessionName("");
			fetchSessions();
			setSetupModalScreen(2); // Switch to "All" tab after creating
		} catch (error) {
			console.error("Error creating session:", error);
			toast.error(
				error.response?.data?.message || "Error creating session",
			);
		} finally {
			setLoading(false);
		}
	};

	// Set active academic session
	const setActiveSession = async (sessionId) => {
		setLoading(true);
		try {
			const response = await api.post(
				"school/academic-sessions/set-active",
				{ sessionId },
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
					},
				},
			);

			toast.success("Active session updated successfully");
			fetchSessions(); // Refresh the sessions list
		} catch (error) {
			console.error("Error setting active session:", error);
			toast.error(
				error.response?.data?.message || "Error setting active session",
			);
		} finally {
			setLoading(false);
		}
	};

	// Delete a session (you might want to add this functionality)
	const deleteSession = async (sessionId) => {
		// This endpoint is not shown in your screenshots, so I'm assuming it exists
		if (window.confirm("Are you sure you want to delete this session?")) {
			try {
				// You'll need to implement the actual API endpoint for deleting
				// const response = await api.delete(`/school/academic-sessions/${sessionId}`, {
				//   headers: { Authorization: `${localStorage.getItem("sms_token")}` },
				// });

				// For now, just filter it out from the UI
				setSessions(
					sessions.filter((session) => session.id !== sessionId),
				);
				toast.success("Session deleted");
			} catch (error) {
				console.error("Error deleting session:", error);
				toast.error("Failed to delete session");
			}
		}
	};

	// Handle select button click
	const handleSelectSession = () => {
		if (selectedSession !== null && sessions.length > 0) {
			const sessionId = sessions[selectedSession]?.id;
			if (sessionId) {
				setActiveSession(sessionId);
				setOpenModal(false);
			} else {
				toast.error("Invalid session selection");
			}
		} else {
			toast.error("Please select a session");
		}
	};

	// Filter sessions based on search term
	const filteredSessions = sessions.filter((session) =>
		session.session_name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Load sessions when component mounts
	useEffect(() => {
		if (
			localStorage.getItem("sms_token") &&
			localStorage.getItem("sms_token") !== "null"
		) {
			fetchSessions();
		}
	}, []);

	return (
		<nav className="navbar">
			<div className="logo">
				<img src={logo} alt="" />
			</div>
			<aside>
				<div className="session-setup">
					<select
						name="session"
						id="session"
						className="session-year"
						value={currentSession}
						onChange={(e) => {
							setCurrentSession(e.target.value);
							localStorage.setItem(
								"sms_school_session",
								e.target.value,
							);
							// Find the session id and set it as active
							const session = sessions.find(
								(s) => s.session_name === e.target.value,
							);
							if (session) {
								setActiveSession(session.id);
							}
						}}
					>
						{sessions.map((session) => (
							<option
								key={session.id}
								value={session.session_name}
							>
								{session.session_name}
							</option>
						))}
					</select>

					<button
						className="primary-btn"
						onClick={() => {
							setOpenModal(true);
							fetchSessions(); // Refresh sessions when opening modal
						}}
					>
						Setup
					</button>
				</div>

				<Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
					<div className="session-setup-modal">
						<aside>
							<h3>Session</h3>
							<IoMdClose onClick={() => setOpenModal(false)} />
						</aside>
						<main>
							<article>
								<h4
									onClick={() => setSetupModalScreen(1)}
									className={
										setupModalScreen === 1 ? "active" : ""
									}
								>
									Create new
								</h4>
								<h4
									onClick={() => setSetupModalScreen(2)}
									className={
										setupModalScreen === 2 ? "active" : ""
									}
								>
									All
								</h4>
							</article>

							<section>
								{setupModalScreen === 1 && (
									<div className="create-new-container">
										<label htmlFor="new-session">
											Enter Session
											<input
												type="text"
												name="new-session"
												id="new-session"
												placeholder="E.g 2024/2025"
												value={newSessionName}
												onChange={(e) =>
													setNewSessionName(
														e.target.value,
													)
												}
											/>
										</label>

										<button
											className="add-button"
											onClick={createSession}
											disabled={loading}
										>
											{loading ? "Adding..." : "Add"}
										</button>
									</div>
								)}

								{setupModalScreen === 2 && (
									<div className="all-sessions-container">
										<div className="search-container">
											<IoIosSearch className="search-icon" />
											<input
												type="text"
												placeholder="Search"
												value={searchTerm}
												onChange={(e) =>
													setSearchTerm(
														e.target.value,
													)
												}
											/>
										</div>

										<div className="sessions-list">
											{loading ? (
												<div className="loading-text">
													Loading sessions...
												</div>
											) : filteredSessions.length ===
											  0 ? (
												<div className="no-sessions-text">
													No sessions found
												</div>
											) : (
												filteredSessions.map(
													(session, index) => (
														<div
															key={session.id}
															className="session-item"
														>
															<div className="session-selector">
																<div
																	className={`radio-button ${selectedSession === index ? "selected" : ""}`}
																	onClick={() =>
																		setSelectedSession(
																			index,
																		)
																	}
																>
																	{selectedSession ===
																		index && (
																		<div className="radio-inner"></div>
																	)}
																</div>
																<span>
																	{
																		session.session_name
																	}
																	{session.isActive &&
																		" (Active)"}
																</span>
															</div>
															<IoTrash
																className="delete-icon"
																onClick={() =>
																	deleteSession(
																		session.id,
																	)
																}
															/>
														</div>
													),
												)
											)}
										</div>

										<button
											className="select-button"
											onClick={handleSelectSession}
											disabled={loading}
										>
											{loading
												? "Selecting..."
												: "Select"}
										</button>
									</div>
								)}
							</section>
						</main>
					</div>
				</Modal>

				<div>
					<button>Upgrade</button>
				</div>

				<div className="svgs">
					<FiBell onClick={() => setOpenNotifications(true)} />
					<IoSettingsOutline
						onClick={() => navigate("/school/dashboard/settings")}
					/>
				</div>

				<div className="profile">
					<p>Hope College</p>
					<img
						src={school}
						alt=""
						onClick={() => setOpenProfileMenu(!openProfileMenu)}
					/>

					{openProfileMenu && (
						<div className="profile-menu">
							<span>
								<FaRegCircleUser />
								<p>Profile</p>
							</span>
							<Link to="/school/dashboard/settings">
								<IoSettingsOutline />
								<p>General Settings</p>
							</Link>
							<span onClick={handleLogout}>
								<IoIosLogIn />
								<p>Logout</p>
							</span>
						</div>
					)}
				</div>
			</aside>
			<section className="mobile-menu">
				<div className="left">
					<IoMdMenu onClick={() => setOpenMenu(true)} />
					<h2>LUNAR SMS</h2>
				</div>

				<div className="right">
					<FiBell />
					<img src={school} alt="" />
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
