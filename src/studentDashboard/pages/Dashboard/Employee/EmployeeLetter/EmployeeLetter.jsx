import React from "react";
import "./EmployeeLetter.css";
import { CiSearch } from "react-icons/ci";
import { FaPrint } from "react-icons/fa6";

const EmployeeLetter = () => {
	return (
		<div className="employee-letter-screen">
			<div className="search-section">
				<div className="search-box">
					<CiSearch />
					<input
						type="text"
						placeholder="Oyin Balogun"
						className="search-input"
					/>
				</div>
				<p>Oyin Balogun</p>
				<button className="primary-btn">Search</button>
			</div>

			<div className="employee-card">
				<div className="card-header">EMPLOYMENT CONFIRMATION</div>
				<div className="card-body">
					<div className="profile">
						<div className="profile-pic"></div>
						<h2 className="profile-name">Oyin Balogun</h2>
					</div>
					<div className="details">
						<span>
							<h6>Registration/ID:</h6>
							<p>B3456700</p>
						</span>
						<span>
							<h6>Class:</h6>
							<p>J.S.S 2</p>
						</span>
						<span>
							<h6>Admission Date:</h6>
							<p>07 September, 2024</p>
						</span>
						<span>
							<h6>Account Status:</h6>
							<p>Active</p>
						</span>
						<span>
							<h6>Username:</h6>
							<p>B3456700</p>
						</span>
						<span>
							<h6>Password:</h6>
							<p>66787/AuauB3456700</p>
						</span>
					</div>
				</div>
			</div>
			<button className="print-button">
				<FaPrint /> Print Employee Letter
			</button>
		</div>
	);
};

export default EmployeeLetter;
