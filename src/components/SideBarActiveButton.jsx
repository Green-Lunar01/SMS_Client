import React from 'react'
import { createContext, useContext, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom';
const ActiveButtonContext = createContext()

function SideBarActiveButton({children}) {
    const location =  useLocation();
    const pathWithoutSlash = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;
    const [activeButton, setActiveButton] = useState(pathWithoutSlash);
    const handleNavigateColor = (buttonName) => {
        setActiveButton(buttonName)
    }
  return (
    <ActiveButtonContext.Provider value={{activeButton, handleNavigateColor, setActiveButton}}>
        {children}
    </ActiveButtonContext.Provider>

  )
}
export const useActiveButton = () => useContext(ActiveButtonContext)
export default SideBarActiveButton