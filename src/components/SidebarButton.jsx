import React, { useEffect } from 'react';
import { useActiveButton } from './SideBarActiveButton';
import { useLocation } from 'react-router-dom';
function SidebarButton({ name, icon: Icon, onClick, title }) {
  const { activeButton, handleNavigateColor, setActiveButton } = useActiveButton();
  const location = useLocation ()
  const pathWithoutSlash = location.pathname.startsWith("/")
    ? location.pathname.slice(1)
    : location.pathname;
  useEffect(
    () => {
      if(location.pathname){
        setActiveButton(pathWithoutSlash)
        console.log(activeButton)
      }

    }
  )
  
  const handleClick = () => {
    onClick();
  
    handleNavigateColor(name);
    console.log('Active Button:', activeButton);
    console.log('Clicked Button Name:', name);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full ${
        activeButton === name ? 'bg-[#13A541] text-white' : 'bg-white'
      } flex gap-[11px] px-[9px] py-[11px] transition-all`}
    >
     
      <Icon
        className={`w-6 h-6  ${
          activeButton === name ? 'stroke-white' : 'stroke-black'
        }`}
        style={{
          stroke: activeButton === name ? 'white' : 'black',
        }}
      />
      <p className="font-normal text-[14px] leading-[21px]">{title}</p>
    </button>
  );
}

export default SidebarButton;
