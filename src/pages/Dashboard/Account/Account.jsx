import React, { useState } from "react";
import "./Account.css";

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
		</div>
	);
};

export default Account;
