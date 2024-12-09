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
					<Route path="*" element={<NotFoundDashboard />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
