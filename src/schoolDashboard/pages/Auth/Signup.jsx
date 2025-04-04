import React, { useState, useContext } from "react";
import "./Auth.css";
import authMain from "../../assets/auth-main.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [schoolName, setSchoolName] = useState("");
	const [role, setRole] = useState("School Owner");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [terms, setTerms] = useState(false);

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
	const { setUser, setUserToken } = useContext(UserContext);
	const navigate = useNavigate();

	const signup = async () => {
		if (!terms) {
			toast.error("Please accept terms and conditions");
			return;
		}

		if (!email || !password || !role || !schoolName) {
			toast.error("All fields are required");
			return;
		}

		setLoading(true);

		try {
			const response = await axios.post(`${BASE_API_URL}/school/signup`, {
				email,
				school_name: schoolName,
				pswd: password,
				role,
			});
			toast.success("Sign up successful");
			// console.log(response);
			setLoading(false);
			navigate("/school/login");
		} catch (err) {
			toast.error("Error signing up");
			console.log(err);
			setLoading(false);
		}
	};

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
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="School Owner">School Owner</option>
							<option value="Principal">Principal</option>
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
						<input
							type="checkbox"
							name="terms"
							id="terms"
							onChange={(e) => setTerms(e.target.checked)}
						/>
						<p>
							I accept the <span>Terms</span> and{" "}
							<span>Conditions</span>
						</p>
					</aside>

					<button onClick={signup} disabled={loading} type="button">
						{loading ? <Spinner /> : "Sign Up"}
					</button>

					<h6>
						Already have an account?{" "}
						<Link to="/school/login">Login</Link>
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
