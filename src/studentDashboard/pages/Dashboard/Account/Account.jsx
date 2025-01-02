import React, { useState } from "react";
import "./Account.css";
import ChartOfAccount from "./ChartOfAccount/ChartOfAccount";
import AddIncome from "./AddIncome/AddIncome";
import AddExpense from "./AddExpense/AddExpense";
import AccountStatement from "./AccountStatement/AccountStatement";

const Account = () => {
	const [tab, setTab] = useState("one");

	return (
		<div className="account-screen">
			<aside>
				<button
					onClick={() => setTab("one")}
					className={tab === "one" ? "active" : ""}
				>
					Chart of Account
				</button>
				<button
					onClick={() => setTab("two")}
					className={tab === "two" ? "active" : ""}
				>
					Add Income
				</button>
				<button
					onClick={() => setTab("three")}
					className={tab === "three" ? "active" : ""}
				>
					Add Expense
				</button>
				<button
					onClick={() => setTab("four")}
					className={tab === "four" ? "active" : ""}
				>
					Account Statement
				</button>
			</aside>

			{tab === "one" && <ChartOfAccount />}
			{tab === "two" && <AddIncome />}
			{tab === "three" && <AddExpense />}
			{tab === "four" && <AccountStatement />}
		</div>
	);
};

export default Account;
