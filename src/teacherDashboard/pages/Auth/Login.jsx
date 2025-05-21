import React, { useState, useContext, useEffect } from "react";
import "./Auth.css";
import loginMain from "../../assets/login-main.png";
import PasswordInput from "../../../schoolDashboard/components/PasswordInput/PasswordInput";
import { Link, useNavigate } from "react-router-dom";

import { IoPersonOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useStudAuth } from "../../../studentDashboard/Auth/context/StudentAuthProvider";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import { useTeacherAuth } from "../../../teacherDashboard/Auth/context/TeacherAuthProvider";
const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL || "https://edusoft.tonyicon.com.ng";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("teacher");

  const [matricNumber, setMatricNumber] = useState("");
  const { studentToken, setStudentToken, setStudentProfile, studentProfile } =
	useStudAuth();
  const { teacherToken, setTeacherToken, teacherProfile, setTeacherProfile } =
	useTeacherAuth();

  const { setUser, setUserToken } = useContext(UserContext);

  const schema = yup.object().shape({
	matric_no: yup.string().required("Enter your matric number "),
	pswd: yup.string().required("Enter your password"),
  });
  const {
	register,
	handleSubmit,
	formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const login = async () => {
	console.log(role);

	setLoading(true);

	if (role === "student") {
	  console.log("hi student");

	  try {
		const response = await axios.post(
		  `https://edusoft.tonyicon.com.ng/student/signin/`,
		  {
			matric_no: matricNumber,
			pswd: password,
		  }
		);

		toast.success("Logged in successfully");

		localStorage.setItem("student_sms_token", response.data.data.token);
		localStorage.setItem(
		  "student_sms_info",
		  JSON.stringify(response.data.data)
		);

		setStudentToken(response.data.data.token);
		setStudentProfile(response.data.data);

		setLoading(false);
		window.location.href = "/student/dashboard";
	  } catch (err) {
		let message =
		err?.response?.data?.message ||
		err?.response?.data?.detail ||
		err?.message ||
		"Something went wrong. Please try again.";
	
	  toast.error(message); // Ensure this line runs
	  console.log("Error:", message);
	  setLoading(false);
	  }
	} else if (role === "admin"){
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
  const teacherLogin = async () => {
	if (!email || !password) {
	  toast.error("All fields are required");
	  return;
	}

	setLoading(true);

	try {
	  const response = await axios.post(`${BASE_API_URL}/teachers/signin/`, {
		email,
		pswd: password,
	  });

	  const teacherToken = response.data.data.token;
	  setTeacherToken(teacherToken);
	  setTeacherProfile(response.data.data);
	  console.log(
		"Teacher response:",
		response.data.data,
		"Teacher Info:",
		teacherProfile
	  );
	  localStorage.setItem("teacher_sms_token", teacherToken);
	  localStorage.setItem(
		"teacher_sms_info",
		JSON.stringify(response.data.data)
	  );

	  toast.success("Logged in successfully");
	  console.log("Teacher token:", teacherToken);

	  setTimeout(() => {
		window.location.href = "/teacher/dashboard/insights";
	  }, 500);
	} catch (err) {
	  console.error("Login Error:", err);

	  const errorMessage =
		err.response?.data?.message || "An error occurred. Please try again.";
	  toast.error(errorMessage);
	} finally {
	  setLoading(false);
	}
  };

  return (
	<div className="auth login">
	  <main>
		<h4>Log in to Your Academic World!</h4>

		<section className="roles">
		  <button
			onClick={() => setRole("admin")}
			className={role === "admin" ? "selected" : ""}
		  disabled>
			<IoPersonOutline className="bg-gray-100" />
			<p>Admin</p>
		  </button>
		  <button
			onClick={() => setRole("student")}
			className={role === "student" ? "selected" : ""}
		  disabled>
			<PiStudentLight className="bg-gray-100" />
			<p>Student</p>
		  </button>
		  <div
			onClick={() => setRole("teacher")}
			className={role === "teacher" ? "selected" : ""}
		  >
			<LiaChalkboardTeacherSolid />
			<p>Teacher</p>
		  </div>
		</section>

		{role === "student" ? (
		  <form onSubmit={handleSubmit(login)}>
			<label htmlFor="email">
			  <span>Matric number</span>
			  <input
				id="email"
				placeholder="Matric Number"
				value={matricNumber}
				onChange={(e) => setMatricNumber(e.target.value)}
			  />
			</label>

			<label htmlFor="password">
			  <span>Password</span>
			  <PasswordInput
				placeholder="******************"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			  />
			</label>

			<button type="submit" onClick={teacherLogin} disabled={loading}>
			  {loading ? <Spinner /> : "Log In"}
			</button>
		  </form>
		) : (
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

			<label htmlFor="password">
			  <span>Password</span>
			  <PasswordInput
				placeholder="****************"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			  />
			</label>

			<Link to="/school/forgotpassword" className="forgot-password">
			  Forgot Password?
			</Link>

			<button onClick={teacherLogin} disabled={loading}>
			  {loading ? <Spinner /> : "Log In"}
			</button>
			<h6>
			  Don't have an account? <Link to="/school/signup">Sign Up</Link>
			</h6>
		  </form>
		)}
	  </main>
	  <aside>
		<h1>LUNAR SMS - Where Learning Meets Management.</h1>

		<img src={loginMain} alt="" />
	  </aside>
	</div>
  );
};

export default Login;
