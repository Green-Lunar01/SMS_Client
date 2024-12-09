import React from 'react'

const Header = () => {
  return (
    <div className='sticky top-0 bg-[white]'>

        <div className=' w-full lg:h-[95px] h-[56px] flex justify-center border-0 border-b'>
            <div className='w-[90%] flex justify-between'>
                <div className='lg:w-3/12 flex justify-between items-center'>
                   <img className='hidden md:block' src='/images/logo.png'/>
                   <div className='flex items-center gap-4'>
                      <img className='w-auto h-auto' src='/icons/menu.png'/>
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