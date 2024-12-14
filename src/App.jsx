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
					<Route path="*" element={<NotFoundDashboard />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
