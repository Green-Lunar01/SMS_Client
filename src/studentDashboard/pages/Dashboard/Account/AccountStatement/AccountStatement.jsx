import React, { useState } from "react";
import "./AccountStatement.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import noReport from "../../../../assets/no-report.png";
import pdfIcon from "../../../../assets/pdf-icon.png";
import xlsIcon from "../../../../assets/xls-icon.png";
import csvIcon from "../../../../assets/csv-icon.png";
import { RiDeleteBinLine } from "react-icons/ri";

const AccountStatement = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const sampleData = [
		{
			id: 1,
			date: "01/01/2023",
			description: "Description 1",
			debit: "₦1,000",
			credit: "₦0",
			netBalance: "₦1,000",
		},
		{
			id: 2,
			date: "01/01/2023",
			description: "Description 2",
			debit: "₦0",
			credit: "₦1,000",
			netBalance: "₦1,000",
		},
		{
			id: 3,
			date: "01/01/2023",
			description: "Description 3",
			debit: "₦0",
			credit: "₦1,000",
			netBalance: "₦1,000",
		},
	];

	return (
		<div className="account-statement-screen">
			<section className="top">
				<input type="date" name="dateFrom" id="dateFrom" />
				<p>to</p>
				<input type="date" name="dateTo" id="dateTo" />
			</section>

			<section className="mid">
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>

				<aside>
					<div>
						<img src={pdfIcon} alt="" />
					</div>
					<div>
						<img src={xlsIcon} alt="" />
					</div>
					<div>
						<img src={csvIcon} alt="" />
					</div>
					<div>
						<RiDeleteBinLine />
					</div>
				</aside>
			</section>

			<section className="bottom">
				<table className="record-table">
					<tr>
						<th>Date</th>
						<th>Description</th>
						<th>Debit</th>
						<th>Credit</th>
						<th>Net Balance</th>
					</tr>
					{sampleData.length > 0 ? (
						sampleData.map((item) => (
							<tr>
								<td>{item.date}</td>
								<td>{item.description}</td>
								<td>{item.debit}</td>
								<td>{item.credit}</td>
								<td>{item.netBalance}</td>
							</tr>
						))
					) : (
						<>
							<div className="no-report">
								<img src={noReport} alt="no report" />
								<p>No Record</p>
							</div>
						</>
					)}
				</table>
			</section>
		</div>
	);
};

export default AccountStatement;
