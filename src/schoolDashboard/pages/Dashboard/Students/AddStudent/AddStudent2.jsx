import { useState, useContext, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../../context/userContext";
import "./AddStudent.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { SchoolContext } from "../../../../context/SchoolContext";

const AddStudent2 = () => {
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

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
	const { userToken } = useContext(UserContext);
	const { classes } = useContext(SchoolContext);

	const inputRef = useRef(null);

	const handlePhotoUpload = (e) => {
		setFormData({
			...formData,
			profile_photo: e.target.files[0],
		});
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
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
			"fathers_name",
			"fathers_occupation",
			"fathers_number",
		];

		const optionalFields = [
			"previous_school",
			"blood_group",
			"disease",
			"address",
			"fathers_education",
			"fathers_address",
			"mothers_name",
			"mothers_occupation",
			"mothers_number",
			"mothers_education",
			"mothers_address",
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
		console.log("Form Data: ", {
			...formData,
			class_id: Number(formData.class_id),
		});
		// setLoading(false);
		// return;

		try {
			const response = await axios.post(
				`${BASE_API_URL}/school/students/create`,
				{ ...formData, class_id: Number(formData.class_id) },
				{
					headers: {
						Authorization: `${userToken}`,
					},
				},
			);
			toast.success("Student added successfully");
			setLoading(false);
		} catch (err) {
			toast.error(err.response?.data?.message || "An error occurred");
			console.log(err);
			setLoading(false);
		}
	};

	return (
		<div className="add-student-container">
			<span>
				<h1>Admission Form</h1>
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
								onClick={() => inputRef.current.click()}
								type="button"
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
								<option value="" disabled>
									Select Class
								</option>
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
								<option value="Male">Male</option>
								<option value="Female">Female</option>
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
								<option value="christianity">
									Christianity
								</option>
								<option value="islam">Islam</option>
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
							<input
								type="text"
								id="blood_group"
								name="blood_group"
								value={formData.blood_group}
								onChange={handleInputChange}
							/>
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
							<input
								type="text"
								name="fathers_education"
								id="fathers_education"
								value={formData.fathers_education}
								onChange={handleInputChange}
							/>
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
							<input
								type="text"
								name="mothers_education"
								id="mothers_education"
								value={formData.mothers_education}
								onChange={handleInputChange}
							/>
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
				<button type="submit" disabled={loading} className="submit-btn">
					{loading ? "Adding..." : "Add Student"}
				</button>
			</form>
		</div>
	);
};

export default AddStudent2;
