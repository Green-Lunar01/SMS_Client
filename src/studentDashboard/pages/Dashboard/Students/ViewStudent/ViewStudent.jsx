import React from "react";
import "./ViewStudent.css";
import pdfIcon from "../../../../assets/pdf-icon.png";
import { Link } from "react-router-dom";
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import SummaryCard from "../../../../components/SummaryCard/SummaryCard";

const ViewStudent = () => {
	const student = {
		name: "Robert Donnelly",
		matricNumber: "BD4567890",
		dateOfAdmission: "27/09/2024",
		class: "J.S.S 2",
		dateOfBirth: "J.S.S 2",
		gender: "Male",
		phoneNumber: "09067255677",
		religion: "Christian",
		previousSchool: "No",
		bloodGroup: "A+",
		disease: "HIV",
		orphan: "No",
		address: "5663 VonRueden Lock",
		father: {
			fullName: "Leonard Bosco",
			occupation: "Carpenter",
			mobile: "0907864556",
			education: "BSC",
			address: "5663 VonRueden Lock",
		},
		mother: {
			fullName: "Mary Pedo",
			occupation: "Nurse",
			mobile: "0907864556",
			education: "BSC",
			address: "5663 VonRueden Lock",
		},
	};

	return (
		<div className="view-student-container">
			<header className="profile-header">
				<Link to="/dashboard/students">
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
						<img src={userBlueIcon} alt="" />
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
									<h4>90%</h4>
								</article>
							</div>

							<p>Yesterday</p>
							<button>Absent</button>

							<SummaryCard
								title="Present"
								count={0}
								icon={<HiOutlineArrowNarrowRight />}
								month="This month"
								color="#4851FB"
							/>
						</div>
						<div className="today">
							<div className="overall">
								<article>
									<p>Overall for September</p>
									<h4>90%</h4>
								</article>
							</div>

							<p>Yesterday</p>
							<button>Absent</button>

							<SummaryCard
								title="Absence"
								count={0}
								icon={<HiOutlineArrowNarrowRight />}
								month="This month"
								color="#FB484B"
							/>
						</div>
					</section>
				</div>

				<div className="school-report">
					<div className="header">
						<h2>School Report</h2>
						<span className="current-fee">
							<span className="dot"></span> Current School Fee{" "}
							<span className="fee-amount">₦50,000</span>
						</span>
					</div>
					<div className="recent-record">
						<h3>Recent record</h3>
					</div>
					<div className="record">
						<div className="year">2023/2024</div>
						<div className="details">
							<span className="amount">₦2,000</span>
							<span className="status">owning</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default ViewStudent;
