import React from 'react'
import { useState } from 'react'
import LiveClassBox from '../components/LiveClassBox'


function LiveClass() {
  const [currentMeet, setCurrentMeet] = useState("All meetings")
  const meetType = ["All meetings", "Today", "Tomorrow", "Invitation"]
  return (
    <div className='bg-[#fdfdfd]'>
    <div className='w-full flex justify-center'>
      <div className='lg:w-[93%] w-[85%] flex flex-col  gap-[24px] justify-start p-0   my-[15px]'>
        <div className='lg:w-full py-[9px] flex bg-white   lg:flex-row items-center flex-col   gap-[16px]'> 
          <h1 className='w-full text-[#08190E] text-center font-bold text-[24px]'>
            Live Class
          </h1>
          

          
          
        </div>
       
        <section className='w-full bg-[#fdfdfd]  flex justify-between  '>
        
          <div className='lg:w-[100%] w-full bg-[#fff] dummyDiv flex flex-col gap-8  '>
            <div className='w-full flex border-b border-[#d9d9d9]  bg-[#f9f9f9] '> 
              <div className='md:w-[35%] w-full flex justify-between  md:ml-[25px]  my-[12px] gap-1 px-[5px] '>
                {
                  meetType.map((meet, index) => (
                    <button
  onClick={() => setCurrentMeet(meet)}
  className={`md:w-auto w-full ${
    meet === currentMeet ? "bg-[#13a541] text-[#fff] border-0" : "text-[#8E98A8] border border-[#d9d9d9] bg-[#fff]"
  } md:px-[10px] px-[3px] rounded-[4px] h-[43px] text-[12px] font-normal gap-2`}
>
  {meet}
</button>

                  ))
                }
                
               
               

              </div>
              
            </div>
            {
              currentMeet === "All meetings" ? <LiveClassBox /> : <div> Nothing to see here</div>
            }
            <div className='w-full flex justify-end '>
              {/* <Receivermsg /> */}
            </div>
          </div>
        </section> 
      </div>
    </div>
  </div>
  )
}

export default LiveClass