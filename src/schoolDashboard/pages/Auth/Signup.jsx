import React, { useState } from "react";
import "./Auth.css";
import authMain from "../../assets/auth-main.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [schoolName, setSchoolName] = useState("");
	const [role, setRole] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="auth signup">
			<main>
				<h4>
					The Future of School Management Is Here - Create Your
					Account!
				</h4>

				<form>
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

					<label htmlFor="schoolName">
						<span>Name of School</span>
						<input
							type="text"
							id="schoolName"
							placeholder="E.g Hope College"
							value={schoolName}
							onChange={(e) => setSchoolName(e.target.value)}
						/>
					</label>

					<label htmlFor="role">
						<span>Your Role</span>
						<select
							name="role"
							id="role"
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="owner">School Owner</option>
							<option value="principal">Principal</option>
						</select>
					</label>

					<label htmlFor="password">
						<span>Password</span>
						<PasswordInput
							placeholder="****************"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>

					<aside>
						<input type="checkbox" name="terms" id="terms" />
						<p>
							I accept the <span>Terms</span> and{" "}
							<span>Conditions</span>
						</p>
					</aside>

					<button>Sign Up</button>

					<h6>
						Already have an account? <Link to="/login">Login</Link>
					</h6>
				</form>
			</main>
			<aside>
				<h1>
					Welcome to Your Personalized Learning Hub.
					<br />
					Let's Get Started!
				</h1>

				<img src={authMain} alt="" />
			</aside>
		</div>
	);
};

export default Signup;
