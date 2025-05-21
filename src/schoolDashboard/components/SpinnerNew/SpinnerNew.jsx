import React from "react";
import "./SpinnerNew.css";

const SpinnerNew = () => {
	return (
		<div className="spinner-new">
			<div className="border-element">
				<div className="green-bg">
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</div>
			</div>

			<p>Loading...</p>
		</div>
	);
};

export default SpinnerNew;
