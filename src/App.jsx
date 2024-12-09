import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Assignment from "./screens/Assignment";
import Timetable from "./screens/Timetable";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Books from "./screens/Books";

function App() {
  return (
    <Router>
      <div className="relative">
        <Header />
        <Sidebar />
        <div className="flex justify-end">
            <div className="md:w-[82%] w-full  ">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/assignments" element={<Assignment />} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/books" element={<Books />} />
                </Routes>
            </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
