import React from 'react'
// import { Chart } from 'chart.js'
import Chart from '../Chart/Chart'
import "./finalres.css"

function FinalResultTable({reportData}) {
  return (
    <div className='w-full'>
               <div className='w-full border-1 border-b'>
                <div className='lg:w-[85%] w-[85%] my-[30px] md:pl-[43px] pl-[19px] flex-container-between  '>
                <div className=''>
                    <img className='md:w-[100px] w-[64px]' src='/images/school-logo.svg'/>
                </div>
                <div className='w-full flex-container-col gap-2 leading-0'>
                    <h1 className='md:title font-semibold text-center leading-0 text-[15px] md:text-[30px]'>Fountain Int'l High School</h1>
                    <p className='md:sub-title font-medium text-center leading-0 text-[9px] md:text-[18px]'>Omisanjana Area, Ado Ekiti, Ekiti State</p>
                    <p className='md:info font-medium text-center leading-0 text-[6px] md:text-[12px]'>Website: fihs.com.ng Mobile: 08034290207, 08066769638 Email: school_fountain@yahoo.com</p>

                </div>
                </div>
          </div>
          <div className='w-full flex-container'>
            <h1 className='md:mx-4 md:font-semibold md:text-[14px]  font-medium text-center leading-0 text-[9px] my-[7.5px]'>
            ADABEMBE MOJOLAOLUWA DAVID
            </h1>
          </div>
          <div className='w-full flex-container mt-4'>
              <div className='w-11/12 flex-container-between  flex  md:flex-row md:justify-between flex-col items-center'>
                <div className='w-[95%] md:w-[50%]'>
                  <Chart />
                </div>
                <div className='w-full  flex justify-center md:justify-end'>
                <table className='border border-collapse md:w-[73%] w-full'>
                  <thead>
                    <th className='border h-[40px] bg-[#fcfcfc]'>
                      <h1 className='text-[16px] font-medium'>Student details</h1>
                    </th>
                  </thead>
                  <tbody className=''>
                    <tr className='flex-container p-[13px] '>
                      <table className='border w-full h-[72px] '>
                        <th className='border bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle '>Gender</th>
                        <th className='border bg-[#f5f5f5] font-normal text-left text-[14px] pl-[19px] align-middle'>Male</th>
                        <tr className='border'>
                          <td className='border font-normal text-left text-[14px] h-[29px] pl-[13px] '>Session</td>
                          <td className='border font-normal text-left text-[14px] pl-[19px] '>2023/2024 2nd Term</td>
                        </tr>
                        <tr>
                          <td className='border bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] '>Admission number</td>
                          <td className='border bg-[#f5f5f5] font-normal text-left text-[14px] pl-[19px] '>Session</td>
                        </tr>

                      </table>
                    </tr>
                    <tr className='flex-container-col p-[13px]'>
                    <th className=' text-center border-0 border-b border-black mb-2'>Student Attendance</th>
                      <table className='w-full '>
                        

                        <tr className='border w-full'>
                          <td className='w-[70%] border bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>No. of times School opened</td>
                          <td className='bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>122</td>
                        </tr>
                        <tr className='border'>
                          <td className=' border font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>No. of times Present</td>
                          <td className='border font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>118</td>
                        </tr>
                        <tr className='border'>
                          <td className='border bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>No. of times Absent</td>
                          <td className='border bg-[#f5f5f5] font-normal text-left text-[14px] h-[29px] pl-[13px] align-middle'>118</td>
                        </tr>

                      </table>
                    </tr>
                  </tbody>
                </table>
                </div>

              </div>
          </div>
         <div className="w-full mt-4 overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="first-th">Subjects</th>
        <th className="other-th">(A) TEST1</th>
        <th className="other-th">(A) TEST1</th>
        <th className="other-th">(A) TEST1</th>
        <th className="other-th">(D) TEST AVE (A+B+C)/3</th>
        <th className="other-th">(E) EXAM</th>
        <th className="other-th">(F) TERM CUM (D+E)/2</th>
        <th className="other-th">(G) LAST TERM CUM</th>
        <th className="other-th">(H) FINAL CUM (F+G)/2</th>
        <th className="border font-bold text-[12px] bg-[#F8FDF9] px-[8px] py-2">Grade</th>
        <th className="border font-bold text-[12px] bg-[#F8FDF9] w-[10%] px-[8px] py-2">Remark</th>
      </tr>
    </thead>
    <tbody>
      {reportData.map((row, index) => (
        <tr key={index} className="border font-normal text-[14px] h-[50px] align-middle">
          <td className="px-[18px] py-2">{row.subject}</td>
          <td className="tb">{row.testA}</td>
          <td className="tb">{row.testA}</td>
          <td className="tb">{row.testA}</td>
          <td className="tb">{row.testA}</td>
          <td className="tb">{row.exam}</td>
          <td className="tb">{row.exam}</td>
          <td className="tb">{row.exam}</td>
          <td className="tb">{row.exam}</td>
          {row.exam === 70 && <td className="tb">A</td>}
          {row.exam === 70 && <td className="text-center">Excellent</td>}
        </tr>
      ))}
    </tbody>
  </table>
</div>

          <div className='w-full flex items-center bg-[#13A541]'>
            <h1 className='flex items-center font-semibold text-[16px] h-[50px] px-[25px]  text-white'>Total: 42%</h1>
          </div>
          <div className='w-full flex items-center '>
            <div className='lg:w-8/12 md:ml-9 ml-[10px] mt-4'>
                  <div className='border flex justify-center items-center md:p-3 p-[9px] w-[63%]'>
                  <table className='w-full border border-collapse table-fixed'>
                    <thead >
                      <th className='border text-center bg-[#f5f5f5] text-[8px] md:text-[14px] font-normal '>Score</th>
                      <th className='border text-center bg-[#f5f5f5] text-[8px] md:text-[14px] font-normal'>Grade</th>
                      <th className='border text-left bg-[#f5f5f5] text-[8px] md:text-[14px] font-normal md:pl-5'>Remark</th>
                    </thead>
                    <tbody>
                      <tr className='bg-[#fff] align-middle'>
                        <td className=' border text-center md:text-[14px] text-[8px] align-middle '>70-100</td>
                        <td className=' border text-center md:text-[14px] text-[8px]  '>A</td>
                        <td className=' border text-left md:pl-5 md:text-[14px] text-[8px] align-middle '>EXCELLENT</td>
                        
                      </tr >
                      <tr className='bg-[#f5f5f5]'>
                        <td className=' border text-center md:text-[14px] text-[8px] align-middle '>70-100</td>
                        <td className=' border text-center md:text-[14px] text-[8px] align-middle  '>B</td>
                        <td className=' border text-left md:pl-5   md:text-[14px] text-[8px] align-middle  '>GOOD</td>
                        
                      </tr >
                      <tr className='bg-[#fff]'>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center '>70-100</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center  '>C</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-left md:pl-5 '>AVERAGE</td>
                        
                      </tr >
                      <tr className='bg-[#f5f5f5]'>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center '>70-100</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center  '>D</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-left md:pl-5 '>BELOW AVERAGE</td>
                        
                      </tr >
                      <tr className='bg-[#fff]'>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center '>70-100</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-center  '>E</td>
                        <td className=' md:text-[14px] text-[8px] align-middle border text-left md:pl-5 '>POOR</td>
                        
                      </tr >
                    </tbody>
                  </table>
                  </div>
            </div>
          </div>
          <div className='w-full flex items-center mt-10 mb-[55px] border-[#13A541] border-b pb-[55px]'>
            <div className='w-full flex justify-between gap-4'>
                <div className='w-[55%] md:w-[85%]  md:w-[70%] flex-container-col gap-2  md:ml-9 ml-[10px] '>
                  <div className='flex md:gap-3 gap-1'>
                      <h1 className='font-semibold md:text-[13px] text-[8px]'>Class Teacher's comment: </h1> 
                      <p className='font-light  underline-offset-[4px] md:text-[12px] text-[6px]   underline leading-3'>HE SHOWS RESPECT FOR TEACHERS AND PEERS.</p>
                  </div> 
                  <div className='w-full md:w-auto flex items-center md:gap-3 gap-1'>
                      <h1 className='font-semibold md:text-[13px] text-[8px]'>  Principal's comment: </h1> 
                      <p className='font-light  underline-offset-[4px] md:text-[12px] text-[6px] underline leading-3 md:leading-5 '>BELOW AVERAGE RESULT, HE NEEDS TO PAY MORE ATTENTION TO HIS STUDIES</p>
                  </div> 
                  <div className='flex md:gap-3 gap-1'>
                      <h1 className='font-semibold md:text-[13px] text-[8px]'>Next Term Begins On: </h1> 
                      <p className='font-light  underline-offset-[4px] md:text-[12px] text-[6px]   underline'>2024-04-29</p>
                  </div> 
                  
                </div>
                <div className=' w-[45%]  flex flex-col md:gap-3 gap-2 justify-start items-center mr-2 md:mr-0'>
                  <div className='flex md:gap-3 '>
                        <h1 className='font-semibold md:text-[13px] text-[8px]'>Signature and date: </h1> 
                        <p className='font-light md:w-[150px] w-[50px] border-[#08190E]  border-b-2  '></p>
                    </div> 
                  <div className='flex md:gap-3'>
                        <h1 className='font-semibold md:text-[13px] text-[8px]'>Signature and date: </h1> 
                        <p className='font-light md:w-[150px] w-[50px] border-[#08190E]  border-b-2'></p>
                    </div> 
                </div>
            </div>
          </div>

             
          </div>
  )
}

export default FinalResultTable