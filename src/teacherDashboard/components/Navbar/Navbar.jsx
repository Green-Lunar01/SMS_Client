import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import school from "../../assets/school.png";
import { FiBell } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdMenu, IoIosLogIn } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = ({ setOpenMenu, setOpenNotifications }) => {
	const [openProfileMenu, setOpenProfileMenu] = useState(false);

	const navigate = useNavigate();

	return (
		<nav className="navbar">
			<div className="logo">
				<img src={logo} alt="" />
			</div>
			<aside>
				{/* <div>
					<button>Upgrade</button>
				</div> */}

				<div className="svgs">
					<FiBell onClick={() => setOpenNotifications(true)} />
					<IoSettingsOutline
						onClick={() => navigate("/school/dashboard/settings")}
					/>
				</div>

				<div className="profile">
					<p>Hope College</p>
					<img
						src={school}
						alt=""
						onClick={() => setOpenProfileMenu(!openProfileMenu)}
					/>

					{openProfileMenu && (
						<div className="profile-menu">
							<Link to="/teacher/dashboard/settings">
								<IoSettingsOutline />
								<p>Profile Settings</p>
							</Link>
							<span>
								<IoIosLogIn />
								<p>Logout</p>
							</span>
						</div>
					)}
				</div>
			</aside>
			<section className="mobile-menu">
				<div className="left">
					<IoMdMenu onClick={() => setOpenMenu(true)} />
					<h2>LUNAR SMS</h2>
				</div>

				<div className="right">
					<FiBell />
					<img src={school} alt="" />
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
