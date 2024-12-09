import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ title, count, month, color, currency, icon }) => {
	return (
		<div className="summary-card" style={{ backgroundColor: color }}>
			<h3>{title}</h3>
			<h2>
				<span>
					{currency && currency}
					{icon && icon}
				</span>{" "}
				<span>{count}</span>
			</h2>
			<p>{month}</p>
		</div>
	);
};

export default SummaryCard;
