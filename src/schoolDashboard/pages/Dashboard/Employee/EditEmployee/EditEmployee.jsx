import React, { useState, useRef, useEffect } from "react";
import "./EditEmployee.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";

const EditEmployee = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [employeeInfo, setEmployeeInfo] = useState({
		profilePhoto: null,
		surname: "",
		first_name: "",
		monthly_salary: "",
		joined_at: "",
		role: "",
		phone_number: "",
		family_relation: "",
		blood_group: "",
		religion: "",
		date_of_birth: "",
		email: "",
		gender: "",
		education_level: "",
		address: "",
	});
	const [photoPreview, setPhotoPreview] = useState(null);

	const inputRef = useRef(null);

	// Fetch employee details
	useEffect(() => {
		const fetchEmployeeDetails = async () => {
			setLoading(true);
			try {
				const response = await api.get(
					`school/employees?staffId=${id}`,
					{
						headers: {
							Authorization: `${localStorage.getItem("sms_token")}`,
						},
					},
				);

				const employeeData = response.data.data[0];

				// Format date strings for input fields
				const formatDateForInput = (dateString) => {
					if (!dateString) return "";
					const date = new Date(dateString);
					return date.toISOString().split("T")[0];
				};

				setEmployeeInfo({
					...employeeData,
					date_of_birth: formatDateForInput(
						employeeData.date_of_birth,
					),
					joined_at: formatDateForInput(employeeData.joined_at),
				});

				if (employeeData.profile_photo) {
					setPhotoPreview(employeeData.profile_photo);
				}
			} catch (error) {
				console.error(error);
				toast.error(
					error.response?.data?.message ||
						"Error fetching employee details",
				);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchEmployeeDetails();
		}
	}, [id]);

	const handleInputChange = (e) => {
		setEmployeeInfo({
			...employeeInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handlePhotoUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setEmployeeInfo({
				...employeeInfo,
				profilePhoto: file,
			});
			setPhotoPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			// Create form data for file upload
			const formData = new FormData();

			// Add all employeeInfo fields to formData
			Object.keys(employeeInfo).forEach((key) => {
				if (key === "profilePhoto" && employeeInfo[key]) {
					formData.append("profile_photo", employeeInfo[key]);
				} else if (
					key !== "profilePhoto" &&
					employeeInfo[key] !== null
				) {
					formData.append(key, employeeInfo[key]);
				}
			});

			// Update employee
			const response = await api.put(
				`/school/employees/edit/${id}`,
				formData,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
						"Content-Type": "multipart/form-data",
					},
				},
			);

			toast.success("Employee updated successfully");
			navigate(`/school/dashboard/viewemployee/${id}`);
		} catch (error) {
			console.error(error);
			toast.error(
				error.response?.data?.message || "Error updating employee",
			);
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="edit-employee-container">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="edit-employee-container">
			<span>
				<Link to="/school/dashboard/employees?tab=all">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>Edit Employee</h1>
			</span>
			<form onSubmit={handleSubmit}>
				<div className="employee-info">
					<h3>Employee Information</h3>
					<main>
						<div className="profile-photo">
							{photoPreview ? (
								<img src={photoPreview} alt="Profile" />
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
								accept="image/*"
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
								value={employeeInfo.surname || ""}
								onChange={handleInputChange}
								required
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
								value={employeeInfo.first_name || ""}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="monthly_salary">
								Monthly Salary
							</label>
							<input
								type="text"
								placeholder="Enter Amount"
								id="monthly_salary"
								name="monthly_salary"
								value={employeeInfo.monthly_salary || ""}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="role">Employee Role</label>
							<select
								id="role"
								name="role"
								value={employeeInfo.role || ""}
								onChange={handleInputChange}
								required
							>
								<option value="">Select Role</option>
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
								value={employeeInfo.joined_at || ""}
								onChange={handleInputChange}
								required
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
								value={employeeInfo.phone_number || ""}
								onChange={handleInputChange}
								required
							/>
						</div>
					</main>
				</div>
				<div className="other-info">
					<h3>Other Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="family_relation">
								Guardian / Sponsor
							</label>
							<input
								type="text"
								id="family_relation"
								name="family_relation"
								value={employeeInfo.family_relation || ""}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="blood_group">Blood Group</label>
							<select
								name="blood_group"
								id="blood_group"
								value={employeeInfo.blood_group || ""}
								onChange={handleInputChange}
							>
								<option value="">Select Blood Group</option>
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
								value={employeeInfo.religion || ""}
								onChange={handleInputChange}
							>
								<option value="">Select Religion</option>
								<option value="Christianity">
									Christianity
								</option>
								<option value="Islam">Islam</option>
								<option value="Hindu">Hindu</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="date_of_birth">Date of Birth</label>
							<input
								type="date"
								id="date_of_birth"
								name="date_of_birth"
								value={employeeInfo.date_of_birth || ""}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<input
								type="email"
								id="email"
								name="email"
								value={employeeInfo.email || ""}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="gender">Gender</label>
							<select
								name="gender"
								id="gender"
								value={employeeInfo.gender || ""}
								onChange={handleInputChange}
								required
							>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<div className="form-group address">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								name="address"
								value={employeeInfo.address || ""}
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
								value={employeeInfo.education_level || ""}
								onChange={handleInputChange}
							>
								<option value="">Select Education Level</option>
								<option value="High School">High School</option>
								<option value="Associate Degree">
									Associate Degree
								</option>
								<option value="Bsc">Bachelor's Degree</option>
								<option value="Msc">Master's Degree</option>
								<option value="PhD">Doctorate</option>
								<option value="Other">Other</option>
							</select>
						</div>
					</main>
				</div>
				<button
					type="submit"
					className="submit-btn"
					disabled={submitting}
				>
					{submitting ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
};

export default EditEmployee;
