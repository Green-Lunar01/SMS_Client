import React, { useState, useRef, useEffect, useContext } from "react";
import "./EditStudent.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../../lib/axios";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/SchoolContext";

const EditStudent = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		surname: "",
		first_name: "",
		other_names: "",
		profile_photo: null,
		date_of_admission: "",
		class_id: null,
		gender: "",
		matric_number: "",
		date_of_birth: "",
		phone_number: "",
		religion: "",
		previous_school: "",
		blood_group: "",
		disease: "",
		address: "",
		is_orphan: false,
		fathers_name: "",
		fathers_occupation: "",
		fathers_number: "",
		fathers_education: "",
		fathers_address: "",
		mothers_name: "",
		mothers_occupation: "",
		mothers_number: "",
		mothers_education: "",
		mothers_address: "",
	});

	const { id } = useParams();
	const navigate = useNavigate();
	const inputRef = useRef(null);
	const { userToken } = useContext(UserContext);
	const { classes } = useContext(SchoolContext);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

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
			profile_photo: e.target.files[0],
		});
	};

	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
	};

	const fetchStudentData = async () => {
		setLoading(true);

		try {
			const response = await api.get(`/school/students/${id}`, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});

			const studentData = response.data.data;
			// console.log("Student data:", studentData);

			setProfilePhotoUrl(studentData.profile_photo);

			setFormData({
				surname: studentData.surname || "",
				first_name: studentData.first_name || "",
				other_names: studentData.other_names || "",
				profile_photo: null,
				date_of_admission:
					formatDate(studentData.date_of_admission) || "",
				class_id: studentData.class_id || "",
				gender: studentData.gender || "",
				matric_number: studentData.matric_number || "",
				date_of_birth: formatDate(studentData.date_of_birth) || "",
				phone_number: studentData.phone_number || "",
				religion: studentData.religion || "",
				previous_school: studentData.previous_school || "",
				blood_group: studentData.blood_group || "",
				disease: studentData.disease || "",
				address: studentData.address || "",
				is_orphan: studentData.is_orphan || false,
				fathers_name: studentData.fathers_name || "",
				fathers_occupation: studentData.fathers_occupation || "",
				fathers_number: studentData.fathers_number || "",
				fathers_education: studentData.fathers_education || "",
				fathers_address: studentData.fathers_address || "",
				mothers_name: studentData.mothers_name || "",
				mothers_occupation: studentData.mothers_occupation || "",
				mothers_number: studentData.mothers_number || "",
				mothers_education: studentData.mothers_education || "",
				mothers_address: studentData.mothers_address || "",
			});
		} catch (err) {
			console.error("Error fetching student:", err);
			toast.error(
				"Failed to load student data. Please refresh or try again later.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requiredFields = [
			"surname",
			"first_name",
			"class_id",
			"gender",
			"matric_number",
			"date_of_birth",
			"phone_number",
			"religion",
		];

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
			// Create a FormData object if there's a profile photo to upload
			let dataToSend = { ...formData };

			if (
				typeof dataToSend.class_id === "string" &&
				dataToSend.class_id
			) {
				dataToSend.class_id = Number(dataToSend.class_id);
			}

			// Convert "true"/"false" string to actual boolean for is_orphan if needed
			if (typeof dataToSend.is_orphan === "string") {
				dataToSend.is_orphan = dataToSend.is_orphan === "true";
			}

			const response = await api.put(
				`/school/students/edit/${id}`,
				dataToSend,
				{
					headers: {
						Authorization: `${localStorage.getItem("sms_token")}`,
						"Content-Type": "application/json",
					},
				},
			);

			// Handle profile photo upload separately if a new one is provided
			if (formData.profile_photo) {
				const photoFormData = new FormData();
				photoFormData.append("profile_photo", formData.profile_photo);

				await api.post(
					`/school/students/${id}/upload-photo`,
					photoFormData,
					{
						headers: {
							Authorization: `${localStorage.getItem("sms_token")}`,
							"Content-Type": "multipart/form-data",
						},
					},
				);
			}

			toast.success("Student updated successfully");
			navigate("/school/dashboard/students");
		} catch (err) {
			toast.error(
				err.response?.data?.message ||
					"An error occurred while updating student",
			);
			console.error("Error updating student:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchStudentData();
	}, [id]);

	if (loading && !formData.surname) {
		return <Spinner />;
	}

	return (
		<div className="edit-student-container">
			<span>
				<Link to="/school/dashboard/students">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>Edit Student</h1>
			</span>
			<form onSubmit={handleSubmit}>
				<div className="student-info">
					<h3>Student Information</h3>
					<main>
						<div className="profile-photo">
							{formData.profile_photo ? (
								<img
									src={URL.createObjectURL(
										formData.profile_photo,
									)}
									alt="Profile"
								/>
							) : profilePhotoUrl ? (
								<img src={profilePhotoUrl} alt="Profile" />
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
							<label htmlFor="surname">Student Surname</label>
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
								Student First Name
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
							<label htmlFor="other_names">Other Names</label>
							<input
								type="text"
								id="other_names"
								name="other_names"
								value={formData.other_names}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="date_of_admission">
								Date of Admission
							</label>
							<input
								type="date"
								id="date_of_admission"
								name="date_of_admission"
								value={formData.date_of_admission}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="class_id">Class</label>
							<select
								id="class_id"
								name="class_id"
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
							<label htmlFor="gender">Gender</label>
							<select
								id="gender"
								name="gender"
								value={formData.gender}
								onChange={handleInputChange}
							>
								<option value="" disabled>
									Select Gender
								</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="non-binary">Non-binary</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="matric_number">Matric Number</label>
							<input
								type="text"
								id="matric_number"
								name="matric_number"
								value={formData.matric_number}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="other-info">
					<h3>Other Information</h3>
					<main>
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
							<label htmlFor="phone_number">
								Phone number WhatsApp
							</label>
							<input
								type="text"
								id="phone_number"
								name="phone_number"
								value={formData.phone_number}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="religion">Religion</label>
							<select
								id="religion"
								name="religion"
								value={formData.religion}
								onChange={handleInputChange}
							>
								<option value="" disabled>
									Select Religion
								</option>
								<option value="Christianity">
									Christianity
								</option>
								<option value="Islam">Islam</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="previous_school">
								Previous School
							</label>
							<input
								type="text"
								id="previous_school"
								name="previous_school"
								value={formData.previous_school}
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
								<option value="" disabled>
									Select blood group
								</option>
								<option value="A+">A+</option>
								<option value="A-">A-</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
								<option value="AB+">AB+</option>
								<option value="AB-">AB-</option>
								<option value="O+">O+</option>
								<option value="O-">O-</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="disease">Disease If Any</label>
							<input
								type="text"
								id="disease"
								name="disease"
								value={formData.disease}
								onChange={handleInputChange}
							/>
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
						<div className="form-group">
							<label htmlFor="is_orphan">Orphan Student</label>
							<select
								id="is_orphan"
								name="is_orphan"
								value={formData.is_orphan}
								onChange={handleInputChange}
							>
								<option value="false">No</option>
								<option value="true">Yes</option>
							</select>
						</div>
					</main>
				</div>
				<div className="father-info">
					<h3>Father/Guardian Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="fathers_name">
								Father's Full Name
							</label>
							<input
								type="text"
								id="fathers_name"
								name="fathers_name"
								value={formData.fathers_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathers_occupation">
								Occupation
							</label>
							<input
								type="text"
								name="fathers_occupation"
								id="fathers_occupation"
								value={formData.fathers_occupation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathers_number">Mobile No</label>
							<input
								type="text"
								name="fathers_number"
								id="fathers_number"
								value={formData.fathers_number}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathers_education">Education</label>
							<select
								name="fathers_education"
								id="fathers_education"
								value={formData.fathers_education}
								onChange={handleInputChange}
							>
								<option value="">Select Education</option>
								<option value="Bsc">Bsc</option>
								<option value="Hnd">Hnd</option>
								<option value="Phd">Phd</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="fathers_address">Address</label>
							<input
								type="text"
								name="fathers_address"
								id="fathers_address"
								value={formData.fathers_address}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="mother-info">
					<h3>Mother Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="mothers_name">
								Mother's Full Name
							</label>
							<input
								type="text"
								id="mothers_name"
								name="mothers_name"
								value={formData.mothers_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothers_occupation">
								Occupation
							</label>
							<input
								type="text"
								name="mothers_occupation"
								id="mothers_occupation"
								value={formData.mothers_occupation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothers_number">Mobile No</label>
							<input
								type="text"
								name="mothers_number"
								id="mothers_number"
								value={formData.mothers_number}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothers_education">Education</label>
							<select
								name="mothers_education"
								id="mothers_education"
								value={formData.mothers_education}
								onChange={handleInputChange}
							>
								<option value="">Select Education</option>
								<option value="Bsc">Bsc</option>
								<option value="Hnd">Hnd</option>
								<option value="Phd">Phd</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="mothers_address">Address</label>
							<input
								type="text"
								name="mothers_address"
								id="mothers_address"
								value={formData.mothers_address}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<button type="submit" className="submit-btn" disabled={loading}>
					{loading ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
};

export default EditStudent;
