import React, { useState } from "react";
import "./MarksGradingSetup.css";

const MarksGradingSetup = () => {
	return (
		<div className="grading-container">
			<h2>Rules and Regulations</h2>

			<main>
				<div className="top">
					<button>Marks Grading Setup</button>
				</div>

				<aside>
					<h4>Personalise the Grading</h4>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="A+" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="80" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="100" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="A" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="70" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="79" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="B+" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="60" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="69" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="B" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="50" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="59" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="C" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="40" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="49" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="D" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="33" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="39" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Pass" />
						</label>
					</div>

					<div className="grade-row">
						<label>
							<p>Grade *</p>
							<input type="text" value="F" />
						</label>

						<label>
							<p>%From *</p>
							<input type="text" value="2" />
						</label>

						<label>
							<p>%Upto *</p>
							<input type="text" value="32" />
						</label>

						<label>
							<p>Status *</p>
							<input type="text" value="Fail" />
						</label>
					</div>
				</aside>

				<button>Save Changes</button>
			</main>
		</div>
	);
};

export default MarksGradingSetup;
