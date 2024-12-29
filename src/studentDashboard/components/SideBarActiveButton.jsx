import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';
const ActiveButtonContext = createContext()

function SideBarActiveButton({children}) {
    const location =  useLocation();
    const pathWithoutSlash = location.pathname.startsWith("/student")
    ? location.pathname.slice(9)
    : location.pathname;
    const [activeButton, setActiveButton] = useState(pathWithoutSlash);
    useEffect(() => {
      setActiveButton(pathWithoutSlash);
    }, [pathWithoutSlash]);
  
   
    const handleNavigateColor = (buttonName) => {
      setActiveButton(buttonName);
      console.log("new active:", activeButton)
    };
  return (
    <ActiveButtonContext.Provider value={{activeButton, handleNavigateColor, setActiveButton}}>
        {children}
    </ActiveButtonContext.Provider>

  )
}
export const useActiveButton = () => useContext(ActiveButtonContext)
export default SideBarActiveButton