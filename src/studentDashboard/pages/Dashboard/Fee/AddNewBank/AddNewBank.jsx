import React, { useState, useEffect } from "react";
import "./AddNewBank.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

const AddNewBank = () => {
	const [bankDetails, setBankDetails] = useState({
		bankName: "",
		accountNumber: "",
		instructions: "",
		logo: null,
	});

	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBankDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		setBankDetails((prev) => ({ ...prev, logo: e.target.files[0] }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Bank Details Submitted:", bankDetails);
		alert("Bank added successfully!");
	};

	const bankList = [
		{
			id: 1,
			name: "Bank A",
			accountNumber: "1234567890",
		},
		{
			id: 2,
			name: "Bank B",
			accountNumber: "9876543210",
		},
		{
			id: 3,
			name: "Bank C",
			accountNumber: "5555555555",
		},
	];

	const filteredBankList = bankList.filter(
		(bank) =>
			bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			bank.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className="add-bank-container">
				<h2>Add New Bank</h2>
				<form onSubmit={handleSubmit} className="add-bank-form">
					{/* Logo Upload Section */}
					<div className="logo-upload">
						<div className="logo-preview">
							{bankDetails.logo ? (
								<img
									src={URL.createObjectURL(bankDetails.logo)}
									alt="Logo Preview"
									className="logo-image"
								/>
							) : (
								<div className="default-logo"></div>
							)}
						</div>
						<label htmlFor="logoUpload" className="upload-btn">
							Upload Logo
						</label>
						<input
							type="file"
							id="logoUpload"
							name="logo"
							accept="image/*"
							onChange={handleFileChange}
							hidden
						/>
					</div>

					{/* Bank Name and Account Number */}
					<div className="form-fields">
						<div className="input-group">
							<label>Bank Name*</label>
							<input
								type="text"
								name="bankName"
								placeholder="Enter your bank name"
								value={bankDetails.bankName}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="input-group">
							<label>Account Number*</label>
							<input
								type="text"
								name="accountNumber"
								placeholder="Enter account number"
								value={bankDetails.accountNumber}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					{/* Instructions */}
					<div className="input-group">
						<label>Instructions</label>
						<textarea
							name="instructions"
							placeholder="Enter any instructions"
							value={bankDetails.instructions}
							onChange={handleChange}
						></textarea>
					</div>

					{/* Submit Button */}
					<button type="submit" className="submit-btn">
						Add Bank
					</button>
				</form>

				<SearchBar
					searchQuery={searchTerm}
					setSearchQuery={setSearchTerm}
				/>

				<table>
					<tr>
						<th>Logo</th>
						<th>Bank Name</th>
						<th>Account Number</th>
						<th>Action</th>
					</tr>
					{filteredBankList.map((bank) => (
						<tr className="bank-item" key={bank.id}>
							<td className="bank-logo"></td>
							<td>{bank.name}</td>
							<td>{bank.accountNumber}</td>
							<td className="actions">
								<button className="edit-btn">
									<RiEdit2Line />
								</button>
								<button className="delete-btn">
									<RiDeleteBin6Line />
								</button>
							</td>
						</tr>
					))}
				</table>
			</div>
		</>
	);
};

export default AddNewBank;
