import React, { useState, useRef, useContext } from "react";
import "./AddNewEmployee.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/SchoolContext";

const AddNewEmployee = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		profilePhoto: null,
		surname: "",
		first_name: "",
		monthly_salary: "",
		joined_at: "",
		role: "Teacher",
		phone_number: "",
		family_relation: "",
		blood_group: "A+",
		religion: "Christianity",
		date_of_birth: "",
		email: "",
		gender: "male",
		class_id: "",
		subject: "",
		education_level: "",
		address: "",
	});

	const { userToken } = useContext(UserContext);
	const { getEmployees, classes } = useContext(SchoolContext);
	const inputRef = useRef(null);

	// Helper function for date formatting
	const formatDateForAPI = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handlePhotoUpload = (e) => {
		setFormData({
			...formData,
			profilePhoto: e.target.files[0],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Define required fields
		const requiredFields = [
			"surname",
			"first_name",
			"monthly_salary",
			"joined_at",
			"role",
			"phone_number",
			"email",
			"gender",
			"religion",
			"date_of_birth",
		];

		// Check for empty required fields
		const missingRequiredFields = requiredFields.filter(
			(field) => !formData[field],
		);

		if (missingRequiredFields.length > 0) {
			toast.error(
				`The following required fields are missing: ${missingRequiredFields.join(", ")}`,
			);
			return;
		}

		setLoading(true);

		try {
			// Create FormData object for the entire request
			const submitFormData = new FormData();

			// Add all text fields to FormData
			submitFormData.append("surname", formData.surname);
			submitFormData.append("first_name", formData.first_name);
			submitFormData.append(
				"monthly_salary",
				Number(formData.monthly_salary),
			);
			submitFormData.append(
				"joined_at",
				formatDateForAPI(formData.joined_at),
			);
			submitFormData.append("email", formData.email);
			submitFormData.append("gender", formData.gender);
			submitFormData.append("religion", formData.religion);
			submitFormData.append("role", formData.role);
			submitFormData.append("phone_number", formData.phone_number);

			// Add optional fields only if they have values
			if (formData.family_relation) {
				submitFormData.append(
					"family_relation",
					formData.family_relation,
				);
			}

			submitFormData.append(
				"date_of_birth",
				formatDateForAPI(formData.date_of_birth),
			);

			if (formData.address) {
				submitFormData.append("address", formData.address);
			}

			if (formData.blood_group) {
				submitFormData.append("blood_group", formData.blood_group);
			}

			if (formData.education_level) {
				submitFormData.append(
					"education_level",
					formData.education_level,
				);
			}

			if (formData.subject) {
				submitFormData.append("subject", formData.subject);
			}

			if (formData.class_id) {
				submitFormData.append("class_id", Number(formData.class_id));
			}

			// Add profile photo if it exists
			if (formData.profilePhoto) {
				submitFormData.append("profile_photo", formData.profilePhoto);
			}

			// Make API request with FormData
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URL}/school/employees/create`,
				submitFormData,
				{
					headers: {
						Authorization: `${userToken}`,
						"Content-Type": "multipart/form-data",
					},
				},
			);

			toast.success("Employee added successfully");
			getEmployees(); // Refresh employee list
			resetForm(); // Reset form after successful submission
		} catch (err) {
			toast.error(err.response?.data?.message || "An error occurred");
			console.error("Error creating employee:", err);
		} finally {
			setLoading(false);
		}
	};

	// Reset form to initial state
	const resetForm = () => {
		setFormData({
			profilePhoto: null,
			surname: "",
			first_name: "",
			monthly_salary: "",
			joined_at: "",
			role: "Teacher",
			phone_number: "",
			family_relation: "",
			blood_group: "A+",
			religion: "Christianity",
			date_of_birth: "",
			email: "",
			gender: "male",
			class_id: "",
			subject: "",
			education_level: "",
			address: "",
		});
		// Clear file input
		if (inputRef.current) {
			inputRef.current.value = null;
		}
	};

	return (
		<div className="add-new-employee-container">
			<span>
				<h1>Employee Form</h1>
			</span>
			<form onSubmit={handleSubmit}>
				<div className="employee-info">
					<h3>Employee Information</h3>
					<main>
						<div className="profile-photo">
							{formData.profilePhoto ? (
								<img
									src={URL.createObjectURL(
										formData.profilePhoto,
									)}
									alt="Profile"
								/>
							) : (
								<div className="placeholder-photo">
									Upload Photo
								</div>
							)}
							<input
								type="file"
								name="profilePhoto"
								onChange={handlePhotoUpload}
								ref={inputRef}
							/>
							<button
								type="button"
								onClick={() => inputRef.current.click()}
							>
								Upload Photo
							</button>
						</div>
						<div className="form-group">
							<label htmlFor="surname">Employee Surname</label>
							<input
								type="text"
								id="surname"
								name="surname"
								value={formData.surname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="first_name">
								Employee First Name
							</label>
							<input
								type="text"
								id="first_name"
								name="first_name"
								value={formData.first_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="monthly_salary">
								Monthly Salary
							</label>
							<input
								type="number"
								placeholder="Enter Amount"
								id="monthly_salary"
								name="monthly_salary"
								value={formData.monthly_salary}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="role">Employee Role</label>
							<select
								id="role"
								name="role"
								value={formData.role}
								onChange={handleInputChange}
							>
								<option value="Teacher">Teacher</option>
								<option value="Principal">Principal</option>
								<option value="Management">Management</option>
								<option value="Accountant">Accountant</option>
								<option value="Cleaner">Cleaner</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="joined_at">Date of Joining</label>
							<input
								type="date"
								id="joined_at"
								name="joined_at"
								value={formData.joined_at}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone_number">
								Mobile No for SMS/WhatsApp
							</label>
							<input
								type="text"
								id="phone_number"
								name="phone_number"
								value={formData.phone_number}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="other-info">
					<h3>Other Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="family_relation">
								Father / Husband Name
							</label>
							<input
								type="text"
								id="family_relation"
								name="family_relation"
								value={formData.family_relation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="blood_group">Blood Group</label>
							<select
								name="blood_group"
								id="blood_group"
								value={formData.blood_group}
								onChange={handleInputChange}
							>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="religion">Religion</label>
							<select
								id="religion"
								name="religion"
								value={formData.religion}
								onChange={handleInputChange}
							>
								<option value="Christianity">
									Christianity
								</option>
								<option value="Islam">Islam</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="date_of_birth">Date of Birth</label>
							<input
								type="date"
								id="date_of_birth"
								name="date_of_birth"
								value={formData.date_of_birth}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="gender">Gender</label>
							<select
								name="gender"
								id="gender"
								value={formData.gender}
								onChange={handleInputChange}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="non-binary">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="class_id">Class</label>
							<select
								name="class_id"
								id="class_id"
								value={formData.class_id}
								onChange={handleInputChange}
							>
								<option value="">Select Class</option>
								{classes?.map((c) => (
									<option key={c.id} value={c.id}>
										{c.class_name}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="subject">Subject</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="education_level">
								Education Level
							</label>
							<select
								name="education_level"
								id="education_level"
								value={formData.education_level}
								onChange={handleInputChange}
							>
								<option value="">Select Education</option>
								<option value="Bsc">Bsc</option>
								<option value="Hnd">Hnd</option>
								<option value="Phd">Phd</option>
							</select>
						</div>
						<div className="form-group address">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<button type="submit" className="submit-btn" disabled={loading}>
					{loading ? <Spinner /> : "Add Employee"}
				</button>
			</form>
		</div>
	);
};

export default AddNewEmployee;
