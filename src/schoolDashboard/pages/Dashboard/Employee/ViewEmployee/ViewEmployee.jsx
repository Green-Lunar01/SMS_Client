import React, { useEffect, useState } from "react";
import "./ViewEmployee.css";
import pdfIcon from "../../../../assets/pdf-icon.png";
import { Link, useParams } from "react-router-dom";
import {
	HiOutlineArrowNarrowLeft,
	HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import userBlueIcon from "../../../../assets/user-blue-icon.png";
import SummaryCard from "../../../../components/SummaryCard/SummaryCard";
import api from "../../../../lib/axios";
import { toast } from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";

const ViewEmployee = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [employeeDetails, setEmployeeDetails] = useState(null);

	const fetchEmployee = async () => {
		setLoading(true);
		try {
			const response = await api.get(`school/employees?staffId=${id}`, {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			// console.log(response.data.data[0]);
			setEmployeeDetails(response.data.data[0]);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Error fetching employee details",
			);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchEmployee();
	}, [id]);

	// Format the date from ISO to readable format
	const formatDate = (isoDate) => {
		if (!isoDate) return "N/A";
		const date = new Date(isoDate);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	if (loading) {
		return <Spinner />;
	}

	if (!employeeDetails) {
		return (
			<div className="view-employee-container">Employee not found</div>
		);
	}

	return (
		<div className="view-employee-container">
			<header className="profile-header">
				<Link to="/school/dashboard/employees">
					<HiOutlineArrowNarrowLeft />
				</Link>
				<h1>{`${employeeDetails.first_name} ${employeeDetails.surname}`}</h1>
			</header>
			<button className="download-button">
				<img src={pdfIcon} alt="" /> Download
			</button>
			<div className="profile-content">
				<div className="profile-image">
					<div className="avatar">
						<img
							src={employeeDetails.profile_photo || userBlueIcon}
							alt="Employee Avatar"
						/>
					</div>
					<h3>{`${employeeDetails.first_name} ${employeeDetails.surname}`}</h3>
				</div>

				<div className="profile-details">
					<div className="detail-section">
						<span>
							<h6>Monthly Salary:</h6>
							<p>₦{employeeDetails.monthly_salary || "N/A"}</p>
						</span>
						<span>
							<h6>Employee Role:</h6>
							<p>{employeeDetails.role || "N/A"}</p>
						</span>
						<span>
							<h6>Date of Birth:</h6>
							<p>{formatDate(employeeDetails.date_of_birth)}</p>
						</span>
						<span>
							<h6>Gender:</h6>
							<p>{employeeDetails.gender || "N/A"}</p>
						</span>
						<span>
							<h6>Phone Number:</h6>
							<p>{employeeDetails.phone_number || "N/A"}</p>
						</span>
					</div>

					<div className="detail-section">
						<span>
							<h6>Date of Joining:</h6>
							<p>{formatDate(employeeDetails.joined_at)}</p>
						</span>
						<span>
							<h6>Religion:</h6>
							<p>{employeeDetails.religion || "N/A"}</p>
						</span>
						<span>
							<h6>Family Relation:</h6>
							<p>{employeeDetails.family_relation || "N/A"}</p>
						</span>
						<span>
							<h6>Education Level:</h6>
							<p>{employeeDetails.education_level || "N/A"}</p>
						</span>
						<span>
							<h6>Blood Group:</h6>
							<p>{employeeDetails.blood_group || "N/A"}</p>
						</span>
					</div>

					<div className="detail-section">
						<span>
							<h6>Email Address:</h6>
							<p>{employeeDetails.email || "N/A"}</p>
						</span>
						<span>
							<h6>Username:</h6>
							<p>{employeeDetails.username || "N/A"}</p>
						</span>
						<span>
							<h6>Address:</h6>
							<p>{employeeDetails.address || "N/A"}</p>
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
							<span className="dot"></span> Current Salary{" "}
							<span className="fee-amount">
								₦{employeeDetails.monthly_salary || "N/A"}
							</span>
						</span>
					</div>
					<div className="recent-record">
						<h3>Recent record</h3>
					</div>
					<div className="record">
						<div className="year">2023/2024</div>
						<div className="details">
							<span className="amount">₦2,000</span>
							<span className="status">owed</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default ViewEmployee;
