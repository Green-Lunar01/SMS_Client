import React, { useState } from "react";
import "./CreateNewTests.css";
import { BsArrowLeft } from "react-icons/bs";

const CreateNewTests = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="create-new-tests">
			{tab === "one" && (
				<div className="search-tab">
					<select name="class" id="class">
						<option value="">Select Class</option>
						<option value="1">Class 1</option>
					</select>

					<button
						className="primary-btn"
						onClick={() => setTab("two")}
					>
						Search
					</button>
				</div>
			)}

			{tab === "two" && (
				<div className="create-new-tests-form">
					<h3>J.S.S.1</h3>

					<div className="form-group">
						<label htmlFor="date">Test Date*</label>
						<input type="date" name="date" id="date" />
					</div>

					<div className="form-group">
						<label htmlFor="term">Term</label>
						<select name="term" id="term">
							<option value="">Select Term</option>
							<option value="1">Term 1</option>
							<option value="2">Term 2</option>
							<option value="3">Term 3</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="session">Session</label>
						<select name="session" id="session">
							<option value="">Select Session</option>
							<option value="2022/2023">2022/2023</option>
							<option value="2023/2024">2023/2024</option>
							<option value="2024/2025">2024/2025</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="testSubject">Select Test Subject</label>
						<select name="testSubject" id="testSubject">
							<option value="">Select Subject</option>
							<option value="Maths">Maths</option>
							<option value="English">English</option>
							<option value="Science">Science</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="testMark">Test Mark</label>
						<input type="number" name="testMark" id="testMark" />
					</div>

					<button
						className="primary-btn"
						onClick={() => setTab("three")}
					>
						Create
					</button>
				</div>
			)}

			{tab === "three" && (
				<div className="new-tests-table">
					<span>
						<BsArrowLeft onClick={() => setTab("two")} />
						<h5>
							Kindly Include Marks Received for J.S.S.1 in the
							Biology Test For 2024/2025
						</h5>
					</span>

					<table>
						<tr>
							<th>Student Name</th>
							<th>Matric Number</th>
							<th>Obtained Marks/100</th>
						</tr>
						<tr>
							<td>Oyin Balogun</td>
							<td>BUS56787509</td>
							<td className="marks">
								<input
									type="number"
									name="number"
									id="number"
									readOnly
									value={80}
								/>
							</td>
						</tr>
						<tr>
							<td>Oyin Balogun</td>
							<td>BUS56787509</td>
							<td className="marks">
								<input
									type="number"
									name="number"
									id="number"
									readOnly
									value={80}
								/>
							</td>
						</tr>
					</table>

					<button className="primary-btn">Submit</button>
				</div>
			)}
		</div>
	);
};

export default CreateNewTests;
