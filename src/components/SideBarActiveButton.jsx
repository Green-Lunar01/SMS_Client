import React from 'react'
import { createContext, useContext, useState } from 'react'
const ActiveButtonContext = createContext()
function SideBarActiveButton({children}) {
    const [activeButton, setActiveButton] = useState("dashboard");
    const handleNavigateColor = (buttonName) => {
        setActiveButton(buttonName)
    }
  return (
    <ActiveButtonContext.Provider value={{activeButton, handleNavigateColor}}>
        {children}
    </ActiveButtonContext.Provider>

  )
}
export const useActiveButton = () => useContext(ActiveButtonContext)
export default SideBarActiveButton