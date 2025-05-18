import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import  SettingsIcon  from '../icons/settings.svg?react';
import LogoutIcon  from '../icons/logout.svg?react';
// import { useNavigate } from 'react-router';
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const navigate = useNavigate();
    const handleProfileMenu = ( ) => {
        setShowProfileMenu(!showProfileMenu)
    }
  return (
    <div className='sticky top-0 bg-[white] z-20'>
        <div className='fixed md:hidden z-20'>
           {
            showMenu ? <Sidebar showMenu={showMenu} setShowMenu={setShowMenu}  /> : null
           }
            
        </div>
        <div className=' w-full lg:h-[95px] h-[66px] flex justify-center border-0 border-b'>
            <div className='w-[90%] flex justify-between'>
                <div className='lg:w-3/12 flex justify-between items-center'>
                   <img className='hidden md:block' src='/images/logo.png'/>
                   <div className='flex items-center gap-4'>
                     <button className='md:hidden' type='button' onClick={() => setShowMenu(!showMenu)}>
                        {
                            showMenu ? <img src='/icons/cancel-01.svg'/> : <img src='/icons/menu.svg' />
                        }
                     </button>
                      <div>
                      <img className='md:hidden' src='/images/lunar.svg'/>
                      </div>
                   </div>
                </div>
                <div className='lg:w-3/12 flex justify-between items-center gap-3'>
                    <img src='/icons/message2.svg'/>
                    <div className='flex items-center gap-2 '>
                        <p className='hidden sm:block font-normal text-[#08190E]'>Sammy Dach</p>
                        <div className='relative  '>
                        <div className='h-full  ' onMouseEnter={handleProfileMenu} onMouseLeave={handleProfileMenu}>

<img   className=" md:w-14 md:h-14 h-[45px] w-[45px] py-[1px]" src='/images/person.svg'/>
{
    showProfileMenu && <div className='absolute md:w-[174px] -left-[70px] shadow-md '>
       <div className='mt-[20px]'>
            <div onClick={() => navigate("/profile")} className='flex items-center
             w-full py-[10px] px-[6px] hover:bg-[#13A541] bg-white hover:text-white gap-4'>
                {/* <img src='/icons/settings.svg ' /> */}
                <SettingsIcon /> 
                <p className='font-normal text-[14px] flex items-center'>
                    Profile Setting
                </p>
            </div>
            <div className='flex items-center
             w-full py-[10px] px-[6px] hover:bg-[#13A541] bg-white hover:text-white gap-4'>
                
                <LogoutIcon/>
                <p className='font-normal text-[14px] flex items-center'>
                    Logout
                </p>
            </div>
       </div>

    </div>
}
</div>
                        </div>
                    </div>


                </div>
            </div>
           


        </div>
    </div>
  )
}

export default Header