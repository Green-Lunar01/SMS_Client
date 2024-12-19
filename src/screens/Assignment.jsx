import React from 'react'
import { useState } from 'react';
import calendarSvg from "../icons/calendar4.svg?react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
function Assignment({showModal,  handleModal}) {

  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close calendar after selecting a date
  };
  
  return (
    <div className='relative'>
      
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
                <div className="relative w-[213px]">
      {/* Input Field */}
      <input
        placeholder="DD/MM/YYYY"
        className="pl-[27px] w-[213px] h-[56px] outline-0 border-[1px] border-[#d9d9d9] rounded-[6px]"
        value={selectedDate ? selectedDate.toLocaleDateString('en-GB') : ''}
        readOnly
      />

      {/* Calendar Icon */}
      <button
        type="button"
        className="absolute right-[18px] top-[16px]"
        onClick={() => setShowCalendar((prev) => !prev)} // Toggle calendar on click
        onMouseEnter={() => setShowCalendar(true)}      // Show calendar on hover
      >
        <img src="/icons/calendar4.svg" alt="Calendar Icon" />
      </button>

      {/* React-Calendar */}
      {showCalendar && (
        <div className="absolute top-[60px] left-0 z-10">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      )}
    </div>
                  <div>
                    <button className='text-[14px] font-semibold w-[127px] h-[55px] rounded-[10px] text-[#fff] bg-[#13A541]'> Search</button>

                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className='w-full flex flex-col'>
          <h1>All</h1>
          <div className='w-full flex flex-col border border-1 border-[#d9d9d9] mt-4'>
            <div className='flex-container border-b border-[#d9d9d9]'>
            <div className='w-[92%] flex-container-between  '>
                <div className='w-[70%] flex gap-[6%] items-center rounded-[3px]'>
                  <div className='w-[20%] bg-[#F3FEF7] p-[12px] flex items-center my-[8px] gap-3'>
                    <img className='w-[30%]' src='/images/persona.svg'/>
                    <div className='w-[60%] p-0'>
                      <h1 className='font-medium text-[12px]'>Value</h1>
                      <p className='font-normal text-[10px]'>Role</p>
                    </div>
                  </div>
                  <div className='w-[20%] bg-[#E9EFFF] p-[12px] flex items-center my-[8px] gap-3'>
                    <img className='w-[30%]' src='/icons/bookas.svg'/>
                    <div className='w-[60%] p-0'>
                      <h1 className='font-medium text-[12px]'>Value</h1>
                      <p className='font-normal text-[10px]'>Role</p>
                    </div>
                  </div>
                  <div className='w-[20%] bg-[#F3FEF7] p-[12px] flex items-center my-[8px] gap-3'>
                    <img className='w-[30%]' src='/icons/online.svg'/>
                    <div className='w-[60%] p-0'>
                      <h1 className='font-medium text-[12px]'>Value</h1>
                      <p className='font-normal text-[10px]'>Role</p>
                    </div>
                  </div>
                  <div className='w-[20%] bg-[#E9EFFF] p-[12px] flex items-center my-[8px] gap-3'>
                    <img className='w-[30%]' src='/icons/calendarass.svg'/>
                    <div className='w-[60%] p-0'>
                      <h1 className='font-medium text-[12px]'>Value</h1>
                      <p className='font-normal text-[10px]'>Role</p>
                    </div>
                  </div>
                  
                </div>
                <div className='flex items-center gap-3'>
                 <button type='button' onClick={() => handleModal()}><img src='/icons/comment.svg'/></button> 
                 <p  className='font-normal text-[12px]'>Add Comment</p>
                </div>
           </div>
            </div>
           <div className='w-full flex flex-col items-center gap-2'>
              <div className='w-11/12 my-[16px]'>
                <h1 className='font-semibold text-[14px]'>Assignment</h1>
                <p className='font-normal text-[12px]'>Lorem ipsum dolor sit amet consectetur. Velit sed porttitor nunc eleifend leo. Tellus nunc blandit scelerisque risus morbi iaculis molestie. Ipsum urna viverra adipiscing egestas commodo nec vitae. Elementum ac nunc in ac.</p>
              </div>
           </div>

          </div>
        </section>
        {/* <section className='w-full  flex justify-center items-center'>
          <div className='dummyDiv flex flex-col gap-8 mt-[60px]'>
             <img src='/icons/dummy.svg'/>
             <h1 className='font-normal text-[16px] text-center'>
              No Records yet
             </h1>
          </div>
        </section> */}
      </div>
    </div>
  </div>
  )
}

export default Assignment