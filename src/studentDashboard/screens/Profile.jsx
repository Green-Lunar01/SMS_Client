import React from 'react'
import {useForm} from "react-hook-form"
import  { yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import {toast} from "react-hot-toast";
import { useStudAuth } from '../Auth/context/StudentAuthProvider'
import { useState } from 'react'
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
const Profile = () => {
   const {studentToken, studentProfile} =  useStudAuth()
   const [password, setPassword] = useState("")
   const studentUserProfile = studentProfile.user
   const [showPassword, setShowPassword] = useState(false)
//    console.log("student profile", studentUserProfile)
   const formatDate = (theDate) => {
    const dateString = theDate
    const formattedDob =  dateString.split("T")[0]
    return formattedDob
 }
    const updatedStudentSchema = yup.object().shape({
            username: yup.string().required("Enter your username"),
            password: yup.string().min(8, "Password must be at least 8 characters* ").required("Enter your password")
        })
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver (updatedStudentSchema)})
    const [loading, setLoading]= useState(false)
    const [message, setMessage]= useState("")
    const updateStudentInfo = async (data) => {
        setLoading(true)
        const toastId = toast.loading("Updating Password")
        try{
            console.log("my data:", data)
            const response = await axios.put(`http://tonyicon.com.ng:5000/student/update-credentials`, 
                data, {
                    headers: {"Content-Type": "application/json",
                        Authorization: `${studentToken}`
                    }
                }
            )
            console.log('Update Info Response:', response.data)
            toast.success(response.data.message, {id: toastId})
            setPassword(data.password)
            setMessage(response.data.message)

        }catch (err) {
            console.error(err)
            toast.error("An Error Occured", {id: toastId})

        }finally{
            setLoading(false)
        }
        console.log("my updatedStudentSchema", data, studentToken)

    }
    
  formatDate(studentUserProfile.date_of_birth)
   
   
  return (
    <div className='relative bg-[#fdfdfd] h-auto'>
      
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0   my-[40px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px] bg-white'> 
          <h1 className='w-full py-3 text-[#08190E] text-center font-bold text-[24px] '>
            Update Profile
            
          </h1>
          

          
          
        </div>
        <div className='flex lg:justify-between flex-col lg:flex-row gap-[100px]'>
            <div className='flex flex-col items-center sm:flex-row sm:items-start lg:w-[50%]   gap-[33px]'>

                <div className='h-[332px] sm:w-[50%] flex flex-col gap-[10px]  items-center justify-center bg-white px-[42px] py-[23.5px] border border-[#d9d9d9] rounded-[5px]'>
                    <div>
                        <img className='w-[130px] h-[130px] rounded-[50%]' src={studentUserProfile.profile_photo}/>
                    </div>
                    <div>
                        <h1 className='text-[#13A541] text-center font-bold text-[14px]'>Username</h1>
                        <p className='font-normal text-[14px]'>{studentUserProfile.surname} {studentUserProfile.first_name}</p>
                    </div>
                    <div>
                        <h1 className='text-[#13A541] text-center font-bold text-[14px]'>Password</h1>
                        <p className='font-normal text-[14px] text-center'>{password ? password : <>Password</>}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(updateStudentInfo)} className='flex flex-col sm:w-[50%]  '>
                    <label className='font-semibold text-[14px]'> Username</label>
                    <input {...register("username")} type='text' placeholder='Enter your name' className='py-[18px] px-[12px] border-[1px] rounded-[6px] border-[#d9d9d9] mt-[10px]'/>
                    <label className='font-semibold text-[14px] mt-[27px]'> Password</label>
                    <div className='relative w-full'>
                        <input  {...register("password")} type={showPassword ? "text" : "password"} placeholder='Enter your password' className='w-full py-[18px] px-[12px] border-[1px] rounded-[6px] border-[#d9d9d9] mt-[10px]'/>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        <p onClick={() => setShowPassword(!showPassword)} className="absolute top-[32px] right-4 ">{showPassword ? <BiShow /> : <BiHide />} </p>
                    </div>
                    
                    <div className='flex justify-center'>
                        <button  type="submit" className='flex justify-center items-center w-[150px] mt-[53px] text-white bg-[#13A541] py-[17px] px-[40px] rounded-[10px]'>
                        
                        {loading ? <div className="w-6 h-6 rounded-full border-4 border-white border-r-[#7a4303] animate-spin"></div>
 : <>Update</>}
                       
                       </button>
                    </div>
                </form>
               

            </div>
            <div className=' lg:w-[25%] border-1 border-[#f7f7f7] shadow-xl rounded-[14px] px-[20px] py-[24px] md:mr-[20px]'>
                <div className='w-full flex flex-col justify-center items-center '>
                    <div className='w-[100px] h-[100px] overflow-hidden flex justify-center rounded-[50%] bg-black'>
                        
                       <img className='max-w-[100px] w-auto overflow-hidden' src={studentUserProfile.profile_photo}/>
                    </div>
                    <p className='text-center'>{studentUserProfile.surname} {studentUserProfile.first_name}</p>
                </div>
                <div className=' bg-[#FBFBFB] rounded-[9px] mt-[24px] px-[12px] py-[18px]'>
                    <div className=''>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Matric Number</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.matric_number}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Date Of Admission</h2>
                        <p className='font-normal text-[14px]'>{formatDate(studentUserProfile.date_of_admission)}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Class</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.class_name}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Date Of Birth</h2>
                        <p className='font-normal text-[14px]'>{formatDate(studentUserProfile.date_of_birth)}</p>
                    </div>
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className=''>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Gender</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.gender}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Religion</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.religion}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Phone number</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.phone_number}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Blood Group</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.blood_group}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Disease</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.disease === null || "" ? "N/A" : studentUserProfile.previous_school}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Orphan</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.is_orphan === null ? "N/A" : studentUserProfile.is_orphan === false ? "No" : "Yes"}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Previous School</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.previous_school === null || "" ? "N/A" : studentUserProfile.previous_school}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.address === null || "" ? "N/A" : studentUserProfile.address}</p>
                    </div>
                   
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className='w-full '>
                        <h2 className='w-full font-semibold text-[16px] border-b border-[#d9d9d9]'>Father/Guardian Info</h2>
                        
                    </div>
                   
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Father’s Full Name</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.fathers_name === null || "" ? "N/A" : studentUserProfile.fathers_name}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Occupation</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.fathers_occupation === null || "" ? "N/A" : studentUserProfile.fathers_occupation}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Mobile No.</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.fathers_number === null || "" ? "N/A" : studentUserProfile.fathers_number}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Education</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.fathers_education === null || "" ? "N/A" : studentUserProfile.fathers_education}</p>
                    </div>
                    
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.fathers_address === null || "" ? "N/A" : studentUserProfile.fathers_address}</p>
                    </div>
                   
                </div>
                <div className='  rounded-[9px] mt-[24px] px-[18px] py-[18px]'>
                    <div className='w-full '>
                        <h2 className='w-full font-semibold text-[16px] border-b border-[#d9d9d9]'>Mother/Guardian Info</h2>
                        
                    </div>
                   
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Mother's Full name</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.mothers_name === null || "" ? "N/A" : studentUserProfile.mothers_name}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Occupation</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.mothers_occupation === null || "" ? "N/A" : studentUserProfile.mothers_occupation}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Phone number</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.mothers_number === null || "" ? "N/A" : studentUserProfile.mothers_number}</p>
                    </div>
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Education</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.mothers_education === null || "" ? "N/A" : studentUserProfile.mothers_education}</p>
                    </div>
                   

                   
                    <div className='mt-[24px]'>
                        <h2 className='text-[#8E98A8] font-semibold text-[12px] border-b border-[#d9d9d9]'>Address</h2>
                        <p className='font-normal text-[14px]'>{studentUserProfile.mothers_address === null || "" ? "N/A" : studentUserProfile.mothers_address}</p>
                    </div>
                   
                </div>

            </div>
        </div>
   
      </div>
    </div>
  </div>
  )
}

export default Profile