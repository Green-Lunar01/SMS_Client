import React, { useState, useContext, useEffect } from "react";
import "./Auth.css";
import loginMain from "../../assets/login-main.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";

import { IoPersonOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import {useForm} from "react-hook-form"
import  { yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useStudAuth } from "../../../studentDashboard/Auth/context/StudentAuthProvider";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
	const navigate = useNavigate();
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState("admin");

	const [matricNumber, setMatricNumber] = useState("")
	const {studentToken , setStudentToken, setStudentProfile, studentProfile} = useStudAuth()

	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "http://tonyicon.com.ng:5000";
	const { setUser, setUserToken } = useContext(UserContext);
	
	const schema = yup.object().shape({
		matric_no: yup.string().required("Enter your matric number "),
		pswd: yup.string().required("Enter your password")
	})
	const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

	const login = async () => {
		console.log(role)

		// if (!email || !password) {
		// 	toast.error("All fields are required");
		// 	return;
		// }	

		setLoading(true);

		if (role === "student"){
			console.log("hi student")
			try {
				const response = await axios.post(`http://tonyicon.com.ng:5000/student/signin`, {
				    matric_no: matricNumber,
					pswd: password,
				});
				toast.success("Logged in successfully");
				const localToken = localStorage.setItem("student_sms_token", response.data.data.token);
				const localStudent = localStorage.setItem("student_sms_info", JSON.stringify(response.data.data))
				setStudentToken(localToken);
				setStudentProfile(response.data.data)
				// localStorage.setItem("student_sms_token", JSON.stringify(studentToken))
				setLoading(false);
				window.location.href = "/student/dashboard"
			} catch (err) {
				toast.error(err.message);
				console.log(err);
				setLoading(false);
			}
		}else{
			try {
				const response = await axios.post(`${BASE_API_URL}/school/signin`, {
					email,
					pswd: password,
				});
				toast.success("Logged in successfully");
				// console.log(response);
				localStorage.setItem("sms_token", response.data.data.token);

				setUserToken(response.data.data.token);
				setLoading(false);
				navigate("/school/dashboard/insights");
			} catch (err) {
				toast.error(err.message);
				console.log(err);
				setLoading(false);
			}
		}
		
	};
	
	
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

				{
					role === "student" ? (
						<form onSubmit={handleSubmit(login)}>
							<label htmlFor="email">
								<span>Matric number</span>
								<input
									
									id="email"
									placeholder="email@example.com"
									value={matricNumber}
									onChange={(e) => setMatricNumber(e.target.value)}
								/>
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

					
					

							<button type="submit" onClick={login} disabled={loading}>
								{loading ? <Spinner /> : "Log In"}
							</button>
				
					
				</form>
					) : (<form>
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
						<PasswordInput
							placeholder="****************"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>

					{
						role === "student" ? null : (<Link
							to="/school/forgotpassword"
							className="forgot-password"
						>
							Forgot Password?
						</Link>)
					}
					

					<button onClick={login} disabled={loading}>
						{loading ? <Spinner /> : "Log In"}
					</button>
					{
						role === "student" ? null : (
							<h6>
						Don't have an account?{" "}
						<Link to="/school/signup">Sign Up</Link>
					</h6>
						)
					}
					
				</form>)
				}
			</main>
			<aside>
				<h1>LUNAR SMS - Where Learning Meets Management.</h1>

				<img src={loginMain} alt="" />
			</aside>
		</div>
	);
};

export default Login;
