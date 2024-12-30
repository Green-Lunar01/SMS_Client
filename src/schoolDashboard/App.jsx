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
const Attendance = lazy(() =>
	import("./pages/Dashboard/Attendance/Attendance.jsx")
);
const Assignment = lazy(() =>
	import("./pages/Dashboard/Assignment/Assignment.jsx")
);
const Timetable = lazy(() =>
	import("./pages/Dashboard/Timetable/TimeTableScreen.jsx")
);
const Messaging = lazy(() =>
	import("./pages/Dashboard/Messaging/Messaging.jsx")
);
const Questions = lazy(() =>
	import("./pages/Dashboard/Questions/Questions.jsx")
);
const Exams = lazy(() => import("./pages/Dashboard/Exams/Exams.jsx"));
const Tests = lazy(() => import("./pages/Dashboard/Tests/Tests.jsx"));
const ReportCard = lazy(() =>
	import("./pages/Dashboard/ReportCard/ReportCard.jsx")
);
const UserAccess = lazy(() =>
	import("./pages/Dashboard/UserAccess/UserAccess.jsx")
);

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
					<Route
						path="/dashboard/attendance"
						element={<Attendance />}
					/>
					<Route
						path="/dashboard/assignment"
						element={<Assignment />}
					/>
					<Route
						path="/dashboard/timetable"
						element={<Timetable />}
					/>
					<Route
						path="/dashboard/messaging"
						element={<Messaging />}
					/>
					<Route
						path="/dashboard/questions"
						element={<Questions />}
					/>
					<Route path="/dashboard/exams" element={<Exams />} />
					<Route path="/dashboard/tests" element={<Tests />} />
					<Route
						path="/dashboard/useraccess"
						element={<UserAccess />}
					/>
					<Route
						path="/dashboard/reportcard"
						element={<ReportCard />}
					/>
					<Route path="*" element={<NotFoundDashboard />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
