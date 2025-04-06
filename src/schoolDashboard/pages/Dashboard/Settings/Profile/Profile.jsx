import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import CountrySelector from "../../../../components/CountrySelector/CountrySelector";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SchoolContext } from "../../../../context/schoolContext";

const Profile = () => {
	const { schoolProfile, setSchoolProfile } = useContext(SchoolContext);
	const [schoolName, setSchoolName] = useState(
		schoolProfile?.school_name || "",
	);
	const [country, setCountry] = useState(schoolProfile?.country || "");
	const [schoolLogo, setSchoolLogo] = useState(
		schoolProfile?.photo || userBlueIcon,
	);
	const [selectedFile, setSelectedFile] = useState(null);
	const [phone, setPhone] = useState(schoolProfile?.phone_number || "");
	const [email, setEmail] = useState(schoolProfile?.email || "");
	const [address, setAddress] = useState(schoolProfile?.address || "");
	const [tagline, setTagline] = useState(schoolProfile?.tagline || "");
	const [website, setWebsite] = useState(schoolProfile?.website_url || "");

	const navigate = useNavigate();

	// Update state values when schoolProfile changes
	useEffect(() => {
		if (schoolProfile) {
			setSchoolName(schoolProfile.school_name || "");
			setCountry(schoolProfile.country || "");
			setSchoolLogo(schoolProfile.photo || userBlueIcon);
			setPhone(schoolProfile.phone_number || "");
			setEmail(schoolProfile.email || "");
			setAddress(schoolProfile.address || "");
			setTagline(schoolProfile.tagline || "");
			setWebsite(schoolProfile.website_url || "");
		}
	}, [schoolProfile]);

	const uploadFile = () => {
		const fileInput = document.getElementById("school-logo");
		fileInput.click();
	};

	// Handle file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			// Store the file for later upload
			setSelectedFile(file);
			// Create a URL for preview
			const imageUrl = URL.createObjectURL(file);
			setSchoolLogo(imageUrl);
		}
	};

	const [loading, setLoading] = useState(false);

	const updateProfile = async () => {
		if (!schoolName || !country || !address || !tagline || !website) {
			toast.error("Required fields are missing");
			return;
		}

		const data = new FormData();
		// Only append the file if a new one was selected
		if (selectedFile) {
			data.append("profile_image", selectedFile);
		}
		data.append("school_name", schoolName);
		data.append("country", country);
		data.append("phone_number", phone);
		data.append("address", address);
		data.append("tagline", tagline);
		data.append("website_url", website);
		data.append("email", email);

		setLoading(true);

		try {
			const response = await api.put(`/school/update-profile`, data, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			// Update the context with new profile data
			if (response.data && response.data.data) {
				setSchoolProfile(response.data.data);
			}

			toast.success("Profile updated successfully");
			setLoading(false);
			window.location.reload();
		} catch (err) {
			console.error("Error updating profile:", err);
			toast.error(
				"Failed to update profile. Please refresh or try again later.",
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
							<img
								src={schoolLogo}
								alt="school-logo"
								onError={(e) => {
									e.target.onerror = null; // Prevent looping
									e.target.src = userBlueIcon;
								}}
							/>
							<input
								type="file"
								name="school-logo"
								id="school-logo"
								onChange={handleFileChange}
								accept="image/*"
								style={{ display: "none" }}
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
					<label htmlFor="email">
						<p>Email Address*</p>
						<input
							type="email"
							id="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label htmlFor="school-address">
						<p>School Address*</p>
						<textarea
							name="school-address"
							id="school-address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Enter School Address"
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
						<input
							type="text"
							name="country"
							id="country"
							placeholder="Enter Country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</label>
					<label htmlFor="phone">
						<p>Phone Number</p>
						<input
							type="tel"
							id="phone"
							placeholder="Enter Phone Number"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
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
