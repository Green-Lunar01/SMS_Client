import axios from 'axios';
import { createContext, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css"

export const StudentUserContext  = createContext({})

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "https://edusoft.tonyicon.com.ng";
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
	  const [allStudents, setAllStudents] = useState(() => {
		const storedStudents = localStorage.getItem("all_students_");
		return storedStudents !== null && storedStudents !== ""
		  ? JSON.parse(storedStudents)
		  : {};
	  });
	  const getStudents = async () => {
		try {
		  const response = await axios.get(`${BASE_API_URL}/data/students`, {
			headers: { Authorization: studentToken },
		  });
	
		  setAllStudents(response.data.data);
		  localStorage.setItem("all_students_", JSON.stringify(response.data.data));
		  console.log(allStudents);
		} catch (err) {
		  console.error(err);
		}
	  };

	  const [allTeachers, setAllTeachers] = useState(() => {
		const storedTeachers = localStorage.getItem("all_teachers_");
		return storedTeachers !== null && storedTeachers !== ""
		  ? JSON.parse(storedTeachers)
		  : [];
	  });
	  const getTeachers = async () => {
		try {
		  const response = await axios.get(
			`https://edusoft.tonyicon.com.ng/data/teachers`,
			{
			  headers: { Authorization: studentToken },
			}
		  );
	
		  setAllTeachers(response.data.data);
		  localStorage.setItem("all_teachers_", JSON.stringify(response.data.data));
		  console.log("My teachers:", allTeachers);
		} catch (err) {
		  console.error(err);
		}
	  };
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
	const [date, setDate] = useState()
	const [currentSession, setCurrentSession] = useState("")
	
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
			const filterSession = studentProfile.academic_sessions.find((session) => (
				session.isactive === true
			))
			setCurrentSession(filterSession)
	
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
			const response =  await axios.get(`${BASE_API_URL}/student/assignments/${assignmentId}/comments`,
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
			const response = await axios.get(`${BASE_API_URL}/student/messages`, 
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
			const response =  await axios.get(`${BASE_API_URL}/student/tests`,
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
		  const response = await axios.get(`${BASE_API_URL}/student/exams`, {
			headers: { Authorization: studentToken },
		  });
	  
		  // Update state & localStorage
		  setExams(response.data.data);
		  localStorage.setItem("student_exam_results", JSON.stringify(response.data.data));
		} catch (err) {
		  console.error(err);
		}
	  };

	  const [allSessions, setAllSessions] = useState(studentProfile?.academic_sessions || []);
	  

		
		//   const getAllSession = async () => {
		// 	try {
		// 	  const response = await axios.get(`${BASE_API_URL}/school/academic-sessions`, {
		// 		headers: { Authorization: studentToken },
		// 	  });
		  
			
		// 	  setAllSessions(response.data.data);
		// 	  localStorage.setItem("all_academic_sessions", JSON.stringify(response.data.data));
		  
		// 	} catch (err) {
		// 	  console.error("Error fetching academic sessions:", err);
		// 	}
		//   };
	
		const sendMessage = async (data) => {
			setLoading(true); // Set loading state
			const toastId = toast.loading("Sending message..."); // Show loading toast
		
			try {
			  const response = await axios.post(
				`${BASE_API_URL}/school-messages/send`,
				data,
				{ headers: { Authorization: studentToken } }
			  );
		
			  if (response.status === 200 || response.status === 201) {
				toast.success("Message sent successfully", { id: toastId });
				await getMessages(); // Fetch messages after sending successfully
			  } else {
				toast.error(response.data.message || "Failed to send message", {
				  id: toastId,
				});
			  }
			} catch (err) {
			  const errorMessage =
				err.response?.data?.message ||
				"Error sending message. Please try again.";
			  toast.error(errorMessage, { id: toastId });
			  console.error("Error sending message:", err);
			} finally {
			  setLoading(false); // Reset loading state
			}
		  };
		
		  const [messages, setMessages] = useState(() => {
		   
			const storedMessages = localStorage.getItem("student_messages");
			return storedMessages ? JSON.parse(storedMessages) : [];
		  });
		
		  const getMessages = async () => {
			setLoading(true); 
			const toastId = toast.loading("Fetching messages..."); 
		
			try {
			  const response = await axios.get(`${BASE_API_URL}/school-messages`, {
				headers: { Authorization: studentToken },
			  });
		
			  if (response.status === 200) {
				toast.success("Messages retrieved successfully", { id: toastId });
		
			   
				setMessages(response.data.data);
				localStorage.setItem("student_messages", JSON.stringify(response.data.data));
			  } else {
				toast.error("Failed to retrieve messages", { id: toastId });
			  }
			} catch (err) {
			  toast.error("Error fetching messages. Please try again.", {
				id: toastId,
			  });
			  console.error("Error fetching messages:", err);
			} finally {
			  setLoading(false); 
			}
		  };




// const logout = async () => {
// 		try {
// 			window.location.href = "/login"
// 		    setStudentProfile(null);
// 			setStudentToken(null);
// 			localStorage.removeItem("student_sms_token");
// 			localStorage.removeItem("student_sms_timetable");
// 			localStorage.removeItem("student_sms_info");
		
// 			toast("Logged out successfully!");
// 			window.location.href = "/login"
// 		} catch (error) {
// 			console.log(error);
// 		}
	// };
 const logout = async () => {
	try {
	  setStudentToken(null);
	  setStudentProfile(null);
  
	  localStorage.clear(); // Clears all stored data in localStorage
  
	  toast.success("Logged out successfully!");
	  
	  window.location.href = "/login";
	} catch (error) {
	  console.log(error);
	}
  };
    

  return (
    <StudentUserContext.Provider
        value={{
            studentToken,
			getMessages,
			sendMessage,
			getStudents,
			messages,
			allStudents,
			allTeachers,
			getTeachers,
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
			setExams,
			getExams,
			currentSession,
			allSessions,
		


        }}
    >
        {children}

    </StudentUserContext.Provider>
  
  )
}
export const useStudAuth = () =>  useContext(StudentUserContext)

export default StudentAuthProvider



