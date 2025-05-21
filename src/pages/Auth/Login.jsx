import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import loginMain from "../../assets/login-main.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");

  const handleRoleLogin = () => {
    if (role === "admin") {
      window.location.href = "/school/login";
    } else if (role === "student") {
      window.location.href = "/student/login";
    } else if (role === "teacher") {
      // navigate("/teacher/login")
      window.location.href = "/teacher/login";
    }
  };

  return (
    <div className="auth login">
      <main>
        <h4>Please select what role you would like to login!</h4>

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

        <button className="proceed-btn" onClick={handleRoleLogin}>
          Proceed to {role} login.
        </button>
      </main>
      <aside>
        <h1>LUNAR SMS - Where Learning Meets Management.</h1>

        <img src={loginMain} alt="" />
      </aside>
    </div>
  );
};

export default Login;
