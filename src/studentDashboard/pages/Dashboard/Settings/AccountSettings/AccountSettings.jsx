import React from "react";
import "./AccountSettings.css";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";

const AccountSettings = () => {
	return (
		<div className="account-settings-container">
			<h2>Account Settings</h2>
			<div className="account-settings-form">
				<div className="form-group">
					<label htmlFor="username">Username*</label>
					<input type="text" placeholder="Jake55@yahoo.com" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password*</label>
					<PasswordInput placeholder="*********" id={"password"} />
				</div>
				<div className="form-group">
					<label htmlFor="time-zone">Time Zone*</label>
					<select name="time-zone" id="time-zone">
						<option value="America/New_York">
							America/New_York
						</option>
						<option value="America/Chicago">America/Chicago</option>
						<option value="America/Los_Angeles">
							America/Los_Angeles
						</option>
						<option value="Africa/Nigeria">Africa/Nigeria</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="currency">Currency*</label>
					<select name="currency" id="currency">
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="JPY">JPY</option>
						<option value="NGN">NGN</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="calendar">Language*</label>
					<select name="language" id="language">
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="fr">French</option>
						<option value="de">German</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="calendar">
						Academic Calendar Selection*
					</label>
					<select name="calendar" id="calendar">
						<option value="month">Per Month</option>
						<option value="term">Per Term</option>
						<option value="year">Per Year</option>
					</select>
				</div>

				<button className="save-button">Update Settings</button>

				<button className="delete-btn">Delete Account</button>
			</div>
		</div>
	);
};

export default AccountSettings;
