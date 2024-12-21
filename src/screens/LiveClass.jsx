import React from 'react'

function LiveClass() {
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
        
          <div className='lg:w-[100%] bg-[#fff] dummyDiv flex flex-col gap-8  '>
            <div className='w-full flex border-b border-[#d9d9d9]  bg-[#f9f9f9]'> 
              <div className='md:w-[35%]  flex justify-between md:ml-[25px] my-[12px]  '>
                <button className='w-auto px-[10px] rounded-[4px] h-[43px] text-[#fff] bg-[#13A541] text-[12px] font-normal'>
                  All meetings
                </button>
                <button className='w-auto px-[10px] rounded-[4px] h-[43px] text-[#8E98A8] bg-[#fff] text-[12px] font-normal border border-[#d9d9d9] '>
                Today
                </button>
                <button className='w-auto px-[10px] rounded-[4px] h-[43px] text-[#8E98A8] bg-[#fff] text-[12px] font-normal border border-[#d9d9d9] '>
                Tomorrow
                </button>
                <button className='w-auto px-[10px] rounded-[4px] h-[43px] text-[#8E98A8] bg-[#fff] text-[12px] font-normal border border-[#d9d9d9] '>
                Invitation
                </button>
               

              </div>
              
            </div>
            <div className='w-full flex justify-start'>
               <div className='md:w-[55%] md:mx-[41px] px-[11px] py-[9px] border border-[#d9d9d9] rounded-[7px]'>

                   
                 <div className='flex gap-[13px] items-center'>
                    <h1 className='w-auto text-white font-normal text-[14px] py-[1px] bg-[#FBAE44] px-[11px] rounded-[13px]'>Invitation</h1>
                    <h1 className='w-auto text-white font-normal text-[14px] py-[1px] bg-[#8E98A8] px-[11px] rounded-[13px]'>Meeting with: All teacher</h1>
                    
                 </div>
                 <div className='mt-[24px] flex items-center justify-between'>
                    <div className='flex gap-[17px]'>
                        <div className='flex items-center gap-[6px]'>
                            <img src='/icons/calendar4.svg'/>
                            <p className='font-normal text-[12px]'>Sunday Sep 22nd, 2024</p>
                        </div>
                        <div className='flex items-center gap-[6px]'>
                            <img src='/icons/clock.svg'/>
                            <p className='font-normal text-[12px]'>07:50 PM Duration: 1 hour 30 min</p>
                        </div>
                    </div>
                    <p className='font-normal text-[12px] text-[#13A541] '>Active</p>
                 </div>
                 <p className='class-code font-semibold text-[14px] mt-2 text-[#13A541]'>
                 ESK5110BR1rYDj
                 </p>
                 <div className=' flex justify-between items-center'>
                    <div className='w-[60%]'>
                        <p className='text-[#08190E] text-[14px] font-semibold'>Some Text</p>
                        <p className='text-[#08190E] text-[12px] font-normal'>Lorem ipsum dolor sit amet consectetur. Gravida tempus congue donec nisi risus consectetur proin volutpat sit.</p>
                    </div>
                    <div>
                        <button className='flex gap-[7px] text-white bg-[#13A541] rounded-[10px] py-[7px] px-[7px]'>
                            <img src='/icons/pc.svg'/>
                            Join Room
                        </button>
                    </div>
                 </div>
               </div>
            </div>
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