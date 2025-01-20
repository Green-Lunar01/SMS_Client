import React, { useState } from "react";
import "./ForgotPassword.css";
import forgotPswdMain from "../../assets/forgot-pswd-main.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import CodeInput from "../../components/CodeInput/CodeInput";
import { Link } from "react-router-dom";
import forgotPswd1 from "../../assets/forgot-pswd-1.png";
import forgotPswd2 from "../../assets/forgot-pswd-2.png";
import forgotPswd3 from "../../assets/forgot-pswd-3.png";
import { HiArrowLongLeft } from "react-icons/hi2";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [level, setLevel] = useState("one");

	return (
		<div className="forgot-password-page">
			<main>
				{level === "one" && (
					<form>
						<article>
							<img src={forgotPswd1} alt="" />
							<h4>Forgot Password</h4>
							<p>A reset instruction will be send to you.</p>
						</article>

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

						<button>Reset Password</button>

						<Link to="/login">
							<HiArrowLongLeft /> Back to Login
						</Link>
					</form>
				)}

				{level === "two" && (
					<form>
						<article>
							<img src={forgotPswd2} alt="" />
							<h4>Password Reset</h4>
							<p>We've sent a reset code.</p>
						</article>

						<CodeInput />

						<button>Continue</button>

						<h6>
							Didn't receive the email?{" "}
							<span>Click to resend</span>
						</h6>

						<Link to="/login">
							<HiArrowLongLeft /> Back to Login
						</Link>
					</form>
				)}

				{level === "three" && (
					<form>
						<article>
							<img src={forgotPswd3} alt="" />
							<h4>Password Reset</h4>
							<p>Please input your new password.</p>
						</article>

						<label htmlFor="password">
							<span>New Password</span>
							<PasswordInput
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder={"**************"}
							/>
						</label>

						<label htmlFor="confirmPassword">
							<span>Confirm Password</span>
							<PasswordInput
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								placeholder={"**************"}
							/>
						</label>

						<button>Reset Password</button>

						<Link to="/login">
							<HiArrowLongLeft /> Back to Login
						</Link>
					</form>
				)}

				<section className="progress-bars">
					<div
						onClick={() => setLevel("one")}
						className={level === "one" ? "active one" : "one"}
					></div>
					<div
						onClick={() => setLevel("two")}
						className={level === "two" ? "active two" : "two"}
					></div>
					<div
						onClick={() => setLevel("three")}
						className={level === "three" ? "active three" : "three"}
					></div>
				</section>
			</main>
			<aside>
				<img src={forgotPswdMain} alt="" />
			</aside>
		</div>
	);
};

export default ForgotPassword;
