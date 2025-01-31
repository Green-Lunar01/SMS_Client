import React, { lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFoundDashboard = lazy(
	() => import("./pages/Dashboard/Notfound/Notfound"),
);
const InsightsDashboard = lazy(
	() => import("./pages/Dashboard/Insights/Insights.jsx"),
);
const SettingsDashboard = lazy(
	() => import("./pages/Dashboard/Settings/Settings.jsx"),
);

const Attendance = lazy(
	() => import("./pages/Dashboard/Attendance/Attendance.jsx"),
);
const Assignment = lazy(
	() => import("./pages/Dashboard/Assignment/Assignment.jsx"),
);
const Timetable = lazy(
	() => import("./pages/Dashboard/Timetable/TimeTableScreen.jsx"),
);
const Messaging = lazy(
	() => import("./pages/Dashboard/Messaging/Messaging.jsx"),
);
const LiveClass = lazy(
	() => import("./pages/Dashboard/LiveClass/LiveClass.jsx"),
);
const LiveMeeting = lazy(
	() => import("./pages/Dashboard/LiveClass/LiveMeeting/LiveMeeting.jsx"),
);
const Questions = lazy(
	() => import("./pages/Dashboard/Questions/Questions.jsx"),
);
const Exams = lazy(() => import("./pages/Dashboard/Exams/Exams.jsx"));
const Tests = lazy(() => import("./pages/Dashboard/Tests/Tests.jsx"));
// const ReportCard = lazy(
// 	() => import("./pages/Dashboard/ReportCard/ReportCard.jsx"),
// );
// const UserAccess = lazy(
// 	() => import("./pages/Dashboard/UserAccess/UserAccess.jsx"),
// );

import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext.jsx";

function App() {
	return (
		<>
			<UserContextProvider>
				<Toaster />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/forgotpassword"
						element={<ForgotPassword />}
					/>
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
							path="/dashboard/liveclass"
							element={<LiveClass />}
						/>
						<Route
							path="/dashboard/liveclass/:id"
							element={<LiveMeeting />}
						/>
						<Route
							path="/dashboard/questions"
							element={<Questions />}
						/>
						<Route path="/dashboard/exams" element={<Exams />} />
						<Route path="/dashboard/tests" element={<Tests />} />
						{/* <Route
							path="/dashboard/useraccess"
							element={<UserAccess />}
						/>
						<Route
							path="/dashboard/reportcard"
							element={<ReportCard />}
						/> */}
						<Route path="*" element={<NotFoundDashboard />} />
					</Route>
				</Routes>
			</UserContextProvider>
		</>
	);
}

export default App;
