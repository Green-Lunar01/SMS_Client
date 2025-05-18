import React, { useState, useRef } from "react";
import "./AddNewEmployee.css";

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
		bloodGroup: "",
		religion: "Christian",
		dateOfBirth: "22/03/2005",
		email: "example@gmail.com",
		gender: "",
		classField: "",
		subject: "",
		education: "",
		address: "",
	});

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

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission, e.g., send data to backend
		console.log("Student Information:", employeeInfo);
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
										employeeInfo.profilePhoto
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
								<option value="Christian">Christian</option>
								<option value="Muslim">Muslim</option>
								<option value="Hindu">Hindu</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="dateOfBirth">Date of Birth</label>
							<input
								type="text"
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
								<option value="Male">Male</option>
								<option value="Female">Female</option>
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
								<option value="J.S.S.1">J.S.S.1</option>
								<option value="J.S.S.2">J.S.S.2</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="subject">Subject</label>
							<input
								type="text"
								id="subject"
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
								<option value="High School">High School</option>
								<option value="Associate Degree">
									Associate Degree
								</option>
								<option value="Bachelor's Degree">
									Bachelor's Degree
								</option>
								<option value="Master's Degree">
									Master's Degree
								</option>
								<option value="Doctorate">Doctorate</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group address">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								value={employeeInfo.address}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<button type="submit" className="submit-btn">
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default AddNewEmployee;
