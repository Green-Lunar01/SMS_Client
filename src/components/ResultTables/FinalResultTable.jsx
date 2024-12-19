import React from 'react'
// import { Chart } from 'chart.js'
import Chart from '../Chart/Chart'
import "./finalres.css"

function FinalResultTable({reportData}) {
  return (
    <div className='w-full'>
               <div className='w-full border-1 border-b'>
                <div className='lg:w-[85%]  my-[30px] pl-[43px] flex-container-between  '>
                <div>
                    <img className='w-[100px]' src='/images/school-logo.svg'/>
                </div>
                <div className='w-full flex-container-col gap-2'>
                    <h1 className='title'>Fountain Int'l High School</h1>
                    <p className='sub-title'>Omisanjana Area, Ado Ekiti, Ekiti State</p>
                    <p className='info'>Website: fihs.com.ng Mobile: 08034290207, 08066769638 Email: school_fountain@yahoo.com</p>

                </div>
                </div>
          </div>
          <div className='w-full flex-container'>
            <h1 className='name'>
            ADABEMBE MOJOLAOLUWA DAVID
            </h1>
          </div>
          <div className='w-full flex-container mt-4'>
              <div className='w-11/12 flex-container-between'>
                <div>
                  <Chart />
                </div>
                <table className='border border-collapse w-[43%]'>
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
          <div className='w-full flex-container mt-4'>
            <table>
              <thead>
                <th className='first-th'>Subjects</th>
                <th className='other-th'>(A) TEST1</th >
                <th className='other-th'>(A) TEST1</th >
                <th className='other-th'>(A) TEST1</th >
                <th className='other-th' >(D) TEST AVE (A+B+C)/3</th >
                <th className='other-th'>(E) EXAM</th >
                <th className='other-th' >(F) TERM CUM (D+E)/2</th >
                <th className='other-th'>(G) LAST TERM CUM</th >
                <th className='other-th' >(H) FINAL CUM (F+G)/2</th >
                <th className='border font-bold text-[12px] bg-[#F8FDF9]   px-[8px] py-2' >Grade</th >
                <th className='border font-bold text-[12px] bg-[#F8FDF9] w-[10%] px-[8px] py-2'>Remark</th>
              </thead>
              <tbody>
                {reportData.map((row) => (
                  <tr className='border font-normal text-[14px] h-[50px]  align-middle'><td className='px-[18px] py-2 '>{row.subject}</td>
                  <td className='tb'>{row.testA}</td>
                  <td className='tb'>{row.testA}</td>
                  <td className='tb'>{row.testA}</td>
                  <td className='tb'>{row.testA}</td>
                  <td className='tb'>{row.exam}</td>
                  <td className='tb'>{row.exam}</td>
                  <td className='tb'>{row.exam}</td>
                  <td className='tb'>{row.exam}</td>
                  {
                    row.exam === 70 && <td className='tb'>A</td>
                  }
                  {
                    row.exam === 70 && <td className='text-center'> Excellent</td>
                  }
                  </tr>
                )) }


              </tbody>

            </table>

          </div>
          <div className='w-full flex items-center bg-[#13A541]'>
            <h1 className='flex items-center font-semibold text-[16px] h-[50px] px-[25px]  text-white'>Total: 42%</h1>
          </div>
          <div className='w-full flex items-center '>
            <div className='lg:w-8/12 ml-9  mt-4'>
                  <div className='border flex justify-center items-center p-3 w-[63%]'>
                  <table className='w-full border border-collapse table-fixed'>
                    <thead >
                      <th className='border text-center bg-[#f5f5f5]'>Score</th>
                      <th className='border text-center bg-[#f5f5f5]'>Grade</th>
                      <th className='border text-left bg-[#f5f5f5] pl-5'>Remark</th>
                    </thead>
                    <tbody>
                      <tr className='bg-[#fff] align-middle'>
                        <td className=' border text-center text-[14px] align-middle '>70-100</td>
                        <td className=' border text-center text-[14px]  '>A</td>
                        <td className=' border text-left pl-5 text-[14px] align-middle '>EXCELLENT</td>
                        
                      </tr >
                      <tr className='bg-[#f5f5f5]'>
                        <td className=' border text-center text-[14px] align-middle '>70-100</td>
                        <td className=' border text-center text-[14px] align-middle  '>B</td>
                        <td className=' border text-left pl-5   text-[14px] align-middle  '>GOOD</td>
                        
                      </tr >
                      <tr className='bg-[#fff]'>
                        <td className=' text-[14px] align-middle border text-center '>70-100</td>
                        <td className=' text-[14px] align-middle border text-center  '>C</td>
                        <td className=' text-[14px] align-middle border text-left pl-5 '>AVERAGE</td>
                        
                      </tr >
                      <tr className='bg-[#f5f5f5]'>
                        <td className=' text-[14px] align-middle border text-center '>70-100</td>
                        <td className=' text-[14px] align-middle border text-center  '>D</td>
                        <td className=' text-[14px] align-middle border text-left pl-5 '>BELOW AVERAGE</td>
                        
                      </tr >
                      <tr className='bg-[#fff]'>
                        <td className=' text-[14px] align-middle border text-center '>70-100</td>
                        <td className=' text-[14px] align-middle border text-center  '>E</td>
                        <td className=' text-[14px] align-middle border text-left pl-5 '>POOR</td>
                        
                      </tr >
                    </tbody>
                  </table>
                  </div>
            </div>
          </div>
          <div className='w-full flex items-center mt-10 mb-[55px] border-[#13A541] border-b pb-[55px]'>
            <div className='w-full flex justify-between'>
                <div className='w-[80%] flex-container-col gap-3  ml-9  '>
                  <div className='flex gap-3'>
                      <h1 className='font-semibold text-[13px]'>Class Teacher's comment: </h1> 
                      <p className='font-light  underline-offset-[4px] text-[12px]  underline'>HE SHOWS RESPECT FOR TEACHERS AND PEERS.</p>
                  </div> 
                  <div className='w-full flex gap-3'>
                      <h1 className='font-semibold text-[13px]'>  Principal's comment: </h1> 
                      <p className='font-light  underline-offset-[4px] text-[12px]  underline'>BELOW AVERAGE RESULT, HE NEEDS TO PAY MORE ATTENTION TO HIS STUDIES</p>
                  </div> 
                  <div className='flex gap-3'>
                      <h1 className='font-semibold text-[13px]'>Next Term Begins On: </h1> 
                      <p className='font-light  underline-offset-[4px] text-[12px]  underline'>2024-04-29</p>
                  </div> 
                  
                </div>
                <div className=' w-[40%]  flex flex-col gap-3 justify-start items-center '>
                  <div className='flex gap-3'>
                        <h1 className='font-semibold text-[13px]'>Signature and date: </h1> 
                        <p className='font-light w-[150px] border-[#08190E]  border-b-2 '></p>
                    </div> 
                  <div className='flex gap-3'>
                        <h1 className='font-semibold text-[13px]'>Signature and date: </h1> 
                        <p className='font-light w-[150px] border-[#08190E]  border-b-2'></p>
                    </div> 
                </div>
            </div>
          </div>

             
          </div>
  )
}

export default FinalResultTable