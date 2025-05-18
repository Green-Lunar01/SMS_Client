import React, { useState } from "react";
import "./FeeSetup.css";

const FeeSetup = () => {
	const [feeSpecific, setFeeSpecific] = useState("All Students");

	return (
		<div className="fee-setup-container">
			<h2>Fee Setups</h2>
			<div className="fee-setup-form">
				<div className="fee-row">
					<div className="form-group">
						<label>Fee Specific for*</label>
						<select
							onChange={(e) => setFeeSpecific(e.target.value)}
						>
							<option value="All Students">All Students</option>
							<option value="Specific Class">
								Specific Class
							</option>
							<option value="Specific Student">
								Specific Student
							</option>
						</select>
					</div>
					{feeSpecific === "Specific Class" && (
						<div className="form-group">
							<label>Fee Particulars for*</label>
							<select>
								<option value={"J.S.S 1"}>J.S.S 1</option>
								<option value={"J.S.S 2"}>J.S.S 2</option>
								<option value={"J.S.S 3"}>J.S.S 3</option>
							</select>
						</div>
					)}
					{feeSpecific === "Specific Student" && (
						<div className="form-group">
							<label>Fee Particulars for*</label>
							<input
								type="text"
								id="search-student"
								placeholder="Search Student"
							/>
						</div>
					)}
				</div>

				<div className="specific-fee-section">
					<div className="form-group">
						<label>Specific label*</label>
						<input type="text" placeholder="School fee" />
					</div>
					<div className="form-group">
						<label>Amount*</label>
						<input type="number" placeholder="0" />
					</div>
					<div className="form-group">
						<label>Period/Duration</label>
						<select>
							<option>Monthly</option>
							<option>Quarterly</option>
							<option>Annually</option>
						</select>
					</div>
				</div>

				{[
					"ADMISSION FEE",
					"REGISTRATION FEE",
					"TRANSPORT",
					"UNION",
					"OTHERS",
					"PREVIOUS BALANCE",
				].map((label, index) => (
					<div className="fee-row" key={index}>
						<div className="form-group">
							<label>{label}</label>
							<input type="text" placeholder={label} />
						</div>
						<div className="form-group">
							<label>Amount*</label>
							<input type="number" placeholder="0" />
						</div>
					</div>
				))}

				<button className="save-button">Save Changes</button>
			</div>
		</div>
	);
};

export default FeeSetup;
