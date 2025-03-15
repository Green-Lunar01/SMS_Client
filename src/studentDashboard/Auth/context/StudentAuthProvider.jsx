import axios from 'axios';
import { createContext, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css"

export const StudentUserContext  = createContext({})

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "https://edusoft.tonyicon.com.ng/";
const StudentAuthProvider = ({children}) => {
    const [studentToken, setStudentToken] = useState(() => {
        const storedStudentToken = localStorage.getItem("student_sms_token");
        return storedStudentToken !== null && storedStudentToken !== "" ? storedStudentToken : ""
    })
    const[studentProfile, setStudentProfile] = useState(() => {
        const studentStoredProfile =  localStorage.getItem('student_sms_info')
        return studentStoredProfile !== null && studentStoredProfile !== "" ? JSON.parse(studentStoredProfile) : ""
    })
	const[allComments, setAllComments] = useState(() => {
		const storedComments = localStorage.getItem("all_comments")
		return storedComments !== null && storedComments !== "" ? JSON.parse(storedComments) : ""
	})
    const navigate = useNavigate()
	const getStudentInfo = async (token) => {
		console.log(token)
		try {
			const response = await axios.get(`https://edusoft.tonyicon.com.ng/student/overview`,
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
			const response = await axios.get(`https://edusoft.tonyicon.com.ng/student/timetable`, {
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
	const [loading, setLoading] = useState(false);

	const postComment = async (assignmentId, comment, setShowModal) => {
		const toastId = toast.loading("Posting comment....")
		setLoading(true)
		try{
		 const response = await axios.post(`https://edusoft.tonyicon.com.ng/student/assignments/${assignmentId}/comment`, 
	       {comment},
		 { 
		   headers: {Authorization : studentToken}
		});
		toast.success(response.data.message, {id : toastId})
		// alert(response.data.message)
		setShowModal && setShowModal(false)
		getComments(assignmentId)
        
	    
   
		}catch(err){
			toast.error("Failed to post comment", {id: toastId})
		 console.error(err)
		} finally{
			setLoading(false)
		}
		  
   
	 }

	 const getComments = async (assignmentId) => {
		try{
			const response =  await axios.get(`${BASE_API_URL}student/assignments/${assignmentId}/comments`,
				{headers: {Authorization: studentToken}}
			)
		setAllComments([...response.data.data]);
		console.log("All Comments:", allComments)
		localStorage.setItem("all_comments", JSON.stringify(response.data.data))
	

		}catch(err){
			console.error(err)

		}
	 }

	 const [allMsg, setAllMsg] = useState([])

	 const getAllMsg = async () => {
		try{
			const response = await axios.get(`${BASE_API_URL}student/messages`, 
				{headers:
				{Authorization: studentToken}
			})
			
			setAllMsg([...response.data.data])
			console.log("All messages:", response.data.data)
			localStorage.setItem("all_msg", JSON.stringify(response.data))
		}catch(err){
			console.error(err)
		}
	 }
	 const [test, setTest] = useState(() => {
		const storedTests = localStorage.getItem("student_test_results");
		return storedTests !== null && storedTests !== "" ? JSON.parse(storedTests) : [];
	  });
	 const getTest =  async () => {
		try{
			const response =  await axios.get(`${BASE_API_URL}student/tests`,
				{headers:
					{Authorization: studentToken}}

			)
			setTest([...response.data.data])
			localStorage.setItem("student_test_results", JSON.stringify(response.data.data))


		}catch(err){
			console.error(err)
		}
	 }

	 const [exams, setExams] = useState(() => {
		const storedExams = localStorage.getItem("student_exam_results");
		return storedExams !== null && storedExams !== "" ? JSON.parse(storedExams) : [];
	  });
	  
	  const getExams = async () => {
		try {
		  const response = await axios.get(`${BASE_API_URL}student/exams`, {
			headers: { Authorization: studentToken },
		  });
	  
		  // Update state & localStorage
		  setExams(response.data.data);
		  localStorage.setItem("student_exam_results", JSON.stringify(response.data.data));
		} catch (err) {
		  console.error(err);
		}
	  };
	
	





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
			setCommentId,
			getComments,
			allComments,
			getAllMsg,
			allMsg,
			setAllMsg, 
			getTest, 
			test,
			exams,
			getExams


        }}
    >
        {children}

    </StudentUserContext.Provider>
  
  )
}
export const useStudAuth = () =>  useContext(StudentUserContext)

export default StudentAuthProvider



