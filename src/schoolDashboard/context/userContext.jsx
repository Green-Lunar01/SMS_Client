import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

	const [user, setUser] = useState(() => {
		const storedProfile = localStorage.getItem("sms_user");
		return storedProfile !== null && storedProfile !== ""
			? JSON.parse(storedProfile)
			: "";
	});

	const [userToken, setUserToken] = useState(() => {
		const storedToken = localStorage.getItem("sms_token");
		return storedToken !== null && storedToken !== "" ? storedToken : "";
	});

	const navigate = useNavigate();

	const getUser = async (token) => {
		try {
			await axios
				.get(`${BASE_API_URL}/v1/auth/user`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					console.log(res.data);
					toast.success(res.data.message);
					setUserToken(token);
					localStorage.setItem(`sms_token`, JSON.stringify(token));
					setUser(res.data.data);
					localStorage.setItem(
						`sms_user`,
						JSON.stringify(res.data.data),
					);
					if (res.data.data.email_verified_at === null) {
						navigate("/verifyemail");
					} else {
						navigate("/");
					}
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const getEmailVerificationLink = async () => {
		try {
			await axios
				.post(
					`${BASE_API_URL}/v1/auth/resend-email-verification`,
					{},
					{ headers: { Authorization: `Bearer ${userToken}` } },
				)
				.then((res) => {
					console.log(res);
					toast.success(res.data.message);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async () => {
		try {
			await axios
				.post(
					`${BASE_API_URL}/v1/auth/logout`,
					{},
					{ headers: { Authorization: `Bearer ${userToken}` } },
				)
				.then((res) => console.log(res));
			setUser(null);
			setUserToken(null);
			localStorage.removeItem("sms_token");
			localStorage.removeItem("sms_user");
			toast("Logged out successfully!");
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				userToken,
				setUserToken,
				getUser,
				getEmailVerificationLink,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
