import React from 'react'

function Timetable() {
  const weekTimetable = [
    {

      "day": "Monday",
      "subjectsForDay": [
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "8:00-9:00"
        },
        {
          "subject": "Social Studies",
          "color": "#79C1BB",
          "time": "9:00-10:00"
        },
        {
          "subject": "Mathematics",
          "color": "#B4CF34",
          "time": "11:00-12:00"
        },
        {
          "subject": "P.H.E",
          "color": "#7FB2F3",
          "time": "12:30-1:30"
        },
        {
          "subject": "C.R.K",
          "color": "#FBAE44",
          "time": "1:30-2:30"
        },
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "2:30-3:00"
        }
      ]

    },
    {

      "day": "Tuesday",
      "subjectsForDay": [
        {
          "subject": "Phonetics",
          "color": "#FBAE44",
          "time": "8:00-9:00"
        },
        {
          "subject": "Computer",
          "color": "#7FB2F3",
          "time": "9:00-10:00"
        },
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "11:00-12:00"
        },
        {
          "subject": "Social Studies",
          "color": "#79C1BB",
          "time": "12:30-1:30"
        },
        {
          "subject": "Mathematics",
          "color": "#B4CF34",
          "time": "1:30-2:30"
        },
        {
          "subject": "P.H.E",
          "color": "#7FB2F3",
          "time": "2:30-3:00"
        }
      ]

    },
    {

      "day": "Wednesday",
      "subjectsForDay": [
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "8:00-9:00"
        },
        {
          "subject": "Social Studies",
          "color": "#79C1BB",
          "time": "9:00-10:00"
        },
        {
          "subject": "Mathematics",
          "color": "#B4CF34",
          "time": "11:00-12:00"
        },
        {
          "subject": "P.H.E",
          "color": "#7FB2F3",
          "time": "12:30-1:30"
        },
        {
          "subject": "C.R.K",
          "color": "#FBAE44",
          "time": "1:30-2:30"
        },
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "2:30-3:00"
        }
      ]

    },
    {

      "day": "Thursday",
      "subjectsForDay": [
        {
          "subject": "Phonetics",
          "color": "#FBAE44",
          "time": "8:00-9:00"
        },
        {
          "subject": "Computer",
          "color": "#7FB2F3",
          "time": "9:00-10:00"
        },
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "11:00-12:00"
        },
        {
          "subject": "Social Studies",
          "color": "#79C1BB",
          "time": "12:30-1:30"
        },
        {
          "subject": "Mathematics",
          "color": "#B4CF34",
          "time": "1:30-2:30"
        },
        {
          "subject": "P.H.E",
          "color": "#7FB2F3",
          "time": "2:30-3:00"
        }
      ]

    },
    {

      "day": "Friday",
      "subjectsForDay": [
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "8:00-9:00"
        },
        {
          "subject": "Social Studies",
          "color": "#79C1BB",
          "time": "9:00-10:00"
        },
        {
          "subject": "Mathematics",
          "color": "#B4CF34",
          "time": "11:00-12:00"
        },
        {
          "subject": "P.H.E",
          "color": "#7FB2F3",
          "time": "12:30-1:30"
        },
        {
          "subject": "C.R.K",
          "color": "#FBAE44",
          "time": "1:30-2:30"
        },
        {
          "subject": "English Language",
          "color": "#FE7C7C",
          "time": "2:30-3:00"
        }
      ]

    },
   
  ]
  return (
    <div className=''>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[48px] justify-start p-0 bg-white  my-[15px]'>
        <div className='lg:w-full  lg:flex-row flex flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Timetable
          </h1>
        </div>
        <section className=''>
            <section className='w-full px-[40px] h-[50px] flex justify-between items-center bg-gradient-to-b from-[#fff] to-[#F0F4F9] border-[1px] border-[#D2E7FF] shadow-[0px_4px_1.3px_0px_#EAEFF5] mb-[4px]'>
              <div className='lg:w-[126px] flex items-center justify-between'>
                <div>
                <img src='/icons/calendar3.svg'/>
                </div>
                <p className='font-medium text-[16px]'>Time Table</p>
              </div>
              <p className='font-medium text-[16px]'>2024/2025</p>

            </section>
            <section className='w-full px-[40px] h-[64px] flex justify-between items-center bg-gradient-to-b from-[#fff] to-[#F0F4F9] border-[1px] border-[#D2E7FF] shadow-[0px_4px_1.3px_0px_#EAEFF5]'>
              <div className='lg:w-[126px] flex items-center justify-between'>
                
                <p className='font-medium text-[16px]'>JSS 1A</p>
              </div>
              <p className='font-medium text-[16px]'>Term 2</p>

            </section>
            <section className='table w-full'>
              <table className='w-full border-collapse table-fixed'>
                <tr className='w-full'>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium '><h1>Period</h1></th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium'>1</th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium'>2</th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium'>3</th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium'>4</th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium'>5</th>
                  <th className='w-flex justify-center items-center border h-[64px] text-[20px] font-medium '>6</th>

                </tr>
                                  {
                    weekTimetable.map((day, index) => (
                      <React.Fragment key={day.day}>
                       
                        <tr className='text-center'>
                          <td className='h-[144px] w-flex justify-center items-center border text-center bg-[#F0F4F9] font-bold text-[#5178b3] text-[22px]'>{day.day}</td>
                          {day.subjectsForDay.map((subject, subIndex) => (
                          <td style={{backgroundColor: subject.color}} className='w-flex justify-center items-center border-0 h-[144px] p-2' key={`${day.day}-${subIndex}`}>
                            <h1 className='text-[16px] font-bold text-white break-words'>{subject.subject}</h1>
                            <p className='font-normal text-[14px] text-white'>{subject.time}</p>
                           
                          </td>
                        ))}
                        </tr>

                       
                        
                      </React.Fragment>
                    ))
                    }
              </table>

            </section>
        </section>
        
      </div>
    </div>
  </div>
  )
}

export default Timetable