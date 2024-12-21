<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./screens/Dashboard";
import Assignment from "./screens/Assignment";
import Timetable from "./screens/Timetable";

import Books from "./screens/Books";
import Messaging from "./screens/Messaging";
import Exams from "./screens/Exams";
import ClassTest from "./screens/ClassTest";
import Report from "./screens/Report";
import Login from "./pages/Auth/Login";

import ProtectedRoutes from "./pages/Auth/ProtectedRoutes";
import LiveClass from "./screens/LiveClass";
function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes
                handleModal={handleModal}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/assignments"
              element={
                <Assignment showModal={showModal} handleModal={handleModal} />
              }
            />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/books" element={<Books />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/live-class" element={<LiveClass />} />
            <Route path="/class-test" element={<ClassTest />} />
            <Route path="/report-card" element={<Report />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
=======
import React, { lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFoundDashboard = lazy(() =>
	import("./pages/Dashboard/Notfound/Notfound")
);
const InsightsDashboard = lazy(() =>
	import("./pages/Dashboard/Insights/Insights.jsx")
);
const SettingsDashboard = lazy(() =>
	import("./pages/Dashboard/Settings/Settings.jsx")
);

const ClassDashboard = lazy(() => import("./pages/Dashboard/Class/Class.jsx"));
const ClassDetailsDashboard = lazy(() =>
	import("./pages/Dashboard/Class/ClassDetails/ClassDetails.jsx")
);
const EditClass = lazy(() =>
	import("./pages/Dashboard/Class/EditClass/EditClass.jsx")
);
const Subject = lazy(() => import("./pages/Dashboard/Subject/Subject.jsx"));
const Students = lazy(() => import("./pages/Dashboard/Students/Students.jsx"));
const EditStudent = lazy(() =>
	import("./pages/Dashboard/Students/EditStudent/EditStudent.jsx")
);
const ViewStudent = lazy(() =>
	import("./pages/Dashboard/Students/ViewStudent/ViewStudent.jsx")
);
const Employee = lazy(() => import("./pages/Dashboard/Employee/Employee.jsx"));
const EditEmployee = lazy(() =>
	import("./pages/Dashboard/Employee/EditEmployee/EditEmployee.jsx")
);
const ViewEmployee = lazy(() =>
	import("./pages/Dashboard/Employee/ViewEmployee/ViewEmployee.jsx")
);
const Fee = lazy(() => import("./pages/Dashboard/Fee/Fee.jsx"));
const Account = lazy(() => import("./pages/Dashboard/Account/Account.jsx"));
const Salary = lazy(() => import("./pages/Dashboard/Salary/Salary.jsx"));

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route
						path="/dashboard/insights"
						element={<InsightsDashboard />}
					/>
					<Route
						path="/dashboard/settings"
						element={<SettingsDashboard />}
					/>
					<Route
						path="/dashboard/class"
						element={<ClassDashboard />}
					/>
					<Route
						path="/dashboard/classdetails/:id"
						element={<ClassDetailsDashboard />}
					/>
					<Route
						path="/dashboard/editclass/:id"
						element={<EditClass />}
					/>
					<Route path="/dashboard/subject" element={<Subject />} />
					<Route path="/dashboard/students" element={<Students />} />
					<Route
						path="/dashboard/editstudent/:id"
						element={<EditStudent />}
					/>
					<Route
						path="/dashboard/viewstudent/:id"
						element={<ViewStudent />}
					/>
					<Route path="/dashboard/employees" element={<Employee />} />
					<Route
						path="/dashboard/editemployee/:id"
						element={<EditEmployee />}
					/>
					<Route
						path="/dashboard/viewemployee/:id"
						element={<ViewEmployee />}
					/>
					<Route path="/dashboard/fee" element={<Fee />} />
					<Route path="/dashboard/account" element={<Account />} />
					<Route path="/dashboard/salary" element={<Salary />} />
					<Route path="*" element={<NotFoundDashboard />} />
				</Route>
			</Routes>
		</>
	);
>>>>>>> 534ca26af595f7841ec3c3067fa58f1ca9740446
}

export default App;
