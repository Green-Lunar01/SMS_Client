import axios from 'axios';
import { createContext, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import {toast} from "react-hot-toast";
export const TeacherUserContext  = createContext({})

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "https://edusoft.tonyicon.com.ng/";
const TeacherAuthProvider = ({children}) => {
  const [teacherToken, setTeacherToken] = useState(() => {
    const storedTeacherToken = localStorage.getItem("teacher_sms_token");
    return storedTeacherToken !== null && storedTeacherToken !== "" ? storedTeacherToken : ""
})
const[teacherProfile, setTeacherProfile] = useState(() => {
  const teacherStoredProfile =  localStorage.getItem('teacher_sms_info')
  return teacherStoredProfile !== null && teacherStoredProfile !== "" ? JSON.parse(teacherStoredProfile) : {}
})
const [allClasses, setAllClasses] = useState(() => {
  const storedClasses =  localStorage.getItem('all_classes')
  return storedClasses !== null && storedClasses !== "" ? JSON.parse(storedClasses) : {}
})
const [timeTable, setTimetable] = useState(() => {
  const storedTimetable = localStorage.getItem("timetable");
  return storedTimetable !== null && storedTimetable !== "" ? JSON.parse(storedTimetable) : {};
});
const getAllClasses = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}data/classes`, 
      {
        headers: {Authorization: teacherToken}
      }
    )
    // console.log(response)
    setAllClasses(response.data.data)
    localStorage.setItem("all_classes", JSON.stringify(response.data.data))

  }catch(err){
    console.error(err)

  }
}
const [allSubjects, setAllSubjects] = useState(() => {
  const storedSubjects =  localStorage.getItem('all_subjects')
  return storedSubjects !== null && storedSubjects !== "" ? JSON.parse(storedSubjects) : {}
})
const getSubjects = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}data/subjects`, 
      {
        headers: {Authorization: teacherToken}
      }
    )
    // console.log(response)
    setAllSubjects(response.data.data)
    localStorage.setItem("all_subjects", JSON.stringify(response.data.data))
   
  }catch(err){
    console.error(err)

  }
}
const [allTeachers, setAllTeachers] = useState(() => {
  const storedTeachers = localStorage.getItem("all_teachers");
  return storedTeachers !== null && storedTeachers !== "" ? JSON.parse(storedTeachers) : {};
});

const getTeachers = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}data/teachers`, {
      headers: { Authorization: teacherToken },
    });
    
    setAllTeachers(response.data.data);
    localStorage.setItem("all_teachers", JSON.stringify(response.data.data));
    console.log(allTeachers);
  } catch (err) {
    console.error(err);
  }
};
const [allStudents, setAllStudents] = useState(() => {
  const storedStudents = localStorage.getItem("all_students");
  return storedStudents !== null && storedStudents !== "" ? JSON.parse(storedStudents) : {};
});

const getStudents = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}data/students`, {
      headers: { Authorization: teacherToken },
    });

    setAllStudents(response.data.data);
    localStorage.setItem("all_students", JSON.stringify(response.data.data));
    console.log(allStudents);
  } catch (err) {
    console.error(err);
  }
};


const addAssignment = async (data, setModal) => {
  const toastId = toast.loading("Adding Assignment....")
  try{
    const response =  await axios.post(`${BASE_API_URL}teachers/assignments/create`, 
      data
    ,{
      headers : {
        Authorization: teacherToken
      }
    })
    setModal(false)
    toast.success(response.data.message, {id : toastId})

  }catch(err){
    console.error(err)
  }
}
const [assignments, setAssignments ] = useState([])
 
const getAssignment = async (classID, teacherID, date) => {

  try {
    const response =  await axios.get(`${BASE_API_URL}teachers/assignments`, 
     { params: {class_id: classID, teacher_id: teacherID, date },
     headers: {Authorization: teacherToken}
    
    }
    
    )
    setAssignments([...response.data.assignments])
    console.log(assignments)
    
  }catch(err){
    console.error(err)
  }
  // finally{
  //   // setLoading(false)
  // }
}
  const [commentId, setCommentId] = useState(0)
  const [loading, setLoading] = useState(false);
  const[allComments, setAllComments] = useState(() => {
    const storedTeacherComments = localStorage.getItem("all_teacher_comments")
    return storedTeacherComments !== null && storedTeacherComments !== "" ? JSON.parse(storedTeacherComments) : ""
  })
  const getComments = async (assignmentId) => {
    try{
      const response =  await axios.get(`${BASE_API_URL}teachers/assignments/${assignmentId}/comments`,
        {headers: {Authorization: teacherToken}}
      )
    setAllComments([...response.data.data]);
    console.log("All Teacher Comments:", allComments)
    localStorage.setItem("all_teacher_comments", JSON.stringify(response.data.data))


    }catch(err){
      console.error(err)

    }
  }


  const postComment = async (assignmentId, comment, setShowModal) => {
    const toastId = toast.loading("Posting comment....")
    setLoading(true)
    try{
    const response = await axios.post(`${BASE_API_URL}teachers/assignments/${assignmentId}/comment`, 
        {comment},
    { 
      headers: {Authorization : teacherToken}
    });
    toast.success(response.data.message, {id : toastId})
    // alert(response.data.message)
    setShowModal && setShowModal(false)
    getComments(assignmentId)
        
      
  
    }catch(err){
      // toast.error("Failed to post comment", {id: toastId})
    console.error(err)
    } finally{
      setLoading(false)
    }
      
  
  }
  const [arrOfMaxClass, setMaxClassArr] = useState(() => {
		
		const storedData = localStorage.getItem("highest_teacher_classes_today");
		return storedData ? JSON.parse(storedData) : [];
	});
  const getTimetable = async () => {
		try {
			const response = await axios.get(`${BASE_API_URL}teachers/timetable`, {
				headers: { Authorization: `${teacherToken}` }
			});
      // console.log("Teacher timetable:", response)
      const entries = Object.entries(response.data.data);
			let maxClasses = 0;
			let maxKey = "";
      entries.forEach(([day, classToday]) => {
				if (classToday.length > maxClasses) {
					maxClasses = classToday.length;
					maxKey = day;
				}
			});
      if (maxKey) {
				const maxClassArray = [...response.data.data[maxKey]];
				setMaxClassArr(maxClassArray);
				localStorage.setItem("highest_teacher_classes_today", JSON.stringify(response.data.data[maxKey]));
				console.log(response.data.data)
				setTimetable(response.data.data)
				localStorage.setItem("teacher_timetable", JSON.stringify(response.data.data))
			}
	
      setTimetable({...response.data.data})
	
	
		} catch (err) {
			console.error(err);
		}
	};


  return (
    <TeacherUserContext.Provider 
    value={{
      teacherToken, 
      setTeacherToken,
      teacherProfile,
      setTeacherProfile,
      getAllClasses, 
      allClasses,
      getSubjects,
      allSubjects, 
      addAssignment, 
      getAssignment,
      assignments,
      postComment,
      getComments,
      allComments, 
      getTimetable, 
      timeTable, 
      arrOfMaxClass
      
    }}
    
    >
        {children}
    </TeacherUserContext.Provider>
  )
}
export const useTeacherAuth = () => useContext(TeacherUserContext)
export default TeacherAuthProvider