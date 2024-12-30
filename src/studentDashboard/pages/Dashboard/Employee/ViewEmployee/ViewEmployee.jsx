import React from "react";
import "./ViewEmployee.css";
import pdfIcon from "../../../../assets/pdf-icon.png";
import { Link } from "react-router-dom";
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import SummaryCard from "../../../../components/SummaryCard/SummaryCard";

const ViewEmployee = () => {
	const employee = {
		name: "Gwendolyn Jerde",
		monthlySalary: "₦50,000",
		employeeRole: "Teacher",
		dateOfBirth: "23/09/1991",
		gender: "Male",
		phoneNumber: "09067255677",
		dateOfJoining: "22/03/2023",
		class: "J.S.S 1",
		fatherOrHusbandName: "DuBaque",
		educationLevel: "Bsc",
		bloodGroup: "A+",
		emailAddress: "Violet.Torphy@gmail.com",
		subject: "Chemistry",
		address: "87146 Zetta Meadow",
	};

	return (
		<div className="view-employee-container">
			<header className="profile-header">
				<Link to="/dashboard/employees">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>{employee.name}</h1>
			</header>
			<button className="download-button">
				<img src={pdfIcon} alt="" /> Download
			</button>
			<div className="profile-content">
				<div className="profile-image">
					<div className="avatar">
						<img src={userBlueIcon} alt="Employee Avatar" />
					</div>
					<h3>{employee.name}</h3>
				</div>

				<div className="profile-details">
					<div className="detail-section">
						<span>
							<h6>Monthly Salary:</h6>
							<p>{employee.monthlySalary}</p>
						</span>
						<span>
							<h6>Employee Role:</h6>
							<p>{employee.employeeRole}</p>
						</span>
						<span>
							<h6>Date of Birth:</h6>
							<p>{employee.dateOfBirth}</p>
						</span>
						<span>
							<h6>Gender:</h6>
							<p>{employee.gender}</p>
						</span>
						<span>
							<h6>Phone Number WhatsApp:</h6>
							<p>{employee.phoneNumber}</p>
						</span>
					</div>

					<div className="detail-section">
						<span>
							<h6>Date of Joining:</h6>
							<p>{employee.dateOfJoining}</p>
						</span>
						<span>
							<h6>Class:</h6>
							<p>{employee.class}</p>
						</span>
						<span>
							<h6>Father / Husband Name:</h6>
							<p>{employee.fatherOrHusbandName}</p>
						</span>
						<span>
							<h6>Education Level:</h6>
							<p>{employee.educationLevel}</p>
						</span>
						<span>
							<h6>Blood Group:</h6>
							<p>{employee.bloodGroup}</p>
						</span>
					</div>

					<div className="detail-section">
						<span>
							<h6>Email Address:</h6>
							<p>{employee.emailAddress}</p>
						</span>
						<span>
							<h6>Subject:</h6>
							<p>{employee.subject}</p>
						</span>
						<span>
							<h6>Address:</h6>
							<p>{employee.address}</p>
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
						<h2>Salary Report</h2>
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

export default ViewEmployee;
