import React, { useState, useRef } from "react";
import "./EditStudent.css";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const EditStudent = () => {
	const [studentInfo, setStudentInfo] = useState({
		studentSurname: "Jesus",
		studentFirstName: "William",
		dateOfAdmission: "22/03/2023",
		class: "A.S.S D",
		gender: "Male",
		matricNumber: "BC456789335",
		dateOfBirth: "22/03/2005",
		phoneNumberWhatsApp: "+2347083349400",
		religion: "Christian",
		previousSchool: "",
		bloodGroup: "",
		diseaseIfAny: "Asthma",
		orphanStudent: "Yes",
		profilePhoto: null,
		address: "",
		fathersName: "",
		fathersPhone: "",
		fathersOccupation: "",
		fathersEducation: "",
		fathersAddress: "",
		mothersName: "",
		mothersPhone: "",
		mothersOccupation: "",
		mothersEducation: "",
		mothersAddress: "",
	});

	const inputRef = useRef(null);

	const handleInputChange = (e) => {
		setStudentInfo({
			...studentInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handlePhotoUpload = (e) => {
		setStudentInfo({
			...studentInfo,
			profilePhoto: e.target.files[0],
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission, e.g., send data to backend
		console.log("Student Information:", studentInfo);
	};

	return (
		<div className="edit-student-container">
			<span>
				<Link to="/dashboard/students">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>Edit Student</h1>
			</span>
			<form onSubmit={handleSubmit}>
				<div className="student-info">
					<h3>Student Information</h3>
					<main>
						<div className="profile-photo">
							{studentInfo.profilePhoto ? (
								<img
									src={URL.createObjectURL(
										studentInfo.profilePhoto
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
							<label htmlFor="studentSurname">
								Student Surname
							</label>
							<input
								type="text"
								id="studentSurname"
								name="studentSurname"
								value={studentInfo.studentSurname}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="studentFirstName">
								Student First Name
							</label>
							<input
								type="text"
								id="studentFirstName"
								name="studentFirstName"
								value={studentInfo.studentFirstName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="dateOfAdmission">
								Date of Admission
							</label>
							<input
								type="date"
								id="dateOfAdmission"
								name="dateOfAdmission"
								value={studentInfo.dateOfAdmission}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="class">Class</label>
							<select
								id="class"
								name="class"
								value={studentInfo.class}
								onChange={handleInputChange}
							>
								<option value="A.S.S D">A.S.S D</option>
								<option value="B.S.S A">B.S.S A</option>
								<option value="C.S.S B">C.S.S B</option>
								<option value="D.S.S C">D.S.S C</option>
								<option value="E.S.S D">E.S.S D</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="gender">Gender</label>
							<select
								id="gender"
								name="gender"
								value={studentInfo.gender}
								onChange={handleInputChange}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="matricNumber">Matric Number</label>
							<input
								type="text"
								id="matricNumber"
								name="matricNumber"
								value={studentInfo.matricNumber}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="other-info">
					<h3>Other Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="dateOfBirth">Date of Birth</label>
							<input
								type="text"
								id="dateOfBirth"
								name="dateOfBirth"
								value={studentInfo.dateOfBirth}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phoneNumberWhatsApp">
								Phone number WhatsApp
							</label>
							<input
								type="text"
								id="phoneNumberWhatsApp"
								name="phoneNumberWhatsApp"
								value={studentInfo.phoneNumberWhatsApp}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="religion">Religion</label>
							<select
								id="religion"
								name="religion"
								value={studentInfo.religion}
								onChange={handleInputChange}
							>
								<option value="Christian">Christian</option>
								<option value="Muslim">Muslim</option>
								<option value="Hindu">Hindu</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="previousSchool">
								Previous School
							</label>
							<input
								type="text"
								id="previousSchool"
								name="previousSchool"
								value={studentInfo.previousSchool}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="bloodGroup">Blood Group</label>
							<input
								type="text"
								id="bloodGroup"
								name="bloodGroup"
								value={studentInfo.bloodGroup}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="diseaseIfAny">Disease If Any</label>
							<input
								type="text"
								id="diseaseIfAny"
								name="diseaseIfAny"
								value={studentInfo.diseaseIfAny}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group address">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								value={studentInfo.address}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="orphanStudent">
								Orphan Student
							</label>
							<select
								id="orphanStudent"
								name="orphanStudent"
								value={studentInfo.orphanStudent}
								onChange={handleInputChange}
							>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>
					</main>
				</div>
				<div className="father-info">
					<h3>Father/Guardian Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="fathersName">
								Father's Full Name
							</label>
							<input
								type="text"
								id="fathersName"
								name="fathersName"
								value={studentInfo.fathersName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathersOccupation">
								Occupation
							</label>
							<input
								type="text"
								name="fathersOccupation"
								id="fathersOccupation"
								value={studentInfo.fathersOccupation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathersPhone">Mobile No</label>
							<input
								type="text"
								name="fathersPhone"
								id="fathersPhone"
								value={studentInfo.fathersPhone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathersEducation">Education</label>
							<input
								type="text"
								name="fathersEducation"
								id="fathersEducation"
								value={studentInfo.fathersEducation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fathersAddress">Address</label>
							<input
								type="text"
								name="fathersAddress"
								id="fathersAddress"
								value={studentInfo.fathersAddress}
								onChange={handleInputChange}
							/>
						</div>
					</main>
				</div>
				<div className="mother-info">
					<h3>Mother Information</h3>
					<main>
						<div className="form-group">
							<label htmlFor="mothersName">
								Mother's Full Name
							</label>
							<input
								type="text"
								id="mothersName"
								name="mothersName"
								value={studentInfo.mothersName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothersOccupation">
								Occupation
							</label>
							<input
								type="text"
								name="mothersOccupation"
								id="mothersOccupation"
								value={studentInfo.mothersOccupation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothersPhone">Mobile No</label>
							<input
								type="text"
								name="mothersPhone"
								id="mothersPhone"
								value={studentInfo.mothersPhone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothersEducation">Education</label>
							<input
								type="text"
								name="mothersEducation"
								id="mothersEducation"
								value={studentInfo.mothersEducation}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="mothersAddress">Address</label>
							<input
								type="text"
								name="mothersAddress"
								id="mothersAddress"
								value={studentInfo.mothersAddress}
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

export default EditStudent;
