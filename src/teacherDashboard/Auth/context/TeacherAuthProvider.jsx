import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-hot-toast";
export const TeacherUserContext = createContext({});

const BASE_API_URL =
  import.meta.env.VITE_BASE_API_URL || "https://edusoft.tonyicon.com.ng";
const TeacherAuthProvider = ({ children }) => {
  const [teacherToken, setTeacherToken] = useState(() => {
    const storedTeacherToken = localStorage.getItem("teacher_sms_token");
    return storedTeacherToken !== null && storedTeacherToken !== ""
      ? storedTeacherToken
      : "";
  });
  const [teacherProfile, setTeacherProfile] = useState(() => {
    const teacherStoredProfile = localStorage.getItem("teacher_sms_info");
    return teacherStoredProfile !== null && teacherStoredProfile !== ""
      ? JSON.parse(teacherStoredProfile)
      : {};
  });
  const [allClasses, setAllClasses] = useState(() => {
    const storedClasses = localStorage.getItem("all_classes");
    return storedClasses !== null && storedClasses !== ""
      ? JSON.parse(storedClasses)
      : {};
  });
  const [timeTable, setTimetable] = useState(() => {
    const storedTimetable = localStorage.getItem("timetable");
    return storedTimetable !== null && storedTimetable !== ""
      ? JSON.parse(storedTimetable)
      : {};
  });
  const [loading, setLoading] = useState(false);
  const getAllClasses = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/data/classes`, {
        headers: { Authorization: teacherToken },
      });
      // console.log(response)
      setAllClasses(response.data.data);
      localStorage.setItem("all_classes", JSON.stringify(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  const [allSubjects, setAllSubjects] = useState(() => {
    const storedSubjects = localStorage.getItem("all_subjects");
    return storedSubjects !== null && storedSubjects !== ""
      ? JSON.parse(storedSubjects)
      : {};
  });
  const getSubjects = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/data/subjects`, {
        headers: { Authorization: teacherToken },
      });
      // console.log(response)
      setAllSubjects(response.data.data);
      localStorage.setItem("all_subjects", JSON.stringify(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const [allTeachers, setAllTeachers] = useState(() => {
    const storedTeachers = localStorage.getItem("all_teachers");
    return storedTeachers !== null && storedTeachers !== ""
      ? JSON.parse(storedTeachers)
      : {};
  });
  const getTeachers = async () => {
    try {
      const response = await axios.get(
        `https://edusoft.tonyicon.com.ng/data/teachers`,
        {
          headers: { Authorization: teacherToken },
        }
      );

      setAllTeachers(response.data.data);
      localStorage.setItem("all_teachers", JSON.stringify(response.data.data));
      console.log("My teachers:", allTeachers);
    } catch (err) {
      console.error(err);
    }
  };
  const [allStudents, setAllStudents] = useState(() => {
    const storedStudents = localStorage.getItem("all_students");
    return storedStudents !== null && storedStudents !== ""
      ? JSON.parse(storedStudents)
      : {};
  });

  const getStudents = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/data/students`, {
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
    const toastId = toast.loading("Adding Assignment....");
    try {
      const response = await axios.post(
        `${BASE_API_URL}/teachers/assignments/create`,
        data,
        {
          headers: {
            Authorization: teacherToken,
          },
        }
      );
      setModal(false);
      toast.success(response.data.message, { id: toastId });
    } catch (err) {
      console.error(err);
    }
  };
  const [assignments, setAssignments] = useState([]);
  const [teacherID, setTeacherID] = useState(0);

  const getAssignment = async (classID, date) => {
    setLoading(true);
    setTeacherID(teacherProfile.user.id);

    try {
      const response = await axios.get(`${BASE_API_URL}/teachers/assignments`, {
        params: { class_id: classID, teacher_id: teacherID, date },
        headers: { Authorization: teacherToken },
      });

      const fetchedAssignments = response.data.assignments || [];

      setAssignments([...fetchedAssignments]);

      console.log("fetched assignments:", fetchedAssignments);
      if (fetchedAssignments.length === 0) {
        toast("No assignments for this day!", {
          icon: "📅",
          position: "top-center",
        });
      }

      console.log(assignments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [commentId, setCommentId] = useState(0);

  const [allComments, setAllComments] = useState(() => {
    const storedTeacherComments = localStorage.getItem("all_teacher_comments");
    return storedTeacherComments !== null && storedTeacherComments !== ""
      ? JSON.parse(storedTeacherComments)
      : [];
  });
  const getComments = async (assignmentId) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/teachers/assignments/${assignmentId}/comments`,
        { headers: { Authorization: teacherToken } }
      );
      setAllComments([...response.data.data]);
      console.log("All Teacher Comments:", allComments);
      localStorage.setItem(
        "all_teacher_comments",
        JSON.stringify(response.data.data)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async (assignmentId, comment, setShowModal) => {
    const toastId = toast.loading("Posting comment....");
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/teachers/assignments/${assignmentId}/comment`,
        { comment },
        {
          headers: { Authorization: teacherToken },
        }
      );
      toast.success(response.data.message, { id: toastId });
      // alert(response.data.message)
      setShowModal && setShowModal(false);
      getComments(assignmentId);
    } catch (err) {
      // toast.error("Failed to post comment", {id: toastId})
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [arrOfMaxClass, setMaxClassArr] = useState(() => {
    const storedData = localStorage.getItem("highest_teacher_classes_today");
    return storedData ? JSON.parse(storedData) : [];
  });
  const getTimetable = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/teachers/timetable`, {
        headers: { Authorization: `${teacherToken}` },
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
        localStorage.setItem(
          "highest_teacher_classes_today",
          JSON.stringify(response.data.data[maxKey])
        );
        console.log(response.data.data);
        setTimetable(response.data.data);
        localStorage.setItem(
          "teacher_timetable",
          JSON.stringify(response.data.data)
        );
      }

      setTimetable({ ...response.data.data });
    } catch (err) {
      console.error(err);
      //sedd
    }
  };

  const [sessions, setSessions] = useState(() => {
    const storedSessions = teacherProfile?.academic_sessions;
    return storedSessions || [];
  });
  const [currentSession, setCurrentSession] = useState(() => {
    const storedSession = teacherProfile?.academic_sessions;
    const filteredStoredSession = storedSession?.find(
      (session) => session.isactive
    );
    return filteredStoredSession?.id || 0;
  });
  const [currentSessionName, setCurrentSessionName] = useState(() => {
    const storedSession = teacherProfile?.academic_sessions;
    const filteredStoredSession = storedSession?.find(
      (session) => session.isactive
    );
    return filteredStoredSession?.session_name || 0;
  });
  const [classID, setClassID] = useState(
    () => teacherProfile?.user?.class_id || null
  );

  const overview = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/teachers/overview`, {
        headers: { Authorization: teacherToken },
      });
      setClassID(response.data.data.user.class_id);
      console.log("My Overview:", response.data.data, "Class_id:", classID);

      const allSessions = response.data.data.academic_sessions;
      setSessions(allSessions);

      const filteredCurrentSession = allSessions?.find(
        (session) => session.isactive === true
      );

      if (filteredCurrentSession) {
        setCurrentSession(filteredCurrentSession.id);
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };
  const [attendanceData, setAttendanceData] = useState(() => {
    const storedData = localStorage.getItem("attendance_data");
    return storedData ? JSON.parse(storedData) : [];
  });
  


  const markAttendance = async (data, stdID) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/teachers/student-attendance/mark/${stdID}`,
        data,
        {
          headers: { Authorization: teacherToken },
        }
      );
  
      if (response.data.status) {
        toast.success(response.data.message || "Attendance marked successfully");
      } else {
        toast.error(response.data.message || "Failed to mark attendance");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error marking attendance. Please try again.";
      toast.error(errorMessage);
      console.error("Error marking attendance:", err);
    }
  };
  const getAllStudentAttendance = async (clsID, sessionID) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/teachers/student-attendance/${clsID}/${sessionID}`,
        {
          headers: { Authorization: teacherToken },
        }
      );

      if (response.data && response.data.data) {
        console.log("Attendance Data:", response.data.data);
        setAttendanceData(response.data.data);

        const storedData = localStorage.getItem("attendance_data");
        if (JSON.stringify(response.data.data) !== storedData) {
          localStorage.setItem(
            "attendance_data",
            JSON.stringify(response.data.data)
          );
        }
      }
    } catch (err) {
      console.error("An attendance error", err);
    }
  };
  const [examData, setExamData] = useState(() => {
    const savedExamData = localStorage.getItem("examData");
    return savedExamData ? JSON.parse(savedExamData) : null;
  });

  const createExamFn = async (data, setTab, tab) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-exam/create/`,
        data,
        {
          headers: { Authorization: teacherToken },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "Exam successfully created");

        setExamData(response.data.data);

        localStorage.setItem("examData", JSON.stringify(response.data.data));

        setTab(tab);
        console.log("examData: ", examData);
      } else {
        toast.error(response.data.message || "Failed to create exam");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error creating exam. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating exam:", err);
    }finally{
      setLoading(false)
    }
  };
  const [testData, setTestData] = useState(() => {
    const savedTestData = localStorage.getItem("testData");
    return savedTestData ? JSON.parse(savedTestData) : null;
  });
  const createTestFn = async (data, setTab, tab) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-test/create/`,
        data,
        {
          headers: { Authorization: teacherToken },
        }
      );

      if (response.data.status) {
        toast.success(response.data.message || "Test successfully created");

        setTestData(response.data.data);

        localStorage.setItem("testData", JSON.stringify(response.data.data));

        setTab(tab);
        console.log("testData: ", response.data.data);
      } else {
        toast.error(response.data.message || "Failed to create test");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error creating test. Please try again.";
      toast.error(errorMessage);
      console.error("Error creating test:", err);
    }
    finally{
      setLoading(false)
    }
  };

  const [examPapers, setExamPapers] = useState(() => {
    const storedPapers = localStorage.getItem("examPapers");
    return storedPapers ? JSON.parse(storedPapers) : "";
  });
  const getQuestionPapers = async (classID, subjectID, term, sessionID) => {
    setLoading(true); 
    try {
      const response = await axios.get(
        `${BASE_API_URL}/school-exam/questions/${classID}/${subjectID}`,
        {
          headers: { Authorization: teacherToken },
          params: { term, sessionId: sessionID },
        }
      );
  
      if (response.data && response.data.status) {
        setExamPapers(response.data);
        localStorage.setItem("examPapers", JSON.stringify(response.data));
        toast.success("Question papers retrieved successfully!");
      } else {
        toast.error(response.data.message || "Failed to retrieve question papers");
      }
  
      console.log(response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error retrieving question papers. Please try again.";
      toast.error(errorMessage);
      console.error("Error fetching questions:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const [testResults, setTestResults] = useState(() => {
    const savedResults = localStorage.getItem("testResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const getTestResults = async (clsID) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/school-test/${clsID}`, {
        headers: { Authorization: teacherToken },
      });

      if (response.data.status) {
        const tests = response.data.data.tests;

        setTestResults(tests);

        localStorage.setItem("testResults", JSON.stringify(tests));
      } else {
        toast.error(response.data.message || "Failed to retrieve exam results");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error retrieving exam results. Please try again.";
      toast.error(errorMessage);
      console.error("Error fetching exam results:", err);
    }
  };
  const [examResults, setExamResults] = useState(() => {
    const savedResults = localStorage.getItem("examResults");
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const getExamResults = async (clsID, subID) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/school-exam/${clsID}/${subID}`,
        { headers: { Authorization: teacherToken } }
      );

      if (response.data.status) {
        const tests = response.data.data.tests;

        setExamResults(tests);

        localStorage.setItem("examResults", JSON.stringify(tests));
      } else {
        toast.error(response.data.message || "Failed to retrieve exam results");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error retrieving exam results. Please try again.";
      toast.error(errorMessage);
      console.error("Error fetching exam results:", err);
    }
  };
  const addExamScore = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-exam/add-scores`,
        data,
        { headers: { Authorization: teacherToken } }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Scores added successfully");
      } else {
        toast.error(response.data.message || "Failed to add scores");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error adding scores. Please try again.";
      toast.error(errorMessage);
      console.error("Error adding exam scores:", err);
    }finally{
      setLoading(false)
    }
  };
  const addTestScore = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-test/add-scores`,
        data,
        { headers: { Authorization: teacherToken } }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Scores added successfully");
      } else {
        toast.error(response.data.message || "Failed to add scores");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error adding scores. Please try again.";
      toast.error(errorMessage);
      console.error("Error adding test scores:", err);
    }finally{
      setLoading(false)
    }
  };
  const setQuestionsFn = async (data) => {
    setLoading(true)
    const toastId = toast.loading("Saving questions..."); // Show loading toast

    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-exam/set-questions`,
        data,
        { headers: { Authorization: teacherToken } }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Questions set successfully", { id: toastId });
      } else {
        toast.error(response.data.message || "Failed to set questions", {
          id: toastId,
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Error setting questions. Please try again.";
      toast.error(errorMessage, { id: toastId });
      console.error("Error sending question schema:", err);
    }finally{
      setLoading(false)
    }
  };

  const sendMessage = async (data) => {
    setLoading(true); // Set loading state
    const toastId = toast.loading("Sending message..."); // Show loading toast

    try {
      const response = await axios.post(
        `${BASE_API_URL}/school-messages/send`,
        data,
        { headers: { Authorization: teacherToken } }
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
   
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const getMessages = async () => {
    setLoading(true); 
    const toastId = toast.loading("Fetching messages..."); 

    try {
      const response = await axios.get(`${BASE_API_URL}/school-messages`, {
        headers: { Authorization: teacherToken },
      });

      if (response.status === 200) {
        toast.success("Messages retrieved successfully", { id: toastId });

       
        setMessages(response.data.data);
        localStorage.setItem("messages", JSON.stringify(response.data.data));
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
  const logout = async () => {
    try {
      setTeacherToken(null);
      setTeacherProfile(null);
  
      localStorage.clear(); // Clears all stored data in localStorage
  
      toast.success("Logged out successfully!");
      
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  
  // const logout = async () => {
  //   try {
  //     window.location.href = "/login";
  //     setTeacherToken(null);
  //     setTeacherProfile(null);

  //     localStorage.removeItem("teacher_sms_token");
  //     localStorage.removeItem("teacher_sms_info");
  //     localStorage.removeItem("highest_teacher_classes_today");
  //     localStorage.removeItem("all_classes");
  //     localStorage.removeItem("timetable");

  //     toast("Logged out successfully!");
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <TeacherUserContext.Provider
      value={{

        teacherToken,
        loading,
        markAttendance,
        messages,
        sendMessage,
        getMessages,
        getStudents,
        allStudents,
        setTeacherToken,
        teacherProfile,
        setTeacherID,
        setTeacherProfile,
        getAllClasses,
        allClasses,
        examData,
        getTeachers,
        allTeachers,
        teacherID,
        getSubjects,
        allSubjects,
        sessions,
        addAssignment,
        getAssignment,
        assignments,
        postComment,
        getComments,
        allComments,
        getTimetable,
        timeTable,
        arrOfMaxClass,
        overview,
        examPapers,
        currentSession,
        currentSessionName,
        getQuestionPapers,
        addExamScore,
        addTestScore,
        createExamFn,
        createTestFn,
        testData,
        getExamResults,
        getTestResults,
        classID,
        examResults,
        testResults,
        getAllStudentAttendance,
        attendanceData,
        setQuestionsFn,
        logout,
      }}
    >
      {children}
    </TeacherUserContext.Provider>
  );
};
export const useTeacherAuth = () => useContext(TeacherUserContext);
export default TeacherAuthProvider;
