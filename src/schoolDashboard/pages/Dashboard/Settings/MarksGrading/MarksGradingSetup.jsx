import React, { useState, useEffect } from "react";
import "./MarksGradingSetup.css";
import api from "../../../../lib/axios"; // Adjust the path as needed
import { toast } from "react-hot-toast";

const MarksGradingSetup = () => {
	const [grades, setGrades] = useState([
		{ grade: "A+", from: 80, to: 100, remark: "Pass" },
		{ grade: "A", from: 70, to: 79, remark: "Pass" },
		{ grade: "B+", from: 60, to: 69, remark: "Pass" },
		{ grade: "B", from: 50, to: 59, remark: "Pass" },
		{ grade: "C", from: 40, to: 49, remark: "Pass" },
		{ grade: "D", from: 33, to: 39, remark: "Pass" },
		{ grade: "F", from: 0, to: 32, remark: "Fail" },
	]);
	const [loading, setLoading] = useState(false);
	const [fetchLoading, setFetchLoading] = useState(true);

	// Fetch current grading system when component mounts
	useEffect(() => {
		fetchGradingSystem();
	}, []);

	const fetchGradingSystem = async () => {
		setFetchLoading(true);

		try {
			const response = await api.get("/school/get-grading-system", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			console.log(response.data.data);

			// if (response.data.success && response.data.data) {
			const formattedGrades = response.data.data.map((grade) => ({
				grade: grade.grade_name,
				from: grade.min_score,
				to: grade.max_score,
				remark: grade.grade_remark,
			}));

			// Sort by 'from' score in descending order
			formattedGrades.sort((a, b) => b.from - a.from);

			setGrades(formattedGrades);
			// }
		} catch (err) {
			console.error("Error fetching grading system:", err);

			if (err.response && err.response.status === 401) {
				toast.error("You are not authorized to view this information.");
			} else {
				toast.error(
					"Could not load grading system. Please try again later.",
				);
			}
		} finally {
			setFetchLoading(false);
		}
	};

	const handleInputChange = (index, field, value) => {
		const updatedGrades = [...grades];

		// Handle numeric fields
		if (field === "from" || field === "to") {
			value = value === "" ? "" : parseInt(value, 10);

			// Don't allow non-numeric values
			if (isNaN(value)) return;
		}

		updatedGrades[index][field] = value;
		setGrades(updatedGrades);
	};

	const addGradeRow = () => {
		// Find the lowest 'from' value
		const lowestFrom = Math.min(...grades.map((g) => g.from));

		// Add a new row with values that don't overlap
		setGrades([
			...grades,
			{
				grade: "",
				from: Math.max(0, lowestFrom - 10),
				to: lowestFrom - 1,
				remark: "Pass",
			},
		]);
	};

	const removeGradeRow = (index) => {
		if (grades.length <= 1) {
			toast.error("You must have at least one grade level");
			return;
		}

		const updatedGrades = grades.filter((_, i) => i !== index);
		setGrades(updatedGrades);
	};

	const validateGrades = () => {
		// Sort by 'from' value to check for gaps and overlaps
		const sortedGrades = [...grades].sort((a, b) => b.from - a.from);

		// Check that all required fields are filled
		for (const grade of sortedGrades) {
			if (
				!grade.grade ||
				grade.from === "" ||
				grade.to === "" ||
				!grade.remark
			) {
				toast.error("All fields are required for each grade row");
				return false;
			}
		}

		// Check for range validity (from < to)
		for (const grade of sortedGrades) {
			if (grade.from >= grade.to) {
				toast.error(
					`Invalid range for grade ${grade.grade}: 'From' must be less than 'To'`,
				);
				return false;
			}
		}

		// Check for the full range coverage (0-100)
		const maxScore = Math.max(...sortedGrades.map((g) => g.to));
		const minScore = Math.min(...sortedGrades.map((g) => g.from));

		if (maxScore !== 100) {
			toast.error("The highest 'To' value must be 100");
			return false;
		}

		if (minScore !== 0) {
			toast.error("The lowest 'From' value must be 0");
			return false;
		}

		// Check for gaps and overlaps
		for (let i = 0; i < sortedGrades.length - 1; i++) {
			const currentGrade = sortedGrades[i];
			const nextGrade = sortedGrades[i + 1];

			// Check for gaps
			if (currentGrade.from - 1 !== nextGrade.to) {
				toast.error(
					`Gap detected between grades ${currentGrade.grade} and ${nextGrade.grade}`,
				);
				return false;
			}
		}

		return true;
	};

	const saveGradingSystem = async () => {
		if (!validateGrades()) return;

		setLoading(true);

		try {
			// Format the data according to the API requirements
			const formattedGrades = grades.map((grade) => ({
				from: grade.from,
				to: grade.to,
				grade: grade.grade,
				remark: grade.remark,
			}));

			const response = await api.put(
				"/school/update-grading-system",
				formattedGrades,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.status === 200) {
				toast.success("Grading system updated successfully");
			}
		} catch (err) {
			console.error("Error updating grading system:", err);

			if (err.response && err.response.status === 400) {
				toast.error(
					"Invalid grading system. Please check for gaps or overlaps.",
				);
			} else if (err.response && err.response.status === 401) {
				toast.error(
					"You are not authorized to update the grading system.",
				);
			} else {
				toast.error(
					"Failed to update grading system. Please try again later.",
				);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grading-container">
			<h2>Rules and Regulations</h2>

			<main>
				<div className="top">
					<button>Marks Grading Setup</button>
					{fetchLoading && <p>Loading grading system...</p>}
				</div>

				<aside>
					<h4>Personalise the Grading</h4>

					<div className="actions-row">
						<button onClick={addGradeRow} className="add-button">
							+ Add Grade
						</button>
						<p>Set grades from 0 to 100 without gaps or overlaps</p>
					</div>

					{grades.map((grade, index) => (
						<div className="grade-row" key={index}>
							<label>
								<p>Grade *</p>
								<input
									type="text"
									value={grade.grade}
									onChange={(e) =>
										handleInputChange(
											index,
											"grade",
											e.target.value,
										)
									}
									placeholder="e.g. A+"
								/>
							</label>

							<label>
								<p>%From *</p>
								<input
									type="number"
									min="0"
									max="99"
									value={grade.from}
									onChange={(e) =>
										handleInputChange(
											index,
											"from",
											e.target.value,
										)
									}
									placeholder="e.g. 80"
								/>
							</label>

							<label>
								<p>%Upto *</p>
								<input
									type="number"
									min="1"
									max="100"
									value={grade.to}
									onChange={(e) =>
										handleInputChange(
											index,
											"to",
											e.target.value,
										)
									}
									placeholder="e.g. 100"
								/>
							</label>

							<label>
								<p>Status *</p>
								<input
									type="text"
									value={grade.remark}
									onChange={(e) =>
										handleInputChange(
											index,
											"remark",
											e.target.value,
										)
									}
									placeholder="e.g. Pass"
								/>
							</label>

							{grades.length > 1 && (
								<button
									className="remove-button"
									onClick={() => removeGradeRow(index)}
									type="button"
								>
									Remove
								</button>
							)}
						</div>
					))}
				</aside>

				<button onClick={saveGradingSystem} disabled={loading}>
					{loading ? "Saving..." : "Save Changes"}
				</button>
			</main>
		</div>
	);
};

export default MarksGradingSetup;
