import React, { useState } from "react";
import "./FeeCollection.css";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { FaArrowLeftLong } from "react-icons/fa6";

const FeeCollection = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [dispResults, setDispResults] = useState(false);

	const handleSearch = () => {
		setSearchQuery("");
		setDispResults(true);
	};

	return (
		<div className="fee-collection-screen">
			{dispResults ? (
				<section>
					<aside>
						<span>
							<FaArrowLeftLong
								onClick={() => setDispResults(false)}
							/>
							<h3>Collect fees for student</h3>
						</span>
						<table>
							<tr>
								<th>Name</th>
								<th>Matric No</th>
								<th>Class</th>
								<th>Gender</th>
							</tr>
							<tr>
								<td>Oyin Balogun</td>
								<td>B3472833</td>
								<td>J.S.S.1</td>
								<td>Male</td>
							</tr>
						</table>
					</aside>

					<div className="select-term">
						<label htmlFor="term">Term</label>
						<select name="term" id="term">
							<option value="first">First</option>
							<option value="second">Second</option>
						</select>
					</div>

					<table>
						<tr>
							<th>S/N</th>
							<th>Particulars</th>
							<th>Amount</th>
						</tr>
						<tr>
							<td>1</td>
							<td>Admission Fee</td>
							<td>
								<input type="text" readOnly value={"5,000"} />
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Registration Fee</td>
							<td>
								<input type="text" readOnly value={"10,000"} />
							</td>
						</tr>
					</table>
					<article>
						<span>
							<h4>Total</h4>
							<h4>11,000</h4>
						</span>
						<span>
							<h4>Part Payment</h4>
							<input type="text" name="part-payment" />
						</span>
						<span>
							<h4>Due-able balance</h4>
							<h4>6000</h4>
						</span>
					</article>
				</section>
			) : (
				<>
					<h2> Collect fees from a student</h2>
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						handleClick={handleSearch}
					/>
				</>
			)}
		</div>
	);
};

export default FeeCollection;
