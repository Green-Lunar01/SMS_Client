import React, { useState } from "react";
import "./AddIncome.css";

const AddIncome = () => {
	const [date, setDate] = useState(new Date());
	const [particular, setParticular] = useState("");
	const [amount, setAmount] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Date:", date);
		console.log("Particular:", particular);
		console.log("Amount:", amount);
	};

	return (
		<div className="add-income-screen">
			<h2>Add Income</h2>

			<form>
				<div className="form-group">
					<label htmlFor="date">Date</label>
					<input type="date" id="date" placeholder="Enter date" />
				</div>
				<div className="form-group">
					<label htmlFor="particular">Income Description</label>
					<input
						type="text"
						id="particular"
						placeholder="Enter your particular"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="amount">Income Amount</label>
					<input
						type="number"
						id="amount"
						placeholder="Enter amount"
					/>
				</div>

				<button
					type="submit"
					className="primary-btn"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddIncome;
