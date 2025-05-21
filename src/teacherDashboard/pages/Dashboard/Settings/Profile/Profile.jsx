import React, { useState } from "react";
import "./Profile.css";
import CountrySelector from "../../../../components/CountrySelector/CountrySelector";
import userBlueIcon from "../../../../assets/user-blue-icon.png";

const Profile = () => {
	const [schoolName, setSchoolName] = useState("");
	const [country, setCountry] = useState("");
	const [schoolLogo, setSchoolLogo] = useState(userBlueIcon);
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [tagline, setTagline] = useState("");

	const uploadFile = () => {
		const fileInput = document.getElementById("school-logo");
		fileInput.click();
	};

	// Handle file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// Create a URL for the uploaded file
			const imageUrl = URL.createObjectURL(file);
			setSchoolLogo(imageUrl);
		}
	};

	return (
		<div className="update-profile-container">
			<h2>Update Profile</h2>
			<form className="update-profile-form">
				<section>
					<label htmlFor="school-logo">
						<p>School Logo*</p>

						<div>
							<img src={schoolLogo} alt="school-logo" />
							<input
								type="file"
								name="school-logo"
								id="school-logo"
								onChange={handleFileChange}
								accept="image/*"
							/>
							<button onClick={uploadFile} type="button">
								Upload Photo
							</button>
						</div>
					</label>
				</section>

				<section>
					<label htmlFor="school-name">
						<p>School Name*</p>
						<input
							type="text"
							id="school-name"
							placeholder="Enter Institution"
						/>
					</label>
					<label htmlFor="phone-number">
						<p>Phone Number*</p>
						<input
							type="number"
							id="phone-number"
							placeholder="Phone"
						/>
					</label>
					<label htmlFor="school-address">
						<p>School Address*</p>
						<textarea
							name="school-address"
							id="school-address"
						></textarea>
					</label>
				</section>

				<section>
					<label htmlFor="tagline">
						<p>Tagline*</p>
						<input
							type="text"
							id="tagline"
							placeholder="Enter Tagline"
						/>
					</label>
					<label htmlFor="country">
						<p>Country*</p>

						<CountrySelector />
					</label>
					<label htmlFor="website">
						<p>Website*</p>
						<input
							type="text"
							id="website"
							placeholder="Website URL"
						/>
					</label>
				</section>
			</form>

			<button>Update</button>
		</div>
	);
};

export default Profile;
