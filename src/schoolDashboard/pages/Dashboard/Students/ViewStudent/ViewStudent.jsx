import React, { useState, useEffect, useContext } from "react";
import "./ViewStudent.css";
import pdfIcon from "../../../../assets/pdf-icon.png";
import { Link, useParams } from "react-router-dom";
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import SummaryCard from "../../../../components/SummaryCard/SummaryCard";
import api from "../../../../lib/axios";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../../context/userContext";
import { SchoolContext } from "../../../../context/SchoolContext";

const ViewStudent = () => {
	const [loading, setLoading] = useState(true);
	const [student, setStudent] = useState(null);
	const [attendanceData, setAttendanceData] = useState({
		overallSeptember: "90%", // Default values, replace with API data when available
		yesterdayStatus: "Absent",
		presentCount: 0,
		absenceCount: 0,
	});
	const [schoolReport, setSchoolReport] = useState({
		currentFee: "₦50,000",
		recentRecords: [
			{ year: "2023/2024", amount: "₦2,000", status: "owning" },
		],
	});

	const { id } = useParams();
	const { userToken } = useContext(UserContext);
	const { classes } = useContext(SchoolContext);

	// Format dates for display (DD/MM/YYYY)
	const formatDateForDisplay = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
	};

	// Function to get class name from class ID
	const getClassName = (classId) => {
		if (!classes || !classId) return "";
		const foundClass = classes.find((c) => c.id === parseInt(classId));
		return foundClass ? foundClass.class_name : "";
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

			// Transform API data to match the component's expected structure
			setStudent({
				name: `${studentData.surname} ${studentData.first_name} ${studentData.other_names || ""}`.trim(),
				matricNumber: studentData.matric_number || "",
				dateOfAdmission: formatDateForDisplay(
					studentData.date_of_admission,
				),
				class: getClassName(studentData.class_id),
				dateOfBirth: formatDateForDisplay(studentData.date_of_birth),
				gender: studentData.gender
					? studentData.gender.charAt(0).toUpperCase() +
						studentData.gender.slice(1)
					: "",
				phoneNumber: studentData.phone_number || "",
				religion: studentData.religion || "",
				previousSchool: studentData.previous_school || "No",
				bloodGroup: studentData.blood_group || "",
				disease: studentData.disease || "None",
				orphan: studentData.is_orphan ? "Yes" : "No",
				address: studentData.address || "",
				profile_photo: studentData.profile_photo || null,
				father: {
					fullName: studentData.fathers_name || "",
					occupation: studentData.fathers_occupation || "",
					mobile: studentData.fathers_number || "",
					education: studentData.fathers_education || "",
					address: studentData.fathers_address || "",
				},
				mother: {
					fullName: studentData.mothers_name || "",
					occupation: studentData.mothers_occupation || "",
					mobile: studentData.mothers_number || "",
					education: studentData.mothers_education || "",
					address: studentData.mothers_address || "",
				},
			});

			// Future enhancement: Fetch attendance and fee data from API
			// fetchAttendanceData(id);
			// fetchSchoolReportData(id);
		} catch (err) {
			console.error("Error fetching student:", err);
			toast.error(
				"Failed to load student data. Please refresh or try again later.",
			);
		} finally {
			setLoading(false);
		}
	};

	// For future implementation: Attendance data fetching
	const fetchAttendanceData = async (studentId) => {
		try {
			// const response = await api.get(`/school/students/${studentId}/attendance`, {
			//     headers: { Authorization: `${localStorage.getItem("sms_token")}` },
			// });
			// setAttendanceData(response.data);
		} catch (err) {
			console.error("Error fetching attendance data:", err);
		}
	};

	// For future implementation: School report/fees data fetching
	const fetchSchoolReportData = async (studentId) => {
		try {
			// const response = await api.get(`/school/students/${studentId}/fees`, {
			//     headers: { Authorization: `${localStorage.getItem("sms_token")}` },
			// });
			// setSchoolReport(response.data);
		} catch (err) {
			console.error("Error fetching school report data:", err);
		}
	};

	useEffect(() => {
		fetchStudentData();
	}, [id]);

	if (loading) {
		return <Spinner />;
	}

	if (!student) {
		return (
			<div className="error-container">
				<h2>Student not found</h2>
				<Link to="/school/dashboard/students">
					<button>Back to Students</button>
				</Link>
			</div>
		);
	}

	return (
		<div className="view-student-container">
			<header className="profile-header">
				<Link to="/school/dashboard/students">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>{student.name}</h1>
			</header>
			<button className="download-button">
				<img src={pdfIcon} alt="" /> Download
			</button>
			<div className="profile-content">
				<div className="profile-image">
					<div className="avatar">
						{student.profile_photo ? (
							<img
								src={student.profile_photo}
								alt={student.name}
							/>
						) : (
							<img src={userBlueIcon} alt="" />
						)}
					</div>
					<h3>{student.name}</h3>
				</div>
				<div className="profile-details">
					<div className="detail-section">
						<span>
							<h6>Matric Number:</h6>
							<p>{student.matricNumber}</p>
						</span>
						<span>
							<h6>Date of Admission:</h6>
							<p>{student.dateOfAdmission}</p>
						</span>
						<span>
							<h6>Class:</h6>
							<p>{student.class}</p>
						</span>
						<span>
							<h6>Date of Birth:</h6>
							<p>{student.dateOfBirth}</p>
						</span>
						<span>
							<h6>Gender:</h6>
							<p>{student.gender}</p>
						</span>
						<span>
							<h6>Phone Number WhatsApp:</h6>
							<p>{student.phoneNumber}</p>
						</span>
					</div>
					<div className="detail-section">
						<span>
							<h6>Religion:</h6>
							<p>{student.religion}</p>
						</span>
						<span>
							<h6>Previous School:</h6>
							<p>{student.previousSchool}</p>
						</span>
						<span>
							<h6>Blood Group:</h6>
							<p>{student.bloodGroup}</p>
						</span>
						<span>
							<h6>Disease:</h6>
							<p>{student.disease}</p>
						</span>
						<span>
							<h6>Orphan:</h6>
							<p>{student.orphan}</p>
						</span>
						<span>
							<h6>Address:</h6>
							<p>{student.address}</p>
						</span>
					</div>
					<div className="detail-section">
						<h4>Father/Guardian Information</h4>
						<span>
							<h6>Father's Full Name:</h6>
							<p>{student.father.fullName}</p>
						</span>
						<span>
							<h6>Occupation:</h6>
							<p>{student.father.occupation}</p>
						</span>
						<span>
							<h6>Mobile No.:</h6>
							<p>{student.father.mobile}</p>
						</span>
						<span>
							<h6>Education:</h6>
							<p>{student.father.education}</p>
						</span>
						<span>
							<h6>Address:</h6>
							<p>{student.father.address}</p>
						</span>
					</div>
					<div className="detail-section">
						<h4>Mother Information</h4>
						<span>
							<h6>Mother's Full Name:</h6>
							<p>{student.mother.fullName}</p>
						</span>
						<span>
							<h6>Occupation:</h6>
							<p>{student.mother.occupation}</p>
						</span>
						<span>
							<h6>Mobile No.:</h6>
							<p>{student.mother.mobile}</p>
						</span>
						<span>
							<h6>Education:</h6>
							<p>{student.mother.education}</p>
						</span>
						<span>
							<h6>Address:</h6>
							<p>{student.mother.address}</p>
						</span>
					</div>
				</div>
			</div>

			<aside>
				<div className="attendance-report">
					<h3>Attendance Report</h3>

					<section>
						<div className="yesterday">
							<div className="overall">
								<article>
									<p>Overall for September</p>
									<h4>{attendanceData.overallSeptember}</h4>
								</article>
							</div>

							<p>Yesterday</p>
							<button>{attendanceData.yesterdayStatus}</button>

							<SummaryCard
								title="Present"
								count={attendanceData.presentCount}
								icon={<HiOutlineArrowNarrowRight />}
								month="This month"
								color="#4851FB"
							/>
						</div>
						<div className="today">
							<div className="overall">
								<article>
									<p>Overall for September</p>
									<h4>{attendanceData.overallSeptember}</h4>
								</article>
							</div>

							<p>Yesterday</p>
							<button>{attendanceData.yesterdayStatus}</button>

							<SummaryCard
								title="Absence"
								count={attendanceData.absenceCount}
								icon={<HiOutlineArrowNarrowRight />}
								month="This month"
								color="#FB484B"
							/>
						</div>
					</section>
				</div>

				{/* <div className="school-report">
					<div className="header">
						<h2>School Report</h2>
						<span className="current-fee">
							<span className="dot"></span> Current School Fee{" "}
							<span className="fee-amount">
								{schoolReport.currentFee}
							</span>
						</span>
					</div>
					<div className="recent-record">
						<h3>Recent record</h3>
					</div>
					{schoolReport.recentRecords.map((record, index) => (
						<div className="record" key={index}>
							<div className="year">{record.year}</div>
							<div className="details">
								<span className="amount">{record.amount}</span>
								<span className="status">{record.status}</span>
							</div>
						</div>
					))}
				</div> */}
			</aside>
		</div>
	);
};

export default ViewStudent;
