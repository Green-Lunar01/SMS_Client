import axios from 'axios';
import { createContext, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export const StudentUserContext  = createContext({})

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "http://tonyicon.com.ng:5000";
const StudentAuthProvider = ({children}) => {
    const [studentToken, setStudentToken] = useState(() => {
        const storedStudentToken = localStorage.getItem("student_sms_token");
        return storedStudentToken !== null && storedStudentToken !== "" ? storedStudentToken : ""
    })
    const[studentProfile, setStudentProfile] = useState(() => {
        const studentStoredProfile =  localStorage.getItem('student_sms_info')
        return studentStoredProfile !== null && studentStoredProfile !== "" ? JSON.parse(studentStoredProfile) : ""
    })
    const navigate = useNavigate()
	const getStudentInfo = async (token) => {
		console.log(token)
		try {
			const response = await axios.get(`http://tonyicon.com.ng:5000/student/overview`,
			   { headers: { Authorization: `Bearer ${token}` } });
				
			console.log(studentToken, "the response:", response)
			
		}catch(err){
			console.error(err)

		}

	}
	const [arrOfMaxClass, setMaxClassArr] = useState(() => {
		// Check if data exists in localStorage when the component mounts
		const storedData = localStorage.getItem("highest_classes_today");
		return storedData ? JSON.parse(storedData) : [];
	});
	const [studentTimetable, setStudentTimetable] = useState(() => {
		const storedTimetable =  localStorage.getItem("student_timetable");
		return storedTimetable  ? JSON.parse(storedTimetable) : {}
	})
	
	const getTimetable = async () => {
		try {
			const response = await axios.get(`http://tonyicon.com.ng:5000/student/timetable`, {
				headers: { Authorization: `${studentToken}` }
			});
	
			const entries = Object.entries(response.data.data);
			let maxClasses = 0;
			let maxKey = "";
	
			entries.forEach(([day, classToday]) => {
				if (classToday.length > maxClasses) {
					maxClasses = classToday.length;
					maxKey = day;
				}
			});
	
			// Update state and store in localStorage if maxKey exists
			if (maxKey) {
				const maxClassArray = [...response.data.data[maxKey]];
				setMaxClassArr(maxClassArray);
				localStorage.setItem("highest_classes_today", JSON.stringify(response.data.data[maxKey]));
				console.log(response.data.data)
				setStudentTimetable(response.data.data)
				localStorage.setItem("student_timetable", JSON.stringify(response.data.data))
			}
	
		} catch (err) {
			console.error(err);
		}
	};
    const [commentId, setCommentId] = useState(0)
	const postComment = async (assignmentId, comment) => {
		try{
		 const response = await axios.post(`http://tonyicon.com.ng:5000/student/assignments/${assignmentId}/comment`, 
		   {comment},
		 { 
		   headers: {Authorization : studentToken}
		})
			
   
		}catch(err){
		 console.error(err)
		}
		  
   
	 }
	
	





const logout = async () => {
		try {
			window.location.href = "/login"
		    setStudentProfile(null);
			setStudentToken(null);
			localStorage.removeItem("student_sms_token");
			localStorage.removeItem("student_sms_timetable");
			localStorage.removeItem("student_sms_info");
		
			toast("Logged out successfully!");
			window.location.href = "/login"
		} catch (error) {
			console.log(error);
		}
	};

    

  return (
    <StudentUserContext.Provider
        value={{
            studentToken,
            setStudentToken,
            studentProfile,
            setStudentProfile,
            logout,
			getStudentInfo,
			getTimetable,
			arrOfMaxClass,
			studentTimetable,
			postComment,
			commentId, 
			setCommentId

        }}
    >
        {children}

    </StudentUserContext.Provider>
  
  )
}
export const useStudAuth = () =>  useContext(StudentUserContext)

export default StudentAuthProvider



