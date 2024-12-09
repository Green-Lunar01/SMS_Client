import React from 'react'
import calendarSvg from "../icons/calendar4.svg?react"
function Assignment() {
  return (
    <div className=''>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0 bg-white  my-[15px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Assignment
          </h1>
          

          
          
        </div>
        <section className='w-full flex justify-start  gap-[16px]'> 
        
          <div className='w-full'>

              <div className='flex flex-col gap-[10px]'>
                <h1 className='text-[#08190E] font-bold text-[14px]'>Assignment Date</h1>
                <div className='flex items-center gap-[64px]'>
                  <div className='relative w-[213px]'>
                    <input placeholder='20/09/2024' className='pl-[27px] w-[213px] h-[56px] outline-0 border-[1px] border-[#d9d9d9] rounded-[6px]' />
                    <button className='absolute right-[18px] top-[16px]'>
                    <img src="/icons/calendar4.svg" alt="Calendar Icon" />
                    </button>
                  </div>
                  <div>
                    <button className='text-[14px] font-semibold w-[127px] h-[55px] rounded-[10px] text-[#fff] bg-[#13A541]'> Search</button>

                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className='w-full  flex justify-center items-center'>
          <div className='dummyDiv flex flex-col gap-8 mt-[60px]'>
             <img src='/icons/dummy.svg'/>
             <h1 className='font-normal text-[16px] text-center'>
              No Records yet
             </h1>
          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Assignment