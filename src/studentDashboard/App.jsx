import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./screens/Dashboard";
import Assignment from "./screens/Assignment";
import Timetable from "./screens/Timetable";

import Books from "./screens/Books";
import Messaging from "./screens/Messaging";
import Exams from "./screens/Exams";
import ClassTest from "./screens/ClassTest";
import Report from "./screens/Report";
import Login from "./pages/Auth/Login";

import ProtectedRoutes from "./pages/Auth/ProtectedRoutes";
import LiveClass from "./screens/LiveClass";
import Profile from "./screens/Profile";
function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    
      <div className="relative">
        <Routes>
          <Route path="/student/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes
                handleModal={handleModal}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          >
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route
              path="/student/assignments"
              element={
                <Assignment showModal={showModal} handleModal={handleModal} />
              }
            />
            <Route path="/student/timetable" element={<Timetable />} />
            <Route path="/student/books" element={<Books />} />
            <Route path="/student/messaging" element={<Messaging />} />
            <Route path="/student/exams" element={<Exams />} />
            <Route path="/student/live-class" element={<LiveClass />} />
            <Route path="/student/class-test" element={<ClassTest />} />
            <Route path="/student/report-card" element={<Report />} />
          </Route>
        </Routes>
      </div>
  
  );
}

export default App;
