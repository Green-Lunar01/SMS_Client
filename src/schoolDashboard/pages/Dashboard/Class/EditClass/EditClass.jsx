import React, { useState } from "react";
import "./EditClass.css";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const EditClass = () => {
	return (
		<div className="edit-class-screen">
			<aside>
				<Link to="/school/dashboard/class">Create New Class</Link>
				<Link to="/school/dashboard/class">All Classes</Link>
			</aside>

			<Link to="/school/dashboard/class" className="back-link">
				<IoMdArrowBack />
			</Link>

			<div className="edit-class">
				<h3>Edit Class</h3>

				<label htmlFor="class-name">
					<p>Class Name *</p>
					<input
						type="text"
						id="class-name"
						placeholder="e.g J.S.S 1"
					/>
				</label>
				<label htmlFor="term-fee">
					<p>Class Name *</p>
					<input
						type="text"
						id="term-fee"
						placeholder="e.g N40,000"
					/>
				</label>
				<label htmlFor="class-teacher">
					<p>Class Teacher *</p>
					<select name="class-teacher" id="class-teacher">
						<option value="Mr John">Mr John</option>
						<option value="Mrs Jane">Mrs Jane</option>
					</select>
				</label>

				<button>Update</button>
			</div>
		</div>
	);
};

export default EditClass;
