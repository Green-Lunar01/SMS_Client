import React, { useState } from "react";
import "./Profile.css";
import CountrySelector from "../../../../components/CountrySelector/CountrySelector";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [schoolName, setSchoolName] = useState("");
	const [country, setCountry] = useState("");
	const [schoolLogo, setSchoolLogo] = useState(userBlueIcon);
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [tagline, setTagline] = useState("");
	const [website, setWebsite] = useState("");

	const navigate = useNavigate();

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

	const [loading, setLoading] = useState(false);

	const updateProfile = async () => {
		if (
			!schoolName ||
			!country ||
			!phone ||
			!address ||
			!tagline ||
			!website
		) {
			toast.error("All fields are required");
			return;
		}

		const data = new FormData();
		data.append("profile_image", schoolLogo);
		data.append("school_name", schoolName);
		data.append("country", country);
		data.append("phone_number", phone);
		data.append("address", address);
		data.append("tagline", tagline);
		data.append("website_url", website);

		setLoading(true);

		try {
			const response = await api.put(`/school/update-profile`, data, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			toast.success("Profile updated successfully");
			setLoading(false);
			navigate("/school/dashboard/insights");
		} catch (err) {
			console.error("Error updating proflie:", err);
			toast.error(
				"Failed to update proflie. Please refresh or try again later.",
			);
			setLoading(false);
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
							value={schoolName}
							onChange={(e) => setSchoolName(e.target.value)}
						/>
					</label>
					<label htmlFor="phone-number">
						<p>Phone Number*</p>
						<input
							type="number"
							id="phone-number"
							placeholder="Phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</label>
					<label htmlFor="school-address">
						<p>School Address*</p>
						<textarea
							name="school-address"
							id="school-address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
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
							value={tagline}
							onChange={(e) => setTagline(e.target.value)}
						/>
					</label>
					<label htmlFor="country">
						<p>Country*</p>

						<CountrySelector setCountry={setCountry} />
					</label>
					<label htmlFor="website">
						<p>Website*</p>
						<input
							type="text"
							id="website"
							placeholder="Website URL"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
						/>
					</label>
				</section>
			</form>

			<button onClick={updateProfile} disabled={loading}>
				{loading ? "Updating..." : "Update Profile"}
			</button>
		</div>
	);
};

export default Profile;
