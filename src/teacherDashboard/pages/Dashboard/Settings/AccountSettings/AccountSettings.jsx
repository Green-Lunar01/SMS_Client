import React, { useState } from "react";
import "./AccountSettings.css";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import {useForm} from "react-hook-form"
import  { yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import {toast} from "react-hot-toast";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useTeacherAuth } from "../../../../Auth/context/TeacherAuthProvider";
const AccountSettings = () => {
	const {teacherToken} = useTeacherAuth()
	const updatedTeacherSchema = yup.object().shape({
				username: yup.string().required("Enter your username"),
				password: yup.string().min(8, "Password must be at least 8 characters* ").required("Enter your password")
	})
	const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver (updatedTeacherSchema)})
    const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const updateTeacherInfo = async (data) => {
        setLoading(true)
        const toastId = toast.loading("Updating Password")
        try{
            console.log("my data:", data)
            const response = await axios.put(`https://edusoft.tonyicon.com.ng/teachers/update-credentials`, 
                data, {
                    headers: {"Content-Type": "application/json",
                        Authorization: `${teacherToken}`
                    }
                }
            )
            console.log('Update Teacher Info Response:', response.data)
            toast.success(response.data.message, {id: toastId})
            // setPassword(data.password)
            // setMessage(response.data.message)

        }catch (err) {
            console.error(err)
            toast.error("An Error Occured", {id: toastId})

        }finally{
            setLoading(false)
        }
        console.log("my updatedTeacherSchema", data, teacherToken)

    }
    
	return (
		<div className="account-settings-container">
			<h2>Account Settings</h2>
			<div className="account-settings-form">
				<form onSubmit={handleSubmit(updateTeacherInfo)}>
					<div className="form-group">
						<label htmlFor="username">Username*</label>
						<input {...register("username")} type="text" placeholder="Jake55@yahoo.com" />
					</div>
					<div className="form-group">
						<label htmlFor="password">Password*</label>
						<div className='relative w-full'>
							<input  {...register("password")} type={showPassword ? "text" : "password"} placeholder='***************' className='w-full py-[18px] px-[12px] border-[1px] rounded-[6px] border-[#d9d9d9] mt-[10px]'/>
							{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
							<p onClick={() => setShowPassword(!showPassword)}  className="absolute top-[32px] right-4 ">{showPassword ? <BiShow /> : <BiHide />} </p>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="time-zone">Time Zone*</label>
						<select name="time-zone" id="time-zone">
							<option value="America/New_York">
								America/New_York
							</option>
							<option value="America/Chicago">America/Chicago</option>
							<option value="America/Los_Angeles">
								America/Los_Angeles
							</option>
							<option value="Africa/Nigeria">Africa/Nigeria</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="currency">Currency*</label>
						<select name="currency" id="currency">
							<option value="USD">USD</option>
							<option value="EUR">EUR</option>
							<option value="JPY">JPY</option>
							<option value="NGN">NGN</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="calendar">Language*</label>
						<select name="language" id="language">
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="de">German</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="calendar">
							Academic Calendar Selection*
						</label>
						<select name="calendar" id="calendar">
							<option value="month">Per Month</option>
							<option value="term">Per Term</option>
							<option value="year">Per Year</option>
						</select>
					</div>

					<button type="submit" className="save-button">Update Settings</button>

					
				</form>

				<button className="delete-btn">Delete Account</button>
			</div>
		</div>
	);
};

export default AccountSettings;
