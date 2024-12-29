import React, { useState, Suspense, useContext, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Dashboard.css";
import Spinner from "../../components/Spinner/Spinner";
import Navbar from "../../components/Navbar/Navbar";
import { CgClose } from "react-icons/cg";
import userBlueIcon from "../../assets/user-blue-icon.png";
import notificationEmpty from "../../assets/notification-empty.png";

const Dashboard = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [openNotifications, setOpenNotifications] = useState(false);
	const location = useLocation();

	const isLinkActive = (path) => {
		return location.pathname.startsWith(path);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const notifications = [
		{
			id: 1,
			title: "New Message",
			description: "You have a new message from John Doe",
		},
		{
			id: 2,
			title: "New Message",
			description: "You have a new message from John Doe",
		},
		{
			id: 3,
			title: "New Message",
			description: "You have a new message from John Doe",
		},
		{
			id: 4,
			title: "New Message",
			description: "You have a new message from John Doe",
		},
		{
			id: 5,
			title: "New Message",
			description: "You have a new message from John Doe",
		},
	];

	return (
		<div className="dashboard">
			<Navbar
				setOpenMenu={setOpenMenu}
				setOpenNotifications={setOpenNotifications}
			/>

			<section
				className={
					openNotifications
						? "notification-screen open"
						: "notification-screen"
				}
			>
				<aside onClick={() => setOpenNotifications(false)}></aside>
				<main>
					<div className="top">
						<h4>Notifications</h4>

						<CgClose onClick={() => setOpenNotifications(false)} />
					</div>
					{notifications.length === 0 ? (
						<div className="empty">
							<img src={notificationEmpty} alt="" />
						</div>
					) : (
						<>
							{notifications.map((notification, index) => (
								<article key={index} className="notification">
									<img src={userBlueIcon} alt="user icon" />
									<div>
										<h4>{notification.title}</h4>
										<p>{notification.description}</p>
									</div>
								</article>
							))}
						</>
					)}
				</main>
			</section>

			<main>
				<aside className={openMenu ? "side-menu open" : "side-menu"}>
					<article className="mobile-top">
						<h4>Menu</h4>
						<CgClose onClick={() => setOpenMenu(false)} />
					</article>
					<Link
						to="/school/dashboard/insights"
						className={
							isLinkActive("/school/dashboard/insights")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z"
								stroke-width="1.5"
							/>
							<path
								d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z"
								stroke-width="1.5"
							/>
							<path
								d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z"
								stroke-width="1.5"
							/>
							<path
								d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z"
								stroke-width="1.5"
							/>
						</svg>
						Dashboard
					</Link>
					<Link
						to="/school/dashboard/class"
						className={
							isLinkActive("/school/dashboard/class")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7 6V5C7 3.58579 7 2.87868 7.43934 2.43934C7.87868 2 8.58579 2 10 2H14C15.4143 2 16.1214 2 16.5607 2.43934C17 2.87868 17 3.58579 17 5V6C17 7.41421 17 8.12132 16.5607 8.56066C16.1214 9 15.4143 9 14 9H13L10 11V9C8.58579 9 7.87868 9 7.43934 8.56066C7 8.12132 7 7.41421 7 6Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M3.59003 18.7408C2.96125 19.162 1.31261 20.0221 2.31674 21.0983C2.80725 21.624 3.35355 22 4.04039 22H6H7.95961C8.64645 22 9.19275 21.624 9.68326 21.0983C10.6874 20.0221 9.03875 19.162 8.40997 18.7408C6.93547 17.7531 5.06453 17.7531 3.59003 18.7408Z"
								stroke-width="1.5"
							/>
							<path
								d="M15.59 18.7408C14.9612 19.162 13.3126 20.0221 14.3167 21.0983C14.8072 21.624 15.3535 22 16.0404 22H18H19.9596C20.6464 22 21.1927 21.624 21.6832 21.0983C22.6874 20.0221 21.0387 19.162 20.4099 18.7408C18.9354 17.7531 17.0645 17.7531 15.59 18.7408Z"
								stroke-width="1.5"
							/>
							<path
								d="M8 13.5C8 14.6046 7.10457 15.5 6 15.5C4.89543 15.5 4 14.6046 4 13.5C4 12.3954 4.89543 11.5 6 11.5C7.10457 11.5 8 12.3954 8 13.5Z"
								stroke-width="1.5"
							/>
							<path
								d="M20 13.5C20 14.6046 19.1045 15.5 18 15.5C16.8954 15.5 16 14.6046 16 13.5C16 12.3954 16.8954 11.5 18 11.5C19.1045 11.5 20 12.3954 20 13.5Z"
								stroke-width="1.5"
							/>
						</svg>
						Class
					</Link>
					<Link
						to="/school/dashboard/subject"
						className={
							isLinkActive("/school/dashboard/subject")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7 6V5C7 3.58579 7 2.87868 7.43934 2.43934C7.87868 2 8.58579 2 10 2H14C15.4143 2 16.1214 2 16.5607 2.43934C17 2.87868 17 3.58579 17 5V6C17 7.41421 17 8.12132 16.5607 8.56066C16.1214 9 15.4143 9 14 9H13L10 11V9C8.58579 9 7.87868 9 7.43934 8.56066C7 8.12132 7 7.41421 7 6Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M3.59003 18.7408C2.96125 19.162 1.31261 20.0221 2.31674 21.0983C2.80725 21.624 3.35355 22 4.04039 22H6H7.95961C8.64645 22 9.19275 21.624 9.68326 21.0983C10.6874 20.0221 9.03875 19.162 8.40997 18.7408C6.93547 17.7531 5.06453 17.7531 3.59003 18.7408Z"
								stroke-width="1.5"
							/>
							<path
								d="M15.59 18.7408C14.9612 19.162 13.3126 20.0221 14.3167 21.0983C14.8072 21.624 15.3535 22 16.0404 22H18H19.9596C20.6464 22 21.1927 21.624 21.6832 21.0983C22.6874 20.0221 21.0387 19.162 20.4099 18.7408C18.9354 17.7531 17.0645 17.7531 15.59 18.7408Z"
								stroke-width="1.5"
							/>
							<path
								d="M8 13.5C8 14.6046 7.10457 15.5 6 15.5C4.89543 15.5 4 14.6046 4 13.5C4 12.3954 4.89543 11.5 6 11.5C7.10457 11.5 8 12.3954 8 13.5Z"
								stroke-width="1.5"
							/>
							<path
								d="M20 13.5C20 14.6046 19.1045 15.5 18 15.5C16.8954 15.5 16 14.6046 16 13.5C16 12.3954 16.8954 11.5 18 11.5C19.1045 11.5 20 12.3954 20 13.5Z"
								stroke-width="1.5"
							/>
						</svg>
						Subject
					</Link>
					<Link
						to="/school/dashboard/students"
						className={
							isLinkActive("/school/dashboard/students")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.5 6L8 4L13.5 6L11 7.5V9C11 9 10.3333 8.5 8 8.5C5.66667 8.5 5 9 5 9V7.5L2.5 6ZM2.5 6V10"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M11 8.5V9.38889C11 11.1071 9.65685 12.5 8 12.5C6.34315 12.5 5 11.1071 5 9.38889V8.5"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.3182 11.0294C15.3182 11.0294 15.803 10.6765 17.5 10.6765C19.197 10.6765 19.6818 11.0294 19.6818 11.0294M15.3182 11.0294V10L13.5 9L17.5 7.5L21.5 9L19.6818 10V11.0294M15.3182 11.0294V11.3182C15.3182 12.5232 16.295 13.5 17.5 13.5C18.705 13.5 19.6818 12.5232 19.6818 11.3182V11.0294"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M4.38505 15.926C3.44187 16.4525 0.968909 17.5276 2.47511 18.8729C3.21087 19.53 4.03033 20 5.06058 20H10.9394C11.9697 20 12.7891 19.53 13.5249 18.8729C15.0311 17.5276 12.5581 16.4525 11.6149 15.926C9.40321 14.6913 6.59679 14.6913 4.38505 15.926Z"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 20H19.7048C20.4775 20 21.0921 19.624 21.6439 19.0983C22.7736 18.0221 20.9189 17.162 20.2115 16.7408C18.9362 15.9814 17.3972 15.8059 16 16.2141"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Students
					</Link>
					<Link
						to="/school/dashboard/employees"
						className={
							isLinkActive("/school/dashboard/employees")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.6161 20H19.1063C20.2561 20 21.1707 19.4761 21.9919 18.7436C24.078 16.8826 19.1741 15 17.5 15M15.5 5.06877C15.7271 5.02373 15.9629 5 16.2048 5C18.0247 5 19.5 6.34315 19.5 8C19.5 9.65685 18.0247 11 16.2048 11C15.9629 11 15.7271 10.9763 15.5 10.9312"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M4.48131 16.1112C3.30234 16.743 0.211139 18.0331 2.09388 19.6474C3.01359 20.436 4.03791 21 5.32572 21H12.6743C13.9621 21 14.9864 20.436 15.9061 19.6474C17.7889 18.0331 14.6977 16.743 13.5187 16.1112C10.754 14.6296 7.24599 14.6296 4.48131 16.1112Z"
								stroke-width="1.5"
							/>
							<path
								d="M13 7.5C13 9.70914 11.2091 11.5 9 11.5C6.79086 11.5 5 9.70914 5 7.5C5 5.29086 6.79086 3.5 9 3.5C11.2091 3.5 13 5.29086 13 7.5Z"
								stroke-width="1.5"
							/>
						</svg>
						Employee
					</Link>
					<Link
						to="/school/dashboard/fee"
						className={
							isLinkActive("/school/dashboard/fee")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z"
								stroke-width="1.5"
							/>
							<path
								d="M18.9 8C18.9656 7.67689 19 7.34247 19 7C19 4.23858 16.7614 2 14 2C11.2386 2 9 4.23858 9 7C9 7.34247 9.03443 7.67689 9.10002 8"
								stroke-width="1.5"
							/>
							<path
								d="M7 7.99324H16C18.8284 7.99324 20.2426 7.99324 21.1213 8.87234C22 9.75145 22 11.1663 22 13.9961V15.9971C22 18.8269 22 20.2418 21.1213 21.1209C20.2426 22 18.8284 22 16 22H10C6.22876 22 4.34315 22 3.17157 20.8279C2 19.6557 2 17.7692 2 13.9961V11.9952C2 8.22211 2 6.33558 3.17157 5.16344C4.11466 4.2199 5.52043 4.03589 8 4H10"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
						Fee
					</Link>
					<Link
						to="/school/dashboard/account"
						className={
							isLinkActive("/school/dashboard/account")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.9427 16.8354C20.2864 12.8866 18.2432 9.94613 16.467 8.219C15.9501 7.71642 15.6917 7.46513 15.1208 7.23257C14.5499 7 14.0592 7 13.0778 7H10.9222C9.94081 7 9.4501 7 8.87922 7.23257C8.30834 7.46513 8.04991 7.71642 7.53304 8.219C5.75682 9.94613 3.71361 12.8866 3.05727 16.8354C2.56893 19.7734 5.27927 22 8.30832 22H15.6917C18.7207 22 21.4311 19.7734 20.9427 16.8354Z"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M7.25662 4.44287C7.05031 4.14258 6.75128 3.73499 7.36899 3.64205C8.00392 3.54651 8.66321 3.98114 9.30855 3.97221C9.89237 3.96413 10.1898 3.70519 10.5089 3.33548C10.8449 2.94617 11.3652 2 12 2C12.6348 2 13.1551 2.94617 13.4911 3.33548C13.8102 3.70519 14.1076 3.96413 14.6914 3.97221C15.3368 3.98114 15.9961 3.54651 16.631 3.64205C17.2487 3.73499 16.9497 4.14258 16.7434 4.44287L15.8105 5.80064C15.4115 6.38146 15.212 6.67187 14.7944 6.83594C14.3769 7 13.8373 7 12.7582 7H11.2418C10.1627 7 9.6231 7 9.20556 6.83594C8.78802 6.67187 8.5885 6.38146 8.18945 5.80064L7.25662 4.44287Z"
								stroke-width="1.5"
							/>
						</svg>
						Account
					</Link>
					<Link
						to="/school/dashboard/salary"
						className={
							isLinkActive("/school/dashboard/salary")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14.5488 12C14.5488 13.3807 13.4295 14.5 12.0488 14.5C10.6681 14.5 9.54883 13.3807 9.54883 12C9.54883 10.6193 10.6681 9.5 12.0488 9.5C13.4295 9.5 14.5488 10.6193 14.5488 12Z"
								stroke-width="1.5"
							/>
							<path
								d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86214 4 6.74142 4 10.5 4H13.5C17.2585 4 19.1378 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1378 20 17.2585 20 13.5 20H10.5C6.74142 20 4.86214 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M18.51 12H18.501"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M5.50019 12H5.49121"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Salary
					</Link>
					<Link
						to="/school/dashboard/attendance"
						className={
							isLinkActive("/school/dashboard/attendance")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.774 18C21.5233 18 22.1193 17.5285 22.6544 16.8691C23.7499 15.5194 21.9513 14.4408 21.2653 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M3.22596 18C2.47665 18 1.88067 17.5285 1.34554 16.8691C0.250091 15.5194 2.04867 14.4408 2.73464 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M8.0838 15.1112C7.06202 15.743 4.38298 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81562 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4798 13.6296 8.0838 15.1112Z"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"
								stroke-width="1.5"
							/>
						</svg>
						Attendance
					</Link>
					<Link
						to="/school/dashboard/assignment"
						className={
							isLinkActive("/school/dashboard/assignment")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 3H3C2.44772 3 2 3.44772 2 4V18L3.5 21L5 18V4C5 3.44772 4.55228 3 4 3Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M21 12.0013V8.00072C21 5.64336 21 4.46468 20.2678 3.73234C19.5355 3 18.357 3 16 3H13C10.643 3 9.46447 3 8.73223 3.73234C8 4.46468 8 5.64336 8 8.00072V16.0019C8 18.3592 8 19.5379 8.73223 20.2703C9.35264 20.8908 10.2934 20.9855 12 21"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 7H17"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 11H17"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M14 19C14 19 15.5 19.5 16.5 21C16.5 21 18 17 22 15"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M2 7H5"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Assignment
					</Link>
					<Link
						to="/school/dashboard/timetable"
						className={
							isLinkActive("/school/dashboard/timetable")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11 13H16M8 13H8.00898M13 17H8M16 17H15.991"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M18 2V4M6 2V4"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M3 8H21"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Time Table
					</Link>
					<Link
						to="/school/dashboard/messaging"
						className={
							isLinkActive("/school/dashboard/messaging")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M14.1706 20.8905C18.3536 20.6125 21.6856 17.2332 21.9598 12.9909C22.0134 12.1607 22.0134 11.3009 21.9598 10.4707C21.6856 6.22838 18.3536 2.84913 14.1706 2.57107C12.7435 2.47621 11.2536 2.47641 9.8294 2.57107C5.64639 2.84913 2.31441 6.22838 2.04024 10.4707C1.98659 11.3009 1.98659 12.1607 2.04024 12.9909C2.1401 14.536 2.82343 15.9666 3.62791 17.1746C4.09501 18.0203 3.78674 19.0758 3.30021 19.9978C2.94941 20.6626 2.77401 20.995 2.91484 21.2351C3.05568 21.4752 3.37026 21.4829 3.99943 21.4982C5.24367 21.5285 6.08268 21.1757 6.74868 20.6846C7.1264 20.4061 7.31527 20.2668 7.44544 20.2508C7.5756 20.2348 7.83177 20.3403 8.34401 20.5513C8.8044 20.7409 9.33896 20.8579 9.8294 20.8905C11.2536 20.9852 12.7435 20.9854 14.1706 20.8905Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M11.9955 12H12.0045M15.991 12H16M8 12H8.00897"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Messaging
					</Link>
					<Link
						to="/school/dashboard/#"
						className={
							isLinkActive("/school/dashboard/#") ? "active" : ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 22L10 16H2L4 22H12ZM12 22H16"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z"
								stroke-width="1.5"
							/>
							<path
								d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z"
								stroke-width="1.5"
							/>
							<path
								d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
						Live Class
					</Link>
					<Link
						to="/school/dashboard/questions"
						className={
							isLinkActive("/school/dashboard/questions")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3058 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97728 2.31177 7.89902C2.84167 6.96629 4 7.00025 5.5 7.00013"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
						Question Paper
					</Link>
					<Link
						to="/school/dashboard/exams"
						className={
							isLinkActive("/school/dashboard/exams")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.5 7.5C8.5 6.48748 9.39543 5.5 10.5 5.5C11.6046 5.5 12.5 6.32081 12.5 7.33333C12.5 7.69831 12.3837 8.03837 12.1831 8.32406C11.5854 9.17553 10.5 9.98748 10.5 11"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M10.5 13.5H10.509"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8 19.5C9.05038 20.3697 10.3145 20.9238 11.7635 21.0188C12.9052 21.0937 14.0971 21.0936 15.2365 21.0188C15.6288 20.9931 16.0565 20.9007 16.4248 20.751C16.8345 20.5845 17.0395 20.5012 17.1437 20.5138C17.2478 20.5264 17.3989 20.6364 17.7011 20.8563C18.2339 21.244 18.9051 21.5225 19.9005 21.4986C20.4038 21.4865 20.6555 21.4804 20.7681 21.2909C20.8808 21.1013 20.7405 20.8389 20.4598 20.3141C20.0706 19.5862 19.824 18.7529 20.1977 18.0852C20.8413 17.1315 21.3879 16.0021 21.4678 14.7823C21.5107 14.1269 21.5107 13.4481 21.4678 12.7927C21.4146 11.9799 21.2173 11.2073 20.9012 10.5"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12.2365 17.0188C15.5829 16.7993 18.2485 14.1315 18.4678 10.7823C18.5107 10.1269 18.5107 9.4481 18.4678 8.79268C18.2485 5.44345 15.5829 2.77563 12.2365 2.55611C11.0948 2.48122 9.90285 2.48137 8.76352 2.55611C5.41711 2.77563 2.75153 5.44345 2.53219 8.79268C2.48927 9.4481 2.48927 10.1269 2.53219 10.7823C2.61208 12.0021 3.15875 13.1315 3.80233 14.0852C4.17601 14.7529 3.92939 15.5862 3.54017 16.3141C3.25953 16.8389 3.11921 17.1013 3.23187 17.2909C3.34454 17.4804 3.59621 17.4865 4.09954 17.4986C5.09493 17.5225 5.76615 17.244 6.29894 16.8563C6.60112 16.6364 6.75221 16.5264 6.85635 16.5138C6.96048 16.5012 7.16541 16.5845 7.57521 16.751C7.94352 16.9007 8.37117 16.9931 8.76352 17.0188C9.90285 17.0936 11.0948 17.0937 12.2365 17.0188Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
						</svg>
						Exams
					</Link>
					<Link
						to="/school/dashboard/tests"
						className={
							isLinkActive("/school/dashboard/tests")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836V15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22H14.4961C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5"
								stroke-width="1.5"
							/>
							<path
								d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M6.5 10H10.5"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M13.5 11C13.5 11 14 11 14.5 12C14.5 12 16.0882 9.5 17.5 9"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6.5 16H10.5"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M13.5 17C13.5 17 14 17 14.5 18C14.5 18 16.0882 15.5 17.5 15"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Class Test
					</Link>
					<Link
						to="/school/dashboard/reportcard"
						className={
							isLinkActive("/school/dashboard/reportcard")
								? "active"
								: ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3 11C3 7.25027 3 5.3754 3.95491 4.06107C4.26331 3.6366 4.6366 3.26331 5.06107 2.95491C6.3754 2 8.25027 2 12 2C15.7497 2 17.6246 2 18.9389 2.95491C19.3634 3.26331 19.7367 3.6366 20.0451 4.06107C21 5.3754 21 7.25027 21 11V13C21 16.7497 21 18.6246 20.0451 19.9389C19.7367 20.3634 19.3634 20.7367 18.9389 21.0451C17.6246 22 15.7497 22 12 22C8.25027 22 6.3754 22 5.06107 21.0451C4.6366 20.7367 4.26331 20.3634 3.95491 19.9389C3 18.6246 3 16.7497 3 13V11Z"
								stroke-width="1.5"
							/>
							<path
								d="M15 13L14.1429 11M14.1429 11L12.5924 7.38235C12.4933 7.15092 12.2594 7 12 7C11.7406 7 11.5067 7.15092 11.4076 7.38235L9.85714 11M14.1429 11H9.85714M9 13L9.85714 11"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8 17H16"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						Report Card
					</Link>
					<Link
						to="/school/dashboard/#"
						className={
							isLinkActive("/school/dashboard/#") ? "active" : ""
						}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7 2C4.23858 2 2 4.23858 2 7C2 8.85071 3.0055 10.4666 4.5 11.3311V17.8431C4.5 18.6606 4.5 19.0694 4.65224 19.4369C4.80448 19.8045 5.09351 20.0935 5.67157 20.6716L7 22L9.10819 19.8918C9.20542 19.7946 9.25407 19.7459 9.2944 19.6932C9.40031 19.5547 9.46816 19.3909 9.49122 19.218C9.5 19.1522 9.5 19.0834 9.5 18.9459C9.5 18.8346 9.5 18.779 9.4941 18.7249C9.47864 18.5831 9.43303 18.4463 9.36035 18.3236C9.33263 18.2768 9.29924 18.2323 9.23246 18.1433L8 16.5L8.7 15.5667C9.09649 15.038 9.29473 14.7737 9.39737 14.4658C9.5 14.1579 9.5 13.8275 9.5 13.1667V11.3311C10.9945 10.4666 12 8.85071 12 7C12 4.23858 9.76142 2 7 2Z"
								stroke-width="1.5"
								stroke-linejoin="round"
							/>
							<path
								d="M7 7H7.00898"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13 14H19C19.9319 14 20.3978 14 20.7654 14.1522C21.2554 14.3552 21.6448 14.7446 21.8478 15.2346C22 15.6022 22 16.0681 22 17C22 17.9319 22 18.3978 21.8478 18.7654C21.6448 19.2554 21.2554 19.6448 20.7654 19.8478C20.3978 20 19.9319 20 19 20H13"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<path
								d="M15 5H19C19.9319 5 20.3978 5 20.7654 5.15224C21.2554 5.35523 21.6448 5.74458 21.8478 6.23463C22 6.60218 22 7.06812 22 8C22 8.93188 22 9.39782 21.8478 9.76537C21.6448 10.2554 21.2554 10.6448 20.7654 10.8478C20.3978 11 19.9319 11 19 11H15"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
						Users Access
					</Link>
				</aside>

				<Suspense fallback={<Spinner />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default Dashboard;
