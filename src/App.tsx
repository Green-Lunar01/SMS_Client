import { useContext} from "react";
// import { Routes, Route } from "react-router-dom";
import Rout from "./components/Rout";
import Header from "./components/Header/index.tsx";
import { AppContext } from "./context/AppContext";
import MobileHeader from "./components/MobileHeader";
// @ts-ignore
import SchoolDashboard from "./schoolDashboard/App.jsx";
import {  Routes, Route } from "react-router-dom";
import StudentApp from "./studentDashboard/App"


const App = () => {
	const { showNav } = useContext(AppContext);
	
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
      <Header />
      {showNav && <MobileHeader />}
      <div>
        <Rout />
      </div>
    </div>
  )}
</>

	);
	// );
};

export default App;
