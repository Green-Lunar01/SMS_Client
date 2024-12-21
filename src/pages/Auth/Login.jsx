import React, { useState } from "react";
import "./Auth.css";
<<<<<<< HEAD
// import loginMain from "../../assets/login-main.png";
// import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
=======
import loginMain from "../../assets/login-main.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
import { IoPersonOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
<<<<<<< HEAD
    const navigate = useNavigate()
=======
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446

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

<<<<<<< HEAD
				<form onSubmit={(e)=> e.preventDefault()}>
=======
				<form>
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
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
<<<<<<< HEAD
					    {/* <PasswordInput
=======
						<PasswordInput
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
							placeholder="****************"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
						/> */}
=======
						/>
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
					</label>

					<Link to="/forgotpassword" className="forgot-password">
						Forgot Password?
					</Link>

<<<<<<< HEAD
					<button onClick={() => navigate("/dashboard")}> Login</button>
=======
					<button>Login</button>
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446

					<h6>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</h6>
				</form>
			</main>
			<aside>
				<h1>LUNAR SMS - Where Learning Meets Management.</h1>
<<<<<<< HEAD
                <button onClick={() => navigate("/dashboard")}> Login</button>

				{/* <img src={loginMain} alt="" /> */}
=======

				<img src={loginMain} alt="" />
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
			</aside>
		</div>
	);
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
