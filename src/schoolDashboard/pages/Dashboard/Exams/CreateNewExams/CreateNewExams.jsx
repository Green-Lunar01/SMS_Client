import React, { useState } from "react";
import "./CreateNewExams.css";
import { BsArrowLeft } from "react-icons/bs";

const CreateNewExams = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="create-new-exams">
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
				<div className="create-new-exams-form">
					<h3>J.S.S.1</h3>

					<div className="form-group">
						<label htmlFor="date">Exam Date*</label>
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
						<label htmlFor="examSubject">Select Exam Subject</label>
						<select name="examSubject" id="examSubject">
							<option value="">Select Subject</option>
							<option value="Maths">Maths</option>
							<option value="English">English</option>
							<option value="Science">Science</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="examMark">Exam Mark</label>
						<input type="number" name="examMark" id="examMark" />
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
				<div className="new-exams-table">
					<span>
						<BsArrowLeft onClick={() => setTab("two")} />
						<h5>
							Kindly Include Marks Received for J.S.S.1 in the
							Biology Exam For 2024/2025
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

export default CreateNewExams;
