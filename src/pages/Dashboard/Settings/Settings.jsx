import React, { useState } from "react";
import Profile from "./Profile/Profile";
import FeeSetup from "./FeeSetup/FeeSetup";
import AccountSettings from "./AccountSettings/AccountSettings";
import { CSSTransition } from "react-transition-group";
import "./Settings.css";

export default function App() {
	const [activeTab, setActiveTab] = useState("Profile");

	const renderTabContent = () => {
		switch (activeTab) {
			case "Profile":
				return <Profile />;
			case "Fee setups":
				return <FeeSetup />;
			case "Account Settings":
				return <AccountSettings />;
			default:
				return <Profile />;
		}
	};

	return (
		<div className="settings-page">
			<nav className="tab-nav">
				<button
					className={`tab ${activeTab === "Profile" ? "active" : ""}`}
					onClick={() => setActiveTab("Profile")}
				>
					Profile
				</button>
				<button
					className={`tab ${
						activeTab === "Fee setups" ? "active" : ""
					}`}
					onClick={() => setActiveTab("Fee setups")}
				>
					Fee setups
				</button>
				<button
					className={`tab ${
						activeTab === "Account Settings" ? "active" : ""
					}`}
					onClick={() => setActiveTab("Account Settings")}
				>
					Account Settings
				</button>
			</nav>
			<CSSTransition
				in={true}
				key={activeTab}
				classNames="fade"
				timeout={300}
				unmountOnExit
			>
				<div className="tab-content">{renderTabContent()}</div>
			</CSSTransition>
		</div>
	);
}
