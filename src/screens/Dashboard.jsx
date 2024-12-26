import React from 'react'
import teaching  from "../icons/teaching.svg?react"
// import Calendar from '../components/Calendar'
import DashboardCalendar from '../components/Calendar/DashboardCalendar'
function Dashboard() {

  const attendanceCards =  [
    {
      "attendanceType": "ABSENCE",
      "icon": teaching,
      "time": "This month",
      'count': 10,
      "color": "#FB8791"
      
    },
    {
      "attendanceType": "PRESENT",
      "icon": teaching,
      "time": "This month",
      'count': 56,
      "color": "#6A8BF6"
      
    },
    {
      "attendanceType": "SESSION PRESENT TOTAL",
      "icon": teaching,
      "time": "2023/2024",
      'count': 0,
      "color": "#9FA1D8"
      
    },
    {
      "attendanceType": "TEST TAKEN THIS SESSION",
      "icon": teaching,
      "time": "2023/2024",
      'count': 0,
      "color": "#9FA1D8"


    },
   
  ]
  const timeTable = [
    
    {
      "subject": "Mathematics",
      "time": "08:00-09:00",
      "color": '#B4CF34'
    },
    {
      "subject": "Biology",
      "time": "10:00-11::00",
      "color": '#6A8BF6'
    },
    {
      "subject": "English Language",
      "time": "12:30-01:30",
      "color": '#FB8791'
    },
    {
      "subject": "Chemistry",
      "time": "01:30-02:30",
      "color": '#FBAE44'
    },
    {
      "subject": "History",
      "time": "02:30-03:00",
      "color": '#FB8791'
    },
    {
      "subject": "Economics",
      "time": "04:00-5:00",
      "color": '#79C1BB'
    },
  ]
  return (
    <div className='w-full'>
      {/* hiwirehjwfrlguwe;rofqjirghqero */}
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[51px] justify-start p-0 bg-white  my-[48px]'>
        <div className='lg:w-full lg:flex-row flex flex-col justify-center  gap-[16px]'> 
          
       
          
          {attendanceCards.map((card, index) => (
            <div 
              key={index}
              className=' flex flex-col  items-center lg:w-[27%]  h-[172px] rounded-[7px] pt-[19px]'
              style={{ backgroundColor: card.color }}
            >
             <div className='w-11/12 flex flex-col gap-[22px] lg:w-[80%] h-[132px]'>
                <p className='font-semibold text-[14px]  text-white'> {card.attendanceType}</p>
                <div className='flex w-full justify-between items-center'>
                  
                  <card.icon />
                  <p className='font-bold text-[32px] text-white '>{card.count}</p>

                </div>
                <div className='font-normal text-white text-[14px]'>
                  {card.time}
                </div>

             </div>
            </div>
          ))}
  
        </div>
        <div className='w-full flex justify-start  gap-[16px]'> 
        
          <div className='w-full flex lg:flex-row flex-col lg:gap-5 gap-7'>

            <div className='lg:w-[67%] w-full  h-auto rounded-[8px] border-[1px] border-[#f2f2f2] shadow-[4px_8px_16px_0px_#d9d9d9] '>
                  <h1 className='text-[14px] font-bold text-[#08190e] pt-[20px] pl-[20px]'>Today Classes</h1>
                  <div className='flex lg:justify-normal justify-center pt-[24px] md:pl-[24px] gap-[17px] flex-wrap mb-[20px]'>
                      {
                        timeTable.map((subjectTime) => (
                        
                            <div className='flex flex-col gap-[20px] justify-center md:w-[152px] w-[42%] h-[125px] text-center text-white ' style={{backgroundColor: subjectTime.color}} >
                              <p>
                                {subjectTime.subject}
                              </p>
                              <p>
                                {subjectTime.time}
                              </p>
                            </div>

                          ))}

                  </div>
                  
            </div>
            <div className='lg:w-[40%] w-full'>
              <DashboardCalendar />
            </div>
          </div>

          
         
          
          
          
        </div>
      </div>
    </div>
  </div>
   
  )
}

export default Dashboard