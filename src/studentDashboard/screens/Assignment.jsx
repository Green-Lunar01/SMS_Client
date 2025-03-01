import React from 'react'
import { useState, useEffect } from 'react';
import calendarSvg from "../icons/calendar4.svg?react"
import Calendar from 'react-calendar';
import * as yup from "yup";
import {get, useForm} from "react-hook-form"
import  { yupResolver} from "@hookform/resolvers/yup"
import 'react-calendar/dist/Calendar.css'; 
import axios from "axios"
import { useStudAuth } from '../Auth/context/StudentAuthProvider';


function Assignment({showModal,  handleModal}) {
  const {studentToken, setCommentId} = useStudAuth()
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(null);
  const [assignments, setAssignments ] = useState([])
  const handleDateChange = (date) => {
    setSelectedDate(date.toLocaleDateString('en-GB'));
    setShowCalendar(false); // Close calendar after selecting a date
  };
  
  useEffect(() => {
    console.log("Updated assignments:", assignments);
  }, [assignments]); 
  const formatDate = (date) => {
    if (!date) return null; 
    const [day, month, year] = date.split('/'); 
    return `${year}${month}${day}`; 
  };
  const formatResDate = (dateString) => {
    return dateString.split("T")[0];

  }
 
  const getAssignment = async () => {

    console.log("Current date:", formatDate(selectedDate), studentToken)
    try {
      const response =  await axios.get(`http://tonyicon.com.ng:5000/student/get-assignments`, 
       { params: { date: formatDate(selectedDate) },
       headers: {Authorization: studentToken}
      
      }

      )
      setAssignments([...response.data.assignments])
      
    }catch(err){
      console.error(err)
    }
  }
 
 
  return (
    <div className='relative'>
      
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0 bg-white  my-[15px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Assignment
          </h1>
          

          
          
        </div>
        <section className='w-full flex justify-start  lg:gap-[16px]'> 
        
          <div className='w-full'>

              <div className='flex flex-col gap-[10px] '>
                <h1 className='text-[#08190E] font-bold text-[14px]'>Assignment Date</h1>
                <div className='w-full flex items-center md:gap-[64px] gap-5'>
                <div className="relative ">
    
                <input
                  placeholder="DD/MM/YYYY"
                  className="md:pl-[27px] pl-3 md:w-[213px] w-[98%] h-[56px] outline-0 border-[1px] border-[#d9d9d9] rounded-[6px]"
                  value={selectedDate ? selectedDate : ''}
                  readOnly
                />

      
                <button
                  type="button"
                  className="absolute right-[18px] top-[16px]"
                  onClick={() => setShowCalendar((prev) => !prev)} // Toggle calendar on click
                  onMouseEnter={() => setShowCalendar(true)}      // Show calendar on hover
                >
                  <img src="/icons/calendar4.svg" alt="Calendar Icon" />
                </button>

     
                {showCalendar && (
                  <div className="absolute top-[60px] left-0 z-10">
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                  </div>
                )}
                </div>
                  <div>
                    <button  onClick={() =>  getAssignment()}  type='button' className='text-[14px] font-semibold w-[127px] h-[55px] rounded-[10px] text-[#fff] bg-[#13A541]'> Search</button>

                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className='w-full flex flex-col'>
          <h1>All</h1>
          {
            assignments.map((assignment, index) => {
              return (<div className='w-full flex flex-col border border-1 border-[#d9d9d9] mt-4'>
                <div className='flex-container border-b border-[#d9d9d9]'>
                <div className='w-[92%]  flex flex-col-reverse items-end md:flex-row md:items-center md:justify-between '>
                    <div className='md:w-[80%] w-full  flex flex-wrap md:gap-[6%] gap-2 justify-center items-center p-0 rounded-[3px]'>
                      <div className='md:w-[20%] w-[47%] bg-[#F3FEF7] p-[12px] flex items-center my-[8px] gap-3'>
                        <img className='w-[30%]' src='/images/persona.svg'/>
                        <div className='w-auto p-0'>
                          <h1 className='font-medium text-[12px]'>{assignment.teacher_name}</h1>
                          <p className='font-normal text-[10px]'>Teacher</p>
                        </div>
                      </div>
                      <div className='md:w-[20%] w-[47%] bg-[#E9EFFF] p-[12px] flex items-center my-[8px] gap-3'>
                        <img className='w-[30%]' src='/icons/bookas.svg'/>
                        <div className='w-auto p-0'>
                          <h1 className='font-medium text-[12px]'>{assignment.subject_name}</h1>
                          <p className='font-normal text-[10px]'>Subject</p>
                        </div>
                      </div>
                      <div className='md:w-[20%] w-[47%] bg-[#F3FEF7] p-[12px] flex items-center my-[8px] gap-3'>
                        <img className='w-[30%]' src='/icons/online.svg'/>
                        <div className='w-auto p-0'>
                          <h1 className='font-medium text-[12px]'>{assignment.class_name}</h1>
                          <p className='font-normal text-[10px]'>Class</p>
                        </div>
                      </div>
                      <div className='md:w-[20%] w-[47%] bg-[#E9EFFF] p-[12px] flex items-center my-[8px] gap-3'>
                        <img className='w-[30%]' src='/icons/calendarass.svg'/>
                        <div className='w-auto p-0'>
                          <h1 className='font-medium text-[12px]'>{formatResDate(assignment.date)}</h1>
                          <p className='font-normal text-[10px]'>Date</p>
                        </div>
                      </div>
                      
                    </div>
                    <div className='flex items-center gap-3 pr-3 py-2'>
                     <button type='button' onClick={() => {handleModal();
                     setCommentId(assignment.id)
                     }}><img src='/icons/comment.svg'/></button> 
                     <p  className='font-normal text-[12px]'>Add Comment</p>
                    </div>
                </div>
                </div>
               <div className='w-full flex flex-col items-center gap-2'>
                  <div className='w-11/12 my-[16px]'>
                    <h1 className='font-semibold text-[14px]'>Assignment</h1>
                    <p className='font-normal text-[12px]'>{assignment.details}</p>
                  </div>
               </div>
    
              </div>)

            })
          }
        </section>
        
      </div>
    </div>
  </div>
  )
}

export default Assignment


/* <section className='w-full  flex justify-center items-center'>
          <div className='dummyDiv flex flex-col gap-8 mt-[60px]'>
             <img src='/icons/dummy.svg'/>
             <h1 className='font-normal text-[16px] text-center'>
              No Records yet
             </h1>
          </div>
        </section> */