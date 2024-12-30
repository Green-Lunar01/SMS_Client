import Rout from "./components/Rout";
import SchoolDashboard from "./schoolDashboard/App.jsx";
import {  Routes, Route } from "react-router-dom";
import StudentApp from "./studentDashboard/App"
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./schoolDashboard/pages/Auth/Login"
const App = () => {
	
	
	return (
		<>
  {window.location.pathname.startsWith("/student") ? (
	<StudentApp />
  ) : window.location.pathname.startsWith("/school") ? (
    <Routes>
      <Route path="/school/*" element={<SchoolDashboard />} />
    </Routes>
  ) : (
    <div>
      <Routes>
		<Route element={<Rout />}>
		       <Route index element={<Home />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/blog" element={<Blog />} />
		
		</Route>
		<Route path="/login" element={<Login />} />
	  </Routes>
	  
	  
      
    </div>
  )}
</>

	);
	// );
};

export default App;
