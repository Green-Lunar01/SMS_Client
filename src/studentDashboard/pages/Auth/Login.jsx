import React, { useState } from "react";
import "./Auth.css";
// import loginMain from "../../assets/login-main.png";
// import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate()

	const [role, setRole] = useState("admin");

	return (
		<div className="auth login">
			<main>
				<h4>Log in to Your Academic World!</h4>

				<section className="roles">
					<div
						onClick={() => setRole("admin")}
						className={role === "admin" ? "selected" : ""}
					>
						<IoPersonOutline />
						<p>Admin</p>
					</div>
					<div
						onClick={() => setRole("student")}
						className={role === "student" ? "selected" : ""}
					>
						<PiStudentLight />
						<p>Student</p>
					</div>
					<div
						onClick={() => setRole("teacher")}
						className={role === "teacher" ? "selected" : ""}
					>
						<LiaChalkboardTeacherSolid />
						<p>Teacher</p>
					</div>
				</section>

				<form onSubmit={(e)=> e.preventDefault()}>
					<label htmlFor="email">
						<span>Email Address</span>
						<input
							type="email"
							id="email"
							placeholder="email@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>

					<label htmlFor="password">
						<span>Password</span>
					    {/* <PasswordInput
							placeholder="****************"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/> */}
					</label>

					<Link to="/forgotpassword" className="forgot-password">
						Forgot Password?
					</Link>

					<button onClick={() => navigate("/dashboard")}> Login</button>

					<h6>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</h6>
				</form>
			</main>
			<aside>
				<h1>LUNAR SMS - Where Learning Meets Management.</h1>
                <button onClick={() => navigate("/student/dashboard")}> Login</button>

				{/* <img src={loginMain} alt="" /> */}
			</aside>
		</div>
	);
};

export default Login;
