import React from "react";
import "./NewAdmissions.css";
import userBlueIcon from "../../assets/user-blue-icon.png";
import newAdmissionsEmpty from "../../assets/new-admissions-empty.png";

const NewAdmissions = () => {
	const admissions = [
		{ id: "B3456700", name: "Oyin Balogun", class: "J.S.S. 2" },
		{ id: "B3456701", name: "Lynda Steuber", class: "J.S.S. 2" },
		{ id: "B3456702", name: "Caleb Beer", class: "J.S.S. 2" },
		{ id: "B3456703", name: "Leslie Rick", class: "J.S.S. 2" },
		{ id: "B3456700", name: "Oyin Balogun", class: "J.S.S. 2" },
		{ id: "B3456701", name: "Lynda Steuber", class: "J.S.S. 2" },
		{ id: "B3456702", name: "Caleb Beer", class: "J.S.S. 2" },
		{ id: "B3456703", name: "Leslie Rick", class: "J.S.S. 2" },
	];

	return (
		<div
			style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}
			className="new-admissions"
		>
			<h3>New Admissions</h3>
			{admissions.length !== 0 ? (
				<aside>
					<img src={newAdmissionsEmpty} alt="" />
					<p>No students admitted yet.</p>
				</aside>
			) : (
				<main>
					{admissions.map((student, index) => (
						<article key={index}>
							<div>
								<img src={userBlueIcon} alt="user icon" />
							</div>
							<p>{student.id}</p>
							<h6>{student.name}</h6>
							<p>{student.class}</p>
						</article>
					))}
				</main>
			)}
		</div>
	);
};

export default NewAdmissions;
