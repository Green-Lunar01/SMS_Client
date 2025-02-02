import React, { useState, useRef, useContext } from "react";
import "./AddNewEmployee.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/schoolContext";
import { convertHtmlDateToYMD } from "../../../../utils/dateCoverter";

const AddNewEmployee = () => {
	const [employeeInfo, setEmployeeInfo] = useState({
		profilePhoto: null,
		employeeSurname: "Jesus",
		employeeFirstName: "William",
		salary: "5000",
		dateOfJoining: "22/03/2023",
		role: "Principal",
		mobileNumber: "0812345679",
		fatherName: "",
		bloodGroup: "A+",
		religion: "Christianity",
		dateOfBirth: "22/03/2005",
		email: "example@gmail.com",
		gender: "male",
		classField: "",
		subject: "",
		education: "",
		address: "",
	});

	const { userToken } = useContext(UserContext);
	const { getEmployees } = useContext(SchoolContext);
	const [loading, setLoading] = useState(false);

	const inputRef = useRef(null);

	const handleInputChange = (e) => {
		setEmployeeInfo({
			...employeeInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handlePhotoUpload = (e) => {
		setEmployeeInfo({
			...employeeInfo,
			profilePhoto: e.target.files[0],
		});
	};

	const createEmployee = async () => {
		for (const [key, value] of Object.entries(employeeInfo)) {
			if (!value && key !== "profilePhoto") {
				// console.log(key, value);
				toast.error(`All fields are required. Please fill in (${key})`);
				return;
			}
		}
		setLoading(true);

		const postData = {
			surname: employeeSurname.value,
			first_name: employeeFirstName.value,
			monthly_salary: Number(salary.value),
			joined_at: convertHtmlDateToYMD(dateOfJoining.value),
			email: email.value,
			gender: gender.value,
			religion: religion.value,
			role: role.value,
			phone_number: mobileNumber.value,
			family_relation: fatherName.value,
			date_of_birth: convertHtmlDateToYMD(dateOfBirth.value),
			address: address.value,
			blood_group: bloodGroup.value,
			education_level: education.value,
		};

		// console.log(postData);
		// setLoading(false);
		// return;

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_API_URL}/school/employees/create`,
				postData,
				{
					headers: {
						Authorization: `${userToken}`,
					},
				},
			);
			toast.success("Employee created successfully");
			// console.log(response);
			getEmployees();
			setLoading(false);
		} catch (err) {
			toast.error(err.response.data.message || err.message);
			console.log(err);
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createEmployee();
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
							{employeeInfo.profilePhoto ? (
								<img
									src={URL.createObjectURL(
										employeeInfo.profilePhoto,
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
							<button onClick={() => inputRef.current.click()}>
								Upload Photo
							</button>
						</div>
						<div className="form-group">
							<label htmlFor="employeeSurname">
								Employee Surname
							</label>
							<input
								type="text"
								id="employeeSurname"
								name="employeeSurname"
								value={employeeInfo.employeeSurname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="employeeFirstName">
								Employee First Name
							</label>
							<input
								type="text"
								id="employeeFirstName"
								name="employeeFirstName"
								value={employeeInfo.employeeFirstName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="salary">Monthly Salary</label>
							<input
								type="text"
								placeholder="Enter Amount"
								id="salary"
								name="salary"
								value={employeeInfo.salary}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="role">Employee Role</label>
							<select
								id="role"
								name="role"
								value={employeeInfo.role}
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
							<label htmlFor="dateOfJoining">
								Date of Joining
							</label>
							<input
								type="date"
								id="dateOfJoining"
								name="dateOfJoining"
								value={employeeInfo.dateOfJoining}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mobileNumber">
								Mobile No for SMS/WhatsApp
							</label>
							<input
								type="text"
								id="mobileNumber"
								name="mobileNumber"
								value={employeeInfo.mobileNumber}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="other-info">
					<h3>Other Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="fatherName">
								Father / Husband Name
							</label>
							<input
								type="text"
								id="fatherName"
								name="fatherName"
								value={employeeInfo.fatherName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="bloodGroup">Blood Group</label>
							<select
								name="bloodGroup"
								id="bloodGroup"
								value={employeeInfo.bloodGroup}
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
								value={employeeInfo.religion}
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
							<label htmlFor="dateOfBirth">Date of Birth</label>
							<input
								type="date"
								id="dateOfBirth"
								name="dateOfBirth"
								value={employeeInfo.dateOfBirth}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email Address</label>
							<input
								type="email"
								id="email"
								name="email"
								value={employeeInfo.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="Gender">Gender</label>
							<select
								name="gender"
								id="gender"
								value={employeeInfo.gender}
								onChange={handleInputChange}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="non-binary">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="classField">Class</label>
							<select
								name="classField"
								id="classField"
								value={employeeInfo.classField}
								onChange={handleInputChange}
							>
								<option value="" disabled>
									Select
								</option>
								<option value="J.S.S.1">J.S.S.1</option>
								<option value="J.S.S.2">J.S.S.2</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="subject">Subject</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={employeeInfo.subject}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="education">Education Level</label>
							<select
								name="education"
								id="education"
								value={employeeInfo.education}
								onChange={handleInputChange}
							>
								<option value="" disabled>
									Select
								</option>
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
								value={employeeInfo.address}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<button type="submit" className="submit-btn" disabled={loading}>
					{loading ? <Spinner /> : "Save Changes"}
				</button>
			</form>
		</div>
	);
};

export default AddNewEmployee;
