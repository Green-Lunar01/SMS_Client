import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./screens/Dashboard";
import Assignment from "./screens/Assignment";
import Timetable from "./screens/Timetable";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Books from "./screens/Books";
import Messaging from "./screens/Messaging";
import Exams from "./screens/Exams";
import ClassTest from "./screens/ClassTest";
import Report from "./screens/Report";
import Login from "./pages/Auth/Login";
import Layout from "./layout/layout";
import ProtectedRoutes from "./pages/Auth/ProtectedRoutes";
import LiveClass from "./screens/LiveClass";
function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <ProtectedRoutes
                handleModal={handleModal}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/assignments"
              element={
                <Assignment showModal={showModal} handleModal={handleModal} />
              }
            />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/books" element={<Books />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/live-class" element={<LiveClass />} />
            <Route path="/class-test" element={<ClassTest />} />
            <Route path="/report-card" element={<Report />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
