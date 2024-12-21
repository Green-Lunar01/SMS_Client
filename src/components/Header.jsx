import React from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar';
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='sticky top-0 bg-[white] z-40'>
        <div className='fixed md:hidden'>
           {
            showMenu ? <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} /> : null
           }
            
        </div>
        <div className=' w-full lg:h-[95px] h-[56px] flex justify-center border-0 border-b'>
            <div className='w-[90%] flex justify-between'>
                <div className='lg:w-3/12 flex justify-between items-center'>
                   <img className='hidden md:block' src='/images/logo.png'/>
                   <div className='flex items-center gap-4'>
                     <button type='button' onClick={() => setShowMenu(!showMenu)}>
                        {
                            showMenu ? <img src='/icons/cancel-01.svg'/> : <img src='/icons/menu.png' />
                        }
                     </button>
                      <div>
                      <img className='md:hidden' src='/images/lunar.png'/>
                      </div>
                   </div>
                </div>
                <div className='lg:w-3/12 flex justify-between items-center gap-3'>
                    <img src='/icons/mesg.png'/>
                    <div className='flex items-center gap-2'>
                        <p className='hidden sm:block font-normal text-[#08190E]'>Sammy Dach</p>
                        <img  className="md:w-14 md:h-14 h-[45px] w-[45px] py-[1px]" src='/images/person.png'/>
                    </div>


                </div>
            </div>
           


        </div>
    </div>
  )
}

export default Header