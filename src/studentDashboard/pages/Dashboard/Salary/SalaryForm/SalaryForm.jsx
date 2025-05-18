import React, { useState } from "react";
import "./SalaryForm.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const SalaryForm = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [tab, setTab] = useState(true);

	const [formData, setFormData] = useState({
		salaryMonth: "",
		salaryDate: "",
		salaryAmount: "",
		bonus: "",
		deduction: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Submitted:", formData);
		alert("Salary details submitted successfully!");
	};

	return (
		<div className="salary-form-screen">
			{tab ? (
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					handleClick={() => setTab(false)}
				/>
			) : (
				<div className="salary-form-container">
					<div className="header">
						<div className="header-item">
							<p>Employee Role</p>
							<h4>Teacher</h4>
						</div>
						<div className="header-item">
							<p>Employee Name</p>
							<h4>Philip Nienow</h4>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="salary-form">
						<section>
							<div className="input-group">
								<label>Salary Month</label>
								<input
									type="text"
									name="salaryMonth"
									placeholder="September"
									value={formData.salaryMonth}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input-group">
								{/* <label>Salary Date</label> */}
								<input
									type="date"
									name="salaryDate"
									value={formData.salaryDate}
									onChange={handleChange}
									required
								/>
							</div>
						</section>
						<section>
							<div className="input-group">
								<label>Salary Amount</label>
								<input
									type="number"
									name="salaryAmount"
									placeholder="Enter amount"
									value={formData.salaryAmount}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="input-group">
								<label>Bonus</label>
								<input
									type="number"
									name="bonus"
									placeholder="Enter bonus"
									value={formData.bonus}
									onChange={handleChange}
								/>
							</div>
							<div className="input-group">
								<label>Deduction</label>
								<input
									type="number"
									name="deduction"
									placeholder="Enter deduction"
									value={formData.deduction}
									onChange={handleChange}
								/>
							</div>
						</section>
						<button type="submit" className="primary-btn">
							Submit
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default SalaryForm;
