import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "./userContext";
import api from "../lib/axios";

export const SchoolContext = createContext({});

export function SchoolContextProvider({ children }) {
	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

	const [employees, setEmployees] = useState([]);
	const { userToken } = useContext(UserContext);
	const [employeeCategories, setEmployeeCategories] = useState([]);
	const [classes, setClasses] = useState([]);
	const [subjects, setSubjects] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [schoolProfile, setSchoolProfile] = useState({});

	const getEmployees = async () => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/school/employees`,
				{
					headers: { Authorization: `${userToken}` },
				},
			);
			setEmployees(response.data.data);
			console.log("EMPLOYEES: ", response.data.data);
			getUniqueCategories(response.data.data);
		} catch (err) {
			// toast.error(err.response.data.message || err.message);
			console.log(err);
		}
	};

	const getClasses = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}/school/classes`, {
				headers: { Authorization: `${userToken}` },
			});
			console.log("CLASSES: ", response.data.data);
			setClasses(response.data.data);
		} catch (err) {
			// toast.error(err.response.data.message || err.message);
			console.log(err);
		}
	};

	const getSubjects = async () => {
		try {
			const response = await axios.get(
				`${BASE_API_URL}/school/subjects`,
				{
					headers: { Authorization: `${userToken}` },
				},
			);
			console.log("SUBJECTS: ", response.data.data);
			setSubjects(response.data.data);
		} catch (err) {
			// toast.error(err.response.data.message || err.message);
			console.log(err);
		}
	};

	const fetchSchoolProfile = async () => {
		try {
			const response = await api.get("/school/profile", {
				headers: {
					Authorization: `${localStorage.getItem("sms_token")}`,
				},
			});
			console.log("SCHOOL PROFILE: ", response.data.data);
			setSchoolProfile(response.data.data);
		} catch (error) {
			console.error("Error fetching school profile:", error);
			toast.error("Error fetching school profile");
		}
	};

	useEffect(() => {
		getEmployees();
		getClasses();
		getSubjects();
		fetchSchoolProfile();
	}, []);

	const getUniqueCategories = (data) => {
		data.forEach((employee) => {
			if (!employeeCategories.includes(employee.role)) {
				setEmployeeCategories((prevCategories) => [
					...prevCategories,
					employee.role,
				]);
			}
		});
		return employeeCategories;
	};

	const getEmployeeByCategory = (category) => {
		return employees.filter((employee) => employee.role === category);
	};

	return (
		<SchoolContext.Provider
			value={{
				employees,
				getEmployees,
				setEmployees,
				employeeCategories,
				setEmployeeCategories,
				getEmployeeByCategory,
				classes,
				setClasses,
				subjects,
				setSubjects,
				getSubjects,
				sessions,
				setSessions,
				schoolProfile,
				setSchoolProfile,
			}}
		>
			{children}
		</SchoolContext.Provider>
	);
}
